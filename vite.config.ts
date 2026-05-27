import { defineConfig } from 'vite';

export default defineConfig({
    root: 'playground',
    base: '/EquinoxTheme/',
    publicDir: '../images',
    build: {
        outDir: '../dist/playground',
        emptyOutDir: true,
    },
    server: {
        port: 5173,
        open: true,
        fs: { allow: ['..'] },
    },
});
