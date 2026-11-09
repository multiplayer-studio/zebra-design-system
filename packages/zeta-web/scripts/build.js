// build.js
import { execSync } from 'child_process';
import { copyFileSync, cpSync } from 'fs';

try {
  execSync('tsc -P tsconfig.build.json', { stdio: 'inherit' });
  execSync('npx clean-css-cli ./src/index.css -o ./dist/index.css', { stdio: 'inherit' });

  copyFileSync('src/generated/tokens/semantics.css', 'dist/semantics.css');
  copyFileSync('src/generated/tokens/primitives.css', 'dist/primitives.css');

  // The Zebra glyph assets: tsc compiles glyphs.ts but the css + woff2 beside
  // it are imported by component styles ("../../generated/zebra-icons/…"),
  // so they must ship too or consumers cannot bundle the package.
  cpSync('src/generated/zebra-icons', 'dist/generated/zebra-icons', {
    recursive: true,
    filter: src => !src.endsWith('.ts')
  });

  execSync('npx tsx scripts/add-declarations.ts --silent', { stdio: 'inherit' });
} catch (err) {
  console.error('Build failed:', err.message, err);
  process.exit(1);
}
