// scripts/optimize-images.mjs
// استفاده:  npm run optimize:images
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "fs";
import { join, extname } from "path";

const SRC_DIR = "src/assets";
const FORMATS = [".webp", ".jpg", ".jpeg"];

// کیفیت ۸۰ = تعادل طلایی؛ ۷۵ سبک‌تره، ۹۰ تقریباً بی‌تفاوت گرون‌تره
const QUALITY = 80;

async function convert(file) {
  const input = join(SRC_DIR, file);
  const output = join(SRC_DIR, file.replace(extname(file), ".webp"));

  const before = statSync(input).size;

  await sharp(input)
    .webp({ quality: QUALITY })
    .toFile(output);

  const after = statSync(output).size;
  const saved = ((1 - after / before) * 100).toFixed(0);

  console.log(
    `✅ ${file} → ${file.replace(extname(file), ".webp")}  ` +
    `${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (-${saved}%)`
  );
}

const files = readdirSync(SRC_DIR).filter((f) =>
  FORMATS.includes(extname(f).toLowerCase())
);

if (files.length === 0) {
  console.log("هیچ PNG/JPG ای پیدا نشد — شاید قبلاً تبدیل شده؟");
  process.exit(0);
}

console.log(`🔄 ${files.length} فایل در حال تبدیل...\n`);

for (const file of files) {
  await convert(file);
}

console.log("\n🎉 تمام! حالا فایل‌های قدیمی PNG رو حذف کن و import ها رو آپدیت کن.");