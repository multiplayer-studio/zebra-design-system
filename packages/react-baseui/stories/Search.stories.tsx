import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "../src/index.js";
import { iconNames } from "@zebra-design-system/icons/names";

const SHAPES = ["sharp", "rounded", "full"] as const;
const SIZES = ["small", "medium", "large"] as const;
const FLAVOURS = ["default", "gradient", "ghost"] as const;

const meta: Meta<typeof Search> = {
  title: "Components/Search",
  component: Search,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Behaviour from Base UI's Input primitive; everything visual from the shared token layer. State follows the field." } },
  },
  argTypes: {
    shape: { control: "inline-radio", options: SHAPES },
    size: { control: "inline-radio", options: SIZES },
    flavour: { control: "inline-radio", options: FLAVOURS },
    disabled: { control: "boolean" },
    hideFocusOutline: { control: "boolean", description: "Ghost only: the container shows focus instead." },
    leadingIcon: { control: "select", options: [null, ...iconNames], description: "The spec's hasLeading. null drops it." },
    trailingIcon: { control: "select", options: [undefined, ...iconNames], description: "The spec's hasTrailing. Give it a function and a trailingLabel." },
  },
  args: { shape: "sharp", size: "large", flavour: "default", disabled: false, hideFocusOutline: false, leadingIcon: "search", trailingIcon: "microphone", trailingLabel: "Search by voice", "aria-label": "Search" },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Search>;

const Stack = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 16, maxWidth: 320 }}>{children}</div>;
const Labelled = ({ text, children }: { text: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: 6 }}><span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{text}</span>{children}</div>
);

export const Playground: Story = {};

/** Height, text and icon size move together. Only small reduces the text. */
export const Sizes: Story = {
  render: () => <Stack>{SIZES.map((s) => <Labelled key={s} text={s}><Search size={s} trailingIcon="microphone" trailingLabel="Search by voice" aria-label={s} /></Labelled>)}</Stack>,
};

/** Shape changes nothing but the corners. */
export const Shapes: Story = {
  render: () => <Stack>{SHAPES.map((s) => <Labelled key={s} text={s}><Search shape={s} aria-label={s} /></Labelled>)}</Stack>,
};

/** Default in a form, ghost on a surface that already bounds it, gradient for a distinct interaction. */
export const Flavours: Story = {
  render: () => <Stack>{FLAVOURS.map((f) => <Labelled key={f} text={f}><Search flavour={f} shape="rounded" trailingIcon="microphone" trailingLabel="Search by voice" aria-label={f} /></Labelled>)}</Stack>,
};

/** State follows the field: hover, Tab in (focus), click in (selected), type (typing, with the clear control). */
export const States: Story = {
  render: () => (
    <Stack>
      <Labelled text="enabled — hover, Tab, click or type"><Search trailingIcon="microphone" trailingLabel="Search by voice" aria-label="Enabled" /></Labelled>
      <Labelled text="filled"><Search defaultValue="Warehouse scanners" trailingIcon="microphone" trailingLabel="Search by voice" aria-label="Filled" /></Labelled>
      <Labelled text="disabled"><Search disabled trailingIcon="microphone" trailingLabel="Search by voice" aria-label="Disabled" /></Labelled>
    </Stack>
  ),
};

/** hasLeading and hasTrailing are the leadingIcon and trailingIcon props. */
export const LeadingAndTrailing: Story = {
  render: () => (
    <Stack>
      <Labelled text="both"><Search trailingIcon="microphone" trailingLabel="Search by voice" aria-label="Both" /></Labelled>
      <Labelled text="leading only"><Search aria-label="Leading only" /></Labelled>
      <Labelled text="neither"><Search leadingIcon={null} aria-label="Neither" /></Labelled>
    </Stack>
  ),
};

/** Theming is a class, at any level. */
export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)" }}>
          <div style={{ font: "500 12px/1.4 system-ui", marginBottom: 12, opacity: 0.7 }}>{cls || "base / light"}</div>
          <div style={{ display: "grid", gap: 12 }}>
            <Search trailingIcon="microphone" trailingLabel="Search by voice" aria-label="Default" />
            <Search flavour="gradient" shape="full" aria-label="Gradient" />
            <Search flavour="ghost" defaultValue="Filled ghost" aria-label="Ghost" />
          </div>
        </div>
      ))}
    </div>
  ),
};
