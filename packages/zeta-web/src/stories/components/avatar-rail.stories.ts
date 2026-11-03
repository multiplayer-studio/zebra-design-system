import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaAvatarRail } from "../../components/avatar-rail/avatar-rail.js";
import "../../components/avatar/avatar.js";

type AvatarRailStory = ZetaAvatarRail & { count: number };

const people = [
  ["AD", "purple"],
  ["AB", "blue"],
  ["AC", "sea"],
  ["JK", "green"],
  ["LM", "orange"],
  ["PQ", "burgundy"]
] as const;

const meta: Meta<AvatarRailStory> = {
  component: "zeta-avatar-rail",
  title: "Components/Avatar Rail",
  tags: ["autodocs"],
  args: {
    size: "m",
    stacking: "start",
    max: 4,
    showOverflow: true,
    showClose: false,
    count: 6
  },
  argTypes: {
    size: {
      options: ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"],
      control: { type: "select" }
    },
    stacking: { options: ["start", "end"], control: { type: "inline-radio" } },
    max: { options: [2, 3, 4], control: { type: "inline-radio" } },
    count: { control: { type: "range", min: 2, max: 6 } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6494-1953"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const AvatarRail: StoryObj<AvatarRailStory> = {
  render: args =>
    html`<zeta-avatar-rail size=${args.size ?? "m"} stacking=${args.stacking} max=${args.max} ?show-overflow=${args.showOverflow} ?show-close=${args.showClose}>
      ${people.slice(0, args.count).map(([initials, color]) => html`<zeta-avatar swatch-color=${color}>${initials}</zeta-avatar>`)}
    </zeta-avatar-rail>`
};

/** Stacking changes only the paint order: start shows the first avatar whole, end the last and the counter. */
export const Stacking: StoryObj<AvatarRailStory> = {
  render: args =>
    html`<div style="display: flex; flex-direction: column; gap: var(--space-lg);">
      ${(["start", "end"] as const).map(
        stacking =>
          html`<zeta-avatar-rail size=${args.size ?? "m"} stacking=${stacking}>
            ${people.map(([initials, color]) => html`<zeta-avatar swatch-color=${color}>${initials}</zeta-avatar>`)}
          </zeta-avatar-rail>`
      )}
    </div>`
};
