const cp = require('child_process');
const ffmpeg = require('ffmpeg-static');

// silenceremove filter explanation:
// stop_periods=-1: Remove silence in the middle
// stop_duration=0.3: Silence minimum duration to be considered as silence
// stop_threshold=-30dB: Threshold for silence
try {
  const output = cp.execSync(`${ffmpeg} -y -i public/voiceover2.wav -af "silenceremove=stop_periods=-1:stop_duration=0.2:stop_threshold=-35dB" public/voiceover2_nopause.wav`);
  console.log('Success:', output.toString());
} catch(e) {
  console.error(e.stderr ? e.stderr.toString() : e);
}
