import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from "@storybook/addon-actions";
import { html, nothing } from "lit";
import type { ZetaTopAppbar } from "../../../components/top-appbar/top-appbar";
import "../../../components/top-appbar/top-appbar";
import "../../../components/button/icon-button/icon-button";
import "../../../components/icon/icon";

const TYPES = ["default", "centered", "contextual", "contextual alt", "search", "extended"] as const;

const meta: Meta<ZetaTopAppbar> = {
  component: "zeta-top-appbar",
  title: "Components/Top Appbar",
  args: {
    type: "default",
    shape: "sharp",
    pageTitle: "Inbox",
    headingLevel: 1,
    count: "2 Items",
    avatarInitials: "RK",
    searchValue: "",
    trailingLabel: "Account"
  },
  argTypes: {
    type: { options: TYPES, control: { type: "select" } },
    shape: { options: ["sharp", "rounded"], control: { type: "inline-radio" } },
    headingLevel: { options: [1, 2, 3, 4, 5, 6], control: { type: "select" } },
    centered: { table: { disable: true } },
    extended: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3116-1217"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

const actions = (slot: string, icons: Array<[string, string]>) =>
  icons.map(([icon, label]) => html`<zeta-icon-button slot=${slot} flavor="subtle" size="small" aria-label=${label}>${icon}</zeta-icon-button>`);

const bar = (args: ZetaTopAppbar) => {
  const contextual = args.type === "contextual" || args.type === "contextual alt";
  const trailing = args.type === "default" || args.type === "extended";
  return html`<zeta-top-appbar
    .type=${args.type}
    .shape=${args.shape}
    .pageTitle=${args.pageTitle}
    .headingLevel=${args.headingLevel}
    .count=${args.count}
    .avatarInitials=${args.avatarInitials}
    .searchValue=${args.searchValue}
    .trailingLabel=${args.trailingLabel}
    @leading-click=${action("leading-click")}
    @trailing-click=${action("trailing-click")}
  >
    ${
      contextual
        ? actions("contextual-controls", [
            ["edit", "Edit"],
            ["share", "Share"],
            ["delete", "Delete"],
            ["more_vertical", "More"]
          ])
        : nothing
    }
    ${
      trailing
        ? actions("trailing", [
            ["world", "Language"],
            ["love", "Favourite"],
            ["more_vertical", "More"]
          ])
        : nothing
    }
  </zeta-top-appbar>`;
};

/** Every control here is live. */
export const Playground: StoryObj<ZetaTopAppbar> = {
  render: args => html`<div style="max-width:390px">${bar(args)}</div>`
};

/** Setting `type` draws the arrangement's own content. */
export const Types: StoryObj<ZetaTopAppbar> = {
  render: args => html`<div style="display:grid;gap:16px;max-width:390px">${TYPES.map(type => bar({ ...args, type } as ZetaTopAppbar))}</div>`
};

/** Without `type` the element only lays out its slots. */
export const Slotted: StoryObj<ZetaTopAppbar> = {
  render: () =>
    html`<div style="max-width:390px">
      <zeta-top-appbar centered>
        <zeta-icon-button slot="leading" flavor="subtle" size="small" aria-label="Menu">hamburger_menu</zeta-icon-button>
        Your own title
        <zeta-icon-button slot="trailing" flavor="subtle" size="small" aria-label="Account">user_circle</zeta-icon-button>
      </zeta-top-appbar>
    </div>`
};
