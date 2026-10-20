import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../src/index.js";

const SIZES = ["large", "medium"] as const;

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Behaviour from Base UI's Checkbox; everything visual from the shared token layer. The spec's Checked axis (false, true, indeterminate) is `checked` + `indeterminate`; indeterminate is set from a mixed set of children, never chosen." } } },
  argTypes: { size: { control: "inline-radio", options: SIZES } },
  args: { size: "large", defaultChecked: true, indeterminate: false, disabled: false, label: "Email me updates" },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

const Cap = ({ children }: { children: React.ReactNode }) => <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</span>;
const Grid = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "8px 24px", justifyContent: "start", alignItems: "center" }}>{children}</div>
);

export const Playground: Story = {};

/** The box changes size; the 40 by 40 touch target and the label's type do not. */
export const Sizes: Story = {
  render: () => (
    <Grid>
      {SIZES.map((s) => (
        <React.Fragment key={s}>
          <Cap>{s}</Cap>
          <Checkbox size={s} defaultChecked label="Checked" />
          <Checkbox size={s} indeterminate label="Indeterminate" />
          <Checkbox size={s} label="Unchecked" />
        </React.Fragment>
      ))}
    </Grid>
  ),
};

/** Every value, enabled and disabled. Hover a row or Tab through for the interactive states. */
export const States: Story = {
  render: () => (
    <Grid>
      {(["enabled", "disabled"] as const).map((st) => (
        <React.Fragment key={st}>
          <Cap>{st}</Cap>
          <Checkbox defaultChecked disabled={st === "disabled"} label="Checked" />
          <Checkbox indeterminate disabled={st === "disabled"} label="Indeterminate" />
          <Checkbox disabled={st === "disabled"} label="Unchecked" />
        </React.Fragment>
      ))}
    </Grid>
  ),
};

/** A parent box that reflects its children: indeterminate when some are checked. */
export const ParentAndChildren: Story = {
  render: () => {
    const [kids, setKids] = React.useState([true, false, false]);
    const n = kids.filter(Boolean).length;
    const names = ["Cheese", "Olives", "Peppers"];
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Checkbox label="All toppings" checked={n === kids.length} indeterminate={n > 0 && n < kids.length} onCheckedChange={(c) => setKids(kids.map(() => c))} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingInlineStart: "var(--space-xl)" }}>
          {names.map((nm, i) => <Checkbox key={nm} label={nm} checked={kids[i]} onCheckedChange={(c) => setKids(kids.map((k, j) => (j === i ? c : k)))} />)}
        </div>
      </div>
    );
  },
};

/** No label: the control alone, at its 40 by 40 target. Name it another way. */
export const WithoutLabel: Story = { render: () => <Checkbox defaultChecked aria-label="Select row" /> };

/** Inside a form: submits value under name when checked; required blocks submit; Reset restores. */
export const InAForm: Story = {
  render: () => {
    const [out, setOut] = React.useState("");
    return (
      <form style={{ display: "grid", gap: 4, justifyItems: "start", font: "14px/1.4 system-ui", color: "var(--foreground-primary)" }}
        onSubmit={(e) => { e.preventDefault(); setOut(JSON.stringify([...new FormData(e.currentTarget)])); }}>
        <Checkbox name="updates" value="yes" defaultChecked label="Email me updates" />
        <Checkbox name="extras" value="sms" label="Text me too" />
        <Checkbox name="terms" required label="I accept the terms (required)" />
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}><button type="submit">Submit</button><button type="reset">Reset</button></div>
        <output>{out}</output>
      </form>
    );
  },
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ font: "500 12px/1.4 system-ui", marginBottom: 8, opacity: 0.7 }}>{cls || "base / light"}</div>
          <Checkbox defaultChecked label="Checked" />
          <Checkbox indeterminate label="Indeterminate" />
          <Checkbox label="Unchecked" />
          <Checkbox defaultChecked disabled label="Disabled checked" />
        </div>
      ))}
    </div>
  ),
};
