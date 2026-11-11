import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaScrim } from "../../components/scrim/scrim.js";
import { html } from "lit";
import "../../components/scrim/scrim.js";

const page = (tone: string) => html`
  <div
    style="position: relative; width: 640px; height: 400px; overflow: hidden; box-sizing: border-box;
      background: var(--surface-page); color: var(--foreground-primary); border: var(--stroke-thin) solid var(--zebra-border-default);
      padding: var(--space-lg); display: grid; align-content: start; gap: var(--space-md); font: var(--text-body-medium)"
  >
    <strong style="font: var(--text-title-medium)">Printers</strong>
    <span>ZD621 · Ready</span>
    <span>ZT411 · Paper out</span>
    <span>ZQ630 · Offline</span>
    <zeta-scrim tone=${tone}></zeta-scrim>
  </div>
`;

const meta: Meta<ZetaScrim> = {
  title: "Components/Scrim",
  component: "zeta-scrim",
  args: {
    tone: "scrim"
  },
  argTypes: {
    tone: { options: ["scrim", "modal"], control: { type: "inline-radio" } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8221-400"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

/** One scrim over a sample page, filling its positioned parent. */
export const Scrim: StoryObj<ZetaScrim> = {
  render: args => page(args.tone)
};

/** `scrim` dims the page; `modal` hides it. */
export const Tones: StoryObj<ZetaScrim> = {
  render: () => html`<div style="display: grid; gap: 24px">${page("scrim")}${page("modal")}</div>`
};
