import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/pagination/pagination.js";
import type { ZdsPagination } from "../src/components/pagination/pagination.js";

// The element already updates its own page on a click; a listener only
// mirrors it into whatever owns the page (here, the readout next to it).
const readout = (e: CustomEvent<{ page: number }>) => {
  const out = (e.currentTarget as ZdsPagination).nextElementSibling;
  if (out) out.textContent = `zds-page-change → ${e.detail.page}`;
};

const note = (t: string) => html`<div style="font:500 12px/1.4 system-ui;color:var(--foreground-secondary)">${t}</div>`;
const col = (c: unknown) => html`<div style="display:grid;gap:16px;justify-items:start">${c}</div>`;
const COMBOS = [[false, false], [true, false], [false, true], [true, true]] as const;

const meta: Meta = {
  title: "Components/Pagination",
  component: "zds-pagination",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Jump controls, a window of page numbers centred on the current page, and an overflow \"…\" with the last page for a long range. Renders nothing at one page. Controlled like Table's sort: a click sets `page` and fires `zds-page-change`. Spec: specs/pagination.",
      },
    },
  },
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    pageCount: { control: { type: "number", min: 0 } },
    visiblePages: { control: { type: "number", min: 1, max: 9 } },
    showControls: { control: "boolean" },
    showMore: { control: "boolean" },
    outline: { control: "boolean" },
    rounded: { control: "boolean" },
    label: { control: "text" },
  },
  args: { page: 1, pageCount: 10, visiblePages: 3, showControls: true, showMore: true, outline: false, rounded: false, label: "Pagination" },
  render: (a) => html`<zds-pagination
      .page=${a.page}
      .pageCount=${a.pageCount}
      .visiblePages=${a.visiblePages}
      .showControls=${a.showControls}
      .showMore=${a.showMore}
      ?outline=${a.outline}
      ?rounded=${a.rounded}
      label=${a.label}
      @zds-page-change=${readout}
    ></zds-pagination
    ><div style="margin-top:12px;font:12px/1.4 system-ui;color:var(--foreground-secondary)"></div>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** The two show props, independently: jump controls and the overflow pair each toggle whole. */
export const ShowControlsAndMore: Story = {
  render: () => col(
    COMBOS.map(([c, m]) => html`<div style="display:grid;gap:6px">
      ${note(`showControls=${c} · showMore=${m}`)}
      <zds-pagination page="1" page-count="10" .showControls=${c} .showMore=${m}></zds-pagination>
    </div>`),
  ),
};

/** The Outline × Rounded variant table: outline adds a stroke/thin border, rounded radius/sm corners. */
export const OutlineAndRounded: Story = {
  render: () => col(
    COMBOS.map(([o, r]) => html`<div style="display:grid;gap:6px">
      ${note(`outline=${o} · rounded=${r}`)}
      <zds-pagination page="2" page-count="10" ?outline=${o} ?rounded=${r}></zds-pagination>
    </div>`),
  ),
};

/** First page (start jumps disabled), a middle page, the last page (end jumps disabled), and a 20-page range. */
export const States: Story = {
  render: () => col(
    ([
      ["first page", 1, 10],
      ["middle page", 5, 10],
      ["near the end: window reaches the last page, no overflow", 9, 10],
      ["last page", 10, 10],
      ["long range 1..20, page 1", 1, 20],
      ["long range 1..20, page 11", 11, 20],
      ["long range 1..20, page 20", 20, 20],
      ["one page: renders nothing", 1, 1],
    ] as const).map(([label, page, count]) => html`<div style="display:grid;gap:6px">
      ${note(label)}
      <zds-pagination outline .page=${page} .pageCount=${count}></zds-pagination>
    </div>`),
  ),
};

/** The same bar under each theme scope; fills, borders, glyphs and the selected inverse fill all follow. */
export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(440px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map(
      (cls) => html`<div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:grid;gap:12px;justify-items:start">
        ${note(cls || "base / light")}
        <zds-pagination page="2" page-count="10"></zds-pagination>
        <zds-pagination page="1" page-count="10" outline rounded></zds-pagination>
      </div>`,
    )}
  </div>`,
};
