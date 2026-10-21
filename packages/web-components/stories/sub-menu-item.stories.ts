import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { iconNames } from "@zebra-design-system/icons/names";
import "../src/components/sub-menu-item/sub-menu-item.js";

const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;
/** The panel's own width and inset: 240px, space/sm. */
const panel = (c: unknown) =>
  html`<div style="display:grid;gap:4px;width:224px;padding:8px;background:var(--surface-section);color:var(--foreground-primary)">${c}</div>`;
const grid = (c: unknown) => html`<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">${c}</div>`;
const col = (t: string, c: unknown) => html`<div style="display:grid;gap:4px">${cap(t)}${panel(c)}</div>`;

type Args = { label: string; icon: string; showLeadingIcon: boolean; selected: boolean; disabled: boolean; nested: boolean; badge: string; subMenu: boolean; open: boolean; shape: "rounded" | "sharp" };

const meta: Meta<Args> = {
  title: "Components/SubMenuItem",
  component: "zds-sub-menu-item",
  tags: ["autodocs"],
  args: { label: "Analytics", icon: "analytics", showLeadingIcon: true, selected: false, disabled: false, nested: false, badge: "", subMenu: false, open: false, shape: "rounded" },
  argTypes: { icon: { control: "select", options: iconNames }, badge: { control: "text" }, shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {
  render: (a) =>
    panel(html`<zds-sub-menu-item label=${a.label} icon=${a.icon} .showLeadingIcon=${a.showLeadingIcon} ?selected=${a.selected} ?disabled=${a.disabled} ?nested=${a.nested} .badge=${a.badge || null} ?sub-menu=${a.subMenu} ?open=${a.open} shape=${a.shape}></zds-sub-menu-item>`),
};

/** state × nested: default and selected are props; hover and active (pressed) are CSS. */
export const States: Story = {
  render: () =>
    grid(
      [false, true].map((n) =>
        col(`nested=${n}`, html`
          <zds-sub-menu-item label="Default" icon="analytics" ?nested=${n}></zds-sub-menu-item>
          <zds-sub-menu-item label="Selected" icon="analytics" ?nested=${n} selected></zds-sub-menu-item>
          <zds-sub-menu-item label="Disabled" icon="analytics" ?nested=${n} disabled></zds-sub-menu-item>`),
      ),
    ),
};

/** nested: indent, quieter label, smaller type. */
export const Nested: Story = {
  render: () =>
    grid([
      col("nested=false", html`<zds-sub-menu-item label="Open orders" icon="list"></zds-sub-menu-item>`),
      col("nested=true", html`<zds-sub-menu-item label="Open orders" icon="list" nested></zds-sub-menu-item>`),
    ]),
};

/** showLeadingIcon. */
export const LeadingIcon: Story = {
  render: () =>
    grid([
      col("showLeadingIcon=true", html`<zds-sub-menu-item label="Schedule" icon="schedule"></zds-sub-menu-item>`),
      col("showLeadingIcon=false", html`<zds-sub-menu-item label="Schedule" icon="schedule" .showLeadingIcon=${false}></zds-sub-menu-item>`),
    ]),
};

/** showBadge (badge): a counter in the layout. Visible whenever badge is set — with or without the icon (spec fix). */
export const Badge: Story = {
  render: () =>
    grid([
      col("badge=2", html`<zds-sub-menu-item label="Schedule" icon="schedule" badge="2"></zds-sub-menu-item>`),
      col("badge=12, no icon", html`<zds-sub-menu-item label="Schedule" .showLeadingIcon=${false} badge="12"></zds-sub-menu-item>`),
      col("long label + badge + caret", html`<zds-sub-menu-item label="Warehouse transfers awaiting review" icon="store" .badge=${140} sub-menu></zds-sub-menu-item>`),
    ]),
};

/** subMenu: the trailing chevron-right caret; `open` turns it 90°. */
export const SubMenu: Story = {
  render: () =>
    grid([
      col("subMenu=false", html`<zds-sub-menu-item label="Teams" icon="group"></zds-sub-menu-item>`),
      col("subMenu=true", html`<zds-sub-menu-item label="Teams" icon="group" sub-menu></zds-sub-menu-item>`),
      col("subMenu=true, open", html`<zds-sub-menu-item label="Teams" icon="group" sub-menu open></zds-sub-menu-item>`),
    ]),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map(
      (cls) => html`<div class=${cls || nothing} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        ${cap(cls || "base / light")}
        ${panel(html`
          <zds-sub-menu-item label="Analytics" icon="analytics" selected></zds-sub-menu-item>
          <zds-sub-menu-item label="Schedule" icon="schedule" badge="2"></zds-sub-menu-item>
          <zds-sub-menu-item label="Teams" icon="group" sub-menu></zds-sub-menu-item>
          <zds-sub-menu-item label="Open orders" icon="list" nested></zds-sub-menu-item>
          <zds-sub-menu-item label="Files" icon="folder" disabled></zds-sub-menu-item>`)}
      </div>`,
    )}
  </div>`,
};
