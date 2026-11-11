import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../components/icon/icon.js";
import "../../../components/button/button.js";
import { ZetaSnackbar } from "../../../components/snackbar/snackbar.js";
import "../../../components/snackbar/snackbar.js";

const STATUSES = ["info", "positive", "warning", "negative", "deletion", "view", "action", "default"] as const;

const meta: Meta<ZetaSnackbar & { slot: string }> = {
  component: "zeta-snackbar",
  title: "Components/Snackbar",
  args: {
    slot: "Message",
    variant: "contextual",
    status: "info",
    shape: "rounded",
    duration: 0
  },
  argTypes: {
    variant: { options: ["contextual", "standard"], control: { type: "inline-radio" } },
    status: { options: STATUSES, control: { type: "select" } },
    shape: { options: ["rounded", "sharp"], control: { type: "inline-radio" } },
    actionClick: { table: { disable: true } },
    flavor: { table: { disable: true } },
    hasCloseAction: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6551-170"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Snackbar: StoryObj<ZetaSnackbar & { slot: string }> = {
  render: args => html`
    <zeta-snackbar variant=${args.variant} status=${args.status} shape=${args.shape} duration=${args.duration}>
      <zeta-icon slot="icon">star</zeta-icon>
      ${args.slot}
    </zeta-snackbar>
  `
};

/** Every contextual status and the standard bar, in the page flow. */
export const SnackbarFlavors: StoryObj<ZetaSnackbar> = {
  render: args => html`
    <div style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-md);">
      ${STATUSES.map(f => html`<zeta-snackbar status=${f} shape=${args.shape}>${f} message</zeta-snackbar>`)}
      <zeta-snackbar variant="standard" shape=${args.shape}>Standard message</zeta-snackbar>
    </div>
  `
};

/** Floating: in the top layer above the bottom of the viewport, closing itself after 4 seconds. */
export const SnackbarFloating: StoryObj<ZetaSnackbar> = {
  render: () => html`
    <zeta-button
      @click=${(e: Event) => {
        const snackbar = (e.target as HTMLElement).nextElementSibling as ZetaSnackbar;
        snackbar.open = true;
      }}
      >Show snackbar</zeta-button
    >
    <zeta-snackbar floating .open=${false} status="deletion" duration="4000">Item deleted</zeta-snackbar>
  `
};
