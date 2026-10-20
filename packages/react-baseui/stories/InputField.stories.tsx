import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "../src/index.js";

const TYPES = ["text", "number", "password", "date", "time"] as const;
const SIZES = ["small", "medium", "large"] as const;
const SHAPES = ["sharp", "rounded", "full"] as const;
const FLAVOURS = ["default", "gradient", "ghost"] as const;
const PLACEHOLDER: Record<string, string | undefined> = { text: "Placeholder", number: "0", password: "Password" };
const VALUE: Record<string, string> = { text: "Value", number: "3", password: "secret12", date: "2026-10-14", time: "09:30" };
const leading = (t: string) => (t === "text" || t === "number" || t === "password" ? "email" : null);

const meta: Meta<typeof InputField> = {
  title: "Components/Input Field",
  component: InputField,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "The field alone. Use Input when it needs a label or hint. Hover, focus, selected and typing come from interaction; invalid, readOnly and disabled from props." } } },
  argTypes: {
    type: { control: "select", options: TYPES },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: SHAPES },
    flavour: { control: "inline-radio", options: FLAVOURS },
  },
  args: { type: "text", size: "medium", shape: "sharp", flavour: "default", invalid: false, readOnly: false, disabled: false },
  render: (a) => <div style={{ maxInlineSize: 320 }}><InputField aria-label="Playground" placeholder={PLACEHOLDER[a.type ?? "text"]} {...a} /></div>,
};
export default meta;
type Story = StoryObj<typeof InputField>;

const Cap = ({ children }: { children: React.ReactNode }) => <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</span>;
const Grid = ({ children, cols = "max-content minmax(260px, 320px)" }: { children: React.ReactNode; cols?: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: cols, gap: "12px 24px", alignItems: "center" }}>{children}</div>
);

export const Playground: Story = {};

/** One field, five types: each brings its placeholder and trailing control. */
export const Types: Story = {
  render: () => <Grid>{TYPES.map((t) => <React.Fragment key={t}><Cap>{t}</Cap><InputField aria-label={t} type={t} placeholder={PLACEHOLDER[t]} leadingIcon={leading(t)} /></React.Fragment>)}</Grid>,
};

/** Height is bound per size (control/sm, md, lg); only small reduces the text. */
export const Sizes: Story = {
  render: () => <Grid>{SIZES.map((s) => <React.Fragment key={s}><Cap>{s}</Cap><InputField aria-label={s} size={s} placeholder="Placeholder" leadingIcon="email" trailingIcon="info" /></React.Fragment>)}</Grid>,
};

export const Shapes: Story = {
  render: () => <Grid>{SHAPES.map((s) => <React.Fragment key={s}><Cap>{s}</Cap><InputField aria-label={s} shape={s} placeholder="Placeholder" /></React.Fragment>)}</Grid>,
};

/** The set states, per flavour. Hover, focus, selected and typing: interact with the enabled and filled rows. */
export const States: Story = {
  render: () => (
    <Grid cols="max-content repeat(3, minmax(200px, 260px))">
      <Cap>{""}</Cap>{FLAVOURS.map((f) => <Cap key={f}>{f}</Cap>)}
      {(["enabled", "filled", "invalid", "read-only", "disabled"] as const).map((st) => (
        <React.Fragment key={st}>
          <Cap>{st}</Cap>
          {FLAVOURS.map((f) => (
            <InputField key={f} aria-label={st} flavour={f} placeholder="Placeholder" leadingIcon="email"
              defaultValue={st === "enabled" ? "" : "Value"} invalid={st === "invalid"} readOnly={st === "read-only"} disabled={st === "disabled"} />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  ),
};

/** Every type, disabled: value, icons and controls all drop to foreground/disabled. */
export const Disabled: Story = {
  render: () => <Grid>{TYPES.map((t) => <React.Fragment key={t}><Cap>{t}</Cap><InputField aria-label={t} type={t} defaultValue={VALUE[t]} disabled leadingIcon={leading(t)} /></React.Fragment>)}</Grid>,
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)", display: "grid", gap: 8 }}>
          <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cls || "base / light"}</div>
          {FLAVOURS.map((f) => <InputField key={f} aria-label={f} flavour={f} placeholder={f} leadingIcon="email" />)}
          <InputField aria-label="invalid" invalid defaultValue="Value" />
          <InputField aria-label="disabled" type="password" disabled defaultValue="secret12" />
        </div>
      ))}
    </div>
  ),
};
