import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/collapsible-card/collapsible-card.js";
import "../src/components/card-body/card-body.js";
import "../src/components/card-image/card-image.js";
import "../src/components/card-footer/card-footer.js";
import "../src/components/button/button.js";

const SHAPES = ["sharp", "rounded"] as const;
const FLAVORS = ["default", "gradient"] as const;

const meta: Meta = {
  title: "Components/Collapsible Card",
  component: "zds-collapsible-card",
  tags: ["autodocs"],
  argTypes: {
    shape: { control: "inline-radio", options: SHAPES },
    flavor: { control: "inline-radio", options: FLAVORS },
    heading: { control: "text" },
    description: { control: "text" },
    expanded: { control: "boolean" },
  },
  args: { shape: "sharp", flavor: "default", heading: "Heading", description: "Description", expanded: false },
  render: (a) => html`
    <div style="width:385px">
      <zds-collapsible-card shape=${a.shape} flavor=${a.flavor} heading=${a.heading} description=${a.description} ?expanded=${a.expanded}>
        <zds-card-body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</zds-card-body>
      </zds-collapsible-card>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

const row = (children: unknown) => html`<div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap">${children}</div>`;

export const Playground: Story = {};

/** Collapsed shows the header alone; expanded reveals the body — roughly tripling the card's height. */
export const States: Story = {
  render: () =>
    row([false, true].map((expanded) => html`
      <div style="width:300px">
        <zds-collapsible-card heading="Heading" description="Description" ?expanded=${expanded}>
          <zds-card-body>Body content, revealed only while expanded.</zds-card-body>
        </zds-collapsible-card>
      </div>
    `)),
};

/** Figma's header has a real showDescription toggle; this element derives it from whether `description` is set. */
export const NoDescription: Story = {
  render: () => html`
    <div style="width:300px">
      <zds-collapsible-card heading="Heading, no description" expanded>
        <zds-card-body>Description omitted entirely — not just hidden.</zds-card-body>
      </zds-collapsible-card>
    </div>
  `,
};

/** Use gradient for at most one card in a group — it exists to single one out. */
export const Flavors: Story = {
  render: () =>
    row(FLAVORS.map((flavor) => html`
      <div style="width:300px">
        <zds-collapsible-card heading="Heading" description="Description" flavor=${flavor} expanded>
          <zds-card-body>${flavor}</zds-card-body>
        </zds-collapsible-card>
      </div>
    `)),
};

export const Shapes: Story = {
  render: () =>
    row(SHAPES.map((shape) => html`
      <div style="width:300px">
        <zds-collapsible-card heading="Heading" description="Description" shape=${shape} expanded>
          <zds-card-body>${shape}</zds-card-body>
        </zds-collapsible-card>
      </div>
    `)),
};

/** Listen for `toggle` to sync external state, or set `expanded` imperatively to drive it. */
export const ListenForToggle: Story = {
  render: () => html`
    <div style="width:320px">
      <zds-collapsible-card
        heading="Listened"
        description="Watch the console"
        @toggle=${(e: CustomEvent) => console.log("toggle", e.detail)}
      >
        <zds-card-body>Open devtools to see the toggle event fire.</zds-card-body>
      </zds-collapsible-card>
    </div>
  `,
};

/** A media body, filled only in the expanded variant — matching the spec's own per-variant body storage. */
export const WithImage: Story = {
  render: () => html`
    <div style="width:320px">
      <zds-collapsible-card heading="Heading" description="Description" expanded>
        <zds-card-body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</zds-card-body>
        <zds-card-image src="https://picsum.photos/seed/zds-collapsible/600/240" alt=""></zds-card-image>
        <zds-card-footer><zds-button flavour="primary">Button</zds-button></zds-card-footer>
      </zds-collapsible-card>
    </div>
  `,
};

/** Theming is a class, at any level, cascading to everything inside. */
export const ThemingCascade: Story = {
  render: () => {
    const panel = (cls: string, label: string) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary)">
        <div style="font:500 12px/1.4 system-ui;margin-bottom:8px;opacity:.7">${label || "base / light"}</div>
        <div style="width:260px">
          <zds-collapsible-card heading="Heading" description="Description" expanded>
            <zds-card-body>Themed via ancestor class</zds-card-body>
          </zds-collapsible-card>
        </div>
      </div>`;
    return html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
      ${panel("", "")}
      ${panel("mode-dark", "mode-dark")}
      ${panel("ext-companion", "ext-companion")}
    </div>`;
  },
};
