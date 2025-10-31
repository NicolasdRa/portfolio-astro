#!/usr/bin/env node
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '../../public');
const jpgPath = join(publicDir, 'main.jpg');
const webpPath = join(publicDir, 'main.webp');

console.log('🖼️  Optimizing OG image for better performance...\n');

try {
  // Generate optimized WebP version (better compression, smaller file size)
  await sharp(jpgPath)
    .webp({ quality: 85, effort: 6 }) // High quality, good compression
    .toFile(webpPath);

  // Get file sizes for comparison
  const fs = await import('fs');
  const jpgSize = fs.statSync(jpgPath).size;
  const webpSize = fs.statSync(webpPath).size;
  const savings = ((1 - webpSize / jpgSize) * 100).toFixed(1);

  console.log(`✓ Created main.webp (${(webpSize / 1024).toFixed(1)}KB)`);
  console.log(`  Original JPG: ${(jpgSize / 1024).toFixed(1)}KB`);
  console.log(`  File size reduction: ${savings}%\n`);

  console.log('✅ OG image optimization complete!');
  console.log('\nRecommendation:');
  console.log('  - Use main.webp for Open Graph meta tags (smaller, modern browsers)');
  console.log('  - Keep main.jpg as fallback for older platforms');
} catch (error) {
  console.error('✗ Failed to optimize image:', error.message);
}
