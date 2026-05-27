import { describe, expect, it } from 'vitest';
import { PALETTE } from '../src/colors/palette';

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function checkHexValues(obj: Record<string, unknown>, path = ''): void {
    for (const [key, val] of Object.entries(obj)) {
        const current = `${path}.${key}`;
        if (typeof val === 'string') {
            expect(val, `${current} must be a valid 6-digit hex`).toMatch(
                HEX_RE
            );
        } else if (typeof val === 'object' && val !== null) {
            checkHexValues(val as Record<string, unknown>, current);
        }
    }
}

describe('PALETTE', () => {
    it('exports an object', () => {
        expect(PALETTE).toBeDefined();
        expect(typeof PALETTE).toBe('object');
    });

    it('has dark.modern with required keys', () => {
        const m = PALETTE.dark.modern;
        expect(m).toHaveProperty('bg');
        expect(m).toHaveProperty('fg');
        expect(m).toHaveProperty('accent');
        expect(m).toHaveProperty('selection');
        expect(m).toHaveProperty('muted');
        expect(m).toHaveProperty('cursor');
        expect(m).toHaveProperty('border');
        expect(m.syntax).toHaveProperty('keyword');
        expect(m.syntax).toHaveProperty('func');
        expect(m.syntax).toHaveProperty('str');
        expect(m.syntax).toHaveProperty('variable');
        expect(m.syntax).toHaveProperty('number');
        expect(m.syntax).toHaveProperty('comment');
    });

    it('has dark.contrast with editorBg and panelBg', () => {
        const c = PALETTE.dark.contrast;
        expect(c).toHaveProperty('editorBg');
        expect(c).toHaveProperty('panelBg');
    });

    it('has light.soft and light.contrast', () => {
        expect(PALETTE.light.soft).toHaveProperty('bg');
        expect(PALETTE.light.contrast).toHaveProperty('editorBg');
    });

    it('has ansi dark and light palettes', () => {
        expect(PALETTE.ansi.dark).toBeDefined();
        expect(PALETTE.ansi.light).toBeDefined();
    });

    it('all hex values in dark.modern are valid 6-digit hex', () => {
        checkHexValues(
            PALETTE.dark.modern as unknown as Record<string, unknown>,
            'dark.modern'
        );
    });

    it('all hex values in dark.contrast are valid 6-digit hex', () => {
        checkHexValues(
            PALETTE.dark.contrast as unknown as Record<string, unknown>,
            'dark.contrast'
        );
    });

    it('all hex values in light.soft are valid 6-digit hex', () => {
        checkHexValues(
            PALETTE.light.soft as unknown as Record<string, unknown>,
            'light.soft'
        );
    });

    it('all hex values in light.contrast are valid 6-digit hex', () => {
        checkHexValues(
            PALETTE.light.contrast as unknown as Record<string, unknown>,
            'light.contrast'
        );
    });
});
