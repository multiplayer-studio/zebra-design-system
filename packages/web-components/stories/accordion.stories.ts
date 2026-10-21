import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/accordion/accordion.js";
import "../src/components/accordion/accordion-item.js";

type Row = { value: string; title: string; content: string; selected?: boolean; disabled?: boolean };
const FAQ: Row[] = [
  { value: "returns", title: "Returns and refunds", content: "Return any unused item within 30 days of delivery. Refunds reach the original payment method within five working days of the item arriving back at the warehouse." },
  { value: "delivery", title: "Delivery times", content: "Standard delivery takes two to four working days. Orders placed before 2pm on a working day ship the same day." },
  { value: "tracking", title: "Tracking an order", content: "A tracking link is emailed as soon as the parcel leaves the warehouse. It also appears under Orders in your account." },
  { value: "warranty", title: "Device warranty", content: "Every scanner carries a two-year manufacturer warranty covering defects in materials and workmanship." },
];
const ZONES: Row[] = [
  { value: "aisle-1", title: "Aisle 1 — Chilled", content: "12 bays, 4 open tasks. Last counted 08:40 by J. Okafor.", selected: true },
  { value: "aisle-2", title: "Aisle 2 — Ambient", content: "18 bays, no open tasks. Last counted yesterday at 17:15." },
  { value: "aisle-3", title: "Aisle 3 — Frozen", content: "8 bays, 2 open tasks. Temperature log due at 11:00." },
  { value: "dock", title: "Loading dock", content: "3 doors, 1 inbound delivery expected at 10:30." },
];

const rows = (data: Row[]) =>
  data.map(
    (r) => html`<zds-accordion-item value=${r.value} heading=${r.title} ?selected=${!!r.selected} ?disabled=${!!r.disabled}>${r.content}</zds-accordion-item>`,
  );
const stack = (c: unknown) => html`<div style="display:grid;gap:16px;max-width:480px">${c}</div>`;
const grid = (c: unknown) => html`<div style="display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));align-items:start">${c}</div>`;
const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;

const meta: Meta = {
  title: "Components/Accordion",
  component: "zds-accordion",
  tags: ["autodocs"],
  args: { selectable: true, rounded: false, inCard: true, multiple: false, disabled: false },
  render: (a) => html`<div style="max-width:480px">
    <zds-accordion .selectable=${a.selectable} ?rounded=${a.rounded} .inCard=${a.inCard} ?multiple=${a.multiple} ?disabled=${a.disabled} .value=${["aisle-1"]}>
      ${rows(ZONES)}
    </zds-accordion>
  </div>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Spec \`selectable\`: a leading control opens the row and the rest of the row ticks it, or the whole row only opens. */
export const Selectable: Story = {
  render: () => grid(html`
    ${stack(html`${cap("selectable")}<zds-accordion>${rows(ZONES)}</zds-accordion>`)}
    ${stack(html`${cap("not selectable")}<zds-accordion selectable="false">${rows(FAQ)}</zds-accordion>`)}`),
};

/** Spec \`rounded\`: only the container's corners (and selectable rows' leading control) respond. */
export const Rounded: Story = {
  render: () => grid(html`
    ${stack(html`${cap("sharp")}<zds-accordion selectable="false">${rows(FAQ)}</zds-accordion>`)}
    ${stack(html`${cap("rounded")}<zds-accordion selectable="false" rounded>${rows(FAQ)}</zds-accordion>`)}
    ${stack(html`${cap("selectable, rounded")}<zds-accordion rounded>${rows(ZONES)}</zds-accordion>`)}`),
};

/** Spec \`inCard\`: the outline and the row dividers come and go together. The last row never has a divider. */
export const InCard: Story = {
  render: () => grid(html`
    ${stack(html`${cap("in card")}<zds-accordion selectable="false">${rows(FAQ)}</zds-accordion>`)}
    ${stack(html`${cap("not in card")}<zds-accordion selectable="false" in-card="false">${rows(FAQ)}</zds-accordion>`)}`),
};

/** Item \`open\`: one row open at a time by default (spec metadata); \`multiple\` lets several stay open. */
export const Open: Story = {
  render: () => grid(html`
    ${stack(html`${cap("single (default)")}<zds-accordion selectable="false" .value=${["delivery"]}>${rows(FAQ)}</zds-accordion>`)}
    ${stack(html`${cap("multiple")}<zds-accordion selectable="false" multiple .value=${["returns", "tracking"]}>${rows(FAQ)}</zds-accordion>`)}`),
};

/** Item \`selected\`: the row body toggles it and a check mark trails the title. The chosen values are shown below. */
export const Selected: Story = {
  render: () => {
    const initial = new Set(["aisle-1", "dock"]);
    return stack(html`
      <zds-accordion
        @zds-selected-change=${(e: CustomEvent<{ value: string; selected: boolean }>) => {
          if (e.detail.selected) initial.add(e.detail.value);
          else initial.delete(e.detail.value);
          const out = (e.currentTarget as HTMLElement).nextElementSibling;
          if (out) out.textContent = `selected: ${[...initial].join(", ") || "none"}`;
        }}
      >
        ${rows(ZONES.map((r) => ({ ...r, selected: initial.has(r.value) })))}
      </zds-accordion>
      <div style="font:500 12px/1.4 system-ui;opacity:.7">selected: ${[...initial].join(", ")}</div>`);
  },
};

/** Disabled (not designed in Figma): one row, or the whole accordion. */
export const Disabled: Story = {
  render: () => grid(html`
    ${stack(html`${cap("one row")}<zds-accordion selectable="false">${rows(FAQ.map((r, i) => (i === 1 ? { ...r, disabled: true } : r)))}</zds-accordion>`)}
    ${stack(html`${cap("one selectable row")}<zds-accordion>${rows(ZONES.map((r, i) => (i === 2 ? { ...r, disabled: true } : r)))}</zds-accordion>`)}
    ${stack(html`${cap("whole accordion")}<zds-accordion selectable="false" disabled>${rows(FAQ)}</zds-accordion>`)}`),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(340px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:12px">
        ${cap(cls || "base / light")}
        <zds-accordion .value=${["aisle-1"]}>${rows(ZONES.slice(0, 3))}</zds-accordion>
        <zds-accordion selectable="false" rounded .value=${["delivery"]}>${rows(FAQ.slice(0, 3))}</zds-accordion>
      </div>`)}
  </div>`,
};
