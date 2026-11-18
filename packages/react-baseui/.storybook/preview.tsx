import * as React from "react";
import type { Preview, Decorator } from "@storybook/react";
import "../src/tokens/index.css";
import "@zebra-design-system/icons/icons.css"; // registers the @font-face blocks

/**
 * Theming is pure CSS: data attributes pick the brand extension, the mode and the
 * size. They are applied to a wrapper here exactly as a consuming app would — there
 * is no theme provider and nothing re-renders. The ext-*, mode-* and bp-* classes
 * are the same scopes.
 */
const themed: Decorator = (Story, ctx) => {
  const { extension, mode, breakpoint } = ctx.globals;
  const scope = {
    "data-theme-mode": mode,
    "data-theme-ext": extension,
    "data-size-mode": breakpoint.replace(/^desktop-/, ""),
  };

  // Portalled menus mount on <body>, outside this wrapper, so the root carries the scope too, as an app's would.
  React.useEffect(() => {
    const root = document.documentElement;
    Object.entries(scope).forEach(([name, value]) => root.setAttribute(name, value));
    return () => Object.keys(scope).forEach((name) => root.removeAttribute(name));
  }, [mode, extension, breakpoint]);

  return (
    <div {...scope} style={{ padding: 24, background: "var(--surface-page)", color: "var(--foreground-primary)" }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [themed],
  globalTypes: {
    extension: {
      description: "Brand extension — sets data-theme-ext",
      defaultValue: "base",
      toolbar: {
        title: "Extension", icon: "paintbrush", dynamicTitle: true,
        items: [
          { value: "base", title: "Base" },
          { value: "companion", title: "Companion" },
        ],
      },
    },
    mode: {
      description: "Light / dark — sets data-theme-mode",
      defaultValue: "light",
      toolbar: {
        title: "Mode", icon: "circlehollow", dynamicTitle: true,
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "aaa-light", title: "AAA Light" },
          { value: "aaa-dark", title: "AAA Dark" },
        ],
      },
    },
    breakpoint: {
      description: "Size/typography mode — sets data-size-mode",
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
  parameters: {
    controls: { expanded: true },
    options: { storySort: { order: ["Theming", "Components", "Icons"] } },
    // Accessibility checks run when asked (Accessibility panel → Run test),
    // not after every render. Automatic runs scan the whole <body> once per
    // rendered story, so a docs page re-scans itself once per story — the
    // Table, Navigation Rail and Select docs pinned a CPU core indefinitely —
    // and every result is kept, growing the heap as you browse.
    a11y: { manual: true },
  },
};
export default preview;
