import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTextInput } from "../../components/text-input/text-input.js";
import { ZetaIconNameList } from "../../icons.js";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
import { fn } from "@storybook/test";
const spread = spreadGenerator(ZetaTextInput);

type InputStory = ZetaTextInput;
//TODO: These are seperate on Figma, should be split here too?
const meta: Meta<InputStory> = {
  tags: ["autodocs"],
  title: "Components/Text Input",
  component: "zeta-text-input",
  args: {
    value: "",
    label: "Label",
    subLabel: "",
    hintText: "hint",
    error: false,
    disabled: false,
    block: false,
    errorText: "Error!",
    rounded: true,
    required: false,
    prefix: "",
    suffix: "",
    onchange: fn(),
    oninput: fn(),
    onfocus: fn(),
    onblur: fn()
  },
  argTypes: {
    type: {
      options: ["text", "textarea", "password", "time", "date", "number", "integer"],
      control: {
        type: "select"
      }
    },
    leadingIcon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    trailingIcon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "inline-radio" }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6288-997"
    },
    status: {
      type: "ready"
    }
  }
};
// console.log('Text-Input attributes:', ZetaTextInput.elementProperties);

export const TextInput: StoryObj<InputStory> = {
  name: "Default text input",
  render: ({ oninput, onchange, onblur, onfocus, ...args }) =>
    html`<div style="width: 200px; height: 400px;">
      <zeta-text-input type="integer" min="50" max="200" @change=${onchange} @input=${oninput} @blur=${onblur} @focus=${onfocus} ${spread(args)}>
      </zeta-text-input>
    </div>`
};

export const EmptyTextInput: StoryObj<InputStory> = {
  name: "Empty",
  render: _args => html` <zeta-text-input> </zeta-text-input> `
};

export const TimeInput: StoryObj<InputStory> = {
  name: "Time input",
  args: {
    type: "time"
  },
  argTypes: {
    hintText: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6288-997"
    },
    status: {
      type: "designPending"
    }
  },
  render: TextInput.render
};

export const DateInput: StoryObj<InputStory> = {
  name: "Date input",
  args: {
    type: "date"
  },
  argTypes: {
    hintText: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6288-997"
    },
    status: {
      type: "designPending"
    }
  },
  render: TextInput.render
};

export const TextArea: StoryObj<InputStory> = {
  name: "Text area field",
  args: {
    type: "textarea"
  },
  argTypes: {
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  render: TextInput.render
};

export const PasswordField: StoryObj<InputStory> = {
  name: "Password field",
  args: {
    type: "password"
  },
  argTypes: {
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6288-997"
    },
    status: {
      type: "designPending"
    }
  },
  render: TextInput.render
};

export default meta;

/** Default, invalid, read-only and disabled, then the gradient and ghost flavours. */
export const TextInputStates: StoryObj = {
  render: () =>
    html`<div style="display: grid; grid-template-columns: repeat(2, 280px); gap: var(--space-xl);">
      <zeta-text-input label="Email" placeholder="name@example.com" hintText="We never share it" required show-information></zeta-text-input>
      <zeta-text-input label="Email" value="name@" error errorText="Enter a full email address"></zeta-text-input>
      <zeta-text-input label="Account" sub-label="Shown on every invoice" value="ZX-4471" readOnly optional hintText="Set by your admin"></zeta-text-input>
      <zeta-text-input label="Email" value="name@example.com" disabled hintText="Locked"></zeta-text-input>
      <zeta-text-input label="Ask the assistant" placeholder="Ask anything" flavor="gradient" shape="full"></zeta-text-input>
      <zeta-text-input label="Search" placeholder="Search" flavor="ghost" leadingIcon="search"></zeta-text-input>
    </div>`
};
