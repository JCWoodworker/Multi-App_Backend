import path from 'path';
import promptSync from 'prompt-sync';
import { fileURLToPath } from 'url';

const prompt = promptSync();

export class Subapp {
  constructor() {
    name: '';
    nickName: '';
  }

  getSubappName() {
    this.name = prompt('Enter subapp name: ').toLowerCase();
    return this.name;
  }
  getParentDir() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const __parentDir = path.dirname(__dirname);
    return __parentDir;
  }
}
