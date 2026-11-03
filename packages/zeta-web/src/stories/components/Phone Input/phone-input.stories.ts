import type { Meta, StoryObj } from "@storybook/web-components";
import { html, svg } from "lit";
import { PHONE_COUNTRIES, type PhoneCountry, type ZetaPhoneInput } from "../../../components/phone-input/phone-input.js";
import "../../../components/phone-input/phone-input.js";

type PhoneInputArgs = Partial<ZetaPhoneInput>;

const meta: Meta<PhoneInputArgs> = {
  component: "zeta-phone-input",
  title: "Components/Phone Input",
  args: {
    label: "Phone number",
    hintText: "We only use this for delivery updates",
    errorText: "Enter a valid phone number",
    error: false,
    required: false,
    optional: false,
    disabled: false,
    block: false,
    rounded: true,
    size: "medium",
    flavor: "default",
    value: "8006535350",
    country: "US",
    countryLabel: "Country code",
    placeholder: "",
    name: "phone"
  },
  argTypes: {
    size: { options: ["small", "medium", "large"], control: { type: "inline-radio" } },
    shape: { options: [undefined, "sharp", "rounded", "full"], control: { type: "inline-radio" } },
    flavor: { options: ["default", "gradient", "ghost"], control: { type: "inline-radio" } },
    country: { options: PHONE_COUNTRIES.map(country => country.code), control: { type: "select" } },
    countries: { control: false },
    e164: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7682-19850"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;
type Story = StoryObj<PhoneInputArgs>;

const field = (args: PhoneInputArgs) =>
  html`<zeta-phone-input
    .label=${args.label ?? ""}
    .hintText=${args.hintText}
    .errorText=${args.errorText}
    .error=${args.error ?? false}
    .required=${args.required ?? false}
    .optional=${args.optional ?? false}
    .disabled=${args.disabled ?? false}
    .block=${args.block ?? false}
    .rounded=${args.rounded}
    .shape=${args.shape}
    .size=${args.size ?? "medium"}
    .flavor=${args.flavor ?? "default"}
    .value=${args.value ?? ""}
    .country=${args.country ?? "US"}
    .countries=${args.countries ?? PHONE_COUNTRIES}
    .countryLabel=${args.countryLabel ?? "Country code"}
    .placeholder=${args.placeholder ?? ""}
    .name=${args.name ?? ""}
  ></zeta-phone-input>`;

const row = (children: unknown) => html`<div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: start;">${children}</div>`;
const states = (args: PhoneInputArgs) => row([field(args), field({ ...args, error: true }), field({ ...args, disabled: true })]);

export const PhoneInput: Story = {
  name: "Phone Input",
  render: field
};

/** One state across every part. */
export const States: Story = { render: states };

/** Height follows size. Only small also reduces the text. */
export const Sizes: Story = {
  render: args => row((["small", "medium", "large"] as const).map(size => field({ ...args, size })))
};

/** The country control's start and the number's end share the corner. */
export const Shapes: Story = {
  render: args => row((["rounded", "sharp", "full"] as const).map(shape => field({ ...args, shape })))
};

/** `default` in a form, `gradient` for a distinct interaction, `ghost` on a surface that already bounds it. */
export const Flavors: Story = {
  render: args => html`<div style="display: grid; gap: 32px;">${(["default", "gradient", "ghost"] as const).map(flavor => states({ ...args, flavor }))}</div>`
};

/** Each country brings its dial code and grouping. */
export const Countries: Story = {
  render: args => row(["GB", "NG", "DE"].map(country => field({ ...args, country, value: "8031234567" })))
};

const stripes = (...colours: string[]) =>
  html`<svg viewBox="0 0 3 2" role="presentation">${colours.map((fill, index) => svg`<rect x=${index} width="1" height="2" fill=${fill} />`)}</svg>`;
const artwork: Record<string, ReturnType<typeof stripes>> = {
  IE: stripes("#169b62", "#fff", "#ff883e"),
  NG: stripes("#008751", "#fff", "#008751"),
  FR: stripes("#0055a4", "#fff", "#ef4135")
};
const withArtwork: PhoneCountry[] = PHONE_COUNTRIES.filter(country => country.code in artwork).map(country => ({ ...country, flag: artwork[country.code] }));

/** `flag` takes real artwork. It replaces the emoji in the control and the menu, on every platform. */
export const Flags: Story = {
  args: { country: "NG", value: "8031234567" },
  // Storybook can't walk a Lit template in args, so the artwork stays out of them.
  render: args => field({ ...args, countries: withArtwork })
};

/** Fills the container's width. */
export const Block: Story = {
  args: { block: true },
  render: args => html`<div style="width: 480px;">${field(args)}</div>`
};
