# Xplainery motion-graphic video pipeline

Free-tools-only motion graphics: HTML/GSAP scenes rendered to MP4 with headless
Chromium + ffmpeg. No Premiere, no After Effects, no CapCut.

> **Why not motion-pack / hyperframes?** The Claude Code remote sandbox's
> network policy blocks GitHub repos outside this one, so the IBRA Motion Pack
> and the HyperFrames CLI can't be cloned here. This directory is a
> self-contained equivalent: same scene contract (one HTML file, one GSAP
> timeline), same renderer interface (`render-scene.js <scene> <out> <dur>`),
> hermetic at render time (GSAP + fonts vendored, zero network).

## Layout

```
video/
├── render-scene.js       deterministic HTML/GSAP -> MP4 (or PNG preview) renderer
├── transcribe.js         OpenAI Whisper word-level transcription (needs key + network)
├── templates/            reusable scene templates (grow this library per request)
│   ├── _brand.css        brand tokens: ink/cream/coral, fonts, topo bg, IG safe zones
│   ├── hook-title.html   kinetic headline   ?text=&accent=1,2&kicker=
│   ├── stat-counter.html big count-up       ?value=87&suffix=%&label=&color=coral|green|blue
│   ├── typewriter-terminal.html  terminal   ?lines=$ cmd|> output|...&title=
│   ├── progress-bar.html progress fill      ?label=&pct=100&sub=&color=
│   ├── caption-karaoke.html word-karaoke pill (transparent, for overlays)
│   │                                        ?words=a,b,c&times=0.1,0.5,0.9  (Whisper times)
│   └── logo-outro.html   logo bloom outro   ?name=Xplainery&tagline=
├── tools/
│   ├── trim-silence.sh   strip dead air (body scenes only — see pitfalls)
│   ├── mux-audio.sh      audio onto silent scene (explicit stream mapping)
│   └── concat.sh         drift-free normalized concat of final scenes
├── vendor/               gsap.min.js + Inter/JetBrains Mono woff2 (hermetic renders)
├── scenes/               per-project scene HTML (thin wrappers or bespoke scenes)
├── audio/                voiceover + per-scene audio cuts (commit the source VO here)
└── out/                  rendered output (gitignored)
```

## Renderer

```bash
# full render (vertical reel, 30fps, CRF 17, preset slow)
node render-scene.js templates/stat-counter.html out/scene-03.mp4 4.2 \
  --params "value=87&label=faster than manual editing"

# landscape
node render-scene.js scenes/intro.html out/intro.mp4 5 --w 1920 --h 1080

# single preview frame at t=1.5s (approve before committing to a full render)
node render-scene.js templates/hook-title.html out/preview.png 0 --frame 1.5

# transparent overlay render (PNG-codec .mov, alpha preserved) for compositing
# over shot footage with ffmpeg overlay
node render-scene.js templates/caption-karaoke.html out/captions.mov 3 --transparent
```

It renders deterministically: the GSAP global timeline is paused and seeked to
`frame/fps` for every frame, so infinite pulse tweens are still frame-exact.

## Scene contract (for new templates)

1. One self-contained HTML file: inline `<style>` (import `_brand.css`) + one
   GSAP timeline. Load GSAP via `<script src="../vendor/gsap.min.js">`.
2. Brand tokens only: ink `#0A0808`, cream `#EDD9BC`, coral `#D97757`,
   green `#4CD964`, blue `#4080F0`. Inter for sans, JetBrains Mono for code.
3. `fromTo()` with explicit end states — never `from()` on `opacity:0` elements
   (the tween reverts to 0 after completion).
4. Infinite yoyo/pulse tweens go on `gsap.to()` directly, NOT on the main
   timeline, so they don't drift the playhead.
5. Loop-safe and render-deterministic: correct when seeked to any `t`.
6. Parameterize via `URLSearchParams` with sensible defaults; pass values with
   `--params` at render time.
7. New templates are saved into `templates/` — the library grows per request.

## Full pipeline (once voiceover + topic are in)

1. `ffmpeg -y -i input.(mp4|mov) -vn -ac 1 -ar 16000 audio/vo.wav` (if source is video)
2. `node transcribe.js audio/vo.wav` → word timestamps (see network note below)
3. `tools/trim-silence.sh audio/vo.wav audio/vo-trim.wav` — body scenes with dead
   air only; then re-transcribe the trimmed file
4. Break transcript into scenes (one spoken idea, 3–8s), pick/author a template each
5. Cut per-scene audio: `ffmpeg -i audio/vo-trim.wav -ss <start> -to <end> audio/scene-N.wav`
6. Render each scene silent at the spoken duration (`render-scene.js`)
7. `tools/mux-audio.sh out/scene-N.mp4 audio/scene-N.wav out/final-N.mp4`
8. `tools/concat.sh out/final.mp4 out/final-*.mp4`
9. Face-cam composites: render overlays `--transparent`, then
   `ffmpeg -i footage.mp4 -i out/overlay.mov -filter_complex "[0:v][1:v]overlay=0:0" ...`

### IG Reel safe zones (1080×1920)

- Top 0–220px: handle/follow — keep graphics out
- Bottom 1500–1920px: caption/actions — keep graphics out
- Face in frame: graphics lower-half only (y > 1100), never across the face
- Debug: add `class="show-zones"` to `<body>` to visualize the zones

## Environment constraints (Claude Code remote sandbox)

- **ffmpeg**: not preinstalled; a full static build ships in the
  `imageio-ffmpeg` PyPI wheel → `pip3 install imageio-ffmpeg && ln -sf $(python3 -c
  "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())") /usr/local/bin/ffmpeg`
- **Chromium**: preinstalled at `/opt/pw-browsers/chromium` (override with `CHROME_BIN`)
- **Network**: only package registries are reachable. `api.openai.com`,
  Wikimedia, the iTunes lookup API and HuggingFace are all blocked, so
  transcription and logo fetching must happen outside the sandbox (or the
  environment's network policy must allow those hosts). Whisper word-JSON
  committed into `audio/` works as a drop-in replacement for step 2.
