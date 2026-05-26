/**
 * Equinox Theme: Build Script
 * Orchestrates compilation of all 4 variants across all 3 platforms
 * Outputs: dist/vscode/*.json, dist/jetbrains/*.icls, dist/terminal/*.terminal
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateJetBrainsColorScheme, jetBrainsColorSchemeToXml } from './platforms/jetbrains';
import { generateTerminalProfile, terminalProfileToXml } from './platforms/terminal';
import { generateVsCodeTheme, vscodeThemeToJson } from './platforms/vscode';
import { playgroundThemesToJson } from './playground-export';
import {
  darkAnsiPalette,
  equinoxDarkContrast,
  equinoxDarkModern,
  equinoxLightContrast,
  equinoxLightSoft,
  lightAnsiPalette,
} from './tokens';

const variants = [equinoxDarkModern, equinoxDarkContrast, equinoxLightSoft, equinoxLightContrast];

const distDir = path.join(__dirname, '..', 'dist');
const vscodeDir = path.join(distDir, 'vscode');
const jetbrainsDir = path.join(distDir, 'jetbrains');
const terminalDir = path.join(distDir, 'terminal');
const playgroundDir = path.join(distDir, 'playground');

// Ensure directories exist
function ensureDirectories() {
  [distDir, vscodeDir, jetbrainsDir, terminalDir, playgroundDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  console.log('✓ Created output directories');
}

// Build VS Code themes
function buildVsCodeThemes() {
  console.log('\n📦 Building VS Code themes...');
  variants.forEach((variant) => {
    const theme = generateVsCodeTheme(variant);
    const json = vscodeThemeToJson(theme);
    const filename = variant.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    const filepath = path.join(vscodeDir, `${filename}.json`);
    fs.writeFileSync(filepath, json, 'utf-8');
    console.log(`  ✓ ${variant.name}`);
  });
}

// Build JetBrains color schemes
function buildJetBrainsSchemes() {
  console.log('\n📦 Building JetBrains IDE color schemes...');
  variants.forEach((variant) => {
    const scheme = generateJetBrainsColorScheme(variant);
    const xml = jetBrainsColorSchemeToXml(scheme);
    const filename = variant.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    const filepath = path.join(jetbrainsDir, `${filename}.icls`);
    fs.writeFileSync(filepath, xml, 'utf-8');
    console.log(`  ✓ ${variant.name}`);
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

  variantsWithAnsi.forEach(({ variant, ansi }) => {
    const profile = generateTerminalProfile(variant, ansi);
    const xml = terminalProfileToXml(profile);
    const filename = variant.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    const filepath = path.join(terminalDir, `${filename}.terminal`);
    fs.writeFileSync(filepath, xml, 'utf-8');
    console.log(`  ✓ ${variant.name}`);
  });
}

// Generate manifest/index
function generateManifest() {
  console.log('\n📋 Generating manifest...');
  const manifest = {
    name: 'Equinox Theme',
    version: '1.0.0',
    description: 'A multi-platform ergonomic theme system eliminating cognitive fatigue',
    variants: variants.map((v) => ({
      name: v.name,
      description: v.description,
    })),
    platforms: {
      vscode: {
        format: 'JSON',
        directory: 'vscode/',
        files: variants.map(
          (v) => `${v.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}.json`,
        ),
      },
      jetbrains: {
        format: 'ICLS (XML)',
        directory: 'jetbrains/',
        files: variants.map(
          (v) => `${v.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}.icls`,
        ),
      },
      terminal: {
        format: 'Terminal.app plist',
        directory: 'terminal/',
        files: variants.map(
          (v) => `${v.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}.terminal`,
        ),
      },
    },
  };

  const manifestPath = path.join(distDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`  ✓ manifest.json`);
}

// Generate playground color data
function generatePlaygroundData() {
  console.log('\n📋 Generating playground data...');
  const themeJson = playgroundThemesToJson();
  const playgroundPath = path.join(playgroundDir, 'themes.json');
  fs.writeFileSync(playgroundPath, themeJson, 'utf-8');
  console.log(`  ✓ themes.json (for interactive playground)`);
}

// Main build orchestrator
export function build(): void {
  console.log('🎨 Equinox Theme Builder\n');
  console.log('═══════════════════════════════════════');

  try {
    ensureDirectories();
    buildVsCodeThemes();
    buildJetBrainsSchemes();
    buildTerminalProfiles();
    generateManifest();
    generatePlaygroundData();

    console.log('\n═══════════════════════════════════════');
    console.log('✨ Build complete!');
    console.log(`📁 Output directory: ${distDir}`);
    console.log(
      `📦 Generated ${variants.length} variants across 3 platforms (${variants.length * 3} files)`,
    );
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  build();
}
