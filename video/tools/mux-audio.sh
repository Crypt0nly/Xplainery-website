#!/usr/bin/env bash
# Mux audio onto a silent rendered scene.
# Usage: tools/mux-audio.sh <silent-scene.mp4> <scene-audio.wav> <final-scene.mp4>
#
# Explicit -map 0:v:0 -map 1:a:0 is REQUIRED: without it ffmpeg can pull
# video from the audio source when the "audio" input is a video file.
set -euo pipefail
ffmpeg -y -i "$1" -i "$2" \
  -map 0:v:0 -map 1:a:0 \
  -c:v copy -c:a aac -b:a 192k -shortest "$3"
