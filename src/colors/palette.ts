/**
 * Equinox Colors: Color Palette
 *
 * Single source of truth for every hex value used across all variants and
 * platforms. To update a color or create a new theme variant, edit ONLY this
 * file — all platform compilers and the playground derive their colors from
 * here.
 */

// ============================================================================
// DARK VARIANTS
// ============================================================================

const DARK_MODERN = {
    bg: '#1a1f2e',
    fg: '#e8eef7',
    accent: '#5b6edb',
    selection: '#2d3a5c',
    muted: '#6b7793',
    cursor: '#a8c5e0',
    border: '#2d3f56',
    syntax: {
        keyword: '#9d84b7',
        func: '#7da6ce',
        str: '#a8d4b8',
        variable: '#d4b88d',
        number: '#c7a8b8',
        comment: '#6b7793',
    },
} as const;

const DARK_CONTRAST = {
    editorBg: '#0f1419',
    panelBg: '#13141c',
    fg: '#e8eef7',
    accent: '#6b7edb',
    selection: '#1f2a52',
    muted: '#5a6b8d',
    cursor: '#b0d0eb',
    border: '#2a3d56',
    syntax: {
        keyword: '#a48fbe',
        func: '#86b5d9',
        str: '#b0dcc0',
        variable: '#ddc295',
        number: '#d0b1c0',
        comment: '#647a93',
    },
} as const;

// ============================================================================
// LIGHT VARIANTS
// ============================================================================

const LIGHT_SOFT = {
    bg: '#f5f3f0',
    fg: '#2c2e3a',
    accent: '#1f5b9f',
    selection: '#d9e5f5',
    muted: '#a0a8b8',
    border: '#d9d5cf',
    syntax: {
        keyword: '#6b4c8f',
        func: '#1f5b9f',
        str: '#2d7a5c',
        variable: '#8b6d47',
        number: '#a04070',
        comment: '#8a92a2',
    },
} as const;

const LIGHT_CONTRAST = {
    editorBg: '#faf9f7',
    panelBg: '#ede9e3',
    fg: '#2c2e3a',
    accent: '#1f5b9f',
    selection: '#d9e5f5',
    muted: '#b0b8c8',
    border: '#d0ccc5',
    syntax: {
        keyword: '#7a5ba0',
        func: '#1f5b9f',
        str: '#2d7a5c',
        variable: '#9a7852',
        number: '#b0507f',
        comment: '#909aaa',
    },
} as const;

// ============================================================================
// SEMANTIC STATUS COLORS
// Used for errors, warnings and info highlights in all platforms.
// ============================================================================

const STATUS_DARK = {
    error: '#e85a5f',
    warning: '#d9a963',
    info: '#7da6ce',
} as const;

const STATUS_LIGHT = {
    error: '#c72c23',
    warning: '#b89e39',
    info: '#1f5b9f',
} as const;

// ============================================================================
// ANSI COLOR PALETTES
// Used by the macOS Terminal compiler and the VS Code terminal colors.
// ============================================================================

const ANSI_DARK = {
    black: '#0f1419',
    red: '#e85a5f',
    green: '#7aa555',
    yellow: '#d9a963',
    blue: '#7da6ce',
    magenta: '#9d84b7',
    cyan: '#6fb8c0',
    white: '#d4d8e0',
    brightBlack: '#6b7793',
    brightRed: '#e89c9f',
    brightGreen: '#99c977',
    brightYellow: '#e5bf99',
    brightBlue: '#9dbbdb',
    brightMagenta: '#c4a3d9',
    brightCyan: '#94d6de',
    brightWhite: '#e8eef7',
} as const;

const ANSI_LIGHT = {
    black: '#2c2e3a',
    red: '#c72c23',
    green: '#5b8c28',
    yellow: '#b89e39',
    blue: '#1f5b9f',
    magenta: '#6b4c8f',
    cyan: '#1b7d7d',
    white: '#a0a8b8',
    brightBlack: '#808a9a',
    brightRed: '#e85c52',
    brightGreen: '#7ab044',
    brightYellow: '#dab149',
    brightBlue: '#4b7cbd',
    brightMagenta: '#8f6cb5',
    brightCyan: '#3ba5a5',
    brightWhite: '#f5f3f0',
} as const;

// ============================================================================
// SHADOWS
// Platform-neutral semi-transparent black used for widget drop shadows.
// Values are RGBA hex (#rrggbbaa). Dark mode needs a heavier shadow than light
// because the surface contrast is lower.
// ============================================================================

const SHADOWS = {
    dark: '#00000040',
    light: '#00000010',
} as const;

// ============================================================================
// EXPORTED PALETTE
// ============================================================================

export const PALETTE = {
    dark: {
        modern: DARK_MODERN,
        contrast: DARK_CONTRAST,
    },
    light: {
        soft: LIGHT_SOFT,
        contrast: LIGHT_CONTRAST,
    },
    status: {
        dark: STATUS_DARK,
        light: STATUS_LIGHT,
    },
    ansi: {
        dark: ANSI_DARK,
        light: ANSI_LIGHT,
    },
    shadows: SHADOWS,
} as const;
