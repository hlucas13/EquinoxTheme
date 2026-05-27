#!/usr/bin/env python3
"""
Equinox Colors — macOS Terminal Profile Generator

Generates .terminal plist files with NSKeyedArchiver-encoded NSColor objects,
which is the format required by Terminal.app on macOS 10.14+.

Usage:
  python3 scripts/generate-terminal.py <profiles-json> <output-dir>

  profiles-json: path to a JSON file with an array of profile objects
  output-dir:    directory where .terminal files will be written

Profile JSON schema:
  {
    "filename": "equinox-dark-modern",
    "name": "Equinox Dark Modern",
    "background": "#1a1f2e",
    "foreground": "#e8eef8",
    "cursor":     "#a8c4e0",
    "ansi": {
      "black":         "#0f1419",
      "red":           "#e85a5f",
      "green":         "#7aa655",
      "yellow":        "#d9a963",
      "blue":          "#7da6ce",
      "magenta":       "#9d84b7",
      "cyan":          "#6fb8c0",
      "white":         "#d4d8e0",
      "brightBlack":   "#6b7793",
      "brightRed":     "#e89ca0",
      "brightGreen":   "#99c977",
      "brightYellow":  "#e5bf99",
      "brightBlue":    "#9dbbe0",
      "brightMagenta": "#c4a3d9",
      "brightCyan":    "#94d6df",
      "brightWhite":   "#e8eef8"
    }
  }
"""

import sys
import json
import os
import plistlib

try:
    from AppKit import NSColor
    from Foundation import NSKeyedArchiver
    PYOBJC_AVAILABLE = True
except ImportError:
    PYOBJC_AVAILABLE = False


def hex_to_components(hex_str: str) -> tuple[float, float, float]:
    h = hex_str.lstrip('#')
    return (
        int(h[0:2], 16) / 255.0,
        int(h[2:4], 16) / 255.0,
        int(h[4:6], 16) / 255.0,
    )


def archive_color(hex_str: str) -> bytes:
    """Serialize a hex color as NSKeyedArchiver binary data (what Terminal.app expects)."""
    r, g, b = hex_to_components(hex_str)
    color = NSColor.colorWithSRGBRed_green_blue_alpha_(r, g, b, 1.0)
    data = NSKeyedArchiver.archivedDataWithRootObject_(color)
    return bytes(data)


def generate_terminal_plist(profile: dict) -> bytes:
    ansi = profile['ansi']

    plist_dict = {
        'name': profile['name'],

        # ANSI colors
        'ANSIBlackColor':         archive_color(ansi['black']),
        'ANSIRedColor':           archive_color(ansi['red']),
        'ANSIGreenColor':         archive_color(ansi['green']),
        'ANSIYellowColor':        archive_color(ansi['yellow']),
        'ANSIBlueColor':          archive_color(ansi['blue']),
        'ANSIMagentaColor':       archive_color(ansi['magenta']),
        'ANSICyanColor':          archive_color(ansi['cyan']),
        'ANSIWhiteColor':         archive_color(ansi['white']),

        # Bright ANSI colors
        'ANSIBrightBlackColor':   archive_color(ansi['brightBlack']),
        'ANSIBrightRedColor':     archive_color(ansi['brightRed']),
        'ANSIBrightGreenColor':   archive_color(ansi['brightGreen']),
        'ANSIBrightYellowColor':  archive_color(ansi['brightYellow']),
        'ANSIBrightBlueColor':    archive_color(ansi['brightBlue']),
        'ANSIBrightMagentaColor': archive_color(ansi['brightMagenta']),
        'ANSIBrightCyanColor':    archive_color(ansi['brightCyan']),
        'ANSIBrightWhiteColor':   archive_color(ansi['brightWhite']),

        # UI colors
        'TextColor':              archive_color(profile['foreground']),
        'BackgroundColor':        archive_color(profile['background']),
        'CursorColor':            archive_color(profile['cursor']),
        'SelectionColor':         archive_color(ansi['brightBlack']),

        # Background: fully opaque, no blur
        'BackgroundAlphaComponent': 1.0,
        'BackgroundBlur':           0.0,

        # Font settings (San Francisco Mono 13pt — system default)
        'FontAntialias':    True,
        'FontWidthSpacing': 1.0,
        'FontHeightSpacing': 1.0,

        # Cursor style: block
        'CursorType': 0,
        'CursorBlink': False,

        # Other preferences
        'UseStandardColors': True,
        'UseBoldFonts':      True,
        'UseBrightBold':     False,
        'columnCount':       220,
        'rowCount':          50,
    }

    return plistlib.dumps(plist_dict, fmt=plistlib.FMT_XML)


def main():
    if len(sys.argv) != 3:
        print(f'Usage: {sys.argv[0]} <profiles.json> <output-dir>', file=sys.stderr)
        sys.exit(1)

    profiles_path = sys.argv[1]
    output_dir = sys.argv[2]

    if not PYOBJC_AVAILABLE:
        print('Error: PyObjC not available. Run: pip3 install pyobjc --break-system-packages', file=sys.stderr)
        sys.exit(1)

    with open(profiles_path, 'r') as f:
        profiles = json.load(f)

    os.makedirs(output_dir, exist_ok=True)

    for profile in profiles:
        plist_bytes = generate_terminal_plist(profile)
        out_path = os.path.join(output_dir, f"{profile['filename']}.terminal")
        with open(out_path, 'wb') as f:
            f.write(plist_bytes)
        print(f"  ✓ {profile['name']}")


if __name__ == '__main__':
    main()
