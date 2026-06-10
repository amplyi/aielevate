import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const assetsDir = path.resolve('ai-elevate-cockpit-plugin-v4-standalone/app/assets');

const profiles = {
  'world-map.png': { maxWidth: 960, png: { quality: 70, compressionLevel: 9, palette: true } },
  'ae-logo-blue.png': { maxWidth: 512, png: { quality: 82, compressionLevel: 9, palette: true } },
  default: { maxWidth: 960, png: { quality: 80, compressionLevel: 9, palette: true } },
};

async function optimizeFile(filePath) {
  const name = path.basename(filePath);
  const profile = profiles[name] || profiles.default;
  const before = (await fs.stat(filePath)).size;

  const image = sharp(filePath, { failOn: 'none' });
  const meta = await image.metadata();
  const resizeWidth = meta.width && meta.width > profile.maxWidth ? profile.maxWidth : undefined;

  const buffer = await image
    .resize(resizeWidth ? { width: resizeWidth, withoutEnlargement: true } : undefined)
    .png(profile.png)
    .toBuffer();

  await fs.writeFile(filePath, buffer);
  const after = buffer.length;
  const saved = before - after;
  const pct = before ? Math.round((saved / before) * 100) : 0;
  console.log(`${name}: ${formatKb(before)} -> ${formatKb(after)} (-${pct}%)`);
  return { before, after };
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const files = (await fs.readdir(assetsDir))
  .filter((name) => name.toLowerCase().endsWith('.png'))
  .map((name) => path.join(assetsDir, name));

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const result = await optimizeFile(file);
  totalBefore += result.before;
  totalAfter += result.after;
}

console.log(`Total: ${formatKb(totalBefore)} -> ${formatKb(totalAfter)} (-${Math.round(((totalBefore - totalAfter) / totalBefore) * 100)}%)`);
