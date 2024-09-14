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
  name = '';
  nickName = '';

  constructor() {}

  static async create() {
    const subapp = new Subapp();
    await subapp.initialize();
    return subapp;
  }

  async initialize() {
    this.createSubappName();
    this.createSubappNickname();
    this.createSubappDirectory();
    try {
      await this.createSubDirectories();
      await this.generateMigrations();
      await this.generateResources();
    } catch (error) {
      console.error(`Error : ${error}`);
      process.exit(1);
    }
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
    console.log(chalk.yellow('\nCreating subdirectories...'));

    for (const subdir of subdirectories) {
      const subdirPath = path.join(this.getSubappDirectoryPath(), subdir);
      fs.mkdirSync(subdirPath);

      if (subdir === subdirectories[subdirectories.length - 1]) {
        console.log(chalk.green(`Created subdirectory: ${subdir}\n`));
      } else {
        console.log(chalk.green(`Created subdirectory: ${subdir}`));
      }
    }
  }

  async generateMigrations() {
    const migrationPromises = [];
    const tableAndEntityNames = this.getTableAndEntityNames();

    if (tableAndEntityNames.length > 0) {
      tableAndEntityNames.forEach((tableName) => {
        const command = `npx typeorm migration:create \
          ${this.getSubappDirectoryPath()}/migrations/create-table-${tableName}`;

        const migrationPromise = new Promise((resolve, reject) => {
          exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing TypeORM command: ${error}`);
              reject(error);
              return;
            }
            if (stderr) {
              console.error(`TypeORM command stderr: ${stderr}`);
            }
            console.log(
              chalk.green(`Created migration file for: ${tableName}`),
            );
            resolve();
          });
        });
        migrationPromises.push(migrationPromise);
      });
    }
    console.log('');
    await Promise.all(migrationPromises);
    console.log('');
  }

  //TODO
  async generateResources() {
    console.log(chalk.yellow('\nGenerating resources...'));
  }
  async generateSubControllers() {}
  async generateSubServices() {}
}
