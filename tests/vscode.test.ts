import { describe, expect, it } from 'vitest';
import {
    generateVsCodeTheme,
    vscodeThemeToJson,
} from '../src/platforms/vscode';
import {
    allVariants,
    equinoxDarkContrast,
    equinoxDarkModern,
    equinoxLightContrast,
    equinoxLightSoft,
} from '../src/themes/variants';

const HEX_RE = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;

describe('generateVsCodeTheme', () => {
    it('returns type=dark for dark variants', () => {
        expect(generateVsCodeTheme(equinoxDarkModern).type).toBe('dark');
        expect(generateVsCodeTheme(equinoxDarkContrast).type).toBe('dark');
    });

    it('returns type=light for light variants', () => {
        expect(generateVsCodeTheme(equinoxLightSoft).type).toBe('light');
        expect(generateVsCodeTheme(equinoxLightContrast).type).toBe('light');
    });

    it('preserves the variant name', () => {
        const theme = generateVsCodeTheme(equinoxDarkModern);
        expect(theme.name).toBe(equinoxDarkModern.name);
    });

    it('produces a colors object with hex string values', () => {
        const theme = generateVsCodeTheme(equinoxDarkModern);
        expect(typeof theme.colors).toBe('object');
        for (const value of Object.values(theme.colors)) {
            expect(typeof value).toBe('string');
            // Most values are hex; a few (e.g. cursorStyle) are semantic strings
            if (value.startsWith('#')) {
                expect(value).toMatch(HEX_RE);
            }
        }
    });

    it('includes window.activeBorder as the accent color', () => {
        const theme = generateVsCodeTheme(equinoxDarkModern);
        expect(theme.colors['window.activeBorder']).toBe(
            equinoxDarkModern.palette.ui.focus
        );
    });

    it('includes window.inactiveBorder (accent with opacity suffix)', () => {
        const theme = generateVsCodeTheme(equinoxDarkModern);
        const inactive = theme.colors['window.inactiveBorder'];
        expect(typeof inactive).toBe('string');
        expect(inactive).toMatch(HEX_RE);
        expect(inactive.startsWith(equinoxDarkModern.palette.ui.focus)).toBe(
            true
        );
    });

    it('includes focusBorder', () => {
        const theme = generateVsCodeTheme(equinoxDarkModern);
        expect(theme.colors['focusBorder']).toBe(
            equinoxDarkModern.palette.ui.focus
        );
    });

    it('produces tokenColors as a non-empty array', () => {
        const theme = generateVsCodeTheme(equinoxDarkModern);
        expect(Array.isArray(theme.tokenColors)).toBe(true);
        expect(theme.tokenColors.length).toBeGreaterThan(0);
    });

    it('each tokenColor entry has scope and settings', () => {
        const theme = generateVsCodeTheme(equinoxDarkModern);
        for (const entry of theme.tokenColors) {
            expect(entry).toHaveProperty('scope');
            expect(entry).toHaveProperty('settings');
        }
    });

    it('generates valid themes for all 4 variants without throwing', () => {
        for (const variant of allVariants) {
            expect(() => generateVsCodeTheme(variant)).not.toThrow();
        }
    });
});

describe('vscodeThemeToJson', () => {
    it('produces valid JSON', () => {
        const theme = generateVsCodeTheme(equinoxDarkModern);
        const json = vscodeThemeToJson(theme);
        expect(() => JSON.parse(json)).not.toThrow();
    });

    it('round-trips the theme correctly', () => {
        const theme = generateVsCodeTheme(equinoxDarkModern);
        const parsed = JSON.parse(vscodeThemeToJson(theme)) as typeof theme;
        expect(parsed.name).toBe(theme.name);
        expect(parsed.type).toBe(theme.type);
    });
});
