/**
 * Equinox Theme: VS Code Compiler
 * Generates VS Code theme JSON with universal language support
 * Maps syntax tokens to standard semantic scopes
 */

import { EquinoxVariant } from '../tokens';

export interface VsCodeTheme {
  name: string;
  type: 'light' | 'dark';
  colors: Record<string, string>;
  tokenColors: Array<{
    name?: string;
    scope: string | string[];
    settings: {
      foreground?: string;
      fontStyle?: string;
      background?: string;
    };
  }>;
}

export function generateVsCodeTheme(variant: EquinoxVariant): VsCodeTheme {
  const isDark = variant.name.includes('Dark');
  const isContrast = variant.name.includes('Contrast');

  return {
    name: variant.name,
    type: isDark ? 'dark' : 'light',
    colors: {
      // Editor colors
      'editor.background': variant.palette.editor.background,
      'editor.foreground': variant.palette.editor.foreground,
      'editor.selectionBackground': variant.palette.ui.selection,
      'editor.selectionForeground': variant.palette.editor.foreground,
      'editor.lineNumbersBackground': variant.palette.editor.background,
      'editor.lineNumberColor': variant.palette.ui.lineNumber,
      'editor.cursorStyle': 'line',
      'editor.cursorColor': variant.palette.ui.cursor,
      'editor.foldBackground': `${variant.palette.ui.selection}40`,
      'editor.findMatchBackground': `${variant.palette.ui.focus}35`,
      'editor.findMatchBorder': variant.palette.ui.focus,
      'editor.findMatchHighlightBackground': `${variant.palette.ui.focus}20`,

      // Diff colors
      'diffEditor.insertedTextBackground': isDark ? '#7aa55540' : '#5b8c2840',
      'diffEditor.removedTextBackground': isDark ? '#e85a5f40' : '#c72c2340',
      'diffEditor.diagonalFill': isDark ? '#6b779340' : '#a0a8b840',

      // UI colors
      'button.background': variant.palette.ui.focus,
      'button.foreground': isDark
        ? variant.palette.editor.background
        : variant.palette.editor.foreground,
      'button.hoverBackground': isDark
        ? `${variant.palette.ui.focus}dd`
        : `${variant.palette.ui.focus}dd`,

      // Sidebar colors
      'sideBar.background': variant.palette.sidebar.background,
      'sideBar.foreground': variant.palette.sidebar.foreground,
      'sideBar.border': variant.palette.ui.border,
      'sideBarTitle.foreground': variant.palette.sidebar.foreground,

      // Toolbar colors
      'activityBar.background': variant.palette.toolbar.background,
      'activityBar.foreground': variant.palette.toolbar.foreground,
      'activityBar.border': variant.palette.ui.border,
      'activityBarBadge.background': variant.palette.ui.focus,
      'activityBarBadge.foreground': isDark
        ? variant.palette.editor.background
        : variant.palette.editor.foreground,

      // Tab colors
      'tab.activeBackground': variant.palette.editor.background,
      'tab.activeForeground': variant.palette.editor.foreground,
      'tab.inactiveBackground': isContrast
        ? variant.palette.toolbar.background
        : `${variant.palette.editor.background}cc`,
      'tab.inactiveForeground': `${variant.palette.ui.lineNumber}99`,
      'tab.border': variant.palette.ui.border,

      // Status bar
      'statusBar.background': variant.palette.toolbar.background,
      'statusBar.foreground': variant.palette.toolbar.foreground,
      'statusBar.border': variant.palette.ui.border,

      // Input and dropdowns
      'input.background': isContrast
        ? variant.palette.toolbar.background
        : `${variant.palette.editor.background}dd`,
      'input.foreground': variant.palette.editor.foreground,
      'input.border': variant.palette.ui.border,
      'input.placeholderForeground': variant.palette.ui.lineNumber,
      'dropdown.background': isContrast
        ? variant.palette.toolbar.background
        : `${variant.palette.editor.background}dd`,
      'dropdown.border': variant.palette.ui.border,
      'dropdown.foreground': variant.palette.editor.foreground,

      // Focus and highlights
      focusBorder: variant.palette.ui.focus,
      'widget.shadow': isDark ? '#00000040' : '#00000010',

      // Terminal
      'terminal.background': variant.palette.editor.background,
      'terminal.foreground': variant.palette.editor.foreground,
      'terminal.ansiBlack': isDark ? '#0f1419' : '#2c2e3a',
      'terminal.ansiRed': isDark ? '#e85a5f' : '#c72c23',
      'terminal.ansiGreen': isDark ? '#7aa555' : '#5b8c28',
      'terminal.ansiYellow': isDark ? '#d9a963' : '#b89e39',
      'terminal.ansiBlue': isDark ? '#7da6ce' : '#1f5b9f',
      'terminal.ansiMagenta': isDark ? '#9d84b7' : '#6b4c8f',
      'terminal.ansiCyan': isDark ? '#6fb8c0' : '#1b7d7d',
      'terminal.ansiWhite': isDark ? '#d4d8e0' : '#a0a8b8',
      'terminal.ansiBrightBlack': isDark ? '#6b7793' : '#808a9a',
      'terminal.ansiBrightRed': isDark ? '#e89c9f' : '#e85c52',
      'terminal.ansiBrightGreen': isDark ? '#99c977' : '#7ab044',
      'terminal.ansiBrightYellow': isDark ? '#e5bf99' : '#dab149',
      'terminal.ansiBrightBlue': isDark ? '#9dbbdb' : '#4b7cbd',
      'terminal.ansiBrightMagenta': isDark ? '#c4a3d9' : '#8f6cb5',
      'terminal.ansiBrightCyan': isDark ? '#94d6de' : '#3ba5a5',
      'terminal.ansiBrightWhite': isDark ? '#e8eef7' : '#f5f3f0',
    },
    tokenColors: [
      // Comments
      {
        name: 'Comment',
        scope: ['comment'],
        settings: {
          foreground: variant.palette.syntax.comment,
          fontStyle: 'italic',
        },
      },
      {
        name: 'Comment Documentation',
        scope: ['comment.block.documentation'],
        settings: {
          foreground: variant.palette.syntax.comment,
          fontStyle: 'italic',
        },
      },

      // Strings
      {
        name: 'String',
        scope: ['string', 'string.quoted', 'string.quoted.single', 'string.quoted.double'],
        settings: {
          foreground: variant.palette.syntax.string,
        },
      },
      {
        name: 'String Escape',
        scope: ['constant.character.escape', 'string constant.other.placeholder'],
        settings: {
          foreground: variant.palette.syntax.number,
        },
      },

      // Numbers
      {
        name: 'Number',
        scope: ['constant.numeric'],
        settings: {
          foreground: variant.palette.syntax.number,
        },
      },

      // Built-in Constants
      {
        name: 'Built-in Constants',
        scope: ['constant.language'],
        settings: {
          foreground: variant.palette.syntax.number,
        },
      },

      // Keywords
      {
        name: 'Keyword',
        scope: ['keyword', 'keyword.control'],
        settings: {
          foreground: variant.palette.syntax.keyword,
        },
      },
      {
        name: 'Keyword Storage',
        scope: ['storage', 'storage.modifier', 'storage.type', 'keyword.declaration'],
        settings: {
          foreground: variant.palette.syntax.keyword,
        },
      },
      {
        name: 'Keyword Operator',
        scope: ['keyword.operator'],
        settings: {
          foreground: variant.palette.syntax.keyword,
        },
      },

      // Operators
      {
        name: 'Operator',
        scope: ['keyword.operator'],
        settings: {
          foreground: variant.palette.syntax.keyword,
        },
      },

      // Functions and Methods
      {
        name: 'Function Definition',
        scope: ['entity.name.function'],
        settings: {
          foreground: variant.palette.syntax.function,
        },
      },
      {
        name: 'Function Call',
        scope: ['meta.function-call entity.name.function', 'meta.method-call entity.name.function'],
        settings: {
          foreground: variant.palette.syntax.function,
        },
      },
      {
        name: 'Function Parameters',
        scope: ['variable.parameter'],
        settings: {
          foreground: variant.palette.syntax.variable,
        },
      },

      // Variables
      {
        name: 'Variable',
        scope: ['variable'],
        settings: {
          foreground: variant.palette.syntax.variable,
        },
      },
      {
        name: 'Variable This',
        scope: ['variable.language.this', 'variable.other.this'],
        settings: {
          foreground: variant.palette.syntax.keyword,
          fontStyle: 'italic',
        },
      },
      {
        name: 'Variable Self',
        scope: ['variable.language'],
        settings: {
          foreground: variant.palette.syntax.keyword,
        },
      },

      // Tags
      {
        name: 'Tag',
        scope: ['entity.name.tag'],
        settings: {
          foreground: variant.palette.syntax.keyword,
        },
      },
      {
        name: 'Tag Attribute',
        scope: ['entity.other.attribute-name'],
        settings: {
          foreground: variant.palette.syntax.variable,
        },
      },

      // Classes and Types
      {
        name: 'Class Name',
        scope: ['entity.name.class'],
        settings: {
          foreground: variant.palette.syntax.function,
        },
      },
      {
        name: 'Type Name',
        scope: ['entity.name.type'],
        settings: {
          foreground: variant.palette.syntax.function,
        },
      },
      {
        name: 'Type Parameter',
        scope: ['meta.type.parameters entity.name.type'],
        settings: {
          foreground: variant.palette.syntax.function,
        },
      },

      // Punctuation
      {
        name: 'Punctuation',
        scope: ['punctuation'],
        settings: {
          foreground: variant.palette.ui.lineNumber,
        },
      },

      // Invalid
      {
        name: 'Invalid',
        scope: ['invalid'],
        settings: {
          background: isDark ? '#e85a5f40' : '#c72c2340',
          foreground: isDark ? '#e85a5f' : '#c72c23',
        },
      },

      // Markdown
      {
        name: 'Markdown Bold',
        scope: ['markup.bold'],
        settings: {
          fontStyle: 'bold',
          foreground: variant.palette.syntax.keyword,
        },
      },
      {
        name: 'Markdown Italic',
        scope: ['markup.italic'],
        settings: {
          fontStyle: 'italic',
          foreground: variant.palette.syntax.keyword,
        },
      },
      {
        name: 'Markdown Link',
        scope: ['markup.underline.link'],
        settings: {
          foreground: variant.palette.syntax.function,
        },
      },
      {
        name: 'Markdown Heading',
        scope: ['markup.heading'],
        settings: {
          foreground: variant.palette.syntax.keyword,
          fontStyle: 'bold',
        },
      },

      // Language-specific scopes
      // These ensure universal support across TypeScript, JavaScript, Python, Java, Go, Rust, etc.

      // Python
      {
        name: 'Python Decorator',
        scope: ['meta.function.decorator'],
        settings: {
          foreground: variant.palette.syntax.keyword,
        },
      },

      // Java/Kotlin
      {
        name: 'Java Annotation',
        scope: ['meta.declaration.annotation'],
        settings: {
          foreground: variant.palette.syntax.keyword,
        },
      },

      // CSS/SCSS
      {
        name: 'CSS Property Name',
        scope: ['support.type.property-name'],
        settings: {
          foreground: variant.palette.syntax.variable,
        },
      },
      {
        name: 'CSS Property Value',
        scope: ['support.constant.property-value'],
        settings: {
          foreground: variant.palette.syntax.string,
        },
      },

      // YAML
      {
        name: 'YAML Key',
        scope: ['entity.name.tag.yaml'],
        settings: {
          foreground: variant.palette.syntax.variable,
        },
      },
    ],
  };
}

export function vscodeThemeToJson(theme: VsCodeTheme): string {
  return JSON.stringify(theme, null, 2);
}
