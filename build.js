// @ts-check
const esbuild = require('esbuild');
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const RUNNER = path.join(__dirname, 'dist', '_build-runner.js');

async function main() {
    fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });

    await esbuild.build({
        entryPoints: ['src/build.ts'],
        bundle: true,
        outfile: RUNNER,
        platform: 'node',
        format: 'cjs',
        external: ['node:fs', 'node:path', 'fs', 'path'],
        logLevel: 'info',
    });

    execFileSync(process.execPath, [RUNNER], { stdio: 'inherit' });
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
