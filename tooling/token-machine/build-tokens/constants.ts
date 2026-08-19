import * as path from 'path';
import config from '../config.json' assert { type: 'json' };

export const TOKEN_DIR = config.directories.tokenDir;
export const TEMP_DIR = config.directories.tempDir;
export const CSS_OUTPUT_DIR = config.directories.cssOutputDir;
export const FLUTTER_OUTPUT_DIR = config.directories.flutterOutputDir;
export const JS_OUTPUT_DIR = config.directories.jsOutputDir;
export const FLUTTER_LIB_DIR = path.join(FLUTTER_OUTPUT_DIR, 'lib');
export const FLUTTER_BB_DIR = path.join(FLUTTER_LIB_DIR, 'building_blocks');

export const COLOR_COLLECTIONS = config.collections.color;
export const SIZE_COLLECTIONS = config.collections.size;
export const TYPOGRAPHY_COLLECTIONS = config.collections.typography;
export const COLOR_MODES = config.modes.color;
export const BREAKPOINT_MODES = config.modes.breakpoint;
