import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/screen-header-bar/screen-header-bar.js";
import "../src/components/button/button.js";
import "../src/components/icon-button/icon-button.js";

const stack = (c: unknown) => html`<div style="display:grid;gap:16px;max-width:480px">${c}</div>`;
const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;
/** The bar is transparent: show it on the page surface it would sit on. */
const screen = (c: unknown) => html`<div style="background:var(--surface-page);border:1px dashed var(--border-subtle)">${c}</div>`;

const meta: Meta = {
  title: "Components/Screen Header Bar",
  component: "zds-screen-header-bar",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "The bar at the top of a pushed screen: a back button, the screen's title as a heading, and one trailing action in `slot=\"action\"`. Transparent; fills its container. `shape` reaches both the back button and the action. Fires `zds-back`. Overlaps Top App Bar (not built yet). Spec: specs/screen-header-bar." } } },
  argTypes: {
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    headingLevel: { control: "select", options: [1, 2, 3, 4, 5, 6] },
  },
  args: { title: "Add subscribers", showLeadingIcon: true, shape: "rounded", headingLevel: 1, backLabel: "Back" },
  render: (a) => html`<div style="max-width:480px">${screen(html`
    <zds-screen-header-bar title=${a.title} ?show-leading-icon=${a.showLeadingIcon} .showLeadingIcon=${a.showLeadingIcon}
      shape=${a.shape} heading-level=${a.headingLevel} back-label=${a.backLabel}
      @zds-back=${() => console.log("zds-back")}>
      <zds-button slot="action" size="medium">Save</zds-button>
    </zds-screen-header-bar>`)}</div>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Spec \`title\`: names the screen. A long title wraps; it is never truncated. */
export const Title: Story = {
  render: () => stack(html`
    ${screen(html`<zds-screen-header-bar title="Notifications"><zds-button slot="action" size="medium">Mark all read</zds-button></zds-screen-header-bar>`)}
    ${screen(html`<zds-screen-header-bar title="Subscriber preferences for the quarterly maintenance bulletin"><zds-button slot="action" size="medium">Save</zds-button></zds-screen-header-bar>`)}
  `),
};

/** Spec \`showLeadingIcon\`: on for a pushed screen; off on a root screen, where the heading takes the space. */
export const ShowLeadingIcon: Story = {
  render: () => stack(html`
    ${cap("true")}
    ${screen(html`<zds-screen-header-bar title="Add subscribers"><zds-button slot="action" size="medium">Save</zds-button></zds-screen-header-bar>`)}
    ${cap("false")}
    ${screen(html`<zds-screen-header-bar title="Subscribers" .showLeadingIcon=${false}><zds-button slot="action" size="medium" leading-icon="add">Add</zds-button></zds-screen-header-bar>`)}
  `),
};

/** Spec \`rounded\` (renamed \`shape\`): reaches both the back button and the action, so corners never mix. */
export const Shape: Story = {
  render: () => stack((["rounded", "sharp"] as const).map((s) => html`
    ${cap(s)}
    ${screen(html`<zds-screen-header-bar title="Add subscribers" shape=${s}><zds-button slot="action" size="medium">Save</zds-button></zds-screen-header-bar>`)}
  `)),
};

/** Spec \`actionSlot\`: one button or icon button, or none. Hover, press and focus (Tab) come from each control. */
export const Action: Story = {
  render: () => stack(html`
    ${cap("zds-button")}
    ${screen(html`<zds-screen-header-bar title="Edit route"><zds-button slot="action" size="medium" leading-icon="save">Save</zds-button></zds-screen-header-bar>`)}
    ${cap("zds-icon-button")}
    ${screen(html`<zds-screen-header-bar title="Shift report"><zds-icon-button slot="action" size="medium" flavour="subtle" icon="share" label="Share report"></zds-icon-button></zds-screen-header-bar>`)}
    ${cap("overflow menu")}
    ${screen(html`<zds-screen-header-bar title="Device details" shape="sharp"><zds-icon-button slot="action" size="medium" flavour="subtle" icon="more-vertical" label="More options"></zds-icon-button></zds-screen-header-bar>`)}
    ${cap("none")}
    ${screen(html`<zds-screen-header-bar title="About this device"></zds-screen-header-bar>`)}
  `),
};

/** \`heading-level\`: h1 by default; lower it when the bar sits inside a larger page. Looks the same at every level. */
export const HeadingLevel: Story = {
  render: () => stack(html`
    ${screen(html`<zds-screen-header-bar title="Inventory (h1)"><zds-button slot="action" size="medium">Scan</zds-button></zds-screen-header-bar>`)}
    ${screen(html`<zds-screen-header-bar title="Inventory (h2)" heading-level="2"><zds-button slot="action" size="medium">Scan</zds-button></zds-screen-header-bar>`)}
  `),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(360px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        ${cap(cls || "base / light")}
        <zds-screen-header-bar title="Add subscribers"><zds-button slot="action" size="medium">Save</zds-button></zds-screen-header-bar>
        <zds-screen-header-bar title="Shift report" shape="sharp"><zds-icon-button slot="action" size="medium" flavour="subtle" icon="share" label="Share report"></zds-icon-button></zds-screen-header-bar>
      </div>`)}
  </div>`,
};
