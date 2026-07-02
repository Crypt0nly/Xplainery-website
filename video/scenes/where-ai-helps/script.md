# "Where could AI help you?" — IG Reel (1080×1920, 30fps)

Reel version of the site's use-case explorer (`src/i18n/dictionaries/en.ts`,
`useCases`). Ten scenes, ~33.6s. Durations are ESTIMATES at a natural VO pace
(~2.4 words/s); once the real voiceover exists, replace each duration with the
spoken phrase length from the Whisper word timestamps and re-run `build.sh`.

Record the VO lines below (or hand them to your VO tool), run Whisper with
`verbose_json` + word granularity elsewhere, and commit both the audio and the
JSON into `video/audio/`.

| # | scene    | template            | est. dur | VO line |
|---|----------|---------------------|----------|---------|
| 01 | hook     | hook-title          | 2.8s | Where could AI actually help you? |
| 02 | count    | stat-counter        | 3.6s | Not someday — this week. Six places you're losing hours. |
| 03 | email    | use-case-card       | 3.4s | Newsletters and replies — drafted in minutes, in your tone. |
| 04 | content  | use-case-card       | 3.4s | One idea becomes a month of on-brand content. |
| 05 | sales    | use-case-card       | 3.4s | Proposals tailored to each client — in a coffee break. |
| 06 | support  | use-case-card       | 3.4s | Caring customer answers, instantly. No more copy-paste. |
| 07 | research | use-case-card       | 3.4s | Forty pages become ten bullets you can act on. |
| 08 | admin    | use-case-card       | 3.4s | And the SOPs and busywork? They write themselves. |
| 09 | cta      | hook-title          | 3.6s | Pick your quick win — we'll set it up with your team. |
| 10 | outro    | logo-outro          | 3.2s | (brand sting — music only) |

Swap-in-real-audio procedure:
1. `ffmpeg -i vo.(mp3|mp4) -vn -ac 1 -ar 16000 audio/vo.wav` (if source is video)
2. Trim dead air on body scenes only: `tools/trim-silence.sh` — then re-transcribe
3. From the word JSON, set each scene's start/end at phrase boundaries
4. Cut per-scene audio: `ffmpeg -i audio/vo-trim.wav -ss <start> -to <end> audio/scene-NN.wav`
5. Update `DUR[NN]` in `build.sh` to the real phrase durations
6. Re-run `build.sh` — it muxes `audio/scene-NN.wav` when present, silence otherwise
