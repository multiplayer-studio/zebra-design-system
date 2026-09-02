import * as path from 'path';
import { fileURLToPath } from 'url';
import config from '../config.json' assert { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN_MACHINE_DIR = path.resolve(__dirname, '..');

export const TOKEN_DIR = path.resolve(TOKEN_MACHINE_DIR, config.directories.tokenDir);
export const TEMP_DIR = path.resolve(TOKEN_MACHINE_DIR, config.directories.tempDir);
export const CSS_OUTPUT_DIR = path.resolve(TOKEN_MACHINE_DIR, config.directories.cssOutputDir);
export const JS_OUTPUT_DIR = path.resolve(TOKEN_MACHINE_DIR, config.directories.jsOutputDir);

export const COLOR_COLLECTIONS = config.collections.color;
export const SIZE_COLLECTIONS = config.collections.size;
export const TYPOGRAPHY_COLLECTIONS = config.collections.typography;
export const COLOR_MODES = config.modes.color;
export const BREAKPOINT_MODES = config.modes.breakpoint;
