import fs from 'fs';
import path from 'path';
import promptSync from 'prompt-sync';
import chalk from 'chalk';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

import { subdirectories } from './constants.js';
import { sanitizeName } from './utilities.js';

const prompt = promptSync();

export class Subapp {
  constructor() {
    name: '';
    nickName: '';
  }

  createSubappName() {
    const rawName = prompt(chalk.blue('Enter subapp name: ')).toLowerCase();
    return (this.name = sanitizeName(rawName));
  }

  createSubappNickname() {
    const rawNickname = prompt(
      chalk.blue('Enter subapp nickname: '),
    ).toUpperCase();
    return (this.nickName = sanitizeName(rawNickname));
  }
  getParentDirectoryPath() {
    return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  }

  getSubappDirectoryPath() {
    const parentDirectory = this.getParentDirectoryPath();
    return path.join(parentDirectory, 'src/subapps', this.name);
  }

  createSubappDirectory() {
    fs.mkdirSync(this.getSubappDirectoryPath());
  }

  getTableAndEntityNames() {
    const tableNamesInput = prompt(
      chalk.blue(
        'Enter comma-separated table names using snake_case for each. * Leave blank and press ENTER if you do not wish to create any migrations or entities at this time.--> ',
      ),
    );

    if (tableNamesInput.trim() === '') {
      return [];
    }

    const tableNames = tableNamesInput
      .split(',')
      .map((name) => name.trim().replace(/ /g, '_').toLowerCase());

    return tableNames;
  }

  async createSubDirectories() {
    const tableAndEntityNames = this.getTableAndEntityNames();
    console.log(chalk.yellow('\nCreating subdirectories...'));

    for (const subdir of subdirectories) {
      const subdirPath = path.join(this.getSubappDirectoryPath(), subdir);
      fs.mkdirSync(subdirPath);

      if (subdir === 'migrations') {
        if (tableAndEntityNames.length > 0) {
          tableAndEntityNames.map((tableName) => {
            const command = `npx typeorm migration:create \
              ${this.getSubappDirectoryPath()}/migrations/create-table-${tableName}.migration`;

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
                chalk.green(`Created migration file for: ${tableName}`),
              );
            });
          });
        }
      }
      console.log(chalk.green(`Created subdirectory: ${subdir}`));
    }
  }
}
