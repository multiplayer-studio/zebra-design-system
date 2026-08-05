import StyleDictionary from 'style-dictionary';
import fs from 'fs/promises';
import path from 'path';
import { updatePackageExports } from './update-exports';

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1) + 'Tokens';
};

// Register a custom formatter to generate attribute-based CSS for modes
StyleDictionary.registerFormat({
  name: 'css/theme-aware',
  format: function ({ dictionary, options }) {
    const selector = options.selector || ':root';
    // Filter to only include the theme's semantic tokens, not the raw core primitives
        const variables = dictionary.allTokens
      .filter(token => token.filePath.includes(`${options.theme}/${options.mode}.json`))
      .map(token => {
        const value = token.$value !== undefined ? token.$value : token.value;
        return `  --${token.name}: ${value};`;
      })
      .join('\n');
    
    return `${selector} {\n${variables}\n}\n`;
  }
});

async function buildTokens(): Promise<void> {
  console.log('🚀 Initiating dynamic tokens compiler...');

  const sourceDir = path.resolve(__dirname, 'tokens-json');
  const distDir = path.resolve(__dirname, '../../packages/zebra-design-system-tokens/dist');

  // 1. Clean previous build
  console.log('🧹 Cleaning previous build artifacts...');
  await fs.rm(distDir, { recursive: true, force: true });

  // 2. Discover Themes
  const rootItems = await fs.readdir(sourceDir, { withFileTypes: true });
  const themes = rootItems
    .filter(item => item.isDirectory() && item.name !== 'core')
    .map(item => item.name);

  if (themes.length === 0) {
    console.warn('⚠️ No themes found in tokens-json directory.');
    return;
  }

  // 3. Iterate Themes
  for (const theme of themes) {
    const themeDir = path.resolve(sourceDir, theme);
    const themeFiles = await fs.readdir(themeDir);
    const modes = themeFiles
      .filter(file => file.endsWith('.json'))
      .map(file => path.basename(file, '.json'));

    // 4. Iterate Modes
    for (const mode of modes) {
      console.log(`Building [${theme}] theme - [${mode}] mode...`);
      const targetDistPath = path.join(distDir, theme);

      const sd = new StyleDictionary({
        source: [
          path.join(sourceDir, 'core/primitives.json'),
          path.join(sourceDir, `${theme}/${mode}.json`)
        ],
        platforms: {
          css: {
            transformGroup: 'css',
            buildPath: `${targetDistPath}/css/`,
            files: [{
              destination: `${mode}.css`, 
              format: 'css/theme-aware',
              options: {
                theme,
                mode,
                selector: (theme === 'default' && mode === 'light') 
                  ? ':root, [data-theme="default"][data-mode="light"]' 
                  : `[data-theme="${theme}"][data-mode="${mode}"]`
              }
            }]
          },
          js: {
            transformGroup: 'js',
            buildPath: `${targetDistPath}/js/`,
            files: [{
              destination: `${mode}.js`,
              format: 'javascript/esm',
              filter: (token) => token.filePath.includes(`${theme}/${mode}.json`)
            }]
          },
          ios: {
            transformGroup: 'ios-swift',
            buildPath: `${targetDistPath}/ios/`,
            files: [{
              destination: `${mode}.swift`,
              format: 'ios-swift/class.swift',
              className: capitalize(mode), 
              filter: (token) => token.filePath.includes(`${theme}/${mode}.json`)
            }]
          },
          flutter: {
            transformGroup: 'flutter',
            buildPath: `${targetDistPath}/flutter/`,
            files: [{
              destination: `${mode}.dart`,
              format: 'flutter/class.dart',
              className: capitalize(mode), 
              filter: (token) => token.filePath.includes(`${theme}/${mode}.json`)
            }]
          }
        }
      });

      await sd.buildAllPlatforms();
    }

    // --- Post-Processing: Bundle Unified Outputs for the Theme ---
    const targetDistPath = path.join(distDir, theme);

    // Bundle CSS into a single theme.css
    console.log(`📦 Bundling ${theme} CSS modes into theme.css...`);
    const cssDir = path.join(targetDistPath, 'css');
    let combinedCss = `/* Unified Theme CSS for ${theme} */\n\n`;
    for (const mode of modes) {
      const cssContent = await fs.readFile(path.join(cssDir, `${mode}.css`), 'utf-8');
      combinedCss += cssContent + '\n';
    }
    await fs.writeFile(path.join(cssDir, 'theme.css'), combinedCss, 'utf-8');

    // Bundle JS into a single index.js with TS Definitions
    console.log(`📦 Bundling ${theme} JS modes into index.js...`);
    const jsDir = path.join(targetDistPath, 'js');
    const indexJsContent = modes.map(mode => `import ${mode} from './${mode}.js';`).join('\n') +
      `\n\nexport default { ${modes.join(', ')} };\n` +
      `export { ${modes.join(', ')} };\n`;
    
    const indexDtsContent = modes.map(mode => `export const ${mode}: any;`).join('\n') +
      `\ndeclare const _default: { ${modes.map(m => `${m}: any`).join(', ')} };\nexport default _default;\n`;

    await fs.writeFile(path.join(jsDir, 'index.js'), indexJsContent, 'utf-8');
    await fs.writeFile(path.join(jsDir, 'index.d.ts'), indexDtsContent, 'utf-8');
  }
  
  // 5. Update package.json dynamically
  await updatePackageExports(themes);

  console.log('\n🎉 Pipeline complete! Tokens compiled and package.json exports are dynamically synced.');
}

buildTokens().catch((error: unknown) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
