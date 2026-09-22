import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/icon/icon.js";
import { iconNames } from "@zebra-design-system/icons/names";
import codepoints from "@zebra-design-system/icons/codepoints.json";

const store = (codepoints as { glyphs: Record<string, { codepoint: number; category: string | null; retired: boolean }> }).glyphs;
const categories = [...new Set(iconNames.map((n) => store[n]?.category ?? "—"))].sort();
const hex = (n: string) => `U+${store[n]?.codepoint.toString(16).toUpperCase().padStart(4, "0")}`;

type Args = { iconStyle: "rounded" | "sharp"; size: number; filter: string; category: string };

const meta: Meta<Args> = {
  title: "Icons/Gallery",
  parameters: {
    docs: {
      description: {
        component:
          "All 715 glyphs in the Zebra icon font. Both families share codepoints, so switching style is a font-family swap, not a different glyph.",
      },
    },
  },
  argTypes: {
    iconStyle: { control: "inline-radio", options: ["rounded", "sharp"], name: "Style" },
    size: { control: { type: "range", min: 12, max: 64, step: 2 }, name: "Size (px)" },
    filter: { control: "text", name: "Filter by name" },
    category: { control: "select", options: ["all", ...categories], name: "Category" },
  },
  args: { iconStyle: "rounded", size: 28, filter: "", category: "all" },
};
export default meta;
type Story = StoryObj<Args>;

const select = (a: Args) => {
  const f = a.filter.trim().toLowerCase();
  return iconNames.filter(
    (n) => (!f || n.includes(f)) && (a.category === "all" || (store[n]?.category ?? "—") === a.category),
  );
};

const grid = (names: readonly string[], iconStyle: Args["iconStyle"], size: number) => html`
  <div
    style="display:grid;grid-template-columns:repeat(auto-fill,minmax(${Math.max(110, size * 4)}px,1fr));gap:8px"
  >
    ${names.map(
      (n) => html`
        <div
          title="${n}  ${hex(n)}"
          style="border:1px solid var(--border-default);border-radius:var(--radius-element-sm);padding:var(--space-sm);text-align:center;background:var(--surface-card)"
        >
          <zds-icon name=${n} .iconStyle=${iconStyle} style="font-size:${size}px"></zds-icon>
          <div style="font-size:11px;color:var(--foreground-secondary);margin-top:6px;word-break:break-all">${n}</div>
          <div style="font-size:10px;color:var(--foreground-tertiary)">${hex(n)}</div>
        </div>
      `,
    )}
  </div>
`;

/** Every glyph. Filter by name or category with the controls. */
export const All: Story = {
  render: (a) => {
    const names = select(a);
    return html`
      <p style="font:500 12px/1.4 system-ui;color:var(--foreground-secondary);margin-bottom:12px">
        ${names.length} of ${iconNames.length} glyphs · ${a.iconStyle}
      </p>
      ${grid(names, a.iconStyle, a.size)}
    `;
  },
};

/** The same codepoints in both families, side by side. */
export const RoundedVsSharp: Story = {
  render: (a) => {
    const names = select(a).slice(0, 60);
    return html`
      <div style="display:grid;gap:24px;grid-template-columns:1fr 1fr">
        ${(["rounded", "sharp"] as const).map(
          (s) => html`
            <div>
              <h3 style="font:600 13px/1.4 system-ui;margin-bottom:8px">${s}</h3>
              ${grid(names, s, a.size)}
            </div>
          `,
        )}
      </div>
    `;
  },
};

/** Grouped by the Figma category each icon came from. */
export const ByCategory: Story = {
  render: (a) => html`
    <div style="display:grid;gap:24px">
      ${categories.map((c) => {
        const names = select({ ...a, category: c });
        return names.length
          ? html`
              <section>
                <h3 style="font:600 13px/1.4 system-ui;margin-bottom:8px">
                  ${c} <span style="color:var(--foreground-tertiary);font-weight:400">(${names.length})</span>
                </h3>
                ${grid(names, a.iconStyle, a.size)}
              </section>
            `
          : null;
      })}
    </div>
  `,
};

/**
 * A glyph takes `currentColor` and `font-size`, so it follows whatever context
 * it sits in — no per-flavour icon wiring anywhere.
 */
export const InheritsColourAndSize: Story = {
  render: (a) => html`
    <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
      ${[
        ["var(--foreground-primary)", "primary"],
        ["var(--foreground-secondary)", "secondary"],
        ["var(--foreground-success)", "success"],
        ["var(--foreground-error)", "error"],
        ["var(--foreground-link)", "link"],
      ].map(
        ([colour, label]) => html`
          <div style="color:${colour};text-align:center">
            <zds-icon name="verified" .iconStyle=${a.iconStyle} style="font-size:32px"></zds-icon>
            <div style="font-size:11px;margin-top:4px">${label}</div>
          </div>
        `,
      )}
      <div style="display:flex;gap:8px;align-items:baseline;color:var(--foreground-primary)">
        ${[12, 16, 24, 32, 48].map(
          (px) => html`<zds-icon name="alarm" .iconStyle=${a.iconStyle} style="font-size:${px}px"></zds-icon>`,
        )}
      </div>
    </div>
  `,
};
