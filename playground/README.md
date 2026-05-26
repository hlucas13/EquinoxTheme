# 🎨 Equinox Playground

An interactive HTML/CSS playground for previewing all Equinox theme variants across all three platforms.

## 📦 Contents

- **index.html** – Main playground interface
- **styles.css** – Complete styling for platform simulations
- **script.js** – Interactive logic and theme preview system
- **themes.json** – Generated color data (auto-built, consumed by script.js)

## 🚀 How to Use

1. **Build the themes first**:

   ```bash
   npm run build
   ```

   This generates the `themes.json` file that the playground consumes.

2. **Open the playground**:
   - Open `dist/playground/index.html` in your browser
   - Or run a local server:

     ```bash
     cd dist/playground
     python3 -m http.server 8000
     # Then open http://localhost:8000
     ```

## 🎯 Features

### Live Platform Simulation

- **VS Code** – Faithfully simulates VS Code interface with sidebar, line numbers, and status bar
- **JetBrains IDE** – Mimics IntelliJ IDEA / WebStorm interface structure
- **macOS Terminal** – Recreates Terminal.app with realistic output display

### Interactive Theme Selection

- Switch between all 4 Equinox variants in real-time
- Watch the entire interface update instantly
- No page reload needed

### Color Palette Inspection

- **Editor Colors** – Background, foreground, sidebar, toolbar
- **Syntax Colors** – Keywords, functions, strings, variables, numbers, comments
- **ANSI Palette** – All 16 terminal colors (regular + bright)
- Click any color to see HEX, RGB, and HSL values in a modal

### Live Code Preview

- TypeScript code sample with full syntax highlighting
- Terminal output with colored text
- Demonstrates real-world usage of color tokens

## 🔄 Auto-Sync with Token Updates

The playground **automatically reflects any color changes** in `src/tokens.ts`:

1. Update a color value in `src/tokens.ts`
2. Run `npm run build`
3. Refresh the playground in your browser
4. The new colors are instantly visible everywhere

This ensures the playground always stays synchronized with the source of truth (design tokens).

## 🛠️ Build Process

The build script automatically:

1. Generates TypeScript interfaces from tokens
2. Exports themes in JSON format
3. Writes `themes.json` to `dist/playground/`

The playground then:

1. Loads `themes.json` on page load
2. Renders the selected platform and theme
3. Populates all color palettes from the data

## 📱 Responsive Design

- **Desktop** (1200px+) – Full side-by-side layout
- **Tablet** (768-1200px) – Stacked layout
- **Mobile** – Sidebar hidden, preview centered

## 🎨 Customization

To add a new platform simulation:

1. Create a new render function in `script.js` (e.g., `renderCustomPlatform()`)
2. Add CSS classes in `styles.css`
3. Call it from `renderPlatform()` when the platform is selected
4. Add a new option to the `<select>` in `index.html`

To add new syntax token types:

1. Update `src/tokens.ts` with new syntax colors
2. Run `npm run build`
3. Update `renderSyntaxPalette()` in `script.js` to display them
4. Refresh the playground

## 🐛 Troubleshooting

**"Error loading themes.json"**

- Ensure you ran `npm run build` first
- Check browser console for CORS errors if running from file://
- Use a local HTTP server instead of opening file directly

**Colors not updating**

- Clear your browser cache
- Rebuild with `npm run build`
- Hard refresh the playground page (Cmd+Shift+R or Ctrl+Shift+R)

**Platform rendering looks broken**

- Check browser console for JavaScript errors
- Ensure JavaScript is enabled
- Try a different browser (Chrome, Firefox, Safari all supported)

## 📊 What Gets Generated

When you run `npm run build`, the playground receives:

```
dist/playground/themes.json
{
  "dark-modern": {
    "name": "Equinox Dark Modern",
    "type": "dark",
    "palette": { /* all editor, toolbar, sidebar, ui, syntax colors */ },
    "ansi": { /* 16 ANSI colors */ }
  },
  // ... 3 more variants
}
```

The JavaScript then transforms this data into:

- Inline CSS for each platform simulation
- Color swatches for visual inspection
- Modal dialogs with color format conversion

## 🎯 Architecture

```
Playground Flow:
1. User selects theme & platform
2. JavaScript loads themes.json
3. Extracts colors for current selection
4. Renders appropriate platform HTML
5. Applies colors via inline styles
6. Populates color palettes
7. User can inspect individual colors
```

This ensures **zero CSS duplication** – all colors flow from the single source of truth (tokens.ts).

---

**Built with ❤️ for visual theme developers**
