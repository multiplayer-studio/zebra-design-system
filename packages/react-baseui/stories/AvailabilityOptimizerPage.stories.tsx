import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  BottomSheet, Button, Card, CardBody, CardImage, Dialog, Divider, GridMenuItem, Icon, IconButton, Input,
  ProgressCircle, ScreenHeaderBar, SegmentedControl, Snackbar, StatusLabel, TopAppBar,
  type IconName, type StatusLabelStatus,
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


/* A mock mobile flow, not a component: the Companion skill "Availability
   Optimizer" from the Patterns file's Rebuild section (Companion Skill page).
   A store associate scans a shelf, the companion finds gaps, and each gap
   opens a detail screen with the action to take. Composed only from the
   library on the Companion extension; camera screens are scoped to dark.
   Layout is inline styles on semantic tokens.

   Departures from the Figma rebuild:
   - The device status bar is drawn here on tokens: the library has none.
   - Headers are Screen Header Bars. Top App Bar's leading glyph is fixed per
     type, so the summary's close sits in the trailing action slot.
   - The shutter is drawn here on tokens: the library has no camera button.
   - The camera hint is a Status Label, not an Assist Chip, because it is not
     a control. */

const SHELF = new URL("./assets/availability/shelf.jpg", import.meta.url).href;
const SALMON = new URL("./assets/availability/salmon.jpg", import.meta.url).href;
const COLD_BREW = new URL("./assets/availability/cold-brew.jpg", import.meta.url).href;

type Text = "body-xsmall" | "body-small" | "body-medium" | "label-medium" | "label-large" | "title-medium" | "title-large" | "heading-large";
const text = (style: Text, color = "var(--foreground-primary)"): React.CSSProperties => ({
  margin: 0, color,
  fontFamily: `var(--${style}-font-family), system-ui, sans-serif`,
  fontSize: `var(--${style}-font-size)`,
  fontWeight: `var(--${style}-font-weight)` as React.CSSProperties["fontWeight"],
  lineHeight: `var(--${style}-line-height)`,
  letterSpacing: `var(--${style}-letter-spacing)`,
});

type Action = "Restock" | "Recount" | "Out of stock" | "On order";
const ACTION_STATUS: Record<Action, StatusLabelStatus> = { Restock: "warning", Recount: "warning", "Out of stock": "negative", "On order": "info" };

interface Item {
  id: string; name: string; sku: string; units: number; action: Action;
  /** Where the gap sits on the shelf photo, in % of the photo. */
  at: { left: number; top: number };
  details: [string, string][];
}

const ITEMS: Item[] = [
  { id: "salmon", name: "Fresh Atlantic Salmon Fillet", sku: "SKU-FISH-8821", units: 20, action: "Restock", at: { left: 18, top: 22 },
    details: [["Location", "Aisle 4, Shelf 1"], ["On hand", "0"], ["In back room", "24"], ["Last stocked", "Dec 18, 2024 · 8:30 AM"], ["Supplier", "Ocean Fresh Seafood Co."]] },
  { id: "choc", name: "Farmhouse Chocolate Chip Cookies (12 qty)", sku: "SKU-COOKIE-7893", units: 6, action: "Recount", at: { left: 3, top: 44 },
    details: [["Location", "Aisle 4, Shelf 2"], ["System count", "6"], ["Seen on shelf", "0"], ["Last counted", "Dec 16, 2024 · 6:10 PM"], ["Supplier", "Farmhouse Bakery"]] },
  { id: "oat", name: "Soft Baked Oatmeal Cookies (8 ct)", sku: "SKU-COOKIE-6642", units: 8, action: "On order", at: { left: 31, top: 44 },
    details: [["Location", "Aisle 4, Shelf 2"], ["On hand", "0"], ["Last stocked", "Dec 18, 2024 · 8:30 AM"], ["Expected restock", "Dec 20, 2024 · 6:00 AM"], ["Supplier", "Farmhouse Bakery"]] },
  { id: "chips", name: "Kettle Sea Salt Chips (5 oz)", sku: "SKU-SNACK-2210", units: 12, action: "Out of stock", at: { left: 62, top: 66 },
    details: [["Location", "Aisle 4, Shelf 4"], ["On hand", "0"], ["Store-wide", "0"], ["Next delivery", "Not scheduled"], ["Supplier", "Coastal Snacks"]] },
];

const STAGES = ["Finding gaps on the shelf", "Checking store stock", "Checking product catalog"];

type Step = "entry" | "camera" | "processing" | "analysing" | "summary" | "detail";
type Hint = "steady" | "fit" | "ready";
const HINT_TEXT: Record<Hint, string> = { steady: "Hold Steady", fit: "Fit the shelf within the frame", ready: "Take Photo" };

/* Type the Figma screens set on library parts whose own style differs, matched here by class:
   - Headers: Figma's Top App Bar title is label/medium; Screen Header Bar draws title/large.
   - Summary sheet: Figma hides the sheet header and sets the heading in title/large; Bottom Sheet's title is title/medium.
   - Camera hint: a contextual Snackbar with Show Icon off and hugging its message; React's Snackbar always
     draws the flavour icon and fills its container. */
const PAGE_CSS = [
  ".ao-dialog{--zds-dialog-width:100%}",
  "@media (prefers-reduced-motion:reduce){.ao-sheet-list{transition:none!important}}",
  ".zds-screen-header-bar__title{font:var(--text-label-medium);letter-spacing:var(--label-medium-letter-spacing)}",
  ".ao-summary .zds-bottom-sheet__title{font:var(--text-title-large);letter-spacing:var(--title-large-letter-spacing)}",
  ".ao-hint .zds-snackbar__lead{display:none!important}.ao-hint .zds-snackbar{inline-size:auto}",
].join("");

/** The phone: a fixed 390 × 844 frame. Overlays (sheet, dialog, snackbar) position against it. */
const Phone = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className} style={{
    position: "relative", inlineSize: 390, blockSize: 844, display: "flex", flexDirection: "column", overflow: "hidden",
    background: "var(--surface-page)", color: "var(--foreground-primary)",
    border: "var(--stroke-thin) solid var(--border-default)", borderRadius: "var(--radius-xl)",
  }}>{children}<style>{PAGE_CSS}</style></div>
);

/* Figma type with no Zebra text style to match, kept at Figma's exact values:
   - The Zebra Status Bar's clock is 12 Regular at auto line height (body/xsmall is 10 at mobile size).
   - The future state's device bar sets "12:30" and "100%" in 14 Bold over 16.
   - "< View conversation" is 12 Medium Italic over 14 with a gradient fill. */
const STATUS_TYPE = {
  zebra: { fontFamily: "var(--body-small-font-family), system-ui, sans-serif", fontSize: 12, fontWeight: 400, lineHeight: "normal" },
  device: { fontFamily: "var(--body-small-font-family), system-ui, sans-serif", fontSize: 14, fontWeight: 700, lineHeight: "16px" },
} satisfies Record<string, React.CSSProperties>;

/** The device status bar, drawn on tokens (the library has none). Figma: time and status glyphs in
    foreground/primary, on the header's fill. `onTop` keeps it above a scrim, as on 4.3. `type` picks the
    Zebra Status Bar's clock or the future state's device bar, which also shows the battery percentage. */
const StatusBar = ({ time = "12:03", onTop = false, type = "zebra" }: { time?: string; onTop?: boolean; type?: keyof typeof STATUS_TYPE }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between", blockSize: 32, boxSizing: "border-box",
    paddingInline: "var(--space-lg)", marginBlockStart: "var(--space-lg)", marginBlockEnd: "var(--space-lg)", color: "var(--foreground-primary)",
    ...(onTop ? { position: "relative", zIndex: 3 } : null),
  }}>
    <span style={STATUS_TYPE[type]}>{time}</span>
    {/* Only the future state's device bar draws the camera cut-out; the Zebra Status Bar has none. */}
    {type === "device" ? <span aria-hidden style={{ inlineSize: 24, blockSize: 24, borderRadius: "50%", background: "var(--foreground-primary)" }} /> : null}
    <span role="img" aria-label="Wi-Fi, full signal, battery full" style={{ display: "inline-flex", gap: "var(--space-2xs)" }}>
      <Icon name="wifi" size="small" /><Icon name="cellular-signal" size="small" /><Icon name="battery" size="small" />
      {type === "device" ? <span style={STATUS_TYPE.device}>100%</span> : null}
    </span>
  </div>
);

/** Status bar and header share one fill, as Figma's Screen Header does: surface/page on the light
    screens (entry, summary, detail), surface/section on the dark camera screens, none on the future state. */
const TOP_FILL = { page: "var(--surface-page)", section: "var(--surface-section)", none: "transparent" } as const;
const Top = ({ children, statusOnTop, time, fill = "page", statusType }: { children: React.ReactNode; statusOnTop?: boolean; time?: string; fill?: keyof typeof TOP_FILL; statusType?: keyof typeof STATUS_TYPE }) => (
  <div style={{ flex: "none", background: TOP_FILL[fill] }}>
    <StatusBar onTop={statusOnTop} time={time} type={statusType} />
    {children}
  </div>
);

const Scrim = ({ onClick, children }: { onClick?: () => void; children?: React.ReactNode }) => (
  <div onClick={(e) => { if (e.target === e.currentTarget) onClick?.(); }}
    style={{ position: "absolute", inset: 0, zIndex: 2, background: "var(--overlay-scrim)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
    {children}
  </div>
);

/** The shelf photo, framed. `tone` colours the frame: neutral while lining up, success once ready. */
const Viewfinder = ({ tone, children }: { tone: "neutral" | "success" | "none"; children?: React.ReactNode }) => (
  <div style={{ position: "relative", flex: 1, minBlockSize: 0, overflow: "hidden", background: `center / cover no-repeat url(${SHELF})` }}>
    {tone !== "none" ? (
      <div style={{
        position: "absolute", inset: "var(--space-sm) var(--space-lg)", borderRadius: "var(--radius-xl)",
        border: `var(--stroke-thick, 3px) solid ${tone === "success" ? "var(--border-success)" : "var(--foreground-primary)"}`,
        boxShadow: "0 0 0 999px color-mix(in srgb, var(--surface-page) 45%, transparent)",
      }} />
    ) : null}
    {children}
  </div>
);

/** Capture button, drawn on tokens. Ready shows the success ring; processing holds a Progress Circle. */
const Shutter = ({ state, onPress }: { state: "idle" | "ready" | "processing"; onPress?: () => void }) => (
  <button type="button" onClick={onPress} disabled={state !== "ready"} aria-label={state === "processing" ? "Processing photo" : "Take photo"}
    style={{
      inlineSize: 80, blockSize: 80, borderRadius: "50%", display: "grid", placeItems: "center", padding: 0, cursor: state === "ready" ? "pointer" : "default",
      background: "transparent", border: `4px solid ${state === "ready" ? "var(--border-success)" : "var(--border-strong)"}`,
    }}>
    {state === "processing"
      ? <ProgressCircle value={null} size="large" label="Processing photo" />
      : <span style={{ inlineSize: 64, blockSize: 64, borderRadius: "50%", background: state === "ready" ? "var(--foreground-primary)" : "var(--surface-subtle)" }} />}
  </button>
);

/** One result row: status glyph, product and units, opening the item's detail. */
const ProductRow = ({ item, done, onOpen }: { item: Item; done: boolean; onOpen: () => void }) => (
  <button type="button" onClick={onOpen} style={{
    display: "flex", alignItems: "flex-start", gap: "var(--space-lg)", inlineSize: "100%", textAlign: "start", cursor: "pointer",
    padding: "var(--space-md) var(--space-sm)", border: 0, borderRadius: "var(--radius-md)", background: "transparent", color: "inherit",
  }}>
    <span style={{ color: done ? "var(--foreground-success)" : "var(--foreground-error)", display: "inline-flex" }}>
      <Icon name={done ? "check-circle" : "alert"} size="medium" label={done ? "Updated" : "Needs update"} />
    </span>
    <span style={{ flex: 1, display: "grid", gap: 2 }}>
      <span style={text("label-medium")}>{item.name}</span>
      <span style={text("body-xsmall", "var(--foreground-secondary)")}>{item.sku} • {item.units} units</span>
    </span>
    <Icon name="chevron-right" size="medium" />
  </button>
);

/** A gap outlined on the photo, with a status badge on its corner. */
const ShelfMarker = ({ item, done }: { item: Item; done: boolean }) => (
  <span aria-hidden style={{
    position: "absolute", left: `${item.at.left}%`, top: `${item.at.top}%`, inlineSize: 52, blockSize: 52, borderRadius: "var(--radius-sm)",
    border: `2px solid ${done ? "var(--border-success)" : "var(--border-error)"}`,
    background: `color-mix(in srgb, ${done ? "var(--feedback-success-background-strong)" : "var(--feedback-error-background-strong)"} 15%, transparent)`,
  }}>
    <span style={{
      position: "absolute", insetInlineEnd: -12, insetBlockStart: -12, inlineSize: 24, blockSize: 24, borderRadius: "50%", display: "grid", placeItems: "center",
      background: done ? "var(--border-success)" : "var(--border-error)", color: "var(--surface-page)",
    }}><Icon name={done ? "check-circle" : "alert"} size="small" /></span>
  </span>
);

const Pinned = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: "var(--space-md)", padding: "var(--space-md) var(--space-lg) var(--space-xl)" }}>{children}</div>
);

const TOOLS: { label: string; icon: IconName }[] = [
  { label: "Mute", icon: "microphone" }, { label: "Timer", icon: "timer" }, { label: "Grid", icon: "grid-on" },
  { label: "Ruler", icon: "straighten" }, { label: "Lighting", icon: "filter" }, { label: "Dimension", icon: "crop" },
];

export interface AvailabilityOptimizerProps {
  /** Shelf ID already filled in, as if scanned. */
  shelfId?: string;
  /** Run the scan with gaps found, or on a shelf with nothing missing. */
  scenario?: "gaps" | "clear";
  /** Open on a step (for screenshots). Each step still runs from there. */
  initialStep?: Step;
}

function AvailabilityOptimizer({ shelfId: initialShelf = "", scenario = "gaps", initialStep = "entry" }: AvailabilityOptimizerProps) {
  const [step, setStep] = React.useState<Step>(initialStep);
  const [shelfId, setShelfId] = React.useState(initialShelf);
  const [hint, setHint] = React.useState<Hint>("steady");
  const [tools, setTools] = React.useState(false);
  const [activeTools, setActiveTools] = React.useState<string[]>([]);
  const [flash, setFlash] = React.useState(false);
  const [stage, setStage] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [resolved, setResolved] = React.useState<string[]>([]);
  const [detail, setDetail] = React.useState<Item | null>(null);
  const [leaving, setLeaving] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const items = scenario === "clear" ? [] : ITEMS;
  const pending = items.filter((i) => !resolved.includes(i.id));

  const restart = (keepShelf = false) => {
    setStep("entry"); setHint("steady"); setStage(0); setExpanded(false); setResolved([]); setDetail(null); setLeaving(false); setTools(false);
    if (!keepShelf) setShelfId("");
  };

  // Camera guidance: hold steady, then fit the shelf, then ready to shoot.
  React.useEffect(() => {
    if (step !== "camera" || hint === "ready" || tools) return;
    const t = setTimeout(() => setHint(hint === "steady" ? "fit" : "ready"), 1400);
    return () => clearTimeout(t);
  }, [step, hint, tools]);

  // Processing the photo, then the companion's three checks, then the summary.
  React.useEffect(() => {
    if (step === "processing") { const t = setTimeout(() => setStep("analysing"), 1200); return () => clearTimeout(t); }
    if (step !== "analysing") return;
    const t = setTimeout(() => (stage < STAGES.length - 1 ? setStage(stage + 1) : setStep("summary")), 1300);
    return () => clearTimeout(t);
  }, [step, stage]);

  React.useEffect(() => { if (leaving) cancelRef.current?.focus(); }, [leaving]);

  // The sheet's handle expands and collapses it: tap, drag up or down, or Enter / Space when focused.
  // Bottom Sheet draws the handle as decoration, so the page gives it the button role here.
  const sheetRef = React.useRef<HTMLElement>(null);
  const canExpand = step === "summary" && items.length > 0;
  React.useEffect(() => {
    const handle = sheetRef.current?.querySelector<HTMLElement>(".zds-bottom-sheet__handle");
    if (!handle || !canExpand) return;
    Object.assign(handle, { role: "button", tabIndex: 0 });
    handle.setAttribute("aria-label", expanded ? "Collapse summary" : "Expand summary");
    handle.setAttribute("aria-expanded", String(expanded));
    handle.style.cursor = "grab"; handle.style.touchAction = "none";
    let startY: number | null = null;
    const down = (e: PointerEvent) => { startY = e.clientY; };
    const up = (e: PointerEvent) => {
      if (startY === null) return;
      const dy = e.clientY - startY; startY = null;
      setExpanded(Math.abs(dy) < 12 ? !expanded : dy < 0);
    };
    const key = (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(!expanded); } };
    handle.addEventListener("pointerdown", down); window.addEventListener("pointerup", up); handle.addEventListener("keydown", key);
    return () => { handle.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); handle.removeEventListener("keydown", key); };
  }, [canExpand, expanded]);

  const closeAction = <IconButton flavour="subtle" size="small" shape="sharp" icon="close" label="Leave availability check" onClick={() => setLeaving(true)} />;

  /* ---------- 1 · Entry ---------- */
  if (step === "entry") {
    const ready = shelfId.trim().length > 0;
    return (
      <Phone className="ext-companion">
        <Top><ScreenHeaderBar title="Availability check" showLeadingIcon={false} action={<IconButton flavour="subtle" size="small" shape="sharp" icon="settings" label="Settings" />} /></Top>
        <main style={{ flex: 1, display: "grid", alignContent: "start", justifyItems: "center", gap: "var(--space-xl)", padding: "var(--space-3xl) var(--space-lg) 0" }}>
          <span style={{ inlineSize: 112, blockSize: 112, borderRadius: "50%", display: "grid", placeItems: "center", background: "var(--feedback-info-background-subtle)", color: "var(--foreground-info)" }}>
            <Icon name="planogram" size="large" style={{ fontSize: 64 }} />
          </span>
          <h2 style={text("heading-large")}>Shelf Ready</h2>
          <form style={{ inlineSize: "100%" }} onSubmit={(e) => { e.preventDefault(); if (ready) setStep("camera"); }}>
            <Input block label="Shelf ID" shape="rounded" placeholder="Scan or Enter Shelf ID" trailingIcon="qr-code" value={shelfId} onValueChange={setShelfId}
              hint="Point scanner at shelf barcode to populate." hintIcon={false} />
          </form>
        </main>
        <Pinned>
          <Button flavour="primary" size="large" shape="full" leadingIcon="camera" disabled={!ready} onClick={() => setStep("camera")}>Capture shelf</Button>
        </Pinned>
      </Phone>
    );
  }

  /* ---------- 2–3 · Camera, processing, analysing (dark) ---------- */
  if (step === "camera" || step === "processing" || step === "analysing") {
    const shooting = step === "camera";
    return (
      <Phone className="ext-companion mode-dark">
        <Top fill="section"><ScreenHeaderBar title={shooting ? "Capture shelf" : "Checking shelf"} onBack={() => restart(true)}
          action={<><IconButton flavour="subtle" size="small" shape="sharp" icon="help" label="Help" onClick={() => setToast("Stand back until the whole shelf fits in the frame.")} />
            <IconButton flavour="subtle" size="small" shape="sharp" icon="apps" label="Apps" onClick={() => setTools(true)} disabled={!shooting} /></>} /></Top>
        <Viewfinder tone={step === "analysing" ? "none" : hint === "ready" && shooting ? "success" : "neutral"}>
          {shooting ? (
            <span style={{ position: "absolute", insetBlockEnd: "var(--space-xl)", insetInline: 0, display: "flex", justifyContent: "center" }}>
              <span className="ao-hint" aria-live="polite">
                <Snackbar inline open variant="contextual" flavour={hint === "ready" ? "positive" : "warning"} showClose={false}>{HINT_TEXT[hint]}</Snackbar>
              </span>
            </span>
          ) : null}
          {step === "analysing" ? <span className="ao-scan" style={{ position: "absolute", display: "block", insetInline: "var(--space-sm)", insetBlockStart: "8%", blockSize: 4, zIndex: 1, borderRadius: 2, background: "var(--feedback-warning-background-strong)" }} /> : null}
        </Viewfinder>
        <footer style={{ blockSize: 200, flex: "none", display: "grid", justifyItems: "center", alignContent: "center", gap: "var(--space-lg)", background: "var(--surface-page)" }}>
          {step === "analysing" ? (
            <div role="status" style={{ inlineSize: 338, display: "flex", alignItems: "center", gap: "var(--space-lg)" }}>
              <ProgressCircle value={null} size="medium" label="Checking the shelf" />
              <span style={{ flex: 1, display: "grid", gap: 2 }}>
                <span style={text("label-large")}>Pondering...</span>
                <span style={text("body-small", "var(--foreground-secondary)")}>{STAGES[stage]}</span>
              </span>
              <Button flavour="outline-subtle" size="medium" shape="full" onClick={() => { setStep("camera"); setStage(0); setHint("steady"); }}>Cancel</Button>
            </div>
          ) : (
            <>
              <Shutter state={step === "processing" ? "processing" : hint === "ready" ? "ready" : "idle"} onPress={() => setStep("processing")} />
              {shooting ? (
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)" }}>
                  <IconButton flavour="outline-subtle" size="large" shape="full" icon="more-horizontal" label="More camera actions" onClick={() => setTools(true)} />
                  <SegmentedControl aria-label="Capture mode" flavour="text-only" defaultValue="still" options={[{ value: "still", label: "Still" }, { value: "live", label: "Live" }]} />
                  <IconButton flavour="outline-subtle" size="large" shape="full" icon={flash ? "flash-on" : "flash-off"} label={flash ? "Flash on" : "Flash off"} aria-pressed={flash} onClick={() => setFlash(!flash)} />
                </div>
              ) : null}
            </>
          )}
        </footer>
        {tools ? (
          <Scrim onClick={() => setTools(false)}>
            <BottomSheet contentType="grid" heading="More actions" headerIcon="close" leadingLabel="Close" onLeadingClick={() => setTools(false)}
              onKeyDown={(e) => { if (e.key === "Escape") setTools(false); }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-md)", padding: "0 var(--space-lg) var(--space-xl)" }}>
                {TOOLS.map((t) => {
                  const on = activeTools.includes(t.label);
                  return <GridMenuItem key={t.label} label={t.label} icon={t.icon} active={on} aria-pressed={on}
                    onClick={() => setActiveTools(on ? activeTools.filter((x) => x !== t.label) : [...activeTools, t.label])} />;
                })}
              </div>
            </BottomSheet>
          </Scrim>
        ) : null}
        {toast ? <div style={{ position: "absolute", insetInline: "var(--space-lg)", insetBlockEnd: 216, zIndex: 3 }}>
          <Snackbar inline open variant="contextual" flavour="info" duration={4000} onClose={() => setToast(null)}>{toast}</Snackbar></div> : null}
        <style>{`.ao-scan{animation:ao-scan 1.6s ease-in-out infinite alternate}@keyframes ao-scan{from{top:8%}to{top:88%}}@media (prefers-reduced-motion:reduce){.ao-scan{animation:none;top:50%}}`}</style>
      </Phone>
    );
  }

  /* ---------- 5 · Detail ---------- */
  if (step === "detail" && detail) {
    return (
      <Phone className="ext-companion">
        <Top><ScreenHeaderBar title={detail.action} onBack={() => setStep("summary")} /></Top>
        <Scrolled tag="main" style={{ display: "grid", alignContent: "start", gap: "var(--space-md)", padding: "0 var(--space-lg)" }}>
          <span><StatusLabel status={ACTION_STATUS[detail.action]} leading="none">{detail.action}</StatusLabel></span>
          <span style={{ display: "grid", gap: 2 }}>
            <span style={text("label-medium", "var(--foreground-secondary)")}>{detail.sku}</span>
            <h2 style={text("title-large")}>{detail.name}</h2>
          </span>
          <img src={SALMON} alt="" style={{ inlineSize: "100%", blockSize: 200, objectFit: "cover", borderRadius: "var(--radius-xl)" }} />
          <h3 style={{ ...text("label-medium"), marginBlockStart: "var(--space-sm)" }}>Details</h3>
          <dl style={{ margin: 0 }}>
            {detail.details.map(([k, v]) => (
              <React.Fragment key={k}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-lg)", padding: "var(--space-md) 0" }}>
                  <dt style={text("body-small", "var(--foreground-secondary)")}>{k}</dt>
                  <dd style={{ ...text("label-medium"), margin: 0, textAlign: "end" }}>{v}</dd>
                </div>
                <Divider />
              </React.Fragment>
            ))}
          </dl>
        </Scrolled>
        <Pinned>
          <Button flavour="primary" size="large" shape="full" onClick={() => { setResolved([...new Set([...resolved, detail.id])]); setStep("summary"); setExpanded(true); }}>Done</Button>
        </Pinned>
      </Phone>
    );
  }

  /* ---------- 4 · Summary ---------- */
  const complete = items.length > 0 && pending.length === 0;
  return (
    <Phone className="ext-companion">
      <Top statusOnTop={leaving}><ScreenHeaderBar title="Availability check" showLeadingIcon={false} action={closeAction} /></Top>
      <div style={{ position: "relative", flex: 1, minBlockSize: 0, display: "flex", flexDirection: "column" }}>
        <Viewfinder tone="none">
          {items.map((i) => <ShelfMarker key={i.id} item={i} done={resolved.includes(i.id)} />)}
        </Viewfinder>
        {/* Figma 4.1–4.6: a Bottom Sheet over the photo. Collapsed it shows the count; its handle expands it to the list (4.2). */}
        <BottomSheet ref={sheetRef} className="ao-summary" contentType="generic" showLeadingIcon={false}
          style={{ position: "absolute", insetInline: 0, insetBlockEnd: 0, maxBlockSize: "92%", overflow: "auto" }}
          heading={items.length === 0 ? "No missing products" : "Availability summary"}
          actions={complete ? (
            <div style={{ display: "grid", gap: "var(--space-md)", inlineSize: "100%" }}>
              <Button flavour="primary" size="large" shape="full" onClick={() => { setToast("Shelf check complete"); restart(); }}>Complete check</Button>
              <Button flavour="outline-subtle" size="large" shape="full" onClick={() => { restart(); setStep("camera"); }}>Start new shelf</Button>
            </div>
          ) : (
            <Button flavour="primary" size="large" shape="full" style={{ inlineSize: "100%" }}
              onClick={() => (items.length === 0 ? restart() : setLeaving(true))}>Done</Button>
          )}>
          <div style={{ display: "grid", gap: "var(--space-sm)", padding: "0 var(--space-lg)" }}>
            {items.length === 0 ? (
              <p style={{ ...text("title-medium", "var(--foreground-secondary)"), display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
                <span style={{ color: "var(--foreground-success)", display: "inline-flex" }}><Icon name="check-circle" size="small" /></span>
                Nothing to fix on this shelf. The record is saved.
              </p>
            ) : (
              <>
                <span style={text("title-medium", "var(--foreground-secondary)")}>{complete ? "Updates completed" : `Updates needed · ${pending.length}`}</span>
                {/* The list's row track animates 0fr ↔ 1fr on animations/smooth, so the sheet grows from its bottom edge. */}
                <div className="ao-sheet-list" data-expanded={expanded} inert={!expanded}
                  style={{ display: "grid", gridTemplateRows: expanded ? "1fr" : "0fr", transition: "grid-template-rows var(--animations-smooth)" }}>
                  <div style={{ minBlockSize: 0, overflow: "hidden" }}>
                    {items.map((i) => <ProductRow key={i.id} item={i} done={resolved.includes(i.id)} onOpen={() => { setDetail(i); setStep("detail"); }} />)}
                  </div>
                </div>
              </>
            )}
          </div>
        </BottomSheet>
      </div>
      {leaving ? (
        <Scrim>
          <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "var(--space-lg)" }} onKeyDown={(e) => { if (e.key === "Escape") setLeaving(false); }}>
            <Dialog inline className="ao-dialog" heading="Do you want to exit?" showFooter={false} showClose={false}>
              <p style={{ ...text("body-medium", "var(--foreground-secondary)"), marginBlockEnd: "var(--space-lg)" }}>Your results won’t be saved. You need to scan the shelf again to start over.</p>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-sm)" }}>
                <Button ref={cancelRef} flavour="outline-subtle" size="medium" shape="rounded" onClick={() => setLeaving(false)}>Cancel</Button>
                <Button flavour="primary" size="medium" shape="rounded" onClick={() => restart()}>Yes, Exit</Button>
              </div>
            </Dialog>
          </div>
        </Scrim>
      ) : null}
      {toast ? <div style={{ position: "absolute", insetInline: "var(--space-lg)", insetBlockEnd: "var(--space-xl)", zIndex: 3 }}>
        <Snackbar inline open variant="contextual" flavour="positive" duration={4000} onClose={() => setToast(null)}>{toast}</Snackbar></div> : null}
    </Phone>
  );
}

/** Future state: what the skill hands back to the Companion after a check. */
function CompanionHandoff() {
  return (
    <Phone className="ext-companion mode-dark ao-future">
      <Top time="12:30" fill="none" statusType="device"><TopAppBar type="default" pageTitle="Companion" leadingLabel="Menu" style={{ background: "transparent" }}
        trailing={<IconButton flavour="subtle" size="small" shape="rounded" icon="settings" label="Settings" />} /></Top>
      <Scrolled tag="main" style={{ display: "grid", alignContent: "start", gap: "var(--space-md)", padding: "var(--space-md) var(--space-lg)" }}>
        <button type="button" style={{
          justifySelf: "start", padding: 0, border: 0, background: "linear-gradient(90deg, var(--foreground-gradient-start), var(--foreground-gradient-end))",
          backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", cursor: "pointer",
          fontFamily: "var(--body-small-font-family), system-ui, sans-serif", fontSize: 12, fontWeight: 500, fontStyle: "italic", lineHeight: "14px",
        }}>&lt; View conversation</button>
        {["3 Replenishment tasks created", "Backorder: Spiced Pecan Cold Brew"].map((t) => (
          <Card key={t} shape="rounded" hasHeader={false} hasFooter={false}>
            <CardBody style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
              <span aria-hidden style={{ inlineSize: 8, blockSize: 8, borderRadius: "50%", background: "var(--interactive-primary-background-default)" }} />
              <span style={text("title-medium")}>{t}</span>
            </CardBody>
          </Card>
        ))}
        <Card shape="rounded" hasFooter={false} header={<span style={{ ...text("label-large"), display: "block", padding: "var(--space-lg) var(--space-lg) 0" }}>Why not try:</span>}>
          <CardBody style={{ display: "grid", gap: "var(--space-sm)" }}>
            <CardImage src={COLD_BREW} alt="Maple Walnut Woodland Cold Brew bottle" />
            <span style={text("label-large")}>Product title</span>
            <span style={text("body-small", "var(--foreground-secondary)")}>The Pegasus 40 is built for everyday road running with soft yet responsive cushioning.</span>
          </CardBody>
        </Card>
      </Scrolled>
      <footer style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", padding: "var(--space-md) var(--space-lg) var(--space-xl)" }}>
        <IconButton flavour="subtle" size="large" shape="full" icon="keyboard" label="Type a message" />
        <span style={{ flex: 1 }} />
        <IconButton flavour="contrast" size="large" shape="full" icon="close" label="Close" />
        <IconButton flavour="primary" size="large" shape="full" icon="microphone" label="Speak" />
      </footer>
      {/* Figma's bar shows no title; the heading stays for screen readers. */}
      <style>{".ao-future .zds-top-app-bar__title{position:absolute;inline-size:1px;block-size:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}"}</style>
    </Phone>
  );
}

const meta: Meta<typeof AvailabilityOptimizer> = {
  title: "Experimental/Pages/Availability Optimizer",
  component: AvailabilityOptimizer,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/xZIoVHphedpglTcxOBTTbX/Zebra-Design-System-Patterns?node-id=84-1429" },
    docs: { description: { component: "**Experimental mock flow.** The Companion skill that checks a shelf for gaps, on a 390 × 844 handheld with the Companion extension. Enter or scan a shelf ID, capture the shelf (the guidance snackbar runs Hold Steady → Fit the shelf → Take Photo; the apps and more buttons open More actions, help shows a tip), watch the companion check the photo, then drag or tap the summary sheet's handle to open the list and each gap: Restock, Recount, On order and Out of stock. Done on each marks it updated; when all are done, Complete check or Start new shelf. Close or Done with gaps left asks before leaving. Composed from Screen Header Bar, Input, Button, Icon Button, Status Label, Segmented Control, Progress Circle, Bottom Sheet, Grid Menu Item, Dialog, Divider, Snackbar, Card and Top App Bar." } },
  },
};
export default meta;
type Story = StoryObj<typeof AvailabilityOptimizer>;

/** The whole flow from an empty entry screen. */
export const Flow: Story = {};

/** Starts with the shelf ID filled in. */
export const EntryActive: Story = { args: { shelfId: "SHELF-111" } };

/** Edge case: the check finds nothing missing. */
export const NoMissingProducts: Story = { args: { shelfId: "SHELF-111", scenario: "clear", initialStep: "summary" } };

/** Opens on the results, with every gap still to update. */
export const Summary: Story = { args: { shelfId: "SHELF-111", initialStep: "summary" } };

/** Future state: the result handed back to the Companion. */
export const FutureState: Story = { render: () => <CompanionHandoff /> };
