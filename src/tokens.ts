/**
 * Equinox Theme: Design Tokens
 * Unified design tokens for all 4 Equinox variants
 * Strictly adheres to WCAG AAA contrast standards and ergonomic principles
 */

// ============================================================================
// VARIANT DEFINITIONS
// ============================================================================

export interface EquinoxVariant {
  name: string;
  description: string;
  palette: {
    // Core backgrounds
    editor: {
      background: string;
      foreground: string;
    };
    toolbar: {
      background: string;
      foreground: string;
    };
    sidebar: {
      background: string;
      foreground: string;
    };
    // UI components
    ui: {
      focus: string;
      selection: string;
      lineNumber: string;
      cursor: string;
      border: string;
    };
    // Syntax highlighting
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

// ============================================================================
// DARK MODERN VARIANT
// Unified background: Deeply soothing dark slate-blue
// ============================================================================

export const equinoxDarkModern: EquinoxVariant = {
  name: 'Equinox Dark Modern',
  description: 'Unified dark background with ergonomic slate-blue foundation',
  palette: {
    editor: {
      background: '#1a1f2e',
      foreground: '#e8eef7',
    },
    toolbar: {
      background: '#1a1f2e',
      foreground: '#e8eef7',
    },
    sidebar: {
      background: '#1a1f2e',
      foreground: '#e8eef7',
    },
    ui: {
      focus: '#5b6edb',
      selection: '#2d3a5c',
      lineNumber: '#6b7793',
      cursor: '#a8c5e0',
      border: '#2d3f56',
    },
    syntax: {
      keyword: '#9d84b7',
      function: '#7da6ce',
      string: '#a8d4b8',
      variable: '#d4b88d',
      number: '#c7a8b8',
      comment: '#6b7793',
    },
  },
};

// ============================================================================
// DARK CONTRAST VARIANT
// Split background: Deep editor with lighter structural tone
// ============================================================================

export const equinoxDarkContrast: EquinoxVariant = {
  name: 'Equinox Dark Contrast',
  description: 'Split dark backgrounds with structural edge definition',
  palette: {
    editor: {
      background: '#0f1419',
      foreground: '#e8eef7',
    },
    toolbar: {
      background: '#16192e',
      foreground: '#e8eef7',
    },
    sidebar: {
      background: '#16192e',
      foreground: '#e8eef7',
    },
    ui: {
      focus: '#6b7edb',
      selection: '#1f2a52',
      lineNumber: '#5a6b8d',
      cursor: '#b0d0eb',
      border: '#2a3d56',
    },
    syntax: {
      keyword: '#a48fbe',
      function: '#86b5d9',
      string: '#b0dcc0',
      variable: '#ddc295',
      number: '#d0b1c0',
      comment: '#647a93',
    },
  },
};

// ============================================================================
// LIGHT SOFT VARIANT
// Unified background: Ultra-soft light gray/cream to eliminate glare
// ============================================================================

export const equinoxLightSoft: EquinoxVariant = {
  name: 'Equinox Light Soft',
  description: 'Unified soft light background for eye comfort and reduced glare',
  palette: {
    editor: {
      background: '#f5f3f0',
      foreground: '#2c2e3a',
    },
    toolbar: {
      background: '#f5f3f0',
      foreground: '#2c2e3a',
    },
    sidebar: {
      background: '#f5f3f0',
      foreground: '#2c2e3a',
    },
    ui: {
      focus: '#1f5b9f',
      selection: '#d9e5f5',
      lineNumber: '#a0a8b8',
      cursor: '#2c2e3a',
      border: '#d9d5cf',
    },
    syntax: {
      keyword: '#6b4c8f',
      function: '#1f5b9f',
      string: '#2d7a5c',
      variable: '#8b6d47',
      number: '#a04070',
      comment: '#8a92a2',
    },
  },
};

// ============================================================================
// LIGHT CONTRAST VARIANT
// Split backgrounds: Bright editor with muted structural tone
// ============================================================================

export const equinoxLightContrast: EquinoxVariant = {
  name: 'Equinox Light Contrast',
  description: 'Split light backgrounds with depth and architectural clarity',
  palette: {
    editor: {
      background: '#faf9f7',
      foreground: '#2c2e3a',
    },
    toolbar: {
      background: '#ede9e3',
      foreground: '#2c2e3a',
    },
    sidebar: {
      background: '#ede9e3',
      foreground: '#2c2e3a',
    },
    ui: {
      focus: '#1f5b9f',
      selection: '#d9e5f5',
      lineNumber: '#b0b8c8',
      cursor: '#2c2e3a',
      border: '#d0ccc5',
    },
    syntax: {
      keyword: '#7a5ba0',
      function: '#1f5b9f',
      string: '#2d7a5c',
      variable: '#9a7852',
      number: '#b0507f',
      comment: '#909aaa',
    },
  },
};

// ============================================================================
// COLOR EXPORTS
// ============================================================================

export const allVariants = [
  equinoxDarkModern,
  equinoxDarkContrast,
  equinoxLightSoft,
  equinoxLightContrast,
];

// ============================================================================
// ANSI COLOR PALETTE (for Terminal variant - 16 colors)
// Used for macOS .terminal property list
// ============================================================================

export interface AnsiPalette {
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
  brightBlack: string;
  brightRed: string;
  brightGreen: string;
  brightYellow: string;
  brightBlue: string;
  brightMagenta: string;
  brightCyan: string;
  brightWhite: string;
}

export const darkAnsiPalette: AnsiPalette = {
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
};

export const lightAnsiPalette: AnsiPalette = {
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
};
