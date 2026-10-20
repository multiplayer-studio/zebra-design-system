import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/card/card.js";
import "../src/components/card-heading/card-heading.js";
import "../src/components/card-body/card-body.js";
import "../src/components/card-image/card-image.js";
import "../src/components/card-footer/card-footer.js";
import "../src/components/avatar/avatar.js";
import "../src/components/button/button.js";

const SHAPES = ["sharp", "rounded"] as const;
const IMAGE = "https://picsum.photos/seed/zds-card/600/300";

const meta: Meta = {
  title: "Components/Card",
  component: "zds-card",
  tags: ["autodocs"],
  argTypes: {
    shape: { control: "inline-radio", options: SHAPES },
    hasHeader: { control: "boolean" },
    hasFooter: { control: "boolean" },
  },
  args: { shape: "sharp", hasHeader: true, hasFooter: true },
  render: (a) => html`
    <div style="width:330px">
      <zds-card shape=${a.shape} ?has-header=${a.hasHeader} ?has-footer=${a.hasFooter}>
        <zds-card-heading slot="header" heading="Heading" subheading="Subheading">
          <zds-avatar slot="leading" size="small" type="initials" initials="AA" .showClose=${false} .showStatus=${false}></zds-avatar>
        </zds-card-heading>
        <zds-card-body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</zds-card-body>
        <zds-card-footer slot="footer"><zds-button flavour="primary">Button</zds-button></zds-card-footer>
      </zds-card>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

const row = (children: unknown) => html`<div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap">${children}</div>`;

export const Playground: Story = {};

/** Square or softened corners; content clips to whichever is chosen. */
export const Shapes: Story = {
  render: () =>
    row(SHAPES.map((shape) => html`
      <div style="width:280px">
        <zds-card shape=${shape}>
          <zds-card-heading slot="header" heading="Heading" subheading="Subheading"></zds-card-heading>
          <zds-card-body>${shape}</zds-card-body>
          <zds-card-footer slot="footer"><zds-button flavour="primary">Button</zds-button></zds-card-footer>
        </zds-card>
      </div>
    `)),
};

/** Header and footer can each be switched off; the body slot has no toggle. */
export const HeaderAndFooterToggles: Story = {
  render: () => row(html`
    <div style="width:260px">
      <zds-card>
        <zds-card-heading slot="header" heading="Both slots"></zds-card-heading>
        <zds-card-body>has-header + has-footer</zds-card-body>
        <zds-card-footer slot="footer"><zds-button flavour="primary">Button</zds-button></zds-card-footer>
      </zds-card>
    </div>
    <div style="width:260px">
      <zds-card .hasFooter=${false}>
        <zds-card-heading slot="header" heading="No footer"></zds-card-heading>
        <zds-card-body>has-footer=false</zds-card-body>
      </zds-card>
    </div>
    <div style="width:260px">
      <zds-card .hasHeader=${false}>
        <zds-card-body>has-header=false — media-led cards want this, so the image meets the top edge.</zds-card-body>
        <zds-card-footer slot="footer"><zds-button flavour="primary">Button</zds-button></zds-card-footer>
      </zds-card>
    </div>
  `),
};

/** One action fills the width; two share the row with a gap. */
export const FooterActions: Story = {
  render: () => row(html`
    <div style="width:260px">
      <zds-card>
        <zds-card-heading slot="header" heading="One action"></zds-card-heading>
        <zds-card-body>actions = 1</zds-card-body>
        <zds-card-footer slot="footer"><zds-button flavour="primary">Button</zds-button></zds-card-footer>
      </zds-card>
    </div>
    <div style="width:260px">
      <zds-card>
        <zds-card-heading slot="header" heading="Two actions"></zds-card-heading>
        <zds-card-body>actions = 2</zds-card-body>
        <zds-card-footer slot="footer">
          <zds-button flavour="outline">Cancel</zds-button>
          <zds-button flavour="primary">Button</zds-button>
        </zds-card-footer>
      </zds-card>
    </div>
  `),
};

/** A media-led card: no header, an image leading the body. */
export const WithImage: Story = {
  render: () => html`
    <div style="width:300px">
      <zds-card .hasHeader=${false}>
        <zds-card-image src=${IMAGE} alt=""></zds-card-image>
        <zds-card-body>
          <zds-card-heading heading="Media card" subheading="A second heading inside the body"></zds-card-heading>
        </zds-card-body>
        <zds-card-footer slot="footer"><zds-button flavour="primary">Button</zds-button></zds-card-footer>
      </zds-card>
    </div>
  `,
};

/** Theming is a class, at any level, cascading to everything inside. */
export const ThemingCascade: Story = {
  render: () => {
    const panel = (cls: string, label: string) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary)">
        <div style="font:500 12px/1.4 system-ui;margin-bottom:8px;opacity:.7">${label || "base / light"}</div>
        <div style="width:240px">
          <zds-card>
            <zds-card-heading slot="header" heading="Heading"></zds-card-heading>
            <zds-card-body>Themed via ancestor class</zds-card-body>
            <zds-card-footer slot="footer"><zds-button flavour="primary">Button</zds-button></zds-card-footer>
          </zds-card>
        </div>
      </div>`;
    return html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
      ${panel("", "")}
      ${panel("mode-dark", "mode-dark")}
      ${panel("ext-companion", "ext-companion")}
    </div>`;
  },
};
