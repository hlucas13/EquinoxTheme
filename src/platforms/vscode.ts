/**
 * Equinox Theme: VS Code Compiler
 * Generates VS Code theme JSON with universal language support
 * Maps syntax tokens to standard semantic scopes
 */

import { PALETTE } from '../colors/palette';
import { EquinoxVariant } from '../themes/variants';

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

type TokenColorEntry = VsCodeTheme['tokenColors'][number];

function buildUiColors(
    variant: EquinoxVariant,
    isDark: boolean,
    isContrast: boolean
): Record<string, string> {
    const p = variant.palette;
    const accentFg = isDark ? p.editor.background : p.editor.foreground;
    const panelBg = isContrast
        ? p.toolbar.background
        : `${p.editor.background}dd`;
    const inactiveTabBg = isContrast
        ? p.toolbar.background
        : `${p.editor.background}cc`;
    const ansi = isDark ? PALETTE.ansi.dark : PALETTE.ansi.light;
    const status = isDark ? PALETTE.status.dark : PALETTE.status.light;
    const shadow = isDark ? PALETTE.shadows.dark : PALETTE.shadows.light;

    return {
        // ── Editor ───────────────────────────────────────────────────────────
        'editor.background': p.editor.background,
        'editor.foreground': p.editor.foreground,
        'editor.lineHighlightBackground': `${p.ui.selection}60`,
        'editor.selectionBackground': p.ui.selection,
        'editor.selectionForeground': p.editor.foreground,
        'editor.inactiveSelectionBackground': `${p.ui.selection}80`,
        'editor.rangeHighlightBackground': `${p.ui.focus}15`,
        'editor.wordHighlightBackground': `${p.ui.focus}25`,
        'editor.wordHighlightStrongBackground': `${p.ui.focus}40`,
        'editor.foldBackground': `${p.ui.selection}40`,
        'editor.findMatchBackground': `${p.ui.focus}35`,
        'editor.findMatchBorder': p.ui.focus,
        'editor.findMatchHighlightBackground': `${p.ui.focus}20`,

        // ── Cursor ───────────────────────────────────────────────────────────
        'editorCursor.foreground': p.ui.cursor,
        'editorCursor.background': p.editor.background,

        // ── Line numbers / gutter ────────────────────────────────────────────
        'editorLineNumber.foreground': p.ui.lineNumber,
        'editorLineNumber.activeForeground': p.editor.foreground,
        'editorGutter.background': p.editor.background,
        'editorGutter.addedBackground': `${ansi.green}cc`,
        'editorGutter.deletedBackground': `${status.error}cc`,
        'editorGutter.modifiedBackground': `${ansi.yellow}cc`,
        'editorGutter.foldingControlForeground': p.ui.lineNumber,

        // ── Bracket matching & indent guides ─────────────────────────────────
        'editorBracketMatch.background': `${p.ui.focus}40`,
        'editorBracketMatch.border': `${p.ui.focus}80`,
        'editorBracketHighlight.foreground1': p.syntax.keyword,
        'editorBracketHighlight.foreground2': p.syntax.function,
        'editorBracketHighlight.foreground3': p.syntax.string,
        'editorIndentGuide.background1': `${p.ui.border}80`,
        'editorIndentGuide.activeBackground1': p.ui.border,

        // ── Overview ruler ────────────────────────────────────────────────────
        'editorOverviewRuler.background': p.editor.background,
        'editorOverviewRuler.border': p.ui.border,
        'editorOverviewRuler.findMatchForeground': `${p.ui.focus}80`,
        'editorOverviewRuler.selectionHighlightForeground': `${p.ui.selection}aa`,
        'editorOverviewRuler.addedForeground': `${ansi.green}cc`,
        'editorOverviewRuler.deletedForeground': `${status.error}cc`,
        'editorOverviewRuler.modifiedForeground': `${ansi.yellow}cc`,
        'editorOverviewRuler.errorForeground': status.error,
        'editorOverviewRuler.warningForeground': status.warning,
        'editorOverviewRuler.infoForeground': status.info,

        // ── Widgets (hover, suggest, editor) ─────────────────────────────────
        'editorWidget.background': panelBg,
        'editorWidget.border': p.ui.border,
        'editorWidget.foreground': p.editor.foreground,
        'editorWidget.resizeBorder': p.ui.focus,
        'editorHoverWidget.background': panelBg,
        'editorHoverWidget.border': p.ui.border,
        'editorHoverWidget.foreground': p.editor.foreground,
        'editorHoverWidget.highlightForeground': p.ui.focus,
        'editorSuggestWidget.background': panelBg,
        'editorSuggestWidget.border': p.ui.border,
        'editorSuggestWidget.foreground': p.editor.foreground,
        'editorSuggestWidget.highlightForeground': p.ui.focus,
        'editorSuggestWidget.focusHighlightForeground': p.ui.focus,
        'editorSuggestWidget.selectedBackground': p.ui.selection,
        'editorSuggestWidget.selectedForeground': p.editor.foreground,
        'editorSuggestWidget.selectedIconForeground': p.ui.focus,

        // ── Lists & trees ─────────────────────────────────────────────────────
        'list.activeSelectionBackground': p.ui.selection,
        'list.activeSelectionForeground': p.editor.foreground,
        'list.activeSelectionIconForeground': p.ui.focus,
        'list.inactiveSelectionBackground': `${p.ui.selection}80`,
        'list.inactiveSelectionForeground': p.editor.foreground,
        'list.hoverBackground': `${p.ui.selection}60`,
        'list.hoverForeground': p.editor.foreground,
        'list.focusBackground': `${p.ui.focus}30`,
        'list.focusForeground': p.editor.foreground,
        'list.focusOutline': p.ui.focus,
        'list.highlightForeground': p.ui.focus,
        'list.matchHighlightBackground': `${p.ui.focus}35`,
        'list.errorForeground': status.error,
        'list.warningForeground': status.warning,
        'listFilterWidget.background': panelBg,
        'listFilterWidget.border': p.ui.border,
        'listFilterWidget.outline': p.ui.focus,
        'listFilterWidget.noMatchesOutline': status.error,
        'tree.indentGuidesStroke': p.ui.border,

        // ── Scrollbar ─────────────────────────────────────────────────────────
        'scrollbar.shadow': shadow,
        'scrollbarSlider.background': `${p.ui.lineNumber}40`,
        'scrollbarSlider.hoverBackground': `${p.ui.lineNumber}60`,
        'scrollbarSlider.activeBackground': `${p.ui.lineNumber}80`,

        // ── Activity bar ──────────────────────────────────────────────────────
        'activityBar.background': p.toolbar.background,
        'activityBar.foreground': p.toolbar.foreground,
        'activityBar.border': p.ui.border,
        'activityBar.inactiveForeground': `${p.toolbar.foreground}66`,
        'activityBarBadge.background': p.ui.focus,
        'activityBarBadge.foreground': accentFg,

        // ── Side bar ──────────────────────────────────────────────────────────
        'sideBar.background': p.sidebar.background,
        'sideBar.foreground': p.sidebar.foreground,
        'sideBar.border': p.ui.border,
        'sideBarTitle.foreground': p.sidebar.foreground,
        'sideBarSectionHeader.background': `${p.ui.selection}60`,
        'sideBarSectionHeader.foreground': p.sidebar.foreground,
        'sideBarSectionHeader.border': p.ui.border,

        // ── Tabs ──────────────────────────────────────────────────────────────
        'tab.activeBackground': p.editor.background,
        'tab.activeForeground': p.editor.foreground,
        'tab.inactiveBackground': inactiveTabBg,
        'tab.inactiveForeground': `${p.ui.lineNumber}99`,
        'tab.border': p.ui.border,
        'tab.hoverBackground': `${p.ui.selection}60`,
        'tab.unfocusedActiveBackground': `${p.editor.background}dd`,
        'tab.activeModifiedBorder': status.info,
        'tab.inactiveModifiedBorder': `${status.info}80`,
        'tab.unfocusedActiveModifiedBorder': `${status.info}60`,

        // ── Editor group & header ──────────────────────────────────────────────
        'editorGroup.border': p.ui.border,
        'editorGroup.dropBackground': `${p.ui.focus}20`,
        'editorGroupHeader.tabsBackground': p.toolbar.background,
        'editorGroupHeader.noTabsBackground': p.toolbar.background,

        // ── Title bar ─────────────────────────────────────────────────────────
        'titleBar.activeBackground': p.toolbar.background,
        'titleBar.activeForeground': p.toolbar.foreground,
        'titleBar.inactiveBackground': `${p.toolbar.background}dd`,
        'titleBar.inactiveForeground': `${p.toolbar.foreground}99`,
        'titleBar.border': p.ui.border,

        // ── Status bar ────────────────────────────────────────────────────────
        'statusBar.background': p.toolbar.background,
        'statusBar.foreground': p.toolbar.foreground,
        'statusBar.border': p.ui.border,
        'statusBar.debuggingBackground': status.warning,
        'statusBar.debuggingForeground': p.editor.background,
        'statusBar.noFolderBackground': p.toolbar.background,
        'statusBar.noFolderForeground': p.toolbar.foreground,
        'statusBarItem.activeBackground': `${p.ui.focus}50`,
        'statusBarItem.hoverBackground': `${p.ui.focus}30`,
        'statusBarItem.errorBackground': status.error,
        'statusBarItem.errorForeground': p.editor.foreground,
        'statusBarItem.warningBackground': status.warning,
        'statusBarItem.warningForeground': p.editor.background,
        'statusBarItem.remoteBackground': p.ui.focus,
        'statusBarItem.remoteForeground': accentFg,

        // ── Panel (terminal, output, problems) ────────────────────────────────
        'panel.background': p.toolbar.background,
        'panel.border': p.ui.border,
        'panel.dropBorder': p.ui.focus,
        'panelTitle.activeBorder': p.ui.focus,
        'panelTitle.activeForeground': p.editor.foreground,
        'panelTitle.inactiveForeground': p.ui.lineNumber,
        'panelInput.border': p.ui.border,

        // ── Breadcrumbs ───────────────────────────────────────────────────────
        'breadcrumb.background': p.editor.background,
        'breadcrumb.foreground': p.ui.lineNumber,
        'breadcrumb.focusForeground': p.editor.foreground,
        'breadcrumb.activeSelectionForeground': p.editor.foreground,
        'breadcrumbPicker.background': panelBg,

        // ── Inputs ────────────────────────────────────────────────────────────
        'input.background': panelBg,
        'input.foreground': p.editor.foreground,
        'input.border': p.ui.border,
        'input.placeholderForeground': p.ui.lineNumber,
        'inputValidation.errorBackground': `${status.error}20`,
        'inputValidation.errorBorder': status.error,
        'inputValidation.errorForeground': p.editor.foreground,
        'inputValidation.infoBackground': `${status.info}20`,
        'inputValidation.infoBorder': status.info,
        'inputValidation.infoForeground': p.editor.foreground,
        'inputValidation.warningBackground': `${status.warning}20`,
        'inputValidation.warningBorder': status.warning,
        'inputValidation.warningForeground': p.editor.foreground,
        'dropdown.background': panelBg,
        'dropdown.border': p.ui.border,
        'dropdown.foreground': p.editor.foreground,

        // ── Buttons & badges ──────────────────────────────────────────────────
        'button.background': p.ui.focus,
        'button.foreground': accentFg,
        'button.hoverBackground': `${p.ui.focus}dd`,
        'button.secondaryBackground': `${p.ui.focus}30`,
        'button.secondaryForeground': p.editor.foreground,
        'button.secondaryHoverBackground': `${p.ui.focus}50`,
        'badge.background': p.ui.focus,
        'badge.foreground': accentFg,
        'progressBar.background': p.ui.focus,

        // ── Menu ─────────────────────────────────────────────────────────────
        'menu.background': panelBg,
        'menu.foreground': p.editor.foreground,
        'menu.selectionBackground': p.ui.selection,
        'menu.selectionForeground': p.editor.foreground,
        'menu.selectionBorder': `${p.ui.focus}50`,
        'menu.separatorBackground': p.ui.border,
        'menu.border': p.ui.border,
        'menubar.selectionBackground': p.ui.selection,
        'menubar.selectionForeground': p.editor.foreground,
        'menubar.selectionBorder': `${p.ui.focus}50`,

        // ── Notifications ─────────────────────────────────────────────────────
        'notifications.background': panelBg,
        'notifications.foreground': p.editor.foreground,
        'notifications.border': p.ui.border,
        'notificationCenterHeader.background': p.toolbar.background,
        'notificationCenterHeader.foreground': p.toolbar.foreground,
        'notificationLink.foreground': p.ui.focus,
        'notificationsInfoIcon.foreground': status.info,
        'notificationsWarningIcon.foreground': status.warning,
        'notificationsErrorIcon.foreground': status.error,

        // ── Quick input (command palette) ─────────────────────────────────────
        'quickInput.background': panelBg,
        'quickInput.foreground': p.editor.foreground,
        'quickInputList.focusBackground': p.ui.selection,
        'quickInputList.focusForeground': p.editor.foreground,
        'quickInputList.focusIconForeground': p.ui.focus,
        'quickInputTitle.background': p.toolbar.background,

        // ── Keybinding labels ─────────────────────────────────────────────────
        'keybindingLabel.background': `${p.ui.selection}80`,
        'keybindingLabel.foreground': p.editor.foreground,
        'keybindingLabel.border': p.ui.border,
        'keybindingLabel.bottomBorder': p.ui.border,

        // ── Extension buttons ─────────────────────────────────────────────────
        'extensionButton.prominentBackground': p.ui.focus,
        'extensionButton.prominentForeground': accentFg,
        'extensionButton.prominentHoverBackground': `${p.ui.focus}dd`,

        // ── Symbol icons ──────────────────────────────────────────────────────
        'symbolIcon.classForeground': p.syntax.function,
        'symbolIcon.interfaceForeground': p.syntax.function,
        'symbolIcon.enumForeground': p.syntax.function,
        'symbolIcon.functionForeground': p.syntax.function,
        'symbolIcon.methodForeground': p.syntax.function,
        'symbolIcon.variableForeground': p.syntax.variable,
        'symbolIcon.fieldForeground': p.syntax.variable,
        'symbolIcon.propertyForeground': p.syntax.variable,
        'symbolIcon.keywordForeground': p.syntax.keyword,
        'symbolIcon.constantForeground': p.syntax.number,
        'symbolIcon.enumMemberForeground': p.syntax.number,
        'symbolIcon.numberForeground': p.syntax.number,
        'symbolIcon.stringForeground': p.syntax.string,
        'symbolIcon.booleanForeground': p.syntax.keyword,
        'symbolIcon.nullForeground': p.syntax.keyword,

        // ── Global focus & window borders ─────────────────────────────────────
        focusBorder: p.ui.focus,
        'window.activeBorder': p.ui.focus,
        'window.inactiveBorder': `${p.ui.focus}66`,
        'widget.shadow': shadow,

        // ── Diff editor ───────────────────────────────────────────────────────
        'diffEditor.insertedTextBackground': `${ansi.green}40`,
        'diffEditor.removedTextBackground': `${status.error}40`,
        'diffEditor.insertedLineBackground': `${ansi.green}20`,
        'diffEditor.removedLineBackground': `${status.error}20`,
        'diffEditor.diagonalFill': `${p.ui.lineNumber}40`,
        'diffEditorGutter.insertedLineBackground': `${ansi.green}30`,
        'diffEditorGutter.removedLineBackground': `${status.error}30`,

        // ── Git decorations ───────────────────────────────────────────────────
        'gitDecoration.addedResourceForeground': ansi.green,
        'gitDecoration.deletedResourceForeground': status.error,
        'gitDecoration.modifiedResourceForeground': ansi.yellow,
        'gitDecoration.renamedResourceForeground': ansi.blue,
        'gitDecoration.untrackedResourceForeground': ansi.green,
        'gitDecoration.ignoredResourceForeground': p.ui.lineNumber,
        'gitDecoration.conflictingResourceForeground': status.warning,
        'gitDecoration.submoduleResourceForeground': ansi.blue,

        // ── Peek view ─────────────────────────────────────────────────────────
        'peekView.border': p.ui.focus,
        'peekViewEditor.background': panelBg,
        'peekViewEditor.matchHighlightBackground': `${p.ui.focus}35`,
        'peekViewEditor.matchHighlightBorder': `${p.ui.focus}70`,
        'peekViewEditorGutter.background': panelBg,
        'peekViewResult.background': p.toolbar.background,
        'peekViewResult.fileForeground': p.editor.foreground,
        'peekViewResult.lineForeground': p.ui.lineNumber,
        'peekViewResult.matchHighlightBackground': `${p.ui.focus}25`,
        'peekViewResult.selectionBackground': p.ui.selection,
        'peekViewResult.selectionForeground': p.editor.foreground,
        'peekViewTitle.background': p.toolbar.background,
        'peekViewTitleDescription.foreground': p.ui.lineNumber,
        'peekViewTitleLabel.foreground': p.editor.foreground,

        // ── Terminal ──────────────────────────────────────────────────────────
        'terminal.background': p.editor.background,
        'terminal.foreground': p.editor.foreground,
        'terminal.selectionBackground': p.ui.selection,
        'terminal.inactiveSelectionBackground': `${p.ui.selection}80`,
        'terminal.cursorBackground': p.editor.background,
        'terminal.cursorForeground': p.ui.cursor,
        'terminalCursor.background': p.editor.background,
        'terminalCursor.foreground': p.ui.cursor,
        'terminal.ansiBlack': ansi.black,
        'terminal.ansiRed': ansi.red,
        'terminal.ansiGreen': ansi.green,
        'terminal.ansiYellow': ansi.yellow,
        'terminal.ansiBlue': ansi.blue,
        'terminal.ansiMagenta': ansi.magenta,
        'terminal.ansiCyan': ansi.cyan,
        'terminal.ansiWhite': ansi.white,
        'terminal.ansiBrightBlack': ansi.brightBlack,
        'terminal.ansiBrightRed': ansi.brightRed,
        'terminal.ansiBrightGreen': ansi.brightGreen,
        'terminal.ansiBrightYellow': ansi.brightYellow,
        'terminal.ansiBrightBlue': ansi.brightBlue,
        'terminal.ansiBrightMagenta': ansi.brightMagenta,
        'terminal.ansiBrightCyan': ansi.brightCyan,
        'terminal.ansiBrightWhite': ansi.brightWhite,
    };
}

function buildTokenColors(
    variant: EquinoxVariant,
    isDark: boolean
): TokenColorEntry[] {
    const s = variant.palette.syntax;
    const status = isDark ? PALETTE.status.dark : PALETTE.status.light;
    const invalidBg = `${status.error}40`;
    const invalidFg = status.error;

    return [
        {
            name: 'Comment',
            scope: ['comment'],
            settings: { foreground: s.comment, fontStyle: 'italic' },
        },
        {
            name: 'Comment Documentation',
            scope: ['comment.block.documentation'],
            settings: { foreground: s.comment, fontStyle: 'italic' },
        },
        {
            name: 'String',
            scope: [
                'string',
                'string.quoted',
                'string.quoted.single',
                'string.quoted.double',
            ],
            settings: { foreground: s.string },
        },
        {
            name: 'String Escape',
            scope: [
                'constant.character.escape',
                'string constant.other.placeholder',
            ],
            settings: { foreground: s.number },
        },
        {
            name: 'Number',
            scope: ['constant.numeric'],
            settings: { foreground: s.number },
        },
        {
            name: 'Built-in Constants',
            scope: ['constant.language'],
            settings: { foreground: s.number },
        },
        {
            name: 'Keyword',
            scope: ['keyword', 'keyword.control'],
            settings: { foreground: s.keyword },
        },
        {
            name: 'Keyword Storage',
            scope: [
                'storage',
                'storage.modifier',
                'storage.type',
                'keyword.declaration',
            ],
            settings: { foreground: s.keyword },
        },
        {
            name: 'Keyword Operator',
            scope: ['keyword.operator'],
            settings: { foreground: s.keyword },
        },
        {
            name: 'Function Definition',
            scope: ['entity.name.function'],
            settings: { foreground: s.function },
        },
        {
            name: 'Function Call',
            scope: [
                'meta.function-call entity.name.function',
                'meta.method-call entity.name.function',
            ],
            settings: { foreground: s.function },
        },
        {
            name: 'Function Parameters',
            scope: ['variable.parameter'],
            settings: { foreground: s.variable },
        },
        {
            name: 'Variable',
            scope: ['variable'],
            settings: { foreground: s.variable },
        },
        {
            name: 'Variable This',
            scope: ['variable.language.this', 'variable.other.this'],
            settings: { foreground: s.keyword, fontStyle: 'italic' },
        },
        {
            name: 'Variable Self',
            scope: ['variable.language'],
            settings: { foreground: s.keyword },
        },
        {
            name: 'Tag',
            scope: ['entity.name.tag'],
            settings: { foreground: s.keyword },
        },
        {
            name: 'Tag Attribute',
            scope: ['entity.other.attribute-name'],
            settings: { foreground: s.variable },
        },
        {
            name: 'Class Name',
            scope: ['entity.name.class'],
            settings: { foreground: s.function },
        },
        {
            name: 'Type Name',
            scope: ['entity.name.type'],
            settings: { foreground: s.function },
        },
        {
            name: 'Type Parameter',
            scope: ['meta.type.parameters entity.name.type'],
            settings: { foreground: s.function },
        },
        {
            name: 'Punctuation',
            scope: ['punctuation'],
            settings: { foreground: variant.palette.ui.lineNumber },
        },
        {
            name: 'Invalid',
            scope: ['invalid'],
            settings: { background: invalidBg, foreground: invalidFg },
        },
        {
            name: 'Markdown Bold',
            scope: ['markup.bold'],
            settings: { fontStyle: 'bold', foreground: s.keyword },
        },
        {
            name: 'Markdown Italic',
            scope: ['markup.italic'],
            settings: { fontStyle: 'italic', foreground: s.keyword },
        },
        {
            name: 'Markdown Link',
            scope: ['markup.underline.link'],
            settings: { foreground: s.function },
        },
        {
            name: 'Markdown Heading',
            scope: ['markup.heading'],
            settings: { foreground: s.keyword, fontStyle: 'bold' },
        },
        {
            name: 'Python Decorator',
            scope: ['meta.function.decorator'],
            settings: { foreground: s.keyword },
        },
        {
            name: 'Java Annotation',
            scope: ['meta.declaration.annotation'],
            settings: { foreground: s.keyword },
        },
        {
            name: 'CSS Property Name',
            scope: ['support.type.property-name'],
            settings: { foreground: s.variable },
        },
        {
            name: 'CSS Property Value',
            scope: ['support.constant.property-value'],
            settings: { foreground: s.string },
        },
        {
            name: 'YAML Key',
            scope: ['entity.name.tag.yaml'],
            settings: { foreground: s.variable },
        },
    ];
}

export function generateVsCodeTheme(variant: EquinoxVariant): VsCodeTheme {
    const isDark = variant.name.includes('Dark');
    const isContrast = variant.name.includes('Contrast');

    return {
        name: variant.name,
        type: isDark ? 'dark' : 'light',
        colors: buildUiColors(variant, isDark, isContrast),
        tokenColors: buildTokenColors(variant, isDark),
    };
}

export function vscodeThemeToJson(theme: VsCodeTheme): string {
    return JSON.stringify(theme, null, 2);
}
