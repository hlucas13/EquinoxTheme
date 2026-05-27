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

    it('RGB values are in 0-1 range (not raw 0-255 integers)', () => {
        const profile = generateTerminalProfile(
            equinoxLightSoft,
            lightAnsiPalette
        );
        const xml = terminalProfileToXml(profile);
        // No value >= 2 should appear after a <real> tag (all normalized to 0-1)
        const realValues = [...xml.matchAll(/<real>([\d.]+)<\/real>/g)].map(
            (m) => Number.parseFloat(m[1])
        );
        for (const v of realValues) {
            expect(v).toBeGreaterThanOrEqual(0);
            expect(v).toBeLessThanOrEqual(1);
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
