import chalk from 'chalk';
import { Subapp } from './Subapp.js';

console.log(chalk.blue('Welcome to the subapp generator!'));

async function main() {
  try {
    const subapp = await Subapp.create();
    if (subapp) {
      console.log(chalk.green('Subapp created successfully!'));
    }
  } catch (error) {
    console.error(`Error creating subapp: ${error}`);
  }
}

main();
