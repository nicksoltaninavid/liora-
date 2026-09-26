import { compress } from "wawoff2";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, extname, basename } from "path";

const SRC = "src/fonts";
const files = readdirSync(SRC).filter((f) => extname(f).toLowerCase() === ".ttf");

for (const file of files) {
  const input = join(SRC, file);
  const output = join(SRC, basename(file, extname(file)) + ".woff2");

  const ttf = readFileSync(input);
  const woff2 = await compress(ttf);

  writeFileSync(output, Buffer.from(woff2));

  console.log(
    `✅ ${file} → ${basename(output)}  ` +
    `${(ttf.length / 1024).toFixed(0)}KB → ${(woff2.length / 1024).toFixed(0)}KB`
  );
}