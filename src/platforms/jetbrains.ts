/**
 * Equinox Theme: JetBrains Compiler
 * Generates JetBrains IDE .icls Color Scheme XML format
 * Compatible with IntelliJ IDEA, WebStorm, PyCharm, Kotlin, GoLand, etc.
 */

import { EquinoxVariant } from '../tokens';

export interface JetBrainsColorScheme {
  name: string;
  parentScheme: string;
  attributes: Record<string, { foreground?: string; background?: string; fontStyle?: string }>;
}

// Convert hex color to JetBrains format (remove # and convert to RGB if needed)
function formatJetBrainsColor(hex: string): string {
  return hex.replace('#', '');
}

export function generateJetBrainsColorScheme(variant: EquinoxVariant): JetBrainsColorScheme {
  const isDark = variant.name.includes('Dark');
  const isContrast = variant.name.includes('Contrast');

  return {
    name: variant.name,
    parentScheme: isDark ? 'Darcula' : 'IntelliJ',
    attributes: {
      // Base editor colors
      TEXT: {
        foreground: formatJetBrainsColor(variant.palette.editor.foreground),
        background: formatJetBrainsColor(variant.palette.editor.background),
      },
      CARET_ROW_COLOR: {
        background: formatJetBrainsColor(variant.palette.ui.selection),
      },
      SELECTION_BACKGROUND: {
        background: formatJetBrainsColor(variant.palette.ui.selection),
      },
      SELECTION_FOREGROUND: {
        foreground: formatJetBrainsColor(variant.palette.editor.foreground),
      },

      // Search results
      SEARCH_RESULT_ATTRIBUTES: {
        background: formatJetBrainsColor(`${variant.palette.ui.focus}35`),
        foreground: formatJetBrainsColor(variant.palette.editor.foreground),
      },
      SEARCH_RESULT_SECONDARY_ATTRIBUTES: {
        background: formatJetBrainsColor(`${variant.palette.ui.focus}20`),
      },

      // Keywords and control flow
      KEYWORDS: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
        fontStyle: 'bold',
      },
      KEYWORD: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
      },

      // Functions and methods
      FUNCTIONS: {
        foreground: formatJetBrainsColor(variant.palette.syntax.function),
      },
      FUNCTION_CALL: {
        foreground: formatJetBrainsColor(variant.palette.syntax.function),
      },
      METHOD_CALL: {
        foreground: formatJetBrainsColor(variant.palette.syntax.function),
      },
      STATIC_FINAL_FIELD: {
        foreground: formatJetBrainsColor(variant.palette.syntax.variable),
      },

      // Strings and literals
      STRING: {
        foreground: formatJetBrainsColor(variant.palette.syntax.string),
      },
      VALID_STRING_ESCAPE: {
        foreground: formatJetBrainsColor(variant.palette.syntax.number),
        fontStyle: 'bold',
      },

      // Numbers and constants
      NUMBER: {
        foreground: formatJetBrainsColor(variant.palette.syntax.number),
      },
      CONSTANT: {
        foreground: formatJetBrainsColor(variant.palette.syntax.number),
      },

      // Variables and parameters
      VARIABLE: {
        foreground: formatJetBrainsColor(variant.palette.syntax.variable),
      },
      LOCAL_VARIABLE: {
        foreground: formatJetBrainsColor(variant.palette.syntax.variable),
      },
      PARAMETER: {
        foreground: formatJetBrainsColor(variant.palette.syntax.variable),
      },
      INSTANCE_FIELD: {
        foreground: formatJetBrainsColor(variant.palette.syntax.variable),
      },
      CLASS_FIELD: {
        foreground: formatJetBrainsColor(variant.palette.syntax.variable),
      },

      // Types and classes
      CLASS_NAME: {
        foreground: formatJetBrainsColor(variant.palette.syntax.function),
      },
      INTERFACE_NAME: {
        foreground: formatJetBrainsColor(variant.palette.syntax.function),
      },
      ENUM_NAME: {
        foreground: formatJetBrainsColor(variant.palette.syntax.function),
      },
      TYPE_PARAMETER_NAME: {
        foreground: formatJetBrainsColor(variant.palette.syntax.function),
      },

      // Comments
      COMMENTS: {
        foreground: formatJetBrainsColor(variant.palette.syntax.comment),
        fontStyle: 'italic',
      },
      JAVADOC: {
        foreground: formatJetBrainsColor(variant.palette.syntax.comment),
        fontStyle: 'italic',
      },
      JAVADOC_MARKUP: {
        foreground: formatJetBrainsColor(variant.palette.syntax.comment),
      },

      // Operators
      OPERATOR_SIGN: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
      },
      PARENTHESES: {
        foreground: formatJetBrainsColor(variant.palette.ui.lineNumber),
      },
      BRACKETS: {
        foreground: formatJetBrainsColor(variant.palette.ui.lineNumber),
      },
      BRACES: {
        foreground: formatJetBrainsColor(variant.palette.ui.lineNumber),
      },

      // Special
      ANONYMOUS_CLASS_NAME: {
        foreground: formatJetBrainsColor(variant.palette.syntax.function),
      },
      LABEL: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
        fontStyle: 'italic',
      },

      // Line numbers and gutter
      LINE_NUMBERS_COLOR: {
        foreground: formatJetBrainsColor(variant.palette.ui.lineNumber),
      },
      LINE_NUMBER_ON_CARET_ROW_COLOR: {
        foreground: formatJetBrainsColor(variant.palette.ui.cursor),
        fontStyle: 'bold',
      },

      // Error/Warning/Info
      ERRORS_ATTRIBUTES: {
        foreground: isDark ? formatJetBrainsColor('#e85a5f') : formatJetBrainsColor('#c72c23'),
        fontStyle: 'wavy underline',
      },
      WARNING_ATTRIBUTES: {
        foreground: isDark ? formatJetBrainsColor('#d9a963') : formatJetBrainsColor('#b89e39'),
        fontStyle: 'wavy underline',
      },
      INFO_ATTRIBUTES: {
        foreground: isDark ? formatJetBrainsColor('#7da6ce') : formatJetBrainsColor('#1f5b9f'),
        fontStyle: 'wavy underline',
      },

      // Markup (HTML, XML)
      HTML_TAG: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
      },
      HTML_TAG_NAME: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
      },
      HTML_ATTRIBUTE_NAME: {
        foreground: formatJetBrainsColor(variant.palette.syntax.variable),
      },
      HTML_ATTRIBUTE_VALUE: {
        foreground: formatJetBrainsColor(variant.palette.syntax.string),
      },

      // CSS
      CSS_PROPERTY_NAME: {
        foreground: formatJetBrainsColor(variant.palette.syntax.variable),
      },
      CSS_PROPERTY_VALUE: {
        foreground: formatJetBrainsColor(variant.palette.syntax.string),
      },
      CSS_SELECTOR: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
      },
      CSS_IMPORTANT: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
        fontStyle: 'bold',
      },

      // YAML
      YAML_KEY: {
        foreground: formatJetBrainsColor(variant.palette.syntax.variable),
      },
      YAML_VALUE: {
        foreground: formatJetBrainsColor(variant.palette.syntax.string),
      },

      // JSON
      JSON_KEY: {
        foreground: formatJetBrainsColor(variant.palette.syntax.variable),
      },
      JSON_VALUE: {
        foreground: formatJetBrainsColor(variant.palette.syntax.string),
      },

      // Python
      PY_KEYWORD: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
      },
      PY_FUNC_DEFINITION: {
        foreground: formatJetBrainsColor(variant.palette.syntax.function),
        fontStyle: 'bold',
      },
      PY_CLASS_DEFINITION: {
        foreground: formatJetBrainsColor(variant.palette.syntax.function),
        fontStyle: 'bold',
      },
      PY_DECORATOR: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
      },

      // SQL
      SQL_KEYWORD: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
      },
      SQL_STRING: {
        foreground: formatJetBrainsColor(variant.palette.syntax.string),
      },
      SQL_NUMBER: {
        foreground: formatJetBrainsColor(variant.palette.syntax.number),
      },

      // Kotlin
      KOTLIN_KEYWORD: {
        foreground: formatJetBrainsColor(variant.palette.syntax.keyword),
      },
      KOTLIN_FUNCTION_CALL: {
        foreground: formatJetBrainsColor(variant.palette.syntax.function),
      },
    },
  };
}

export function jetBrainsColorSchemeToXml(scheme: JetBrainsColorScheme): string {
  const isDark = scheme.parentScheme === 'Darcula';
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += `<scheme name="${escapeXml(scheme.name)}" version="142" parent_scheme="${scheme.parentScheme}">\n`;

  // Add colors section
  xml += '  <colors>\n';
  for (const [key, value] of Object.entries(scheme.attributes)) {
    if (value.background && !value.foreground) {
      xml += `    <option name="${escapeXml(key)}" value="${escapeXml(value.background)}" />\n`;
    }
  }
  xml += '  </colors>\n';

  // Add attributes section
  xml += '  <attributes>\n';
  for (const [key, value] of Object.entries(scheme.attributes)) {
    if (value.foreground || value.background) {
      xml += `    <option name="${escapeXml(key)}">\n`;
      xml += '      <value>\n';
      if (value.foreground) {
        xml += `        <option name="FOREGROUND" value="${escapeXml(value.foreground)}" />\n`;
      }
      if (value.background) {
        xml += `        <option name="BACKGROUND" value="${escapeXml(value.background)}" />\n`;
      }
      if (value.fontStyle) {
        let fontStyleValue = '';
        if (value.fontStyle.includes('bold')) fontStyleValue += '1';
        if (value.fontStyle.includes('italic')) fontStyleValue += '2';
        if (fontStyleValue) {
          xml += `        <option name="FONT_TYPE" value="${fontStyleValue}" />\n`;
        }
      }
      xml += '      </value>\n';
      xml += '    </option>\n';
    }
  }
  xml += '  </attributes>\n';

  xml += '</scheme>\n';
  return xml;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
