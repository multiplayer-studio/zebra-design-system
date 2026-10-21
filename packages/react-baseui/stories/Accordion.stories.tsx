import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, type AccordionProps } from "../src/index.js";

const FAQ = [
  { value: "returns", title: "Returns and refunds", content: "Return any unused item within 30 days of delivery. Refunds reach the original payment method within five working days of the item arriving back at the warehouse." },
  { value: "delivery", title: "Delivery times", content: "Standard delivery takes two to four working days. Orders placed before 2pm on a working day ship the same day." },
  { value: "tracking", title: "Tracking an order", content: "A tracking link is emailed as soon as the parcel leaves the warehouse. It also appears under Orders in your account." },
  { value: "warranty", title: "Device warranty", content: "Every scanner carries a two-year manufacturer warranty covering defects in materials and workmanship." },
];
const ZONES = [
  { value: "aisle-1", title: "Aisle 1 — Chilled", content: "12 bays, 4 open tasks. Last counted 08:40 by J. Okafor.", selected: true },
  { value: "aisle-2", title: "Aisle 2 — Ambient", content: "18 bays, no open tasks. Last counted yesterday at 17:15." },
  { value: "aisle-3", title: "Aisle 3 — Frozen", content: "8 bays, 2 open tasks. Temperature log due at 11:00." },
  { value: "dock", title: "Loading dock", content: "3 doors, 1 inbound delivery expected at 10:30." },
];

type Row = { value: string; title: string; content: string; selected?: boolean; disabled?: boolean };
const rows = (data: Row[]) =>
  data.map((r) => (
    <AccordionItem key={r.value} value={r.value} heading={r.title} defaultSelected={r.selected} disabled={r.disabled}>
      {r.content}
    </AccordionItem>
  ));

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: 16, maxWidth: 480 }}>{children}</div>
);
const Grid = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", alignItems: "start" }}>{children}</div>
);
const Cap = ({ children }: { children: React.ReactNode }) => (
  <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>
);

const meta: Meta<AccordionProps> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: { onValueChange: { action: "valueChange" } },
  args: { selectable: true, rounded: false, inCard: true, multiple: false, disabled: false },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Accordion {...args} defaultValue={["aisle-1"]}>{rows(ZONES)}</Accordion>
    </div>
  ),
};
export default meta;
type Story = StoryObj<AccordionProps>;

export const Playground: Story = {};

/** Spec `selectable`: a leading control opens the row and the rest of the row ticks it, or the whole row only opens. */
export const Selectable: Story = {
  render: () => (
    <Grid>
      <Stack><Cap>selectable</Cap><Accordion selectable>{rows(ZONES)}</Accordion></Stack>
      <Stack><Cap>not selectable</Cap><Accordion selectable={false}>{rows(FAQ)}</Accordion></Stack>
    </Grid>
  ),
};

/** Spec `rounded`: only the container's corners (and selectable rows' leading control) respond. */
export const Rounded: Story = {
  render: () => (
    <Grid>
      <Stack><Cap>sharp</Cap><Accordion selectable={false}>{rows(FAQ)}</Accordion></Stack>
      <Stack><Cap>rounded</Cap><Accordion selectable={false} rounded>{rows(FAQ)}</Accordion></Stack>
      <Stack><Cap>selectable, rounded</Cap><Accordion rounded>{rows(ZONES)}</Accordion></Stack>
    </Grid>
  ),
};

/** Spec `inCard`: the outline and the row dividers come and go together. The last row never has a divider. */
export const InCard: Story = {
  render: () => (
    <Grid>
      <Stack><Cap>in card</Cap><Accordion selectable={false}>{rows(FAQ)}</Accordion></Stack>
      <Stack><Cap>not in card</Cap><Accordion selectable={false} inCard={false}>{rows(FAQ)}</Accordion></Stack>
    </Grid>
  ),
};

/** Item `open`: one row open at a time by default (spec metadata); `multiple` lets several stay open. */
export const Open: Story = {
  render: () => (
    <Grid>
      <Stack><Cap>single (default)</Cap><Accordion selectable={false} defaultValue={["delivery"]}>{rows(FAQ)}</Accordion></Stack>
      <Stack><Cap>multiple</Cap><Accordion selectable={false} multiple defaultValue={["returns", "tracking"]}>{rows(FAQ)}</Accordion></Stack>
    </Grid>
  ),
};

/** Item `selected`: the row body toggles it and a check mark trails the title. Controlled here, with the chosen values shown. */
export const Selected: Story = {
  render: function Selected() {
    const [chosen, setChosen] = React.useState<string[]>(["aisle-1", "dock"]);
    return (
      <Stack>
        <Accordion>
          {ZONES.map((r) => (
            <AccordionItem
              key={r.value}
              value={r.value}
              heading={r.title}
              selected={chosen.includes(r.value)}
              onSelectedChange={(s) => setChosen((c) => (s ? [...c, r.value] : c.filter((v) => v !== r.value)))}
            >
              {r.content}
            </AccordionItem>
          ))}
        </Accordion>
        <Cap>selected: {chosen.join(", ") || "none"}</Cap>
      </Stack>
    );
  },
};

/** Disabled (not designed in Figma): one row, or the whole accordion. */
export const Disabled: Story = {
  render: () => (
    <Grid>
      <Stack><Cap>one row</Cap><Accordion selectable={false}>{rows(FAQ.map((r, i) => (i === 1 ? { ...r, disabled: true } : r)))}</Accordion></Stack>
      <Stack><Cap>one selectable row</Cap><Accordion>{rows(ZONES.map((r, i) => (i === 2 ? { ...r, disabled: true } : r)))}</Accordion></Stack>
      <Stack><Cap>whole accordion</Cap><Accordion selectable={false} disabled>{rows(FAQ)}</Accordion></Stack>
    </Grid>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 12 }}>
          <Cap>{cls || "base / light"}</Cap>
          <Accordion defaultValue={["aisle-1"]}>{rows(ZONES.slice(0, 3))}</Accordion>
          <Accordion selectable={false} rounded defaultValue={["delivery"]}>{rows(FAQ.slice(0, 3))}</Accordion>
        </div>
      ))}
    </div>
  ),
};
