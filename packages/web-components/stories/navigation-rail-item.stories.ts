import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { iconNames } from "@zebra-design-system/icons/names";
import "../src/components/navigation-rail-item/navigation-rail-item.js";

const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;
/** Items paint no surface of their own: show them on the rail's. */
const surface = (c: unknown, width?: number) =>
  html`<div style="display:flex;gap:12px;align-items:flex-start;padding:12px;background:var(--surface-section);color:var(--foreground-primary);width:${width ? `${width}px` : "fit-content"}">${c}</div>`;
const col = (t: string, c: unknown) => html`<div style="display:grid;gap:4px;justify-items:start">${cap(t)}${c}</div>`;
const w = (e: boolean, c: unknown) => html`<div style="width:${e ? "176px" : "auto"}">${c}</div>`;

type Args = { label: string; icon: string; selected: boolean; disabled: boolean; expanded: boolean; showLabel: boolean; showIcon: boolean; badge: boolean; shape: "rounded" | "sharp" };

const meta: Meta<Args> = {
  title: "Components/Navigation Rail/Navigation Rail Item",
  component: "zds-navigation-rail-item",
  tags: ["autodocs"],
  args: { label: "Inbox", icon: "inbox", selected: false, disabled: false, expanded: false, showLabel: false, showIcon: true, badge: false, shape: "rounded" },
  argTypes: { icon: { control: "select", options: iconNames }, shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {
  render: (a) =>
    surface(
      html`<zds-navigation-rail-item label=${a.label} icon=${a.icon} ?selected=${a.selected} ?disabled=${a.disabled} ?expanded=${a.expanded} ?show-label=${a.showLabel} .showIcon=${a.showIcon} ?badge=${a.badge} shape=${a.shape}></zds-navigation-rail-item>`,
      a.expanded ? 200 : undefined,
    ),
};

/** state: default and selected are props-driven; hover and active (pressed) are CSS — hover the items. */
export const States: Story = {
  render: () => html`<div style="display:grid;gap:12px">
    ${[false, true].map((e) =>
      surface([
        col("default", w(e, html`<zds-navigation-rail-item label="Inbox" icon="inbox" ?expanded=${e}></zds-navigation-rail-item>`)),
        col("selected", w(e, html`<zds-navigation-rail-item label="Inbox" icon="inbox" ?expanded=${e} selected></zds-navigation-rail-item>`)),
        col("disabled", w(e, html`<zds-navigation-rail-item label="Inbox" icon="inbox" ?expanded=${e} disabled></zds-navigation-rail-item>`)),
      ]),
    )}
  </div>`,
};

/** expanded: the narrow square target vs the wide row. */
export const Expanded: Story = {
  render: () =>
    surface([
      col("expanded=false", html`<zds-navigation-rail-item label="Reports" icon="dashboard"></zds-navigation-rail-item>`),
      col("expanded=true", w(true, html`<zds-navigation-rail-item label="Reports" icon="dashboard" expanded></zds-navigation-rail-item>`)),
    ]),
};

/** showLabel: the narrow caption. One line, end-truncated (Figma), so keep it to a short word. */
export const ShowLabel: Story = {
  render: () =>
    surface([
      col("showLabel=false", html`<zds-navigation-rail-item label="Map" icon="map"></zds-navigation-rail-item>`),
      col("showLabel=true", html`<zds-navigation-rail-item label="Map" icon="map" show-label></zds-navigation-rail-item>`),
      col("long label, truncated", html`<div style="width:48px"><zds-navigation-rail-item label="Calendar" icon="calendar" show-label></zds-navigation-rail-item></div>`),
    ]),
};

/** showIcon: only turn it off in the wide form. */
export const ShowIcon: Story = {
  render: () =>
    surface([
      col("showIcon=true", w(true, html`<zds-navigation-rail-item label="Settings" icon="settings" expanded></zds-navigation-rail-item>`)),
      col("showIcon=false", w(true, html`<zds-navigation-rail-item label="Settings" icon="settings" expanded .showIcon=${false}></zds-navigation-rail-item>`)),
    ]),
};

/** showBadge (badge): the Badges-page dot, overhanging the glyph, outside the layout. */
export const Badge: Story = {
  render: () =>
    surface([
      col("badge=false", html`<zds-navigation-rail-item label="Inbox" icon="inbox"></zds-navigation-rail-item>`),
      col("badge=true", html`<zds-navigation-rail-item label="Inbox" icon="inbox" badge badge-label="New messages"></zds-navigation-rail-item>`),
      col("badge, expanded", w(true, html`<zds-navigation-rail-item label="Inbox" icon="inbox" badge expanded></zds-navigation-rail-item>`)),
    ]),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(480px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map(
      (cls) => html`<div class=${cls || nothing} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        ${cap(cls || "base / light")}
        ${surface(html`
          <zds-navigation-rail-item label="Home" icon="home" selected></zds-navigation-rail-item>
          <zds-navigation-rail-item label="Inbox" icon="inbox" badge></zds-navigation-rail-item>
          <zds-navigation-rail-item label="Map" icon="map" show-label></zds-navigation-rail-item>
          <zds-navigation-rail-item label="Stores" icon="store" disabled></zds-navigation-rail-item>
          ${w(true, html`<zds-navigation-rail-item label="Reports" icon="dashboard" expanded selected></zds-navigation-rail-item>`)}
        `)}
      </div>`,
    )}
  </div>`,
};
