import { describe, expect, it } from 'vitest';
import {
    generateTerminalProfile,
    terminalProfileToXml,
} from '../src/platforms/terminal';
import {
    allVariants,
    darkAnsiPalette,
    equinoxDarkModern,
    equinoxLightSoft,
    lightAnsiPalette,
} from '../src/themes/variants';

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

describe('generateTerminalProfile', () => {
    it('preserves the variant name', () => {
        const profile = generateTerminalProfile(
            equinoxDarkModern,
            darkAnsiPalette
        );
        expect(profile.name).toBe(equinoxDarkModern.name);
    });

    it('uses the variant editor background as backgroundColor', () => {
        const profile = generateTerminalProfile(
            equinoxDarkModern,
            darkAnsiPalette
        );
        expect(profile.backgroundColor).toBe(
            equinoxDarkModern.palette.editor.background
        );
    });

    it('uses the variant editor foreground as foregroundColor', () => {
        const profile = generateTerminalProfile(
            equinoxDarkModern,
            darkAnsiPalette
        );
        expect(profile.foregroundColor).toBe(
            equinoxDarkModern.palette.editor.foreground
        );
    });

    it('uses the variant cursor color', () => {
        const profile = generateTerminalProfile(
            equinoxDarkModern,
            darkAnsiPalette
        );
        expect(profile.cursorColor).toBe(equinoxDarkModern.palette.ui.cursor);
    });

    it('stores the ANSI palette reference', () => {
        const profile = generateTerminalProfile(
            equinoxDarkModern,
            darkAnsiPalette
        );
        expect(profile.ansiPalette).toBe(darkAnsiPalette);
    });

    it('generates profiles for all 4 variants without throwing', () => {
        for (const variant of allVariants) {
            const ansi = variant.name.includes('Dark')
                ? darkAnsiPalette
                : lightAnsiPalette;
            expect(() => generateTerminalProfile(variant, ansi)).not.toThrow();
        }
    });
});

describe('terminalProfileToXml', () => {
    it('produces a plist XML string', () => {
        const profile = generateTerminalProfile(
            equinoxDarkModern,
            darkAnsiPalette
        );
        const xml = terminalProfileToXml(profile);
        expect(xml).toContain('<?xml');
        expect(xml).toContain('<plist');
        expect(xml).toContain('</plist>');
    });

    it('includes the variant name in the output', () => {
        const profile = generateTerminalProfile(
            equinoxDarkModern,
            darkAnsiPalette
        );
        const xml = terminalProfileToXml(profile);
        expect(xml).toContain(equinoxDarkModern.name);
    });

    it('includes ANSI color keys', () => {
        const profile = generateTerminalProfile(
            equinoxDarkModern,
            darkAnsiPalette
        );
        const xml = terminalProfileToXml(profile);
        expect(xml).toContain('ANSIBlackColor');
        expect(xml).toContain('ANSIWhiteColor');
        expect(xml).toContain('ANSIBrightBlackColor');
    });

    it('includes CursorColor key', () => {
        const profile = generateTerminalProfile(
            equinoxDarkModern,
            darkAnsiPalette
        );
        const xml = terminalProfileToXml(profile);
        expect(xml).toContain('CursorColor');
    });

    it('color RGB values are normalized (not raw 0-255 integers)', () => {
        const profile = generateTerminalProfile(
            equinoxLightSoft,
            lightAnsiPalette
        );
        const xml = terminalProfileToXml(profile);
        // No value should be >= 2 (raw 255 would fail; FontWidthSpacing=1.004 is fine)
        const realValues = [...xml.matchAll(/<real>([\d.]+)<\/real>/g)].map(
            (m) => Number.parseFloat(m[1])
        );
        for (const v of realValues) {
            expect(v).toBeGreaterThanOrEqual(0);
            expect(v).toBeLessThan(2);
        }
    });

    it('generates valid XML for all 4 variants without throwing', () => {
        for (const variant of allVariants) {
            const ansi = variant.name.includes('Dark')
                ? darkAnsiPalette
                : lightAnsiPalette;
            const profile = generateTerminalProfile(variant, ansi);
            expect(() => terminalProfileToXml(profile)).not.toThrow();
        }
    });
});

// ── Python build payload ─────────────────────────────────────────────────────
// The build serialises generateTerminalProfile() output to a JSON file that is
// consumed by scripts/generate-terminal.py.  These tests verify that every
// field expected by the Python script is present and valid.
describe('terminal profile → Python JSON payload', () => {
    it('backgroundColor is a 6-digit hex string', () => {
        const p = generateTerminalProfile(equinoxDarkModern, darkAnsiPalette);
        expect(p.backgroundColor).toMatch(HEX_RE);
    });

    it('foregroundColor is a 6-digit hex string', () => {
        const p = generateTerminalProfile(equinoxDarkModern, darkAnsiPalette);
        expect(p.foregroundColor).toMatch(HEX_RE);
    });

    it('cursorColor is a 6-digit hex string', () => {
        const p = generateTerminalProfile(equinoxDarkModern, darkAnsiPalette);
        expect(p.cursorColor).toMatch(HEX_RE);
    });

    it('ansiPalette has all 16 required ANSI color fields', () => {
        const p = generateTerminalProfile(equinoxDarkModern, darkAnsiPalette);
        const required = [
            'black',
            'red',
            'green',
            'yellow',
            'blue',
            'magenta',
            'cyan',
            'white',
            'brightBlack',
            'brightRed',
            'brightGreen',
            'brightYellow',
            'brightBlue',
            'brightMagenta',
            'brightCyan',
            'brightWhite',
        ] as const;
        for (const key of required) {
            expect(p.ansiPalette[key]).toMatch(HEX_RE);
        }
    });

    it('all 4 variants produce valid payloads without throwing', () => {
        for (const variant of allVariants) {
            const ansi = variant.name.includes('Dark')
                ? darkAnsiPalette
                : lightAnsiPalette;
            const p = generateTerminalProfile(variant, ansi);
            expect(p.backgroundColor).toMatch(HEX_RE);
            expect(p.foregroundColor).toMatch(HEX_RE);
            expect(p.cursorColor).toMatch(HEX_RE);
        }
    });
});
