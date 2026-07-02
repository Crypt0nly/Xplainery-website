#!/usr/bin/env node
/**
 * render-scene.js — deterministic HTML/GSAP -> MP4 scene renderer.
 *
 * Renders a self-contained HTML scene frame-by-frame by seeking the GSAP
 * global timeline to t = frame/fps, screenshotting each frame, and piping
 * PNGs into ffmpeg (libx264, CRF 17, preset slow, yuv420p).
 *
 * Usage:
 *   node render-scene.js <scene.html> <output.mp4> <duration-seconds> [options]
 *
 * Options:
 *   --w 1080 --h 1920      stage size (default 1080x1920 vertical)
 *   --fps 30               frame rate (default 30)
 *   --params "a=1&b=2"     query string appended to the scene URL
 *   --transparent          alpha output: .mov (PNG codec) for ffmpeg overlay
 *   --frame <t>            render ONE preview PNG at time t instead of video
 *   --crf 17               x264 quality (default 17)
 *
 * Scene contract:
 *   - One self-contained HTML file, inline <style> + one GSAP timeline.
 *   - Load GSAP via <script src="../vendor/gsap.min.js"></script> (the
 *     renderer injects it as a fallback if window.gsap is missing).
 *   - Deterministic: correct when seeked to any t. Use fromTo() with explicit
 *     end states; infinite yoyo tweens are fine (they are still children of
 *     the global timeline, so seeking renders them correctly).
 */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer-core');

function findChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    '/opt/pw-browsers/chromium',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);
  for (const c of candidates) if (fs.existsSync(c)) return c;
  throw new Error('No Chrome/Chromium found. Set CHROME_BIN.');
}

function findFfmpeg() {
  const candidates = [process.env.FFMPEG_BIN, '/usr/local/bin/ffmpeg'].filter(Boolean);
  for (const c of candidates) if (fs.existsSync(c)) return c;
  return 'ffmpeg'; // fall back to PATH
}

function parseArgs(argv) {
  const pos = [];
  const opt = { w: 1080, h: 1920, fps: 30, crf: 17, params: '', transparent: false, frame: null };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--transparent') opt.transparent = true;
    else if (a === '--w') opt.w = +argv[++i];
    else if (a === '--h') opt.h = +argv[++i];
    else if (a === '--fps') opt.fps = +argv[++i];
    else if (a === '--crf') opt.crf = +argv[++i];
    else if (a === '--params') opt.params = argv[++i];
    else if (a === '--frame') opt.frame = +argv[++i];
    else pos.push(a);
  }
  return { pos, opt };
}

async function main() {
  const { pos, opt } = parseArgs(process.argv);
  const [sceneFile, outFile, durationArg] = pos;
  if (!sceneFile || !outFile || (opt.frame === null && !durationArg)) {
    console.error('Usage: node render-scene.js <scene.html> <output> <duration-s> [--w --h --fps --params --transparent --frame <t>]');
    process.exit(1);
  }
  const duration = opt.frame !== null ? 0 : parseFloat(durationArg);
  const scenePath = path.resolve(sceneFile);
  if (!fs.existsSync(scenePath)) throw new Error(`Scene not found: ${scenePath}`);
  let url = 'file://' + scenePath;
  if (opt.params) url += (opt.params.startsWith('?') ? '' : '?') + opt.params;

  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: [
      '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu',
      '--force-color-profile=srgb', '--hide-scrollbars',
      '--disable-lcd-text', '--font-render-hinting=none',
      `--window-size=${opt.w},${opt.h}`,
    ],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: opt.w, height: opt.h, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    // Fallback-inject GSAP if the scene forgot to include it.
    const hasGsap = await page.evaluate(() => !!window.gsap);
    if (!hasGsap) {
      await page.addScriptTag({ path: path.join(__dirname, 'vendor', 'gsap.min.js') });
      console.warn('warn: scene did not load GSAP itself; injected vendor/gsap.min.js AFTER scene scripts ran — timelines defined at parse time will have failed.');
    }
    await page.evaluate(() => document.fonts.ready);
    // Let images/layout settle one tick, then freeze time.
    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    await page.evaluate(() => { if (window.gsap) window.gsap.globalTimeline.pause(0); });

    const seek = async (t) => {
      await page.evaluate((tt) => {
        if (window.gsap) window.gsap.globalTimeline.time(tt, false);
        return new Promise(r => requestAnimationFrame(r));
      }, t);
    };

    if (opt.frame !== null) {
      await seek(opt.frame);
      await page.screenshot({ path: outFile, type: 'png', omitBackground: opt.transparent });
      console.log(`preview frame @${opt.frame}s -> ${outFile}`);
      return;
    }

    const totalFrames = Math.round(duration * opt.fps);
    const ffArgs = opt.transparent
      ? ['-y', '-f', 'image2pipe', '-framerate', String(opt.fps), '-i', '-',
         '-c:v', 'png', '-r', String(opt.fps), outFile]
      : ['-y', '-f', 'image2pipe', '-framerate', String(opt.fps), '-i', '-',
         '-c:v', 'libx264', '-preset', 'slow', '-crf', String(opt.crf),
         '-pix_fmt', 'yuv420p', '-r', String(opt.fps), '-movflags', '+faststart', outFile];
    const ff = spawn(findFfmpeg(), ffArgs, { stdio: ['pipe', 'inherit', 'pipe'] });
    let ffErr = '';
    ff.stderr.on('data', d => { ffErr += d; });
    const done = new Promise((res, rej) => {
      ff.on('close', code => code === 0 ? res() : rej(new Error(`ffmpeg exited ${code}\n${ffErr.slice(-2000)}`)));
      ff.on('error', rej);
    });

    for (let f = 0; f < totalFrames; f++) {
      await seek(f / opt.fps);
      const buf = await page.screenshot({ type: 'png', omitBackground: opt.transparent });
      await new Promise((res, rej) => ff.stdin.write(buf, e => e ? rej(e) : res()));
      if (f % opt.fps === 0) process.stdout.write(`\r${f}/${totalFrames} frames`);
    }
    ff.stdin.end();
    await done;
    console.log(`\nrendered ${totalFrames} frames @${opt.fps}fps -> ${outFile}`);
  } finally {
    await browser.close();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
