import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const ffmpegPath = "C:\\Users\\HP\\Desktop\\marketplace\\node_modules\\@remotion\\compositor-win32-x64-msvc\\ffmpeg.exe";
const imagePath = "C:\\Users\\HP\\Desktop\\restaurant-website\\public\\media\\launch-card.jpg";
const audioPath = "C:\\Users\\HP\\Desktop\\marketplace\\data\\music\\upbeat-100bpm-28s.wav";
const outputPath = "C:\\Users\\HP\\Desktop\\restaurant-website\\public\\media\\launch-card-video.mp4";

console.log("Generating launch video from:", imagePath);

// Video parameters: 12 seconds, 30 fps, 1080x1920 vertical format (TikTok & Instagram Reel ready)
const filterGraph = [
  // 1. Create blurred ambient background
  `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=30,eq=brightness=-0.25:contrast=1.15[bg]`,
  // 2. Card with subtle smooth zoom (1080x1080 scaled down slightly to 960x960 for margins)
  `[0:v]scale=960:960,zoompan=z='min(zoom+0.0003,1.06)':d=360:s=960x960:fps=30[card]`,
  // 3. Overlay the card onto the background centered vertically (y=480)
  `[bg][card]overlay=x=(W-w)/2:y=(H-h)/2[base]`,
  // 4. Add Top Badge & Title text
  `[base]drawtext=fontfile='C\\:/Windows/Fonts/segoeuib.ttf':text='🔥 ZAIQA ROYAL GRILL 🔥':fontsize=52:fontcolor=white:box=1:boxcolor=0xea580c@0.85:boxborderw=24:x=(w-text_w)/2:y=240[t1]`,
  `[t1]drawtext=fontfile='C\\:/Windows/Fonts/segoeuib.ttf':text='✨ GRAND LAUNCH IN KARACHI ✨':fontsize=36:fontcolor=0xfef08a:x=(w-text_w)/2:y=350[t2]`,
  // 5. Add Bottom CTA & Features text
  `[t2]drawtext=fontfile='C\\:/Windows/Fonts/segoeuib.ttf':text='Authentic Dum Pukht Biryani & Charcoal BBQ':fontsize=34:fontcolor=white:x=(w-text_w)/2:y=1520[t3]`,
  `[t3]drawtext=fontfile='C\\:/Windows/Fonts/segoeuib.ttf':text='🛵 Express Delivery · Order Online Now!':fontsize=42:fontcolor=white:box=1:boxcolor=0x16a34a@0.9:boxborderw=22:x=(w-text_w)/2:y=1610[v]`,
  // 6. Audio fade in and fade out
  `[1:a]afade=t=in:ss=0:d=1,afade=t=out:st=10.5:d=1.5,volume=1.0[a]`
].join(";");

const args = [
  "-y",
  "-loop", "1",
  "-i", imagePath,
  "-i", audioPath,
  "-filter_complex", filterGraph,
  "-map", "[v]",
  "-map", "[a]",
  "-t", "12",
  "-r", "30",
  "-c:v", "libx264",
  "-preset", "fast",
  "-pix_fmt", "yuv420p",
  "-b:v", "3500k",
  "-c:a", "aac",
  "-b:a", "128k",
  "-ar", "44100",
  "-movflags", "+faststart",
  outputPath
];

const proc = spawn(ffmpegPath, args, { stdio: "inherit" });

proc.on("close", (code) => {
  if (code === 0) {
    const stat = fs.statSync(outputPath);
    console.log(`Video created successfully! Size: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
    process.exit(0);
  } else {
    console.error(`FFmpeg exited with error code: ${code}`);
    process.exit(code);
  }
});

