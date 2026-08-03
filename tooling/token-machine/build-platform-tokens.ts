import StyleDictionary from 'style-dictionary';

// Define your matrix with explicit types
const themes: string[] = ['default', 'alt-theme'];
const modes: string[] = ['light', 'dark', 'aaa'];

// Helper to capitalize the mode for class names (e.g., 'light' -> 'LightTokens')
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1) + 'Tokens';
};

async function buildTokens(): Promise<void> {
  console.log('Tokens build started...');

  for (const theme of themes) {
    for (const mode of modes) {
      console.log(`\nBuilding [${theme}] theme - [${mode}] mode...`);

      // 1. Initialize Style Dictionary for this specific combination
      const sd = new StyleDictionary({
        source: [
          'tokens-json/core/primitives.json',
          `tokens-json/${theme}/${mode}.json`
        ],
        platforms: {
          // Output CSS Variables
          css: {
            transformGroup: 'css',
            buildPath: `dist/${theme}/css/`,
            files: [{
              destination: `${mode}.css`,
              format: 'css/variables',
              filter: (token) => token.filePath.includes(`${theme}/${mode}.json`)
            }]
          },
          // Output JavaScript modules
          js: {
            transformGroup: 'js',
            buildPath: `dist/${theme}/js/`,
            files: [{
              destination: `${mode}.js`,
              format: 'javascript/module',
              filter: (token) => token.filePath.includes(`${theme}/${mode}.json`)
            }]
          },
          // Output iOS Swift Classes
          ios: {
            transformGroup: 'ios-swift',
            buildPath: `dist/${theme}/ios/`,
            files: [{
              destination: `${mode}.swift`,
              format: 'ios-swift/class.swift',
              className: capitalize(mode), 
              filter: (token) => token.filePath.includes(`${theme}/${mode}.json`)
            }]
          },
          // Output Flutter Dart Classes
          flutter: {
            transformGroup: 'flutter',
            buildPath: `dist/${theme}/flutter/`,
            files: [{
              destination: `${mode}.dart`,
              format: 'flutter/class.dart',
              className: capitalize(mode), 
              filter: (token) => token.filePath.includes(`${theme}/${mode}.json`)
            }]
          }
        }
      });

      // 2. Execute the build
      await sd.buildAllPlatforms();
    }
  }
  
  console.log('\n✅ All tokens built successfully!');
}

// Execute the async function and catch any potential errors
buildTokens().catch((error: unknown) => {
  console.error('Failed to build tokens:', error);
  process.exit(1);
});
