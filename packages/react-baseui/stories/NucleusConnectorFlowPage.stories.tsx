import * as React from "react";
import * as ReactDOM from "react-dom";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button, Card, Checkbox, CollapsibleMenuItem, Dialog, Divider, GlobalHeader, Icon, IconButton, IconIndicator, InlineBanner, Input, InputField, NavigationRail, NavigationRailItem,
  ProgressBar, ProgressCircle, Radio, RadioGroup, Select, Slider, Snackbar, SubMenuHeader, SubMenuItem, StatusLabel, StepCard, Switch, TabBar, TabItem, VerticalStepper,
  type IconName,
} from "../src/index.js";
import { Scrollbar } from "../src/index.js";

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


/* A mock desktop flow, not a component: the Zebra Nucleus Connector. It opens
   on the Connect Printer wizard, setting up a printer's Wi-Fi, from the
   Rebuild section of Zebra Design System Patterns (node 14:33031), 1440 × 900.
   The wizard's Close leads to the printer dashboard, from Rebuild · Dashboard
   (node 258:15662), 1920 × 1080, in its four Figma states: ready (Send a
   File), Diagnostic Mode, Protected Mode and Non-Zebra Supply. Every control is a
   library component; Figma's local parts (Wizard Header, Wizard Steps, Wizard
   Footer, Connection Option, Network Option, Network List Item, Printer
   Summary, Info Banner) are composed here from those and semantic tokens, each
   text at its Figma style.

   Where the page departs from Figma:
   - Width: both screens fill the container's width instead of Figma's fixed
     1440 and 1920; heights stay at Figma's 900 and 1080.
   - Text colour: Figma's local components bind palette ink/high and
     ink/medium; the page uses foreground/primary and foreground/secondary.
   - Global Header: Figma uses another library's header (Semantics colours,
     Titles/H5 text); the page uses Zebra's Global Header in light mode. It
     can't turn off User Profile or draw a bottom border, so page CSS hides
     the account group and adds the border. It is about 5px taller.
   - Dialogs: Figma hides the header's leading icon; page CSS hides it.
   - Status Label: Figma swaps the USB Required tag's icon for USB; the
     component keeps its info icon.
   - Password field: the input's own visibility toggle shows visibility while
     hidden, where Figma shows visibility-off.
   - Copy: Figma's toast on screen 12 names a Zebra ZD421; the page uses the
     ZD621 shown everywhere else. Dialogs say "[network name]"; the page names
     the chosen network. The error hint keeps Figma's placeholder copy.
   - Titles: steps 1–4 use heading/small with a 16px gap under it; the Wi-Fi
     list uses heading/medium with an 8px gap, both as in Figma.
   - Networks: picking a network opens the password dialog (Figma's Next stays
     disabled on a selected row, so the row is the way in). The current
     network's row turns into Figma's switch row once a dialog has opened, and
     its switch also opens the dialog. Passwords shorter than 8 characters
     fail, to reach the Unable to Connect branch; Try Again returns to the
     password with Figma's error state.
   - Motion (not in Figma): the scrim fades, dialogs and toasts ease in and
     reverse on close, on animations/smooth. Dialogs swap in place.
   - Not designed: Bluetooth Classic and Low Energy, Search by Network and
     Connect Manually (Next stays disabled), the Ethernet tab, the wizard
     header's menu button, and Next once connected (Media Settings). They are
     inert.

   Dashboard departures from Figma:
   - Close: the wizard's Close opens the Diagnostic Mode dashboard; the
     dashboard eases in on animations/smooth. Disable turns Diagnostic Mode
     off (the ready dashboard), and Security Mode's Change turns Protected
     Mode on; Protected Mode's Change turns it off again. The banner eases
     in and out; Figma shows only the end states.
   - Protected Mode: Figma's banner action has no label; the page uses
     "Change", which the banner's description names.
   - Global Header: as in the wizard, page CSS hides the account group and
     draws Figma's bottom border. Its menu button collapses the rail.
   - Dark Mode switch: switches the whole dashboard, the header and rail
     included (Figma sets them to palette Light; the page drops that lock
     when Dark Mode is on).
   - Supply specs: Figma insets them with a fixed spacer; the page indents
     them by the photo's width and space/lg so they line up with the title.
   - Not designed: Back, the rail's items, the toolbar, Disconnect printer,
     the card tools and actions, and Manage. They are inert.

   Settings departures from Figma (Settings section, node 251:46758):
   - Entry: the toolbar's Settings opens Bluetooth; Back returns to the
     dashboard. Bluetooth, USB and Print Quality switch from the sub menu.
     Each page retrieves its settings for a moment first.
   - Apply: disabled until a setting changes (the 03_Apply Enabled State
     frames imply it; Figma's default frames draw Apply enabled). Clear
     restores the last applied values.
   - Communication error: Figma doesn't say what leads there. The page shows
     it when Bluetooth is switched off and applied; Retry gets through to
     Restart printer, Disconnect closes it and restores the settings.
   - Snackbars: Figma shows only Bluetooth's. USB (after Restart & Apply) and
     Print Quality (after Proceed Digitally) reuse it with their own message.
   - Rail: Figma's settings rail is a narrow icon rail with different items
     from the dashboard's wide rail; the page follows each. Its Dark Mode
     item switches the mode. The header's menu button widens it.
   - Help popovers: Figma's Asset Dialog Header + Body has no Zebra
     component (Tooltip takes a short line). The page composes a Card under
     the label row, opened by a small Icon Button; Print Quality's sits
     under the label rather than Figma's 72px further left.
   - Bluetooth: the toggles span Figma's 400px form column, so each switch
     ends where the fields end (Figma's toggles are 328px). Form elements
     sit space/lg apart (Figma: spacing/small).
   - Dropdowns: Figma shows only "Placeholder"; the options are the page's
     own. The slider ends keep Figma's "#" labels; the value field is 64px
     (Figma 42px) so the value fits.
   - Device Language uses enterprise-diagnostics (enterprise-browser has no
     glyph). Figma's leftover "High Darkness (+6.0)" radio on 06_Applying
     Settings is left out.
   - Text: Input and Select labels are 14/20, and Bluetooth's field
     descriptions are 14/20 sub labels between label and field (Figma: 16/20
     labels, 14/18 descriptions). Nested
     sub menu rows are the component's size. "Save settings to file" is
     medium weight (Figma bold; no bold token).
   - Not designed: General, Wireless, Wired Ethernet, Supplies, Device
     Language, Remote Server, Advanced Settings, Save Configuration To
     Printer Profiles, Print Test Label, the assistant link and the narrow
     rail's items. They are inert. */

const IMG = (name: string) => new URL(`./assets/connect-printer/${name}.png`, import.meta.url).href;
const USB_ART = IMG("usb-illustration");
const WIFI_ART = IMG("wifi-illustration");
const PRINTER = IMG("printer");

type Text = "body-xsmall" | "body-small" | "body-medium" | "label-small" | "label-medium" | "label-large" | "title-medium" | "title-large" | "heading-small" | "heading-medium";
const t = (role: Text): React.CSSProperties => ({ font: `var(--text-${role})`, letterSpacing: `var(--${role}-letter-spacing)`, margin: 0 });

const PAGE_CSS = [
  // Figma's header turns off User Profile; Global Header always draws the account group.
  ".cp-header .zds-global-header__account-group{display:none}",
  // Figma's header has a bottom border; Global Header has none.
  ".cp-header{border-block-end:var(--stroke-thin) solid var(--border-default)}",
  // Figma hides the dialog header's leading icon; Dialog draws it inline-styled, so !important.
  ".cp-dialog .zds-dialog__icon{display:none!important}",
  // Figma's toasts hug their message.
  ".cp-toast .zds-snackbar{inline-size:auto}",
  // Connection Option and Network Option: default, hover, selected, disabled.
  ".cp-option{box-sizing:border-box;display:flex;align-items:center;padding:var(--space-lg);border:var(--stroke-thin) solid var(--border-default);border-radius:var(--radius-md);background:var(--surface-card);color:var(--foreground-primary);cursor:pointer}",
  ".cp-option:hover:not(:has([data-disabled])){background:var(--interactive-neutral-background-hover)}",
  ".cp-option:has(.zds-radio__ring[data-checked]){border-color:var(--border-strong)}",
  ".cp-option:has([data-disabled]){color:var(--foreground-disabled);cursor:default}",
  // Network List Item: default, hover, selected.
  ".cp-net{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:var(--space-md);inline-size:100%;min-block-size:64px;padding:0 var(--space-lg);background:var(--surface-card);color:var(--foreground-primary);border-block-end:var(--stroke-thin) solid var(--border-default);cursor:pointer}",
  ".cp-net:last-child{border-block-end:0}",
  "button.cp-net:hover{background:var(--interactive-neutral-background-hover)}",
  ".cp-net[aria-pressed=true]{background:var(--surface-info)}",
  ".cp-net:focus-visible{outline:var(--stroke-thick) solid var(--border-focus);outline-offset:calc(-1 * var(--stroke-thick))}",
  // The content column scrolls on the Wi-Fi list; its parts keep their height instead of shrinking.
  ".cp-content>*{flex:none}",
  // Motion, on animations/smooth: the scrim fades, dialogs and toasts ease in, each reversing on close.
  "@keyframes cp-fade{from{opacity:0}}@keyframes cp-fade-out{to{opacity:0}}",
  "@keyframes cp-pop{from{opacity:0;transform:translateY(8px) scale(.98)}}@keyframes cp-pop-out{to{opacity:0;transform:translateY(8px) scale(.98)}}",
  ".cp-scrim{animation:cp-fade var(--animations-smooth) both}[data-closing].cp-scrim{animation-name:cp-fade-out}",
  ".cp-pop{animation:cp-pop var(--animations-smooth) both}[data-closing] .cp-pop,[data-closing].cp-pop{animation-name:cp-pop-out}",
  "@media (prefers-reduced-motion:reduce){.cp-scrim,.cp-pop{animation:none!important}}",
].join("");

/** Keeps a closing overlay mounted for its exit animation (animations/smooth, 250ms; none with reduced motion). */
function useExit<T>(value: T | null): [T | null, boolean] {
  const [shown, setShown] = React.useState(value);
  const [closing, setClosing] = React.useState(false);
  React.useEffect(() => {
    if (value != null) { setShown(value); setClosing(false); return; }
    if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(null); return; }
    setClosing(true);
    const id = setTimeout(() => { setShown(null); setClosing(false); }, 250);
    return () => clearTimeout(id);
  }, [value]);
  return [value ?? shown, closing && value == null];
}

type Screen = "usb" | "type" | "network" | "prep" | "wifi";
type Connection = "usb" | "wifi" | "bt-classic" | "bt-le";
type NetworkChoice = "setup" | "search" | "manual";
type Modal = null | "password" | "connecting" | "unable";

const CONNECTIONS: { value: Connection; label: string; icon: IconName; group: "rec" | "net" }[] = [
  { value: "usb", label: "USB", icon: "usb", group: "rec" },
  { value: "wifi", label: "Wi-Fi and Ethernet", icon: "wifi", group: "net" },
  { value: "bt-classic", label: "Bluetooth® Classic", icon: "bluetooth", group: "net" },
  { value: "bt-le", label: "Bluetooth® Low Energy", icon: "bluetooth", group: "net" },
];
const NETWORKS = ["ZGuest 13457", "Office Guest", "Zebra Front Desk", "Milkyway", "Galaxy", "Galaxy"];
const CURRENT = "ZGuest";
const PRINTER_MODEL = "Zebra ZD621";

/* ---- shell ------------------------------------------------------------------- */

/** Figma's Wizard Header: the wizard's title and Close. */
const WizardHeader = ({ onClose }: { onClose?: () => void }) => (
  <div style={{ display: "flex", alignItems: "center", boxSizing: "border-box", blockSize: 65, padding: "var(--space-sm) var(--space-lg) var(--space-sm) var(--space-xl)",
    background: "var(--surface-card)", borderBlockEnd: "var(--stroke-thin) solid var(--border-default)" }}>
    <h1 style={{ ...t("title-large"), flex: 1, color: "var(--foreground-primary)" }}>Connect Printer Wizard</h1>
    <IconButton flavour="subtle" size="large" shape="rounded" icon="close" label="Close wizard" onClick={onClose} />
  </div>
);

/** Figma's Wizard Steps: a card Vertical Stepper on the first step. */
const WizardSteps = () => (
  <aside style={{ inlineSize: 336, flex: "none", boxSizing: "border-box", padding: "var(--space-lg)", background: "var(--surface-section)",
    borderInlineEnd: "var(--stroke-thin) solid var(--border-default)" }}>
    <VerticalStepper card rounded aria-label="Wizard steps">
      {["Printer Connection", "Media Settings", "Review"].map((label, i) => (
        <StepCard key={label} label={label} stepNumber={i + 1} status={i === 0 ? "active" : "default"} />
      ))}
    </VerticalStepper>
  </aside>
);

/** Figma's Wizard Footer: Use Another Connection Type, Previous and Next, each optional. */
const WizardFooter = ({ onOther, onPrevious, onNext, nextDisabled }: { onOther?: () => void; onPrevious?: () => void; onNext?: () => void; nextDisabled: boolean }) => (
  <footer style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-lg)", background: "var(--surface-card)",
    borderBlockStart: "var(--stroke-thin) solid var(--border-default)" }}>
    {onOther ? <Button flavour="outline" size="large" shape="rounded" onClick={onOther}>Use Another Connection Type</Button> : null}
    <span style={{ flex: 1 }} />
    {onPrevious ? <Button flavour="outline" size="large" shape="rounded" leadingIcon="chevron-left" onClick={onPrevious}>Previous</Button> : null}
    <Button flavour="primary" size="large" shape="rounded" trailingIcon="chevron-right" disabled={nextDisabled} onClick={onNext}>Next</Button>
  </footer>
);

/** A step's title and description. Steps 1–4 use heading/small with a 16px gap; the Wi-Fi list heading/medium with 8px. */
const Intro = ({ title, description, large }: { title: string; description: string; large?: boolean }) => (
  <div style={{ display: "grid", gap: large ? "var(--space-sm)" : "var(--space-lg)" }}>
    <h2 style={{ ...t(large ? "heading-medium" : "heading-small"), color: "var(--foreground-primary)" }}>{title}</h2>
    <p style={{ ...t("body-medium"), color: "var(--foreground-secondary)" }}>{description}</p>
  </div>
);

const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: "var(--space-md)" }}>
    <h3 style={{ ...t("title-medium"), color: "var(--foreground-primary)" }}>{title}</h3>
    {children}
  </div>
);

/* ---- parts ------------------------------------------------------------------- */

/** Figma's Connection Option: icon, label and a large radio, 640 wide. */
const ConnectionOption = ({ value, label, icon, disabled }: { value: Connection; label: string; icon: IconName; disabled?: boolean }) => (
  <label className="cp-option" style={{ inlineSize: 640, gap: "var(--space-md)" }}>
    <Icon name={icon} size="medium" />
    <span style={{ ...t("body-medium"), flex: 1 }}>{label}</span>
    <Radio value={value} size="large" disabled={disabled} aria-label={label} />
  </label>
);

/** Figma's Network Option: a large radio, title (with the USB Required tag) and description, 768 wide. */
const NetworkOption = ({ value, title, description, tag }: { value: NetworkChoice; title: string; description: string; tag?: boolean }) => (
  <label className="cp-option" style={{ inlineSize: 768, gap: "var(--space-lg)" }}>
    <Radio value={value} size="large" aria-label={title} />
    <span style={{ flex: 1, display: "grid", gap: "var(--space-xs)" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
        <span style={{ ...t("label-large"), flex: 1 }}>{title}</span>
        {tag ? <StatusLabel status="info" leading="icon" shape="rounded">USB Required</StatusLabel> : null}
      </span>
      <span style={{ ...t("body-small"), color: "var(--foreground-secondary)" }}>{description}</span>
    </span>
  </label>
);

/** Figma's Info Banner, locked to palette Dark as in Figma. */
const InfoBanner = () => (
  <div className="mode-dark" role="status" style={{ display: "flex", gap: "var(--space-sm)", padding: "var(--space-lg)", borderRadius: "var(--radius-md)",
    background: "var(--feedback-info-background-strong)", color: "var(--foreground-primary)" }}>
    <span style={{ inlineSize: 36, flex: "none", paddingBlockStart: "var(--space-2xs)" }}><Icon name="info" size="medium" /></span>
    <span style={{ display: "grid", gap: "var(--space-2xs)", padding: "var(--space-2xs) 0" }}>
      <span style={t("label-medium")}>USB Connection Required to Set Up Wi-Fi</span>
      <span style={t("body-small")}>For first-time Wi-Fi setup, please connect the printer to your computer with a USB cable. Once the printer is detected, select 'Next' to continue.</span>
    </span>
  </div>
);

/** Figma's Printer Summary. */
const PrinterSummary = ({ via }: { via: "USB" | "Wi-Fi" }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-md)", justifySelf: "start",
    background: "var(--surface-card)", border: "var(--stroke-thin) solid var(--border-default)", borderRadius: "var(--radius-md)" }}>
    <span style={{ display: "grid", placeItems: "center", inlineSize: 48, blockSize: 48, borderRadius: "var(--radius-pill)", background: "var(--surface-section)",
      border: "var(--stroke-thin) solid var(--border-default)", boxSizing: "border-box", overflow: "hidden" }}>
      <img src={PRINTER} alt="" width={44} height={36} style={{ objectFit: "cover" }} />
    </span>
    <span style={{ display: "grid" }}>
      <span style={{ ...t("body-xsmall"), color: "var(--foreground-success)" }}>Connected via {via}</span>
      <span style={{ ...t("label-medium"), color: "var(--foreground-primary)" }}>{PRINTER_MODEL}</span>
      <span style={{ ...t("body-small"), color: "var(--foreground-secondary)" }}>MAC: 00-B0-D0-63-C2-26</span>
    </span>
  </div>
);

/** Figma's Network List Item: Wi-Fi icon, label (and subtitle), then a lock or a switch. */
const NetworkRow = ({ label, subtitle, selected, onSelect, switchOn, onSwitch }: {
  label: string; subtitle?: string; selected?: boolean; onSelect?: () => void; switchOn?: boolean; onSwitch?: (on: boolean) => void;
}) => {
  const body = (
    <>
      <Icon name="wifi" size="medium" />
      <span style={{ flex: 1, display: "grid" }}>
        <span style={t("body-medium")}>{label}</span>
        {subtitle ? <span style={{ ...t("body-xsmall"), color: "var(--foreground-secondary)" }}>{subtitle}</span> : null}
      </span>
      {onSwitch ? null : <Icon name="lock" size="medium" label="Secured" />}
    </>
  );
  if (onSwitch) {
    return (
      <div className="cp-net">
        {body}
        <Switch checked={switchOn} onCheckedChange={onSwitch} aria-label={label} />
      </div>
    );
  }
  return <button type="button" className="cp-net" aria-pressed={selected} onClick={onSelect}>{body}</button>;
};

/* ---- page -------------------------------------------------------------------- */

interface FlowProps {
  theme?: "mode-light" | "mode-dark";
  /** Close was pressed. */
  onClose?: () => void;
  /** Where the flow starts. */
  start?: Screen;
  /** Branch: Wi-Fi unavailable while USB is connected (screen 82). */
  wifiUnavailable?: boolean;
}

function ConnectPrinterWizard({ theme, start = "usb", wifiUnavailable = false, onClose }: FlowProps) {
  const [screen, setScreen] = React.useState<Screen>(start);
  const [connection, setConnection] = React.useState<Connection | null>(null);
  const [networkChoice, setNetworkChoice] = React.useState<NetworkChoice | null>(null);
  const [scanning, setScanning] = React.useState(start === "wifi");
  const [picked, setPicked] = React.useState<string | null>(null);
  const [target, setTarget] = React.useState(CURRENT);
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [modal, setModal] = React.useState<Modal>(null);
  const [asked, setAsked] = React.useState(false);
  const [connected, setConnected] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string | null>(wifiUnavailable ? `USB connected to ${PRINTER_MODEL}` : null);

  const [shownModal, modalClosing] = useExit(modal);
  const [shownToast, toastClosing] = useExit(toast);

  const go = (s: Screen) => {
    setScreen(s);
    if (s !== "network" && !wifiUnavailable) setToast(null);
    if (s === "wifi") setScanning(true);
  };

  // The Wi-Fi list scans before it settles (screen 13's progress bar).
  React.useEffect(() => {
    if (screen !== "wifi" || !scanning) return;
    const id = setTimeout(() => setScanning(false), 1500);
    return () => clearTimeout(id);
  }, [screen, scanning]);

  // Connecting runs for two seconds, then succeeds or fails (8 characters minimum).
  React.useEffect(() => {
    if (modal !== "connecting") return;
    const id = setTimeout(() => {
      if (password.length >= 8) {
        setModal(null); setConnected(target); setToast("Network connection successful");
      } else setModal("unable");
    }, 2000);
    return () => clearTimeout(id);
  }, [modal, password, target]);

  const askPassword = (network: string) => {
    setTarget(network); setPassword(""); setPasswordError(false); setAsked(true); setModal("password");
  };
  const closeModal = () => { setModal(null); setPicked(null); };

  const other = () => go("type");

  let content: React.ReactNode;
  let footer: React.ReactNode;
  let gap = "var(--space-3xl)";
  let banner: React.ReactNode = null;
  let scroll = false;

  if (screen === "usb") {
    content = (
      <>
        <div style={{ display: "grid", gap: "var(--space-3xl)" }}>
          <Intro title="Connect your printer via USB" description={'USB is the fastest setup method and provides automatic driver installation. To use Wi-Fi, Ethernet, or Bluetooth, select the "Use another connection type" option below.'} />
          <div style={{ display: "grid", gap: "var(--space-sm)" }}>
            <h3 style={{ ...t("title-medium"), color: "var(--foreground-primary)" }}>Setup instructions</h3>
            <p style={{ ...t("body-medium"), color: "var(--foreground-primary)" }}>First, connect the USB cable to your printer and this computer, then power on your printer.</p>
          </div>
        </div>
        <img src={USB_ART} alt="A laptop connected to a label printer by USB cable" width={896} height={300} style={{ display: "block", alignSelf: "center", maxInlineSize: "100%" }} />
      </>
    );
    footer = <WizardFooter onOther={other} nextDisabled />;
  } else if (screen === "type") {
    content = (
      <>
        <Intro title="Select connection type" description="Select how you want to connect your printer." />
        <RadioGroup value={connection} onValueChange={(v) => setConnection(v as Connection)} aria-label="Connection type"
          style={{ display: "grid", gap: "var(--space-3xl)" }}>
          <Group title="Recommended">
            {CONNECTIONS.filter((c) => c.group === "rec").map((c) => <ConnectionOption key={c.value} {...c} />)}
          </Group>
          <Group title="Network & Wireless">
            {CONNECTIONS.filter((c) => c.group === "net").map((c) => <ConnectionOption key={c.value} {...c} disabled={c.value === "wifi" && wifiUnavailable} />)}
          </Group>
        </RadioGroup>
      </>
    );
    // USB and Wi-Fi lead somewhere; Bluetooth isn't designed.
    const next = connection === "usb" ? "usb" : connection === "wifi" ? "network" : null;
    footer = <WizardFooter onPrevious={() => go("usb")} onNext={next ? () => go(next) : undefined} nextDisabled={!next} />;
  } else if (screen === "network") {
    content = (
      <>
        <Intro title="Connect to a network printer" description="Select an option below to connect a printer to your network, or search for one already on your network." />
        <RadioGroup value={networkChoice} aria-label="Network option" style={{ display: "grid", gap: "var(--space-3xl)" }}
          onValueChange={(v) => {
            setNetworkChoice(v as NetworkChoice);
            // Screen 12: picking Set Up Wi-Fi finds the printer on USB.
            if (v === "setup") setToast(`USB connected to ${PRINTER_MODEL}`);
          }}>
          <Group title="Set up a printer's network connection">
            <NetworkOption value="setup" title="Set Up a Wi-Fi Connection" tag
              description="Connect a new printer or switch to a different Wi-Fi network, which requires a temporary USB connection." />
          </Group>
          <Group title="Find a printer on the network">
            <NetworkOption value="search" title="Search by Network" description="Automatically discover printers that are already connected to your local Wi-Fi or Ethernet network." />
            <NetworkOption value="manual" title="Connect Manually" description="Directly connect to a printer using its known IP or DNS address." />
          </Group>
        </RadioGroup>
      </>
    );
    banner = <InfoBanner />;
    footer = <WizardFooter onOther={other} onPrevious={() => go("type")} onNext={() => go("prep")} nextDisabled={networkChoice !== "setup"} />;
  } else if (screen === "prep") {
    content = (
      <>
        <Intro title="Prepare for network connection" description="The information below helps you prepare to either find an existing printer on your network or set up a new network connection." />
        <div style={{ display: "grid", gap: "var(--space-xl)" }}>
          {/* The Ethernet tab isn't designed; the bar stays on Wi-Fi. */}
          <TabBar flavour="condensed" label="Connection" value="wifi" style={{ justifySelf: "start" }}>
            <TabItem value="wifi" label="Wi-Fi" icon="wifi" />
            <TabItem value="ethernet" label="Ethernet" icon="ethernet" />
          </TabBar>
          <p style={{ ...t("body-medium"), color: "var(--foreground-primary)" }}>
            To find a printer already on your network, ensure both this computer and the printer are powered on, and connected to the same Wi-Fi network. To connect to a Wi-Fi network or change your existing connection, please have your Wi-Fi password (if required), and a USB cable ready for the next step.
          </p>
        </div>
        <img src={WIFI_ART} alt="A laptop and a label printer connecting over Wi-Fi" width={653} height={268} style={{ display: "block", alignSelf: "center", maxInlineSize: "100%" }} />
      </>
    );
    footer = <WizardFooter onOther={other} onPrevious={() => go("network")} onNext={() => go("wifi")} nextDisabled={false} />;
  } else {
    gap = "var(--space-xl)";
    scroll = true;
    const switchRow = asked || connected != null;
    content = (
      <>
        <div style={{ display: "grid", gap: "var(--space-lg)" }}>
          <Intro large title="Select a Wi-Fi network" description="Choose the network you want your printer to connect to." />
          <PrinterSummary via={connected ? "Wi-Fi" : "USB"} />
        </div>
        <div style={{ border: "var(--stroke-thin) solid var(--border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          {switchRow ? (
            <NetworkRow label={`Connect to ${CURRENT} (Recommended)`} subtitle="Current network (Recommended)" switchOn={connected === CURRENT}
              onSwitch={(on) => { if (on) askPassword(CURRENT); else setConnected(null); }} />
          ) : (
            <NetworkRow label={CURRENT} subtitle="Current network (Recommended)" selected={picked === CURRENT}
              onSelect={() => { setPicked(CURRENT); askPassword(CURRENT); }} />
          )}
        </div>
        <div style={{ display: "grid", gap: "var(--space-md)" }}>
          <h3 style={{ ...t("title-medium"), color: "var(--foreground-primary)" }}>Available Networks</h3>
          {scanning ? <ProgressBar size="small" shape="rounded" showTrack value={null} showLabel={false} aria-label="Scanning for networks" /> : null}
          <div style={{ border: "var(--stroke-thin) solid var(--border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            {NETWORKS.map((n, i) => {
              const key = `${n}-${i}`;
              return <NetworkRow key={key} label={n} selected={picked === key || (connected === key)}
                onSelect={() => { setPicked(key); askPassword(n); setTarget(key); }} />;
            })}
          </div>
        </div>
      </>
    );
    footer = <WizardFooter onOther={other} onPrevious={() => go("prep")} nextDisabled={connected == null} />;
  }

  const name = (key: string) => key.replace(/-\d+$/, "");

  return (
    <div className={theme} style={{ position: "relative", overflow: "hidden", inlineSize: "100%", blockSize: 900, display: "flex", flexDirection: "column",
      background: "var(--surface-page)", color: "var(--foreground-primary)" }}>
      <style>{PAGE_CSS}</style>
      <div inert={shownModal != null} style={{ display: "contents" }}>
        <GlobalHeader className="cp-header" mode="light" platformName="Zebra Nucleus Connector" appSwitcher={false} searchBar={false} menuLabel="Menu" />
        <WizardHeader onClose={onClose} />
        <div style={{ flex: 1, minBlockSize: 0, display: "flex" }}>
          <WizardSteps />
          <main style={{ flex: 1, minInlineSize: 0, display: "flex", flexDirection: "column", background: "var(--surface-card)" }}>
            <Scrolled className="cp-content" enabled={scroll} style={{ display: "flex", flexDirection: "column", gap, padding: "var(--space-3xl)" }}>
              {content}
            </Scrolled>
            {/* Figma's Banner Area: 40px under the content, holding the Info Banner on screen 10–12. */}
            {screen === "wifi" ? null : (
              <div style={{ minBlockSize: 100, boxSizing: "border-box", padding: "0 var(--space-3xl) var(--space-3xl)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                {banner}
              </div>
            )}
            {footer}
          </main>
        </div>
      </div>

      {shownModal ? (
        <div className="cp-scrim" data-closing={modalClosing ? "" : undefined}
          style={{ position: "absolute", inset: 0, zIndex: 3, background: "var(--overlay-scrim)", display: "grid", placeItems: "center" }}>
          {shownModal === "password" ? (
            <Dialog inline className="cp-dialog cp-pop" heading="Enter network password" shape="rounded" showClose={false} showFooter
              footerEnd={<>
                <Button flavour="outline-subtle" size="medium" shape="rounded" onClick={closeModal}>Cancel</Button>
                <Button flavour="primary" size="medium" shape="rounded" disabled={password.length === 0} onClick={() => setModal("connecting")}>Connect</Button>
              </>}>
              <div style={{ display: "grid", gap: "var(--space-lg)" }}>
                <p style={{ ...t("body-medium"), color: "var(--foreground-primary)" }}>Enter the password for {name(target)}.</p>
                <Input type="password" label="Password" placeholder="Enter password" size="medium" shape="rounded" block
                  value={password} onValueChange={(v) => { setPassword(v); setPasswordError(false); }}
                  state={passwordError ? "invalid" : "default"} hint={passwordError ? "Oops! Error hint text" : undefined}
                  onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Enter" && password) setModal("connecting"); }} />
              </div>
            </Dialog>
          ) : shownModal === "connecting" ? (
            <Dialog inline className="cp-dialog cp-pop" heading={`Connecting to ${name(target)}`} shape="rounded" showClose={false} showFooter={false}>
              <div style={{ display: "grid", placeItems: "center", padding: "var(--space-xl) 0" }}>
                <ProgressCircle size="medium" rounded value={null} aria-label="Connecting" />
              </div>
            </Dialog>
          ) : (
            <Dialog inline className="cp-dialog cp-pop" heading="Unable to connect to network" shape="rounded" showClose={false} showFooter
              footerEnd={<>
                <Button flavour="outline-subtle" size="medium" shape="rounded" onClick={closeModal}>Cancel</Button>
                <Button flavour="primary" size="medium" shape="rounded" onClick={() => { setPassword(""); setPasswordError(true); setModal("password"); }}>Try Again</Button>
              </>}>
              <p style={{ ...t("body-medium"), color: "var(--foreground-primary)" }}>
                The printer was unable to connect to the network. This is often caused by an incorrect password. Please check your password and try again.
              </p>
            </Dialog>
          )}
        </div>
      ) : null}

      {shownToast ? (
        // Screen 12 and 82 place the toast top right; the connected toast sits centred low over the content.
        <div className="cp-toast" style={shownToast.startsWith("USB")
          ? { position: "absolute", zIndex: 2, insetBlockStart: 124, insetInlineEnd: 24 }
          : { position: "absolute", zIndex: 2, insetBlockStart: 748, insetInlineStart: 888, transform: "translateX(-50%)" }}>
          <div className="cp-pop" data-closing={toastClosing ? "" : undefined}>
            <Snackbar inline open variant="contextual" flavour="positive" shape="rounded" showClose duration={shownToast.startsWith("USB") ? 0 : 5000}
              onClose={() => setToast(null)}>{shownToast}</Snackbar>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---- dashboard --------------------------------------------------------------- */

const PRINTER_PHOTO = IMG("printer-photo");
const LABEL_ROLL = IMG("label-roll");

/** Figma's four dashboard frames: ready (Send a File), Diagnostic Mode, Protected Mode, Non-Zebra Supply. */
type DashboardState = "ready" | "diagnostic" | "protected" | "non-zebra";

const DASH_CSS = [
  // The dashboard eases in when the wizard closes; none with reduced motion.
  "@keyframes nc-in{from{opacity:0;transform:translateY(8px)}}",
  ".nc-dashboard{animation:nc-in var(--animations-smooth) both}",
  "@media (prefers-reduced-motion:reduce){.nc-dashboard{animation:none}}",
].join("");

/** A label over a value: Figma's spec columns and firmware rows use label/medium or body/medium on foreground/secondary. */
const Spec = ({ label, value }: { label: string; value: string }) => (
  <span style={{ display: "grid", gap: "var(--space-2xs)" }}>
    <span style={{ ...t("label-medium"), color: "var(--foreground-secondary)" }}>{label}</span>
    <span style={{ ...t("body-medium"), color: "var(--foreground-primary)" }}>{value}</span>
  </span>
);

const Detail = ({ label, value }: { label: string; value: string }) => (
  <span style={{ display: "flex", gap: "var(--space-2xs)" }}>
    <span style={{ ...t("body-medium"), color: "var(--foreground-secondary)" }}>{label}</span>
    <span style={{ ...t("body-medium"), color: "var(--foreground-primary)" }}>{value}</span>
  </span>
);

/** Figma's Printer Details Card. */
const PrinterDetailsCard = ({ more }: { more: boolean }) => (
  <Card shape="rounded" hasHeader={false} hasFooter={false}>
    <div style={{ display: "flex", gap: "var(--space-xl)", padding: "var(--space-xl)" }}>
      <img src={PRINTER_PHOTO} alt="Zebra ZD621 printer" width={108} height={108} style={{ objectFit: "contain", flex: "none" }} />
      <div style={{ flex: 1, display: "grid", gap: "var(--space-xl)" }}>
        <div style={{ display: "grid", gap: "var(--space-md)" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <StatusLabel status="positive" leading="indicator" shape="rounded">Ready</StatusLabel>
            <span style={{ flex: 1 }} />
            <span style={{ display: "flex", gap: "var(--space-sm)" }}>
              <IconButton flavour="subtle" size="small" shape="rounded" icon="star-outline" label="Favourite" />
              {more ? <IconButton flavour="subtle" size="small" shape="rounded" icon="more-vertical" label="More" /> : null}
            </span>
          </div>
          <h2 style={{ ...t("heading-small"), color: "var(--foreground-primary)" }}>Zebra ZD621 - 300DPI</h2>
          <div style={{ display: "grid", gap: "var(--space-sm)" }}>
            <Detail label="Firmware Version:" value="D7N25151664" />
            <Detail label="Serial Number:" value="D7N25151664" />
          </div>
        </div>
        <div style={{ display: "flex", gap: "var(--space-lg)" }}>
          <Button flavour="outline-subtle" size="medium" shape="rounded" leadingIcon="info">About Printer</Button>
          <Button flavour="outline-subtle" size="medium" shape="rounded" leadingIcon="file">Send a File</Button>
        </div>
      </div>
    </div>
  </Card>
);

/** Figma's Current Supply Card. A non-Zebra roll has no part number, no photo and no label count. */
const CurrentSupplyCard = ({ zebra, disabled }: { zebra: boolean; disabled: boolean }) => (
  <Card shape="rounded" hasHeader={false} hasFooter={false}>
    <div style={{ display: "grid", gap: "var(--space-xl)", padding: "var(--space-xl)" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "var(--space-lg)" }}>
          {zebra
            ? <img src={LABEL_ROLL} alt="Direct thermal label roll" width={108} height={108} style={{ objectFit: "contain", flex: "none" }} />
            : <span aria-hidden style={{ inlineSize: 108, blockSize: 108, flex: "none", background: "var(--surface-subtle)" }} />}
          <span style={{ display: "grid", gap: "var(--space-2xs)" }}>
            <span style={{ ...t("title-large"), color: "var(--foreground-primary)" }}>Current Supply</span>
            <span style={{ ...t("body-small"), color: "var(--foreground-tertiary)" }}>PN: {zebra ? "00-B0-D0-63-C2-26" : "Not Available"}</span>
          </span>
        </div>
        <Button flavour="outline-subtle" size="medium" shape="rounded" disabled={disabled}>Manage</Button>
      </div>
      <div style={{ display: "flex", gap: "var(--space-2xl)", paddingInlineStart: "calc(108px + var(--space-lg))" }}>
        <Spec label="Media Format" value="Direct Thermal Label" />
        <Spec label="Dimensions" value="4.1 in x 6.1 in" />
        {zebra ? <Spec label="Labels Remaining" value="847" /> : null}
        <Spec label="Print Mode" value="Tear-Off" />
      </div>
    </div>
  </Card>
);

/** Figma's Overview Row: icon, label over value (with an optional Status Label), and an optional action. */
const OverviewRow = ({ icon, label, value, status, action, disabled, onAction }: {
  icon: IconName; label: string; value: string; status?: ["neutral" | "positive", string]; action?: string; disabled?: boolean; onAction?: () => void;
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
    <Icon name={icon} size="large" />
    <span style={{ flex: 1, minInlineSize: 0, display: "grid", gap: "var(--space-2xs)" }}>
      <span style={{ ...t("label-medium"), color: "var(--foreground-secondary)" }}>{label}</span>
      <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-sm)" }}>
        {/* Figma's values keep their double spaces ("Installed:  Not Installed"). */}
        <span style={{ ...t("body-medium"), color: "var(--foreground-primary)", whiteSpace: "pre-wrap" }}>{value}</span>
        {status ? <StatusLabel status={status[0]} leading="indicator" shape="rounded">{status[1]}</StatusLabel> : null}
      </span>
    </span>
    {action ? <Button flavour="outline-subtle" size="medium" shape="rounded" disabled={disabled} onClick={onAction}>{action}</Button> : null}
  </div>
);

/** Figma's Configuration Card: Icon Indicator, title and description, and an action (disabled in every Figma frame). */
const ConfigurationCard = ({ icon, title, description, action }: { icon: IconName; title: string; description: string; action: string }) => (
  <Card shape="rounded" hasHeader={false} hasFooter={false}>
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)", padding: "var(--space-xl)" }}>
      <IconIndicator icon={icon} size="large" />
      <span style={{ flex: 1, display: "grid", gap: "var(--space-sm)" }}>
        <span style={{ ...t("label-large"), color: "var(--foreground-primary)" }}>{title}</span>
        <span style={{ ...t("body-small"), color: "var(--foreground-secondary)" }}>{description}</span>
      </span>
      <Button flavour="outline-subtle" size="medium" shape="rounded" disabled>{action}</Button>
    </div>
  </Card>
);

const RAIL_ITEMS: { label: string; icon: IconName }[] = [
  { label: "My Printers", icon: "printer" },
  { label: "Printer Profiles", icon: "printer-profile-deployment" },
  { label: "Application Settings", icon: "settings" },
];
const RAIL_MORE: { label: string; icon: IconName }[] = [
  { label: "Help & Support", icon: "help" },
  { label: "About", icon: "info" },
];

/** Figma's Nucleus Navigation: a light Navigation Rail, 240 wide, with Dark Mode and the version in its footer. */
const NucleusRail = ({ expanded, onExpandedChange, dark, onDark }: { expanded: boolean; onExpandedChange: (e: boolean) => void; dark: boolean; onDark: (on: boolean) => void }) => (
  <NavigationRail navLabel="Nucleus Connector" inverse={!dark} railWidth={240} showToggleItem={false} expanded={expanded} onExpandedChange={onExpandedChange}
    footer={expanded ? (
      <div style={{ display: "grid" }}>
        <Divider />
        <div style={{ display: "flex", alignItems: "center", padding: "var(--space-sm) var(--space-md)" }}>
          <span style={{ flex: 1, display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
            <Icon name="dark-mode" size="medium" />
            <span style={{ ...t("label-medium"), color: "var(--foreground-primary)" }}>Dark Mode</span>
          </span>
          <Switch checked={dark} onCheckedChange={onDark} aria-label="Dark Mode" />
        </div>
        <div style={{ display: "grid", gap: "var(--space-2xs)", padding: "var(--space-sm) var(--space-md)" }}>
          <span style={{ ...t("body-small"), color: "var(--foreground-tertiary)" }}>Version 3.0.3720</span>
          <span style={{ ...t("body-small"), color: "var(--foreground-tertiary)" }}>©2026 Zebra Technologies</span>
        </div>
      </div>
    ) : null}>
    {RAIL_ITEMS.map((n) => <NavigationRailItem key={n.label} label={n.label} icon={n.icon} selected={n.label === "My Printers"} />)}
    <Divider />
    {RAIL_MORE.map((n) => <NavigationRailItem key={n.label} label={n.label} icon={n.icon} />)}
    <Divider />
  </NavigationRail>
);

/* ---- printer settings -------------------------------------------------------- */

type SettingsPage = "bluetooth" | "usb" | "print-quality";
type SettingsModal = null | "restart" | "comm-error" | "usb-restart" | "override";

const SETTINGS_COPY: Record<SettingsPage, { title: string; description: string; toast: string }> = {
  bluetooth: { title: "Bluetooth Settings", description: "Change Bluetooth settings for the printer.", toast: "Bluetooth settings applied" },
  usb: { title: "USB Settings", description: "Change USB settings for this printer.", toast: "USB settings applied" },
  "print-quality": { title: "Print Quality", description: "Change print quality settings for the printer.", toast: "Print quality settings applied" },
};

type BluetoothForm = {
  bluetooth: boolean; discoverable: boolean; security: string | null; friendlyName: string; pin: string;
  bonding: boolean; reconnect: string | null; pairing: string | null; controller: string | null;
};
type SettingsForm = { bluetooth: BluetoothForm; usb: { composite: boolean }; "print-quality": { darkness: number; speed: number } };
const SETTINGS_DEFAULTS: SettingsForm = {
  bluetooth: { bluetooth: true, discoverable: true, security: null, friendlyName: "", pin: "", bonding: true, reconnect: null, pairing: null, controller: null },
  usb: { composite: true },
  "print-quality": { darkness: 30, speed: 5 },
};
// Figma's dropdowns show only "Placeholder"; these options are the page's own, so the fields can change.
const BT_OPTIONS = {
  security: ["1", "2", "3", "4"].map((v) => ({ value: v, label: `Level ${v}` })),
  reconnect: [{ value: "on", label: "On" }, { value: "off", label: "Off" }],
  pairing: [{ value: "numeric", label: "Numeric comparison" }, { value: "passkey", label: "Passkey entry" }, { value: "just-works", label: "Just works" }],
  controller: [{ value: "both", label: "Classic and Low Energy" }, { value: "classic", label: "Classic only" }, { value: "le", label: "Low Energy only" }],
};

const SET_CSS = [
  // Settings and their help popovers ease in on animations/smooth; none with reduced motion.
  ".ns-page{animation:nc-in var(--animations-smooth) both}",
  "@media (prefers-reduced-motion:reduce){.ns-page{animation:none}}",
  // Figma's help glyph is a bare 16px icon beside the label; the Icon Button keeps the row at Figma's height.
  ".ns-help{margin-block:calc(var(--space-sm) * -1)}",
  // Figma's toast hugs its message.
  ".ns-toast .zds-snackbar{inline-size:auto}",
].join("");

/** Figma's Loading Data: a title, "Just a moment..." and a 48px Progress Circle, centred. */
const LoadingData = ({ title }: { title: string }) => (
  <div role="status" style={{ display: "grid", justifyItems: "center", gap: "var(--space-lg)", textAlign: "center", padding: "var(--space-xl)" }}>
    <div style={{ display: "grid", gap: "var(--space-lg)" }}>
      <span style={{ ...t("title-large"), color: "var(--foreground-primary)" }}>{title}</span>
      <span style={{ ...t("body-medium"), color: "var(--foreground-secondary)" }}>Just a moment...</span>
    </div>
    <ProgressCircle size="medium" rounded value={null} aria-label={title} />
  </div>
);

/**
 * Figma's help popover (Asset Dialog Header + Body): opened from the help glyph, closed by it, Escape or a
 * click outside. It hangs under the label row, so it portals into the page root to escape the Card's clipping.
 */
function HelpPopover({ label, title, width, children }: { label: string; title: string; width: number; children: React.ReactNode }) {
  const [pos, setPos] = React.useState<{ top: number; left: number; root: Element } | null>(null);
  const ref = React.useRef<HTMLSpanElement>(null);
  const pop = React.useRef<HTMLDivElement>(null);
  const toggle = () => {
    if (pos) return setPos(null);
    const row = ref.current?.parentElement;
    if (!row) return;
    const r = row.getBoundingClientRect();
    setPos({ top: r.bottom + 4, left: r.left, root: ref.current!.closest(".nc-dashboard") ?? document.body });
  };
  React.useEffect(() => {
    if (!pos) return;
    const away = (e: Event) => { const n = e.target as Node; if (!ref.current?.contains(n) && !pop.current?.contains(n)) setPos(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setPos(null); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [pos]);
  return (
    <span ref={ref} style={{ display: "inline-flex" }}>
      <IconButton className="ns-help" flavour="subtle" size="small" shape="rounded" icon="help-outline" label={label} aria-expanded={pos != null} onClick={toggle} />
      {pos ? ReactDOM.createPortal(
        <div ref={pop} className="cp-pop" role="dialog" aria-label={title} style={{ position: "fixed", insetBlockStart: pos.top, insetInlineStart: pos.left, zIndex: 4, inlineSize: width,
          boxShadow: "var(--shadow-large-x) var(--shadow-large-y) var(--shadow-large-blur) var(--shadow-soft)", borderRadius: "var(--radius-sm)" }}>
          <Card shape="rounded" hasHeader={false} hasFooter={false}>
            <div style={{ display: "grid", gap: "var(--space-md)", padding: "var(--space-lg)" }}>
              <span style={{ ...t("title-medium"), color: "var(--foreground-primary)" }}>{title}</span>
              <div style={{ ...t("body-small"), color: "var(--foreground-primary)", display: "grid", gap: "var(--space-md)" }}>{children}</div>
            </div>
          </Card>
        </div>, pos.root) : null}
    </span>
  );
}

/** Figma's Toggle: a 16/20 label and a Switch. It spans the form column, so the switch ends where the fields end. */
const ToggleRow = ({ label, checked, onChange, disabled }: { label: string; checked: boolean; onChange: (on: boolean) => void; disabled?: boolean }) => (
  <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", blockSize: 48 }}>
    <span style={{ ...t("title-medium"), color: disabled ? "var(--foreground-disabled)" : "var(--foreground-primary)" }}>{label}</span>
    <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} />
  </label>
);

/** Figma's slider field: the label, a Slider over "#" end labels, and the value in a small field. */
function SliderField({ label, help, value, min, max, step, format, onChange, disabled }: {
  label: string; help?: React.ReactNode; value: number; min: number; max: number; step: number; format: (v: number) => string; onChange: (v: number) => void; disabled?: boolean;
}) {
  return (
    <div style={{ display: "grid", gap: "var(--space-sm)", paddingBlock: "var(--space-sm)" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2xs)" }}>
        <span style={{ ...t("title-medium"), color: "var(--foreground-primary)" }}>{label}</span>
        {help}
      </span>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-lg)" }}>
        <div style={{ inlineSize: 192, display: "grid", gap: "var(--space-sm)" }}>
          <Slider shape="sharp" aria-label={label} min={min} max={max} step={step} value={value} disabled={disabled} onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : (v as number))} />
          {/* Figma's end labels are "#" placeholders. */}
          <span style={{ display: "flex", justifyContent: "space-between", ...t("body-small"), color: "var(--foreground-secondary)" }}><span>#</span><span>#</span></span>
        </div>
        <div style={{ inlineSize: 64, flex: "none" }}>
          <InputField size="small" shape="rounded" aria-label={`${label} value`} value={format(value)} disabled={disabled}
            onValueChange={(s) => { const n = Number(s); if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n))); }} />
        </div>
      </div>
    </div>
  );
}

/** Figma's Navigation Rail (narrow, light) with the printer's settings in its Sub Menu. */
function SettingsRail({ page, onPage, onBack, expanded, onExpandedChange, dark, onDark }: {
  page: SettingsPage; onPage: (p: SettingsPage) => void; onBack: () => void; expanded: boolean; onExpandedChange: (e: boolean) => void; dark: boolean; onDark: (on: boolean) => void;
}) {
  const [connectivity, setConnectivity] = React.useState(page !== "print-quality");
  React.useEffect(() => { setConnectivity(page !== "print-quality"); }, [page]);
  const go = (p: SettingsPage) => (e: React.MouseEvent) => { e.preventDefault(); onPage(p); };
  return (
    <NavigationRail navLabel="Nucleus Connector" inverse={!dark} showToggleItem={false} expanded={expanded} onExpandedChange={onExpandedChange}
      footer={<><Divider /><NavigationRailItem label="Dark Mode" icon="dark-mode" selected={dark} onClick={() => onDark(!dark)} /></>}
      subMenuHeader={<SubMenuHeader type="sub-page" heading="Back" backLabel="Back to the printer" onBack={onBack} />}
      subMenu={<>
        {/* Figma's Connected Printer: the printer in a circle, its name and MAC address. */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)", padding: "var(--space-sm) var(--space-md)" }}>
          <span style={{ display: "grid", placeItems: "center", inlineSize: 48, blockSize: 48, flex: "none", borderRadius: "var(--radius-pill)", background: "var(--surface-section)" }}>
            <img src={PRINTER} alt="" width={32} height={27} style={{ objectFit: "cover" }} />
          </span>
          <span style={{ display: "grid", gap: "var(--space-2xs)" }}>
            <span style={{ ...t("label-medium"), color: "var(--foreground-primary)" }}>Zebra ZD621</span>
            {/* Figma: Label/Small at regular weight. */}
            <span style={{ ...t("label-small"), fontWeight: "var(--body-small-font-weight)", color: "var(--foreground-secondary)" }}>MAC: 00-B0-D0-63-C2-26</span>
          </span>
        </div>
        <SubMenuItem label="General" icon="settings" />
        <CollapsibleMenuItem label="Connectivity" icon="network-signal" open={connectivity} onOpenChange={setConnectivity}>
          <SubMenuItem label="Wireless" showLeadingIcon={false} />
          <SubMenuItem label="Bluetooth" showLeadingIcon={false} href="#bluetooth" selected={page === "bluetooth"} onClick={go("bluetooth")} />
          <SubMenuItem label="Wired Ethernet" showLeadingIcon={false} />
          <SubMenuItem label="USB" showLeadingIcon={false} href="#usb" selected={page === "usb"} onClick={go("usb")} />
        </CollapsibleMenuItem>
        <SubMenuItem label="Supplies" icon="print-test-label" />
        <SubMenuItem label="Print Quality" icon="exposure" href="#print-quality" selected={page === "print-quality"} onClick={go("print-quality")} />
        <SubMenuItem label="Device Language" icon="enterprise-diagnostics" />
        <CollapsibleMenuItem label="Remote Server" icon="server">{null}</CollapsibleMenuItem>
        <SubMenuItem label="Advanced Settings" icon="setting-tool" />
      </>}>
      <NavigationRailItem label="My Printers" icon="printer" selected />
      <NavigationRailItem label="Printer Profiles" icon="printer-profile-deployment" />
      <NavigationRailItem label="Templates" icon="file" />
      <Divider />
      <NavigationRailItem label="Application Settings" icon="settings" />
      <NavigationRailItem label="Help & Support" icon="help" />
    </NavigationRail>
  );
}

/** Bluetooth, USB and Print Quality: retrieve, change, apply, confirm. */
function PrinterSettings({ page, onPage, onBack, expanded, onExpandedChange, dark, onDark, onModal }: {
  page: SettingsPage; onPage: (p: SettingsPage) => void; onBack: () => void; expanded: boolean; onExpandedChange: (e: boolean) => void;
  dark: boolean; onDark: (on: boolean) => void; onModal: (open: boolean) => void;
}) {
  const [saved, setSaved] = React.useState<SettingsForm>(SETTINGS_DEFAULTS);
  const [form, setForm] = React.useState<SettingsForm>(SETTINGS_DEFAULTS);
  const [phase, setPhase] = React.useState<"loading" | "ready" | "applying">("loading");
  const [modal, setModal] = React.useState<SettingsModal>(null);
  const [retried, setRetried] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);
  const [saveToFile, setSaveToFile] = React.useState(false);
  const [shownModal, modalClosing] = useExit(modal);
  const [shownToast, toastClosing] = useExit(toast);
  React.useEffect(() => { onModal(modal != null); }, [modal, onModal]);

  // Each page retrieves its settings first (Figma's 01_Retrieving Settings).
  React.useEffect(() => {
    setPhase("loading"); setToast(null); setForm(saved);
    const id = setTimeout(() => setPhase("ready"), 1200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const copy = SETTINGS_COPY[page];
  const dirty = JSON.stringify(form[page]) !== JSON.stringify(saved[page]);
  const busy = phase !== "ready";
  const set = <P extends SettingsPage>(p: P, patch: Partial<SettingsForm[P]>) => setForm((f) => ({ ...f, [p]: { ...f[p], ...patch } }));

  const commit = () => setSaved((s) => ({ ...s, [page]: form[page] }));
  /** Applying settings (Figma's Apply settings loader), then what follows it. */
  const apply = (then: () => void) => {
    setModal(null); setToast(null); setPhase("applying");
    setTimeout(() => { setPhase("ready"); then(); }, 1500);
  };
  const onApply = () => {
    if (page === "usb") return setModal("usb-restart");
    if (page === "print-quality") return setModal("override");
    // Bluetooth: turning Bluetooth off loses the printer once (Communication error); Retry gets through.
    apply(() => {
      if (!form.bluetooth.bluetooth && !retried) { setModal("comm-error"); return; }
      commit(); setRetried(false); setModal("restart");
    });
  };
  const done = () => { commit(); setToast(copy.toast); };

  const bt = form.bluetooth;
  const dis = busy;
  let content: React.ReactNode;
  if (phase === "loading") {
    content = <div style={{ flex: 1, display: "grid", placeItems: "center" }}><LoadingData title="Retrieving settings" /></div>;
  } else if (page === "bluetooth") {
    content = (
      <Card shape="rounded" hasHeader={false} hasFooter={false}>
        {/* Figma's 400px form column: the fields fill it and each switch ends where the fields end. */}
        <div className="ns-form" style={{ display: "grid", gridTemplateColumns: "min(400px, 100%)", gap: "var(--space-lg)", padding: "var(--space-lg) var(--space-xl)" }}>
          <ToggleRow label="Bluetooth" checked={bt.bluetooth} disabled={dis} onChange={(v) => set("bluetooth", { bluetooth: v })} />
          <ToggleRow label="Discoverable" checked={bt.discoverable} disabled={dis} onChange={(v) => set("bluetooth", { discoverable: v })} />
          <Select label="Minimum Bluetooth Security Mode" placeholder="Placeholder" options={BT_OPTIONS.security} value={bt.security} state={dis ? "disabled" : "default"} shape="rounded" block onValueChange={(v) => set("bluetooth", { security: v })} />
          <Input block label="Friendly Name" subLabel="Leo tortor ornare blandit mollis tristique tortor eu lectus." placeholder="Placeholder" value={bt.friendlyName} state={dis ? "disabled" : "default"} shape="rounded" onValueChange={(v) => set("bluetooth", { friendlyName: v })} />
          <Input block label="Authentication PIN" subLabel="Leo tortor ornare blandit mollis tristique tortor eu lectus." placeholder="Placeholder" value={bt.pin} state={dis ? "disabled" : "default"} shape="rounded" onValueChange={(v) => set("bluetooth", { pin: v })} />
          <ToggleRow label="Bonding" checked={bt.bonding} disabled={dis} onChange={(v) => set("bluetooth", { bonding: v })} />
          <Select label="Enable Reconnect" placeholder="Placeholder" options={BT_OPTIONS.reconnect} value={bt.reconnect} state={dis ? "disabled" : "default"} shape="rounded" block onValueChange={(v) => set("bluetooth", { reconnect: v })} />
          <Select label="Pairing Method" placeholder="Placeholder" options={BT_OPTIONS.pairing} value={bt.pairing} state={dis ? "disabled" : "default"} shape="rounded" block onValueChange={(v) => set("bluetooth", { pairing: v })} />
          <Select label="Bluetooth Controller Mode" placeholder="Placeholder" options={BT_OPTIONS.controller} value={bt.controller} state={dis ? "disabled" : "default"} shape="rounded" block onValueChange={(v) => set("bluetooth", { controller: v })} />
        </div>
      </Card>
    );
  } else if (page === "usb") {
    content = (
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Card shape="rounded" hasHeader={false} hasFooter={false} style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2xl)", inlineSize: 488, padding: "var(--space-lg) var(--space-xl)" }}>
            <div style={{ flex: 1, display: "grid", gap: "var(--space-sm)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2xs)" }}>
                <span style={{ ...t("title-medium"), color: "var(--foreground-primary)" }}>USB Composite (Recommended)</span>
                <HelpPopover label="About USB Composite" title="About USB Composite" width={360}>
                  <p style={{ margin: 0 }}><strong>USB Composite (Recommended)</strong><br />Enables advanced two-way communication by functioning simultaneously as a standard printer and a virtual COM port.</p>
                  <p style={{ margin: 0 }}>Choose this mode for full device management, real-time status monitoring, and seamless integration with the Nucleus platform (via WebUSB).</p>
                  <p style={{ margin: 0 }}><strong>USB Legacy Mode</strong><br />Operates strictly as a standard USB printer class device</p>
                  <p style={{ margin: 0 }}>Choose this mode only as a fallback if you experience driver compatibility issues on older operating systems, keeping in mind that advanced management and status reporting features will be disabled.</p>
                </HelpPopover>
              </span>
              <span style={{ ...t("body-small"), color: "var(--foreground-secondary)" }}>Enable for full device management and real-time status. Turn off for legacy mode to resolve driver compatibility issues</span>
            </div>
            <Switch checked={form.usb.composite} disabled={dis} onCheckedChange={(v) => set("usb", { composite: v })} aria-label="USB Composite" />
          </div>
        </Card>
      </div>
    );
  } else {
    const pq = form["print-quality"];
    const module = (title: string, description: string, field: React.ReactNode) => (
      <Card shape="rounded" hasHeader={false} hasFooter={false}>
        <div style={{ display: "grid", gap: "var(--space-sm)", padding: "var(--space-lg) var(--space-xl)" }}>
          <div style={{ display: "grid", gap: "var(--space-sm)", paddingBlock: "var(--space-sm)" }}>
            <span style={{ ...t("title-large"), color: "var(--foreground-primary)" }}>{title}</span>
            <span style={{ ...t("body-medium"), color: "var(--foreground-secondary)" }}>{description}</span>
          </div>
          {field}
        </div>
      </Card>
    );
    content = (
      <div style={{ display: "grid", gap: "var(--space-lg)" }}>
        {module("Darkness", "Manually adjust the darkness settings.",
          <SliderField label="Darkness" value={pq.darkness} min={0} max={60} step={1} format={(v) => String(v)} disabled={dis} onChange={(v) => set("print-quality", { darkness: v })}
            help={<HelpPopover label="About Darkness Control" title="Darkness Control" width={343}>
              <ul style={{ margin: 0, paddingInlineStart: "var(--space-lg)" }}>
                <li>Low has no effect on the Darkness Control</li>
                <li>Medium increases the Darkness Control by 3</li>
                <li>High increases the Darkness Control by 6</li>
              </ul>
              <p style={{ margin: 0, color: "var(--foreground-secondary)" }}>Setting the darkness too high or too low may decrease readability</p>
            </HelpPopover>} />)}
        {module("Speed", "Manually adjust the speed setting.",
          <SliderField label="Print Speed (in/second)" value={pq.speed} min={2} max={8} step={0.5} format={(v) => v.toFixed(1)} disabled={dis} onChange={(v) => set("print-quality", { speed: v })} />)}
        <p style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)", margin: 0, paddingBlock: "var(--space-sm)", ...t("body-medium"), color: "var(--foreground-primary)" }}>
          <Icon name="help" size="large" />
          {/* Not designed: the assistant link is inert. */}
          <span>Need help? Use our <span style={{ color: "var(--foreground-link)", textDecoration: "underline" }}>assistant to print labels</span> for comparison.</span>
        </p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minBlockSize: 0, display: "flex" }}>
      <div inert={shownModal != null} style={{ display: "contents" }}>
      <SettingsRail page={page} onPage={onPage} onBack={onBack} expanded={expanded} onExpandedChange={onExpandedChange} dark={dark} onDark={onDark} />
      {/* Figma's Sub Menu draws a right border; the rail's sub menu panel has none. */}
      <Divider orientation="vertical" />
      <div style={{ position: "relative", flex: 1, minInlineSize: 0, display: "flex", flexDirection: "column", background: "var(--surface-card)" }}>
        <Scrolled key={page} className="ns-page" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2xl)", padding: "var(--space-2xl)" }}>
          <div style={{ display: "grid", gap: "var(--space-lg)" }}>
            {/* Figma: Headline Medium, 28/32 at medium weight. */}
            <h1 style={{ ...t("heading-medium"), fontWeight: "var(--title-large-font-weight)", color: "var(--foreground-primary)" }}>{copy.title}</h1>
            <p style={{ ...t("body-medium"), color: "var(--foreground-secondary)" }}>{copy.description}</p>
          </div>
          {content}
        </Scrolled>
        {page === "print-quality" && phase !== "loading" ? (
          <div style={{ padding: "var(--space-lg) var(--space-3xl)" }}>
            <Checkbox checked={saveToFile} disabled={dis} onCheckedChange={setSaveToFile}
              label={<span style={{ display: "grid" }}><span style={{ ...t("label-large"), fontWeight: "var(--title-large-font-weight)" }}>Save settings to file</span>
                <span style={{ ...t("body-medium") }}>For security purposes, please be aware that the security file contains the Protected Mode password you configured. Do not share this file with an untrusted source.</span></span>} />
          </div>
        ) : null}
        {/* Figma's Actions Footer: empty while settings are retrieved. */}
        <div style={{ display: "flex", alignItems: "center", blockSize: 80, boxSizing: "border-box", padding: "var(--space-lg) var(--space-xl)", borderBlockStart: "var(--stroke-thin) solid var(--border-subtle)", background: "var(--surface-card)" }}>
          {phase === "loading" ? null : <>
            <Button flavour="text" size="large" shape="rounded" disabled={dis} style={{ minInlineSize: 128 }} onClick={() => setForm((f) => ({ ...f, [page]: saved[page] }))}>Clear</Button>
            <span style={{ flex: 1 }} />
            <span style={{ display: "flex", gap: "var(--space-sm)" }}>
              {page === "print-quality"
                ? <Button flavour="outline" size="large" shape="rounded" disabled={dis}>Print Test Label</Button>
                : <Button flavour="outline-subtle" size="large" shape="rounded" leadingIcon="save-alt" disabled={dis}>Save Configuration To Printer Profiles</Button>}
              <Button flavour="primary" size="large" shape="rounded" disabled={dis || !dirty} style={{ minInlineSize: 128 }} onClick={onApply}>Apply</Button>
            </span>
          </>}
        </div>
        {phase === "applying" ? (
          <div className="cp-scrim" style={{ position: "absolute", inset: 0, zIndex: 2, display: "grid", placeItems: "center" }}>
            {/* Figma's Loading Scrim washes the page out in white. */}
            <span aria-hidden style={{ position: "absolute", inset: 0, background: "var(--surface-card)", opacity: 0.7 }} />
            <div style={{ position: "relative" }}><LoadingData title="Apply settings" /></div>
          </div>
        ) : null}
        {shownToast ? (
          <div className="ns-toast cp-pop" data-closing={toastClosing ? "" : undefined}
            style={{ position: "absolute", insetBlockEnd: "var(--space-lg)", insetInlineStart: "50%", translate: "-50% 0", zIndex: 2 }}>
            <Snackbar inline open variant="standard" shape="rounded" duration={5000} onClose={() => setToast(null)}>{shownToast}</Snackbar>
          </div>
        ) : null}
      </div>
      </div>
      {shownModal ? (
        <div className="cp-scrim" data-closing={modalClosing ? "" : undefined}
          style={{ position: "fixed", inset: 0, zIndex: 3, background: "var(--overlay-scrim)", display: "grid", placeItems: "center" }}>
          {shownModal === "restart" ? (
            <Dialog inline className="cp-dialog cp-pop" heading="Restart printer" shape="rounded" showClose={false} showFooter
              footerEnd={<>
                <Button flavour="outline-subtle" size="medium" shape="rounded" onClick={() => setModal(null)}>Cancel</Button>
                <Button flavour="primary" size="medium" shape="rounded" onClick={() => { setModal(null); setToast(copy.toast); }}>Restart</Button>
              </>}>
              <p style={{ ...t("body-medium"), margin: 0 }}>Your printer settings have been updated. Your printer needs to restart for settings to take full affect</p>
            </Dialog>
          ) : shownModal === "comm-error" ? (
            <Dialog inline className="cp-dialog cp-pop" heading="Communication error" shape="rounded" showClose={false} showFooter
              footerEnd={<>
                <Button flavour="outline-subtle" size="medium" shape="rounded" onClick={() => { setModal(null); setForm((f) => ({ ...f, bluetooth: saved.bluetooth })); }}>Disconnect</Button>
                <Button flavour="primary" size="medium" shape="rounded" onClick={() => { setRetried(true); apply(() => { commit(); setRetried(false); setModal("restart"); }); }}>Retry</Button>
              </>}>
              <p style={{ ...t("body-medium"), margin: 0 }}>Could not connect to device. Do you want to retry or disconnect the printer?</p>
            </Dialog>
          ) : shownModal === "usb-restart" ? (
            <Dialog inline className="cp-dialog cp-pop" heading="Printer restart required" shape="rounded" showClose={false} showFooter
              footerEnd={<>
                <Button flavour="outline-subtle" size="medium" shape="rounded" onClick={() => { setModal(null); setForm((f) => ({ ...f, usb: saved.usb })); }}>Cancel</Button>
                <Button flavour="primary" size="medium" shape="rounded" onClick={() => apply(done)}>Restart &amp; Apply</Button>
              </>}>
              <p style={{ ...t("body-medium"), margin: 0 }}>To apply your changes, we will need to restart the printer. If you select cancel, no changes will be applied.</p>
            </Dialog>
          ) : (
            <Dialog inline className="cp-dialog cp-pop" heading="Override physical darkness switch" shape="rounded" showClose={false} showFooter
              footerEnd={<>
                <Button flavour="outline-subtle" size="medium" shape="rounded" onClick={() => setModal(null)}>Cancel</Button>
                <Button flavour="primary" size="medium" shape="rounded" onClick={() => apply(done)}>Proceed Digitally</Button>
              </>}>
              <p style={{ ...t("body-medium"), margin: 0 }}>By updating the setting digitally, there will be a discrepancy with the physical switch on the printer. Do you want to proceed with digitally updating the setting?</p>
            </Dialog>
          )}
        </div>
      ) : null}
    </div>
  );
}

function PrinterDashboard({ state: initial = "ready", theme, settings }: { state?: DashboardState; theme?: FlowProps["theme"]; settings?: SettingsPage }) {
  const [state, setState] = React.useState<DashboardState>(initial);
  // The toolbar's Settings opens the printer's settings, on Bluetooth; Back returns here.
  const [page, setPage] = React.useState<SettingsPage | null>(settings ?? null);
  const [settingsRail, setSettingsRail] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(true);
  const [dark, setDark] = React.useState(theme === "mode-dark");
  const ready = state === "ready";
  // Diagnostic and Protected Mode lock the printer's actions; Protected Mode drops Security Mode's own action.
  const locked = state === "diagnostic" || state === "protected";
  // Keyed by mode so useExit can keep the leaving banner mounted.
  const [bannerMode, bannerClosing] = useExit(state === "diagnostic" || state === "protected" ? state : null);
  const shownBanner = bannerMode === "diagnostic"
    ? { title: "Diagnostic Mode is Enabled", description: "Printer actions are unavailable while Diagnostic Mode is on. Disable it to use them.", action: "Disable" }
    : bannerMode === "protected"
      ? { title: "Printer is in Protected Mode", description: "Printer actions are unavailable while Protected Mode is on. Change the security mode to use them.", action: "Change" }
      : null;
  return (
    <div className={["nc-dashboard", dark ? "mode-dark" : "mode-light"].join(" ")} style={{ inlineSize: "100%", blockSize: 1080, display: "flex", flexDirection: "column",
      background: "var(--surface-section)", color: "var(--foreground-primary)" }}>
      <style>{PAGE_CSS + DASH_CSS + SET_CSS}</style>
      <div inert={modalOpen} style={{ display: "contents" }}>
        <GlobalHeader className="cp-header" mode={dark ? "dark" : "light"} platformName="Zebra Nucleus Connector" appSwitcher={false} searchBar={false}
          menuLabel="Toggle navigation" onMenuClick={() => (page ? setSettingsRail((e) => !e) : setExpanded((e) => !e))} />
      </div>
      {page ? (
        <PrinterSettings page={page} onPage={setPage} onBack={() => setPage(null)} expanded={settingsRail} onExpandedChange={setSettingsRail}
          dark={dark} onDark={setDark} onModal={setModalOpen} />
      ) : (
      <div key="dashboard" className="ns-page" style={{ flex: 1, minBlockSize: 0, display: "flex" }}>
        <NucleusRail expanded={expanded} onExpandedChange={setExpanded} dark={dark} onDark={setDark} />
        <Divider orientation="vertical" />
        <Scrolled tag="main" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)", padding: "var(--space-xl)",
          background: "var(--surface-section)" }}>
          <Button flavour="subtle" size="small" shape="rounded" leadingIcon="arrow-back" style={{ alignSelf: "flex-start" }}>Back</Button>
          {/* The banner eases in and out (cp-pop), as dialogs do. Disable and Change both return to the ready dashboard. */}
          {shownBanner ? (
            <div className="cp-pop" data-closing={bannerClosing || undefined}>
              <InlineBanner status="warning" appearance="subtle" shape="rounded" title={shownBanner.title} description={shownBanner.description}
                actions={<Button flavour="outline-subtle" size="small" shape="rounded"
                  onClick={() => setState("ready")}>{shownBanner.action}</Button>} />
            </div>
          ) : null}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-lg)" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "var(--space-lg)" }}>
              <h1 style={{ ...t("heading-medium"), color: "var(--foreground-primary)", whiteSpace: "nowrap" }}>Zebra ZD621 - 300DPI</h1>
              <span style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
                <Icon name="refresh" size="large" />
                <span style={{ ...t("body-small"), color: "var(--foreground-tertiary)" }}>Last synced: 02/18/2026, 2:30 PM</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)" }}>
              <Button flavour="subtle" size="small" shape="rounded" leadingIcon="settings" onClick={() => setPage("bluetooth")}>Settings</Button>
              <Button flavour="subtle" size="small" shape="rounded" leadingIcon="build">Actions</Button>
              <Button flavour="subtle" size="small" shape="rounded" leadingIcon="file">Templates</Button>
              {ready ? null : <Button flavour="negative" size="small" shape="rounded" leadingIcon="link">Disconnect printer</Button>}
            </div>
          </div>
          <div style={{ display: "grid", gap: "var(--space-3xl)" }}>
            {/* The columns share the width in Figma's 883 : 700 ratio and stack when it can't hold both. */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xl)", alignItems: "flex-start" }}>
              <div style={{ flex: "883 1 560px", minInlineSize: 0, display: "grid", gap: "var(--space-xl)" }}>
                <PrinterDetailsCard more={ready} />
                <CurrentSupplyCard zebra={state !== "non-zebra"} disabled={locked} />
              </div>
              <div style={{ flex: "700 1 420px", minInlineSize: 0 }}>
                <Card shape="rounded" hasHeader={false} hasFooter={false}>
                  <div style={{ display: "grid", gap: "var(--space-lg)", padding: "var(--space-xl)" }}>
                    <h2 style={{ ...t("title-large"), color: "var(--foreground-primary)" }}>Overview</h2>
                    <div style={{ display: "grid", gap: "var(--space-lg)" }}>
                      <OverviewRow icon="security-check" label="Security Mode"
                        value={state === "protected" || ready ? "Protected Mode:" : "Advance Security Mode:"}
                        status={state === "protected" ? ["positive", "ON"] : ["neutral", "OFF"]}
                        action={state === "protected" ? undefined : "Change"} disabled={locked} onAction={() => setState("protected")} />
                      <Divider />
                      <OverviewRow icon="printer" label="Printer Driver" value="Installed:  Not Installed" action="Manage" disabled={locked} />
                      <Divider />
                      <OverviewRow icon="wifi" label="Connection" value="Wireless | IP Address: 192.168.1.145" action="Manage" disabled={locked} />
                      <Divider />
                      <OverviewRow icon="enterprise-diagnostics" label="Command Language" value="ZPL" action="Change" disabled={locked} />
                      <Divider />
                      <OverviewRow icon="battery-charging" label="Power Source" value="AC Adapter:  ON" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div style={{ display: "grid", gap: "var(--space-xl)" }}>
              <h2 style={{ ...t("title-large"), color: "var(--foreground-primary)" }}>Printer Configuration</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)" }}>
                <ConfigurationCard icon="printer-profile-deployment" title="Printer Profiles" description="Apply saved profiles to your printers to ensure consistent settings and quick setup." action="View Profiles" />
                <ConfigurationCard icon="lock" title="Security Assessment" description="Ensure your printer’s data and connection is protected with the print security report" action="Run Assessment" />
                <ConfigurationCard icon="enterprise-diagnostics" title="Communication With Printer" description="Send commands and receive data directly from the printer." action="Open Communication" />
              </div>
            </div>
          </div>
        </Scrolled>
      </div>
      )}
    </div>
  );
}

/* ---- flow -------------------------------------------------------------------- */

interface NucleusConnectorFlowProps extends Omit<FlowProps, "onClose"> {
  /** Start on the dashboard in this state instead of the wizard. */
  dashboard?: DashboardState;
  /** Start on the dashboard's settings, on this page. */
  settings?: SettingsPage;
}

/** The wizard, and once it closes, the printer dashboard. */
function NucleusConnectorFlow({ dashboard, settings, ...wizard }: NucleusConnectorFlowProps) {
  const [view, setView] = React.useState<DashboardState | null>(dashboard ?? null);
  return view
    ? <PrinterDashboard state={view} theme={wizard.theme} settings={settings} />
    : <ConnectPrinterWizard {...wizard} onClose={() => setView("diagnostic")} />;
}

const meta: Meta<typeof NucleusConnectorFlow> = {
  title: "Experimental/Pages/Nucleus Connector Flow",
  component: NucleusConnectorFlow,
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: "https://www.figma.com/design/xZIoVHphedpglTcxOBTTbX/Zebra-Design-System-Patterns?node-id=14-33031" },
    docs: { description: { component: "**Experimental mock flow.** The Zebra Nucleus Connector. The Connect Printer wizard (Figma: 1440 × 900) sets up a printer's Wi-Fi: Use Another Connection Type → Wi-Fi and Ethernet → Next → Set Up a Wi-Fi Connection (the printer is found on USB) → Next → Prepare → Next → the network list scans → pick a network → enter the password → Connect → connected. A password under 8 characters fails: Unable to Connect, then Try Again shows the password error. The wizard's Close opens the printer dashboard in Diagnostic Mode (Figma: 1920 × 1080); Disable leads to the ready dashboard Security Mode's Change to Protected Mode, and Protected Mode's Change back to ready; the Dark Mode switch turns the header and rail dark too; both screens fill the container's width; the Dashboard stories show its four Figma states. The toolbar's Settings opens the printer's settings (Bluetooth, USB, Print Quality): each retrieves, changes enable Apply, and Apply confirms through its own dialog. Composed from Global Header, Navigation Rail, Icon Button, Vertical Stepper, Step Card, Radio, Status Label, Tab Bar, Progress Bar, Switch, Input, Dialog, Progress Circle, Snackbar, Inline Banner, Card, Icon Indicator, Divider, Select, Slider, Checkbox, Sub Menu Header, Sub Menu Item, Collapsible Menu Item, Button and Icon." } },
  },
};
export default meta;
type Story = StoryObj<typeof NucleusConnectorFlow>;

export const Flow: Story = {};

/** Stage 2's alternate state: Wi-Fi unavailable while USB is connected (screen 82). */
export const WifiUnavailable: Story = { args: { start: "type", wifiUnavailable: true } };

/** Stage 3: network options. */
export const NetworkOptions: Story = { args: { start: "network" } };

/** Stage 5 onward: the Wi-Fi list, password and connect. */
export const SelectWifi: Story = { args: { start: "wifi" } };

/** After Close: the printer dashboard, ready (Figma's Send a File frame). */
export const Dashboard: Story = {
  args: { dashboard: "ready" },
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/xZIoVHphedpglTcxOBTTbX/Zebra-Design-System-Patterns?node-id=258-15666" } },
};

/** Diagnostic Mode locks the printer's actions behind a warning banner. */
export const DashboardDiagnostic: Story = {
  args: { dashboard: "diagnostic" },
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/xZIoVHphedpglTcxOBTTbX/Zebra-Design-System-Patterns?node-id=258-15663" } },
};

/** Protected Mode: Security Mode reads ON, and the other actions are locked. */
export const DashboardProtected: Story = {
  args: { dashboard: "protected" },
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/xZIoVHphedpglTcxOBTTbX/Zebra-Design-System-Patterns?node-id=258-15665" } },
};

/** A non-Zebra roll: no part number, photo or label count. */
export const DashboardNonZebraSupply: Story = {
  args: { dashboard: "non-zebra" },
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/xZIoVHphedpglTcxOBTTbX/Zebra-Design-System-Patterns?node-id=258-15664" } },
};

export const Dark: Story = { args: { theme: "mode-dark" } };

export const DashboardDark: Story = { args: { dashboard: "ready", theme: "mode-dark" } };

/** Settings, from the dashboard's Settings: Bluetooth. Change a setting to enable Apply; Apply → Restart printer → snackbar. Switch Bluetooth off and Apply for the Communication error. */
export const SettingsBluetooth: Story = {
  args: { dashboard: "ready", settings: "bluetooth" },
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/xZIoVHphedpglTcxOBTTbX/Zebra-Design-System-Patterns?node-id=251-41258" } },
};

/** Settings: USB. The help glyph opens About USB Composite; Apply asks to restart the printer first. */
export const SettingsUsb: Story = {
  args: { dashboard: "ready", settings: "usb" },
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/xZIoVHphedpglTcxOBTTbX/Zebra-Design-System-Patterns?node-id=251-41544" } },
};

/** Settings: Print Quality. Move a slider to enable Apply; Apply asks to override the physical darkness switch. */
export const SettingsPrintQuality: Story = {
  args: { dashboard: "ready", settings: "print-quality" },
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/xZIoVHphedpglTcxOBTTbX/Zebra-Design-System-Patterns?node-id=251-41575" } },
};

export const SettingsDark: Story = { args: { dashboard: "ready", settings: "bluetooth", theme: "mode-dark" } };
