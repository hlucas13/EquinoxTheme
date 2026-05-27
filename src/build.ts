/**
 * Equinox Colors: Build Script
 * Orchestrates compilation of all 4 variants across all 3 platforms
 * Outputs: dist/vscode/*.json, dist/jetbrains/*.icls, dist/terminal/*.terminal
 */

import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
    generateJetBrainsColorScheme,
    generateJetBrainsIslandsColorScheme,
    generateJetBrainsIslandsTheme,
    generateJetBrainsTheme,
    jetBrainsColorSchemeToXml,
    jetBrainsThemeToJson,
} from './platforms/jetbrains';
import { generateTerminalProfile } from './platforms/terminal';
import { generateVsCodeTheme, vscodeThemeToJson } from './platforms/vscode';
import {
    allVariants,
    darkAnsiPalette,
    equinoxDarkContrast,
    equinoxDarkModern,
    equinoxLightContrast,
    equinoxLightSoft,
    lightAnsiPalette,
} from './themes/variants';

const variants = allVariants;

const distDir = path.join(__dirname, '..', 'dist');
const vscodeDir = path.join(distDir, 'vscode');
const jetbrainsDir = path.join(distDir, 'jetbrains');
const jetbrainsThemesDir = path.join(jetbrainsDir, 'themes');
const terminalDir = path.join(distDir, 'terminal');

// Ensure directories exist
function ensureDirectories() {
    [distDir, vscodeDir, jetbrainsDir, jetbrainsThemesDir, terminalDir].forEach(
        (dir) => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        }
    );
    console.log('✓ Created output directories');
}

// Build VS Code themes
function buildVsCodeThemes() {
    console.log('\n📦 Building VS Code themes...');
    variants.forEach((variant) => {
        const theme = generateVsCodeTheme(variant);
        const json = vscodeThemeToJson(theme);
        const filename = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[()]/g, '');
        const filepath = path.join(vscodeDir, `${filename}.json`);
        fs.writeFileSync(filepath, json, 'utf-8');
        console.log(`  ✓ ${variant.name}`);
    });
}

// Build JetBrains color schemes
function buildJetBrainsSchemes() {
    console.log('\n📦 Building JetBrains IDE color schemes...');
    variants.forEach((variant) => {
        const slug = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[()]/g, '');

        // Standard color scheme
        const scheme = generateJetBrainsColorScheme(variant);
        const xml = jetBrainsColorSchemeToXml(scheme);
        fs.writeFileSync(path.join(jetbrainsDir, `${slug}.icls`), xml, 'utf-8');
        console.log(`  ✓ ${variant.name}`);

        // Islands variant color scheme
        const islandsScheme = generateJetBrainsIslandsColorScheme(variant);
        const islandsXml = jetBrainsColorSchemeToXml(islandsScheme);
        fs.writeFileSync(
            path.join(jetbrainsDir, `${slug}-islands.icls`),
            islandsXml,
            'utf-8'
        );
        console.log(`  ✓ ${variant.name} Islands`);

        // UI theme (.theme.json) — classic / non-Islands layout
        const theme = generateJetBrainsTheme(variant);
        const themeJson = jetBrainsThemeToJson(theme);
        fs.writeFileSync(
            path.join(jetbrainsThemesDir, `${slug}.theme.json`),
            themeJson,
            'utf-8'
        );
        console.log(`  ✓ ${variant.name} UI theme`);

        // Islands UI theme (.theme.json) — New UI floating-panel layout
        const islandsTheme = generateJetBrainsIslandsTheme(variant);
        const islandsThemeJson = jetBrainsThemeToJson(islandsTheme);
        fs.writeFileSync(
            path.join(jetbrainsThemesDir, `${slug}-islands.theme.json`),
            islandsThemeJson,
            'utf-8'
        );
        console.log(`  ✓ ${variant.name} Islands UI theme`);
    });
}

// Build macOS Terminal profiles
function buildTerminalProfiles() {
    console.log('\n📦 Building macOS Terminal profiles...');
    const variantsWithAnsi = [
        { variant: equinoxDarkModern, ansi: darkAnsiPalette },
        { variant: equinoxDarkContrast, ansi: darkAnsiPalette },
        { variant: equinoxLightSoft, ansi: lightAnsiPalette },
        { variant: equinoxLightContrast, ansi: lightAnsiPalette },
    ];

    // Build profile data array for the Python generator
    const profiles = variantsWithAnsi.map(({ variant, ansi }) => {
        const profile = generateTerminalProfile(variant, ansi);
        const filename = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[()]/g, '');
        return {
            filename,
            name: profile.name,
            background: profile.backgroundColor,
            foreground: profile.foregroundColor,
            cursor: profile.cursorColor,
            ansi: {
                black: ansi.black,
                red: ansi.red,
                green: ansi.green,
                yellow: ansi.yellow,
                blue: ansi.blue,
                magenta: ansi.magenta,
                cyan: ansi.cyan,
                white: ansi.white,
                brightBlack: ansi.brightBlack,
                brightRed: ansi.brightRed,
                brightGreen: ansi.brightGreen,
                brightYellow: ansi.brightYellow,
                brightBlue: ansi.brightBlue,
                brightMagenta: ansi.brightMagenta,
                brightCyan: ansi.brightCyan,
                brightWhite: ansi.brightWhite,
            },
        };
    });

    // Write JSON data for the Python generator and call it
    const rootDir = path.join(__dirname, '..');
    const profilesJson = path.join(terminalDir, '_profiles.json');
    fs.writeFileSync(profilesJson, JSON.stringify(profiles, null, 2), 'utf-8');

    const pyScript = path.join(rootDir, 'scripts', 'generate-terminal.py');
    try {
        execFileSync('python3', [pyScript, profilesJson, terminalDir], {
            stdio: ['ignore', 'pipe', 'pipe'],
        });
        fs.rmSync(profilesJson);
        profiles.forEach((p) => console.log(`  ✓ ${p.name}`));
    } catch (err: unknown) {
        const e = err as { stderr?: Buffer; message?: string };
        const msg = e.stderr?.toString() ?? e.message ?? String(err);
        console.error(
            '  ❌ Terminal profile generation failed:\n    ' + msg.trim()
        );
        console.error('     Run: pip3 install pyobjc --break-system-packages');
        fs.rmSync(profilesJson, { force: true });
    }
}

// Generate manifest/index
function generateManifest() {
    console.log('\n📋 Generating manifest...');
    const manifest = {
        name: 'Equinox Colors',
        version: '1.0.0',
        description:
            'A multi-platform ergonomic theme system eliminating cognitive fatigue',
        variants: variants.map((v) => ({
            name: v.name,
            description: v.description,
        })),
        platforms: {
            vscode: {
                format: 'JSON',
                directory: 'vscode/',
                files: variants.map(
                    (v) =>
                        `${v.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}.json`
                ),
            },
            jetbrains: {
                format: 'ICLS (XML)',
                directory: 'jetbrains/',
                colorSchemes: variants.map(
                    (v) =>
                        `${v.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}.icls`
                ),
                islandsColorSchemes: variants.map(
                    (v) =>
                        `${v.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}-islands.icls`
                ),
                uiThemes: variants.map(
                    (v) =>
                        `themes/${v.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}.theme.json`
                ),
            },
            terminal: {
                format: 'Terminal.app plist',
                directory: 'terminal/',
                files: variants.map(
                    (v) =>
                        `${v.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}.terminal`
                ),
            },
        },
    };

    const manifestPath = path.join(distDir, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
    console.log(`  ✓ manifest.json`);
}

// Main build orchestrator
export function build(): void {
    console.log('🎨 Equinox Colors Builder\n');
    console.log('═══════════════════════════════════════');

    try {
        ensureDirectories();
        buildVsCodeThemes();
        buildJetBrainsSchemes();
        buildTerminalProfiles();
        generateManifest();

        console.log('\n═══════════════════════════════════════');
        console.log('✨ Build complete!');
        console.log(`📁 Output directory: ${distDir}`);
        console.log(
            `📦 Generated ${variants.length} variants across 3 platforms`
        );
        console.log(`   VS Code: ${variants.length} × .json`);
        console.log(
            `   JetBrains: ${variants.length} × .icls + ${variants.length} × Islands .icls + ${variants.length} × .theme.json`
        );
        console.log(`   Terminal: ${variants.length} × .terminal`);
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    build();
}
