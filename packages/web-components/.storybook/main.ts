import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/web-components-vite";

const HERE = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.ts"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: { name: "@storybook/web-components-vite", options: {} },
  viteFinal: (cfg) => {
    // Same reason as the React package: the icon font lives in ../icons.
    cfg.server ??= {};
    cfg.server.fs ??= {};
    cfg.server.fs.allow = [...(cfg.server.fs.allow ?? []), resolve(HERE, "../.."), resolve(HERE, "../../..")];
    return cfg;
  },
};
export default config;
