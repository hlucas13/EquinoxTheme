# Equinox Colors Playground

An interactive live preview of all Equinox theme variants across all supported platforms.

## Running locally

```bash
# From the project root
npm install
npm run playground   # starts Vite dev server at http://localhost:5173
```

No build step required — the playground imports variant data directly from `src/` at runtime via Vite.

## Features

### Platform previews

The dock at the bottom switches between four fully rendered platform simulations:

- **VS Code** — titlebar, activity bar, sidebar, editor, status bar
- **JetBrains IDE** — classic layout with sidebar, tabbar, editor, and status bar
- **JetBrains Islands** — New UI floating-panel layout; requires both `.icls` and `.theme.json`
- **macOS Terminal** — terminal output with ANSI 16-color rendering

Each preview fills the space below the header (the header is anchored at the top of the page, not floating). The dock floats over the preview at the bottom.

### Dock controls

- **Variant** — switch between all 4 theme variants (Dark Modern, Dark Contrast, Light Soft, Light Contrast)
- **Platform** — switch between VS Code, JetBrains IDE, JetBrains Islands, Terminal
- **Settings** — toggle dark mode for the playground chrome and frosted glass style; access Help & Wiki

### Liquid Glass UI

The dock, menus, and modal use physics-based refraction via an SVG displacement map generated from Snell's law (`glass-distortion.ts`). The liquid toggles use a goo filter with CSS custom properties for the blob transition animation.

### Mobile

On portrait orientation, a full-screen overlay with a **Liquid Glass card** prompts the user to rotate to landscape. The card follows the site's dark/light theme. The playground is designed for landscape / desktop viewports.

## Files

| File                  | Purpose                                                         |
| --------------------- | --------------------------------------------------------------- |
| `index.html`          | HTML shell — dock, menus, help modal                            |
| `main.ts`             | Platform renderers + dock interaction logic                     |
| `styles.css`          | Layout, Glass tokens, dock, liquid toggle, platform simulations |
| `glass-distortion.ts` | Snell's-law SVG displacement map generator                      |

## Extending

To add a new platform simulation:
