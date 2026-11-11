import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/scrim/scrim.js";
import "../src/components/button/button.js";

const TONES = ["scrim", "modal"] as const;

/** A sample page for the scrim to cover, so the dim reads. */
const page = (inner: unknown) => html`
  <div
    style="position:relative;width:640px;height:400px;overflow:hidden;box-sizing:border-box;
      background:var(--surface-page);color:var(--foreground-primary);
      border:var(--stroke-thin) solid var(--border-default);padding:var(--space-lg);
      display:grid;align-content:start;gap:var(--space-md);font:var(--text-body-medium)"
  >
    <strong style="font:var(--text-title-medium)">Printers</strong>
    <span>ZD621 · Ready</span>
    <span>ZT411 · Paper out</span>
    <span>ZQ630 · Offline</span>
    ${inner}
  </div>
`;

const meta: Meta = {
  title: "Components/Scrim",
  component: "zds-scrim",
  tags: ["autodocs"],
  argTypes: { tone: { control: "inline-radio", options: TONES } },
  args: { tone: "scrim" },
  render: (a) => page(html`<zds-scrim tone=${a.tone}></zds-scrim>`),
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** scrim dims the page; modal hides it. */
export const Tones: Story = {
  render: () => html`
    <div style="display:grid;gap:24px">
      ${TONES.map((t) => page(html`<zds-scrim tone=${t}></zds-scrim>`))}
    </div>
  `,
};

/** Under a custom overlay: a click on the scrim closes it. */
export const UnderCustomOverlay: Story = {
  render: () => {
    const toggle = (e: Event, open: boolean) => {
      const root = (e.currentTarget as HTMLElement).closest("[data-overlay-demo]")!;
      root.querySelectorAll<HTMLElement>("[data-overlay]").forEach((el) => (el.hidden = !open));
    };
    return html`<div data-overlay-demo>
      ${page(html`
        <zds-button style="position:absolute;inset-inline-end:var(--space-lg);inset-block-start:var(--space-lg)"
          @click=${(e: Event) => toggle(e, true)}>Open</zds-button>
        <zds-scrim data-overlay @click=${(e: Event) => toggle(e, false)}></zds-scrim>
        <div data-overlay role="dialog" aria-label="Printer details"
          style="position:absolute;inset:auto var(--space-lg) var(--space-lg) auto;width:280px;padding:var(--space-lg);
            background:var(--surface-overlay);border-radius:var(--radius-element-md);color:var(--foreground-primary);
            box-shadow:var(--shadow-large-x) var(--shadow-large-y) var(--shadow-large-blur) var(--shadow-soft)">
          Click the scrim to close.
        </div>
      `)}
    </div>`;
  },
};

/** The tokens follow the nearest mode or extension class. */
export const Dark: Story = {
  render: () => html`
    <div class="mode-dark" style="display:grid;gap:24px">
      ${TONES.map((t) => page(html`<zds-scrim tone=${t}></zds-scrim>`))}
    </div>
  `,
};
