import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAvatar } from "../../../components/avatar/avatar.js";
import { fn } from "@storybook/test";
import { spread } from "@open-wc/lit-helpers";
import { html } from "lit";

type AvatarStory = ZetaAvatar & { "show-ring": boolean; "show-close": boolean; "swatch-color": string; "status-label": string };

const meta: Meta<AvatarStory> = {
  title: "Components/Avatar",
  component: "zeta-avatar",
  args: {
    size: "m",
    "show-ring": false,
    "show-close": false,
    "swatch-color": "purple",
    onclose: fn()
  },
  argTypes: {
    size: {
      options: ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"],
      control: {
        type: "select"
      }
    },
    "swatch-color": {
      options: ["purple", "blue", "sea", "yellow", "orange", "green", "burgundy"],
      control: { type: "select" }
    },
    status: {
      options: [undefined, "available", "away", "busy", "dnd", "on-shift", "offline"],
      control: { type: "select" }
    },
    showRing: { table: { disable: true } },
    showClose: { table: { disable: true } },
    swatchColor: { table: { disable: true } },
    statusLabel: { table: { disable: true } },
    closeLabel: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4906-1172"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

/** Booleans bind as `?attr` so `false` removes the attribute; unset values are left off. */
const attrs = (args: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(args)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => (typeof value === "boolean" ? [`?${key}`, value] : [key, value]))
  );

export const AvatarWithInitials: StoryObj<AvatarStory> = {
  args: {
    slot: "WW",
    showRing: false,
    showClose: false
  },
  render: ({ slot, onclose, ...args }) => {
    return html`<zeta-avatar ${spread(attrs(args))} @close=${onclose}>${slot}</zeta-avatar> `;
  }
};

export const AvatarWithImage: StoryObj<AvatarStory> = {
  argTypes: {
    slot: { table: { disable: true } },
    status: { table: { disable: true } }
  },
  render: ({ onclose, ...args }) => {
    return html`<zeta-avatar ${spread(attrs(args))} @close=${onclose}
      ><img style="filter: invert(1); width: 80%; height: 80%;" src="https://design.zebra.com/img/logo.svg"
    /></zeta-avatar>`;
  }
};

export const AvatarWithIcon: StoryObj<AvatarStory> = {
  argTypes: {
    slot: { table: { disable: true } },
    status: { table: { disable: true } }
  },
  render: ({ onclose, ...args }) => {
    return html`<zeta-avatar ${spread(attrs(args))} @close=${onclose}><zeta-icon style="--icon-color: white">groups</zeta-icon></zeta-avatar>`;
  }
};

export const AvatarWithStatus: StoryObj<AvatarStory> = {
  args: {
    slot: "WW",
    status: "available",
    "status-label": "Available"
  },
  argTypes: {
    slot: { table: { disable: true } }
  },
  render: AvatarWithInitials.render
};

/** Every presence state: each has its own glyph as well as its colour. */
export const Presence: StoryObj<AvatarStory> = {
  argTypes: { slot: { table: { disable: true } }, status: { table: { disable: true } } },
  render: ({ onclose, ...args }) =>
    html`<div style="display: flex; gap: var(--space-lg);">
      ${(["available", "away", "busy", "dnd", "on-shift", "offline"] as const).map(
        status => html`<zeta-avatar ${spread(attrs(args))} status=${status} status-label=${status} @close=${onclose}>WW</zeta-avatar>`
      )}
    </div>`
};

/** The nine sizes; badges, ring and initials scale with the avatar. */
export const Sizes: StoryObj<AvatarStory> = {
  args: { "show-ring": true, "show-close": true },
  argTypes: { slot: { table: { disable: true } }, size: { table: { disable: true } } },
  render: ({ onclose, ...args }) =>
    html`<div style="display: flex; gap: var(--space-xl); align-items: center; padding: var(--space-lg);">
      ${(["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"] as const).map(
        size => html`<zeta-avatar ${spread(attrs(args))} size=${size} status="available" status-label="Available" @close=${onclose}>WW</zeta-avatar>`
      )}
    </div>`
};

export const AvatarWithCloseIcon: StoryObj<AvatarStory> = {
  args: {
    slot: "WW",
    "show-close": true
  },
  argTypes: {
    slot: { table: { disable: true } },
    status: { table: { disable: true } }
  },
  render: AvatarWithInitials.render
};
