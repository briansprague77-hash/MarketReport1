import { execSync, spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

process.chdir(root);

const child = spawn(
  join(root, 'node_modules', '.bin', 'next'),
  ['dev', '-p', '3000'],
  { cwd: root, stdio: 'inherit', env: { ...process.env, PATH: `/Users/briansprague/local/node/bin:${process.env.PATH}` } }
);

child.on('exit', (code) => process.exit(code));
