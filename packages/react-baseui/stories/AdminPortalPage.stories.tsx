import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MapContainer, TileLayer, CircleMarker, Tooltip as MapTooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Tooltip as ChartTooltip,
} from "recharts";
import {
  AssistChip, Button, Card, CardBody, CardHeading, Divider, FilterChip, GlobalHeader, Icon, IconButton, MenuItem, NavigationHeader,
  NavigationRail, NavigationRailItem, Search, type IconName,
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


/* A mock admin dashboard, not a component. The frame is the library's own:
   Navigation Rail (with Navigation Header) down the side and Global Header
   across the top; every widget is a Card with a Card Heading, so titles,
   subheadings and tools share one inset. Layout is inline styles on tokens.
   The map is Leaflet on Esri's gray canvas basemap (light or dark with the
   theme); the charts are Recharts painted with the chart-series tokens.

   The whole dashboard fits the 1024px frame without scrolling. Tasks is a
   ranked bar list in one hue rather than a pie: four categories compare
   faster by length, and the four-hue pie failed the colour-vision checks
   (blue and purple merge for deutan readers). Card tools are neutral so the
   data, not the chrome, carries the colour.

   Type uses four roles and nothing else: title/medium for every title,
   heading/small for the one headline number, body/small for content, and
   body/xsmall for all secondary text (subheadings, legends, step names, chart
   axes, tooltips and the map). Numbers that line up use tabular figures. */

/* The charts and the map draw their own text; this pulls it onto body/xsmall. */
const PAGE_CSS = [
  ".ap-chart .recharts-cartesian-axis-tick text{font:var(--text-body-xsmall);letter-spacing:var(--body-xsmall-letter-spacing);font-variant-numeric:tabular-nums}",
  ".ap-map .leaflet-container,.ap-map .leaflet-tooltip,.ap-map .leaflet-control-attribution{font:var(--text-body-xsmall);letter-spacing:var(--body-xsmall-letter-spacing)}",
  // Leaflet's zoom +/− are 22px bold Helvetica; title/large puts them in the system's family and weight.
  ".ap-map .leaflet-control-zoom a{font:var(--text-title-large)}",
  ".ap-map .leaflet-tooltip{color:var(--foreground-primary);background:var(--surface-overlay);border:var(--stroke-thin) solid var(--border-default);border-radius:var(--radius-sm);box-shadow:none}",
].join("");

const type = (role: string) => ({
  fontFamily: `var(--${role}-font-family), system-ui, sans-serif`,
  fontSize: `var(--${role}-font-size)`,
  fontWeight: `var(--${role}-font-weight)`,
  lineHeight: `var(--${role}-line-height)`,
  letterSpacing: `var(--${role}-letter-spacing)`,
});

/** True when the nearest themed surface is dark, so the map can pick its basemap. */
function useIsDark(ref: React.RefObject<HTMLElement | null>) {
  const [dark, setDark] = React.useState(false);
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const rgb = getComputedStyle(ref.current).backgroundColor.match(/\d+/g)?.map(Number) ?? [255, 255, 255];
    setDark((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 < 128);
  });
  return dark;
}

/* ---- frame: navigation rail and screen header ------------------------------ */

/* Labels fit the wide rail's fixed 200px (spec): "Permission Templates" and
   "System Notifications" are shortened rather than truncated. */
const NAV: { label: string; icon: IconName }[] = [
  { label: "Permissions", icon: "person-admin" },
  { label: "Hierarchy", icon: "share" },
  { label: "Platform License", icon: "key-attach" },
  { label: "Sites", icon: "building" },
  { label: "Departments", icon: "store" },
  { label: "Roles", icon: "person-assign" },
  { label: "Users", icon: "person" },
  { label: "Groups", icon: "groups" },
  { label: "Notifications", icon: "important-notification" },
  { label: "Devices", icon: "phone-android" },
  { label: "Translations", icon: "chat-bubble-outline" },
  { label: "File Library", icon: "folder" },
];

/** The tenant's rail: ACME in the header, the admin areas, and the rail's own collapse toggle. */
function AdminRail({ active, onSelect, light, expanded, onExpandedChange }: { active: string; onSelect: (label: string) => void; light: boolean; expanded: boolean; onExpandedChange: (expanded: boolean) => void }) {
  return (
    // The rail locks to a mode (dark, or light with `inverse`); following the page means passing `inverse` on a light page.
    <NavigationRail navLabel="Admin" shape="rounded" inverse={light} expanded={expanded} onExpandedChange={onExpandedChange}
      header={<NavigationHeader type="avatar" heading="ACME" avatarInitials="A" actionLabel="Tenant settings" />}>
      {NAV.map((n) => (
        <NavigationRailItem key={n.label} label={n.label} icon={n.icon} selected={active === n.label}
          href={`#${n.label.toLowerCase().replace(/\s+/g, "-")}`} onClick={(e: React.MouseEvent) => { e.preventDefault(); onSelect(n.label); }} />
      ))}
    </NavigationRail>
  );
}

/** The product bar, frozen in dark: identity, Open Wizard, search, the global tools and the account. */
const AdminHeader = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <GlobalHeader rounded platformName="Admin" username="firstname.lastname@zebra.com" initials="FL" menuLabel="Toggle navigation" onMenuClick={onMenuClick}
    menuItems menuItemsSlot={<Button flavour="text" size="medium" leadingIcon="open-in-new-window">Open Wizard</Button>}
    actionMenu actionMenuSlot={<>
      <IconButton flavour="subtle" size="medium" icon="important-notification" label="Notifications" />
      <IconButton flavour="subtle" size="medium" icon="help" label="Help" />
    </>}
    accountMenu={<>
      <MenuItem leadingIcon="settings">Settings</MenuItem>
      <MenuItem leadingIcon="log-out">Sign out</MenuItem>
    </>} />
);

/* ---- widgets ----------------------------------------------------------------- */

const CardTools = ({ title, expanded, onExpand }: { title: string; expanded: boolean; onExpand: () => void }) => (
  <>
    <IconButton flavour="subtle" size="small" shape="rounded" icon="more-vertical" label={`${title} options`} />
    <IconButton flavour="subtle" size="small" shape="rounded" icon={expanded ? "full-screen-exit" : "full-screen"} label={expanded ? `Shrink ${title}` : `Expand ${title}`}
      aria-pressed={expanded} onClick={onExpand} />
  </>
);

/** The subheading in body/xsmall, space/xs below the title, on one line with its info mark, so every card's heading is the same height. */
const Sub = ({ children }: { children: React.ReactNode }) => (
  <span style={{ ...type("body-xsmall"), display: "flex", alignItems: "center", gap: "var(--space-3xs)", whiteSpace: "nowrap", marginBlockStart: "var(--space-xs)" }}>
    <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{children}</span><Icon name="info" size="xsmall" />
  </span>
);

/**
 * A dashboard card: Card Heading (title, one-line subheading, options and
 * expand) over a Card Body, so title, subheading, tools and content all sit
 * on the heading's inset. `fill` lets the body take the card's spare height.
 * Expanded, the card spans the grid.
 */
function Widget({ title, subheading, expanded, onExpand, children, fill, style }: {
  title: string; subheading: React.ReactNode; expanded: boolean; onExpand: () => void;
  children: React.ReactNode; fill?: boolean; style?: React.CSSProperties;
}) {
  return (
    <Card shape="rounded" hasFooter={false}
      style={{ ...SECTION, gridColumn: expanded ? "1 / -1" : undefined, minInlineSize: 0, ...(fill ? { display: "grid", gridTemplateRows: "auto 1fr" } : null), ...style }}
      header={<CardHeading heading={title} subheading={<Sub>{subheading}</Sub>} trailingContent={<CardTools title={title} expanded={expanded} onExpand={onExpand} />} />}>
      {/* The heading's bottom inset already separates it from the body. */}
      <CardBody style={{ paddingBlockStart: 0, ...(fill ? { blockSize: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" } : null) }}>
        {children}
      </CardBody>
    </Card>
  );
}

/** Cards sit on the section surface: re-pointing the token the Card paints with keeps header, body and contents in step. */
const SECTION = { "--surface-card": "var(--surface-section)" } as React.CSSProperties;

const Legend = ({ swatch, children }: { swatch: React.CSSProperties; children: React.ReactNode }) => (
  <span style={{ ...type("body-xsmall"), display: "inline-flex", alignItems: "center", gap: "var(--space-xs)", color: "var(--foreground-secondary)" }}>
    <span aria-hidden="true" style={swatch} />{children}
  </span>
);

const SITES: { name: string; at: [number, number]; volume: number; priority: number }[] = [
  { name: "Beijing", at: [39.9, 116.4], volume: 34, priority: 0.9 },
  { name: "Tianjin", at: [39.1, 117.2], volume: 22, priority: 0.7 },
  { name: "Shenyang", at: [41.8, 123.4], volume: 14, priority: 0.5 },
  { name: "Harbin", at: [45.8, 126.6], volume: 9, priority: 0.4 },
  { name: "Seoul", at: [37.6, 127.0], volume: 12, priority: 0.6 },
  { name: "Vladivostok", at: [43.1, 131.9], volume: 18, priority: 0.3 },
  { name: "Xi'an", at: [34.3, 108.9], volume: 24, priority: 0.8 },
  { name: "Lanzhou", at: [36.1, 103.8], volume: 16, priority: 0.5 },
  { name: "Chengdu", at: [30.7, 104.1], volume: 19, priority: 0.6 },
  { name: "Wuhan", at: [30.6, 114.3], volume: 10, priority: 0.4 },
  { name: "Shanghai", at: [31.2, 121.5], volume: 20, priority: 0.7 },
  { name: "Ulaanbaatar", at: [47.9, 106.9], volume: 8, priority: 0.2 },
  { name: "Urumqi", at: [43.8, 87.6], volume: 13, priority: 0.4 },
  { name: "Kunming", at: [25.0, 102.7], volume: 7, priority: 0.3 },
  { name: "Dhaka", at: [23.8, 90.4], volume: 6, priority: 0.3 },
  { name: "Hanoi", at: [21.0, 105.8], volume: 6, priority: 0.2 },
  { name: "Bengaluru", at: [12.97, 77.6], volume: 21, priority: 0.6 },
  { name: "Mumbai", at: [19.1, 72.9], volume: 9, priority: 0.4 },
];

/** Flies the map to the site named in the search. */
function FlyTo({ target }: { target: [number, number] | null }) {
  const map = useMap();
  React.useEffect(() => { if (target) map.flyTo(target, 6, { duration: 0.8 }); }, [map, target]);
  return null;
}

/** Keeps Leaflet's tiles in step when the card grows or shrinks (expand, collapse, rail toggle). */
function FitOnResize() {
  const map = useMap();
  React.useEffect(() => {
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(map.getContainer());
    return () => ro.disconnect();
  }, [map]);
  return null;
}

/** Esri's attribution, without Leaflet's own prefix and flag. */
function Attribution() {
  const map = useMap();
  React.useEffect(() => {
    const control = L.control.attribution({ prefix: false }).addTo(map);
    return () => { control.remove(); };
  }, [map]);
  return null;
}

function SiteActivity({ dark }: { dark: boolean }) {
  const [query, setQuery] = React.useState("");
  const [target, setTarget] = React.useState<[number, number] | null>(null);
  // Esri's label-free gray canvas, light or dark with the theme. No key needed.
  const tiles = `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${dark ? "Dark" : "Light"}_Gray_Base/MapServer/tile/{z}/{y}/{x}`;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", flexWrap: "wrap" }}>
        <Legend swatch={{ inlineSize: 12, blockSize: 12, borderRadius: "var(--radius-pill)", background: "var(--chart-series-4)", opacity: 0.5 }}>Volume of Tasks</Legend>
        <Legend swatch={{ inlineSize: 36, blockSize: 10, borderRadius: "var(--radius-xs)", background: "linear-gradient(to right, color-mix(in srgb, var(--chart-series-4) 30%, transparent), var(--chart-series-4))" }}>Priority</Legend>
        <span style={{ flex: 1 }} />
        <div style={{ flex: "none" }}>
          <Search size="small" shape="rounded" placeholder="Search location" value={query} onValueChange={setQuery}
            onSearch={(q) => { const s = SITES.find((x) => x.name.toLowerCase().startsWith(q.trim().toLowerCase())); setTarget(s ? s.at : null); }}
            onClear={() => { setQuery(""); setTarget([33, 108]); }} />
        </div>
      </div>
      <div className="ap-map" style={{ flex: 1, minBlockSize: 280, borderRadius: "var(--radius-sm)", overflow: "hidden", isolation: "isolate" }}>
        <MapContainer center={[33, 108]} zoom={3} minZoom={2} scrollWheelZoom attributionControl={false} style={{ blockSize: "100%", inlineSize: "100%", background: "var(--surface-page)" }}>
          <TileLayer key={tiles} url={tiles} attribution="Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors" />
          {SITES.map((s) => (
            <CircleMarker key={s.name} center={s.at} radius={4 + s.volume * 0.7}
              pathOptions={{ color: "var(--chart-series-4)", weight: 0, fillColor: "var(--chart-series-4)", fillOpacity: 0.25 + s.priority * 0.55 }}>
              <MapTooltip direction="top">{`${s.name}: ${s.volume * 10} tasks`}</MapTooltip>
            </CircleMarker>
          ))}
          <FlyTo target={target} />
          <FitOnResize />
          <Attribution />
        </MapContainer>
      </div>
    </div>
  );
}

const TASKS = [
  { name: "Disruptions", value: 996 },
  { name: "General", value: 820 },
  { name: "Outages", value: 622 },
  { name: "Alerts", value: 486 },
];
const TASK_TOTAL = TASKS.reduce((n, t) => n + t.value, 0);

// Axis text takes its size and family from PAGE_CSS (body/xsmall); only the colour is set here.
const axisTick = { fill: "var(--foreground-secondary)" };
const tooltipStyle = { background: "var(--surface-overlay)", border: "var(--stroke-thin) solid var(--border-default)", borderRadius: "var(--radius-sm)", color: "var(--foreground-primary)", font: "var(--text-body-xsmall)", fontVariantNumeric: "tabular-nums" };

/**
 * Tasks by category: the total, then one row per category, largest first, each
 * a bar on a track with its count and share. One hue, so the bars compare by
 * length alone; the names and values are text, never the bar's colour.
 */
function TasksBreakdown() {
  const max = TASKS[0].value;
  return (
    <div style={{ display: "grid", gap: "var(--space-sm)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-xs)" }}>
        <span style={{ ...type("heading-small"), fontVariantNumeric: "tabular-nums" }}>{TASK_TOTAL.toLocaleString()}</span>
        <span style={{ ...type("body-small"), color: "var(--foreground-secondary)" }}>tasks</span>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-xs)" }}>
        {TASKS.map((t) => (
          <li key={t.name} title={`${t.name}: ${t.value} tasks`} style={{ display: "grid", gap: "var(--space-2xs)" }}>
            <span style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-sm)" }}>
              <span style={type("body-small")}>{t.name}</span>
              <span style={{ ...type("body-small"), color: "var(--foreground-secondary)", fontVariantNumeric: "tabular-nums" }}>
                {t.value} · {Math.round((t.value / TASK_TOTAL) * 100)}%
              </span>
            </span>
            <span aria-hidden="true" style={{ blockSize: "var(--space-sm)", borderRadius: "var(--radius-xs)", background: "var(--surface-track)", overflow: "hidden" }}>
              <span style={{ display: "block", blockSize: "100%", inlineSize: `${(t.value / max) * 100}%`, borderRadius: "var(--radius-xs)", background: "var(--chart-series-1)" }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const OUTAGES = [{ d: "Device A", n: 28 }, { d: "Device B", n: 21 }, { d: "Device C", n: 17 }, { d: "Device D", n: 11 }, { d: "Device E", n: 7 }];

function OutageBars() {
  return (
    <div className="ap-chart" style={{ blockSize: 130 }}>
      <ResponsiveContainer>
        {/* The negative left margin pulls the y-axis labels onto the card's content inset. */}
        <BarChart data={OUTAGES} margin={{ top: 8, right: 0, bottom: 0, left: -24 }}>
          <XAxis dataKey="d" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis ticks={[0, 15, 30]} domain={[0, 30]} interval={0} tick={axisTick} axisLine={false} tickLine={false} />
          <ChartTooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--interactive-ghost-background-hover)" }} />
          {/* Recharts takes a px radius, not a token: radius/sm on the top corners. */}
          <Bar isAnimationActive={false} radius={[4, 4, 0, 0]} dataKey="n" name="Outages" fill="var(--chart-series-9)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const APPS = ["Task Manager", "Workforce Connect", "Workforce Management", "Zebra Prescriptive Analytics"];
const USAGE = Array.from({ length: 13 }, (_, i) => ({
  t: `${String(i * 2).padStart(2, "0")}:00`,
  current: Math.round(55 + 40 * Math.sin((i - 1) / 2.2) * Math.exp(-((i - 6) ** 2) / 30) + (i < 2 ? 40 - i * 30 : 0)),
  previous: Math.round(62 + 18 * Math.sin((i - 3) / 2.6)),
}));

/** A label column of one width, so the chip rows start on the same line. */
const RowLabel = ({ children }: { children: React.ReactNode }) => (
  <span style={{ ...type("body-small"), color: "var(--foreground-secondary)", inlineSize: 136, flex: "none" }}>{children}</span>
);

function ApplicationUsage() {
  const [apps, setApps] = React.useState(["Task Manager"]);
  const [filters, setFilters] = React.useState(["Site 123A", "Associate Level 2", "Cashier"]);
  const factor = 0.7 + apps.length * 0.15 - (3 - filters.length) * 0.05;
  const data = USAGE.map((u) => ({ ...u, current: Math.min(100, Math.round(u.current * factor)) }));
  return (
    <div style={{ display: "grid", gap: "var(--space-sm)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)", flexWrap: "wrap" }}>
        <RowLabel>Select application(s)</RowLabel>
        {APPS.map((a) => (
          <FilterChip key={a} shape="rounded" active={apps.includes(a)}
            onActiveChange={(on) => setApps((s) => on ? [...s, a] : s.filter((x) => x !== a))}>{a}</FilterChip>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)", flexWrap: "wrap" }}>
        <RowLabel>Filters</RowLabel>
        {filters.map((f) => (
          <AssistChip key={f} shape="rounded" showLeadingIcon={false} discardable discardLabel={`Remove ${f}`}
            onDiscard={() => setFilters((s) => s.filter((x) => x !== f))}>{f}</AssistChip>
        ))}
        {!filters.length ? <span style={{ ...type("body-small"), color: "var(--foreground-tertiary)" }}>No filters</span> : null}
        <span style={{ flex: 1 }} />
        <Legend swatch={{ inlineSize: 16, blockSize: 2, background: "var(--chart-series-1)" }}>Active sessions</Legend>
        <Legend swatch={{ inlineSize: 16, blockSize: 0, borderBlockStart: "2px dashed var(--foreground-tertiary)" }}>Previous period</Legend>
      </div>
      <div className="ap-chart" style={{ blockSize: 150 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid stroke="var(--border-subtle)" vertical horizontal />
            <XAxis dataKey="t" tick={axisTick} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} ticks={[0, 50, 100]} interval={0} tick={axisTick} axisLine={false} tickLine={false} />
            <ChartTooltip contentStyle={tooltipStyle} />
            <Line isAnimationActive={false} type="monotone" dataKey="current" name="Active sessions" stroke="var(--chart-series-1)" strokeWidth={2} dot={false} />
            <Line isAnimationActive={false} type="monotone" dataKey="previous" name="Previous period" stroke="var(--foreground-tertiary)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---- setup progress ---------------------------------------------------------- */

/** Each step is a plain filled box: brand fill when done, the faint brand fill when started, the track colour when not started. */
const FILL = {
  done: "var(--interactive-primary-background-default)",
  // A part-strength brand fill: the subtle token alone vanishes on the dark surface.
  started: "color-mix(in srgb, var(--interactive-primary-background-default) 35%, var(--surface-track))",
  todo: "var(--surface-track)",
} as const;
const STATE_TEXT = { done: "done", started: "in progress", todo: "not started" } as const;

const SETUP: { step: string; state: "done" | "started" | "todo" }[] = [
  { step: "Sites", state: "done" }, { step: "Hierarchies", state: "todo" }, { step: "Admins", state: "started" },
  { step: "Apps", state: "started" }, { step: "Roles", state: "started" }, { step: "Users", state: "todo" },
];

/**
 * The setup reminder: the title over a segmented progress row (one filled box
 * per step, its name under it), and Continue Wizard on the right,
 * centred on the whole block. The body's inset is the same as every card
 * heading's, so the title and the button line up with the cards below.
 */
function SetupBanner() {
  return (
    <Card shape="rounded" hasHeader={false} hasFooter={false} style={SECTION}>
      <CardBody style={{ display: "flex", alignItems: "center", gap: "var(--space-xl)" }}>
        <div style={{ flex: 1, minInlineSize: 0, display: "grid", gap: "var(--space-sm)" }}>
          <span style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-sm)", flexWrap: "wrap" }}>
            <span style={type("title-medium")}>You haven’t finished setting up your experience yet.</span>
            <span style={{ ...type("body-small"), color: "var(--foreground-secondary)" }}>
              {SETUP.filter((s) => s.state === "done").length} of {SETUP.length} done · {SETUP.filter((s) => s.state === "started").length} in progress
            </span>
          </span>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: `repeat(${SETUP.length}, minmax(0, 1fr))`, gap: "var(--space-3xs)" }}>
            {SETUP.map((s) => (
              <li key={s.step} style={{ display: "grid", gap: "var(--space-xs)" }}>
                <span aria-hidden="true" style={{ blockSize: "var(--space-sm)", borderRadius: "var(--radius-sm)", background: FILL[s.state] }} />
                <span style={{ ...type("body-xsmall"), color: "var(--foreground-secondary)" }}>{s.step}<span style={{ position: "absolute", inlineSize: 1, blockSize: 1, overflow: "hidden", clipPath: "inset(50%)" }}>{`, ${STATE_TEXT[s.state]}`}</span></span>
              </li>
            ))}
          </ol>
        </div>
        <Button flavour="primary" size="medium" shape="rounded" trailingIcon="arrow-forward">Continue Wizard</Button>
      </CardBody>
    </Card>
  );
}

/* ---- page -------------------------------------------------------------------- */

function AdminPortal({ theme }: { theme?: "mode-light" | "mode-dark" }) {
  const root = React.useRef<HTMLDivElement>(null);
  const dark = useIsDark(root);
  const [active, setActive] = React.useState("Sites");
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [railExpanded, setRailExpanded] = React.useState(true);
  const toggle = (id: string) => () => setExpanded((e) => (e === id ? null : id));

  return (
    <div ref={root} className={theme} style={{ inlineSize: 1440, blockSize: 1024, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--surface-page)", color: "var(--foreground-primary)" }}>
      <style>{PAGE_CSS}</style>
      {/* The header spans the whole frame. It holds its own dark mode, whatever the page mode. */}
      <AdminHeader onMenuClick={() => setRailExpanded((open) => !open)} />
      <Divider />
      {/* Below it: the rail on the start side, a divider, and the dashboard filling the rest. */}
      <div style={{ flex: 1, minBlockSize: 0, display: "flex" }}>
      <AdminRail active={active} onSelect={setActive} light={!dark} expanded={railExpanded} onExpandedChange={setRailExpanded} />
      <Divider orientation="vertical" />
      <div style={{ flex: 1, minInlineSize: 0, display: "flex", flexDirection: "column" }}>
        <Scrolled tag="main" style={{ padding: "var(--space-lg) var(--space-xl)", display: "grid", gap: "var(--space-md)", alignContent: "start", gridAutoRows: "max-content" }}>
          <SetupBanner />
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 400px", gap: "var(--space-md)" }}>
            <Widget title="Site Activity" subheading="Scroll and zoom to show activity for a region" expanded={expanded === "map"} onExpand={toggle("map")}
              fill style={{ gridRow: expanded ? undefined : "span 2" }}>
              <SiteActivity dark={dark} />
            </Widget>
            <Widget title="Tasks" subheading={<>Categorised by <a href="#settings" style={{ color: "var(--foreground-link)" }}>Setting</a></>}
              expanded={expanded === "tasks"} onExpand={toggle("tasks")}>
              <TasksBreakdown />
            </Widget>
            <Widget title="Device Outages" expanded={expanded === "outages"} onExpand={toggle("outages")}
              subheading={<><span style={{ color: "var(--foreground-error)" }}>↑ 0.3%</span> more this week</>}>
              <OutageBars />
            </Widget>
          </div>
          <Widget title="Application Usage" subheading="Measured by active sessions" expanded={expanded === "usage"} onExpand={toggle("usage")}>
            <ApplicationUsage />
          </Widget>
        </Scrolled>
      </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof AdminPortal> = {
  title: "Experimental/Pages/Admin Portal",
  component: AdminPortal,
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "**Experimental mock page.** The Zebra Admin dashboard on a 1440 × 1024 desktop, fitting the frame without scrolling, framed by the library's Navigation Rail (Navigation Header and Navigation Rail Items, with its own collapse toggle) and Global Header, with every widget a Card with Card Heading and Card Body. Inside: Button, Icon Button, Divider, Search, Filter Chip and Assist Chip. Site Activity is a real Leaflet map (Esri gray canvas basemap, light or dark with the theme): scroll and zoom it, hover a site, or search one to fly there. Tasks is a ranked bar list of the four categories with their share; Device Outages and Application Usage are Recharts charts on the chart-series tokens; the application and filter chips change the usage line. Each card's expand control widens it across the grid." } },
  },
};
export default meta;
type Story = StoryObj<typeof AdminPortal>;

export const Light: Story = {};

export const Dark: Story = { args: { theme: "mode-dark" } };
