import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button, Checkbox, Dialog, Divider, GlobalHeader, Icon, IconButton, Input, InputChip, MenuItem, NavigationHeader, NavigationRail,
  NavigationRailItem, Search, Select, Snackbar,
  type IconName,
} from "../src/index.js";
import { Scrollbar } from "../src/index.js";
import { ZebraLogo } from "./zebra-logo.js";

/** A clipped region paired with the library Scrollbar (specs/scrollbar): the region keeps the scroll,
    the bar mirrors it as an overlay on the trailing edge. The native scrollbar is hidden; the bar
    only shows while the content overflows. */
function Scrolled({ tag = "div", enabled = true, outer, scrollRef, style, children, ...rest }: {
  tag?: "div" | "main" | "section"; enabled?: boolean; outer?: React.CSSProperties;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
} & React.HTMLAttributes<HTMLDivElement>) {
  const inner = React.useRef<HTMLDivElement | null>(null);
  const [bar, setBar] = React.useState<{ value: number; size: number } | null>(null);
  const sync = () => {
    const el = inner.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setBar((b) => {
      const next = enabled && max > 1 ? { value: el.scrollTop / max, size: el.clientHeight / el.scrollHeight } : null;
      if (!b || !next) return b === next ? b : next;
      return Math.abs(b.value - next.value) < 0.002 && Math.abs(b.size - next.size) < 0.002 ? b : next;
    });
  };
  React.useEffect(sync); // re-measure after every render, so content changes move the bar
  const Tag = tag as "div";
  return (
    <div style={{ position: "relative", display: "flex", flex: 1, minBlockSize: 0, ...outer }}>
      <Tag
        ref={(el: HTMLDivElement | null) => {
          inner.current = el;
          if (scrollRef) scrollRef.current = el;
        }}
        onScroll={sync}
        {...rest}
        style={{ ...style, flex: 1, minInlineSize: 0, minBlockSize: 0, overflowY: enabled ? "auto" : "hidden", scrollbarWidth: "none" }}
      >
        {children}
      </Tag>
      {bar ? (
        <Scrollbar value={bar.value} size={bar.size}
          style={{ position: "absolute", insetBlock: 0, insetInlineEnd: 0, ["--zds-scrollbar-length" as string]: "100%" }} />
      ) : null}
    </div>
  );
}


/* A mock desktop flow, not a component: adding and managing devices in the
   Admin portal, from the Rebuild section of Zebra Design System Patterns
   (node 39:15209), 1440 × 1020. Every control is a library component; Figma's
   local parts (Admin Top Bar, Admin Navigation Drawer, Devices Toolbar,
   Devices List Header, Device Item, Sheet Header, Sheet Footer, Option Card,
   Upload Dropzone, File Row, Confirm Dialog, Device Details Panel, Assignment
   Section, Dashboard Action Bar, Device Type Card) are composed here from those
   and semantic tokens, each text at its Figma style.

   Where the page departs from Figma:
   - Text colour: Figma's local components bind palette ink/high and
     ink/medium; the page uses foreground/primary and foreground/secondary.
   - Dialogs: Figma hides the header's leading icon; page CSS hides it.
   - Toasts: Snackbar hugs its message, as in Figma.
   - Copy: Figma's import prompt (row 2, screen 04) asks to "delete this
     device"; the page uses the add prompt from screen 05 ("add these 4
     devices?"). Figma's deleted toast says "1 device deleted" after deleting
     three; the page uses the real count.
   - Motion (not in Figma): the side sheet slides in from the right over a
     fading scrim, dialogs and toasts ease in, all reversing on close, on
     animations/smooth. The rail collapses with its own animation (Collapse,
     or the header's menu button) and the content fills the space.
   - Not designed: what Next does on Add Device (the option cards go straight
     to their step, and Next stays disabled as in Figma), Link to your data,
     Sort, Select Users, Remove License and Save. They are inert. Deleting
     removes the devices from the list and Undo puts them back. Filter opens
     screen 09's device-type cards; picking one narrows the list to that type,
     which Figma shows but doesn't spell out. */

const IMG = (name: string) => new URL(`./assets/admin-portal-flow/${name}.png`, import.meta.url).href;
const EMPTY = IMG("empty-devices");
const CONFIRM = IMG("confirm");

type Text = "body-xsmall" | "body-small" | "body-medium" | "label-medium" | "label-large" | "title-medium" | "title-large" | "heading-large";
const t = (role: Text): React.CSSProperties => ({ font: `var(--text-${role})`, letterSpacing: `var(--${role}-letter-spacing)`, margin: 0 });

/** Keeps a closing overlay mounted for its exit animation (animations/smooth, 250ms; none with reduced motion). */
function useExit<T>(value: T | null): [T | null, boolean] {
  const [shown, setShown] = React.useState(value);
  const [closing, setClosing] = React.useState(false);
  React.useEffect(() => {
    if (value != null) { setShown(value); setClosing(false); return; }
    const reduce = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(null); return; }
    setClosing(true);
    const id = setTimeout(() => { setShown(null); setClosing(false); }, 250);
    return () => clearTimeout(id);
  }, [value]);
  return [value ?? shown, closing && value == null];
}

const PAGE_CSS = [
  // Figma hides the dialog header's leading icon; Dialog draws it inline-styled, so !important.
  ".ap-dialog{--zds-dialog-width:560px}.ap-dialog .zds-dialog__icon{display:none!important}",
  // Figma's toasts hug their message.
  ".ap-toast .zds-snackbar{inline-size:auto}",
  // Option Card, Device Item and Device Type Card states.
  ".ap-card{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:var(--space-lg);padding:var(--space-lg);border:var(--stroke-thin) solid var(--border-default);border-radius:var(--radius-md);background:var(--surface-card);color:var(--foreground-primary);cursor:pointer}",
  ".ap-card:hover,.ap-device:hover,.ap-type:hover{background:var(--interactive-neutral-background-hover)}",
  ".ap-card:focus-visible,.ap-device:focus-visible,.ap-type:focus-visible{outline:var(--stroke-thick) solid var(--border-focus);outline-offset:calc(-1 * var(--stroke-thick))}",
  ".ap-device{all:unset;box-sizing:border-box;position:relative;display:flex;align-items:center;gap:var(--space-md);inline-size:100%;padding:var(--space-md);background:var(--surface-card);border-block-end:var(--stroke-thin) solid var(--border-default);color:var(--foreground-primary);cursor:pointer}",
  ".ap-device[aria-pressed=true]{background:var(--surface-info)}",
  ".ap-device[aria-pressed=true]::after{content:'';position:absolute;inset-block:4px;inset-inline-end:0;inline-size:4px;background:var(--border-focus)}",
  ".ap-type{all:unset;box-sizing:border-box;display:grid;justify-items:center;align-content:center;gap:var(--space-xs);flex:none;inline-size:160px;block-size:140px;padding:var(--space-md);border:var(--stroke-thin) solid var(--border-default);border-radius:var(--radius-md);background:var(--surface-card);color:var(--foreground-primary);text-align:center;cursor:pointer}",
  ".ap-type[aria-pressed=true]{background:var(--surface-info);border-color:var(--selection-border)}",
  // Motion, on animations/smooth: the scrim fades, the side sheet slides in from
  // the right, dialogs and toasts ease in, and each runs in reverse on close.
  "@keyframes ap-fade{from{opacity:0}}@keyframes ap-slide{from{transform:translateX(100%)}}@keyframes ap-pop{from{opacity:0;transform:translateY(8px) scale(.98)}}",
  ".ap-scrim{animation:ap-fade var(--animations-smooth) both}.ap-sheet{animation:ap-slide var(--animations-smooth) both}.ap-pop{animation:ap-pop var(--animations-smooth) both}",
  "[data-closing].ap-scrim{animation-name:ap-fade-out}@keyframes ap-fade-out{to{opacity:0}}",
  "[data-closing] .ap-sheet{animation-name:ap-slide-out}@keyframes ap-slide-out{to{transform:translateX(100%)}}",
  "[data-closing].ap-pop,[data-closing] .ap-pop{animation-name:ap-pop-out}@keyframes ap-pop-out{to{opacity:0;transform:translateY(8px) scale(.98)}}",
  ".ap-reveal{display:grid;grid-template-rows:0fr;transition:grid-template-rows var(--animations-smooth)}.ap-reveal[data-open]{grid-template-rows:1fr}",
  "@media (prefers-reduced-motion:reduce){.ap-scrim,.ap-sheet,.ap-pop{animation:none!important}.ap-reveal{transition:none}}",
  // The Tip line's links.
  ".ap-tip a{color:var(--foreground-link)}",
].join("");

type Sheet = null | "add" | "details" | "import" | "assign";
type Prompt = null | "activate" | "import" | "delete";

interface Device { id: string; name: string; meta: string; icon: IconName }
const DEVICES: Device[] = [
  { id: "523907", name: "Device 523907", meta: "Last active user: Johnathon Sanchez", icon: "phone-iphone" },
  { id: "001315", name: "Device 001315", meta: "Last active user: Bruce Wayne", icon: "tablet-mac" },
  { id: "792347", name: "Device 792347", meta: "Last active user: N/A", icon: "scanner" },
  { id: "729301", name: "Device 729301", meta: "Last active user: Username", icon: "phone-android" },
  { id: "429104", name: "Device 429104", meta: "Last active user: Username", icon: "tablet" },
  { id: "123948", name: "Device 123948", meta: "Last active user: Username", icon: "desktop" },
  { id: "349201", name: "Device 349201", meta: "Last active user: Username", icon: "phone-iphone" },
];
const IMPORTED = ["Device 523907", "Device 457257", "Device 574829", "Device 743012"];
const DEVICE_TYPES: { label: string; icon: IconName }[] = [
  { label: "Goose Tablet", icon: "tablet-mac" }, { label: "Android", icon: "phone-android" }, { label: "Scanner", icon: "scanner" },
  { label: "Tablet", icon: "tablet" }, { label: "TC-12345", icon: "phone-iphone" }, { label: "Desktop", icon: "desktop" },
];
const NAV: { label: string; icon: IconName }[] = [
  { label: "Hierarchy", icon: "tiers" }, { label: "Entitlements", icon: "certified" }, { label: "Sites", icon: "building" },
  { label: "Departments", icon: "store" }, { label: "Roles", icon: "person-admin" }, { label: "Users", icon: "person" },
  { label: "Groups", icon: "groups" }, { label: "System Notifications", icon: "alert" }, { label: "Devices", icon: "smart-phone" },
  { label: "Translations", icon: "world" },
];
type Chip = { label: string; src?: string; initials?: string; color?: string };
const ASSIGNMENTS: { title: string; description: string; chips: Chip[] }[] = [
  { title: "Assign to User(s)", description: "Assign device to a user or multiple users", chips: [{ label: "Barry Allen", src: IMG("barry") }, { label: "Clark Kent", src: IMG("clark") }] },
  { title: "Assign to a Role", description: "Select a role access for this device", chips: [{ label: "Store Associate", initials: "SA", color: "orange" }] },
  { title: "Assign to a Skill(s)", description: "Select skills needed for this device", chips: [{ label: "Forklift Driver Level 2", initials: "FD", color: "purple" }, { label: "French Wine SME", initials: "SM", color: "yellow" }] },
  { title: "Select Sites", description: "Select sites for your device", chips: [{ label: "New York Store B", initials: "B", color: "green" }, { label: "New York Store C", initials: "C", color: "sea" }, { label: "New York Store D", initials: "D", color: "burgundy" }] },
  { title: "Assign to a Group(s)", description: "Grant groups access for your employee", chips: [{ label: "Forklift Driver Level 2", initials: "FD", color: "purple" }, { label: "French Wine SME", initials: "SM", color: "yellow" }] },
];
const FIELDS = [
  { key: "name", label: "Device Name", placeholder: "Enter device name" },
  { key: "serial", label: "Serial Number / Device ID", placeholder: "Enter device ID" },
  { key: "type", label: "Device Type", placeholder: "Enter device type" },
  { key: "details", label: "Device Details", placeholder: "Enter device details" },
] as const;
type Fields = Record<(typeof FIELDS)[number]["key"], string>;
const EMPTY_FIELDS: Fields = { name: "", serial: "", type: "", details: "" };

/* ---- shell ------------------------------------------------------------------- */

/** Figma's Admin Top Bar: Global Header, locked to Dark as in Figma. */
const AdminTopBar = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <GlobalHeader mode="dark" menuLabel="Toggle navigation" onMenuClick={onMenuClick} platformName="Welcome to Admin" username="firstname.lastname@zebra.com" searchBar={false} dividers
    avatarProps={{ type: "icon", icon: "verified", swatchColor: "purple" }}
    menuItems menuItemsSlot={<Button flavour="text" size="small" shape="rounded" leadingIcon="open-in-new-window">Open Wizard</Button>}
    actionMenu actionMenuSlot={<>
      <IconButton flavour="subtle" size="medium" shape="full" icon="search" label="Search" />
      <IconButton flavour="subtle" size="medium" shape="full" icon="alert" label="Notifications" />
      <IconButton flavour="subtle" size="medium" shape="full" icon="help" label="Help" />
    </>}
    accountMenu={<><MenuItem leadingIcon="settings">Settings</MenuItem><MenuItem leadingIcon="log-out">Sign out</MenuItem></>} />
);

type PageMode = "light" | "dark" | "aaa-light" | "aaa-dark";

/**
 * Figma's Admin Navigation Drawer: Navigation Rail, Devices selected. It follows
 * the page's mode: light (inverse) on a light page, dark on a dark one, and the
 * AAA class on top for the AAA modes.
 */
const AdminDrawer = ({ mode, expanded, onExpandedChange }: { mode: PageMode; expanded: boolean; onExpandedChange: (expanded: boolean) => void }) => (
  <NavigationRail railWidth={255} navLabel="Admin" inverse={!mode.endsWith("dark")} className={mode.startsWith("aaa-") ? `mode-${mode}` : undefined}
    expanded={expanded} onExpandedChange={onExpandedChange} showLabels={false}
    collapseLabel="Collapse" expandLabel="Expand"
    header={<NavigationHeader type="avatar" heading="ACME" avatarSrc={IMG("org")} showIconButton actionIcon="home" actionLabel="Home" />}
    footer={<div style={{ display: "grid", justifyItems: "center", gap: "var(--space-xs)", padding: "var(--space-md) 0" }}>
      {/* Narrow, the rail has room for the Zebra mark only. */}
      {expanded ? <ZebraLogo height={16} /> : <ZebraLogo height={16} mark />}
      {expanded ? <span style={{ ...t("body-xsmall"), color: "var(--foreground-secondary)" }}>version 1.0.1</span> : null}
    </div>}>
    {NAV.map((n) => (
      <NavigationRailItem key={n.label} label={n.label} icon={n.icon} selected={n.label === "Devices"} href={`#${n.label.toLowerCase().replace(/\s+/g, "-")}`}
        onClick={(e: React.MouseEvent) => e.preventDefault()} />
    ))}
  </NavigationRail>
);

/** Figma's Devices Toolbar. */
const DevicesToolbar = ({ addLabel, onAdd, filterOpen, onFilter }: { addLabel: string; onAdd: () => void; filterOpen?: boolean; onFilter?: () => void }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)", padding: "var(--space-md)", background: "var(--surface-card)",
    borderBlockEnd: "var(--stroke-thin) solid var(--border-default)" }}>
    <Search size="medium" shape="rounded" placeholder="Search" trailingIcon="microphone" aria-label="Search devices" style={{ inlineSize: 520 }} />
    <Button flavour="subtle" size="medium" shape="rounded" leadingIcon="filter" aria-expanded={onFilter ? filterOpen : undefined}
      aria-controls={onFilter ? "ap-device-types" : undefined} onClick={onFilter}>Filter</Button>
    <span style={{ flex: 1 }} />
    <Button flavour="outline" size="large" shape="rounded" leadingIcon="add-circle" onClick={onAdd}>{addLabel}</Button>
  </div>
);

/** Figma's Devices List Header. */
const ListHeader = ({ count, sort, checked, onCheck }: { count?: string; sort: boolean; checked: boolean | "mixed"; onCheck: (v: boolean) => void }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", blockSize: 40, boxSizing: "border-box", padding: "0 var(--space-md)",
    background: "var(--surface-section)", borderBlockEnd: "var(--stroke-thin) solid var(--border-default)" }}>
    <Checkbox size="medium" aria-label="Select all devices" checked={checked === true} indeterminate={checked === "mixed"} onCheckedChange={(v) => onCheck(Boolean(v))} />
    <span style={{ ...t("label-medium"), color: "var(--foreground-primary)" }}>Devices</span>
    {count ? <span style={{ ...t("body-xsmall"), color: "var(--foreground-secondary)" }}>{count}</span> : null}
    <span style={{ flex: 1 }} />
    {sort ? <Button flavour="subtle" size="small" shape="rounded" trailingIcon="sort">Sort By</Button> : null}
  </div>
);

/* ---- parts ------------------------------------------------------------------- */

/** Figma's Device Item, Style=list (a selectable row) or compact (a static row in sheets and dialogs). */
const DeviceRow = ({ device, selected, onSelect }: { device: Device; selected: boolean; onSelect: (e: React.MouseEvent) => void }) => (
  <button type="button" className="ap-device" aria-pressed={selected} onClick={onSelect}>
    <Icon name={device.icon} size="large" />
    <span style={{ display: "grid" }}>
      <span style={t("label-large")}>{device.name}</span>
      <span style={{ ...t("body-xsmall"), color: "var(--foreground-secondary)" }}>{device.meta}</span>
    </span>
  </button>
);
const CompactDevice = ({ name }: { name: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-md)", background: "var(--surface-card)",
    borderBlockEnd: "var(--stroke-thin) solid var(--border-default)", color: "var(--foreground-primary)" }}>
    <Icon name="phone-iphone" size="medium" />
    <span style={{ display: "grid" }}>
      <span style={t("label-large")}>{name}</span>
      <span style={{ ...t("body-xsmall"), color: "var(--foreground-secondary)" }}>Created: 11/04/22</span>
    </span>
  </div>
);

/** Figma's Option Card. */
const OptionCard = ({ icon, title, subtitle, onClick }: { icon: IconName; title: string; subtitle: string; onClick?: () => void }) => (
  <button type="button" className="ap-card" onClick={onClick}>
    <Icon name={icon} size="large" />
    <span style={{ display: "grid" }}>
      <span style={t("label-large")}>{title}</span>
      <span style={{ ...t("body-small"), color: "var(--foreground-secondary)" }}>{subtitle}</span>
    </span>
  </button>
);

/** The Tip line; Figma bolds "Tip:" and links the three templates. */
const Tip = ({ verb, end }: { verb: string; end: string }) => (
  <p className="ap-tip" style={{ ...t("body-medium"), color: "var(--foreground-primary)" }}>
    <strong>Tip:</strong> It is important to format your data before {verb} to avoid errors. Download our{" "}
    <a href="#excel">Excel</a>, <a href="#word">Word</a>, or <a href="#csv">CSV</a> template to show you how{end}
  </p>
);

/** Figma's side sheet: Sheet Header, a body and Sheet Footer, 576 wide on a scrim below the top bar. */
interface SheetView {
  title: string; description: string; bodyGap: string; bodyTop: string; back?: () => void; cancel: () => void;
  primary: string; primaryDisabled?: boolean; onPrimary?: () => void; body: React.ReactNode;
}
const SideSheet = ({ title, description, bodyGap, bodyTop, back, cancel, primary, primaryDisabled, onPrimary, body, closing }: SheetView & { closing: boolean }) => (
  <div className="ap-scrim" data-closing={closing ? "" : undefined} style={{ position: "absolute", inset: "56px 0 0 0", zIndex: 3, background: "var(--overlay-scrim)", display: "flex", justifyContent: "flex-end" }}
    onClick={(e) => { if (e.target === e.currentTarget) cancel(); }}>
    <section className="ap-sheet" role="dialog" aria-modal="true" aria-label={title} style={{ inlineSize: 576, display: "flex", flexDirection: "column", background: "var(--surface-overlay)" }}>
      <header style={{ display: "grid", gap: "var(--space-md)", padding: "var(--space-xl) var(--space-xl) var(--space-2xl)" }}>
        <h2 style={{ ...t("heading-large"), color: "var(--foreground-primary)" }}>{title}</h2>
        <p style={{ ...t("body-medium"), color: "var(--foreground-secondary)" }}>{description}</p>
      </header>
      <Scrolled style={{ display: "flex", flexDirection: "column", gap: bodyGap, padding: `${bodyTop} var(--space-xl) var(--space-xl)` }}>
        {body}
      </Scrolled>
      <footer style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-lg)", background: "var(--surface-card)",
        borderBlockStart: "var(--stroke-thin) solid var(--border-default)" }}>
        {back ? <Button flavour="text" size="large" shape="rounded" leadingIcon="arrow-back" onClick={back}>Back</Button> : null}
        <span style={{ flex: 1 }} />
        <Button flavour="outline" size="large" shape="rounded" onClick={cancel}>Cancel</Button>
        <Button flavour="primary" size="large" shape="rounded" disabled={primaryDisabled} onClick={onPrimary}>{primary}</Button>
      </footer>
    </section>
  </div>
);

/** Figma's Device Details Panel. */
const Row = ({ k, v, icon, iconLabel }: { k: string; v: string; icon?: IconName; iconLabel?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
    <span style={{ ...t("label-medium"), color: "var(--foreground-primary)" }}>{k}</span>
    <span style={{ ...t("body-small"), flex: 1, color: "var(--foreground-primary)" }}>{v}</span>
    {icon ? <Icon name={icon} size="small" label={iconLabel} /> : null}
  </div>
);
const DetailsPanel = () => {
  const [assigned, setAssigned] = React.useState(true);
  return (
    <div style={{ inlineSize: 280, flex: "none", display: "flex", flexDirection: "column", gap: "var(--space-sm)", padding: "var(--space-lg)",
      background: "var(--surface-card)", borderInlineEnd: "var(--stroke-thin) solid var(--border-default)" }}>
      <Row k="Type:" v="TC20" icon="edit" iconLabel="Edit type" />
      <Row k="Device ID:" v="1234abcd@974831" icon="content" iconLabel="Copy device ID" />
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", paddingBlockStart: "var(--space-md)" }}>
        <span style={{ ...t("label-medium"), color: "var(--foreground-primary)" }}>Status:</span>
        <div style={{ flex: 1, minInlineSize: 0 }}>
          <Select size="medium" shape="rounded" aria-label="Status" placeholder="Out for repair"
            options={[{ value: "repair", label: "Out for repair" }, { value: "active", label: "Active" }, { value: "retired", label: "Retired" }]} />
        </div>
      </div>
      <div style={{ display: "grid", gap: "var(--space-sm)", padding: "var(--space-lg) 0" }}>
        <Row k="Last Seen:" v="12/05/22 08:45pm" />
        <span style={{ ...t("label-medium"), color: "var(--foreground-primary)" }}>Last Assigned to:</span>
        {assigned ? <span><InputChip showAvatar avatarSrc={IMG("john")} removable onRemove={() => setAssigned(false)}>john Sanchez</InputChip></span> : null}
        <Row k="Last Location:" v="Warehouse A" />
        <Row k="Last Updated:" v="11/04/22" />
        <Row k="OS Version:" v="2.145" />
        <Row k="Last Updated:" v="11/04/2022" />
        <Row k="Charge:" v="63%" />
      </div>
      <div style={{ display: "grid", gap: "var(--space-xs)", padding: "var(--space-md) 0 var(--space-lg)" }}>
        <span style={{ ...t("label-medium"), color: "var(--foreground-primary)" }}>Device Details:</span>
        <span style={{ ...t("body-small"), color: "var(--foreground-primary)" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea justo purus faucibus pulvinar purus sed venenatis tortor.</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", paddingBlockStart: "var(--space-md)" }}>
        <Button flavour="outline" size="large" shape="rounded">Remove License</Button>
        <Icon name="info" size="small" label="About licenses" />
      </div>
    </div>
  );
};

/** Figma's Assignment Section. Chips can be removed. */
const AssignmentSection = ({ title, description, chips }: (typeof ASSIGNMENTS)[number]) => {
  const [list, setList] = React.useState(chips);
  return (
    <section style={{ display: "grid", gap: "var(--space-sm)", padding: "var(--space-lg)", background: "var(--surface-card)", borderBlockEnd: "var(--stroke-thin) solid var(--border-default)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
        <h3 style={{ ...t("label-large"), color: "var(--foreground-primary)" }}>{title}</h3>
        <Icon name="expand-more" size="small" />
        <span style={{ flex: 1 }} />
        <Button flavour="outline-subtle" size="medium" shape="rounded">Select Users</Button>
      </div>
      <p style={{ ...t("body-small"), color: "var(--foreground-secondary)" }}>{description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-sm)", paddingBlockStart: "var(--space-xs)" }}>
        {list.map((c) => (
          <InputChip key={c.label} showAvatar avatarSrc={c.src} avatarInitials={c.initials} avatarColor={c.color} removable
            onRemove={() => setList((l) => l.filter((x) => x !== c))}>{c.label}</InputChip>
        ))}
      </div>
    </section>
  );
};

/** Figma's Confirm Dialog: title, the illustration and, for Items=single or multiple, the devices. */
const ConfirmDialog = ({ heading, devices, onCancel, onConfirm, closing }: { heading: string; devices: string[]; onCancel: () => void; onConfirm: () => void; closing: boolean }) => (
  <div className="ap-scrim" data-closing={closing ? "" : undefined} style={{ position: "absolute", inset: "56px 0 0 0", zIndex: 3, background: "var(--overlay-scrim)", display: "grid", placeItems: "center" }}>
    <Dialog inline className="ap-dialog ap-pop" heading={heading} shape="rounded" showClose onOpenChange={(o) => { if (!o) onCancel(); }} showFooter
      footerEnd={<>
        <Button flavour="outline-subtle" size="medium" shape="rounded" onClick={onCancel}>Cancel</Button>
        <Button flavour="primary" size="medium" shape="rounded" onClick={onConfirm}>Confirm</Button>
      </>}>
      <div style={{ display: "grid", gap: "var(--space-lg)" }}>
        <img src={CONFIRM} alt="" width={248} height={161} style={{ justifySelf: "center" }} />
        {devices.length ? <div>{devices.map((d) => <CompactDevice key={d} name={d} />)}</div> : null}
      </div>
    </Dialog>
  </div>
);

/* ---- page -------------------------------------------------------------------- */

interface FlowProps {
  theme?: "mode-light" | "mode-dark";
  /** The Storybook toolbar's mode; `theme` wins when set. */
  mode?: PageMode;
  /** Where the flow starts: no devices yet, or the device dashboard. */
  start?: "empty" | "dashboard";
  /** Row 2's selection: three devices picked in the list. */
  multiSelect?: boolean;
  /** Screen 09's concept: device-type cards above the list. */
  deviceTypes?: boolean;
}

function AdminPortalFlowPage({ theme, mode = "light", start = "empty", multiSelect = false, deviceTypes = false }: FlowProps) {
  const [devices, setDevices] = React.useState<Device[]>(start === "dashboard" ? DEVICES : []);
  const [selected, setSelected] = React.useState<string[]>(multiSelect ? ["523907", "792347", "729301"] : start === "dashboard" ? ["523907"] : []);
  const [sheet, setSheet] = React.useState<Sheet>(null);
  const [prompt, setPrompt] = React.useState<Prompt>(null);
  const [fields, setFields] = React.useState<Fields>(EMPTY_FIELDS);
  const [files, setFiles] = React.useState<number[]>([]);
  const [added, setAdded] = React.useState<string[]>([]);
  const [typeFilter, setTypeFilter] = React.useState("all");
  // Screen 09: Filter opens the device-type cards above the list; a card narrows the list to that type.
  const [filterOpen, setFilterOpen] = React.useState(deviceTypes);
  const [toast, setToast] = React.useState<null | { text: string; undo?: Device[] }>(null);
  const [railOpen, setRailOpen] = React.useState(true);
  const [shownSheet, sheetClosing] = useExit(sheet);
  const [shownPrompt, promptClosing] = useExit(prompt);
  const [shownToast, toastClosing] = useExit(toast);

  const hasDevices = devices.length > 0;
  const typeIcon = DEVICE_TYPES.find((d) => d.label === typeFilter)?.icon;
  const shown = filterOpen && typeIcon ? devices.filter((d) => d.icon === typeIcon) : devices;
  const current = shown.find((d) => d.id === selected[0]) ?? shown[0];
  const filled = FIELDS.every((f) => fields[f.key].trim());
  const close = () => { setSheet(null); setPrompt(null); };
  const finish = () => {
    setSheet(null);
    setDevices(DEVICES); setSelected(["523907"]);
    setToast({ text: added.length > 1 ? `${added.length} Devices added` : "Device added" });
  };
  const confirmDelete = () => {
    const gone = devices.filter((d) => selected.includes(d.id));
    setDevices((ds) => ds.filter((d) => !selected.includes(d.id)));
    setSelected((s) => { const left = devices.find((d) => !s.includes(d.id)); return left ? [left.id] : []; });
    setPrompt(null);
    setToast({ text: `${gone.length} device${gone.length === 1 ? "" : "s"} deleted`, undo: gone });
  };
  const select = (id: string, e: React.MouseEvent) => {
    // Shift, Ctrl or Cmd adds to the selection, as Figma's row 2 shows three picked.
    if (e.shiftKey || e.metaKey || e.ctrlKey) setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    else setSelected([id]);
  };
  const pickType = (label: string) => {
    setTypeFilter(label);
    const icon = DEVICE_TYPES.find((d) => d.label === label)?.icon;
    const first = devices.find((d) => !icon || d.icon === icon);
    setSelected(first ? [first.id] : []);
  };
  const allChecked = hasDevices && selected.length === devices.length ? true : selected.length > 1 ? "mixed" : false;

  // One sheet slot and one dialog slot, so moving between steps swaps their
  // content in place instead of sliding a new sheet in each time.
  const sheetView = (which: NonNullable<Sheet>): SheetView => {
    switch (which) {
      case "add": return {
        title: "Add Device", description: "Select an option or skip to complete later from your dashboard", bodyGap: "var(--space-2xl)", bodyTop: "var(--space-3xl)",
        cancel: close, primary: "Next", primaryDisabled: true,
        body: <>
          <OptionCard icon="add" title="Add a single device" subtitle="Enter site details to add" onClick={() => { setFields(EMPTY_FIELDS); setSheet("details"); }} />
          <OptionCard icon="building" title="Add multiple devices" subtitle="Import sites from a file" onClick={() => { setFiles([]); setSheet("import"); }} />
          <Tip verb="importing" end="" />
          <OptionCard icon="cloud-upload" title="Link to your data" subtitle="Import sites from another database" />
        </>,
      };
      case "details": return {
        title: "Device Details", description: "Add device details or skip and complete later from your dashboard", bodyGap: "var(--space-2xl)", bodyTop: "var(--space-xl)",
        back: () => setSheet(added.length ? "assign" : "add"), cancel: close, primary: "Add", primaryDisabled: !filled,
        onPrimary: () => { setSheet(null); setPrompt("activate"); },
        body: FIELDS.map((f) => (
          <Input key={f.key} label={f.label} labelType="required" placeholder={f.placeholder} block value={fields[f.key]}
            onValueChange={(v) => setFields((s) => ({ ...s, [f.key]: v }))} />
        )),
      };
      case "import": return {
        title: "Import Devices From File", description: "Select the files you want to import.", bodyGap: "var(--space-4xl)", bodyTop: "var(--space-xl)",
        back: () => setSheet("add"), cancel: close, primary: "Import", primaryDisabled: !files.length, onPrimary: () => { setSheet(null); setPrompt("import"); },
        body: <>
          <Tip verb="uploading" end="." />
          {/* Upload Dropzone */}
          <div style={{ display: "grid", justifyItems: "center", gap: "var(--space-md)", padding: "var(--space-xl)", border: "var(--stroke-thin) dashed var(--border-strong)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
            <span style={{ ...t("title-medium"), color: "var(--foreground-primary)" }}>Drop files here to upload</span>
            <span style={{ ...t("body-small"), color: "var(--foreground-secondary)" }}>or</span>
            <Button flavour="primary" size="medium" shape="rounded" onClick={() => setFiles([1, 2, 3, 4])}>Select Files</Button>
            <span style={{ ...t("body-xsmall"), color: "var(--foreground-secondary)" }}>Supports: xls, xlsx, csv, or doc<br />Max file size 100mb</span>
          </div>
          <div style={{ display: "grid", gap: "var(--space-gutter)" }}>
            <h3 style={{ ...t("title-medium"), color: "var(--foreground-primary)" }}>Files for Import</h3>
            <div>
              {files.map((f) => (
                // File Row
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-sm) 0" }}>
                  <span style={{ inlineSize: 40, blockSize: 40, flex: "none", borderRadius: "var(--radius-md)", background: "var(--surface-subtle)" }} />
                  <span style={{ flex: 1, display: "grid" }}>
                    <span style={{ ...t("label-medium"), color: "var(--foreground-primary)" }}>filename.jpg</span>
                    <span style={{ ...t("body-xsmall"), color: "var(--foreground-secondary)" }}>5.7 MB</span>
                  </span>
                  <IconButton flavour="subtle" size="medium" shape="full" icon="close" label="Remove filename.jpg" onClick={() => setFiles((l) => l.filter((x) => x !== f))} />
                </div>
              ))}
            </div>
          </div>
        </>,
      };
      case "assign": return {
        title: "Assign Additional Device(s)", description: "Add devices, view/edit details & edit/ delete site", bodyGap: "var(--space-2xl)", bodyTop: "var(--space-xl)",
        cancel: close, primary: "Done", onPrimary: finish,
        body: <>
          <Button flavour="outline" size="large" shape="sharp" leadingIcon="add" onClick={() => { setFields(EMPTY_FIELDS); setSheet("details"); }}
            style={{ justifyContent: "flex-start" }}>Assign another device</Button>
          <div>{added.map((d, i) => <CompactDevice key={`${d}-${i}`} name={d} />)}</div>
        </>,
      };
    }
  };
  const promptView = (which: NonNullable<Prompt>) => {
    switch (which) {
      case "activate": return { heading: "Are you sure you want to activate this device?", devices: [fields.name], onCancel: () => setPrompt(null),
        onConfirm: () => { setAdded((a) => [...a, fields.name]); setPrompt(null); setSheet("assign"); } };
      case "import": return { heading: `Are you sure you want to add these ${IMPORTED.length} devices?`, devices: IMPORTED, onCancel: () => setPrompt(null),
        onConfirm: () => { setAdded(IMPORTED); setPrompt(null); setSheet("assign"); } };
      case "delete": return { heading: selected.length > 1 ? `Are you sure you want to delete devices (${selected.length})?` : "Are you sure you want to delete this device?",
        devices: selected.length > 1 ? [] : current ? [current.name] : [], onCancel: () => setPrompt(null), onConfirm: confirmDelete };
    }
  };

  return (
    <div className={theme} style={{ inlineSize: 1440, blockSize: 1020, position: "relative", display: "flex", flexDirection: "column", overflow: "hidden",
      background: "var(--surface-page)", color: "var(--foreground-primary)" }}>
      <style>{PAGE_CSS}</style>
      {/* An open sheet or prompt makes the page behind it inert. */}
      <div inert={sheet != null || prompt != null} style={{ display: "contents" }}>
        <AdminTopBar onMenuClick={() => setRailOpen((o) => !o)} />
        <Divider />
        <div style={{ flex: 1, minBlockSize: 0, display: "flex" }}>
          {/* The rail sizes itself (wide or narrow, animating between them); the content takes the rest. */}
          <div style={{ flex: "none", display: "flex", borderInlineEnd: "var(--stroke-thin) solid var(--border-default)" }}>
            <AdminDrawer mode={theme ? (theme.slice(5) as PageMode) : mode} expanded={railOpen} onExpandedChange={setRailOpen} />
          </div>
          <main style={{ flex: 1, minInlineSize: 0, display: "flex", flexDirection: "column" }}>
            <DevicesToolbar addLabel={hasDevices ? "Add Device" : "Add Devices"} onAdd={() => setSheet("add")}
              filterOpen={filterOpen} onFilter={hasDevices ? () => setFilterOpen((o) => !o) : undefined} />

            {!hasDevices ? (
              <>
                <ListHeader count="(0 total)" sort={false} checked={false} onCheck={() => undefined} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "var(--space-lg)" }}>
                  <img src={EMPTY} alt="" width={248} height={256} />
                  <p style={{ ...t("title-large"), color: "var(--foreground-primary)" }}>You have no devices to manage</p>
                  <Button flavour="text" size="large" shape="rounded" leadingIcon="add-circle" onClick={() => setSheet("add")}>Add Devices</Button>
                </div>
              </>
            ) : (
              <>
                {/* Grid rows 0fr → 1fr reveal the cards on animations/smooth; inert while closed. */}
                <div className="ap-reveal" data-open={filterOpen ? "" : undefined} inert={!filterOpen}>
                  <div style={{ minBlockSize: 0, overflow: "hidden" }}>
                  <div id="ap-device-types" role="group" aria-label="Device types" style={{ display: "flex", gap: "var(--space-md)", padding: "var(--space-lg)", overflowX: "auto",
                    background: "var(--surface-card)", borderBlockEnd: "var(--stroke-thin) solid var(--border-default)" }}>
                    <button type="button" className="ap-type" aria-pressed={typeFilter === "all"} onClick={() => pickType("all")}>
                      <Icon name="grid-view" size="large" /><span style={t("label-medium")}>View All Devices</span>
                    </button>
                    {DEVICE_TYPES.map((d) => (
                      <button key={d.label} type="button" className="ap-type" aria-pressed={typeFilter === d.label} onClick={() => pickType(d.label)}>
                        <Icon name={d.icon} size="large" />
                        <span style={t("label-medium")}>{d.label}</span>
                        <span style={{ ...t("body-xsmall"), color: "var(--foreground-secondary)" }}>9,203 distributed</span>
                        <span style={{ ...t("body-xsmall"), color: "var(--foreground-secondary)" }}>OS Version: 2.145</span>
                      </button>
                    ))}
                  </div>
                  </div>
                </div>
                <div style={{ flex: 1, minBlockSize: 0, display: "flex" }}>
                  {/* Device list */}
                  <div style={{ inlineSize: 336, flex: "none", display: "flex", flexDirection: "column", background: "var(--surface-card)", borderInlineEnd: "var(--stroke-thin) solid var(--border-default)" }}>
                    <ListHeader sort checked={allChecked} onCheck={(v) => setSelected(v ? devices.map((d) => d.id) : current ? [current.id] : [])} />
                    <div style={{ flex: 1, minBlockSize: 0, overflow: "auto" }}>
                      {shown.map((d) => <DeviceRow key={d.id} device={d} selected={d.id === current?.id || (selected.length > 1 && selected.includes(d.id))} onSelect={(e) => select(d.id, e)} />)}
                    </div>
                    {selected.length > 1 ? (
                      <div style={{ display: "flex", alignItems: "center", padding: "var(--space-md)", borderBlockStart: "var(--stroke-thin) solid var(--border-default)" }}>
                        <div style={{ flex: 1, display: "grid", justifyItems: "start" }}>
                          <span style={{ ...t("label-medium"), color: "var(--foreground-primary)" }}>{selected.length} items selected</span>
                          <Button flavour="text" size="small" shape="rounded" onClick={() => setSelected(current ? [current.id] : [])}>Clear</Button>
                        </div>
                        <IconButton flavour="text" size="medium" shape="full" icon="more-vertical" label="Selection actions" />
                      </div>
                    ) : null}
                  </div>

                  {/* Device */}
                  {current ? (
                    <div style={{ flex: 1, minInlineSize: 0, display: "flex", flexDirection: "column", background: "var(--surface-card)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", padding: "var(--space-lg)", borderBlockEnd: "var(--stroke-thin) solid var(--border-default)" }}>
                        <Icon name="smart-phone" size="medium" />
                        <h2 style={{ ...t("title-large"), color: "var(--foreground-primary)" }}>{current.name}</h2>
                      </div>
                      <div key={current.id} style={{ flex: 1, minBlockSize: 0, display: "flex", overflow: "auto" }}>
                        <DetailsPanel />
                        <div style={{ flex: 1, minInlineSize: 0 }}>
                          {ASSIGNMENTS.map((a) => <AssignmentSection key={a.title} {...a} />)}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-lg)", borderBlockStart: "var(--stroke-thin) solid var(--border-default)" }}>
                        <Button flavour="subtle" size="large" shape="rounded" leadingIcon="delete" onClick={() => setPrompt("delete")}>Delete Device</Button>
                        <span style={{ flex: 1 }} />
                        <Button flavour="outline" size="large" shape="rounded">Cancel</Button>
                        <Button flavour="primary" size="large" shape="rounded">Save</Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {shownSheet ? <SideSheet closing={sheetClosing} {...sheetView(shownSheet)} /> : null}

      {shownPrompt ? <ConfirmDialog closing={promptClosing} {...promptView(shownPrompt)} /> : null}

      {shownToast ? (
        <div className="ap-toast" style={{ position: "absolute", zIndex: 2, insetBlockStart: 876, insetInlineStart: 716, transform: "translateX(-50%)" }}>
          <div className="ap-pop" data-closing={toastClosing ? "" : undefined}>
            {shownToast.undo ? (
              <Snackbar inline open variant="contextual" status="deletion" actionLabel="Undo" showClose={false} duration={6000}
                onAction={() => { const back = shownToast.undo ?? []; setDevices(DEVICES.filter((d) => back.some((b) => b.id === d.id) || devices.some((x) => x.id === d.id))); setToast(null); }}
                onClose={() => setToast(null)}>{shownToast.text}</Snackbar>
            ) : (
              <Snackbar inline open variant="contextual" status="positive" duration={5000} onClose={() => setToast(null)}>{shownToast.text}</Snackbar>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const meta: Meta<typeof AdminPortalFlowPage> = {
  title: "Experimental/Pages/Admin Portal Flow",
  component: AdminPortalFlowPage,
  // The rail follows the toolbar's mode, so the page passes it in.
  render: (args, { globals }) => <AdminPortalFlowPage {...args} mode={globals.mode as PageMode} />,
  argTypes: { mode: { table: { disable: true } } },
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: "https://www.figma.com/design/xZIoVHphedpglTcxOBTTbX/Zebra-Design-System-Patterns?node-id=39-15209" },
    docs: { description: { component: "**Experimental mock flow.** Adding and managing devices in the Admin portal on a 1440 × 1020 desktop. Single device: Add Devices → Add a single device → fill the details → Add → confirm activation → assign more or Done → the dashboard with Device added. Multiple devices: Add multiple devices → Select Files → Import → confirm the four → Done → 4 Devices added. On the dashboard, Shift-, Ctrl- or Cmd-click picks several devices; Delete Device asks first, and the deleted toast can Undo. Composed from Global Header, Divider, Navigation Rail, Search, Button, Icon Button, Checkbox, Input, Select, Input Chip, Dialog, Snackbar and Icon." } },
  },
};
export default meta;
type Story = StoryObj<typeof AdminPortalFlowPage>;

export const Flow: Story = {};

/** Screen 10: the device dashboard. */
export const Dashboard: Story = { args: { start: "dashboard" } };

/** Row 2: three devices selected, ready to delete together. */
export const MultipleSelected: Story = { args: { start: "dashboard", multiSelect: true } };

/** Screen 09: Filter opened, the device-type cards above the list. */
export const DeviceTypes: Story = { args: { start: "dashboard", deviceTypes: true } };

export const Dark: Story = { args: { theme: "mode-dark", start: "dashboard" } };
