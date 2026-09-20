import type { StorybookConfig } from "@storybook/web-components-vite";
import { mergeConfig } from "vite";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
    "@etchteam/storybook-addon-status",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      server: {
        fs: {
          allow: [
            path.resolve(__dirname, '..'),
            path.resolve(__dirname, '../../../node_modules'),
          ],
        },
      },
    });
  },
  staticDirs: ["../assets/"],
};
export default config;
