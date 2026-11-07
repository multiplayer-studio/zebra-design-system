import type { Meta, StoryObj } from "@storybook/web-components";
import { html, svg } from "lit";
import "../src/components/phone-input/phone-input.js";
import { PHONE_COUNTRIES, type PhoneCountry } from "../src/components/phone-input/phone-input.js";

const STATES = ["default", "invalid", "disabled"];
const SIZES = ["small", "medium", "large"];
const SHAPES = ["rounded", "sharp", "full"];
const FLAVOURS = ["default", "gradient", "ghost"];

const field = (a: Record<string, unknown>) => html`<zds-phone-input
  label="Phone number"
  hint=${a.state === "invalid" ? "Enter a valid phone number" : "We only use this for delivery updates"}
  state=${a.state as string}
  size=${a.size as string}
  shape=${a.shape as string}
  flavour=${a.flavour as string}
  .country=${a.country as string}
  .value=${a.value as string}
  .countries=${(a.countries as PhoneCountry[]) ?? PHONE_COUNTRIES}
  ?block=${a.block}
></zds-phone-input>`;

const meta: Meta = {
  title: "Components/Phone Input",
  component: "zds-phone-input",
  tags: ["autodocs"],
  argTypes: {
    state: { control: "inline-radio", options: STATES },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: SHAPES },
    flavour: { control: "inline-radio", options: FLAVOURS },
  },
  args: { state: "default", size: "medium", shape: "rounded", flavour: "default", country: "US", value: "8006535350", block: false },
  render: (a) => field(a),
};
export default meta;
type Story = StoryObj;

const row = (children: unknown) => html`<div style="display:flex;flex-wrap:wrap;gap:32px;align-items:start">${children}</div>`;

export const Playground: Story = {};

/** One state across every part. */
export const States: Story = { render: (a) => row(STATES.map((state) => field({ ...a, state }))) };

/** Height follows size. Only small also reduces the text. */
export const Sizes: Story = { render: (a) => row(SIZES.map((size) => field({ ...a, size }))) };

/** The country control's start and the number's end share the corner. */
export const Shapes: Story = { render: (a) => row(SHAPES.map((shape) => field({ ...a, shape }))) };

/** `default` in a form, `gradient` for a distinct interaction, `ghost` on a surface that already bounds it. */
export const Flavours: Story = {
  render: (a) => html`<div style="display:grid;gap:32px">${FLAVOURS.map((flavour) => row(STATES.map((state) => field({ ...a, flavour, state }))))}</div>`,
};

/** Each country brings its dial code and grouping. */
export const Countries: Story = { render: (a) => row(["GB", "NG", "DE"].map((country) => field({ ...a, country, value: "8031234567" }))) };

const stripes = (...colours: string[]) => html`<svg viewBox="0 0 3 2" role="presentation">${colours.map((fill, i) => svg`<rect x=${i} width="1" height="2" fill=${fill} />`)}</svg>`;
const ARTWORK: Record<string, ReturnType<typeof stripes>> = { IE: stripes("#169b62", "#fff", "#ff883e"), NG: stripes("#008751", "#fff", "#008751"), FR: stripes("#0055a4", "#fff", "#ef4135") };

/** `flag` takes real artwork. It replaces the emoji in the control and the menu, on every platform. */
// Storybook can't walk a Lit template in args, so the artwork stays out of them.
const WITH_ARTWORK = PHONE_COUNTRIES.filter((c) => c.code in ARTWORK).map((c) => ({ ...c, flag: ARTWORK[c.code] }));
export const Flags: Story = { args: { country: "NG", value: "8031234567" }, render: (a) => field({ ...a, countries: WITH_ARTWORK }) };

/** Fills the container's width. */
export const Block: Story = { args: { block: true }, render: (a) => html`<div style="inline-size:480px">${field(a)}</div>` };
