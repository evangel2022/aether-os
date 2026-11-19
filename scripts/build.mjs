/**
 * Production build wrapper.
 *
 * Some Windows hosts deny esbuild's default OS-temp cleanup (the sandboxed
 * shell used to develop this demo did). Pointing child-process temp files at
 * the project-local `.tmp/` directory keeps `npm run build` self-contained and
 * does not change how the app behaves. The directory is gitignored.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localTemp = path.join(root, '.tmp');

mkdirSync(localTemp, { recursive: true });

const env = {
  ...process.env,
  TEMP: localTemp,
  TMP: localTemp,
  TMPDIR: localTemp,
};

function run(relativeBinary, args) {
  const result = spawnSync(process.execPath, [path.join(root, relativeBinary), ...args], {
    cwd: root,
    env,
    stdio: 'inherit',
  });

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run('node_modules/typescript/bin/tsc', ['--noEmit']);
run('node_modules/vite/bin/vite.js', ['build', ...process.argv.slice(2)]);
