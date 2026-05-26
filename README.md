# 🎨 Equinox Theme

> A production-ready, multi-platform ergonomic theme system for developers spending 8+ hours a day coding.

Equinox is a unified theme generator that produces fully functional, WCAG AAA-compliant color schemes for **VS Code**, **JetBrains IDEs** (IntelliJ IDEA, WebStorm, PyCharm, GoLand, etc.), and **macOS Terminal**. It eliminates cognitive fatigue, prevents astigmatism stimulation (halation), and ensures visual ergonomics through scientifically-grounded color psychology and contrast standards.

## 🌟 Features

- **4 Expertly-Crafted Variants**: Dark Modern, Dark Contrast, Light Soft, Light Contrast
- **Universal Language Support**: Works flawlessly with TypeScript, JavaScript, Python, Java, Kotlin, Go, Rust, C#, HTML, CSS, YAML, SQL, and more
- **WCAG AAA Compliance**: Every color combination strictly adheres to WCAG AAA contrast requirements (7:1 minimum)
- **Anti-Fatigue Design**: Carefully selected palette to reduce eye strain and cognitive load during extended development sessions
- **Split & Unified Backgrounds**: Choose between unified themes (seamless) or split backgrounds (UI/Editor distinction)
- **3-Platform Compilation**: Single source of truth generates themes for all major platforms simultaneously
- **Production-Ready**: Pre-commit hooks, linting, formatting, and conventional commits out of the box
- **Zero Dependencies**: Compiles from pure TypeScript with no runtime dependencies

## 📋 The 4 Variants

### 1. **Equinox Dark Modern** (Unified)

- **Best for**: Extended coding sessions with minimal context switching
- **Background**: `#1a1f2e` (deeply soothing dark slate-blue)
- **Text**: `#e8eef7` (crisp soft off-white)
- **Philosophy**: Unified environment reduces visual noise; perfect contrast without halation

### 2. **Equinox Dark Contrast** (Split)

- **Best for**: Complex IDE navigation requiring clear UI/Editor boundaries
- **Editor**: `#0f1419` (ultra-deep restful dark)
- **UI/Toolbars**: `#16192e` (slightly lighter structural tone)
- **Text**: `#e8eef7` (consistent crisp foreground)
- **Philosophy**: Architectural clarity with edge definition for faster visual parsing

### 3. **Equinox Light Soft** (Unified)

- **Best for**: Well-lit environments and developers preferring light themes without screen glare
- **Background**: `#f5f3f0` (ultra-soft light gray/cream)
- **Text**: `#2c2e3a` (deep navy-slate)
- **Philosophy**: Eliminates paper-white glare blindness; maintains perfect contrast and sharpness

### 4. **Equinox Light Contrast** (Split)

- **Best for**: Bright environments requiring maximum UI/Editor distinction
- **Editor**: `#faf9f7` (clean bright soft)
- **UI/Toolbars**: `#ede9e3` (muted contrasting tone)
- **Text**: `#2c2e3a` (consistent deep foreground)
- **Philosophy**: Maximum architectural depth while maintaining ergonomic visual comfort

## 🎯 Syntax Highlighting Philosophy

Equinox uses **muted, ergonomic pastels** for dark themes and **rich, deep tones** for light themes. Every syntax token is carefully chosen to:

- **Maintain readability** across 8+ hour coding sessions
- **Prevent cognitive fatigue** through harmonious color relationships
- **Ensure universal support** via standard semantic scopes (no language-specific hacks)
- **Support accessibility** with verified WCAG AAA contrast ratios

### Highlighted Token Categories

- **Keywords** – Control flow, storage, declarations
- **Functions** – Method calls, invocations, routine definitions
- **Strings** – Literals, text content, quotes
- **Variables** – Parameters, attributes, instance/class fields
- **Numbers** – Constants, booleans, numeric values
- **Comments** – Documentation, muted secondary text
- **Operators** – Arithmetic, logical, comparison
- **Types** – Classes, interfaces, enums, generics
- **Markup** – HTML, XML, tags, attributes (universal CSS/YAML/JSON support)

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher

### Installation

```bash
git clone https://github.com/yourusername/equinox-theme.git
cd equinox-theme
npm install
```

### Build Themes

```bash
npm run build
```

This generates 12 theme files (4 variants × 3 platforms) into the `dist/` directory:

```
dist/
├── vscode/
│   ├── equinox-dark-modern.json
│   ├── equinox-dark-contrast.json
│   ├── equinox-light-soft.json
│   └── equinox-light-contrast.json
├── jetbrains/
│   ├── equinox-dark-modern.icls
│   ├── equinox-dark-contrast.icls
│   ├── equinox-light-soft.icls
│   └── equinox-light-contrast.icls
├── terminal/
│   ├── equinox-dark-modern.terminal
│   ├── equinox-dark-contrast.terminal
│   ├── equinox-light-soft.terminal
│   └── equinox-light-contrast.terminal
└── manifest.json
```

### Preview Themes in Interactive Playground

Before installing themes, preview all variants in a live HTML/CSS playground:

```bash
npm run playground
# Opens http://localhost:8000 with interactive preview
```

**Features**:

- 🎨 Switch between all 4 variants instantly
- 🖥️ Simulate VS Code, JetBrains IDE, and Terminal interfaces
- 🎯 Inspect individual colors (HEX, RGB, HSL)
- 🔄 Auto-syncs with token updates (rebuild to refresh)

The playground consumes the exact same color source as your final themes, ensuring pixel-perfect accuracy.

## 📖 Installation Guide by Platform

### VS Code

1. **Locate theme files**: Find all `.json` files in `dist/vscode/`
2. **Copy to VS Code**:

   ```bash
   cp dist/vscode/*.json ~/.config/Code/User/themes/
   # Or on macOS:
   cp dist/vscode/*.json ~/Library/Application\ Support/Code/User/themes/
   ```

3. **Activate theme**:
   - Open VS Code
   - Go to **Settings** → **Theme** → **Color Theme**
   - Select your preferred Equinox variant

**Alternative (via Command Palette)**:

- Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Linux/Windows)
- Type `Preferences: Color Theme`
- Search for "Equinox"
- Press Enter

### JetBrains IDEs (IntelliJ, WebStorm, PyCharm, GoLand, etc.)

1. **Locate theme files**: Find all `.icls` files in `dist/jetbrains/`
2. **Copy to JetBrains config**:

   ```bash
   # On macOS:
   cp dist/jetbrains/*.icls ~/Library/Application\ Support/JetBrains/*/colors/
   
   # On Linux:
   cp dist/jetbrains/*.icls ~/.config/JetBrains/*/colors/
   
   # On Windows:
   copy dist\jetbrains\*.icls %APPDATA%\JetBrains\<IDE>\colors\
   ```

   *(Replace `<IDE>` with your JetBrains IDE folder, e.g., `IntelliJIdea2024.1`, `WebStorm2024.1`)*

3. **Activate theme**:
   - Open your JetBrains IDE
   - Go to **Settings/Preferences** → **Appearance & Behavior** → **Appearance**
   - Under **Theme**, select your preferred Equinox variant
   - Click **Apply**

4. **Per-Project Override** (optional):
   - Go to **Settings** → **Editor** → **Color Scheme**
   - Select your preferred Equinox scheme

### macOS Terminal

1. **Locate theme files**: Find all `.terminal` files in `dist/terminal/`
2. **Double-click to import**:
   - Find a `.terminal` file in Finder
   - Double-click it
   - Terminal will prompt: "Are you sure you want to open this profile?"
   - Click **Open**

3. **Activate theme**:
   - Open **Terminal.app**
   - Go to **Terminal** → **Preferences** → **Profiles**
   - Select your imported Equinox variant from the list
   - Click the **Default** button to set it as your default profile

4. **Manual Import** (if double-click doesn't work):

   ```bash
   open dist/terminal/equinox-dark-modern.terminal
   ```

## 🛠 Development

### Project Structure

```
equinox-theme/
├── src/
│   ├── tokens.ts              # Design token definitions & color palettes
│   ├── build.ts               # Build orchestration & compilation
│   ├── playground-export.ts   # Export tokens as JSON for browser playground
│   └── platforms/
│       ├── vscode.ts          # VS Code JSON theme generator
│       ├── jetbrains.ts       # JetBrains ICLS XML generator
│       └── terminal.ts        # macOS Terminal plist generator
├── playground/
│   ├── index.html             # Interactive HTML playground
│   ├── styles.css             # Platform simulations + UI styling
│   ├── script.js              # Theme switcher & color inspector
│   ├── README.md              # Playground-specific documentation
│   └── themes.json            # Generated color data (auto-built)
├── .husky/
│   ├── pre-commit            # Prettier + lint-staged hook
│   └── commit-msg            # Commitlint hook
├── package.json
├── tsconfig.json
├── .prettierrc
├── commitlint.config.js
├── LICENSE
└── README.md
```

### Playground Architecture

The interactive playground ensures all themes stay synchronized with your color tokens:

```
tokens.ts (source of truth)
    ↓
playground-export.ts (TypeScript export)
    ↓
build.ts (npm run build)
    ↓
dist/playground/themes.json (generated)
    ↓
playground/script.js (loads and renders)
    ↓
Interactive HTML UI with live previews
```

**Key benefit**: Edit `src/tokens.ts` → Run `npm run build` → Refresh playground → See changes instantly across all 3 platform simulations.

### Development Scripts

```bash
# Build themes once
npm run build

# Build themes and launch interactive playground
npm run playground

# Watch for TypeScript changes
npm run dev

# Clean build artifacts
npm run clean

# Pre-commit setup (auto-runs on first install)
npm run prepare
```

### Code Quality & Git Workflow

This project enforces strict code quality through automated hooks:

- **Pre-commit Hook** (`npm run prepare` / husky):
  - Runs Prettier on all staged `.ts`, `.json`, and `.md` files
  - Ensures consistent formatting

- **Commit Message Hook** (commitlint):
  - Enforces Conventional Commits specification
  - Blocks commits that don't follow the format:

    ```
    feat: add new feature
    fix: resolve critical bug
    docs: update documentation
    chore: update dependencies
    ```

### Example Workflow

```bash
# Make changes to src/tokens.ts
vim src/tokens.ts

# Stage changes
git add src/tokens.ts

# Commit (pre-commit hook auto-formats, then commit-msg validates message)
git commit -m "feat: add new color variant"
# ✓ Pre-commit hook runs prettier
# ✓ Commit message validated
# ✓ Commit successful
```

## 🔬 Color Science & Accessibility

### WCAG AAA Compliance

Every color combination in Equinox meets or exceeds WCAG AAA standards:

- **Minimum contrast ratio**: 7:1 for normal text
- **Large text (18pt+)**: 4.5:1
- **Verified through**: WebAIM Contrast Checker, Stark plugin

### Anti-Fatigue Design

The color selections follow established visual ergonomics research:

1. **Halation Prevention**: No harsh high-saturation neons that cause eye strain halos
2. **Color Temperature Harmony**: Balanced warm/cool tones to reduce color constancy fatigue
3. **Hue Spacing**: Sufficient perceptual distance between syntax colors to prevent confusion
4. **Luminance Contrast**: Maximum distinction between code elements without harsh transitions
5. **Blue Light Reduction**: Slightly warmed backgrounds in dark themes to reduce circadian disruption

### Scientific References

- Irlen, H. (1991). Reading by the Colors: Overcoming Dyslexia and Other Reading Disabilities Through the Irlen Method
- Sheedy, J. E. (1992). Vision Problems in the U.S.: Data and Applications
- WCAG 2.1 Guidelines: <https://www.w3.org/WAI/WCAG21/quickref/>

## 🤝 Contributing

Contributions are welcome! Please ensure all changes:

1. Follow the existing code style (Prettier will format automatically)
2. Use Conventional Commits for commit messages
3. Include tests or documentation for new features
4. Maintain or improve WCAG AAA accessibility compliance
5. Verify all 4 variants display correctly on target platforms

## 📝 License

MIT License – See [LICENSE](LICENSE) file for details.

## 🎓 Credits

Equinox Theme was designed with input from visual ergonomics research, accessibility standards, and feedback from developers using IDEs 8+ hours daily.

## 🔗 Resources

- [VS Code Theme Documentation](https://code.visualstudio.com/api/extension-capability-proposals/color-theme)
- [JetBrains Color Scheme Format](https://plugins.jetbrains.com/docs/intellij/themes.html)
- [macOS Terminal Preferences](https://support.apple.com/guide/terminal/)
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Brewer 2.0](https://colorbrewer2.org/) – Accessible color palettes

---

**Made with ❤️ for developers who care about their visual health.**
