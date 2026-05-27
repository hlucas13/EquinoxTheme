// @ts-check
/**
 * Equinox Colors — Marketplace Packager
 *
 * Assembles ready-to-submit bundles for each marketplace after `npm run build`.
 *
 *   VS Code Marketplace  → dist/marketplace/vscode/equinox-colors-<version>.vsix
 *   JetBrains Marketplace→ dist/marketplace/jetbrains/equinox-colors-<version>.zip
 *
 * Usage:
 *   node scripts/package-marketplace.js            # packages both
 *   node scripts/package-marketplace.js vscode     # VS Code only
 *   node scripts/package-marketplace.js jetbrains  # JetBrains only
 *
 * Prerequisites:
 *   - npm run build  (produces dist/vscode, dist/jetbrains)
 *   - vsce installed: npm install -g @vscode/vsce   (for VS Code .vsix)
 *   - archiver installed: npm install --save-dev archiver
 */

const fs = require('fs');
const path = require('path');
const { execFileSync, execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(DIST, 'marketplace');

// Read version from root package.json
const rootPkg = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8')
);
const VERSION = rootPkg.version;

const target = process.argv[2] ?? 'all';

// ── Helpers ──────────────────────────────────────────────────────────────────

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
    ensureDir(dest);
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function assertDistExists(subDir) {
    const dir = path.join(DIST, subDir);
    if (!fs.existsSync(dir)) {
        console.error(
            `\n❌  dist/${subDir}/ not found. Run "npm run build" first.\n`
        );
        process.exit(1);
    }
}

// ── VS Code ──────────────────────────────────────────────────────────────────

function packageVsCode() {
    console.log('\n📦  Packaging VS Code extension…');

    assertDistExists('vscode');

    const stageDir = path.join(OUT, 'vscode', '_stage');
    const outDir = path.join(OUT, 'vscode');
    ensureDir(outDir);

    // Stage directory mirrors what vsce expects alongside the manifest
    const vscodePkg = path.join(ROOT, 'marketplace', 'vscode');

    // Copy marketplace package.json as package.json into stage
    ensureDir(stageDir);
    fs.copyFileSync(
        path.join(vscodePkg, 'package.json'),
        path.join(stageDir, 'package.json')
    );

    // README and LICENSE
    fs.copyFileSync(
        path.join(vscodePkg, 'README.md'),
        path.join(stageDir, 'README.md')
    );
    fs.copyFileSync(path.join(ROOT, 'LICENSE'), path.join(stageDir, 'LICENSE'));

    // Icon (128×128 as required by VS Code Marketplace)
    const icon128 = path.join(ROOT, 'images', 'icons', 'icon-128.png');
    if (fs.existsSync(icon128)) {
        fs.copyFileSync(icon128, path.join(stageDir, 'icon-128.png'));
    } else {
        console.warn(
            '  ⚠  images/icons/icon-128.png not found — run "npm run icons" first.'
        );
    }

    // Theme JSON files into themes/
    const themesOut = path.join(stageDir, 'themes');
    ensureDir(themesOut);
    for (const f of fs.readdirSync(path.join(DIST, 'vscode'))) {
        if (f.endsWith('.json')) {
            fs.copyFileSync(
                path.join(DIST, 'vscode', f),
                path.join(themesOut, f)
            );
        }
    }

    // Try to run vsce to produce a .vsix
    try {
        execSync('vsce --version', { stdio: 'ignore' });
        const vsixName = `equinox-colors-${VERSION}.vsix`;
        execFileSync(
            'vsce',
            [
                'package',
                '--out',
                path.join(outDir, vsixName),
                '--no-dependencies',
            ],
            { cwd: stageDir, stdio: 'inherit' }
        );
        console.log(`  ✓ ${path.relative(ROOT, path.join(outDir, vsixName))}`);
    } catch {
        console.warn(
            '  ⚠  vsce not found — staged files are ready in:\n' +
                `     ${path.relative(ROOT, stageDir)}/\n` +
                '     Install vsce with: npm install -g @vscode/vsce\n' +
                '     Then run: vsce package --out dist/marketplace/vscode/ from that directory.'
        );
    }
}

// ── JetBrains ────────────────────────────────────────────────────────────────

async function packageJetBrains() {
    console.log('\n📦  Packaging JetBrains plugin…');

    assertDistExists('jetbrains');

    // Check archiver is available
    let archiver;
    try {
        archiver = require('archiver');
    } catch {
        console.error(
            '  ❌  archiver not found.\n' +
                '     Run: npm install --save-dev archiver\n'
        );
        process.exit(1);
    }

    const pluginDir = path.join(OUT, 'jetbrains', '_stage', 'equinox-colors');
    const metaDir = path.join(pluginDir, 'META-INF');
    const colorsOut = path.join(pluginDir, 'colors');
    const themesOut = path.join(pluginDir, 'themes');

    // Clean stage
    fs.rmSync(path.join(OUT, 'jetbrains', '_stage'), {
        recursive: true,
        force: true,
    });
    ensureDir(metaDir);
    ensureDir(colorsOut);
    ensureDir(themesOut);

    // plugin.xml
    fs.copyFileSync(
        path.join(ROOT, 'marketplace', 'jetbrains', 'plugin.xml'),
        path.join(metaDir, 'plugin.xml')
    );

    // Plugin icon (40×40) — required by JetBrains Marketplace
    const icon40 = path.join(ROOT, 'images', 'icons', 'icon-40.png');
    if (fs.existsSync(icon40)) {
        fs.copyFileSync(icon40, path.join(metaDir, 'pluginIcon.png'));
        console.log('  ✓ META-INF/pluginIcon.png  (40×40)');
    } else {
        console.warn(
            '  ⚠  images/icons/icon-40.png not found — run "npm run icons" first.'
        );
    }

    // .icls color scheme files
    const jetbrainsDistDir = path.join(DIST, 'jetbrains');
    for (const f of fs.readdirSync(jetbrainsDistDir)) {
        if (f.endsWith('.icls')) {
            fs.copyFileSync(
                path.join(jetbrainsDistDir, f),
                path.join(colorsOut, f)
            );
        }
    }

    // .theme.json UI theme files
    const themesDistDir = path.join(jetbrainsDistDir, 'themes');
    if (fs.existsSync(themesDistDir)) {
        for (const f of fs.readdirSync(themesDistDir)) {
            if (f.endsWith('.theme.json')) {
                fs.copyFileSync(
                    path.join(themesDistDir, f),
                    path.join(themesOut, f)
                );
            }
        }
    }

    // Step 1: Create inner JAR (equinox-colors.jar) containing META-INF + themes + colors
    // A JAR is just a ZIP with .jar extension — archiver handles it fine.
    const outDir = path.join(OUT, 'jetbrains');
    const libDir = path.join(pluginDir, 'lib');
    ensureDir(libDir);
    const jarPath = path.join(libDir, 'equinox-colors.jar');

    await new Promise((resolve, reject) => {
        const jarOutput = fs.createWriteStream(jarPath);
        const jar = archiver('zip', { zlib: { level: 9 } });
        jarOutput.on('close', resolve);
        jar.on('error', reject);
        jar.pipe(jarOutput);
        jar.directory(metaDir, 'META-INF');
        jar.directory(colorsOut, 'colors');
        jar.directory(themesOut, 'themes');
        jar.finalize();
    });
    console.log('  ✓ lib/equinox-colors.jar');

    // Step 2: Create outer ZIP containing equinox-colors/lib/equinox-colors.jar
    const zipName = `equinox-colors-${VERSION}.zip`;
    const zipPath = path.join(outDir, zipName);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
        output.on('close', () => {
            console.log(
                `  ✓ ${path.relative(ROOT, zipPath)}  (${(archive.pointer() / 1024).toFixed(1)} KB)`
            );
            resolve(undefined);
        });
        archive.on('error', reject);
        archive.pipe(output);
        // Only include the lib/ folder — META-INF/plugin.xml lives inside the JAR
        archive.file(jarPath, {
            name: 'equinox-colors/lib/equinox-colors.jar',
        });
        archive.finalize();
    });
}

// ── Entry point ───────────────────────────────────────────────────────────────

async function main() {
    console.log(`🎨  Equinox Colors — Marketplace Packager  (v${VERSION})\n`);
    console.log('═══════════════════════════════════════');

    ensureDir(OUT);

    const tasks = [];
    if (target === 'all' || target === 'vscode') tasks.push(packageVsCode);
    if (target === 'all' || target === 'jetbrains')
        tasks.push(packageJetBrains);

    if (tasks.length === 0) {
        console.error(
            `\n❌  Unknown target "${target}". Use: vscode | jetbrains | all\n`
        );
        process.exit(1);
    }

    for (const task of tasks) {
        await task();
    }

    console.log('\n═══════════════════════════════════════');
    console.log('✨  Done!');
    console.log(`📁  Bundles in: ${path.relative(ROOT, OUT)}/`);
}

main().catch((err) => {
    console.error('❌', err.message ?? err);
    process.exit(1);
});
