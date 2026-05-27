import { describe, expect, it } from 'vitest';
import {
    allVariants,
    equinoxDarkContrast,
    equinoxDarkModern,
    equinoxLightContrast,
    equinoxLightSoft,
    type EquinoxVariant,
} from '../src/themes/variants';

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function assertVariantShape(v: EquinoxVariant): void {
    expect(typeof v.name).toBe('string');
    expect(v.name.length).toBeGreaterThan(0);
    expect(typeof v.description).toBe('string');

    // editor
    expect(v.palette.editor.background).toMatch(HEX_RE);
    expect(v.palette.editor.foreground).toMatch(HEX_RE);

    // toolbar
    expect(v.palette.toolbar.background).toMatch(HEX_RE);
    expect(v.palette.toolbar.foreground).toMatch(HEX_RE);

    // sidebar
    expect(v.palette.sidebar.background).toMatch(HEX_RE);
    expect(v.palette.sidebar.foreground).toMatch(HEX_RE);

    // ui
    expect(v.palette.ui.focus).toMatch(HEX_RE);
    expect(v.palette.ui.selection).toMatch(HEX_RE);
    expect(v.palette.ui.lineNumber).toMatch(HEX_RE);
    expect(v.palette.ui.cursor).toMatch(HEX_RE);
    expect(v.palette.ui.border).toMatch(HEX_RE);

    // syntax
    expect(v.palette.syntax.keyword).toMatch(HEX_RE);
    expect(v.palette.syntax.function).toMatch(HEX_RE);
    expect(v.palette.syntax.string).toMatch(HEX_RE);
    expect(v.palette.syntax.variable).toMatch(HEX_RE);
    expect(v.palette.syntax.number).toMatch(HEX_RE);
    expect(v.palette.syntax.comment).toMatch(HEX_RE);
}

describe('allVariants', () => {
    it('contains exactly 4 variants', () => {
        expect(allVariants).toHaveLength(4);
    });

    it('contains all 4 named exports', () => {
        expect(allVariants).toContain(equinoxDarkModern);
        expect(allVariants).toContain(equinoxDarkContrast);
        expect(allVariants).toContain(equinoxLightSoft);
        expect(allVariants).toContain(equinoxLightContrast);
    });

    it('all variant names are unique', () => {
        const names = allVariants.map((v) => v.name);
        expect(new Set(names).size).toBe(4);
    });
});

describe('equinoxDarkModern', () => {
    it('has correct name', () => {
        expect(equinoxDarkModern.name).toBe('Equinox Dark Modern');
    });

    it('is a unified variant (editor bg === toolbar bg)', () => {
        expect(equinoxDarkModern.palette.editor.background).toBe(
            equinoxDarkModern.palette.toolbar.background
        );
    });

    it('passes full shape validation', () => {
        assertVariantShape(equinoxDarkModern);
    });
});

describe('equinoxDarkContrast', () => {
    it('has correct name', () => {
        expect(equinoxDarkContrast.name).toBe('Equinox Dark Contrast');
    });

    it('is a split variant (editor bg !== toolbar bg)', () => {
        expect(equinoxDarkContrast.palette.editor.background).not.toBe(
            equinoxDarkContrast.palette.toolbar.background
        );
    });

    it('passes full shape validation', () => {
        assertVariantShape(equinoxDarkContrast);
    });
});

describe('equinoxLightSoft', () => {
    it('has correct name', () => {
        expect(equinoxLightSoft.name).toBe('Equinox Light Soft');
    });

    it('is a unified variant (editor bg === toolbar bg)', () => {
        expect(equinoxLightSoft.palette.editor.background).toBe(
            equinoxLightSoft.palette.toolbar.background
        );
    });

    it('passes full shape validation', () => {
        assertVariantShape(equinoxLightSoft);
    });
});

describe('equinoxLightContrast', () => {
    it('has correct name', () => {
        expect(equinoxLightContrast.name).toBe('Equinox Light Contrast');
    });

    it('is a split variant (editor bg !== toolbar bg)', () => {
        expect(equinoxLightContrast.palette.editor.background).not.toBe(
            equinoxLightContrast.palette.toolbar.background
        );
    });

    it('passes full shape validation', () => {
        assertVariantShape(equinoxLightContrast);
    });
});
