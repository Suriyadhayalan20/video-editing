import { getVideoMetadata } from '@remotion/media-utils';

async function main() {
  const metadata = await getVideoMetadata('http://localhost:3000/linkedin-ads.mp4').catch(async () => {
    // try direct path or use a local server
    // It requires a URL, not a file path for getVideoMetadata usually, but local files in remotion can be tricky.
    return require('child_process').execSync('npx ffprobe-static-bin -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "public/linkedin-ads.mp4"');
  });
  console.log(metadata);
}
main();
