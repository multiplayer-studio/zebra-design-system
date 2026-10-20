import * as React from "react";
import type { Preview, Decorator } from "@storybook/react";
import "../src/tokens/index.css";
import "@zebra-design-system/icons/icons.css"; // registers the @font-face blocks

/**
 * Theming is pure CSS: an `ext-*` class picks the brand extension, a `mode-*`
 * class picks light/dark. They are applied to a wrapper here exactly as a
 * consuming app would — there is no theme provider and nothing re-renders.
 */
const themed: Decorator = (Story, ctx) => {
  const { extension, mode, breakpoint } = ctx.globals;
  const className = [
    extension === "base" ? "" : `ext-${extension}`,
    `mode-${mode}`,
    breakpoint === "desktop" ? "" : `bp-${breakpoint}`,
  ].filter(Boolean).join(" ");

  return (
    <div className={className} style={{ padding: 24, background: "var(--surface-page)" }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [themed],
  globalTypes: {
    extension: {
      description: "Brand extension — adds an ext-* class",
      defaultValue: "base",
      toolbar: {
        title: "Extension", icon: "paintbrush", dynamicTitle: true,
        items: [
          { value: "base", title: "Base" },
          { value: "companion", title: "Companion" },
          { value: "target", title: "Target" },
        ],
      },
    },
    mode: {
      description: "Light / dark — adds a mode-* class",
      defaultValue: "light",
      toolbar: {
        title: "Mode", icon: "circlehollow", dynamicTitle: true,
        items: [{ value: "light", title: "Light" }, { value: "dark", title: "Dark" }],
      },
    },
    breakpoint: {
      description: "Size/typography mode — adds a bp-* class",
      defaultValue: "desktop",
      toolbar: {
        title: "Breakpoint", icon: "mobile", dynamicTitle: true,
        items: [
          { value: "desktop", title: "Desktop" },
          { value: "desktop-compact", title: "Desktop Compact" },
          { value: "tablet", title: "Tablet" },
          { value: "mobile", title: "Mobile" },
        ],
      },
    },
  },
  parameters: { controls: { expanded: true }, options: { storySort: { order: ["Theming", "Components", "Icons"] } } },
};
export default preview;
