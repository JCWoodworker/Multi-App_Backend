import fs from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import chalk from 'chalk';
import { exec, spawn } from 'child_process';
import { fileURLToPath } from 'url';

import { subdirectories } from './constants.js';
import { sanitizeName } from './utilities.js';

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
    try {
      await this.generateResources();
    } catch (error) {
      console.error(`Error : ${error}`);
      process.exit(1);
    }

    try {
      await this.createSubDirectories();
      await this.generateMigrations();
      await this.moveSpecFilesToTests();
      await this.renameMigrationFiles();
    } catch (error) {
      console.error(`Error : ${error}`);
      process.exit(1);
    }
  }

  createSubappName() {
    const rawName = readlineSync.question(chalk.blue('Enter subapp name: ')).toLowerCase();
    return (this.name = sanitizeName(rawName));
  }

  createSubappNickname() {
    const rawNickname = readlineSync.question(
      chalk.blue('Enter subapp nickname: '),
    ).toUpperCase();
    return (this.nickName = sanitizeName(rawNickname));
  }

  createDirectory() {
    fs.mkdirSync(this.getSubappDirectoryPath());
  }
  getParentDirectoryPath() {
    return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  }

  getSubappDirectoryPath() {
    const parentDirectory = this.getParentDirectoryPath();
    return path.join(parentDirectory, 'src/subapps', this.name);
  }

  getTableAndEntityNames() {
    const tableNamesInput = readlineSync.question(
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

    const command = `nest generate resource subapps/${this.name}/${this.name} --flat`;
    const childProcess = spawn('npx', command.split(' '), { stdio: 'inherit' });

    const { code } = await new Promise((resolve, reject) => {
      childProcess.on('close', (code) => {
        resolve({ code });
      });
      childProcess.on('error', (error) => {
        reject(error);
      });
    });

    if (code === 0) {
      console.log(
        chalk.green(
          `Created Module, Controller, Service, DTO, and entity for ${this.name}`,
        ),
      );
    } else {
      console.error(chalk.red(`Error generating NestJS resource`));
    }
  }

  async generateSubControllers() {}
  async generateSubServices() {}

  async moveSpecFilesToTests() {
    const subappDirPath = this.getSubappDirectoryPath();
    const testDirPath = path.join(subappDirPath, 'tests');

    try {
      const files = await fs.promises.readdir(subappDirPath);

      for (const file of files) {
        if (file.endsWith('.spec.ts')) {
          const currentPath = path.join(subappDirPath, file);
          const newPath = path.join(testDirPath, file);

          await fs.promises.rename(currentPath, newPath);
          console.log(chalk.green(`Moved ${file} to tests folder`));
        }
      }
    } catch (error) {
      console.error(chalk.red(`Error moving spec files: ${error.message}`));
    }
  }

  async renameMigrationFiles() {
    const subappDirPath = this.getSubappDirectoryPath();
    const migrationsDirPath = path.join(subappDirPath, 'migrations');

    try {
      const files = await fs.promises.readdir(migrationsDirPath);

      for (const file of files) {
        if (file.endsWith('.migration.ts')) {
          continue;
        }

        if (file.endsWith('.ts')) {
          const currentPath = path.join(migrationsDirPath, file);
          const newFileName = file.replace('.ts', '.migration.ts');
          const newPath = path.join(migrationsDirPath, newFileName);

          await fs.promises.rename(currentPath, newPath);
          console.log(chalk.green(`Renamed ${file} to ${newFileName}`));
        }
      }
    } catch (error) {
      console.error(
        chalk.red(`Error renaming migration files: ${error.message}`),
      );
    }
  }
}
