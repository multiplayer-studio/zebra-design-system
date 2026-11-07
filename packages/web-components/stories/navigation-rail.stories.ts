import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../src/components/navigation-rail/navigation-rail.js";
import "../src/components/navigation-rail/navigation-header.js";
import "../src/components/navigation-rail/sub-menu-header.js";
import "../src/components/navigation-rail/collapsible-menu-item.js";
import "../src/components/navigation-rail-item/navigation-rail-item.js";
import "../src/components/sub-menu-item/sub-menu-item.js";
import "../src/components/caret-indicator/caret-indicator.js";
import "../src/components/divider/divider.js";
import "../src/components/button/button.js";
import "../src/components/icon-button/icon-button.js";

const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;
const row = (c: unknown) => html`<div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap">${c}</div>`;
/** The rail fills its parent's height: give it a frame to fill. */
const frame = (c: unknown, height = 640) =>
  html`<div style="height:${height}px;display:flex;border:1px dashed var(--border-subtle);background:var(--surface-page);width:fit-content">${c}</div>`;
const col = (t: string, c: unknown) => html`<div style="display:grid;gap:8px">${cap(t)}${c}</div>`;

const menu = html`
  <zds-navigation-rail-item label="Home" icon="home" href="#home" selected></zds-navigation-rail-item>
  <zds-navigation-rail-item label="Inbox" icon="inbox" href="#inbox" badge badge-label="New messages"></zds-navigation-rail-item>
  <zds-navigation-rail-item label="Reports" icon="dashboard" href="#reports"></zds-navigation-rail-item>
  <zds-divider></zds-divider>
  <zds-navigation-rail-item label="Calendar" icon="calendar" href="#calendar"></zds-navigation-rail-item>
  <zds-navigation-rail-item label="Map" icon="map" href="#map"></zds-navigation-rail-item>
  <zds-navigation-rail-item label="Stores" icon="store" href="#stores" disabled></zds-navigation-rail-item>`;
const footer = html`
  <zds-divider slot="footer"></zds-divider>
  <zds-navigation-rail-item slot="footer" label="Help" icon="help" href="#help"></zds-navigation-rail-item>
  <zds-navigation-rail-item slot="footer" label="Settings" icon="settings" href="#settings"></zds-navigation-rail-item>`;
const header = (type = "avatar") =>
  html`<zds-navigation-header slot="header" type=${type} heading="Zebra Workcloud" avatar-initials="MY"></zds-navigation-header>`;
// The slotted search action matches the rail's shape itself (the rail didn't render it).
const subMenu = (open = true, shape = "rounded") => html`
  <zds-sub-menu-header slot="sub-menu-header" type="sub-page" heading="Operations">
    <zds-icon-button slot="actions" flavour="subtle" size="small" shape=${shape} icon="search" label="Search operations"></zds-icon-button>
  </zds-sub-menu-header>
  <zds-collapsible-menu-item slot="sub-menu" label="Orders" icon="list" badge="4" ?open=${open}>
    <zds-sub-menu-item label="Open orders" href="#open" selected></zds-sub-menu-item>
    <zds-sub-menu-item label="Back orders" href="#back" badge="12"></zds-sub-menu-item>
    <zds-sub-menu-item label="Returns" href="#returns"></zds-sub-menu-item>
    <zds-sub-menu-item label="Archived orders from previous seasons" href="#archived" disabled></zds-sub-menu-item>
  </zds-collapsible-menu-item>
  <zds-sub-menu-item slot="sub-menu" label="Analytics" icon="analytics" href="#analytics"></zds-sub-menu-item>
  <zds-sub-menu-item slot="sub-menu" label="Schedule" icon="schedule" href="#schedule" badge="2"></zds-sub-menu-item>
  <zds-sub-menu-item slot="sub-menu" label="Teams" icon="group" sub-menu href="#teams"></zds-sub-menu-item>
  <zds-sub-menu-item slot="sub-menu" label="Files" icon="folder" href="#files"></zds-sub-menu-item>`;

type Shape = "rounded" | "sharp";
type Opts = {
  expanded?: boolean; showLabels?: boolean; showToggleItem?: boolean; shape?: Shape; inverse?: boolean; panel?: boolean; open?: boolean;
  railMaxWidth?: string; subMenuMaxWidth?: string; longRow?: boolean;
};
const composed = ({ expanded = false, showLabels = false, showToggleItem = true, shape = "rounded", inverse = false, panel = true, open = true, railMaxWidth, subMenuMaxWidth, longRow = false }: Opts = {}) => html`
  <zds-navigation-rail ?expanded=${expanded} ?show-labels=${showLabels} .showToggleItem=${showToggleItem} shape=${shape} ?inverse=${inverse} action-label="Create"
    rail-max-width=${railMaxWidth || nothing} sub-menu-max-width=${subMenuMaxWidth || nothing}>
    ${header()} ${menu} ${footer} ${panel ? subMenu(open, shape) : nothing}
    ${panel && longRow ? html`<zds-sub-menu-item slot="sub-menu" label="Quarterly inventory reconciliation reports" icon="folder" href="#quarterly"></zds-sub-menu-item>` : nothing}
  </zds-navigation-rail>`;

const meta: Meta<Opts> = {
  title: "Components/Navigation Rail/Navigation Rail",
  component: "zds-navigation-rail",
  tags: ["autodocs"],
  args: { expanded: false, showLabels: false, showToggleItem: true, shape: "rounded", inverse: false, panel: true },
  argTypes: {
    expanded: { control: "boolean" },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    inverse: { control: "boolean" },
    railMaxWidth: { control: "text", name: "rail-max-width", description: "Caps the wide rail. A CSS length, or a number in px." },
    subMenuMaxWidth: { control: "text", name: "sub-menu-max-width", description: "Caps the hugged sub menu. A CSS length, or a number in px." },
    showLabels: { control: "boolean" },
    showToggleItem: { control: "boolean" },
    panel: { control: "boolean", name: "sub menu (fills the sub-menu slots)" },
  },
};
export default meta;
type Story = StoryObj<Opts>;

export const Playground: Story = { render: (a) => frame(composed(a)) };

/** expanded: the narrow icon rail vs the wide labelled one. The toggle item switches between them. */
export const Expanded: Story = {
  render: () => row([false, true].map((e) => col(`expanded=${e}`, frame(composed({ expanded: e }))))),
};

/**
 * rail-max-width / sub-menu-max-width (code-only): caps on the wide rail and
 * the hugged sub menu. Capped rows truncate; hover one for 3s for its full
 * label.
 */
export const MaxWidths: Story = {
  render: () =>
    row(
      ([
        ["no caps", {}],
        ["sub-menu-max-width=220", { subMenuMaxWidth: "220" }],
        ["expanded, rail-max-width=160, sub-menu-max-width=220", { expanded: true, railMaxWidth: "160", subMenuMaxWidth: "220" }],
      ] as const).map(([cap, o]) => col(cap, frame(composed({ ...o, longRow: true })))),
    ),
};

/**
 * shape (code-only, no Figma counterpart): every nested component follows the
 * rail — items, the open group, the header action, the header's settings
 * button and the sub menu header's back button. rounded = radius/sm, sharp =
 * radius/none. The rail itself is unaffected.
 */
export const Shape: Story = {
  render: () =>
    html`<div style="display:grid;gap:16px">
      ${[false, true].map((e) =>
        row((["rounded", "sharp"] as const).map((shape) => col(`shape=${shape}, expanded=${e}`, frame(composed({ shape, expanded: e }))))),
      )}
    </div>`,
};

/**
 * inverse (code-only, owner decision): the rail is locked to dark mode
 * whatever the page's mode; `inverse` locks it to light. Each pane is a page
 * scope — the rail ignores the page's mode but keeps its `.ext-*` brand.
 */
export const Inverse: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(3,max-content)">
    ${(
      [
        ["light page", "mode-light", false],
        ["dark page", "mode-dark", false],
        ["light page, inverse", "mode-light", true],
        ["dark page, inverse", "mode-dark", true],
        ["ext-companion light page", "ext-companion mode-light", false],
        ["ext-companion dark page, inverse", "ext-companion mode-dark", true],
      ] as const
    ).map(
      ([t, cls, inv]) => html`<div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        ${cap(t)} ${frame(composed({ inverse: inv }), 600)}
      </div>`,
    )}
  </div>`,
};

/** label (show-labels): captions under the glyphs in the narrow rail. With expanded it simply works (Figma never built it). */
export const Labels: Story = {
  render: () =>
    row(
      ([["showLabels=false", false, false], ["showLabels=true", true, false], ["showLabels=true + expanded", true, true]] as const).map(
        ([t, l, e]) => col(t, frame(composed({ showLabels: l, expanded: e, panel: false }))),
      ),
    ),
};

/** showHeaderAction: the action shows when `action-label` is set. */
export const HeaderAction: Story = {
  render: () =>
    row([
      ...[false, true].map((e) =>
        col(`with action, expanded=${e}`, frame(html`<zds-navigation-rail ?expanded=${e} action-label="Create">${header()} ${menu}</zds-navigation-rail>`, 420)),
      ),
      col("no action", frame(html`<zds-navigation-rail>${header()} ${menu}</zds-navigation-rail>`, 420)),
    ]),
};

/** rail-width: Figma's 200px by default, a project width, or "fill" to take the container's width. */
export const RailWidth: Story = {
  render: () =>
    row(([["default (200px)", null, 260], ["rail-width=255", "255", 300], ['rail-width="fill" in a 320px column', "fill", 320]] as const).map(([cap, w, c]) =>
      col(cap, html`<div style="inline-size:${c}px;block-size:420px;display:flex;border:1px dashed var(--border-subtle);background:var(--surface-page)">
        <zds-navigation-rail expanded rail-width=${w ?? nothing}>${header()} ${menu}</zds-navigation-rail>
      </div>`),
    )),
};

/** The header's Icon Button takes any glyph and label (Settings by default); it fires zds-action. */
export const HeaderIconButton: Story = {
  render: () =>
    row((["settings", "home", "swap"] as const).map((icon) =>
      frame(html`<zds-navigation-rail expanded .showToggleItem=${false}>
        <zds-navigation-header slot="header" heading="ACME" action-icon=${icon} action-label=${icon === "home" ? "Home" : icon === "settings" ? "Settings" : "Switch tenant"}></zds-navigation-header>
      </zds-navigation-rail>`, 200),
    )),
};

/** showToggleItem, and the footer slot (moreFooterItems). */
export const ToggleAndFooter: Story = {
  render: () =>
    row(
      ([["toggle + footer", true, true], ["footer, no toggle", false, true], ["toggle only", true, false]] as const).map(([t, tog, f]) =>
        col(t, frame(html`<zds-navigation-rail .showToggleItem=${tog}>${header()} ${menu} ${f ? footer : nothing}</zds-navigation-rail>`, 480)),
      ),
    ),
};

/** showSubMenu: the panel shows when its slots are filled. */
export const SubMenuPanel: Story = {
  render: () =>
    row([
      col("panel, group open", frame(composed())),
      col("panel, group closed", frame(composed({ open: false }))),
      col("no panel", frame(composed({ panel: false }))),
    ]),
};

/** Subcomponent: Navigation Header — type × expanded. */
export const NavigationHeaders: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(2,200px);background:var(--surface-section);padding:12px;width:fit-content">
    ${(["avatar", "logo"] as const).flatMap((type) =>
      [true, false].map(
        (e) => html`<div style="display:grid;gap:4px;justify-items:start">
          ${cap(`type=${type}, expanded=${e}`)}
          <div style="width:${e ? "176px" : "auto"}">
            <zds-navigation-header type=${type} .expanded=${e} heading="Zebra Workcloud" avatar-initials="MY"></zds-navigation-header>
          </div>
        </div>`,
      ),
    )}
  </div>`,
};

/** Subcomponent: Sub Menu Header — type, leading icon, trailing actions. */
export const SubMenuHeaders: Story = {
  render: () => html`<div style="display:grid;gap:12px;width:240px;background:var(--surface-section)">
    <zds-sub-menu-header type="default" icon="store" heading="Store 1042"></zds-sub-menu-header>
    <zds-sub-menu-header type="sub-page" heading="Operations">
      <zds-button slot="actions" size="small" shape="rounded" flavour="text">Edit</zds-button>
    </zds-sub-menu-header>
    <zds-sub-menu-header type="sub-page" heading="Operations" shape="sharp">
      <zds-button slot="actions" size="small" shape="sharp" flavour="text">Edit</zds-button>
    </zds-sub-menu-header>
    <zds-sub-menu-header type="sub-page" heading="Operations" .showLeadingIcon=${false}></zds-sub-menu-header>
  </div>`,
};

/** Subcomponent: Caret Indicator — one glyph, turned (owner decision), never swapped. */
export const CaretIndicators: Story = {
  render: () => {
    const toggle = (e: Event) => {
      const root = (e.target as HTMLElement).closest("[data-carets]")!;
      root.querySelectorAll("zds-caret-indicator[data-live]").forEach((c) => c.toggleAttribute("open"));
      const b = e.currentTarget as HTMLElement;
      b.textContent = b.textContent === "Open" ? "Close" : "Open";
    };
    return html`<div data-carets style="display:grid;gap:12px;color:var(--foreground-primary)">
      <zds-button size="small" flavour="primary" style="justify-self:start" @click=${toggle}>Open</zds-button>
      ${(["vertical", "horizontal"] as const).map(
        (d) => html`<div style="display:flex;gap:16px;align-items:center">
          ${cap(d)}
          ${(["small", "medium", "large"] as const).map((s) => html`<zds-caret-indicator data-live direction=${d} size=${s}></zds-caret-indicator>`)}
          ${cap("open=true:")}
          ${(["small", "medium", "large"] as const).map((s) => html`<zds-caret-indicator direction=${d} size=${s} open></zds-caret-indicator>`)}
        </div>`,
      )}
    </div>`;
  },
};

/** Subcomponent: Collapsible Menu Item — open false / true, then open and sharp. */
export const CollapsibleMenuItems: Story = {
  render: () => html`<div style="display:grid;gap:12px;width:224px;padding:8px;background:var(--surface-section)">
    <zds-collapsible-menu-item label="Orders (sharp)" icon="list" open shape="sharp">
      <zds-sub-menu-item label="Open orders" href="#a" selected></zds-sub-menu-item>
      <zds-sub-menu-item label="Returns" href="#b"></zds-sub-menu-item>
    </zds-collapsible-menu-item>
    <zds-collapsible-menu-item label="Orders" icon="list">
      <zds-sub-menu-item label="Open orders" href="#a"></zds-sub-menu-item>
      <zds-sub-menu-item label="Returns" href="#b"></zds-sub-menu-item>
    </zds-collapsible-menu-item>
    <zds-collapsible-menu-item label="Orders" icon="list" open badge="4">
      <zds-sub-menu-item label="Open orders" href="#a" selected></zds-sub-menu-item>
      <zds-sub-menu-item label="Back orders" href="#c" badge="12"></zds-sub-menu-item>
      <zds-sub-menu-item label="Returns" href="#b"></zds-sub-menu-item>
    </zds-collapsible-menu-item>
  </div>`,
};

/** Page scopes light, dark, extension and extension-dark; expanded and collapsed, with an open sub menu. The rail stays dark in every one (locked mode) and keeps the extension brand; see Inverse. */
export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(820px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map(
      (cls) => html`<div class=${cls || nothing} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px">
        ${cap(cls || "base / light")}
        <div style="display:flex;gap:16px">${frame(composed(), 600)} ${frame(composed({ expanded: true }), 600)}</div>
      </div>`,
    )}
  </div>`,
};
