// @ts-check
/**
 * Equinox Colors — Icon Generator
 *
 * Converts images/icon.svg into rasterised PNG files at the sizes required by
 * each marketplace:
 *
 *  VS Code Marketplace  : 128 × 128 (required), 256 × 256 (recommended)
 *  JetBrains Marketplace: 40 × 40 (plugin list), 80 × 80 (@2×), 200 × 200
 *  General / GitHub     : 16, 32, 48, 64, 128, 256, 512, 1024
 *
 * Requires: sharp  (npm install --save-dev sharp)
 * Usage   : node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SVG_PATH = path.join(ROOT, 'images', 'icon.svg');
const ICONS_DIR = path.join(ROOT, 'images', 'icons');

/** Sizes to generate (pixels, square) */
const SIZES = [16, 32, 40, 48, 64, 80, 128, 200, 256, 512, 1024];

async function main() {
    if (!fs.existsSync(SVG_PATH)) {
        console.error(`❌ Source SVG not found: ${SVG_PATH}`);
        process.exit(1);
    }

    fs.mkdirSync(ICONS_DIR, { recursive: true });
    console.log('🎨 Equinox Colors — Icon Generator\n');
    console.log(`Source : ${path.relative(ROOT, SVG_PATH)}`);
    console.log(`Output : ${path.relative(ROOT, ICONS_DIR)}/\n`);

    const svgBuffer = fs.readFileSync(SVG_PATH);

    for (const size of SIZES) {
        const outFile = path.join(ICONS_DIR, `icon-${size}.png`);
        await sharp(svgBuffer)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
            .png({ compressionLevel: 9 })
            .toFile(outFile);
        console.log(`  ✓ icon-${size}.png  (${size}×${size})`);
    }

    // Convenience copies for each marketplace at their canonical names
    const copies = [
        {
            src: 'icon-128.png',
            dest: path.join(ROOT, 'images', 'icon-128.png'),
        },
        {
            src: 'icon-256.png',
            dest: path.join(ROOT, 'images', 'icon-256.png'),
        },
    ];
    for (const { src, dest } of copies) {
        fs.copyFileSync(path.join(ICONS_DIR, src), dest);
        console.log(`  ✓ ${path.relative(ROOT, dest)}  (convenience copy)`);
    }

    console.log('\n✨ Done!');
}

main().catch((err) => {
    console.error('❌', err.message ?? err);
    process.exit(1);
});
