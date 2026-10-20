import type { Preview, Decorator } from "@storybook/web-components";
import { html } from "lit";
import "../src/tokens/index.css";
import "@zebra-design-system/icons/icons.css"; // registers the @font-face blocks
import "../src/index.js";

/**
 * Theming is pure CSS: an `ext-*` class picks the brand extension and a
 * `mode-*` class picks light/dark. Both are applied to a wrapper element here,
 * which is exactly how a consuming app would do it — there is no JS theme
 * provider, and nothing re-renders when they change.
 */
const themed: Decorator = (story, ctx) => {
  const { extension, mode, breakpoint } = ctx.globals;
  const classes = [
    extension === "base" ? "" : `ext-${extension}`,
    `mode-${mode}`,
    breakpoint === "desktop" ? "" : `bp-${breakpoint}`,
  ].filter(Boolean).join(" ");

  return html`
    <div class=${classes} style="padding:24px;background:var(--surface-page);">
      ${story()}
    </div>
  `;
};

const preview: Preview = {
  decorators: [themed],
  globalTypes: {
    extension: {
      description: "Brand extension — adds an ext-* class",
      defaultValue: "base",
      toolbar: {
        title: "Extension",
        icon: "paintbrush",
        items: [
          { value: "base", title: "Base" },
          { value: "companion", title: "Companion" },
          { value: "target", title: "Target" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Light / dark — adds a mode-* class",
      defaultValue: "light",
      toolbar: {
        title: "Mode",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    breakpoint: {
      description: "Size/typography mode — adds a bp-* class",
      defaultValue: "desktop",
      toolbar: {
        title: "Breakpoint",
        icon: "mobile",
        items: [
          { value: "desktop", title: "Desktop" },
          { value: "desktop-compact", title: "Desktop Compact" },
          { value: "tablet", title: "Tablet" },
          { value: "mobile", title: "Mobile" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: { expanded: true },
    options: { storySort: { order: ["Theming", "Components", "Icons"] } },
  },
};
export default preview;
