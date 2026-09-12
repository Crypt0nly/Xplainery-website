#!/usr/bin/env node
/**
 * transcribe.js — OpenAI Whisper transcription with word-level timestamps.
 *
 * Usage: OPENAI_API_KEY=sk-... node transcribe.js <audio.(wav|mp3)> [out.json]
 *
 * Output: verbose_json with a top-level `words` array of
 * { word, start, end } — the timing source for scene cutting and
 * caption-karaoke `times=` params.
 *
 * Cost: ~$0.006/min of audio. Requires network access to api.openai.com
 * (NOT reachable from the default Claude Code remote sandbox network policy —
 * run locally, or loosen the environment's network policy).
 */
const fs = require('fs');
const path = require('path');

const file = process.argv[2];
const out = process.argv[3] || (file ? file.replace(/\.\w+$/, '') + '.words.json' : null);
if (!file) {
  console.error('Usage: node transcribe.js <audio.wav|mp3> [out.json]');
  process.exit(1);
}
const key = process.env.OPENAI_API_KEY;
if (!key) {
  console.error('OPENAI_API_KEY is not set.');
  process.exit(1);
}

const fd = new FormData();
fd.append('file', new Blob([fs.readFileSync(file)]), path.basename(file));
fd.append('model', 'whisper-1');
fd.append('response_format', 'verbose_json');
fd.append('timestamp_granularities[]', 'word');
fd.append('timestamp_granularities[]', 'segment');

fetch('https://api.openai.com/v1/audio/transcriptions', {
  method: 'POST',
  headers: { Authorization: `Bearer ${key}` },
  body: fd,
})
  .then(async r => {
    if (!r.ok) throw new Error(`Whisper API ${r.status}: ${await r.text()}`);
    return r.json();
  })
  .then(j => {
    fs.writeFileSync(out, JSON.stringify(j, null, 2));
    console.log(`${j.words?.length ?? 0} words, ${j.duration}s -> ${out}`);
  })
  .catch(e => { console.error(e.message || e); process.exit(1); });
