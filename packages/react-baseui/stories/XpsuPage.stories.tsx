import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Checkbox, Divider, Icon, Input, ScreenHeaderBar, Scrollbar, Select, Switch, SystemBanner } from "../src/index.js";

/* A mock mobile page, not a component: XPSU's Wireless Settings on a 390 ×
   844 handheld, composed only from the library. Every field is the library's
   Input or Select (label above, hint below, as the components lay them out),
   every toggle a Switch; layout is inline styles on semantic tokens. A
   mobile System Banner is frozen above everything, outside the scroll, and
   the body scrolls the iOS way: no scrollbar, a thin indicator while moving. */

const type = (role: string) => ({
  fontFamily: `var(--${role}-font-family), system-ui, sans-serif`,
  fontSize: `var(--${role}-font-size)`,
  fontWeight: `var(--${role}-font-weight)`,
  lineHeight: `var(--${role}-line-height)`,
  letterSpacing: `var(--${role}-letter-spacing)`,
});

const HINT = "Lorem impsum text on what this means";
const BLURB = "Leo tortor ornare blandit mollis tristique tortor eu lectus. Etiam semper non.";

const IP_PROTOCOLS = [{ value: "all", label: "All" }, { value: "dhcp", label: "DHCP" }, { value: "static", label: "Static" }];
const ID_TYPES = [{ value: "mac", label: "MAC Address" }, { value: "hostname", label: "Hostname" }, { value: "custom", label: "Custom" }];
const SECURITY = [{ value: "none", label: "NONE" }, { value: "wpa2", label: "WPA2 Personal" }, { value: "wpa3", label: "WPA3 Personal" }, { value: "eap", label: "WPA2 Enterprise" }];
const CHANNELS = [{ value: "1", label: "1" }, { value: "6", label: "6" }, { value: "11", label: "11" }, { value: "auto", label: "Auto" }];

/** A setting that is on or off: its name and what it does, with the Switch at the end. */
function ToggleRow({ id, title, children, checked, onChange, disabled }: {
  id: string; title: string; children: React.ReactNode; checked: boolean; onChange: (on: boolean) => void; disabled?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-xl)" }}>
      <div style={{ flex: 1, minInlineSize: 0, display: "grid", gap: "var(--space-2xs)" }}>
        <span id={`${id}-label`} style={{ ...type("label-large"), color: disabled ? "var(--foreground-disabled)" : "var(--foreground-primary)" }}>{title}</span>
        <span id={`${id}-desc`} style={{ ...type("body-xsmall"), color: disabled ? "var(--foreground-disabled)" : "var(--foreground-tertiary)" }}>{children}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} aria-labelledby={`${id}-label`} aria-describedby={`${id}-desc`} />
    </div>
  );
}

const INITIAL = {
  wireless: true, hostname: "61JCS8", ip: "all", powerSave: true, clientId: true, idType: "mac", idPrefix: "",
  idSuffix: "28060402073", essid: "125", security: "none", band: "2.4", channel: null as string | null,
};
type Settings = typeof INITIAL;

/** Phone-style scrolling: the library Scrollbar overlays the edge, shows
    while the content moves and fades out shortly after. */
function PhoneScroll({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [bar, setBar] = React.useState({ value: 0, size: 0, shown: false });
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const onScroll = () => {
    const el = ref.current;
    if (!el || el.scrollHeight <= el.clientHeight) return;
    setBar({ value: el.scrollTop / (el.scrollHeight - el.clientHeight), size: el.clientHeight / el.scrollHeight, shown: true });
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setBar((b) => ({ ...b, shown: false })), 700);
  };
  React.useEffect(() => () => clearTimeout(hideTimer.current), []);
  return (
    <div style={{ position: "relative", flex: 1, minBlockSize: 0, display: "flex" }}>
      <div ref={ref} onScroll={onScroll} style={{ ...style, flex: 1, minBlockSize: 0, overflow: "auto", scrollbarWidth: "none", overscrollBehavior: "contain" }}>
        {children}
      </div>
      {/* The library Scrollbar (specs/scrollbar), phone-style: it appears while scrolling and fades at rest. */}
      <Scrollbar value={bar.value} size={bar.size} style={{
        position: "absolute", insetBlock: 0, insetInlineEnd: 0, ["--zds-scrollbar-length" as string]: "100%",
        opacity: bar.shown ? 1 : 0, transition: bar.shown ? "opacity 100ms" : "opacity 400ms", pointerEvents: "none",
      }} />
    </div>
  );
}

/** The phone's own status bar: time, network, Wi-Fi and battery. Device chrome, not a library component. With a
    banner showing it takes the banner's colours (the banner is locked to Dark, so .mode-dark here too) and reads as
    one block with it; otherwise it sits on the page surface in the foreground colour. */
function PhoneStatusBar({ banner }: { banner: "info" | "warning" | null }) {
  return (
    <div className={banner ? "mode-dark" : undefined} data-status-fill={banner ? "" : undefined} style={{
      flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "var(--space-sm) var(--space-xl)",
      background: banner ? `var(--feedback-${banner}-background-strong)` : "transparent",
      color: "var(--foreground-primary)",
      // The banner's own motion duration, so the bar settles as the banner slides away.
      transition: "background-color 400ms ease, color 400ms ease",
    }}>
      <span style={{ ...type("label-medium"), fontVariantNumeric: "tabular-nums" }}>9:41</span>
      <span aria-label="Signal, Wi-Fi and battery" style={{ display: "flex", alignItems: "center", gap: "var(--space-2xs)" }}>
        <Icon name="cellular-signal" size="small" />
        <Icon name="wifi" size="small" />
        <Icon name="battery" size="small" />
      </span>
    </div>
  );
}

/** The phone: a fixed 390 × 844 frame on the page surface. */
const Phone = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className} style={{
    inlineSize: 390, blockSize: 844, display: "flex", flexDirection: "column", overflow: "hidden",
    background: "var(--surface-section)", color: "var(--foreground-primary)",
    border: "var(--stroke-thin) solid var(--border-default)", borderRadius: "var(--radius-xl)",
  }}>{children}</div>
);

function XpsuPage({ theme }: { theme?: "mode-light" | "mode-dark" }) {
  const [s, setS] = React.useState<Settings>(INITIAL);
  const [saveToFile, setSaveToFile] = React.useState(false);
  const [applied, setApplied] = React.useState<Settings>(INITIAL);
  const [noticeOpen, setNoticeOpen] = React.useState(true);
  const set = <K extends keyof Settings>(key: K) => (value: Settings[K]) => setS((p) => ({ ...p, [key]: value }));
  const dirty = JSON.stringify(s) !== JSON.stringify(applied);
  // Wireless off: every setting below it waits; Client ID off: the ID fields are not used.
  const off = !s.wireless;

  const banner = off ? "warning" : noticeOpen ? "info" : null;

  return (
    <Phone className={theme}>
      <PhoneStatusBar banner={banner} />

      {/* Frozen to the top, above the header: it sits outside the scrolling body.
          Wireless off turns it into a warning that cannot be dismissed. */}
      {off ? (
        <SystemBanner layout="mobile" status="warning" shape="rounded" style={{ flex: "none" }} icon="warning"
          title="Wireless is off"
          description="The printer can't reach the network until wireless is turned back on."
          showClose={false}
          actions={<Button flavour="outline-contrast" size="small" onClick={() => set("wireless")(true)}>Turn on</Button>} />
      ) : noticeOpen ? (
        <SystemBanner layout="mobile" status="info" shape="rounded" style={{ flex: "none" }} icon="info"
          title="Changes apply after a restart"
          description="The printer restarts its wireless module when you press Apply."
          onClose={() => setNoticeOpen(false)} />
      ) : null}

      <ScreenHeaderBar title="Wireless Settings" shape="rounded" backLabel="Back to settings" />

      <PhoneScroll style={{ padding: "0 var(--space-xl) var(--space-xl)", display: "grid", gap: "var(--space-xl)", alignContent: "start" }}>
        <p style={{ ...type("body-small"), margin: 0, color: "var(--foreground-secondary)" }}>
          Leo tortor ornare blandit mollis tristique tortor eu lectus. Etiam semper non a elementum in.
        </p>

        <ToggleRow id="wireless" title="Wireless" checked={s.wireless} onChange={set("wireless")}>{BLURB}</ToggleRow>

        <Input label="Hostname" hint={HINT} hintIcon={false} shape="rounded" value={s.hostname} onValueChange={set("hostname")} state={off ? "disabled" : "default"} />
        <Select label="IP Addressing Protocol" hint={HINT} hintIcon={false} shape="rounded" options={IP_PROTOCOLS} value={s.ip}
          onValueChange={(v) => set("ip")(v ?? "all")} state={off ? "disabled" : "default"} />

        <ToggleRow id="power-save" title="Power Save Mode" checked={s.powerSave} onChange={set("powerSave")} disabled={off}>{BLURB}</ToggleRow>
        <ToggleRow id="client-id" title="Client ID" checked={s.clientId} onChange={set("clientId")} disabled={off}>{BLURB}</ToggleRow>

        {s.clientId ? (
          <>
            <Select label="ID Type" hint={HINT} hintIcon={false} shape="rounded" options={ID_TYPES} value={s.idType}
              onValueChange={(v) => set("idType")(v ?? "mac")} state={off ? "disabled" : "default"} />
            <Input label="ID Prefix" hint={HINT} hintIcon={false} shape="rounded" value={s.idPrefix} onValueChange={set("idPrefix")} state={off ? "disabled" : "default"} />
            <Input label="ID Suffix" hint={HINT} hintIcon={false} shape="rounded" value={s.idSuffix} onValueChange={set("idSuffix")} state={off ? "disabled" : "default"} />
          </>
        ) : null}

        <Input label="ESSID" hint={HINT} hintIcon={false} shape="rounded" value={s.essid} onValueChange={set("essid")} state={off ? "disabled" : "default"} />
        <Select label="Security Mode" hint={HINT} hintIcon={false} shape="rounded" options={SECURITY} value={s.security}
          onValueChange={(v) => set("security")(v ?? "none")} state={off ? "disabled" : "default"} />
        <Input label="Wireless Band" hint={HINT} hintIcon={false} shape="rounded" value={s.band} onValueChange={set("band")} state={off ? "disabled" : "default"} />
        <Select label="Channel List" hint={HINT} hintIcon={false} shape="rounded" options={CHANNELS} value={s.channel} placeholder="Choose a channel"
          onValueChange={set("channel")} state={off ? "disabled" : "default"} />
      </PhoneScroll>

      <Divider />
      <div style={{ display: "grid", gap: "var(--space-md)", padding: "var(--space-md)" }}>
        <Checkbox label="Save settings to file" checked={saveToFile} onCheckedChange={setSaveToFile} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button flavour="text" size="medium" shape="rounded" onClick={() => setS(applied)}>Cancel</Button>
          {/* Apply waits until something has changed. */}
          <Button flavour="primary" size="medium" shape="rounded" disabled={!dirty} onClick={() => setApplied(s)}>Apply</Button>
        </div>
      </div>
    </Phone>
  );
}

const meta: Meta<typeof XpsuPage> = {
  title: "Experimental/Pages/XPSU",
  component: XpsuPage,
  parameters: {
    layout: "centered",
    docs: { description: { component: "**Experimental mock page.** XPSU's Wireless Settings on a 390 × 844 handheld, composed from library components: System Banner, Screen Header Bar, Switch, Input, Select, Divider, Checkbox and Button. The banner is frozen above everything; turning Wireless off makes it a warning with a Turn on action. Wireless off disables every setting under it; Client ID off hides the ID fields; Apply turns on once something changes and Cancel puts the last applied values back." } },
  },
};
export default meta;
type Story = StoryObj<typeof XpsuPage>;

export const Light: Story = {};

export const Dark: Story = { args: { theme: "mode-dark" } };
