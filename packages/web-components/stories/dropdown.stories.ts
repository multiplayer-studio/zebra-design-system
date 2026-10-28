import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/dropdown/dropdown.js";
import "../src/components/menu-item/menu-item.js";
import "../src/components/button/button.js";

const POSITIONS = ["bottom", "top", "right", "left"] as const;
const ALIGNS = ["left", "right", "bottom", "top"] as const;

const defaultRows = html`
  <zds-menu-item leading-icon="settings" rounded>Settings</zds-menu-item>
  <zds-menu-item leading-icon="person" rounded>Profile</zds-menu-item>
  <zds-menu-item leading-icon="log-out" rounded>Log out</zds-menu-item>
`;

const meta: Meta = {
  title: "Components/Dropdown/Dropdown",
  component: "zds-dropdown",
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    position: { control: "inline-radio", options: POSITIONS },
    align: { control: "inline-radio", options: ALIGNS },
    rounded: { control: "boolean" },
  },
  args: { open: true, position: "bottom", align: "left", rounded: true },
  render: (a) => html`
    <div style="padding:120px 160px">
      <zds-dropdown ?open=${a.open} position=${a.position} align=${a.align} ?rounded=${a.rounded}>
        <zds-button slot="trigger" shape="rounded" size="small">Open menu</zds-button>
        ${defaultRows}
      </zds-dropdown>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/**
 * Open is a static variant in Figma, not a behaviour — this element drives
 * showing/hiding, click-outside, Escape and focus return itself. Clicking the
 * trigger below toggles it live, unlike the Playground control above.
 */
export const OpenClosed: Story = {
  render: () => html`
    <div style="padding:24px;display:flex;gap:48px">
      <div>
        <div style="font:500 12px/1.4 system-ui;opacity:.7;margin-bottom:8px">Closed (default)</div>
        <zds-dropdown>
          <zds-button slot="trigger" shape="rounded" size="small">Open menu</zds-button>
          ${defaultRows}
        </zds-dropdown>
      </div>
      <div>
        <div style="font:500 12px/1.4 system-ui;opacity:.7;margin-bottom:8px">Click to toggle</div>
        <zds-dropdown>
          <zds-button slot="trigger" shape="rounded" size="small">Open menu</zds-button>
          ${defaultRows}
        </zds-dropdown>
      </div>
    </div>
  `,
};

/**
 * Position picks which side the menu opens on; each panel here is pinned
 * open so all four render at once. In a real page, near enough to a
 * viewport edge, flipping Position is left to whoever places the dropdown —
 * this pattern does no collision detection (see dropdown.styles.ts).
 */
export const Positions: Story = {
  render: () => html`
    <!-- right and left open their panels TOWARD each other (right's panel
         grows rightward from its trigger, left's grows leftward from its),
         so no amount of horizontal gap between the two triggers stops the
         panels themselves from colliding once they're side by side — the
         panels converge from both directions into the same middle ground.
         Stacking every specimen on its own row (rather than a wrapping flex
         row) sidesteps that regardless of viewport width, instead of
         guessing a gap wide enough to outrun two ~155-213px panels. -->
    <div style="padding:80px 260px;display:flex;flex-direction:column;gap:360px">
      ${POSITIONS.map((p) => html`
        <div>
          <div style="font:500 12px/1.4 system-ui;opacity:.7;margin-bottom:8px">${p}</div>
          <zds-dropdown open position=${p} align=${p === "bottom" || p === "top" ? "left" : "top"} rounded>
            <zds-button slot="trigger" shape="rounded" size="small">Trigger</zds-button>
            ${defaultRows}
          </zds-dropdown>
        </div>
      `)}
    </div>
  `,
};

/** Align pins the matching edge pair — left/right with Position bottom/top, top/bottom with Position left/right. */
export const Aligns: Story = {
  render: () => html`
    <div style="padding:140px 260px;display:flex;gap:260px;flex-wrap:wrap">
      ${ALIGNS.map((al) => html`
        <div>
          <div style="font:500 12px/1.4 system-ui;opacity:.7;margin-bottom:8px">align=${al}</div>
          <zds-dropdown open position=${al === "left" || al === "right" ? "bottom" : "right"} align=${al} rounded>
            <zds-button slot="trigger" shape="rounded" size="small">Trigger</zds-button>
            ${defaultRows}
          </zds-dropdown>
        </div>
      `)}
    </div>
  `,
};

/** Matches the spec's pinned Rounded=true on the nested panel; square is also reachable through the prop. */
export const Rounded: Story = {
  render: () => html`
    <div style="padding:24px;display:flex;gap:48px">
      <zds-dropdown open position="bottom" align="left">
        <zds-button slot="trigger" shape="rounded" size="small">Rounded (default)</zds-button>
        ${defaultRows}
      </zds-dropdown>
      <zds-dropdown open position="bottom" align="left" ?rounded=${false}>
        <zds-button slot="trigger" shape="sharp" size="small">Square</zds-button>
        <zds-menu-item leading-icon="settings">Settings</zds-menu-item>
        <zds-menu-item leading-icon="person">Profile</zds-menu-item>
        <zds-menu-item leading-icon="log-out">Log out</zds-menu-item>
      </zds-dropdown>
    </div>
  `,
};
