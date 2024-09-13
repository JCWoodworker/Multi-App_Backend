import fs from 'fs';
import path from 'path';
import promptSync from 'prompt-sync';
import chalk from 'chalk';
import { exec } from 'child_process';
import { subdirectories } from './constants.js';
import { Subapp } from './Subapp.js';

const prompt = promptSync();
const newSubapp = new Subapp();

console.log(chalk.blue('Welcome to the subapp generator!'));

const __parentDir = newSubapp.getParentDir();
const subappName = newSubapp.getSubappName();

const subappDir = path.join(__parentDir, 'src/subapps', subappName);
fs.mkdirSync(subappDir);

const tableNamesInput = prompt(
  'Enter comma-separated table names using snake_case for each. \
  Leave blank and press ENTER if you do not wish to create any \
  migrations or entities at this time: ',
);

console.log(chalk.yellow('\nCreating subdirectories...'));
for (const subdir of subdirectories) {
  const subdirPath = path.join(subappDir, subdir);
  fs.mkdirSync(subdirPath);

  if (subdir === 'migrations') {
    if (tableNamesInput.trim() !== '') {
      const tableNames = tableNamesInput
        .split(',')
        .map((name) => name.trim().toLowerCase());

      for (let i = 0; i < tableNames.length; i++) {
        const migrationName = `${tableNames[i]}`;
        const command = `npx typeorm migration:create ${subappDir}/migrations/create-${migrationName}`;

        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing TypeORM command: ${error}`);
            return;
          }
          if (stderr) {
            console.error(`TypeORM command stderr: ${stderr}`);
          }
          console.log(stdout);
          console.log(
            chalk.green(`Created migration file for: ${tableNames[i]}`),
          );
        });
      }
    }
  }
  console.log(chalk.green(`Created subdirectory: ${subdir}`));
}

console.log(chalk.green(`Subapp ${subappName} created`));
