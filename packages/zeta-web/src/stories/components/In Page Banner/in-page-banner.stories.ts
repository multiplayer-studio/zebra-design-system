import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { fn } from "@storybook/test";
import { ZetaIconNameList } from "../../../icons.js";
import type { ZetaInPageBanner } from "../../../components/in-page-banner/in-page-banner.js";
import "../../../components/in-page-banner/in-page-banner.js";
import "../../../components/button/button.js";

const STATUSES = ["neutral", "info", "positive", "warning", "negative"] as const;
const COPY: Record<(typeof STATUSES)[number], [string, string]> = {
  neutral: ["Printer profiles sync every hour", "Changes made on another device appear after the next sync."],
  info: ["A firmware update is available", "Version 3.0.3720 adds wireless roaming. Install it from Settings."],
  positive: ["Profile applied to 12 printers", "Every printer reported back with the new settings."],
  warning: ["Protected Mode is on", "Printer actions are unavailable until the security mode changes."],
  negative: ["The printer stopped responding", "Check the cable or network, then try again."]
};

/* Solid takes outline-contrast actions; subtle takes outline-subtle. */
const action = (appearance: string) =>
  html`<zeta-button slot="actions" size="small" flavor=${appearance === "solid" ? "outline-contrast" : "outline-subtle"}>Take action</zeta-button>`;
const stack = (content: unknown) => html`<div style="display: flex; flex-direction: column; gap: var(--space-lg);">${content}</div>`;

const meta: Meta<ZetaInPageBanner> = {
  component: "zeta-in-page-banner",
  title: "Components/In Page Banner",
  args: {
    heading: COPY.info[0],
    description: COPY.info[1],
    status: "info",
    appearance: "subtle",
    rounded: true,
    showIcon: true,
    showClose: false,
    closeLabel: "Dismiss",
    onclose: fn()
  },
  argTypes: {
    status: { options: STATUSES, control: { type: "select" } },
    appearance: { options: ["subtle", "solid"], control: { type: "inline-radio" } },
    icon: { options: [undefined, ...ZetaIconNameList], control: { type: "select" }, type: "string" },
    title: { table: { disable: true } },
    canClose: { table: { disable: true } }
  },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8051-4995" },
    status: { type: "ready" }
  }
};
export default meta;

export const Banner: StoryObj<ZetaInPageBanner> = {
  render: args =>
    html`<zeta-in-page-banner
      heading=${args.heading}
      description=${args.description}
      status=${args.status}
      appearance=${args.appearance}
      .rounded=${args.rounded}
      .showIcon=${args.showIcon}
      ?show-close=${args.showClose}
      close-label=${args.closeLabel}
      .icon=${args.icon}
      >${action(args.appearance)}</zeta-in-page-banner
    >`
};

/** Subtle: the faint tint, a status border and the status colour on the glyph only. */
export const Subtle: StoryObj = {
  render: () =>
    stack(
      STATUSES.map(
        s =>
          html`<zeta-in-page-banner status=${s} heading=${COPY[s][0]} description=${COPY[s][1]} show-close
            >${action("subtle")}</zeta-in-page-banner
          >`
      )
    )
};

/** Solid: the strong fill with foreground/on-strong text; the controls draw light. */
export const Solid: StoryObj = {
  render: () =>
    stack(
      STATUSES.map(
        s =>
          html`<zeta-in-page-banner status=${s} appearance="solid" heading=${COPY[s][0]} description=${COPY[s][1]} show-close
            >${action("solid")}</zeta-in-page-banner
          >`
      )
    )
};

/** Shape: the corners, the actions and the dismiss follow `rounded`. */
export const Shape: StoryObj = {
  render: () =>
    stack(html`
      <zeta-in-page-banner heading="Rounded" description=${COPY.info[1]} show-close>${action("subtle")}</zeta-in-page-banner>
      <zeta-in-page-banner .rounded=${false} appearance="solid" heading="Sharp" description=${COPY.info[1]} show-close
        >${action("solid")}</zeta-in-page-banner
      >
    `)
};

/** Narrow: the text keeps its minimum width and the actions wrap beneath it. */
export const Narrow: StoryObj = {
  render: () =>
    html`<div style="width: 360px;">
      <zeta-in-page-banner status="warning" heading=${COPY.warning[0]} description=${COPY.warning[1]} show-close
        >${action("subtle")}</zeta-in-page-banner
      >
    </div>`
};
