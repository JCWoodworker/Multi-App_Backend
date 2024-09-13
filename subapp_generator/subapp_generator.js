import fs from 'fs';
import promptSync from 'prompt-sync';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const prompt = promptSync();

console.log(chalk.blue('Create a subapp'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);

const subappName = prompt('Enter subapp name: ');

const subappDir = path.join(__parentDir, 'src/subapps', subappName);
fs.mkdirSync(subappDir);

const subdirectories = [
  'dto',
  'entities',
  'migrations',
  'resources',
  'types',
  'enums',
  'tests',
];

for (const subdir of subdirectories) {
  const subdirPath = path.join(subappDir, subdir);
  fs.mkdirSync(subdirPath);
  console.log(chalk.green(`Created subdirectory: ${subdir}`));
}

console.log(chalk.green(`Subapp ${subappName} created`));
