# Equinox Colors

A multi-platform ergonomic theme system for VS Code, JetBrains IDEs, and macOS Terminal. One TypeScript source of truth compiles 4 variants across all 3 platforms simultaneously. Every color combination meets WCAG AAA (7:1) contrast.

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code%20Marketplace-equinox--colors-0078d7?logo=visualstudiocode)](https://marketplace.visualstudio.com/items?itemName=equinox-team.equinox-colors)
[![JetBrains Plugins](https://img.shields.io/jetbrains/plugin/v/31990?label=JetBrains%20Marketplace&logo=jetbrains)](https://plugins.jetbrains.com/plugin/31990-equinox-colors/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Install from Marketplace

### VS Code

**One-click install** — opens directly in VS Code:

[![Install in VS Code](https://img.shields.io/badge/Install%20in-VS%20Code-0078d7?logo=visualstudiocode)](vscode:extension/equinox-team.equinox-colors)

Or search **"Equinox Colors"** in the Extensions panel (`Ctrl+Shift+X` / `⌘⇧X`), or run:

```
ext install equinox-team.equinox-colors
```

### JetBrains IDEs

[![Install in JetBrains](https://img.shields.io/badge/Install%20in-JetBrains%20IDEs-000000?logo=jetbrains)](https://plugins.jetbrains.com/plugin/31990-equinox-colors/)

Go to **Settings → Plugins → Marketplace**, search **"Equinox Colors"** and click **Install**.  
Or install directly from the browser via the **Get** button on the [plugin page](https://plugins.jetbrains.com/plugin/31990-equinox-colors/).

After installing: **Settings → Appearance → Theme** → select the desired Equinox variant.

## Features

- **4 variants**: Dark Modern, Dark Contrast, Light Soft, Light Contrast
- **3 platforms**: VS Code (JSON), JetBrains (ICLS + theme.json), macOS Terminal (plist)
- **JetBrains Islands / New UI**: each variant ships an Islands color scheme (`.icls`) and a full UI theme (`.theme.json`) for the floating-panel New UI layout
- **Accent color** propagated to `window.activeBorder`/`window.inactiveBorder` (VS Code) and hyperlinks/identifier highlights (JetBrains)
- **WCAG AAA**: 7:1 minimum contrast for all text/background combinations
- **Single source of truth**: `src/colors/palette.ts` drives every output file
- **Interactive playground**: Liquid Glass UI with live theme preview including Islands layout
- **Marketplace ready**: pre-built `marketplace/vscode/` and `marketplace/jetbrains/` directories with all submission metadata

## Variants

| Variant            | Style   | Background                          | Best for                                     |
| ------------------ | ------- | ----------------------------------- | -------------------------------------------- |
| **Dark Modern**    | Unified | `#1a1f2e` — slate-blue              | Extended sessions, minimal context switching |
| **Dark Contrast**  | Split   | `#0f1419` editor / `#13141c` panels | Complex navigation, clear UI/editor boundary |
| **Light Soft**     | Unified | `#f5f3f0` — cream-white             | Bright rooms, long reading sessions          |
| **Light Contrast** | Split   | `#faf9f7` editor / `#ede9e3` panels | Maximum architectural depth in light mode    |

## Quick Start

```bash
git clone https://github.com/hlucas13/EquinoxTheme.git
cd EquinoxTheme
npm install
npm run build
```

**Requirements**: Node.js ≥ 18, npm ≥ 9.

> **macOS Terminal profiles** also require Python 3 + PyObjC:
>
> ```bash
> pip3 install pyobjc --break-system-packages
> ```
>
> On Linux/Windows the terminal build step is skipped automatically; all other platforms build normally.

Build output:

```
dist/
├── vscode/           # 4 × .json theme files
├── jetbrains/
│   ├── *.icls        # 4 × classic color schemes
│   ├── *-islands.icls # 4 × Islands color schemes (New UI)
│   └── themes/       # 4 × .theme.json UI themes
├── terminal/         # 4 × .terminal plist profiles
└── manifest.json
```

## Interactive Playground

```bash
npm run playground   # starts Vite dev server at http://localhost:5173
```

The playground renders live simulations of VS Code, JetBrains (classic), JetBrains Islands (New UI), and macOS Terminal for each variant. The dock, menus, and modal use **physics-based Liquid Glass** — a displacement map generated from Snell's law that refracts the background through a convex glass bezel before applying backdrop blur.

**Playground preferences** are persisted in `localStorage`: dark mode defaults to your OS/browser preference on first visit, frosted glass defaults to off. Both settings are saved automatically after your first change.

**Dock controls**:

- **Variant** — switch between all 4 theme variants
- **Platform** — switch between VS Code, JetBrains IDE, JetBrains Islands, Terminal previews
- **Settings** — toggle dark mode and frosted glass style; access Help & Wiki

The **JetBrains Islands** preview simulates the New UI floating-panel layout: each tool window renders as a separate rounded island over a darker desktop background, matching the visual result of installing both the `.icls` color scheme and the `.theme.json` UI theme.

### Liquid Glass

The UI chrome (dock, menus, modals, and toggles) is built around a physics-based Liquid Glass system, documented in the module `playground/glass-distortion.ts`.

The implementation follows the refraction principles described in **[Liquid Glass — CSS & SVG](https://kube.io/blog/liquid-glass-css-svg/)** by Kube:

- **Snell's law refraction** — each pixel of the glass surface displaces the background according to the angle of refraction derived from the surface normal, using an index of refraction of **1.45** (borosilicate glass).
- **Convex height profile** — the surface height function `h(t) = √t` models a curved glass lens that is thicker at the centre and tapers toward the rim.
- **SVG displacement maps** — a `<feImage>` + `<feDisplacementMap>` filter pipeline applies the computed per-pixel displacement at runtime, replacing the old turbulence-noise approach with deterministic, physics-consistent distortion.
- **Two filter instances** — `#glass-distortion-dock` (resized dynamically via `ResizeObserver`, `userSpaceOnUse`) and `#glass-distortion-panel` (`objectBoundingBox`, scales to any modal or menu).
- **Progressive enhancement** — a `@supports (backdrop-filter: url(#x))` check unlocks the `backdrop-filter` compositing path on Chromium; all other browsers fall back to the base blur and tint layers.
- **Convex specular hierarchy** — glass surfaces carry a three-layer inset `box-shadow` stack: primary top-left arc highlight → full perimeter rim → counter-specular depth shadow, matching the light model expected from a convex glass element.

## Platform Installation

### VS Code (manual)

```bash
cp dist/vscode/*.json ~/Library/Application\ Support/Code/User/themes/
# Linux: ~/.config/Code/User/themes/
```

Open VS Code → `Preferences: Color Theme` → search "Equinox".

### JetBrains IDEs

**Classic UI** (copy `.icls` color schemes):

```bash
cp dist/jetbrains/*.icls ~/Library/Application\ Support/JetBrains/*/colors/
# Linux: ~/.config/JetBrains/*/colors/
# Windows: %APPDATA%\JetBrains\<IDE>\colors\
```

Go to **Settings → Editor → Color Scheme** and select the desired Equinox variant.

**New UI / Islands** (copy both `.icls` and `.theme.json`):

```bash
# Color schemes (editor)
cp dist/jetbrains/*-islands.icls ~/Library/Application\ Support/JetBrains/*/colors/

# UI theme (New UI panels, Islands layout, Desktop background)
cp dist/jetbrains/themes/*.theme.json ~/Library/Application\ Support/JetBrains/*/themes/
```

Enable **New UI** in **Settings → Appearance** and select the Equinox theme in **Settings → Appearance → Theme**. The Islands panel layout activates automatically when the New UI is enabled.

### macOS Terminal

Double-click any `.terminal` file in `dist/terminal/` to import it, then set as default in **Terminal → Preferences → Profiles**.

## Development

### Project Structure

```
equinox-colors/
├── src/
│   ├── colors/
│   │   └── palette.ts          # Single source of truth — all hex values
│   ├── themes/
│   │   └── variants.ts         # 4 typed EquinoxVariant objects
│   ├── platforms/
│   │   ├── vscode.ts           # VS Code JSON theme generator
│   │   ├── jetbrains.ts        # JetBrains ICLS + Islands + .theme.json generators
│   │   └── terminal.ts         # macOS Terminal profile data generator
│   └── build.ts                # Build orchestrator → dist/
├── playground/
│   ├── index.html              # Liquid Glass UI shell
│   ├── main.ts                 # Dock controls + platform renderers (incl. Islands)
│   ├── glass-distortion.ts     # Snell's-law displacement map generator
│   └── styles.css              # Glass tokens, dock, liquid toggle, modal, Islands layout
├── scripts/
│   ├── generate-icons.js       # SVG → PNG at 11 marketplace sizes (uses sharp)
│   ├── generate-terminal.py    # Python plist generator (NSKeyedArchiver NSColor data)
│   └── package-marketplace.js  # Assembles .vsix and .zip for VS Code / JetBrains
├── marketplace/
│   ├── vscode/                 # VS Code extension metadata (package.json, .vscodeignore)
│   └── jetbrains/              # JetBrains plugin metadata (plugin.xml)
├── images/
│   ├── icon.svg                # Master icon source
│   └── icons/                  # Pre-generated PNGs (16–1024 px)
├── tests/                      # Vitest unit tests
├── build.js                    # esbuild entry (compiles src/build.ts)
├── vite.config.ts              # Playground dev server
├── tsconfig.json
├── eslint.config.js
├── commitlint.config.js
└── package.json
```

### Scripts

```bash
npm run build             # compile all themes → dist/
npm run playground        # Vite dev server (playground)
npm run icons             # generate PNG icons from images/icon.svg → images/icons/
npm run typecheck         # tsc --noEmit
npm run lint              # ESLint
npm run test              # Vitest
npm run clean             # rm -rf dist
npm run package           # assemble both marketplace bundles (after build)
npm run package:vscode    # VS Code .vsix only
npm run package:jetbrains # JetBrains .zip only
```

### Architecture: Color Flow

```
src/colors/palette.ts      ← edit colors here
       ↓
src/themes/variants.ts     ← typed EquinoxVariant objects
       ↓
src/platforms/
  vscode.ts    → dist/vscode/*.json
  jetbrains.ts → dist/jetbrains/*.icls
               → dist/jetbrains/*-islands.icls
               → dist/jetbrains/themes/*.theme.json
  terminal.ts  → [profile data] → scripts/generate-terminal.py
                                → dist/terminal/*.terminal
       ↓
playground/main.ts         ← consumes variants directly (no dist/ needed)
```

### CI / CD

| Workflow           | Trigger            | Action                                                                                 |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------- |
| `ci.yml`           | Push / PR → `main` | Typecheck, lint, build                                                                 |
| `auto-release.yml` | Push → `main`      | Bumps patch version, builds, publishes GitHub Release + VS Code Marketplace (VSCE_PAT) |
| `release.yml`      | Tag `v*`           | Builds and publishes release for a specific version tag                                |

> **VS Code auto-publish** requires a `VSCE_PAT` repository secret (Personal Access Token from [marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage)). Add it under **Settings → Secrets and variables → Actions**.

### Code Quality

Pre-commit hooks run automatically on `git commit`:

- **Prettier** formats all staged `.ts`, `.json`, `.md` files
- **Commitlint** enforces [Conventional Commits](https://www.conventionalcommits.org/):

    ```
    feat: add new variant
    fix: correct accent hex value
    docs: update installation steps
    chore: bump dependencies
    ```

## Color Science & Accessibility

- **WCAG AAA**: All text/background pairs verified at ≥ 7:1 contrast ratio
- **Anti-halation**: No high-saturation neons; muted ergonomic pastels in dark mode, rich deep tones in light mode
- **Hue spacing**: Sufficient perceptual distance between syntax colors to prevent confusion during long sessions
- **Accent color**: Each variant exposes a single `ui.focus` accent propagated to focus rings, badges, status bars, window borders (VS Code), and hyperlinks (JetBrains)

## Contributing

1. Follow the existing code style (Prettier formats on commit)
2. Use Conventional Commits
3. Maintain WCAG AAA compliance for all new color combinations
4. Run `npm run typecheck && npm run lint && npm run test` before opening a PR

## License

MIT — see [LICENSE](LICENSE).

## Icon & Marketplace Assets

The master icon lives at `images/icon.svg`.

**Generate PNGs** (uses [sharp](https://sharp.pixelplumbing.com/), already installed as a devDependency):

```bash
npm run icons
```

This outputs 11 sizes (16, 32, 40, 48, 64, 80, 128, 200, 256, 512, 1024 px) to `images/icons/` and copies convenience copies of 128 and 256 px to `images/`.

**Pre-generated icons** are committed to the repository under `images/icons/` so that CI and marketplace packaging do not require a separate step.

## Marketplace Submission

All submission metadata lives in `marketplace/`. See the README in each subdirectory for full packaging steps.

| Platform              | Directory                | Format           | Tool           |
| --------------------- | ------------------------ | ---------------- | -------------- |
| VS Code Marketplace   | `marketplace/vscode/`    | VSIX             | `vsce package` |
| JetBrains Marketplace | `marketplace/jetbrains/` | ZIP (plugin jar) | Manual ZIP     |

**VS Code quick reference:**

```bash
cd marketplace/vscode
npm install -g @vscode/vsce
vsce package
# produces equinox-colors-X.Y.Z.vsix — upload to marketplace.visualstudio.com
```

**JetBrains quick reference:** copy `dist/jetbrains/` and `dist/jetbrains/themes/` into the plugin JAR structure described in `marketplace/jetbrains/README.md`, then ZIP and upload to plugins.jetbrains.com.
