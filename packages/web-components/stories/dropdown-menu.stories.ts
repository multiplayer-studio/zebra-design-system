import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/dropdown-menu/dropdown-menu.js";
import "../src/components/menu-item/menu-item.js";

const rows = (rounded: boolean) => html`
  <zds-menu-item leading-icon="settings" ?rounded=${rounded}>Settings</zds-menu-item>
  <zds-menu-item leading-icon="person" ?rounded=${rounded}>Profile</zds-menu-item>
  <zds-menu-item leading-icon="log-out" ?rounded=${rounded}>Log out</zds-menu-item>
`;

const meta: Meta = {
  title: "Components/Dropdown/Dropdown Menu",
  component: "zds-dropdown-menu",
  tags: ["autodocs"],
  argTypes: {
    rounded: { control: "boolean" },
  },
  args: { rounded: false },
  render: (a) => html`
    <zds-dropdown-menu ?rounded=${a.rounded}>${rows(a.rounded)}</zds-dropdown-menu>
  `,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

const row = (children: unknown) => html`<div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap">${children}</div>`;

/**
 * Square for a panel sitting flush against square surfaces, rounded to read
 * as a floating object. Rows inherit whichever the panel picks — mixing the
 * two is a "don't" in the spec, so the rows here are always passed the same
 * `rounded` value as the panel around them.
 */
export const Rounded: Story = {
  render: () => row(html`
    <zds-dropdown-menu>${rows(false)}</zds-dropdown-menu>
    <zds-dropdown-menu rounded>${rows(true)}</zds-dropdown-menu>
  `),
};

/**
 * The spec models "two built-in rows plus a More Items slot for the rest" as
 * a single panel with a separately-stored slot per Rounded variant — a
 * Figma-authoring artifact (spec issue: switching Rounded leaves the slot's
 * content behind in Figma). This element has no such split: every row, however
 * many, goes through the one default slot.
 */
export const RowCount: Story = {
  render: () => row(html`
    <zds-dropdown-menu rounded>
      <zds-menu-item leading-icon="check-mark" rounded>Only row</zds-menu-item>
    </zds-dropdown-menu>
    <zds-dropdown-menu rounded>
      <zds-menu-item leading-icon="check-mark" rounded>One</zds-menu-item>
      <zds-menu-item leading-icon="check-mark" rounded selected>Two (selected)</zds-menu-item>
      <zds-menu-item leading-icon="check-mark" rounded disabled>Three (disabled)</zds-menu-item>
      <zds-menu-item leading-icon="check-mark" rounded>Four</zds-menu-item>
      <zds-menu-item leading-icon="check-mark" rounded>Five</zds-menu-item>
    </zds-dropdown-menu>
  `),
};
