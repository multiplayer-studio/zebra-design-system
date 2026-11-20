import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaButton, type ButtonFlavor } from "../../../components/button/button.js";
import "../../../components/button/base-button.js";
import { ZetaIconNameList } from "../../../icons.js";
import { fn } from "@storybook/test";
import "../../../components/icon/icon.js";
import { spreadGenerator } from "../../utils.js";
import { ShapeList } from "../../../mixins/contourable-three.js";

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
const sizes = ["small", "medium", "large"] as const;

const spread = spreadGenerator(ZetaButton);

const meta: Meta<ZetaButton> = {
  title: "Components/Buttons",
  component: "zeta-button",
  args: {
    disabled: false,
    flavor: "primary",
    name: "",
    shape: "rounded",
    slot: "Button",
    type: undefined,
    value: "",
    onclick: fn()
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2024-6729"
    },
    status: {
      type: "ready"
    }
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "select"
      }
    },
    shape: {
      options: ShapeList,
      control: { type: "inline-radio" }
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
    leadingIcon: {
      options: [null, ...ZetaIconNameList],
      control: { type: "select" }
    },
    trailingIcon: {
      options: [null, ...ZetaIconNameList],
      control: { type: "select" }
    }
  }
};
export default meta;

export const Button: StoryObj = {
  render: args => html`<zeta-button ${spread(args)}>${args.slot}</zeta-button>`
};

/** Every flavour at every size, resting and disabled, in the chosen shape. */
export const Flavours: StoryObj<ZetaButton> = {
  args: { shape: "rounded" },
  argTypes: { flavor: { table: { disable: true } }, size: { table: { disable: true } } },
  render: args => html`
    <div style="display: grid; gap: var(--space-lg)">
      ${sizes.map(
        size => html`
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-md); align-items: center">
            ${flavors.map(flavor => html`<zeta-button flavor=${flavor} size=${size} shape=${args.shape}>${flavor}</zeta-button>`)}
          </div>
        `
      )}
      <div style="display: flex; flex-wrap: wrap; gap: var(--space-md); align-items: center">
        ${flavors.map(flavor => html`<zeta-button flavor=${flavor} shape=${args.shape} disabled>${flavor}</zeta-button>`)}
      </div>
    </div>
  `
};
