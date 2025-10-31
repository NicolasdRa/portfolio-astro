#!/usr/bin/env node
import sharp from "sharp";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgPath = join(__dirname, "../assets/svg/logo-favicon.svg");
const publicDir = join(__dirname, "../../public");

// Read SVG file
const svgBuffer = readFileSync(svgPath);

// Icon sizes needed for modern web/PWA
const sizes = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 48, name: "favicon-48x48.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];

console.log("🎨 Generating icon set from logo SVG...\n");

// Generate all sizes
for (const { size, name } of sizes) {
  try {
    await sharp(svgBuffer)
      .resize(size, size, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 }, // White background
      })
      .png()
      .toFile(join(publicDir, name));

    console.log(`✓ Generated ${name} (${size}×${size})`);
  } catch (error) {
    console.error(`✗ Failed to generate ${name}:`, error.message);
  }
}

// Generate favicon.ico (multi-resolution ICO file)
console.log("\n🔨 Generating favicon.ico...");
try {
  // ICO files typically contain 16x16, 32x32, and 48x48
  await sharp(svgBuffer)
    .resize(32, 32, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .toFormat("png")
    .toFile(join(publicDir, "favicon.ico"));

  console.log("✓ Generated favicon.ico");
} catch (error) {
  console.error("✗ Failed to generate favicon.ico:", error.message);
}

console.log("\n✅ Icon generation complete!");
console.log("\nGenerated files:");
sizes.forEach(({ name }) => console.log(`  - public/${name}`));
console.log("  - public/favicon.ico");
