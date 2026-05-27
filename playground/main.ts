import {
    allVariants,
    darkAnsiPalette,
    lightAnsiPalette,
    type AnsiPalette,
    type EquinoxVariant,
} from '../src/themes/variants';
import { GlassDistortion } from './glass-distortion';

// ============================================================================
// THEME MAP
// ============================================================================

type ThemeKey =
    | 'dark-modern'
    | 'dark-contrast'
    | 'light-soft'
    | 'light-contrast';
type PlatformKey = 'vscode' | 'jetbrains' | 'jetbrains-islands' | 'terminal';

interface PlaygroundEntry {
    variant: EquinoxVariant;
    ansi: AnsiPalette;
}

const THEMES: Record<ThemeKey, PlaygroundEntry> = {
    'dark-modern': { variant: allVariants[0], ansi: darkAnsiPalette },
    'dark-contrast': { variant: allVariants[1], ansi: darkAnsiPalette },
    'light-soft': { variant: allVariants[2], ansi: lightAnsiPalette },
    'light-contrast': { variant: allVariants[3], ansi: lightAnsiPalette },
};

// ============================================================================
// SAMPLE CODE SNIPPETS
// ============================================================================

const SAMPLE_CODE = `// Equinox Theme — TypeScript sample
import { createServer } from 'http';

interface Config {
    port: number;
    host: string;
}

const DEFAULT_CONFIG: Config = {
    port: 3000,
    host: 'localhost',
};

async function startServer(config = DEFAULT_CONFIG) {
    const server = createServer((req, res) => {
        const { url, method } = req;
        // Route handler
        if (method === 'GET' && url === '/health') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'ok' }));
        } else {
            res.writeHead(404);
            res.end('Not found');
        }
    });

    return new Promise<void>((resolve) => {
        server.listen(config.port, config.host, () => {
            console.log(\`Server running at http://\${config.host}:\${config.port}\`);
            resolve();
        });
    });
}

startServer().catch(console.error);`;

const SAMPLE_CODE_JAVA = `// Equinox Theme — Java sample
package com.equinox.server;

import java.util.Map;
import java.util.HashMap;

public class HealthServer {

    private static final int DEFAULT_PORT = 3000;
    private static final String DEFAULT_HOST = "localhost";

    private final int port;
    private final String host;

    public HealthServer(int port, String host) {
        this.port = port;
        this.host = host;
    }

    public Map<String, Object> getStatus() {
        Map<String, Object> status = new HashMap<>();
        // Build response payload
        status.put("status", "ok");
        status.put("host", this.host);
        status.put("port", this.port);
        return status;
    }

    public static void main(String[] args) throws Exception {
        HealthServer server = new HealthServer(
            DEFAULT_PORT, DEFAULT_HOST
        );
        System.out.println("Server at " + DEFAULT_HOST
            + ":" + DEFAULT_PORT);
        server.getStatus().forEach((k, v) ->
            System.out.println(k + "=" + v));
    }
}`;

// ============================================================================
// SYNTAX HIGHLIGHTING
// Minimal tokenizer for the sample code
// ============================================================================

type SyntaxToken = { type: string; value: string };

function tokenize(code: string): SyntaxToken[] {
    const tokens: SyntaxToken[] = [];
    const patterns: [string, RegExp][] = [
        ['comment', /^\/\/[^\n]*/],
        ['string', /^`(?:[^`\\]|\\.)*`/],
        ['string', /^'(?:[^'\\]|\\.)*'/],
        ['string', /^"(?:[^"\\]|\\.)*"/],
        ['number', /^\b\d+\b/],
        [
            'keyword',
            /^\b(?:import|export|const|let|var|function|async|await|return|if|else|new|interface|type|package|class|public|private|protected|static|final|void|int|String|Map|throws|Exception)\b/,
        ],
        ['keyword', /^\b(?:from|of|true|false|null|undefined|void|Promise)\b/],
        ['function', /^\b([A-Za-z_$][A-Za-z0-9_$]*)\s*(?=\()/],
        ['variable', /^\b[A-Za-z_$][A-Za-z0-9_$]*\b/],
        ['punctuation', /^[{}[\]()<>=:,;.?!|&+\-*/\\]/],
        ['whitespace', /^\s+/],
    ];

    let remaining = code;
    while (remaining.length > 0) {
        let matched = false;
        for (const [type, pattern] of patterns) {
            const m = pattern.exec(remaining);
            if (m) {
                tokens.push({ type, value: m[0] });
                remaining = remaining.slice(m[0].length);
                matched = true;
                break;
            }
        }
        if (!matched) {
            tokens.push({ type: 'text', value: remaining[0] });
            remaining = remaining.slice(1);
        }
    }
    return tokens;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function renderHighlightedCode(code: string, variant: EquinoxVariant): string {
    const s = variant.palette.syntax;
    const colorMap: Record<string, string> = {
        comment: s.comment,
        string: s.string,
        number: s.number,
        keyword: s.keyword,
        function: s.function,
        variable: s.variable,
        punctuation: variant.palette.ui.lineNumber,
    };

    return tokenize(code)
        .map(({ type, value }) => {
            const color = colorMap[type];
            if (!color) return escapeHtml(value);
            const style =
                type === 'comment'
                    ? `color:${color};font-style:italic`
                    : `color:${color}`;
            return `<span style="${style}">${escapeHtml(value)}</span>`;
        })
        .join('');
}

// ============================================================================
// PLATFORM RENDERERS
// ============================================================================

function renderVscode(entry: PlaygroundEntry): string {
    const { variant } = entry;
    const p = variant.palette;
    const highlighted = renderHighlightedCode(SAMPLE_CODE, variant);
    const lines = SAMPLE_CODE.split('\n');

    const lineNumbers = lines
        .map((_, i) => `<div style="color:${p.ui.lineNumber}">${i + 1}</div>`)
        .join('');

    const isContrast = variant.name.includes('Contrast');
    const panelBg = isContrast ? p.toolbar.background : p.editor.background;

    return `
<div style="display:flex;flex-direction:column;height:100%;font-family:'JetBrains Mono','Fira Code',monospace;font-size:13px;background:${p.editor.background}">
  <!-- Title bar -->
  <div style="background:${p.toolbar.background};color:${p.toolbar.foreground};padding:8px 16px;border-bottom:1px solid ${p.ui.border};font-size:12px;display:flex;align-items:center;gap:8px">
    <span style="opacity:.5">index.ts</span>
    <span style="color:${p.ui.focus}">● main.ts</span>
    <span style="opacity:.5">config.ts</span>
    <span style="margin-left:auto;opacity:.5;font-size:10px">Visual Studio Code</span>
  </div>
  <!-- Main area -->
  <div style="display:flex;flex:1;overflow:hidden">
    <!-- Activity bar -->
    <div style="width:48px;background:${p.toolbar.background};border-right:1px solid ${p.ui.border};display:flex;flex-direction:column;align-items:center;padding:8px 0;gap:12px">
      <div style="width:24px;height:24px;background:${p.ui.focus};border-radius:4px;opacity:.9"></div>
      <div style="width:24px;height:24px;background:${p.ui.lineNumber};border-radius:4px;opacity:.5"></div>
      <div style="width:24px;height:24px;background:${p.ui.lineNumber};border-radius:4px;opacity:.5"></div>
    </div>
    <!-- Sidebar -->
    <div style="width:200px;background:${p.sidebar.background};border-right:1px solid ${p.ui.border};padding:8px;font-size:12px;color:${p.sidebar.foreground}">
      <div style="font-weight:600;margin-bottom:8px;opacity:.8">EXPLORER</div>
      <div style="padding:4px 8px;background:${p.ui.selection};border-radius:3px;margin-bottom:2px">📄 main.ts</div>
      <div style="padding:4px 8px;border-radius:3px;margin-bottom:2px;opacity:.7">📄 index.ts</div>
      <div style="padding:4px 8px;border-radius:3px;opacity:.7">📄 config.ts</div>
    </div>
    <!-- Editor -->
    <div style="flex:1;display:flex;overflow:hidden">
      <div style="width:48px;padding:12px 8px;text-align:right;color:${p.ui.lineNumber};font-size:12px;line-height:1.6;user-select:none;background:${p.editor.background};overflow:hidden">${lineNumbers}</div>
      <div style="flex:1;padding:12px 16px;overflow:auto;background:${p.editor.background};color:${p.editor.foreground};line-height:1.6;white-space:pre">${highlighted}</div>
    </div>
  </div>
  <!-- Status bar -->
  <div style="background:${panelBg};color:${p.toolbar.foreground};height:24px;padding:0 16px;display:flex;align-items:center;gap:16px;font-size:11px;border-top:1px solid ${p.ui.border}">
    <span style="background:${p.ui.focus};color:${p.editor.background};padding:2px 8px;border-radius:2px">main</span>
    <span style="opacity:.7">TypeScript 5.9</span>
    <span style="margin-left:auto;opacity:.7">Ln 1, Col 1</span>
  </div>
</div>`;
}

function renderJetBrains(entry: PlaygroundEntry): string {
    const { variant } = entry;
    const p = variant.palette;
    const highlighted = renderHighlightedCode(SAMPLE_CODE_JAVA, variant);
    const lines = SAMPLE_CODE_JAVA.split('\n');

    const lineNumbers = lines
        .map((_, i) => `<div style="color:${p.ui.lineNumber}">${i + 1}</div>`)
        .join('');

    return `
<div style="display:flex;flex-direction:column;height:100%;font-family:'JetBrains Mono','Fira Code',monospace;font-size:13px;background:${p.editor.background}">
  <!-- Menu bar -->
  <div style="background:${p.toolbar.background};color:${p.toolbar.foreground};padding:6px 16px;border-bottom:1px solid ${p.ui.border};font-size:12px;display:flex;gap:16px;align-items:center">
    <span>File</span><span>Edit</span><span>View</span><span>Run</span><span>Tools</span>
    <span style="margin-left:auto;opacity:.5;font-size:10px">IntelliJ IDEA</span>
  </div>
  <!-- Tabs -->
  <div style="background:${p.toolbar.background};color:${p.toolbar.foreground};padding:0 16px;border-bottom:1px solid ${p.ui.border};font-size:12px;display:flex;gap:4px">
    <div style="padding:6px 12px;background:${p.editor.background};border-top:2px solid ${p.ui.focus}">HealthServer.java</div>
    <div style="padding:6px 12px;opacity:.6">Main.java</div>
  </div>
  <!-- Content -->
  <div style="display:flex;flex:1;overflow:hidden">
    <!-- Project tree -->
    <div style="width:220px;background:${p.sidebar.background};border-right:1px solid ${p.ui.border};padding:8px;font-size:12px;color:${p.sidebar.foreground}">
      <div style="font-weight:600;margin-bottom:8px;opacity:.8">Project</div>
      <div style="padding:3px 8px;background:${p.ui.selection};border-radius:2px;margin-bottom:2px">📁 com.equinox.server</div>
      <div style="padding:3px 24px;border-radius:2px;margin-bottom:2px;opacity:.7">☕ HealthServer.java</div>
      <div style="padding:3px 24px;border-radius:2px;opacity:.7">☕ Main.java</div>
    </div>
    <!-- Editor -->
    <div style="flex:1;display:flex;overflow:hidden">
      <div style="width:48px;padding:12px 8px;text-align:right;color:${p.ui.lineNumber};font-size:12px;line-height:1.6;user-select:none;background:${p.editor.background}">${lineNumbers}</div>
      <div style="flex:1;padding:12px 16px;overflow:auto;background:${p.editor.background};color:${p.editor.foreground};line-height:1.6;white-space:pre">${highlighted}</div>
    </div>
  </div>
  <!-- Tool window bar -->
  <div style="background:${p.toolbar.background};color:${p.toolbar.foreground};height:28px;padding:0 16px;display:flex;align-items:center;gap:16px;font-size:11px;border-top:1px solid ${p.ui.border}">
    <span style="color:${p.ui.focus}">Terminal</span>
    <span style="opacity:.6">Problems</span>
    <span style="margin-left:auto;opacity:.6">HealthServer.java:1:1</span>
  </div>
</div>`;
}

function renderJetBrainsIslands(entry: PlaygroundEntry): string {
    const { variant } = entry;
    const p = variant.palette;
    const highlighted = renderHighlightedCode(SAMPLE_CODE_JAVA, variant);
    const lines = SAMPLE_CODE_JAVA.split('\n');

    const lineNumbers = lines
        .map((_, i) => `<div style="color:${p.ui.lineNumber}">${i + 1}</div>`)
        .join('');

    // Desktop color (darker background visible between islands)
    const isDark = variant.name.includes('Dark');
    const desktopBg = isDark
        ? variant.name.includes('Modern')
            ? '#0d1018'
            : '#0b0c10'
        : variant.name.includes('Soft')
          ? '#d6d2cc'
          : '#d2cec7';

    const islandShadow = isDark
        ? '0 4px 16px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06)'
        : '0 4px 16px rgba(0,0,0,0.14), 0 0 0 0.5px rgba(0,0,0,0.06)';

    return `
<div style="display:flex;flex-direction:column;height:100%;font-family:'JetBrains Mono','Fira Code',monospace;font-size:12px;background:${desktopBg}">
  <!-- New UI Toolbar -->
  <div style="background:${p.toolbar.background};color:${p.toolbar.foreground};padding:6px 16px;border-bottom:1px solid ${p.ui.border};font-size:11px;display:flex;gap:16px;align-items:center;flex-shrink:0">
    <span style="font-weight:600;font-size:12px;color:${p.ui.focus}">Equinox Project</span>
    <span style="opacity:.5;margin-left:8px">File</span><span style="opacity:.5">Edit</span><span style="opacity:.5">View</span><span style="opacity:.5">Run</span>
    <span style="margin-left:auto;opacity:.6;font-size:10px">IntelliJ IDEA · New UI · Islands</span>
  </div>
  <!-- Islands workspace -->
  <div style="flex:1;min-height:0;padding:6px;display:flex;gap:6px;overflow:hidden">
    <!-- Project tree island -->
    <div style="width:190px;flex-shrink:0;border-radius:8px;background:${p.sidebar.background};box-shadow:${islandShadow};overflow:hidden;display:flex;flex-direction:column">
      <div style="padding:6px 10px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:${p.ui.lineNumber};border-bottom:1px solid ${p.ui.border}">Project</div>
      <div style="flex:1;padding:6px;font-size:11px;color:${p.sidebar.foreground};overflow-y:auto">
        <div style="padding:3px 8px;background:${p.ui.selection};border-radius:4px;margin-bottom:2px;display:flex;align-items:center;gap:5px"><span style="opacity:.6">📁</span> com.equinox.server</div>
        <div style="padding:3px 20px;margin-bottom:1px;opacity:.8;display:flex;align-items:center;gap:5px"><span style="opacity:.6">☕</span> HealthServer.java</div>
        <div style="padding:3px 20px;margin-bottom:1px;opacity:.6;display:flex;align-items:center;gap:5px"><span style="opacity:.4">☕</span> Main.java</div>
        <div style="padding:3px 20px;opacity:.5;display:flex;align-items:center;gap:5px"><span style="opacity:.4">☕</span> Config.java</div>
        <div style="padding:3px 8px;margin-top:4px;opacity:.55;display:flex;align-items:center;gap:5px"><span>📂</span> resources</div>
        <div style="padding:3px 8px;opacity:.55;display:flex;align-items:center;gap:5px"><span>📄</span> pom.xml</div>
      </div>
    </div>
    <!-- Editor island -->
    <div style="flex:1;min-width:0;border-radius:8px;background:${p.editor.background};box-shadow:${islandShadow};overflow:hidden;display:flex;flex-direction:column">
      <!-- Tabs -->
      <div style="background:${p.toolbar.background};padding:0 12px;border-bottom:1px solid ${p.ui.border};font-size:11px;display:flex;gap:2px;flex-shrink:0">
        <div style="padding:5px 12px;background:${p.editor.background};border-top:2px solid ${p.ui.focus};color:${p.editor.foreground}">HealthServer.java</div>
        <div style="padding:5px 12px;opacity:.5;color:${p.toolbar.foreground}">Main.java</div>
        <div style="padding:5px 12px;opacity:.4;color:${p.toolbar.foreground}">Config.java</div>
      </div>
      <!-- Editor body -->
      <div style="flex:1;min-height:0;display:flex;overflow:hidden">
        <div style="width:42px;padding:8px 6px;text-align:right;color:${p.ui.lineNumber};font-size:11px;line-height:1.6;user-select:none;flex-shrink:0;overflow:hidden">${lineNumbers}</div>
        <div style="flex:1;padding:8px 12px;overflow:auto;color:${p.editor.foreground};line-height:1.6;white-space:pre;font-size:12px">${highlighted}</div>
      </div>
    </div>
  </div>
  <!-- Status bar island -->
  <div style="margin:0 6px 6px;border-radius:6px;background:${p.toolbar.background};box-shadow:${islandShadow};height:24px;padding:0 14px;display:flex;align-items:center;gap:14px;font-size:10px;color:${p.toolbar.foreground};flex-shrink:0">
    <span style="background:${p.ui.focus};color:${isDark ? '#fff' : '#fff'};padding:1px 7px;border-radius:3px;font-weight:600">main</span>
    <span style="opacity:.6">Java 21</span>
    <span style="margin-left:auto;opacity:.5">Ln 1, Col 1</span>
    <span style="opacity:.5">UTF-8</span>
  </div>
</div>`;
}

function renderTerminal(entry: PlaygroundEntry): string {
    const { variant, ansi } = entry;
    const p = variant.palette;

    const prompt = `<span style="color:${ansi.green};font-weight:bold">hlucas@equinox</span><span style="color:${ansi.white}">:</span><span style="color:${ansi.blue}">~/projects/equinox-theme</span><span style="color:${ansi.white}"> $ </span>`;

    const lines: string[] = [
        `${prompt}<span style="color:${p.editor.foreground}">npm run build</span>`,
        ``,
        `<span style="color:${ansi.cyan}">&gt; equinox-theme@0.0.1 build</span>`,
        `<span style="color:${ansi.cyan}">&gt; node build.js</span>`,
        ``,
        `<span style="color:${p.editor.foreground}">🎨 Equinox Theme Builder</span>`,
        `<span style="color:${ansi.white}">═══════════════════════════════════════</span>`,
        `<span style="color:${ansi.green}">✓ Created output directories</span>`,
        ``,
        `<span style="color:${ansi.blue}">📦 Building VS Code themes...</span>`,
        `<span style="color:${ansi.green}">  ✓ Equinox Dark Modern</span>`,
        `<span style="color:${ansi.green}">  ✓ Equinox Dark Contrast</span>`,
        `<span style="color:${ansi.green}">  ✓ Equinox Light Soft</span>`,
        `<span style="color:${ansi.green}">  ✓ Equinox Light Contrast</span>`,
        ``,
        `<span style="color:${ansi.blue}">📦 Building JetBrains IDE color schemes...</span>`,
        `<span style="color:${ansi.green}">  ✓ Equinox Dark Modern</span>`,
        `<span style="color:${ansi.green}">  ✓ Equinox Dark Contrast</span>`,
        `<span style="color:${ansi.green}">  ✓ Equinox Light Soft</span>`,
        `<span style="color:${ansi.green}">  ✓ Equinox Light Contrast</span>`,
        ``,
        `<span style="color:${ansi.blue}">📦 Building macOS Terminal profiles...</span>`,
        `<span style="color:${ansi.green}">  ✓ All 4 variants</span>`,
        ``,
        `<span style="color:${ansi.white}">═══════════════════════════════════════</span>`,
        `<span style="color:${ansi.brightGreen}">✨ Build complete!</span>`,
        `<span style="color:${ansi.white}">📦 Generated 4 variants across 3 platforms (12 files)</span>`,
        ``,
        `${prompt}<span style="color:${p.ui.cursor}">▌</span>`,
    ];

    return `
<div style="display:flex;flex-direction:column;height:100%;background:${p.editor.background};color:${p.editor.foreground};font-family:'JetBrains Mono','Fira Code','Courier New',monospace;font-size:13px;">
  <div style="flex-shrink:0;padding:12px 16px 8px;border-bottom:1px solid ${p.ui.border};font-size:12px;display:flex;align-items:center;gap:8px"><span style="opacity:.6">Equinox Terminal — zsh</span><span style="margin-left:auto;opacity:.4;font-size:10px">macOS Terminal</span></div>
  <div style="flex:1;min-height:0;overflow-y:auto;padding:12px 16px;line-height:1.6">${lines.map((l) => `<div>${l || '&nbsp;'}</div>`).join('')}</div>
</div>`;
}

// ============================================================================
// BOOTSTRAP — Glass Dock
// ============================================================================

let currentTheme: ThemeKey = 'dark-modern';
let currentPlatform: PlatformKey = 'vscode';
let darkMode = false;
let frostedGlass = false;

// ── Storage keys ──
const LS_THEME = 'equinox-playground-theme';
const LS_GLASS = 'equinox-playground-glass';

// ── DOM refs ──
const btnVariant = document.getElementById('btn-variant')!;
const btnPlatform = document.getElementById('btn-platform')!;
const btnSettings = document.getElementById('btn-settings')!;
const btnHelp = document.getElementById('btn-help')!;
const variantMenu = document.getElementById('variant-menu')!;
const platformMenu = document.getElementById('platform-menu')!;
const settingsMenu = document.getElementById('settings-menu')!;
const helpModal = document.getElementById('help-modal')!;
const btnCloseHelp = document.getElementById('btn-close-help')!;
const helpModalBackdrop = document.getElementById('help-modal-backdrop')!;
const toggleDark = document.getElementById('toggle-dark') as HTMLElement;
const toggleGlass = document.getElementById('toggle-glass') as HTMLElement;

// ── Liquid Toggle animation (rAF-based, matches FalaTinaChart timing) ──
function animateLiquidToggle(el: HTMLElement, toState: boolean): void {
    const from = Number.parseFloat(
        el.style.getPropertyValue('--complete') || '0'
    );
    const to = toState ? 100 : 0;

    // Set active immediately so the liquid blob expands on press
    el.dataset['active'] = 'true';

    // Cancel any in-progress animation on this element
    const prev = (el as HTMLElement & { _cancelToggle?: () => void })
        ._cancelToggle;
    if (prev) prev();

    let cancelled = false;
    (el as HTMLElement & { _cancelToggle?: () => void })._cancelToggle = () => {
        cancelled = true;
    };

    const delay = 180; // ms — blob press phase
    const duration = 140; // ms — --complete animation
    const startTime = performance.now();

    function step(now: number) {
        if (cancelled) return;
        const elapsed = now - startTime;

        if (elapsed < delay) {
            requestAnimationFrame(step);
            return;
        }

        const t = Math.min((elapsed - delay) / duration, 1);
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        el.style.setProperty('--complete', String(from + (to - from) * eased));

        if (t < 1) {
            requestAnimationFrame(step);
        } else {
            el.style.setProperty('--complete', String(to));
            setTimeout(() => {
                if (!cancelled) {
                    delete el.dataset['active'];
                    el.setAttribute('aria-checked', String(toState));
                    delete (el as HTMLElement & { _cancelToggle?: () => void })
                        ._cancelToggle;
                }
            }, 50);
        }
    }
    requestAnimationFrame(step);
}

function syncLiquidToggle(el: HTMLElement, state: boolean): void {
    el.style.setProperty('--complete', state ? '100' : '0');
    el.setAttribute('aria-checked', String(state));
}

// ── Menu management ──
type MenuPanel = HTMLElement;
let openMenu: MenuPanel | null = null;
let openMenuBtn: HTMLElement | null = null;

function closeAllMenus(): void {
    if (openMenu) {
        openMenu.classList.remove('visible');
        openMenu.inert = true;
        openMenuBtn?.setAttribute('aria-expanded', 'false');
        openMenu = null;
        openMenuBtn = null;
    }
}

function toggleMenu(menu: MenuPanel, triggerBtn: HTMLElement): void {
    if (openMenu === menu) {
        closeAllMenus();
        return;
    }
    closeAllMenus();
    menu.inert = false;
    menu.classList.add('visible');
    triggerBtn.setAttribute('aria-expanded', 'true');
    openMenu = menu;
    openMenuBtn = triggerBtn;
}

// ── Dock button handlers ──
btnVariant.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu(variantMenu, btnVariant);
});

btnPlatform.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu(platformMenu, btnPlatform);
});

btnSettings.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu(settingsMenu, btnSettings);
});

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if (openMenu && !openMenu.contains(e.target as Node)) {
        closeAllMenus();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllMenus();
        closeHelpModal();
    }
});

// ── Variant selection ──
document.querySelectorAll<HTMLElement>('.variant-option').forEach((btn) => {
    btn.addEventListener('click', () => {
        const v = btn.dataset['variant'] as ThemeKey;
        if (!v) return;
        currentTheme = v;
        // Update active states
        document
            .querySelectorAll('.variant-option')
            .forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        closeAllMenus();
        render(currentTheme, currentPlatform);
    });
});

// ── Platform selection ──
document.querySelectorAll<HTMLElement>('.platform-option').forEach((btn) => {
    btn.addEventListener('click', () => {
        const pl = btn.dataset['platform'] as PlatformKey;
        if (!pl) return;
        currentPlatform = pl;
        document
            .querySelectorAll('.platform-option')
            .forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        closeAllMenus();
        render(currentTheme, currentPlatform);
    });
});

// ── Dark mode toggle ──
toggleDark.addEventListener('click', () => {
    darkMode = !darkMode;
    animateLiquidToggle(toggleDark, darkMode);
    document.documentElement.dataset['theme'] = darkMode ? 'dark' : 'light';
    localStorage.setItem(LS_THEME, darkMode ? 'dark' : 'light');
    render(currentTheme, currentPlatform);
});

// ── Frosted glass toggle ──
toggleGlass.addEventListener('click', () => {
    frostedGlass = !frostedGlass;
    animateLiquidToggle(toggleGlass, frostedGlass);
    document.documentElement.dataset['glass'] = frostedGlass ? 'frosted' : '';
    localStorage.setItem(LS_GLASS, frostedGlass ? 'frosted' : 'clear');
});

// ── Help modal ──
function openHelpModal(): void {
    helpModal.inert = false;
    closeAllMenus();
}

function closeHelpModal(): void {
    helpModal.inert = true;
}

btnHelp.addEventListener('click', openHelpModal);
btnCloseHelp.addEventListener('click', closeHelpModal);
helpModalBackdrop.addEventListener('click', closeHelpModal);

// ── Populate help content ──
function buildHelpContent(): string {
    return `
      <div class="help-section">
        <div class="help-section-hd">
          <span class="help-section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </span>
          <h3 class="help-section-title">About this Playground</h3>
        </div>
        <div class="help-section-body">
          <p class="help-p">The <strong>Equinox Theme Playground</strong> is a live preview tool for the Equinox color theme across all supported platforms. Use the dock at the bottom to switch variants and platforms and see the theme rendered in context.</p>
        </div>
      </div>

      <div class="help-section">
        <div class="help-section-hd">
          <span class="help-section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
          </span>
          <h3 class="help-section-title">Theme Variants</h3>
        </div>
        <div class="help-section-body">
          <ul class="help-list">
            <li><strong>Dark Modern</strong> — Unified dark: editor and panels share one background. Calm blue-slate palette.</li>
            <li><strong>Dark Contrast</strong> — Split dark: editor and panels use separate background tones for structural clarity.</li>
            <li><strong>Light Soft</strong> — Unified light: cream-white base with soft shadows. Easy on the eyes for long sessions.</li>
            <li><strong>Light Contrast</strong> — Split light: sharper visual hierarchy, architectural separation of panels.</li>
          </ul>
        </div>
      </div>

      <div class="help-section">
        <div class="help-section-hd">
          <span class="help-section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </span>
          <h3 class="help-section-title">Platform Previews</h3>
        </div>
        <div class="help-section-body">
          <ul class="help-list">
            <li><strong>VS Code</strong> — Simulated editor with all color tokens applied: titlebar, activity bar, sidebar, editor, and status bar. The <em>accent color</em> appears on window borders, focus rings, and badges.</li>
            <li><strong>JetBrains IDE</strong> — Simulated IntelliJ-style editor (classic layout). The accent color drives hyperlinks and identifier-under-caret highlights in the ICLS scheme.</li>
            <li><strong>JetBrains Islands</strong> — Simulated IntelliJ New UI with the Islands layout: each panel floats as a separate rounded card over a desktop background. Requires a <em>.theme.json</em> in addition to the <em>.icls</em> color scheme.</li>
            <li><strong>macOS Terminal</strong> — Simulated terminal with ANSI 16-color output rendered in context, including all bright variants.</li>
          </ul>
        </div>
      </div>

      <div class="help-section">
        <div class="help-section-hd">
          <span class="help-section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </span>
          <h3 class="help-section-title">Settings</h3>
        </div>
        <div class="help-section-body">
          <ul class="help-list">
            <li><strong>Dark mode</strong> — Toggles the playground background between light and dark. Your preference is saved and restored automatically; on first visit it follows your OS/browser setting. Does not affect the theme preview — use the Variant selector to switch between dark and light theme variants.</li>
            <li><strong>Frosted glass</strong> — Switches the dock and menus from transparent liquid glass to a milky frosted appearance with heavier blur. Off by default; saved after your first change.</li>
            <li><strong>Help &amp; Wiki</strong> — Opens this guide. Accessible from the Settings menu in the dock.</li>
          </ul>
        </div>
      </div>

      <div class="help-section">
        <div class="help-section-hd">
          <span class="help-section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </span>
          <h3 class="help-section-title">Liquid Glass UI</h3>
        </div>
        <div class="help-section-body">
          <p class="help-p">The dock, menus, and modal use <strong>physics-based refraction</strong> via an SVG displacement map generated from Snell's law. A convex glass bezel bends the background, then a backdrop blur and saturation filter create the frosted effect. The liquid toggles use a goo filter and CSS custom properties to animate the blob transition.</p>
        </div>
      </div>

      <div class="help-section">
        <div class="help-section-hd">
          <span class="help-section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </span>
          <h3 class="help-section-title">Installing the Theme</h3>
        </div>
        <div class="help-section-body">
          <ul class="help-list">
            <li><strong>VS Code</strong> — Copy <em>dist/vscode/*.json</em> to your themes folder, then open <em>Preferences: Color Theme</em> and search "Equinox".</li>
            <li><strong>JetBrains (classic)</strong> — Copy <em>dist/jetbrains/*.icls</em> to your IDE's <em>colors/</em> folder, then go to <em>Settings → Editor → Color Scheme</em>.</li>
            <li><strong>JetBrains Islands (New UI)</strong> — Copy <em>dist/jetbrains/*-islands.icls</em> to <em>colors/</em> and <em>dist/jetbrains/themes/*.theme.json</em> to your IDE's <em>themes/</em> folder. Enable <em>New UI</em> and select the Equinox theme in <em>Settings → Appearance → Theme</em>.</li>
            <li><strong>macOS Terminal</strong> — Double-click any <em>.terminal</em> file in <em>dist/terminal/</em> and set it as default in <em>Terminal → Preferences → Profiles</em>.</li>
          </ul>
        </div>
      </div>
    `;
}

document.getElementById('help-body')!.innerHTML = buildHelpContent();

// ── Main render ──
function render(themeKey: ThemeKey, platform: PlatformKey): void {
    const entry = THEMES[themeKey];
    const previewEl = document.getElementById('preview-container');
    if (!previewEl) return;

    switch (platform) {
        case 'vscode':
            previewEl.innerHTML = renderVscode(entry);
            break;
        case 'jetbrains':
            previewEl.innerHTML = renderJetBrains(entry);
            break;
        case 'jetbrains-islands':
            previewEl.innerHTML = renderJetBrainsIslands(entry);
            break;
        case 'terminal':
            previewEl.innerHTML = renderTerminal(entry);
            break;
    }
}

// ── Initial active states ──
document
    .querySelector<HTMLElement>('.variant-option[data-variant="dark-modern"]')
    ?.classList.add('active');
document
    .querySelector<HTMLElement>('.platform-option[data-platform="vscode"]')
    ?.classList.add('active');

// ── Restore dark mode: saved preference > OS/browser preference ──
const savedTheme = localStorage.getItem(LS_THEME);
const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)');
darkMode =
    savedTheme === 'dark' || (savedTheme === null && prefersDark.matches);
document.documentElement.dataset['theme'] = darkMode ? 'dark' : 'light';
syncLiquidToggle(toggleDark, darkMode);

// Follow OS changes only when user hasn't overridden
prefersDark.addEventListener('change', (e) => {
    if (localStorage.getItem(LS_THEME) === null) {
        darkMode = e.matches;
        document.documentElement.dataset['theme'] = darkMode ? 'dark' : 'light';
        syncLiquidToggle(toggleDark, darkMode);
        render(currentTheme, currentPlatform);
    }
});

// ── Restore frosted glass: off by default, persist after first change ──
const savedGlass = localStorage.getItem(LS_GLASS);
frostedGlass = savedGlass === 'frosted';
document.documentElement.dataset['glass'] = frostedGlass ? 'frosted' : '';
syncLiquidToggle(toggleGlass, frostedGlass);

// ── Init glass distortion ──
GlassDistortion.initDock();
GlassDistortion.initPanel();

// ── Initial render ──
render(currentTheme, currentPlatform);
