import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('public', 'images');
const ORIGINALS_DIR = path.resolve('public', 'images', 'originals');

// Config per folder
const FOLDER_CONFIGS = {
  STUDENT_PNG: { maxWidth: 600, webpQuality: 75, avifQuality: 60 },
  mentors: { maxWidth: 800, webpQuality: 75, avifQuality: 60 },
  memories: { maxWidth: 800, webpQuality: 75, avifQuality: 60 },
  banner: { maxWidth: 1200, webpQuality: 75, avifQuality: 60 },
  Cutouts: { maxWidth: 800, webpQuality: 75, avifQuality: 60 },
  preview: { maxWidth: 1200, webpQuality: 75, avifQuality: 60 },
  root: { maxWidth: 600, webpQuality: 80, avifQuality: 65 } // for logo.png
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

async function processDirectory(dir, relativeFolder = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'originals') continue;
      await processDirectory(fullPath, entry.name);
      continue;
    }

    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;

    const folderKey = relativeFolder || 'root';
    const config = FOLDER_CONFIGS[folderKey] || FOLDER_CONFIGS.root;
    const originalStats = fs.statSync(fullPath);
    const originalSize = originalStats.size;

    // 1. Backup original into originals/<relativeFolder>
    const backupDir = path.join(ORIGINALS_DIR, relativeFolder);
    fs.mkdirSync(backupDir, { recursive: true });
    const backupPath = path.join(backupDir, entry.name);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(fullPath, backupPath);
    }

    const ext = path.extname(entry.name);
    const baseName = path.basename(entry.name, ext);
    const webpPath = path.join(dir, `${baseName}.webp`);
    const avifPath = path.join(dir, `${baseName}.avif`);

    // 2. Process image with sharp
    const sharpInstance = sharp(backupPath);
    const metadata = await sharpInstance.metadata();

    const resizeOptions = {};
    if (metadata.width && metadata.width > config.maxWidth) {
      resizeOptions.width = config.maxWidth;
      resizeOptions.withoutEnlargement = true;
    }

    // Generate WebP
    const webpBuffer = await sharp(backupPath)
      .resize(resizeOptions.width ? resizeOptions : undefined)
      .webp({ quality: config.webpQuality, effort: 6 })
      .toBuffer();
    fs.writeFileSync(webpPath, webpBuffer);

    // Generate AVIF
    const avifBuffer = await sharp(backupPath)
      .resize(resizeOptions.width ? resizeOptions : undefined)
      .avif({ quality: config.avifQuality, effort: 6 })
      .toBuffer();
    fs.writeFileSync(avifPath, avifBuffer);

    // If it's logo.png, also generate an optimized PNG for apple-touch-icon / manifest
    if (entry.name === 'logo.png') {
      const optimizedPng = await sharp(backupPath)
        .resize({ width: 512, withoutEnlargement: true })
        .png({ compressionLevel: 9, quality: 80 })
        .toBuffer();
      fs.writeFileSync(fullPath, optimizedPng);
    }

    const webpStats = fs.statSync(webpPath);
    const savedBytes = originalSize - webpStats.size;
    const savedPct = ((savedBytes / originalSize) * 100).toFixed(1);

    console.log(
      `✓ [${folderKey.padEnd(11)}] ${entry.name.padEnd(30)} ` +
      `${formatBytes(originalSize).padStart(8)} -> ${formatBytes(webpStats.size).padStart(8)} (Saved ${savedPct}%)`
    );
  }
}

async function main() {
  console.log('==================================================');
  console.log('  RK COACHING IMAGE OPTIMIZATION (WebP + AVIF)    ');
  console.log('==================================================\n');

  fs.mkdirSync(ORIGINALS_DIR, { recursive: true });

  await processDirectory(IMAGES_DIR);

  console.log('\nAll images compressed and backed up to public/images/originals/.');
}

main().catch((err) => {
  console.error('Compression failed:', err);
  process.exit(1);
});
