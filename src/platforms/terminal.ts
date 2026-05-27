/**
 * Equinox Colors: macOS Terminal Compiler
 * Generates macOS Terminal .terminal XML property list format
 * Creates fully compatible Terminal.app profiles with ANSI color palette
 */

import { AnsiPalette, EquinoxVariant } from '../themes/variants';

export interface TerminalProfile {
    name: string;
    ansiPalette: AnsiPalette;
    cursorColor: string;
    foregroundColor: string;
    backgroundColor: string;
}

export function generateTerminalProfile(
    variant: EquinoxVariant,
    ansiPalette: AnsiPalette
): TerminalProfile {
    return {
        name: variant.name,
        ansiPalette,
        cursorColor: variant.palette.ui.cursor,
        foregroundColor: variant.palette.editor.foreground,
        backgroundColor: variant.palette.editor.background,
    };
}

// Convert hex color to Terminal.app RGB format (scaled 0-1)
function hexToTerminalRgb(hex: string): {
    red: number;
    green: number;
    blue: number;
} {
    const r = Number.parseInt(hex.slice(1, 3), 16);
    const g = Number.parseInt(hex.slice(3, 5), 16);
    const b = Number.parseInt(hex.slice(5, 7), 16);
    return {
        red: r / 255,
        green: g / 255,
        blue: b / 255,
    };
}

export function terminalProfileToXml(profile: TerminalProfile): string {
    const {
        red: cursorR,
        green: cursorG,
        blue: cursorB,
    } = hexToTerminalRgb(profile.cursorColor);
    const {
        red: fgR,
        green: fgG,
        blue: fgB,
    } = hexToTerminalRgb(profile.foregroundColor);
    const {
        red: bgR,
        green: bgG,
        blue: bgB,
    } = hexToTerminalRgb(profile.backgroundColor);

    let plist = '<?xml version="1.0" encoding="UTF-8"?>\n';
    plist +=
        '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n';
    plist += '<plist version="1.0">\n';
    plist += '<dict>\n';
    plist += `  <key>name</key>\n`;
    plist += `  <string>${escapeXml(profile.name)}</string>\n`;

    plist += `  <key>ANSIBlackColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.black));

    plist += `  <key>ANSIRedColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.red));

    plist += `  <key>ANSIGreenColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.green));

    plist += `  <key>ANSIYellowColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.yellow));

    plist += `  <key>ANSIBlueColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.blue));

    plist += `  <key>ANSIMagentaColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.magenta));

    plist += `  <key>ANSICyanColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.cyan));

    plist += `  <key>ANSIWhiteColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.white));

    plist += `  <key>ANSIBrightBlackColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.brightBlack));

    plist += `  <key>ANSIBrightRedColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.brightRed));

    plist += `  <key>ANSIBrightGreenColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.brightGreen));

    plist += `  <key>ANSIBrightYellowColor</key>\n`;
    plist += createColorDict(
        hexToTerminalRgb(profile.ansiPalette.brightYellow)
    );

    plist += `  <key>ANSIBrightBlueColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.brightBlue));

    plist += `  <key>ANSIBrightMagentaColor</key>\n`;
    plist += createColorDict(
        hexToTerminalRgb(profile.ansiPalette.brightMagenta)
    );

    plist += `  <key>ANSIBrightCyanColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.brightCyan));

    plist += `  <key>ANSIBrightWhiteColor</key>\n`;
    plist += createColorDict(hexToTerminalRgb(profile.ansiPalette.brightWhite));

    plist += `  <key>CursorColor</key>\n`;
    plist += createColorDict({ red: cursorR, green: cursorG, blue: cursorB });

    plist += `  <key>TextColor</key>\n`;
    plist += createColorDict({ red: fgR, green: fgG, blue: fgB });

    plist += `  <key>BackgroundColor</key>\n`;
    plist += createColorDict({ red: bgR, green: bgG, blue: bgB });

    // Background transparency: 95% transparent (5% opaque)
    plist += `  <key>BackgroundAlphaComponent</key>\n`;
    plist += `  <real>0.05</real>\n`;

    // Background blur: 50%
    plist += `  <key>BackgroundBlur</key>\n`;
    plist += `  <real>0.5</real>\n`;

    plist += `  <key>UseStandardColors</key>\n`;
    plist += `  <true/>\n`;

    plist += `  <key>FontWidthSpacing</key>\n`;
    plist += `  <real>0.9</real>\n`;

    plist += `  <key>FontHeightSpacing</key>\n`;
    plist += `  <real>1.0</real>\n`;

    plist += `  <key>Font</key>\n`;
    plist += `  <data>\n`;
    plist += `    YnBsaXN0MDBOX0tOU0ZvbnQBAACACAoVFhcYGRobHCGEhYaHiIqLjY6PkJGSlJWWl5iZ\n`;
    plist += `    mpudoKGip6ipqqqrrK2urq+wsLGxsrKzs7Oztba1tbW2tra2trm5ubm6urq6u7u7u7y8\n`;
    plist += `    vLy8vby9vb2/v7+/wMDAwcDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAw\n`;
    plist += `    MDAAAA\n`;
    plist += `  </data>\n`;

    plist += '</dict>\n';
    plist += '</plist>\n';

    return plist;
}

function createColorDict(rgb: {
    red: number;
    green: number;
    blue: number;
}): string {
    let result = '<dict>\n';
    result += `    <key>Red Component</key>\n`;
    result += `    <real>${rgb.red.toFixed(16)}</real>\n`;
    result += `    <key>Green Component</key>\n`;
    result += `    <real>${rgb.green.toFixed(16)}</real>\n`;
    result += `    <key>Blue Component</key>\n`;
    result += `    <real>${rgb.blue.toFixed(16)}</real>\n`;
    result += '  </dict>\n';
    return result;
}

function escapeXml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
