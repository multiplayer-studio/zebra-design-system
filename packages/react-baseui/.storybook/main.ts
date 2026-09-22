import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const HERE = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: { name: "@storybook/react-vite", options: {} },
  viteFinal: (cfg) => {
    // The icon font is linked in from ../icons, which is outside this package's
    // root. The production build inlines it, but the dev server refuses to
    // serve files outside the root unless told otherwise — without this, every
    // icon renders blank in dev only.
    cfg.server ??= {};
    cfg.server.fs ??= {};
    cfg.server.fs.allow = [...(cfg.server.fs.allow ?? []), resolve(HERE, "../.."), resolve(HERE, "../../..")];
    return cfg;
  },
};
export default config;
