import * as fs from 'fs';
import * as path from 'path';
import { TOKEN_DIR } from './constants.ts';

export function dashToCamel(str: string): string {
  return str.replace(/[-_]([a-zA-Z0-9])/g, (g) => g[1].toUpperCase());
}

export function getSourceFilesForCollection(collection: string, theme: string, mode: string): string[] {
  const files: string[] = [];

  const defaultPath = path.join(TOKEN_DIR, `${collection}-${mode}.json`);
  if (fs.existsSync(defaultPath)) {
    files.push(defaultPath);
  }

  if (theme !== 'default') {
    const themedPath = path.join(TOKEN_DIR, `${collection}-${theme}-${mode}.json`);
    if (fs.existsSync(themedPath)) {
      console.log(`     - Found themed override: ${path.basename(themedPath)}`);
      files.push(themedPath);
    }
  }
  return files;
}

export function readJsObjectFragment(filePath: string): string {
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8').trim();
}
