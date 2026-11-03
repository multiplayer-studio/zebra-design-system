import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaRadioButton } from "../../components/radio-button/radio-button.js";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
import { fn } from "@storybook/test";
import "../../components/button/button.js";

const spread = spreadGenerator(ZetaRadioButton);

const meta: Meta<ZetaRadioButton> = {
  component: "zeta-radio-button",
  tags: ["autodocs"],
  title: "Components/Radio Button",
  args: {
    disabled: false,
    checked: false,
    name: "",
    id: "",
    onchange: fn(),
    oninput: fn()
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"]
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3121"
    },
    status: {
      type: "ready"
    }
  }
} satisfies Meta<ZetaRadioButton>;

export default meta;

export const RadioButton: StoryObj<ZetaRadioButton> = {
  render: ({ slot, onchange, ...args }) => html`<zeta-radio-button ${spread(args)} @change=${onchange}>${slot}</zeta-radio-button>`
};

export const RadioButtonWithLabel: StoryObj<ZetaRadioButton> = {
  args: {
    slot: "Label"
  },
  render: RadioButton.render
};

export const RadioButtonInForm: StoryObj<ZetaRadioButton> = {
  args: {
    name: "myRadioButton"
  },
  render: args => html`
    <form
      style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-xl);"
      @submit=${(ev: Event) => {
        console.log("Submit", ev);
        const data = new FormData(ev.target as HTMLFormElement);
        console.log(Object.fromEntries(data));
      }}
    >
      <fieldset>
        <zeta-radio-button name="choice" @input=${args.oninput} @change=${args.onchange}>Yes</zeta-radio-button>
        <zeta-radio-button name="choice" value="No" @input=${args.oninput} @change=${args.onchange}>No</zeta-radio-button>
        <label> <input type="radio" name="choice" />Maybe</label>
        <label> <input type="radio" name="choice" value="N/A" />Not Applicable</label>
      </fieldset>
      <div style="display: flex; gap: var(--space-sm);">
        <zeta-button type="reset" flavor="outline">Reset</zeta-button>
        <zeta-button type="submit">Submit</zeta-button>
      </div>
    </form>
  `
};
