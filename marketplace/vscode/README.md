# VS Code Marketplace — Equinox Colors

## Quick packaging (recommended)

From the project root, run the automated packaging script after building:

```bash
cd ../..
npm run build
npm run package:vscode
# Output: dist/marketplace/vscode/equinox-colors-<version>.vsix
```

## Manual packaging with `vsce`

```bash
# Install the VS Code Extension Manager (once)
npm install -g @vscode/vsce

# Build the theme files first
cd ../..
npm run build

# Copy icons and themes into the staging directory
cp images/icon-128.png marketplace/vscode/icon-128.png
mkdir -p marketplace/vscode/themes
cp dist/vscode/*.json marketplace/vscode/themes/

# Package from this directory
cd marketplace/vscode
vsce package
```

This produces `equinox-colors-1.0.0.vsix`.

## Publishing

```bash
vsce publish
```

You will be prompted for your Personal Access Token from the
[Azure DevOps marketplace portal](https://marketplace.visualstudio.com/manage).

## Required files in the staging directory

| File / folder   | Purpose                                    |
| --------------- | ------------------------------------------ |
| `package.json`  | Extension manifest                         |
| `icon-128.png`  | Marketplace thumbnail (128 × 128)          |
| `themes/*.json` | Theme JSON files copied from `dist/vscode` |
| `.vscodeignore` | Files excluded from VSIX                   |
| `README.md`     | Marketplace landing page                   |
| `CHANGELOG.md`  | Version history (recommended)              |
