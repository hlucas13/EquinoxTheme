# JetBrains Marketplace — Equinox Colors

## Plugin structure

A JetBrains plugin is distributed as a **ZIP** containing a single folder.
The required layout for a theme-only plugin is:

```
equinox-colors/
├── META-INF/
│   └── plugin.xml            ← plugin descriptor (this directory)
├── colors/
│   ├── equinox-dark-modern.icls
│   ├── equinox-dark-contrast.icls
│   ├── equinox-light-soft.icls
│   ├── equinox-light-contrast.icls
│   ├── equinox-dark-modern-islands.icls
│   ├── equinox-dark-contrast-islands.icls
│   ├── equinox-light-soft-islands.icls
│   └── equinox-light-contrast-islands.icls
└── themes/
    ├── equinox-dark-modern.theme.json
    ├── equinox-dark-contrast.theme.json
    ├── equinox-light-soft.theme.json
    └── equinox-light-contrast.theme.json
```

## Quick packaging (recommended)

From the project root, run the automated packaging script after building:

```bash
cd ../..
npm run build
npm run package:jetbrains
# Output: dist/marketplace/jetbrains/equinox-colors-<version>.zip
```

## Manual packaging

```bash
# 1. Build theme files
cd ../..
npm run build

# 2. Create plugin directory layout
PLUGIN_DIR=marketplace/jetbrains/equinox-colors
mkdir -p "$PLUGIN_DIR/META-INF"
mkdir -p "$PLUGIN_DIR/colors"
mkdir -p "$PLUGIN_DIR/themes"

# 3. Copy files
cp marketplace/jetbrains/plugin.xml "$PLUGIN_DIR/META-INF/"
cp dist/jetbrains/*.icls             "$PLUGIN_DIR/colors/"
cp dist/jetbrains/themes/*.theme.json "$PLUGIN_DIR/themes/"

# 4. Zip
cd marketplace/jetbrains
zip -r equinox-colors-1.0.0.zip equinox-colors/
```

## Plugin icon

The JetBrains Marketplace requires a **40 × 40 px** icon placed at:

```
META-INF/pluginIcon.svg        (or pluginIcon.png, 40×40)
META-INF/pluginIcon_dark.svg   (optional dark variant)
```

Copy from `images/icons/icon-40.png`:

```bash
cp images/icons/icon-40.png "$PLUGIN_DIR/META-INF/pluginIcon.png"
```

## Publishing

1. Create a JetBrains Marketplace account at <https://plugins.jetbrains.com>.
2. Upload the ZIP from the plugin submission page.
3. Fill in the description (taken from `plugin.xml`), screenshots, and tags.

## Compatibility

- **Minimum IDE version**: 2023.3 (build `233.0`) — required for stable New UI.
- **No maximum** version declared; the plugin is forward-compatible.
