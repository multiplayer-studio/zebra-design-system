import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/avatar/avatar.js";
import "../src/components/avatar-rail/avatar-rail.js";

const SIZES = ["xxxsmall", "xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge", "xxxlarge"] as const;

// The spec's sample: initials purple, a photo, initials blue, initials sea.
const PEOPLE = [
  { initials: "AA", color: "purple", name: "Ada Alden" },
  { photo: "https://i.pravatar.cc/200?img=47", name: "Bea Brook" },
  { initials: "CK", color: "blue", name: "Cal Kerr" },
  { initials: "DM", color: "sea", name: "Dee Moss" },
  { initials: "EF", color: "orange", name: "Eli Fox" },
  { initials: "GH", color: "green", name: "Gus Hale" },
] as const;

const avatars = (n = 4) =>
  PEOPLE.slice(0, n).map((p) =>
    "photo" in p
      ? html`<zds-avatar type="photo" src=${p.photo} alt=${p.name}></zds-avatar>`
      : html`<zds-avatar initials=${p.initials} swatch-color=${p.color} alt=${p.name}></zds-avatar>`,
  );

const meta: Meta = {
  title: "Components/Avatar Rail",
  component: "zds-avatar-rail",
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: SIZES },
    stacking: { control: "inline-radio", options: ["start", "end"] },
    showOverflow: { control: "boolean" },
    max: { control: { type: "range", min: 2, max: 4 } },
    people: { control: { type: "range", min: 2, max: PEOPLE.length } },
  },
  args: { size: "medium", stacking: "start", showOverflow: true, max: 4, people: 6, label: "Assignees" },
  render: (a) => html`<zds-avatar-rail
    size=${a.size}
    stacking=${a.stacking}
    ?show-overflow=${a.showOverflow}
    max=${a.max}
    label=${a.label}
    >${avatars(a.people)}</zds-avatar-rail
  >`,
};
export default meta;
type Story = StoryObj;

const col = (c: unknown) => html`<div style="display:grid;gap:20px;justify-items:start">${c}</div>`;

export const Playground: Story = {};

/** Every avatar and the counter take one diameter; the overlap is a quarter of it. */
export const Size: Story = {
  render: () => col(SIZES.map((s) => html`<zds-avatar-rail size=${s} label="Assignees">${avatars(6)}</zds-avatar-rail>`)),
};

/** Only the paint order changes. */
export const Stacking: Story = {
  render: () => col((["start", "end"] as const).map((s) => html`<zds-avatar-rail size="large" stacking=${s} label="Assignees">${avatars(6)}</zds-avatar-rail>`)),
};

/** Six people at each max: the rail shows max of them and counts the rest. */
export const Max: Story = {
  render: () => col([2, 3, 4].map((m) => html`<zds-avatar-rail size="medium" max=${m} label="Assignees">${avatars(6)}</zds-avatar-rail>`)),
};

/** Off only where the rail shows the whole group; with nothing past max there is no counter either way. */
export const ShowOverflow: Story = {
  render: () => col([
    html`<zds-avatar-rail size="medium" max="3" label="Assignees">${avatars(6)}</zds-avatar-rail>`,
    html`<zds-avatar-rail size="medium" max="3" .showOverflow=${false} label="Assignees">${avatars(6)}</zds-avatar-rail>`,
    html`<zds-avatar-rail size="medium" max="4" label="Assignees">${avatars(4)}</zds-avatar-rail>`,
  ]),
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map(
      (cls) => html`<div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:grid;gap:8px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7">${cls || "base / light"}</div>
        <zds-avatar-rail size="medium" label="Assignees">${avatars(6)}</zds-avatar-rail>
      </div>`,
    )}
  </div>`,
};
