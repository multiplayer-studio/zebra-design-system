import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioGroup } from "../src/index.js";

const SIZES = ["large", "medium"] as const;

const meta: Meta<typeof Radio> = {
  title: "Components/Form/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Behaviour from Base UI's Radio and RadioGroup; everything visual from the shared token layer. Always used inside a RadioGroup." } },
  },
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: { size: "large", disabled: false, label: "Option" },
  render: (a) => (
    <RadioGroup defaultValue="a" aria-label="Playground">
      <Radio {...a} value="a" label={`${a.label} A`} />
      <Radio {...a} value="b" label={`${a.label} B`} />
      <Radio {...a} value="c" label={`${a.label} C`} />
    </RadioGroup>
  ),
};
export default meta;
type Story = StoryObj<typeof Radio>;

const Caption = ({ children }: { children: React.ReactNode }) => (
  <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</span>
);
const Grid = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, auto)", gap: "8px 32px", justifyContent: "start", alignItems: "center" }}>{children}</div>
);

export const Playground: Story = {};

/** The ring changes size; the 40 by 40 touch target and the label's type do not. */
export const Sizes: Story = {
  render: () => (
    <Grid>
      {SIZES.map((s) => (
        <React.Fragment key={s}>
          <Caption>{s}</Caption>
          <RadioGroup defaultValue="on" aria-label={s} style={{ flexDirection: "row" }}>
            <Radio size={s} value="on" label="Checked" />
            <Radio size={s} value="off" label="Unchecked" />
          </RadioGroup>
        </React.Fragment>
      ))}
    </Grid>
  ),
};

/**
 * Checked and unchecked, enabled and disabled. Hover a row, or Tab into the
 * first group and use the arrow keys, for the interactive states. A disabled
 * option shows whether it is chosen (spec blocker: Figma ships only an
 * unchecked disabled variant, drawn with the dot).
 */
export const States: Story = {
  render: () => (
    <Grid>
      <Caption>enabled</Caption>
      <RadioGroup defaultValue="on" aria-label="Enabled" style={{ flexDirection: "row" }}>
        <Radio value="on" label="Checked" />
        <Radio value="off" label="Unchecked" />
      </RadioGroup>
      <Caption>disabled</Caption>
      <RadioGroup defaultValue="on" aria-label="Disabled" disabled style={{ flexDirection: "row" }}>
        <Radio value="on" label="Checked" />
        <Radio value="off" label="Unchecked" />
      </RadioGroup>
      <Caption>one option disabled</Caption>
      <RadioGroup defaultValue="a" aria-label="Mixed" style={{ flexDirection: "row" }}>
        <Radio value="a" label="Available" />
        <Radio value="b" label="Sold out" disabled />
      </RadioGroup>
    </Grid>
  ),
};

/** hasLabel = false: the control alone, at its 40 by 40 target. Name it another way. */
export const WithoutLabel: Story = {
  render: () => (
    <RadioGroup defaultValue="a" aria-label="Rating" style={{ flexDirection: "row" }}>
      {["a", "b", "c", "d", "e"].map((v, i) => <Radio key={v} value={v} aria-label={`${i + 1} stars`} />)}
    </RadioGroup>
  ),
};

/** Theming is a class, at any level. */
export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)" }}>
          <div style={{ font: "500 12px/1.4 system-ui", marginBottom: 8, opacity: 0.7 }}>{cls || "base / light"}</div>
          <RadioGroup defaultValue="a" aria-label={cls || "base"}>
            <Radio value="a" label="Checked" />
            <Radio value="b" label="Unchecked" />
            <Radio value="c" label="Disabled" disabled />
          </RadioGroup>
        </div>
      ))}
    </div>
  ),
};
