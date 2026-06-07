const cp = require('child_process');
const ffprobe = require('ffprobe-static');

const file = process.argv[2];
try {
  const duration = cp.execSync(`${ffprobe.path} -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${file}"`).toString().trim();
  console.log(duration);
} catch (e) {
  console.error("Error:", e.message);
}
