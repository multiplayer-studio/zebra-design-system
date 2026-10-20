import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CollapsibleCard, CardBody, CardImage, CardFooter, Button } from "../src/index.js";

const SHAPES = ["sharp", "rounded"] as const;
const FLAVORS = ["default", "gradient"] as const;

const meta: Meta<typeof CollapsibleCard> = {
  title: "Components/Collapsible Card",
  component: CollapsibleCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A card whose body opens and closes behind a header that is always visible. The chevron flips on expand — an addition over Figma's own file, which doesn't wire that up (spec issue).",
      },
    },
  },
  argTypes: {
    shape: { control: "inline-radio", options: SHAPES },
    flavor: { control: "inline-radio", options: FLAVORS },
    heading: { control: "text" },
    description: { control: "text" },
  },
  args: { shape: "sharp", flavor: "default", heading: "Heading", description: "Description", defaultExpanded: false },
};
export default meta;
type Story = StoryObj<typeof CollapsibleCard>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>{children}</div>
);

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 385 }}>
      <CollapsibleCard {...args}>
        <CardBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</CardBody>
      </CollapsibleCard>
    </div>
  ),
};

/** Collapsed shows the header alone; expanded reveals the body — roughly tripling the card's height. */
export const States: Story = {
  render: () => (
    <Row>
      {[false, true].map((expanded) => (
        <div key={String(expanded)} style={{ width: 300 }}>
          <CollapsibleCard heading="Heading" description="Description" defaultExpanded={expanded}>
            <CardBody>Body content, revealed only while expanded.</CardBody>
          </CollapsibleCard>
        </div>
      ))}
    </Row>
  ),
};

/** Use gradient for at most one card in a group — it exists to single one out. */
export const Flavors: Story = {
  render: () => (
    <Row>
      {FLAVORS.map((flavor) => (
        <div key={flavor} style={{ width: 300 }}>
          <CollapsibleCard heading="Heading" description="Description" flavor={flavor} defaultExpanded>
            <CardBody>{flavor}</CardBody>
          </CollapsibleCard>
        </div>
      ))}
    </Row>
  ),
};

export const Shapes: Story = {
  render: () => (
    <Row>
      {SHAPES.map((shape) => (
        <div key={shape} style={{ width: 300 }}>
          <CollapsibleCard heading="Heading" description="Description" shape={shape} defaultExpanded>
            <CardBody>{shape}</CardBody>
          </CollapsibleCard>
        </div>
      ))}
    </Row>
  ),
};

/** Figma's header has a real showDescription toggle; this component derives it from whether `description` is passed. */
export const NoDescription: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <CollapsibleCard heading="Heading, no description" defaultExpanded>
        <CardBody>Description omitted entirely — not just hidden.</CardBody>
      </CollapsibleCard>
    </div>
  ),
};

/** A fully controlled card — the parent owns `expanded`. */
export const Controlled: Story = {
  render: () => {
    const [expanded, setExpanded] = React.useState(false);
    return (
      <div style={{ width: 320 }}>
        <CollapsibleCard heading="Controlled" description="Parent owns the state" expanded={expanded} onExpandedChange={setExpanded}>
          <CardBody>
            <Button flavour="text" onClick={() => setExpanded(false)}>
              Close from inside
            </Button>
          </CardBody>
        </CollapsibleCard>
      </div>
    );
  },
};

/** A media body, filled only in the expanded variant — matching the spec's own per-variant body storage. */
export const WithImage: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <CollapsibleCard heading="Heading" description="Description" defaultExpanded>
        <CardBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</CardBody>
        <CardImage src="https://picsum.photos/seed/zds-collapsible/600/240" alt="" />
        <CardFooter>
          <Button flavour="primary">Button</Button>
        </CardFooter>
      </CollapsibleCard>
    </div>
  ),
};

/** Theming is a class, at any level, cascading to everything inside. */
export const ThemingCascade: Story = {
  render: () => {
    const Panel = ({ cls, label }: { cls: string; label: string }) => (
      <div className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)" }}>
        <div style={{ font: "500 12px/1.4 system-ui", marginBottom: 8, opacity: 0.7 }}>{label || "base / light"}</div>
        <div style={{ width: 260 }}>
          <CollapsibleCard heading="Heading" description="Description" defaultExpanded>
            <CardBody>Themed via ancestor class</CardBody>
          </CollapsibleCard>
        </div>
      </div>
    );
    return (
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
        <Panel cls="" label="" />
        <Panel cls="mode-dark" label="mode-dark" />
        <Panel cls="ext-companion" label="ext-companion" />
      </div>
    );
  },
};
