import type { Decorator, Preview } from "@storybook/web-components";
import { themes } from "@storybook/theming";
import { setCustomElementsManifest } from "@storybook/web-components";
import customElements from "../custom-elements.json";
import "../src";
import { Title, Description, Primary, Stories, ArgTypes } from "@storybook/addon-docs";
import { withActions } from "@storybook/addon-actions/decorator";
import React from "react";
import extractArgs from "./extractArgs";
import { createLitRenderer } from "cem-plugin-better-lit-types/storybook";

setCustomElementsManifest(customElements);

/**
 * The same three menus as packages/web-components' Storybook (Extension, Mode, Breakpoint), set as the attributes the
 * token layers select on, on the preview's root element so every story and docs page inherits them. The defaults
 * (Base, Desktop) remove their attribute.
 */
const withThemeAttributes: Decorator = (story, { globals }) => {
  const root = document.documentElement;
  const set = (attribute: string, value: string | undefined) =>
    value ? root.setAttribute(attribute, value) : root.removeAttribute(attribute);
  set("data-brand", globals.extension === "base" ? undefined : globals.extension);
  set("data-theme", globals.mode);
  set("data-breakpoint", globals.breakpoint === "desktop" ? undefined : globals.breakpoint);
  // The legacy tokens behind the page only know light and dark, so an AAA mode paints the Zebra surface itself.
  const aaa = String(globals.mode).startsWith("aaa");
  document.body.style.background = aaa ? "var(--surface-page)" : "";
  document.body.style.color = aaa ? "var(--foreground-primary)" : "";
  return story();
};

const preview: Preview = {
  globalTypes: {
    extension: {
      description: "Brand extension — sets data-brand",
      defaultValue: "base",
      toolbar: {
        title: "Extension",
        icon: "paintbrush",
        items: [
          { value: "base", title: "Base" },
          { value: "companion", title: "Companion" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Light / dark — sets data-theme",
      defaultValue: "light",
      toolbar: {
        title: "Mode",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "aaa-light", title: "AAA Light" },
          { value: "aaa-dark", title: "AAA Dark" },
        ],
        dynamicTitle: true,
      },
    },
    breakpoint: {
      description: "Size/typography mode — sets data-breakpoint",
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
  initialGlobals: { extension: "base", mode: "light", breakpoint: "desktop" },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    design: {
      type: "figma",
    },
    docs: {
      extractArgTypes: extractArgs(customElements),
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? themes.dark : themes.light,
      page: () => {
        return (
          <>
            <Title />
            <Primary />
            <Description />
            <ArgTypes />
            <Stories includePrimary={false} />
          </>
        );
      },
    },

    options: {
      storySort: {
        method: "alphabetical",
        order: ["Introduction", "Docs"],
        locales: "",
      },
    },
    status: {
      statuses: {
        designPending: {
          background: "#FEF0F1",
          color: "#F36070",
          description: "Design requires updates",
        },
        needsAttention: {
          background: "#FEF0F1",
          color: "#F36070",
          description: "Component requires updates",
        },
        inProgress: {
          background: "#FEF2E2",
          color: "#F5A230",
          description: "In progress",
        },
        ready: {
          background: "#ECFFF7",
          color: "#67B796",
          description: "Web Component ready to use",
        },
      },
    },
    viewport: {
      viewports: {
        android: {
          name: "Android",
          styles: {
            width: "360px",
            height: "640px",
          },
        },
        iPhone: {
          name: "iPhone 11 Pro",
          styles: {
            width: "375px",
            height: "812px",
          },
        },
      },
    },
  },
  decorators: [withActions, withThemeAttributes],
};

export default preview;

/// Parses slots in storybook correctly.
export const render = createLitRenderer({
  wrapSlots: true,
});
