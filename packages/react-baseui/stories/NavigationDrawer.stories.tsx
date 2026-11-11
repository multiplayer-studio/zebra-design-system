import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  CollapsibleMenuItem, Divider, IconButton, NavigationDrawer, NavigationHeader, SubMenuItem, TopAppBar,
  type NavigationDrawerProps,
} from "../src/index.js";

const DESTINATIONS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "inbox", label: "Inbox", icon: "inbox", badge: 3 },
  { id: "schedule", label: "Schedule", icon: "calendar" },
] as const;

/** The menu, footer and header every story shares. `current` is the selected destination. */
function useNav(initial = "home") {
  const [current, setCurrent] = React.useState(initial);
  // Every top-level row is a SubMenuItem, the same row a CollapsibleMenuItem
  // header is, so glyphs, labels and heights line up down the drawer.
  const item = (id: string, label: string, icon: React.ComponentProps<typeof SubMenuItem>["icon"], badge?: number) => (
    <SubMenuItem key={id} label={label} icon={icon} badge={badge} badgeLabel={badge ? `${badge} unread` : undefined}
      selected={current === id} onClick={() => setCurrent(id)} />
  );
  const group = (label: string, icon: React.ComponentProps<typeof SubMenuItem>["icon"], rows: string[]) => (
    <CollapsibleMenuItem label={label} icon={icon}>
      {rows.map((r) => (
        <SubMenuItem key={r} label={r} selected={current === r} onClick={() => setCurrent(r)} />
      ))}
    </CollapsibleMenuItem>
  );
  // A group before the divider and two after, so both kinds of row sit on each side.
  const menu = (
    <>
      {DESTINATIONS.map((d) => item(d.id, d.label, d.icon, "badge" in d ? d.badge : undefined))}
      {group("Documents", "folder", ["Recent", "Shared with me"])}
      <Divider />
      {group("Reports", "chart-bar", ["Daily", "Weekly", "Monthly"])}
      {group("Team", "group", ["Members", "Roles"])}
    </>
  );
  const footer = (
    <>
      {item("settings", "Settings", "settings")}
      {item("help", "Help", "help")}
    </>
  );
  const header = <NavigationHeader type="logo" heading="Workcloud" showIconButton={false} />;
  return { current, menu, footer, header };
}

const page: React.CSSProperties = {
  blockSize: 560, display: "flex", flexDirection: "column", background: "var(--surface-page)",
  color: "var(--foreground-primary)", overflow: "hidden", border: "var(--stroke-thin) solid var(--border-default)",
};

/** A phone-sized screen: the app bar's menu button opens the modal drawer. */
function ModalDemo(rest: Partial<NavigationDrawerProps>) {
  const [open, setOpen] = React.useState(false);
  const nav = useNav();
  return (
    <div style={{ ...page, maxInlineSize: 400 }}>
      <TopAppBar type="default" pageTitle={nav.current[0].toUpperCase() + nav.current.slice(1)} onLeadingClick={() => setOpen(true)} />
      <div style={{ padding: "var(--space-md)", font: "var(--text-body-medium)" }}>
        Press the menu button to open the drawer. Choosing a destination closes it.
      </div>
      <NavigationDrawer {...rest} open={open} onOpenChange={(o) => setOpen(o)}
        header={nav.header} footer={nav.footer}>
        {nav.menu}
      </NavigationDrawer>
    </div>
  );
}

const meta: Meta<typeof NavigationDrawer> = {
  title: "Components/Navigation Drawer",
  component: NavigationDrawer,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "The app's destinations in a tall panel at the edge of the screen. **Modal** (default) slides over the page on a Scrim, traps focus, and closes on Escape, a scrim click or a chosen destination. **Standard** (`modal={false}`) sits in the layout and pushes the content. It is built from the Navigation Rail family: a NavigationHeader on top, then SubMenuItem rows for every destination, CollapsibleMenuItem for groups, and Divider. All rows share one row component, so they line up. It and follows the page's colour mode." } },
  },
  argTypes: {
    side: { control: "inline-radio", options: ["start", "end"] },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
  },
  args: { side: "start", shape: "rounded", dismissible: true, closeOnNavigate: true, showClose: true },
};
export default meta;
type Story = StoryObj<typeof NavigationDrawer>;

export const Modal: Story = {
  render: (a) => <ModalDemo {...a} />,
};

export const WithAction: Story = {
  name: "With action and close button",
  args: { actionLabel: "New task", showClose: true },
  render: (a) => <ModalDemo {...a} />,
};

export const EndSide: Story = {
  name: "From the end edge",
  args: { side: "end" },
  render: (a) => <ModalDemo {...a} />,
};

export const Sharp: Story = {
  args: { shape: "sharp" },
  render: (a) => <ModalDemo {...a} />,
};

export const Standard: Story = {
  name: "Standard (in the layout)",
  render: function Render(a) {
    const [open, setOpen] = React.useState(false);
    const nav = useNav();
    return (
      // No fixed height and no overflow: the page scrolls the drawer, and its header sticks.
      <div style={{ ...page, flexDirection: "row", blockSize: undefined, minBlockSize: 560, overflow: "visible" }}>
        <NavigationDrawer {...a} modal={false} open={open} header={nav.header} footer={nav.footer}>
          {nav.menu}
        </NavigationDrawer>
        <div style={{ flex: 1, minInlineSize: 0, padding: "var(--space-md)", display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
            <IconButton flavour="subtle" size="medium" icon="hamburger-menu" label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open} onClick={() => setOpen(!open)} />
            <span style={{ font: "var(--text-title-medium)" }}>{nav.current[0].toUpperCase() + nav.current.slice(1)}</span>
          </div>
          <div style={{ flex: 1, borderRadius: "var(--radius-element-md)", background: "var(--surface-section)" }} />
        </div>
      </div>
    );
  },
};

export const Dark: Story = {
  render: function Render(a) {
    // The drawer portals; mount it inside the dark root so it keeps the mode.
    const [root, setRoot] = React.useState<HTMLDivElement | null>(null);
    return (
      <div ref={setRoot} className="mode-dark" style={{ background: "var(--surface-page)", padding: "var(--space-md)" }}>
        {root ? <ModalDemo {...a} portalContainer={root} /> : null}
      </div>
    );
  },
};
