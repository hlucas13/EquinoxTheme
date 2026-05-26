/**
 * Equinox Playground: Export Color Tokens as JSON
 * Generates browser-consumable JSON from the theme tokens
 * Allows playground to always reflect latest color definitions
 */

import {
  darkAnsiPalette,
  equinoxDarkContrast,
  equinoxDarkModern,
  equinoxLightContrast,
  equinoxLightSoft,
  lightAnsiPalette,
} from './tokens';

export interface PlaygroundTheme {
  name: string;
  type: 'dark' | 'light';
  palette: {
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
  ansi?: {
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
  };
}

export function generatePlaygroundThemes(): Record<string, PlaygroundTheme> {
  return {
    'dark-modern': {
      name: equinoxDarkModern.name,
      type: 'dark',
      palette: equinoxDarkModern.palette,
      ansi: darkAnsiPalette,
    },
    'dark-contrast': {
      name: equinoxDarkContrast.name,
      type: 'dark',
      palette: equinoxDarkContrast.palette,
      ansi: darkAnsiPalette,
    },
    'light-soft': {
      name: equinoxLightSoft.name,
      type: 'light',
      palette: equinoxLightSoft.palette,
      ansi: lightAnsiPalette,
    },
    'light-contrast': {
      name: equinoxLightContrast.name,
      type: 'light',
      palette: equinoxLightContrast.palette,
      ansi: lightAnsiPalette,
    },
  };
}

export function playgroundThemesToJson(): string {
  return JSON.stringify(generatePlaygroundThemes(), null, 2);
}
