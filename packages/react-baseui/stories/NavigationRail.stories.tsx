import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  CaretIndicator,
  CollapsibleMenuItem,
  Divider,
  IconButton,
  NavigationHeader,
  NavigationRail,
  NavigationRailItem,
  SubMenuHeader,
  SubMenuItem,
  useNavigationRailShape,
  type NavigationRailProps,
} from "../src/index.js";

const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;
const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>{children}</div>
);
/** The rail fills its parent's height: give it a frame to fill. */
const Frame = ({ children, height = 640 }: { children: React.ReactNode; height?: number }) => (
  <div style={{ height, display: "flex", border: "1px dashed var(--border-subtle)", background: "var(--surface-page)", width: "fit-content" }}>{children}</div>
);

const Menu = () => (
  <>
    <NavigationRailItem label="Home" icon="home" href="#home" selected />
    <NavigationRailItem label="Inbox" icon="inbox" href="#inbox" badge badgeLabel="New messages" />
    <NavigationRailItem label="Reports" icon="dashboard" href="#reports" />
    <Divider />
    <NavigationRailItem label="Calendar" icon="calendar" href="#calendar" />
    <NavigationRailItem label="Map" icon="map" href="#map" />
    <NavigationRailItem label="Stores" icon="store" href="#stores" disabled />
  </>
);
const Footer = () => (
  <>
    <Divider />
    <NavigationRailItem label="Help" icon="help" href="#help" />
    <NavigationRailItem label="Settings" icon="settings" href="#settings" />
  </>
);
const SubMenu = ({ open = true }: { open?: boolean }) => (
  <>
    <CollapsibleMenuItem label="Orders" icon="list" badge={4} defaultOpen={open}>
      <SubMenuItem label="Open orders" href="#open" selected />
      <SubMenuItem label="Back orders" href="#back" badge={12} />
      <SubMenuItem label="Returns" href="#returns" />
      <SubMenuItem label="Archived orders from previous seasons" href="#archived" disabled />
    </CollapsibleMenuItem>
    <SubMenuItem label="Analytics" icon="analytics" href="#analytics" />
    <SubMenuItem label="Schedule" icon="schedule" href="#schedule" badge={2} />
    <SubMenuItem label="Teams" icon="group" subMenu href="#teams" />
    <SubMenuItem label="Files" icon="folder" href="#files" />
  </>
);
const Header = ({ type = "avatar" as const }: { type?: "avatar" | "logo" }) => (
  <NavigationHeader type={type} heading="Zebra Workcloud" avatarInitials="MY" />
);

/** A trailing action slotted into the Sub Menu Header: it reads the rail's shape to match (the rail didn't render it). */
const SearchAction = () => {
  const shape = useNavigationRailShape() ?? "rounded";
  return <IconButton flavour="subtle" size="small" shape={shape} icon="search" label="Search operations" />;
};

const Composed = (p: NavigationRailProps & { panel?: boolean; open?: boolean }) => {
  const { panel = true, open = true, ...rest } = p;
  return (
    <NavigationRail
      header={<Header />}
      actionLabel="Create"
      footer={<Footer />}
      subMenuHeader={panel ? <SubMenuHeader type="sub-page" heading="Operations" actions={<SearchAction />} /> : undefined}
      subMenu={panel ? <SubMenu open={open} /> : undefined}
      {...rest}
    >
      <Menu />
    </NavigationRail>
  );
};

type Args = NavigationRailProps & { panel?: boolean };

const meta: Meta<Args> = {
  title: "Components/Navigation Rail/Navigation Rail",
  component: NavigationRail,
  tags: ["autodocs"],
  args: { defaultExpanded: false, showLabels: false, showToggleItem: true, shape: "rounded", inverse: false, panel: true },
  argTypes: {
    expanded: { control: "boolean" },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    inverse: { control: "boolean" },
    railMaxWidth: { control: "text", description: "Caps the wide rail. A CSS length, or a number in px." },
    subMenuMaxWidth: { control: "text", description: "Caps the hugged sub menu. A CSS length, or a number in px." },
    showLabels: { control: "boolean" },
    showToggleItem: { control: "boolean" },
    panel: { control: "boolean", name: "sub menu (fills the subMenu slots)" },
  },
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {
  render: (args) => (
    <Frame>
      <Composed {...args} />
    </Frame>
  ),
};

/** expanded: the narrow icon rail vs the wide labelled one. The toggle item switches between them. */
export const Expanded: Story = {
  render: () => (
    <Row>
      {[false, true].map((e) => (
        <div key={String(e)} style={{ display: "grid", gap: 8 }}>
          <Cap>{`expanded=${e}`}</Cap>
          <Frame>
            <Composed defaultExpanded={e} />
          </Frame>
        </div>
      ))}
    </Row>
  ),
};

/**
 * railMaxWidth / subMenuMaxWidth (code-only): caps on the wide rail and the
 * hugged sub menu. Capped rows truncate; hover one for 3s for its full label.
 */
export const MaxWidths: Story = {
  render: () => {
    const longRow = (
      <>
        <SubMenu />
        <SubMenuItem label="Quarterly inventory reconciliation reports" icon="folder" href="#quarterly" />
      </>
    );
    return (
      <Row>
        {([
          ["no caps", {}],
          ["subMenuMaxWidth=220", { subMenuMaxWidth: 220 }],
          ["expanded, railMaxWidth=160, subMenuMaxWidth=220", { defaultExpanded: true, railMaxWidth: 160, subMenuMaxWidth: 220 }],
        ] as const).map(([cap, p]) => (
          <div key={cap} style={{ display: "grid", gap: 8 }}>
            <Cap>{cap}</Cap>
            <Frame>
              <Composed {...p} subMenu={longRow} />
            </Frame>
          </div>
        ))}
      </Row>
    );
  },
};

/**
 * shape (code-only, no Figma counterpart): every nested component follows the
 * rail — items, the open group, the header action, the header's settings
 * button and the sub menu header's back button. rounded = radius/sm, sharp =
 * radius/none. The rail itself is unaffected.
 */
export const Shape: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      {[false, true].map((e) => (
        <Row key={String(e)}>
          {(["rounded", "sharp"] as const).map((shape) => (
            <div key={shape} style={{ display: "grid", gap: 8 }}>
              <Cap>{`shape=${shape}, expanded=${e}`}</Cap>
              <Frame>
                <Composed shape={shape} defaultExpanded={e} />
              </Frame>
            </div>
          ))}
        </Row>
      ))}
    </div>
  ),
};

/**
 * inverse (code-only, owner decision): the rail is locked to dark mode
 * whatever the page's mode; `inverse` locks it to light. Each pane is a page
 * scope — the rail ignores the page's mode but keeps its `.ext-*` brand.
 */
export const Inverse: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(3, max-content)" }}>
      {(
      [
        ["light page", "mode-light", false],
        ["dark page", "mode-dark", false],
        ["light page, inverse", "mode-light", true],
        ["dark page, inverse", "mode-dark", true],
        ["ext-companion light page", "ext-companion mode-light", false],
        ["ext-companion dark page, inverse", "ext-companion mode-dark", true],
      ] as const
      ).map(([cap, cls, inv]) => (
        <div key={cap} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <Cap>{cap}</Cap>
          <Frame height={600}>
            <Composed inverse={inv} />
          </Frame>
        </div>
      ))}
    </div>
  ),
};

/** label (showLabels): captions under the glyphs in the narrow rail. With expanded it simply works (Figma never built it). */
export const Labels: Story = {
  render: () => (
    <Row>
      {[
        ["showLabels=false", false, false],
        ["showLabels=true", true, false],
        ["showLabels=true + expanded", true, true],
      ].map(([cap, l, e]) => (
        <div key={cap as string} style={{ display: "grid", gap: 8 }}>
          <Cap>{cap as string}</Cap>
          <Frame>
            <Composed showLabels={l as boolean} defaultExpanded={e as boolean} panel={false} />
          </Frame>
        </div>
      ))}
    </Row>
  ),
};

/** showHeaderAction: the action shows when `actionLabel` is set. */
export const HeaderAction: Story = {
  render: () => (
    <Row>
      {[false, true].map((e) => (
        <div key={String(e)} style={{ display: "grid", gap: 8 }}>
          <Cap>{`with action, expanded=${e}`}</Cap>
          <Frame height={420}>
            <NavigationRail defaultExpanded={e} header={<Header />} actionLabel="Create">
              <Menu />
            </NavigationRail>
          </Frame>
        </div>
      ))}
      <div style={{ display: "grid", gap: 8 }}>
        <Cap>no action</Cap>
        <Frame height={420}>
          <NavigationRail header={<Header />}>
            <Menu />
          </NavigationRail>
        </Frame>
      </div>
    </Row>
  ),
};

/** railWidth: Figma's 200px by default, a project width, or "fill" to take the container's width. */
export const RailWidth: Story = {
  render: () => (
    <Row>
      {([["default (200px)", undefined, 260], ["railWidth=255", 255, 300], ['railWidth="fill" in a 320px column', "fill", 320]] as const).map(([cap, w, col]) => (
        <div key={cap} style={{ display: "grid", gap: 8 }}>
          <Cap>{cap}</Cap>
          {/* A fixed column, so "fill" has a width to take (Frame hugs its content). */}
          <div style={{ inlineSize: col, blockSize: 420, display: "flex", border: "1px dashed var(--border-subtle)", background: "var(--surface-page)" }}>
            <NavigationRail defaultExpanded railWidth={w} header={<Header />}>
              <Menu />
            </NavigationRail>
          </div>
        </div>
      ))}
    </Row>
  ),
};

/** The header's Icon Button takes any glyph, label and action (Settings by default). */
export const HeaderIconButton: Story = {
  render: () => (
    <Row>
      {(["settings", "home", "swap"] as const).map((icon) => (
        <Frame key={icon} height={200}>
          <NavigationRail defaultExpanded showToggleItem={false}
            header={<NavigationHeader heading="ACME" actionIcon={icon} actionLabel={icon === "home" ? "Home" : icon === "settings" ? "Settings" : "Switch tenant"} onAction={() => undefined} />} />
        </Frame>
      ))}
    </Row>
  ),
};

/** showToggleItem, and the footer slot (moreFooterItems). */
export const ToggleAndFooter: Story = {
  render: () => (
    <Row>
      {[
        ["toggle + footer", true, true],
        ["footer, no toggle", false, true],
        ["toggle only", true, false],
      ].map(([cap, t, f]) => (
        <div key={cap as string} style={{ display: "grid", gap: 8 }}>
          <Cap>{cap as string}</Cap>
          <Frame height={480}>
            <NavigationRail header={<Header />} showToggleItem={t as boolean} footer={f ? <Footer /> : undefined}>
              <Menu />
            </NavigationRail>
          </Frame>
        </div>
      ))}
    </Row>
  ),
};

/** showSubMenu: the panel shows when its slots are filled. */
export const SubMenuPanel: Story = {
  render: () => (
    <Row>
      <div style={{ display: "grid", gap: 8 }}>
        <Cap>panel, group open</Cap>
        <Frame>
          <Composed />
        </Frame>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <Cap>panel, group closed</Cap>
        <Frame>
          <Composed open={false} />
        </Frame>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <Cap>no panel</Cap>
        <Frame>
          <Composed panel={false} />
        </Frame>
      </div>
    </Row>
  ),
};

/** Subcomponent: Navigation Header — type × expanded. */
export const NavigationHeaders: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(2, 200px)", background: "var(--surface-section)", padding: 12, width: "fit-content" }}>
      {(["avatar", "logo"] as const).flatMap((type) =>
        [true, false].map((e) => (
          <div key={`${type}${e}`} style={{ display: "grid", gap: 4, justifyItems: "start" }}>
            <Cap>{`type=${type}, expanded=${e}`}</Cap>
            <div style={{ width: e ? 176 : "auto" }}>
              <NavigationHeader type={type} expanded={e} heading="Zebra Workcloud" avatarInitials="MY" />
            </div>
          </div>
        )),
      )}
    </div>
  ),
};

/** Subcomponent: Sub Menu Header — type, leading icon, trailing actions. */
export const SubMenuHeaders: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: 240, background: "var(--surface-section)" }}>
      <SubMenuHeader type="default" icon="store" heading="Store 1042" />
      <SubMenuHeader type="sub-page" heading="Operations" actions={<Button size="small" shape="rounded" flavour="text">Edit</Button>} />
      <SubMenuHeader type="sub-page" heading="Operations" shape="sharp" actions={<Button size="small" shape="sharp" flavour="text">Edit</Button>} />
      <SubMenuHeader type="sub-page" heading="Operations" showLeadingIcon={false} />
    </div>
  ),
};

/** Subcomponent: Caret Indicator — one glyph, turned (owner decision), never swapped. */
export const CaretIndicators: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: "grid", gap: 12, color: "var(--foreground-primary)" }}>
        <Button size="small" flavour="primary" style={{ justifySelf: "start" }} onClick={() => setOpen((o) => !o)}>{open ? "Close" : "Open"}</Button>
        {(["vertical", "horizontal"] as const).map((d) => (
          <div key={d} style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Cap>{d}</Cap>
            {(["small", "medium", "large"] as const).map((s) => (
              <CaretIndicator key={s} direction={d} size={s} open={open} />
            ))}
            <Cap>open=true:</Cap>
            {(["small", "medium", "large"] as const).map((s) => (
              <CaretIndicator key={s} direction={d} size={s} open />
            ))}
          </div>
        ))}
      </div>
    );
  },
};

/** Subcomponent: Collapsible Menu Item — open false / true, then open and sharp. */
export const CollapsibleMenuItems: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: 224, padding: 8, background: "var(--surface-section)" }}>
      <CollapsibleMenuItem label="Orders (sharp)" icon="list" defaultOpen shape="sharp">
        <SubMenuItem label="Open orders" href="#a" selected />
        <SubMenuItem label="Returns" href="#b" />
      </CollapsibleMenuItem>
      <CollapsibleMenuItem label="Orders" icon="list">
        <SubMenuItem label="Open orders" href="#a" />
        <SubMenuItem label="Returns" href="#b" />
      </CollapsibleMenuItem>
      <CollapsibleMenuItem label="Orders" icon="list" defaultOpen badge={4}>
        <SubMenuItem label="Open orders" href="#a" selected />
        <SubMenuItem label="Back orders" href="#c" badge={12} />
        <SubMenuItem label="Returns" href="#b" />
      </CollapsibleMenuItem>
    </div>
  ),
};

/** Page scopes light, dark, extension and extension-dark; expanded and collapsed, with an open sub menu. The rail stays dark in every one (locked mode) and keeps the extension brand; see Inverse. */
export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(820px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <Cap>{cls || "base / light"}</Cap>
          <div style={{ display: "flex", gap: 16 }}>
            <Frame height={600}>
              <Composed />
            </Frame>
            <Frame height={600}>
              <Composed defaultExpanded />
            </Frame>
          </div>
        </div>
      ))}
    </div>
  ),
};
