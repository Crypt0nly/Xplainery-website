#!/usr/bin/env bash
# Build the "Where could AI help you?" IG reel end-to-end.
# Renders every scene, muxes per-scene audio (real VO cut if
# ../../audio/scene-NN.wav exists, silence otherwise), concats to final.
#
# Usage: bash build.sh            (from this directory)
# Output: ../../out/where-ai-helps.mp4
set -euo pipefail
cd "$(dirname "$0")"
ROOT=../..
OUT=$ROOT/out/wah
mkdir -p "$OUT"

render() { # render <nn> <template> <duration> <params>
  local nn=$1 tpl=$2 dur=$3 params=$4
  echo "── scene $nn ($tpl, ${dur}s)"
  node "$ROOT/render-scene.js" "$ROOT/templates/$tpl" "$OUT/$nn-silent.mp4" "$dur" --params "$params"
  if [[ -f "$ROOT/audio/scene-$nn.wav" ]]; then
    bash "$ROOT/tools/mux-audio.sh" "$OUT/$nn-silent.mp4" "$ROOT/audio/scene-$nn.wav" "$OUT/$nn.mp4"
  else
    ffmpeg -y -loglevel error -i "$OUT/$nn-silent.mp4" -f lavfi -t "$dur" -i anullsrc=r=48000:cl=stereo \
      -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -shortest "$OUT/$nn.mp4"
  fi
}

# Durations are VO-pace estimates; replace with Whisper phrase lengths later.
render 01 hook-title.html    2.8 'text=Where could AI actually help you?&accent=2&kicker=xplainery'
render 02 stat-counter.html  3.6 'value=6&suffix=&label=places you lose hours every week&color=coral'
render 03 use-case-card.html 3.4 'icon=email&idx=01&name=Email %26 outreach&pain=Newsletters, replies and outreach quietly eat hours every week.&win=Drafted in minutes, in your tone.&progress=0.166'
render 04 use-case-card.html 3.4 'icon=content&idx=02&name=Marketing %26 content&pain=A content calendar that never fills itself.&win=One idea becomes a month of content.&progress=0.333'
render 05 use-case-card.html 3.4 'icon=sales&idx=03&name=Sales %26 proposals&pain=Proposals and follow-ups slow your pipeline down.&win=Client-ready drafts in a coffee break.&progress=0.5'
render 06 use-case-card.html 3.4 'icon=support&idx=04&name=Customer support&pain=Repetitive questions pile up, response times slip.&win=Caring answers, instantly.&progress=0.666'
render 07 use-case-card.html 3.4 'icon=research&idx=05&name=Research %26 reports&pain=Hours lost gathering, reading and summarising.&win=Forty pages become ten bullets.&progress=0.833'
render 08 use-case-card.html 3.4 'icon=admin&idx=06&name=Admin %26 operations&pain=Scheduling, docs and data entry steal your focus.&win=SOPs that write themselves.&progress=1'
render 09 hook-title.html    3.6 'text=Pick your quick win&accent=2,3&kicker=your move'
render 10 logo-outro.html    3.2 'tagline=AI, explained simply'

bash "$ROOT/tools/concat.sh" "$ROOT/out/where-ai-helps.mp4" \
  "$OUT"/01.mp4 "$OUT"/02.mp4 "$OUT"/03.mp4 "$OUT"/04.mp4 "$OUT"/05.mp4 \
  "$OUT"/06.mp4 "$OUT"/07.mp4 "$OUT"/08.mp4 "$OUT"/09.mp4 "$OUT"/10.mp4
echo "final: $ROOT/out/where-ai-helps.mp4"
