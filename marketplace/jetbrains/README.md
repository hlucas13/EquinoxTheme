# JetBrains Marketplace — Equinox Colors

[![JetBrains Plugins](https://img.shields.io/jetbrains/plugin/v/31990?label=JetBrains%20Marketplace&logo=jetbrains)](https://plugins.jetbrains.com/plugin/31990-equinox-colors/)

**Install directly from your IDE**: go to **Settings → Plugins → Marketplace**, search **"Equinox Colors"** and click **Install**.  
Or use the **Get** button on the [plugin page](https://plugins.jetbrains.com/plugin/31990-equinox-colors/) to install from the browser.

After installing:

1. **Settings → Appearance → Theme** → select the desired Equinox variant — the matching editor color scheme applies automatically.

> To override the editor scheme independently, go to **Settings → Editor → Color Scheme** after selecting the theme.

---

## Plugin structure

A JetBrains plugin is distributed as a **ZIP** containing a single folder.
The required layout (validator-compliant) is a JAR inside `lib/`:

```
equinox-colors.zip
└── equinox-colors/
    └── lib/
        └── equinox-colors.jar   ← contains META-INF/plugin.xml + themes/ + colors/
```

The JAR itself contains:

```
META-INF/
  plugin.xml
  pluginIcon.svg
colors/
  equinox-dark-modern.xml
  equinox-dark-modern-islands.xml
  equinox-dark-contrast.xml
  equinox-dark-contrast-islands.xml
  equinox-light-soft.xml
  equinox-light-soft-islands.xml
  equinox-light-contrast.xml
  equinox-light-contrast-islands.xml
themes/
  equinox-dark-modern.theme.json
  equinox-dark-contrast.theme.json
  equinox-light-soft.theme.json
  equinox-light-contrast.theme.json
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
cp dist/jetbrains/*.xml             "$PLUGIN_DIR/colors/"
cp dist/jetbrains/themes/*.theme.json "$PLUGIN_DIR/themes/"

# 4. Zip
cd marketplace/jetbrains
zip -r equinox-colors-1.0.4.zip equinox-colors/
```

## Plugin icon

The JetBrains Marketplace requires a **40 × 40 px SVG** icon placed inside the JAR at:

```
META-INF/pluginIcon.svg        (light/default)
META-INF/pluginIcon_dark.svg   (optional dark variant)
```

> JetBrains only recognises **SVG** format — PNG icons are silently ignored by the IDE and Marketplace.

The `npm run package:jetbrains` script copies `images/icon.svg` automatically as both `pluginIcon.svg` and `pluginIcon_dark.svg`.

## Publishing

1. Create a JetBrains Marketplace account at <https://plugins.jetbrains.com>.
2. Upload the ZIP from the plugin submission page.
3. Fill in the description (taken from `plugin.xml`), screenshots, and tags.

## Compatibility

- **Minimum IDE version**: 2023.3 (build `233.0`) — required for stable New UI.
- **No maximum** version declared; the plugin is forward-compatible.
