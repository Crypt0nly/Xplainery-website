#!/usr/bin/env bash
# Concat final (audio-muxed) scenes into one video, drift-free.
# Usage: tools/concat.sh <output.mp4> <scene1.mp4> <scene2.mp4> ...
#
# Every input is normalized to 30fps / sar 1 / yuv420p and 48kHz stereo with
# first_pts=0 on each audio stream BEFORE the concat filter — mixed fps/sar or
# offset audio pts across inputs is what causes A/V drift in naive concats.
# All inputs must already have an audio stream (run mux-audio.sh first).
set -euo pipefail
OUT="$1"; shift
N=$#
INPUTS=()
FILTER=""
i=0
for f in "$@"; do
  INPUTS+=(-i "$f")
  FILTER+="[$i:v:0]fps=30,setsar=1,format=yuv420p[v$i];"
  FILTER+="[$i:a:0]aresample=48000:first_pts=0,aformat=sample_fmts=fltp:channel_layouts=stereo[a$i];"
  i=$((i+1))
done
for ((j=0; j<N; j++)); do FILTER+="[v$j][a$j]"; done
FILTER+="concat=n=$N:v=1:a=1[v][a]"

ffmpeg -y "${INPUTS[@]}" -filter_complex "$FILTER" \
  -map "[v]" -map "[a]" \
  -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -movflags +faststart "$OUT"
