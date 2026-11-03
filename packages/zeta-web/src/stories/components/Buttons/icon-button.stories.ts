import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaIconButton } from "../../../components/button/icon-button/icon-button.js";
import { spreadGenerator } from "../../utils.js";
import { html } from "lit";
import { ShapeList } from "../../../mixins/contourable-three.js";
import type { ButtonFlavor } from "../../../components/button/button.js";

const flavors: ButtonFlavor[] = [
  "primary",
  "positive",
  "negative",
  "subtle",
  "text",
  "outline-subtle",
  "outline",
  "gradient",
  "text-gradient",
  "contrast",
  "outline-contrast"
];

const spread = spreadGenerator(ZetaIconButton);

const meta: Meta<ZetaIconButton> = {
  title: "Components/Buttons",
  component: "zeta-icon-button",
  args: {
    disabled: false,
    flavor: "primary",
    name: "",
    shape: "rounded",
    slot: "star",
    type: undefined,
    value: ""
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2338-1763"
    },
    status: {
      type: "ready"
    }
  },
  argTypes: {
    slot: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      },
      type: "string"
    },
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "select"
      }
    },
    type: {
      options: ["button", "submit", "reset"],
      control: {
        type: "select"
      }
    },
    flavor: {
      options: flavors,
      control: {
        type: "select"
      }
    },
    shape: {
      control: { type: "inline-radio" },
      options: ShapeList
    }
  }
};

export default meta;

export const IconButton: StoryObj = {
  render: ({ slot, ...args }) => {
    return html`
      <style>
        :root {
          ${args["--icon-button-color"] && `--icon-button-color: ${args["--icon-button-color"]}`} ;
          ${args["--icon-button-icon-color"] && `--icon-button-icon-color: ${args["--icon-button-icon-color"]}`} ;
          ${args["--icon-button-icon-color-disabled"] && `--icon-button-icon-color-disabled: ${args["--icon-button-icon-color-disabled"]}`} ;
        }
      </style>
      <zeta-icon-button ${spread(args)}>${slot}</zeta-icon-button>
    `;
  }
};

/** Every flavour at every size, resting and disabled, in the chosen shape. */
export const IconButtonFlavours: StoryObj<ZetaIconButton> = {
  args: { shape: "rounded" },
  argTypes: { flavor: { table: { disable: true } }, size: { table: { disable: true } } },
  render: args => html`
    <div style="display: grid; gap: var(--space-lg)">
      ${(["small", "medium", "large"] as const).map(
        size => html`
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-md); align-items: center">
            ${flavors.map(flavor => html`<zeta-icon-button flavor=${flavor} size=${size} shape=${args.shape} aria-label=${flavor}>star</zeta-icon-button>`)}
          </div>
        `
      )}
      <div style="display: flex; flex-wrap: wrap; gap: var(--space-md); align-items: center">
        ${flavors.map(flavor => html`<zeta-icon-button flavor=${flavor} shape=${args.shape} aria-label=${flavor} disabled>star</zeta-icon-button>`)}
      </div>
    </div>
  `
};
