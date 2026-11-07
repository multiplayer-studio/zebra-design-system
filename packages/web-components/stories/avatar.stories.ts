import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/avatar/avatar.js";
import { iconNames } from "@zebra-design-system/icons/names";

const SIZES = ["xxxsmall", "xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge", "xxxlarge"] as const;
const SWATCH_COLORS = ["purple", "blue", "sea", "yellow", "orange", "green", "burgundy"] as const;
const STATUSES = ["available", "away", "busy", "dnd", "on-shift", "offline"] as const;

const PHOTO = "https://i.pravatar.cc/200?img=47";

const meta: Meta = {
  title: "Components/Avatar",
  component: "zds-avatar",
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: SIZES },
    type: { control: "inline-radio", options: ["initials", "photo", "icon"] },
    swatchColor: { control: "select", options: SWATCH_COLORS },
    icon: { control: "select", options: [null, ...iconNames] },
    statusIcon: { control: "select", options: [null, ...iconNames] },
    status: { control: "select", options: [...STATUSES, "icon"] },
    showClose: { control: "boolean" },
    showStatus: { control: "boolean" },
    showRing: { control: "boolean" },
  },
  args: {
    size: "medium",
    type: "initials",
    initials: "AA",
    swatchColor: "purple",
    showClose: false,
    showStatus: true,
    status: "available",
    statusLabel: "Available",
    showRing: true,
    alt: "Ada Alden",
  },
  render: (a) => html`
    <zds-avatar
      size=${a.size}
      type=${a.type}
      initials=${a.initials ?? undefined}
      swatch-color=${a.swatchColor}
      src=${a.type === "photo" ? PHOTO : undefined}
      alt=${a.alt ?? undefined}
      icon=${a.icon ?? undefined}
      ?show-close=${a.showClose}
      status=${a.status}
      status-icon=${a.statusIcon ?? undefined}
      status-label=${a.statusLabel ?? undefined}
      ?show-status=${a.showStatus}
      ?show-ring=${a.showRing}
    ></zds-avatar>
  `,
};
export default meta;
type Story = StoryObj;

const row = (children: unknown) => html`<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">${children}</div>`;

export const Playground: Story = {};

/** Nine sizes, xxxsmall to xxxlarge. Only medium is bound to a real token. */
export const Sizes: Story = {
  render: () =>
    row(SIZES.map((s) => html`<zds-avatar size=${s} type="initials" initials="AA" show-ring></zds-avatar>`)),
};

/** Initials, a photo, or an icon — swap-only in Figma, exposed here as `type`. */
export const ContentTypes: Story = {
  render: () => row(html`
    <zds-avatar size="xlarge" type="initials" initials="AA"></zds-avatar>
    <zds-avatar size="xlarge" type="photo" src=${PHOTO} alt="Ada Alden"></zds-avatar>
    <zds-avatar size="xlarge" type="icon" icon="person"></zds-avatar>
  `),
};

/** Background behind initials or a content icon. Not used behind a photo. */
export const SwatchColors: Story = {
  render: () =>
    row(SWATCH_COLORS.map((c) => html`<zds-avatar size="large" type="initials" initials="AA" swatch-color=${c}></zds-avatar>`)),
};

/** Any other colour: a token name, a custom property, or a CSS colour value. */
export const CustomSwatch: Story = {
  render: () =>
    row(["chart/series/2", "feedback/error/background/strong", "--chart-series-10", "#0b7a75"].map(
      (c) => html`<zds-avatar size="large" type="initials" initials="AA" swatch-color=${c} title=${c} .showStatus=${false} .showClose=${false}></zds-avatar>`,
    )),
};

/**
 * Presence states. In the current Figma file every state but "icon" shares
 * one glyph and differs only by fill colour (spec issue) — this element
 * follows that rather than inventing a distinct glyph the design doesn't specify.
 */
export const StatusStates: Story = {
  render: () => row(html`
    ${STATUSES.map((s) => html`<zds-avatar size="large" type="initials" initials="AA" status=${s} status-label=${s}></zds-avatar>`)}
    <zds-avatar size="large" type="initials" initials="AA" status="icon" status-icon="star" status-label="Custom"></zds-avatar>
  `),
};

/** The dismiss badge. Listen for the `close` event and give it an accessible name — Figma has no interactive state for it. */
export const Closable: Story = {
  render: () => html`
    <zds-avatar
      size="large"
      type="photo"
      src=${PHOTO}
      alt="Ada Alden"
      show-close
      @close=${(e: Event) => (e.currentTarget as HTMLElement).remove()}
    ></zds-avatar>
  `,
};

/** Hides the ring on a background where the outline would compete. */
export const NoRing: Story = {
  render: () => row(html`
    <zds-avatar size="xlarge" type="photo" src=${PHOTO} alt="Ada Alden" show-ring></zds-avatar>
    <zds-avatar size="xlarge" type="photo" src=${PHOTO} alt="Ada Alden"></zds-avatar>
  `),
};

/** Theming is a class, at any level, cascading to everything inside. */
export const ThemingCascade: Story = {
  render: () => {
    const panel = (cls: string, label: string) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default)">
        <div style="font:500 12px/1.4 system-ui;margin-bottom:8px;opacity:.7">${label || "base / light"}</div>
        <zds-avatar size="medium" type="initials" initials="AA" status="available" status-label="Available"></zds-avatar>
      </div>`;
    return html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
      ${panel("", "")}
      ${panel("mode-dark", "mode-dark")}
      ${panel("ext-companion", "ext-companion")}
      ${panel("ext-companion mode-dark", "ext-companion mode-dark")}
    </div>`;
  },
};
