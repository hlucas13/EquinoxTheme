/**
 * Equinox Colors: JetBrains Compiler
 * Generates JetBrains IDE .icls Color Scheme XML format
 * Compatible with IntelliJ IDEA, WebStorm, PyCharm, Kotlin, GoLand, etc.
 * Also generates .theme.json UI themes with Islands (New UI) support.
 */

import { PALETTE } from '../colors/palette';
import { EquinoxVariant } from '../themes/variants';

export interface JetBrainsColorScheme {
    name: string;
    parentScheme: string;
    attributes: Record<
        string,
        { foreground?: string; background?: string; fontStyle?: string }
    >;
}

// ── UI Theme (New UI / Islands) ─────────────────────────────────────────────

export interface JetBrainsTheme {
    name: string;
    dark: boolean;
    author: string;
    editorScheme: string;
    /** Inherit defaults from a built-in JetBrains theme (e.g. "Islands Dark") */
    parentTheme?: string;
    /** Flat map of UI property key → hex color string (with #) */
    ui: Record<string, string>;
    /** Icon color palette overrides */
    icons: { ColorPalette: Record<string, string> };
}

// Convert hex color to JetBrains format (remove # and convert to RGB if needed)
function formatJetBrainsColor(hex: string): string {
    return hex.replace('#', '');
}

export function generateJetBrainsColorScheme(
    variant: EquinoxVariant
): JetBrainsColorScheme {
    const isDark = variant.name.includes('Dark');
    const ansi = isDark ? PALETTE.ansi.dark : PALETTE.ansi.light;
    const status = isDark ? PALETTE.status.dark : PALETTE.status.light;

    return {
        name: variant.name,
        parentScheme: isDark ? 'Darcula' : 'IntelliJ',
        attributes: {
            // Base editor colors
            TEXT: {
                foreground: formatJetBrainsColor(
                    variant.palette.editor.foreground
                ),
                background: formatJetBrainsColor(
                    variant.palette.editor.background
                ),
            },
            CARET_ROW_COLOR: {
                background: formatJetBrainsColor(variant.palette.ui.selection),
            },
            SELECTION_BACKGROUND: {
                background: formatJetBrainsColor(variant.palette.ui.selection),
            },
            SELECTION_FOREGROUND: {
                foreground: formatJetBrainsColor(
                    variant.palette.editor.foreground
                ),
            },

            // Search results
            SEARCH_RESULT_ATTRIBUTES: {
                background: formatJetBrainsColor(
                    `${variant.palette.ui.focus}35`
                ),
                foreground: formatJetBrainsColor(
                    variant.palette.editor.foreground
                ),
            },
            SEARCH_RESULT_SECONDARY_ATTRIBUTES: {
                background: formatJetBrainsColor(
                    `${variant.palette.ui.focus}20`
                ),
            },

            // Accent: hyperlinks, identifier-under-caret, focused elements
            HYPERLINK_ATTRIBUTES: {
                foreground: formatJetBrainsColor(variant.palette.ui.focus),
                fontStyle: 'underline',
            },
            FOLLOWED_HYPERLINK_ATTRIBUTES: {
                foreground: formatJetBrainsColor(
                    `${variant.palette.ui.focus}bb`
                ),
                fontStyle: 'underline',
            },
            IDENTIFIER_UNDER_CARET_ATTRIBUTES: {
                background: formatJetBrainsColor(
                    `${variant.palette.ui.focus}30`
                ),
            },
            WRITE_IDENTIFIER_UNDER_CARET_ATTRIBUTES: {
                background: formatJetBrainsColor(
                    `${variant.palette.ui.focus}50`
                ),
            },
            MATCHED_BRACE_ATTRIBUTES: {
                background: formatJetBrainsColor(
                    `${variant.palette.ui.focus}40`
                ),
                fontStyle: 'bold',
            },

            // Keywords and control flow
            KEYWORDS: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
                fontStyle: 'bold',
            },
            KEYWORD: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
            },

            // Functions and methods
            FUNCTIONS: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.function
                ),
            },
            FUNCTION_CALL: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.function
                ),
            },
            METHOD_CALL: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.function
                ),
            },
            STATIC_FINAL_FIELD: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.variable
                ),
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
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.variable
                ),
            },
            LOCAL_VARIABLE: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.variable
                ),
            },
            PARAMETER: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.variable
                ),
            },
            INSTANCE_FIELD: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.variable
                ),
            },
            CLASS_FIELD: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.variable
                ),
            },

            // Types and classes
            CLASS_NAME: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.function
                ),
            },
            INTERFACE_NAME: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.function
                ),
            },
            ENUM_NAME: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.function
                ),
            },
            TYPE_PARAMETER_NAME: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.function
                ),
            },

            // Comments
            COMMENTS: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.comment
                ),
                fontStyle: 'italic',
            },
            JAVADOC: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.comment
                ),
                fontStyle: 'italic',
            },
            JAVADOC_MARKUP: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.comment
                ),
            },

            // Operators
            OPERATOR_SIGN: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
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
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.function
                ),
            },
            LABEL: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
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
                foreground: formatJetBrainsColor(status.error),
                fontStyle: 'wavy underline',
            },
            WARNING_ATTRIBUTES: {
                foreground: formatJetBrainsColor(status.warning),
                fontStyle: 'wavy underline',
            },
            INFO_ATTRIBUTES: {
                foreground: formatJetBrainsColor(status.info),
                fontStyle: 'wavy underline',
            },
            WEAK_WARNING_ATTRIBUTES: {
                foreground: formatJetBrainsColor(status.warning),
                fontStyle: 'underline',
            },
            TYPO: {
                foreground: formatJetBrainsColor(status.warning),
                fontStyle: 'underline',
            },
            DEPRECATED_ATTRIBUTES: {
                foreground: formatJetBrainsColor(variant.palette.ui.lineNumber),
                fontStyle: 'strikethrough',
            },
            UNUSED_SYMBOL_ATTRIBUTES: {
                foreground: formatJetBrainsColor(
                    `${variant.palette.ui.lineNumber}99`
                ),
            },
            NOT_USED_ELEMENT_ATTRIBUTES: {
                foreground: formatJetBrainsColor(
                    `${variant.palette.ui.lineNumber}99`
                ),
            },

            // Folded text
            FOLDED_TEXT_ATTRIBUTES: {
                foreground: formatJetBrainsColor(variant.palette.ui.lineNumber),
                background: formatJetBrainsColor(
                    `${variant.palette.ui.selection}80`
                ),
            },

            // Task/note highlighting
            TODO_DEFAULT_ATTRIBUTES: {
                foreground: formatJetBrainsColor(ansi.yellow),
                fontStyle: 'bold',
            },

            // Markup (HTML, XML)
            HTML_TAG: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
            },
            HTML_TAG_NAME: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
            },
            HTML_ATTRIBUTE_NAME: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.variable
                ),
            },
            HTML_ATTRIBUTE_VALUE: {
                foreground: formatJetBrainsColor(variant.palette.syntax.string),
            },

            // CSS
            CSS_PROPERTY_NAME: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.variable
                ),
            },
            CSS_PROPERTY_VALUE: {
                foreground: formatJetBrainsColor(variant.palette.syntax.string),
            },
            CSS_SELECTOR: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
            },
            CSS_IMPORTANT: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
                fontStyle: 'bold',
            },

            // YAML
            YAML_KEY: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.variable
                ),
            },
            YAML_VALUE: {
                foreground: formatJetBrainsColor(variant.palette.syntax.string),
            },

            // JSON
            JSON_KEY: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.variable
                ),
            },
            JSON_VALUE: {
                foreground: formatJetBrainsColor(variant.palette.syntax.string),
            },

            // Python
            PY_KEYWORD: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
            },
            PY_FUNC_DEFINITION: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.function
                ),
                fontStyle: 'bold',
            },
            PY_CLASS_DEFINITION: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.function
                ),
                fontStyle: 'bold',
            },
            PY_DECORATOR: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
            },

            // SQL
            SQL_KEYWORD: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
            },
            SQL_STRING: {
                foreground: formatJetBrainsColor(variant.palette.syntax.string),
            },
            SQL_NUMBER: {
                foreground: formatJetBrainsColor(variant.palette.syntax.number),
            },

            // Kotlin
            KOTLIN_KEYWORD: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.keyword
                ),
            },
            KOTLIN_FUNCTION_CALL: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.function
                ),
            },

            // Run/Debug console output
            CONSOLE_BACKGROUND_KEY: {
                background: formatJetBrainsColor(
                    variant.palette.editor.background
                ),
            },
            CONSOLE_NORMAL_OUTPUT: {
                foreground: formatJetBrainsColor(
                    variant.palette.editor.foreground
                ),
                background: formatJetBrainsColor(
                    variant.palette.editor.background
                ),
            },
            CONSOLE_SYSTEM_OUTPUT: {
                foreground: formatJetBrainsColor(ansi.cyan),
                background: formatJetBrainsColor(
                    variant.palette.editor.background
                ),
            },
            CONSOLE_ERROR_OUTPUT: {
                foreground: formatJetBrainsColor(status.error),
                background: formatJetBrainsColor(
                    variant.palette.editor.background
                ),
            },
            CONSOLE_USER_INPUT: {
                foreground: formatJetBrainsColor(ansi.green),
                background: formatJetBrainsColor(
                    variant.palette.editor.background
                ),
                fontStyle: 'bold',
            },
            LOG_ERROR_OUTPUT: {
                foreground: formatJetBrainsColor(status.error),
            },
            LOG_WARNING_OUTPUT: {
                foreground: formatJetBrainsColor(status.warning),
            },
            LOG_INFO_OUTPUT: {
                foreground: formatJetBrainsColor(status.info),
            },
            LOG_DEBUG_OUTPUT: {
                foreground: formatJetBrainsColor(
                    variant.palette.syntax.comment
                ),
            },
            LOG_VERBOSE_OUTPUT: {
                foreground: formatJetBrainsColor(variant.palette.ui.lineNumber),
            },
            LOG_EXPIRED_ENTRY: {
                foreground: formatJetBrainsColor(variant.palette.ui.lineNumber),
            },
            // ANSI console colors (normal)
            CONSOLE_BLACK_OUTPUT: {
                foreground: formatJetBrainsColor(ansi.black),
            },
            CONSOLE_RED_OUTPUT: {
                foreground: formatJetBrainsColor(ansi.red),
            },
            CONSOLE_GREEN_OUTPUT: {
                foreground: formatJetBrainsColor(ansi.green),
            },
            CONSOLE_YELLOW_OUTPUT: {
                foreground: formatJetBrainsColor(ansi.yellow),
            },
            CONSOLE_BLUE_OUTPUT: {
                foreground: formatJetBrainsColor(ansi.blue),
            },
            CONSOLE_MAGENTA_OUTPUT: {
                foreground: formatJetBrainsColor(ansi.magenta),
            },
            CONSOLE_CYAN_OUTPUT: {
                foreground: formatJetBrainsColor(ansi.cyan),
            },
            CONSOLE_WHITE_OUTPUT: {
                foreground: formatJetBrainsColor(ansi.white),
            },
            // ANSI console colors (bright/bold)
            CONSOLE_DARK_RED: {
                foreground: formatJetBrainsColor(ansi.brightRed),
            },
            CONSOLE_GRAY_OUTPUT: {
                foreground: formatJetBrainsColor(ansi.brightBlack),
            },

            // VCS diff gutter
            ADDED_LINES_COLOR: {
                background: formatJetBrainsColor(`${ansi.green}60`),
            },
            MODIFIED_LINES_COLOR: {
                background: formatJetBrainsColor(`${ansi.yellow}60`),
            },
            DELETED_LINES_COLOR: {
                background: formatJetBrainsColor(`${status.error}60`),
            },
            WHITESPACES_MODIFIED_LINES_COLOR: {
                background: formatJetBrainsColor(`${ansi.blue}60`),
            },
            IGNORED_ADDED_LINES_BORDER_COLOR: {
                background: formatJetBrainsColor(`${ansi.green}30`),
            },
            IGNORED_MODIFIED_LINES_BORDER_COLOR: {
                background: formatJetBrainsColor(`${ansi.yellow}30`),
            },
            IGNORED_DELETED_LINES_BORDER_COLOR: {
                background: formatJetBrainsColor(`${status.error}30`),
            },
            // Diff editor backgrounds
            DIFF_MODIFIED: {
                background: formatJetBrainsColor(`${ansi.yellow}25`),
            },
            DIFF_INSERTED: {
                background: formatJetBrainsColor(`${ansi.green}25`),
            },
            DIFF_DELETED: {
                background: formatJetBrainsColor(`${status.error}25`),
            },
            DIFF_CONFLICT: {
                background: formatJetBrainsColor(`${status.warning}25`),
            },
        },
    };
}

type AttributeValue = {
    foreground?: string;
    background?: string;
    fontStyle?: string;
};

function encodeFontStyle(fontStyle: string): string {
    let value = '';
    if (fontStyle.includes('bold')) value += '1';
    if (fontStyle.includes('italic')) value += '2';
    return value;
}

function buildColorEntry(key: string, value: AttributeValue): string {
    const hasColor =
        value.foreground !== undefined || value.background !== undefined;
    if (!hasColor) return '';

    let entry = `    <option name="${escapeXml(key)}">\n      <value>\n`;
    if (value.foreground)
        entry += `        <option name="FOREGROUND" value="${escapeXml(value.foreground)}" />\n`;
    if (value.background)
        entry += `        <option name="BACKGROUND" value="${escapeXml(value.background)}" />\n`;
    if (value.fontStyle) {
        const encoded = encodeFontStyle(value.fontStyle);
        if (encoded)
            entry += `        <option name="FONT_TYPE" value="${encoded}" />\n`;
    }
    return entry + '      </value>\n    </option>\n';
}

function buildColorsSection(
    attributes: JetBrainsColorScheme['attributes']
): string {
    let section = '  <colors>\n';
    for (const [key, value] of Object.entries(attributes)) {
        if (value.background && !value.foreground) {
            section += `    <option name="${escapeXml(key)}" value="${escapeXml(value.background)}" />\n`;
        }
    }
    return section + '  </colors>\n';
}

function buildAttributesSection(
    attributes: JetBrainsColorScheme['attributes']
): string {
    let section = '  <attributes>\n';
    for (const [key, value] of Object.entries(attributes)) {
        section += buildColorEntry(key, value);
    }
    return section + '  </attributes>\n';
}

export function jetBrainsColorSchemeToXml(
    scheme: JetBrainsColorScheme
): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += `<scheme name="${escapeXml(scheme.name)}" version="142" parent_scheme="${scheme.parentScheme}">\n`;
    xml += buildColorsSection(scheme.attributes);
    xml += buildAttributesSection(scheme.attributes);
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

// ============================================================================
// JETBRAINS ISLANDS COLOR SCHEME
// Extends the base .icls with the DESKTOP attribute (wallpaper behind islands)
// and marks the name as an Islands variant.
// ============================================================================

/** Desktop/wallpaper background shown between floating islands per variant */
function islandsDesktopColor(variant: EquinoxVariant): string {
    const n = variant.name;
    if (n.includes('Dark Modern')) return '0d1018';
    if (n.includes('Dark Contrast')) return '090c11';
    if (n.includes('Light Soft')) return 'd6d2cc';
    if (n.includes('Light Contrast')) return 'd2cec7';
    const isDark = n.includes('Dark');
    return isDark ? '0d1018' : 'd6d2cc';
}

export function generateJetBrainsIslandsColorScheme(
    variant: EquinoxVariant
): JetBrainsColorScheme {
    const base = generateJetBrainsColorScheme(variant);
    const desktopColor = islandsDesktopColor(variant);
    return {
        name: `${variant.name} Islands`,
        parentScheme: base.parentScheme,
        attributes: {
            ...base.attributes,
            // Background visible behind floating island panels
            DESKTOP: {
                background: desktopColor,
            },
        },
    };
}

// ============================================================================
// JETBRAINS UI THEME (.theme.json) — New UI / Islands support
// ============================================================================

export function generateJetBrainsTheme(
    variant: EquinoxVariant
): JetBrainsTheme {
    const isDark = variant.name.includes('Dark');
    const ansi = isDark ? PALETTE.ansi.dark : PALETTE.ansi.light;
    const status = isDark ? PALETTE.status.dark : PALETTE.status.light;

    const p = variant.palette;
    const editorBg = p.editor.background;
    const panelBg = p.toolbar.background;
    const fg = p.editor.foreground;
    const border = p.ui.border;
    const accent = p.ui.focus;
    const selection = p.ui.selection;
    const lineNumber = p.ui.lineNumber;
    const desktopHex = `#${islandsDesktopColor(variant)}`;

    // Slug for the editorScheme reference (matches the .xml filename)
    const slug = variant.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[()]/g, '');

    return {
        name: variant.name,
        dark: isDark,
        author: 'Equinox Team',
        editorScheme: `/colors/${slug}.xml`,
        ui: {
            // ── Desktop (Islands wallpaper) ──────────────────────────────────
            'Desktop.background': desktopHex,

            // ── Base panels ─────────────────────────────────────────────────
            'Panel.background': panelBg,
            'Window.background': panelBg,

            // ── Tool windows (islands in New UI) ────────────────────────────
            'ToolWindow.background': editorBg,
            'ToolWindow.Header.background': panelBg,
            'ToolWindow.Header.borderColor': border,
            'ToolWindow.HeaderCloseButton.background': 'transparent',
            'ToolWindow.inactive.background': editorBg,

            // ── Editor ───────────────────────────────────────────────────────
            'Editor.background': editorBg,
            'EditorTabs.background': panelBg,
            'EditorTabs.selectedBackground': editorBg,
            'EditorTabs.underlineColor': accent,
            'EditorTabs.inactiveUnderlineColor': border,
            'EditorTabs.borderColor': border,
            'Editor.caretRowColor': selection,

            // ── Component ────────────────────────────────────────────────────
            'Component.focusColor': accent,
            'Component.borderColor': border,
            'Component.disabledBorderColor': border,
            'Component.errorFocusColor': status.error,
            'Component.focusedBorderColor': accent,
            'Component.inactiveErrorFocusColor': `${status.error}80`,
            'Component.inactiveWarningFocusColor': `${status.warning}80`,
            'Component.warningFocusColor': status.warning,

            // ── Buttons ──────────────────────────────────────────────────────
            'Button.background': panelBg,
            'Button.foreground': fg,
            'Button.focusedBorderColor': accent,
            'Button.default.background': accent,
            'Button.default.foreground': isDark ? '#ffffff' : '#ffffff',
            'Button.default.focusColor': accent,
            'Button.default.startBorderColor': accent,
            'Button.default.endBorderColor': accent,
            'Button.startBorderColor': border,
            'Button.endBorderColor': border,

            // ── Menu ─────────────────────────────────────────────────────────
            'Menu.background': panelBg,
            'Menu.foreground': fg,
            'Menu.selectionBackground': selection,
            'Menu.selectionForeground': fg,
            'Menu.borderColor': border,
            'MenuItem.background': panelBg,
            'MenuItem.foreground': fg,
            'MenuItem.selectionBackground': selection,
            'MenuItem.selectionForeground': fg,
            'PopupMenu.background': panelBg,
            'PopupMenu.borderColor': border,

            // ── Text / Input ──────────────────────────────────────────────────
            'TextField.background': editorBg,
            'TextField.foreground': fg,
            'TextField.borderColor': border,
            'TextField.focusedBorderColor': accent,
            'TextArea.background': editorBg,
            'TextArea.foreground': fg,
            'Label.foreground': fg,
            'Label.disabledForeground': lineNumber,

            // ── Tabs ──────────────────────────────────────────────────────────
            'TabbedPane.background': panelBg,
            'TabbedPane.foreground': fg,
            'TabbedPane.selectedForeground': fg,
            'TabbedPane.underlineColor': accent,
            'TabbedPane.contentAreaColor': border,

            // ── Tree / List ───────────────────────────────────────────────────
            'Tree.background': editorBg,
            'Tree.foreground': fg,
            'Tree.selectionBackground': selection,
            'Tree.selectionForeground': fg,
            'Tree.selectionInactiveBackground': `${selection}88`,
            'Tree.rowHeight': '0',
            'List.background': editorBg,
            'List.foreground': fg,
            'List.selectionBackground': selection,
            'List.selectionForeground': fg,

            // ── ScrollBar ────────────────────────────────────────────────────
            'ScrollBar.background': panelBg,
            'ScrollBar.thumbColor': `${lineNumber}60`,
            'ScrollBar.thumbBorderColor': 'transparent',
            'ScrollBar.hoverThumbColor': `${lineNumber}aa`,
            'ScrollBar.trackColor': 'transparent',

            // ── Toolbar ──────────────────────────────────────────────────────
            'MainToolbar.background': panelBg,
            'ToolBar.background': panelBg,
            'ToolBar.borderColor': border,
            'RunWidget.background': panelBg,

            // ── Status bar ───────────────────────────────────────────────────
            'StatusBar.background': panelBg,
            'StatusBar.hoverBackground': selection,
            'StatusBar.foreground': fg,
            'StatusBar.borderColor': border,

            // ── Links ─────────────────────────────────────────────────────────
            'Link.activeForeground': accent,
            'Link.hoverForeground': accent,
            'Link.pressedForeground': accent,
            'Link.visitedForeground': `${accent}cc`,

            // ── Progress bar ──────────────────────────────────────────────────
            'ProgressBar.progressColor': accent,
            'ProgressBar.indeterminateStartColor': accent,
            'ProgressBar.indeterminateEndColor': `${accent}80`,
            'ProgressBar.trackColor': selection,

            // ── Notification / Tooltip ────────────────────────────────────────
            'Notification.background': panelBg,
            'Notification.borderColor': border,
            'ToolTip.background': panelBg,
            'ToolTip.foreground': fg,
            'ToolTip.borderColor': border,

            // ── Badge / Counter ───────────────────────────────────────────────
            'Counter.background': accent,
            'Counter.foreground': isDark ? '#ffffff' : '#ffffff',

            // ── Git / VCS ─────────────────────────────────────────────────────
            'VersionControl.FileHistory.Commit.selectedBackground': selection,
        },
        icons: {
            ColorPalette: {
                'Actions.Red': status.error,
                'Actions.Yellow': status.warning,
                'Actions.Green': ansi.green,
                'Actions.Blue': accent,
                'Actions.Grey': lineNumber,
                'Actions.GreyInline': lineNumber,
                'Objects.Red': status.error,
                'Objects.Yellow': status.warning,
                'Objects.Green': ansi.green,
                'Objects.Blue': accent,
                'Objects.Purple': ansi.magenta,
                'Objects.Pink': ansi.brightMagenta,
                'Objects.Teal': ansi.cyan,
                'Objects.Grey': lineNumber,
            },
        },
    };
}

export function jetBrainsThemeToJson(theme: JetBrainsTheme): string {
    return JSON.stringify(theme, null, 2) + '\n';
}

// ============================================================================
// JETBRAINS ISLANDS UI THEME (.theme.json)
// Separate theme entry for the New UI / Islands floating-panel layout.
// Inherits from "Islands Dark" / "Islands Light" built-in parent theme and
// adds Equinox colours on top.  editorScheme references the Islands scheme by
// name so JetBrains applies it automatically when the user selects this theme.
// ============================================================================

export function generateJetBrainsIslandsTheme(
    variant: EquinoxVariant
): JetBrainsTheme {
    const isDark = variant.name.includes('Dark');
    const ansi = isDark ? PALETTE.ansi.dark : PALETTE.ansi.light;
    const status = isDark ? PALETTE.status.dark : PALETTE.status.light;

    const p = variant.palette;
    const editorBg = p.editor.background;
    const panelBg = p.toolbar.background;
    const fg = p.editor.foreground;
    const border = p.ui.border;
    const accent = p.ui.focus;
    const selection = p.ui.selection;
    const lineNumber = p.ui.lineNumber;
    const desktopHex = `#${islandsDesktopColor(variant)}`;

    return {
        name: `${variant.name} Islands`,
        dark: isDark,
        author: 'Equinox Team',
        // editorScheme = scheme NAME (not path) — required by Islands docs
        editorScheme: `${variant.name} Islands`,
        parentTheme: isDark ? 'Islands Dark' : 'Islands Light',
        ui: {
            // ── Islands layout ────────────────────────────────────────────────
            Islands: '1',
            'Island.arc': '20',
            'Island.arc.compact': '16',
            'Island.borderWidth': '5',
            'Island.borderWidth.compact': '4',
            // Same colour as tool-window background so islands have no visible border
            'Island.borderColor': editorBg,
            'Island.inactiveAlpha': '0.44',

            // ── Desktop (wallpaper behind floating islands) ───────────────────
            'Desktop.background': desktopHex,
            'MainWindow.background': desktopHex,

            // ── Hide sidebar borders (Islands design spec) ────────────────────
            'StatusBar.borderColor': '#00000000',
            'ToolWindow.Stripe.borderColor': '#00000000',
            'MainToolbar.borderColor': '#00000000',

            // ── Base panels ───────────────────────────────────────────────────
            'Panel.background': panelBg,
            'Window.background': panelBg,

            // ── Tool windows ──────────────────────────────────────────────────
            'ToolWindow.background': editorBg,
            'ToolWindow.Header.background': panelBg,
            'ToolWindow.Header.borderColor': border,
            'ToolWindow.HeaderCloseButton.background': 'transparent',
            'ToolWindow.inactive.background': editorBg,

            // ── Editor ────────────────────────────────────────────────────────
            'Editor.background': editorBg,
            'EditorTabs.background': panelBg,
            'EditorTabs.selectedBackground': editorBg,
            'EditorTabs.underlineColor': accent,
            'EditorTabs.underlinedBorderColor': accent,
            'EditorTabs.inactiveUnderlinedTabBorderColor': border,
            'EditorTabs.underlinedTabBackground': editorBg,
            'EditorTabs.inactiveUnderlinedTabBackground': panelBg,
            'EditorTabs.inactiveUnderlineColor': border,
            'EditorTabs.borderColor': border,
            'Editor.caretRowColor': selection,

            // ── Component ─────────────────────────────────────────────────────
            'Component.focusColor': accent,
            'Component.borderColor': border,
            'Component.disabledBorderColor': border,
            'Component.errorFocusColor': status.error,
            'Component.focusedBorderColor': accent,
            'Component.inactiveErrorFocusColor': `${status.error}80`,
            'Component.inactiveWarningFocusColor': `${status.warning}80`,
            'Component.warningFocusColor': status.warning,

            // ── Buttons ───────────────────────────────────────────────────────
            'Button.background': panelBg,
            'Button.foreground': fg,
            'Button.focusedBorderColor': accent,
            'Button.default.background': accent,
            'Button.default.foreground': '#ffffff',
            'Button.default.focusColor': accent,
            'Button.default.startBorderColor': accent,
            'Button.default.endBorderColor': accent,
            'Button.startBorderColor': border,
            'Button.endBorderColor': border,

            // ── Menu ──────────────────────────────────────────────────────────
            'Menu.background': panelBg,
            'Menu.foreground': fg,
            'Menu.selectionBackground': selection,
            'Menu.selectionForeground': fg,
            'Menu.borderColor': border,
            'MenuItem.background': panelBg,
            'MenuItem.foreground': fg,
            'MenuItem.selectionBackground': selection,
            'MenuItem.selectionForeground': fg,
            'PopupMenu.background': panelBg,
            'PopupMenu.borderColor': border,

            // ── Text / Input ──────────────────────────────────────────────────
            'TextField.background': editorBg,
            'TextField.foreground': fg,
            'TextField.borderColor': border,
            'TextField.focusedBorderColor': accent,
            'TextArea.background': editorBg,
            'TextArea.foreground': fg,
            'Label.foreground': fg,
            'Label.disabledForeground': lineNumber,

            // ── Tabs ──────────────────────────────────────────────────────────
            'TabbedPane.background': panelBg,
            'TabbedPane.foreground': fg,
            'TabbedPane.selectedForeground': fg,
            'TabbedPane.underlineColor': accent,
            'TabbedPane.contentAreaColor': border,

            // ── Tree / List ───────────────────────────────────────────────────
            'Tree.background': editorBg,
            'Tree.foreground': fg,
            'Tree.selectionBackground': selection,
            'Tree.selectionForeground': fg,
            'Tree.selectionInactiveBackground': `${selection}88`,
            'Tree.rowHeight': '0',
            'List.background': editorBg,
            'List.foreground': fg,
            'List.selectionBackground': selection,
            'List.selectionForeground': fg,

            // ── ScrollBar ─────────────────────────────────────────────────────
            'ScrollBar.background': panelBg,
            'ScrollBar.thumbColor': `${lineNumber}60`,
            'ScrollBar.thumbBorderColor': 'transparent',
            'ScrollBar.hoverThumbColor': `${lineNumber}aa`,
            'ScrollBar.trackColor': 'transparent',

            // ── Toolbar ───────────────────────────────────────────────────────
            'MainToolbar.background': panelBg,
            'ToolBar.background': panelBg,
            'ToolBar.borderColor': border,
            'RunWidget.background': panelBg,

            // ── Status bar ────────────────────────────────────────────────────
            'StatusBar.background': panelBg,
            'StatusBar.hoverBackground': selection,
            'StatusBar.foreground': fg,

            // ── Links ─────────────────────────────────────────────────────────
            'Link.activeForeground': accent,
            'Link.hoverForeground': accent,
            'Link.pressedForeground': accent,
            'Link.visitedForeground': `${accent}cc`,

            // ── Progress bar ──────────────────────────────────────────────────
            'ProgressBar.progressColor': accent,
            'ProgressBar.indeterminateStartColor': accent,
            'ProgressBar.indeterminateEndColor': `${accent}80`,
            'ProgressBar.trackColor': selection,

            // ── Notification / Tooltip ────────────────────────────────────────
            'Notification.background': panelBg,
            'Notification.borderColor': border,
            'ToolTip.background': panelBg,
            'ToolTip.foreground': fg,
            'ToolTip.borderColor': border,

            // ── Badge / Counter ───────────────────────────────────────────────
            'Counter.background': accent,
            'Counter.foreground': '#ffffff',

            // ── Git / VCS ─────────────────────────────────────────────────────
            'VersionControl.FileHistory.Commit.selectedBackground': selection,
        },
        icons: {
            ColorPalette: {
                'Actions.Red': status.error,
                'Actions.Yellow': status.warning,
                'Actions.Green': ansi.green,
                'Actions.Blue': accent,
                'Actions.Grey': lineNumber,
                'Actions.GreyInline': lineNumber,
                'Objects.Red': status.error,
                'Objects.Yellow': status.warning,
                'Objects.Green': ansi.green,
                'Objects.Blue': accent,
                'Objects.Purple': ansi.magenta,
                'Objects.Pink': ansi.brightMagenta,
                'Objects.Teal': ansi.cyan,
                'Objects.Grey': lineNumber,
            },
        },
    };
}
