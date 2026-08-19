/// <reference types="vite/client" />

// zebra-design-system-tokens ships plain CSS files behind its package.json `exports`
// map (no .css extension in the import specifier), so TypeScript needs an explicit
// module declaration — vite/client's built-in `*.css` ambient module doesn't match.
declare module 'zebra-design-system-tokens/css/*';
