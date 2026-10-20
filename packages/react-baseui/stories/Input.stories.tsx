import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../src/index.js";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Label, field and hint as one unit, on Base UI's Field. `state` keeps the three parts in agreement; the field's own props are set here too." } } },
  argTypes: {
    state: { control: "inline-radio", options: ["default", "invalid", "disabled"] },
    labelType: { control: "inline-radio", options: ["default", "required", "optional"] },
    type: { control: "select", options: ["text", "number", "password", "date", "time"] },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    shape: { control: "inline-radio", options: ["sharp", "rounded", "full"] },
    flavour: { control: "inline-radio", options: ["default", "gradient", "ghost"] },
  },
  args: { label: "Field name", labelType: "optional", information: false, hint: "Default hint message", hintIcon: true, state: "default", type: "text", size: "medium", shape: "rounded", flavour: "default", placeholder: "Placeholder" },
  render: (a) => <div style={{ maxInlineSize: 320 }}><Input {...a} /></div>,
};
export default meta;
type Story = StoryObj<typeof Input>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,300px))", gap: 24 }}>{children}</div>
);

export const Playground: Story = {};

/** The general states, set once on the assembly and carried to all three parts. */
export const States: Story = {
  render: () => (
    <Row>
      {(["default", "invalid", "disabled"] as const).map((st) => (
        <Input key={st} label="Email" labelType="required" state={st} defaultValue={st === "default" ? "" : "name@company"} placeholder="name@company.com" leadingIcon="email"
          hint={st === "invalid" ? "Enter a valid email address" : "We'll only use this for receipts"} />
      ))}
    </Row>
  ),
};

/** Mark whichever of required or optional is the exception in the form, not both. */
export const LabelTypes: Story = {
  render: () => (
    <Row>
      <Input label="Default" placeholder="Placeholder" />
      <Input label="Required" labelType="required" placeholder="Placeholder" />
      <Input label="Optional" labelType="optional" placeholder="Placeholder" />
      <Input label="With information" information informationLabel="About this field" placeholder="Placeholder" />
    </Row>
  ),
};

/** Show Label / Show Hint: an empty label or hint removes its row, and the stack shortens. */
export const Parts: Story = {
  render: () => (
    <Row>
      <Input label="Label and hint" hint="Hint" placeholder="Placeholder" />
      <Input label="Label only" placeholder="Placeholder" />
      <Input aria-label="Hint only" hint="Hint only (name it another way)" placeholder="Placeholder" />
      <Input label="Hint without icon" hint="Message only" hintIcon={false} placeholder="Placeholder" />
    </Row>
  ),
};

export const Types: Story = {
  render: () => (
    <Row>
      {(["text", "number", "password", "date", "time"] as const).map((t) => (
        <Input key={t} label={t} type={t} hint="Hint" placeholder={t === "number" ? "0" : t === "password" ? "Password" : t === "text" ? "Placeholder" : undefined} />
      ))}
    </Row>
  ),
};

/** The input submits under its name; required blocks submit; Reset restores. */
export const InAForm: Story = {
  render: () => {
    const [out, setOut] = React.useState("");
    return (
      <form style={{ display: "grid", gap: 16, maxInlineSize: 320, font: "14px/1.4 system-ui", color: "var(--foreground-primary)" }}
        onSubmit={(e) => { e.preventDefault(); setOut(JSON.stringify([...new FormData(e.currentTarget)])); }}>
        <Input name="email" label="Email" labelType="required" placeholder="name@company.com" hint="Required" />
        <Input name="seats" label="Seats" type="number" defaultValue="2" hint="How many" />
        <div style={{ display: "flex", gap: 8 }}><button type="submit">Submit</button><button type="reset">Reset</button></div>
        <output>{out}</output>
      </form>
    );
  },
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)", display: "grid", gap: 16 }}>
          <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cls || "base / light"}</div>
          <Input label="Field name" labelType="optional" information hint="Default hint message" placeholder="Placeholder" />
          <Input label="Field name" labelType="required" state="invalid" defaultValue="Value" hint="Something went wrong" />
          <Input label="Field name" state="disabled" defaultValue="Value" hint="Not available" />
        </div>
      ))}
    </div>
  ),
};
