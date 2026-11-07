// Bundles every zds-* element, and Lit, into one script the guide can load.
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../../packages/web-components");

export default {
  root,
  logLevel: "warn",
  build: {
    outDir: resolve(import.meta.dirname, "dist"),
    emptyOutDir: false,
    lib: { entry: resolve(root, "src/index.ts"), formats: ["iife"], name: "ZDS", fileName: () => "zds.js" },
  },
};
