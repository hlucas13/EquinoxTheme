/**
 * Equinox Colors: Variant Definitions
 *
 * Builds the four theme variants from the centralized palette. All color
 * references point to `../colors/palette` — never use raw hex strings here.
 */

import { PALETTE } from '../colors/palette';

// ============================================================================
// TYPES
// ============================================================================

export interface EquinoxVariant {
    name: string;
    description: string;
    palette: {
        editor: { background: string; foreground: string };
        toolbar: { background: string; foreground: string };
        sidebar: { background: string; foreground: string };
        ui: {
            focus: string;
            selection: string;
            lineNumber: string;
            cursor: string;
            border: string;
        };
        syntax: {
            keyword: string;
            function: string;
            string: string;
            variable: string;
            number: string;
            comment: string;
        };
    };
}

export type AnsiPalette = typeof PALETTE.ansi.dark extends infer T
    ? { [K in keyof T]: string }
    : never;

// ============================================================================
// VARIANTS
// ============================================================================

export const equinoxDarkModern: EquinoxVariant = {
    name: 'Equinox Dark Modern',
    description: 'Unified dark background with ergonomic slate-blue foundation',
    palette: {
        editor: {
            background: PALETTE.dark.modern.bg,
            foreground: PALETTE.dark.modern.fg,
        },
        toolbar: {
            background: PALETTE.dark.modern.bg,
            foreground: PALETTE.dark.modern.fg,
        },
        sidebar: {
            background: PALETTE.dark.modern.bg,
            foreground: PALETTE.dark.modern.fg,
        },
        ui: {
            focus: PALETTE.dark.modern.accent,
            selection: PALETTE.dark.modern.selection,
            lineNumber: PALETTE.dark.modern.muted,
            cursor: PALETTE.dark.modern.cursor,
            border: PALETTE.dark.modern.border,
        },
        syntax: {
            keyword: PALETTE.dark.modern.syntax.keyword,
            function: PALETTE.dark.modern.syntax.func,
            string: PALETTE.dark.modern.syntax.str,
            variable: PALETTE.dark.modern.syntax.variable,
            number: PALETTE.dark.modern.syntax.number,
            comment: PALETTE.dark.modern.syntax.comment,
        },
    },
};

export const equinoxDarkContrast: EquinoxVariant = {
    name: 'Equinox Dark Contrast',
    description: 'Split dark backgrounds with structural edge definition',
    palette: {
        editor: {
            background: PALETTE.dark.contrast.editorBg,
            foreground: PALETTE.dark.contrast.fg,
        },
        toolbar: {
            background: PALETTE.dark.contrast.panelBg,
            foreground: PALETTE.dark.contrast.fg,
        },
        sidebar: {
            background: PALETTE.dark.contrast.panelBg,
            foreground: PALETTE.dark.contrast.fg,
        },
        ui: {
            focus: PALETTE.dark.contrast.accent,
            selection: PALETTE.dark.contrast.selection,
            lineNumber: PALETTE.dark.contrast.muted,
            cursor: PALETTE.dark.contrast.cursor,
            border: PALETTE.dark.contrast.border,
        },
        syntax: {
            keyword: PALETTE.dark.contrast.syntax.keyword,
            function: PALETTE.dark.contrast.syntax.func,
            string: PALETTE.dark.contrast.syntax.str,
            variable: PALETTE.dark.contrast.syntax.variable,
            number: PALETTE.dark.contrast.syntax.number,
            comment: PALETTE.dark.contrast.syntax.comment,
        },
    },
};

export const equinoxLightSoft: EquinoxVariant = {
    name: 'Equinox Light Soft',
    description:
        'Unified soft light background for eye comfort and reduced glare',
    palette: {
        editor: {
            background: PALETTE.light.soft.bg,
            foreground: PALETTE.light.soft.fg,
        },
        toolbar: {
            background: PALETTE.light.soft.bg,
            foreground: PALETTE.light.soft.fg,
        },
        sidebar: {
            background: PALETTE.light.soft.bg,
            foreground: PALETTE.light.soft.fg,
        },
        ui: {
            focus: PALETTE.light.soft.accent,
            selection: PALETTE.light.soft.selection,
            lineNumber: PALETTE.light.soft.muted,
            cursor: PALETTE.light.soft.fg,
            border: PALETTE.light.soft.border,
        },
        syntax: {
            keyword: PALETTE.light.soft.syntax.keyword,
            function: PALETTE.light.soft.syntax.func,
            string: PALETTE.light.soft.syntax.str,
            variable: PALETTE.light.soft.syntax.variable,
            number: PALETTE.light.soft.syntax.number,
            comment: PALETTE.light.soft.syntax.comment,
        },
    },
};

export const equinoxLightContrast: EquinoxVariant = {
    name: 'Equinox Light Contrast',
    description: 'Split light backgrounds with depth and architectural clarity',
    palette: {
        editor: {
            background: PALETTE.light.contrast.editorBg,
            foreground: PALETTE.light.contrast.fg,
        },
        toolbar: {
            background: PALETTE.light.contrast.panelBg,
            foreground: PALETTE.light.contrast.fg,
        },
        sidebar: {
            background: PALETTE.light.contrast.panelBg,
            foreground: PALETTE.light.contrast.fg,
        },
        ui: {
            focus: PALETTE.light.contrast.accent,
            selection: PALETTE.light.contrast.selection,
            lineNumber: PALETTE.light.contrast.muted,
            cursor: PALETTE.light.contrast.fg,
            border: PALETTE.light.contrast.border,
        },
        syntax: {
            keyword: PALETTE.light.contrast.syntax.keyword,
            function: PALETTE.light.contrast.syntax.func,
            string: PALETTE.light.contrast.syntax.str,
            variable: PALETTE.light.contrast.syntax.variable,
            number: PALETTE.light.contrast.syntax.number,
            comment: PALETTE.light.contrast.syntax.comment,
        },
    },
};

// ============================================================================
// COLLECTIONS
// ============================================================================

export const allVariants: EquinoxVariant[] = [
    equinoxDarkModern,
    equinoxDarkContrast,
    equinoxLightSoft,
    equinoxLightContrast,
];

export const darkAnsiPalette: AnsiPalette = { ...PALETTE.ansi.dark };
export const lightAnsiPalette: AnsiPalette = { ...PALETTE.ansi.light };
