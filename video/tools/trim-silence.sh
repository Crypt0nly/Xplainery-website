#!/usr/bin/env bash
# Strip dead air from voiceover audio (silences > 0.6s at -38dB).
# Usage: tools/trim-silence.sh <audio.wav> <audio-trim.wav>
#
# ONLY apply to body audio with real dead air. On intro/outro audio with no
# silence this still nudges timing slightly and breaks lip-sync — skip it there.
# Re-transcribe the trimmed file afterwards so timestamps match the clean cut.
set -euo pipefail
ffmpeg -y -i "$1" -af "silenceremove=start_periods=1:start_silence=0.3:start_threshold=-38dB:stop_periods=-1:stop_duration=0.6:stop_threshold=-38dB" "$2"
