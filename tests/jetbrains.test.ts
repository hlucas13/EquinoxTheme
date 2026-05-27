import { describe, expect, it } from 'vitest';
import {
    generateJetBrainsColorScheme,
    generateJetBrainsIslandsColorScheme,
    generateJetBrainsTheme,
    jetBrainsColorSchemeToXml,
    jetBrainsThemeToJson,
} from '../src/platforms/jetbrains';
import {
    allVariants,
    equinoxDarkContrast,
    equinoxDarkModern,
    equinoxLightContrast,
    equinoxLightSoft,
} from '../src/themes/variants';

describe('generateJetBrainsColorScheme', () => {
    it('preserves the variant name', () => {
        const scheme = generateJetBrainsColorScheme(equinoxDarkModern);
        expect(scheme.name).toBe(equinoxDarkModern.name);
    });

    it('dark variants use Darcula as parent scheme', () => {
        expect(
            generateJetBrainsColorScheme(equinoxDarkModern).parentScheme
        ).toBe('Darcula');
        expect(
            generateJetBrainsColorScheme(equinoxDarkContrast).parentScheme
        ).toBe('Darcula');
    });

    it('light variants use IntelliJ as parent scheme', () => {
        expect(
            generateJetBrainsColorScheme(equinoxLightSoft).parentScheme
        ).toBe('IntelliJ');
        expect(
            generateJetBrainsColorScheme(equinoxLightContrast).parentScheme
        ).toBe('IntelliJ');
    });

    it('attributes contains TEXT entry', () => {
        const scheme = generateJetBrainsColorScheme(equinoxDarkModern);
        expect(scheme.attributes).toHaveProperty('TEXT');
        expect(scheme.attributes['TEXT']).toHaveProperty('foreground');
        expect(scheme.attributes['TEXT']).toHaveProperty('background');
    });

    it('accent attributes are present (HYPERLINK_ATTRIBUTES)', () => {
        const scheme = generateJetBrainsColorScheme(equinoxDarkModern);
        expect(scheme.attributes).toHaveProperty('HYPERLINK_ATTRIBUTES');
    });

    it('IDENTIFIER_UNDER_CARET_ATTRIBUTES is present', () => {
        const scheme = generateJetBrainsColorScheme(equinoxDarkModern);
        expect(scheme.attributes).toHaveProperty(
            'IDENTIFIER_UNDER_CARET_ATTRIBUTES'
        );
    });

    it('attribute hex values do not contain # prefix', () => {
        const scheme = generateJetBrainsColorScheme(equinoxDarkModern);
        for (const attr of Object.values(scheme.attributes)) {
            if (attr.foreground) expect(attr.foreground).not.toContain('#');
            if (attr.background) expect(attr.background).not.toContain('#');
        }
    });

    it('generates valid schemes for all 4 variants without throwing', () => {
        for (const variant of allVariants) {
            expect(() => generateJetBrainsColorScheme(variant)).not.toThrow();
        }
    });
});

describe('jetBrainsColorSchemeToXml', () => {
    it('produces a string starting with XML declaration', () => {
        const scheme = generateJetBrainsColorScheme(equinoxDarkModern);
        const xml = jetBrainsColorSchemeToXml(scheme);
        expect(xml.startsWith('<?xml')).toBe(true);
    });

    it('includes a <scheme> element with the variant name', () => {
        const scheme = generateJetBrainsColorScheme(equinoxDarkModern);
        const xml = jetBrainsColorSchemeToXml(scheme);
        expect(xml).toContain('<scheme');
        expect(xml).toContain(equinoxDarkModern.name);
    });

    it('XML is not empty and closes the scheme tag', () => {
        const scheme = generateJetBrainsColorScheme(equinoxDarkModern);
        const xml = jetBrainsColorSchemeToXml(scheme);
        expect(xml).toContain('</scheme>');
    });

    it('generates valid XML for all 4 variants without throwing', () => {
        for (const variant of allVariants) {
            const scheme = generateJetBrainsColorScheme(variant);
            expect(() => jetBrainsColorSchemeToXml(scheme)).not.toThrow();
        }
    });
});

describe('generateJetBrainsIslandsColorScheme', () => {
    it('name ends with " Islands"', () => {
        const scheme = generateJetBrainsIslandsColorScheme(equinoxDarkModern);
        expect(scheme.name).toBe(`${equinoxDarkModern.name} Islands`);
    });

    it('dark variants use Darcula as parent scheme', () => {
        expect(
            generateJetBrainsIslandsColorScheme(equinoxDarkModern).parentScheme
        ).toBe('Darcula');
        expect(
            generateJetBrainsIslandsColorScheme(equinoxDarkContrast)
                .parentScheme
        ).toBe('Darcula');
    });

    it('light variants use IntelliJ as parent scheme', () => {
        expect(
            generateJetBrainsIslandsColorScheme(equinoxLightSoft).parentScheme
        ).toBe('IntelliJ');
        expect(
            generateJetBrainsIslandsColorScheme(equinoxLightContrast)
                .parentScheme
        ).toBe('IntelliJ');
    });

    it('attributes contains DESKTOP entry', () => {
        const scheme = generateJetBrainsIslandsColorScheme(equinoxDarkModern);
        expect(scheme.attributes).toHaveProperty('DESKTOP');
        expect(scheme.attributes['DESKTOP']).toHaveProperty('background');
    });

    it('DESKTOP background does not contain # prefix', () => {
        const scheme = generateJetBrainsIslandsColorScheme(equinoxDarkModern);
        expect(scheme.attributes['DESKTOP'].background).not.toContain('#');
    });

    it('generates valid Islands schemes for all 4 variants without throwing', () => {
        for (const variant of allVariants) {
            expect(() =>
                generateJetBrainsIslandsColorScheme(variant)
            ).not.toThrow();
        }
    });
});

describe('generateJetBrainsTheme', () => {
    it('dark property is true for dark variants', () => {
        expect(generateJetBrainsTheme(equinoxDarkModern).dark).toBe(true);
        expect(generateJetBrainsTheme(equinoxDarkContrast).dark).toBe(true);
    });

    it('dark property is false for light variants', () => {
        expect(generateJetBrainsTheme(equinoxLightSoft).dark).toBe(false);
        expect(generateJetBrainsTheme(equinoxLightContrast).dark).toBe(false);
    });

    it('ui contains Desktop.background', () => {
        const theme = generateJetBrainsTheme(equinoxDarkModern);
        expect(theme.ui).toHaveProperty('Desktop.background');
    });

    it('Desktop.background is a hex string starting with #', () => {
        const theme = generateJetBrainsTheme(equinoxDarkModern);
        expect(theme.ui['Desktop.background']).toMatch(/^#[0-9a-fA-F]{6,8}$/);
    });

    it('editorScheme follows /colors/{slug}.icls pattern', () => {
        const theme = generateJetBrainsTheme(equinoxDarkModern);
        expect(theme.editorScheme).toMatch(/^\/colors\/.+\.icls$/);
    });

    it('icons.ColorPalette has Actions.Red entry', () => {
        const theme = generateJetBrainsTheme(equinoxDarkModern);
        expect(theme.icons.ColorPalette).toHaveProperty('Actions.Red');
    });

    it('generates valid themes for all 4 variants without throwing', () => {
        for (const variant of allVariants) {
            expect(() => generateJetBrainsTheme(variant)).not.toThrow();
        }
    });
});

describe('jetBrainsThemeToJson', () => {
    it('output is valid JSON', () => {
        const theme = generateJetBrainsTheme(equinoxDarkModern);
        const json = jetBrainsThemeToJson(theme);
        expect(() => JSON.parse(json)).not.toThrow();
    });

    it('parsed JSON has required top-level properties', () => {
        const theme = generateJetBrainsTheme(equinoxDarkModern);
        const parsed = JSON.parse(jetBrainsThemeToJson(theme));
        expect(parsed).toHaveProperty('name');
        expect(parsed).toHaveProperty('dark');
        expect(parsed).toHaveProperty('author');
        expect(parsed).toHaveProperty('editorScheme');
        expect(parsed).toHaveProperty('ui');
        expect(parsed).toHaveProperty('icons');
    });

    it('generates valid JSON for all 4 variants without throwing', () => {
        for (const variant of allVariants) {
            const theme = generateJetBrainsTheme(variant);
            expect(() => jetBrainsThemeToJson(theme)).not.toThrow();
        }
    });
});
