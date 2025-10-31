#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, parse, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsDir = join(__dirname, '../assets/images');

// Supported image formats to convert
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

// Quality settings for WebP conversion
const WEBP_QUALITY = 85; // High quality, good compression

async function getAllImageFiles(dir) {
  const files = [];

  async function walk(currentDir) {
    const entries = await readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        const ext = parse(entry.name).ext.toLowerCase();
        if (imageExtensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  await walk(dir);
  return files;
}

async function convertToWebP(imagePath) {
  const parsed = parse(imagePath);
  const webpPath = join(parsed.dir, `${parsed.name}.webp`);

  // Get original file size
  const originalStats = await stat(imagePath);
  const originalSize = originalStats.size;

  // Convert to WebP
  await sharp(imagePath)
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(webpPath);

  // Get WebP file size
  const webpStats = await stat(webpPath);
  const webpSize = webpStats.size;

  // Calculate savings
  const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
  const relativePath = relative(assetsDir, imagePath);

  return {
    original: imagePath,
    webp: webpPath,
    originalSize,
    webpSize,
    savings,
    relativePath
  };
}

console.log('🖼️  Converting all images in src/assets/images to WebP...\n');

try {
  const imageFiles = await getAllImageFiles(assetsDir);

  console.log(`Found ${imageFiles.length} images to convert\n`);

  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  const results = [];

  for (const imagePath of imageFiles) {
    const result = await convertToWebP(imagePath);
    results.push(result);

    totalOriginalSize += result.originalSize;
    totalWebPSize += result.webpSize;

    const sizeReduction = result.savings >= 0 ? `↓ ${result.savings}%` : `↑ ${Math.abs(result.savings)}%`;
    console.log(`✓ ${result.relativePath}`);
    console.log(`  ${(result.originalSize / 1024).toFixed(1)}KB → ${(result.webpSize / 1024).toFixed(1)}KB ${sizeReduction}`);
  }

  const totalSavings = ((1 - totalWebPSize / totalOriginalSize) * 100).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log('📊 Conversion Summary:');
  console.log('='.repeat(60));
  console.log(`Total images converted: ${results.length}`);
  console.log(`Original total size: ${(totalOriginalSize / 1024).toFixed(1)}KB`);
  console.log(`WebP total size: ${(totalWebPSize / 1024).toFixed(1)}KB`);
  console.log(`Total savings: ${totalSavings}%`);
  console.log('='.repeat(60));

  console.log('\n✅ All images converted to WebP!');
  console.log('\n⚠️  Next steps:');
  console.log('1. Update import statements to use .webp extensions');
  console.log('2. Test the site to ensure all images load correctly');
  console.log('3. Remove original files once verified');

} catch (error) {
  console.error('✗ Error during conversion:', error.message);
  process.exit(1);
}
