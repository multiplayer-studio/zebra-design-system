import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeading, CardBody, CardImage, CardFooter, Avatar, Button } from "../src/index.js";

const SHAPES = ["sharp", "rounded"] as const;
const IMAGE = "https://picsum.photos/seed/zds-card/600/300";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The empty card shell: three stacked slots inside a bordered surface. Header and footer can each be switched off; the body has no toggle.",
      },
    },
  },
  argTypes: {
    shape: { control: "inline-radio", options: SHAPES },
    hasHeader: { control: "boolean" },
    hasFooter: { control: "boolean" },
  },
  args: { shape: "sharp", hasHeader: true, hasFooter: true },
};
export default meta;
type Story = StoryObj<typeof Card>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>{children}</div>
);

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 330 }}>
      <Card
        {...args}
        header={<CardHeading heading="Heading" subheading="Subheading" leadingContent={<Avatar size="small" type="initials" initials="AA" showClose={false} showStatus={false} />} />}
        footer={<CardFooter><Button flavour="primary">Button</Button></CardFooter>}
      >
        <CardBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</CardBody>
      </Card>
    </div>
  ),
};

/** Square or softened corners; content clips to whichever is chosen. */
export const Shapes: Story = {
  render: () => (
    <Row>
      {SHAPES.map((shape) => (
        <div key={shape} style={{ width: 280 }}>
          <Card
            shape={shape}
            header={<CardHeading heading="Heading" subheading="Subheading" />}
            footer={<CardFooter><Button flavour="primary">Button</Button></CardFooter>}
          >
            <CardBody>{shape}</CardBody>
          </Card>
        </div>
      ))}
    </Row>
  ),
};

/** Header and footer can each be switched off; the body slot has no toggle. */
export const HeaderAndFooterToggles: Story = {
  render: () => (
    <Row>
      <div style={{ width: 260 }}>
        <Card header={<CardHeading heading="Both slots" />} footer={<CardFooter><Button flavour="primary">Button</Button></CardFooter>}>
          <CardBody>hasHeader + hasFooter</CardBody>
        </Card>
      </div>
      <div style={{ width: 260 }}>
        <Card hasFooter={false} header={<CardHeading heading="No footer" />}>
          <CardBody>hasFooter=false</CardBody>
        </Card>
      </div>
      <div style={{ width: 260 }}>
        <Card hasHeader={false} footer={<CardFooter><Button flavour="primary">Button</Button></CardFooter>}>
          <CardBody>hasHeader=false — media-led cards want this, so the image meets the top edge.</CardBody>
        </Card>
      </div>
    </Row>
  ),
};

/** One action fills the width; two share the row with a gap; or pass anything else entirely. */
export const FooterActions: Story = {
  render: () => (
    <Row>
      <div style={{ width: 260 }}>
        <Card header={<CardHeading heading="One action" />} footer={<CardFooter><Button flavour="primary">Button</Button></CardFooter>}>
          <CardBody>actions = 1</CardBody>
        </Card>
      </div>
      <div style={{ width: 260 }}>
        <Card
          header={<CardHeading heading="Two actions" />}
          footer={
            <CardFooter>
              <Button flavour="outline">Cancel</Button>
              <Button flavour="primary">Button</Button>
            </CardFooter>
          }
        >
          <CardBody>actions = 2</CardBody>
        </Card>
      </div>
    </Row>
  ),
};

/** A media-led card: no header, an image leading the body. */
export const WithImage: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Card hasHeader={false} footer={<CardFooter><Button flavour="primary">Button</Button></CardFooter>}>
        <CardImage src={IMAGE} alt="" />
        <CardBody>
          <CardHeading heading="Media card" subheading="A second heading inside the body" />
        </CardBody>
      </Card>
    </div>
  ),
};

/** Theming is a class, at any level, cascading to everything inside. */
export const ThemingCascade: Story = {
  render: () => {
    const Panel = ({ cls, label }: { cls: string; label: string }) => (
      <div className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)" }}>
        <div style={{ font: "500 12px/1.4 system-ui", marginBottom: 8, opacity: 0.7 }}>{label || "base / light"}</div>
        <div style={{ width: 240 }}>
          <Card header={<CardHeading heading="Heading" />} footer={<CardFooter><Button flavour="primary">Button</Button></CardFooter>}>
            <CardBody>Themed via ancestor class</CardBody>
          </Card>
        </div>
      </div>
    );
    return (
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        <Panel cls="" label="" />
        <Panel cls="mode-dark" label="mode-dark" />
        <Panel cls="ext-companion" label="ext-companion" />
      </div>
    );
  },
};
