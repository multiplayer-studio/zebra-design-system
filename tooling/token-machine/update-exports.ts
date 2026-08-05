import fs from 'fs/promises';
import path from 'path';

export async function updatePackageExports(themes: string[]): Promise<void> {
  console.log('📦 Updating package.json exports...');

  const packageJsonPath = path.resolve(__dirname, '../../packages/zebra-design-system-tokens/package.json');
  
  try {
    const packageData = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageData);

    // Clean up unnecessary root properties
    delete packageJson.types;
    
    // Set the main entry point to the default theme's unified index.js
    packageJson.main = "./dist/default/js/index.js";

    const exportsMap: Record<string, any> = {};

    // Dynamically build the import map for JS assets
    for (const theme of themes) {
      const exportPath = theme === 'default' ? '.' : `./${theme}`;
      
      exportsMap[exportPath] = {
        import: `./dist/${theme}/js/index.js`,
        require: `./dist/${theme}/js/index.js`,
        types: `./dist/${theme}/js/index.d.ts`,
        default: `./dist/${theme}/js/index.js`
      };
    }

    // Wildcard fallback for direct CSS file imports
    exportsMap["./css/*"] = "./dist/*/css/*";

    packageJson.exports = exportsMap;

    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
    console.log('✅ package.json exports dynamically updated!');

  } catch (error) {
    console.error('❌ Failed to update package.json exports:', error);
    throw error;
  }
}
