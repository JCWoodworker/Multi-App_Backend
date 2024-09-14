import chalk from 'chalk';
import { Subapp } from './Subapp.js';

const newSubapp = new Subapp();

console.log(chalk.blue('Welcome to the subapp generator!'));

newSubapp.createSubappName();
newSubapp.createSubappNickname();
newSubapp.createSubappDirectory();
try {
  await newSubapp.createSubDirectories();
} catch (error) {
  console.error(`Error creating subdirectories: ${error}`);
  process.exit(1);
}

console.log(chalk.green(`Subapp ${newSubapp.name} created`));
