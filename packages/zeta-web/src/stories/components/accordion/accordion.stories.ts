import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAccordion } from "../../../components/accordion/accordion.js";
import { html } from "lit";
import "../../../components/accordion/accordion-item/accordion-item.js";
import "../../../components/button/button.js";

type AccordionStoryArgs = ZetaAccordion & { selectable: boolean; navigation: boolean };
const meta: Meta<AccordionStoryArgs> = {
  component: "zeta-accordion",
  title: "Components/Accordion",
  tags: ["autodocs"],
  args: {
    selectable: true,
    navigation: false,
    inCard: true,
    expandMultiple: false,
    selectMultiple: false,
    rounded: true
  },
  argTypes: {
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5529-33"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Accordion: StoryObj<AccordionStoryArgs> = {
  render: args =>
    html`<zeta-accordion .inCard=${args.inCard} .expandMultiple=${args.expandMultiple} .selectMultiple=${args.selectMultiple} .rounded=${args.rounded}>
      <zeta-accordion-item
        title="Accordion Item 1"
        .selectable=${args.selectable && !args.navigation}
        .navigation="${args.navigation}"
        .rounded=${args.rounded}
      >
        ${!args.navigation && html`<div>content!</div>`}
        ${
          !args.navigation &&
          html`<div slot="header" style="display: flex; gap: var(--space-sm);">
            <zeta-button flavor="outline-subtle">Action 1</zeta-button>
            <zeta-button flavor="outline-subtle">Action 2</zeta-button>
            <zeta-button flavor="outline-subtle">Action 3</zeta-button>
          </div>`
        }
      </zeta-accordion-item>
      <zeta-accordion-item title="Accordion Item 2" .selectable=${args.selectable && !args.navigation} .navigation=${args.navigation} .rounded=${args.rounded}>
        ${!args.navigation && html`<div>content!</div>`}
      </zeta-accordion-item>
      <zeta-accordion-item title="Accordion Item 3" .selectable=${args.selectable && !args.navigation} .navigation=${args.navigation} .rounded=${args.rounded}>
        ${!args.navigation && html`<div>content!</div>`}
      </zeta-accordion-item>
    </zeta-accordion>`
};

/** Plain rows: one target per row, the caret trailing the title. */
export const PlainRows: StoryObj<AccordionStoryArgs> = {
  args: { selectable: false },
  render: args =>
    html`<zeta-accordion .inCard=${args.inCard} .expandMultiple=${args.expandMultiple} .rounded=${args.rounded}>
      <zeta-accordion-item title="Accordion Item 1" expanded .rounded=${args.rounded}><div>content!</div></zeta-accordion-item>
      <zeta-accordion-item title="Accordion Item 2" .rounded=${args.rounded}><div>content!</div></zeta-accordion-item>
      <zeta-accordion-item title="Accordion Item 3" .rounded=${args.rounded}><div>content!</div></zeta-accordion-item>
    </zeta-accordion>`
};
