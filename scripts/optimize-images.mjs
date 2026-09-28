// scripts/optimize-images.mjs
import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";

const SRC_DIR = "src/assets";
const FORMATS = [".png", ".jpg", ".jpeg"];
const QUALITY = 80;

async function convert(file) {
  const input = join(SRC_DIR, file);
  const output = join(SRC_DIR, file.replace(extname(file), ".webp"));

  // 🛡️ محافظ: اگه فایل خودش webp ـه، اصلاً ورود نکن
  if (extname(file).toLowerCase() === ".webp") {
    console.log(`⏭️  ${file} — از قبل webp ـه، رد شد`);
    return;
  }

  const before = statSync(input).size;
  await sharp(input).webp({ quality: QUALITY }).toFile(output);
  const after = statSync(output).size;
  const saved = ((1 - after / before) * 100).toFixed(0);

  console.log(
    `✅ ${file} → ${file.replace(extname(file), ".webp")}  ` +
      `${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (-${saved}%)`
  );
}

// 🛡️ محافظ دوم: فقط فایل‌هایی که واقعاً png/jpg ـن
const files = readdirSync(SRC_DIR).filter((f) =>
  FORMATS.includes(extname(f).toLowerCase())
);

if (files.length === 0) {
  console.log("هیچ PNG/JPG ای برای تبدیل نیست — همه قبلاً تبدیل شدن 🎉");
  process.exit(0);
}

console.log(`🔄 ${files.length} فایل برای تبدیل پیدا شد...\n`);

let ok = 0;
for (const file of files) {
  try {
    await convert(file);
    ok++;
  } catch (err) {
    // 🛡️ محافظ سوم: یکی کرش شه، بقیه نرن باهاش
    console.log(`❌ ${file}: ${err.message}`);
  }
}

console.log(`\n🎉 تمام — ${ok}/${files.length} فایل تبدیل شد`);