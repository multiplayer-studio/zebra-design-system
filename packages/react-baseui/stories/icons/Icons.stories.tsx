import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon, type IconStyle } from "../../src/index.js";
import { iconNames } from "@zebra-design-system/icons/names";
import codepoints from "@zebra-design-system/icons/codepoints.json";

const store = (codepoints as { glyphs: Record<string, { codepoint: number; category: string | null; retired: boolean }> }).glyphs;
const categories = [...new Set(iconNames.map((n) => store[n]?.category ?? "—"))].sort();
const hex = (n: string) => `U+${store[n]?.codepoint.toString(16).toUpperCase().padStart(4, "0")}`;

const meta: Meta = {
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
  args: { iconStyle: "rounded" as IconStyle, size: 28, filter: "", category: "all" },
};
export default meta;
type Args = { iconStyle: IconStyle; size: number; filter: string; category: string };
type Story = StoryObj<Args>;

const Grid = ({ names, iconStyle, size }: { names: readonly string[]; iconStyle: IconStyle; size: number }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill,minmax(${Math.max(110, size * 4)}px,1fr))`, gap: 8 }}>
    {names.map((n) => (
      <div
        key={n}
        title={`${n}  ${hex(n)}`}
        style={{
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-element-sm)",
          padding: "var(--space-sm)",
          textAlign: "center",
          background: "var(--surface-card)",
        }}
      >
        <Icon name={n as never} iconStyle={iconStyle} style={{ fontSize: size }} />
        <div style={{ fontSize: 11, color: "var(--foreground-secondary)", marginTop: 6, wordBreak: "break-all" }}>{n}</div>
        <div style={{ fontSize: 10, color: "var(--foreground-tertiary)" }}>{hex(n)}</div>
      </div>
    ))}
  </div>
);

const select = (a: Args) => {
  const f = a.filter.trim().toLowerCase();
  return iconNames.filter(
    (n) => (!f || n.includes(f)) && (a.category === "all" || (store[n]?.category ?? "—") === a.category),
  );
};

/** Every glyph. Filter by name or category with the controls. */
export const All: Story = {
  render: (a) => {
    const names = select(a);
    return (
      <>
        <p style={{ font: "500 12px/1.4 system-ui", color: "var(--foreground-secondary)", marginBottom: 12 }}>
          {names.length} of {iconNames.length} glyphs · {a.iconStyle}
        </p>
        <Grid names={names} iconStyle={a.iconStyle} size={a.size} />
      </>
    );
  },
};

/** The same codepoints in both families, side by side. */
export const RoundedVsSharp: Story = {
  render: (a) => {
    const names = select(a).slice(0, 60);
    return (
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 1fr" }}>
        {(["rounded", "sharp"] as const).map((s) => (
          <div key={s}>
            <h3 style={{ font: "600 13px/1.4 system-ui", marginBottom: 8 }}>{s}</h3>
            <Grid names={names} iconStyle={s} size={a.size} />
          </div>
        ))}
      </div>
    );
  },
};

/** Grouped by the Figma category each icon came from. */
export const ByCategory: Story = {
  render: (a) => (
    <div style={{ display: "grid", gap: 24 }}>
      {categories.map((c) => {
        const names = select({ ...a, category: c });
        if (!names.length) return null;
        return (
          <section key={c}>
            <h3 style={{ font: "600 13px/1.4 system-ui", marginBottom: 8 }}>
              {c} <span style={{ color: "var(--foreground-tertiary)", fontWeight: 400 }}>({names.length})</span>
            </h3>
            <Grid names={names} iconStyle={a.iconStyle} size={a.size} />
          </section>
        );
      })}
    </div>
  ),
};

/**
 * A glyph takes `currentColor` and `font-size`, so it follows whatever context
 * it sits in — no per-flavour icon wiring anywhere.
 */
export const InheritsColourAndSize: Story = {
  render: (a) => (
    <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
      {[
        ["var(--foreground-primary)", "primary"],
        ["var(--foreground-secondary)", "secondary"],
        ["var(--foreground-success)", "success"],
        ["var(--foreground-error)", "error"],
        ["var(--foreground-link)", "link"],
      ].map(([colour, label]) => (
        <div key={label} style={{ color: colour, textAlign: "center" }}>
          <Icon name="verified" iconStyle={a.iconStyle} style={{ fontSize: 32 }} />
          <div style={{ fontSize: 11, marginTop: 4 }}>{label}</div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, alignItems: "baseline", color: "var(--foreground-primary)" }}>
        {[12, 16, 24, 32, 48].map((px) => (
          <Icon key={px} name="alarm" iconStyle={a.iconStyle} style={{ fontSize: px }} />
        ))}
      </div>
    </div>
  ),
};
