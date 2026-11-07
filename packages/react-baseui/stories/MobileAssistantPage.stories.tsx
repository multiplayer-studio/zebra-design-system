import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AssistChip, Avatar, BadgeLabel, Card, CardBody, CardHeading, Divider, IconButton, MessageInput, NavigationBar,
  NavigationItem, PriorityPill, ProgressBar, ScreenHeaderBar, StatusLabel,
  type MessageAttachment, type MessageSubmission,
} from "../src/index.js";

/* A mock mobile page, not a component: the assistant screen of a store
   associate's handheld, composed only from the library. Layout is inline
   styles on semantic tokens; every visible control is a real component. */

const body = (size: "small" | "medium") => ({
  fontFamily: `var(--body-${size}-font-family), system-ui, sans-serif`,
  fontSize: `var(--body-${size}-font-size)`,
  lineHeight: `var(--body-${size}-line-height)`,
  letterSpacing: `var(--body-${size}-letter-spacing)`,
});

const file = (name: string, type: string): MessageAttachment =>
  ({ id: name, file: new File([""], name, { type }), kind: type.startsWith("video/") ? "video" : type.startsWith("image/") ? "image" : "document" });

type Msg = { id: number; from: "me" | "assistant"; text: string; attachments?: MessageAttachment[]; rich?: "tasks" | "delivery" };

/** The phone: a fixed 390 × 844 frame on the page surface. */
const Phone = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className} style={{
    inlineSize: 390, blockSize: 844, display: "flex", flexDirection: "column", overflow: "hidden",
    background: "var(--surface-page)", color: "var(--foreground-primary)",
    border: "var(--stroke-thin) solid var(--border-default)", borderRadius: "var(--radius-xl)",
  }}>{children}</div>
);

const Mine = ({ m }: { m: Msg }) => (
  <div style={{ display: "grid", justifyItems: "end", gap: "var(--space-2xs)" }}>
    {m.attachments?.length ? (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "end", gap: "var(--space-2xs)" }}>
        {m.attachments.map((a) => <AssistChip key={a.id} icon={a.kind === "image" ? "camera" : a.kind === "video" ? "video" : "document"} color={/\.pdf$/i.test(a.file.name) ? "red" : "neutral"}>{a.file.name}</AssistChip>)}
      </div>
    ) : null}
    {m.text ? (
      <p style={{
        ...body("medium"), margin: 0, maxInlineSize: "80%", padding: "var(--space-sm) var(--space-md)",
        borderRadius: "var(--radius-lg)", borderEndEndRadius: "var(--radius-xs)",
        background: "var(--interactive-primary-background-default)", color: "var(--interactive-primary-foreground-default)",
      }}>{m.text}</p>
    ) : null}
  </div>
);

const TASKS = [
  { name: "Restock chilled bays 4–7", where: "Aisle 1", level: "urgent", status: "negative", state: "Overdue" },
  { name: "Price check: weekly offers", where: "Aisle 3", level: "high", status: "warning", state: "Due 11:00" },
  { name: "Face up ambient shelves", where: "Aisle 2", level: "medium", status: "info", state: "Ongoing" },
  { name: "Count returns cage", where: "Back room", level: "low", status: "positive", state: "Done" },
] as const;

const TasksCard = () => (
  <Card shape="rounded" hasFooter={false} header={<CardHeading heading="Your tasks this morning" subheading="4 tasks · 1 overdue" trailingContent={<BadgeLabel variant="info" bold={false} outlined>Live</BadgeLabel>} />}>
    <CardBody style={{ display: "grid", gap: "var(--space-sm)" }}>
      {TASKS.map((t, i) => (
        <React.Fragment key={t.name}>
          {i ? <Divider /> : null}
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "var(--space-sm)" }}>
            <PriorityPill level={t.level} variant="badge" size="small" />
            <div style={{ minInlineSize: 0 }}>
              <div style={{ ...body("small"), fontWeight: 500 }}>{t.name}</div>
              <div style={{ ...body("small"), color: "var(--foreground-secondary)" }}>{t.where}</div>
            </div>
            <StatusLabel status={t.status} leading="indicator">{t.state}</StatusLabel>
          </div>
        </React.Fragment>
      ))}
      <ProgressBar value={25} label="Shift progress" showLabel trailing="1 of 4" />
    </CardBody>
  </Card>
);

const DeliveryCard = () => (
  <Card shape="rounded" hasFooter={false} header={<CardHeading heading="Inbound delivery" subheading="Door 2 · Chilled" trailingContent={<StatusLabel status="warning" leading="icon">Delayed</StatusLabel>} />}>
    <CardBody style={{ display: "grid", gap: "var(--space-sm)" }}>
      <p style={{ ...body("small"), margin: 0 }}>The 09:30 chilled delivery is now due at 10:15. Restocking bays 4–7 can wait until it arrives.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2xs)" }}>
        <AssistChip icon="document" color="red">Manifest.pdf</AssistChip>
        <AssistChip icon="document" color="green">Bay_plan.xlsx</AssistChip>
      </div>
    </CardBody>
  </Card>
);

const Theirs = ({ m, onSuggest }: { m: Msg; onSuggest: (t: string) => void }) => (
  <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-sm)", alignItems: "start" }}>
    <Avatar size="xsmall" type="icon" icon="chat-bot" showClose={false} showStatus={false} />
    <div style={{ display: "grid", gap: "var(--space-sm)", minInlineSize: 0 }}>
      <p style={{ ...body("medium"), margin: 0 }}>{m.text}</p>
      {m.rich === "tasks" ? <TasksCard /> : null}
      {m.rich === "delivery" ? <DeliveryCard /> : null}
      {m.rich ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2xs)" }}>
          {(m.rich === "tasks"
            ? [["calendar", "Plan my break"], ["location", "Route me to Aisle 1"], ["check-circle", "Mark returns done"]]
            : [["clock", "Remind me at 10:15"], ["chat", "Message the driver"]]
          ).map(([icon, label]) => <AssistChip key={label} icon={icon as "calendar"} onClick={() => onSuggest(label)}>{label}</AssistChip>)}
        </div>
      ) : null}
    </div>
  </div>
);

const SEED: Msg[] = [
  { id: 1, from: "me", text: "What should I do first this morning?" },
  { id: 2, from: "assistant", text: "Good morning, Amara. Here is your list, sorted by priority. The chilled restock is overdue, so start there.", rich: "tasks" },
  { id: 3, from: "me", text: "Is the chilled delivery here yet?", attachments: [file("Shelf_photo.jpg", "image/jpeg")] },
  { id: 4, from: "assistant", text: "Not yet. It is running about 45 minutes late.", rich: "delivery" },
];

const REPLIES = [
  "Done. I have added that to your tasks and will remind you when it is due.",
  "On it. Head to Aisle 1, chilled bays 4–7 are on the left past the dairy end.",
  "I have let the team lead know. Anything else?",
];

function AssistantPage({ theme = "" }: { theme?: string }) {
  const [msgs, setMsgs] = React.useState<Msg[]>(SEED);
  const [thinking, setThinking] = React.useState(false);
  const scroller = React.useRef<HTMLDivElement>(null);
  const reply = React.useRef(0);

  const first = React.useRef(true);
  React.useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: first.current ? "auto" : "smooth" });
    first.current = false;
  }, [msgs, thinking]);

  const send = (text: string, attachments: MessageAttachment[] = []) => {
    setMsgs((m) => [...m, { id: Date.now(), from: "me", text, attachments }]);
    setThinking(true);
    window.setTimeout(() => {
      setThinking(false);
      setMsgs((m) => [...m, { id: Date.now() + 1, from: "assistant", text: REPLIES[reply.current++ % REPLIES.length] }]);
    }, 900);
  };

  return (
    <Phone className={theme}>
      <ScreenHeaderBar title="Assistant" onBack={() => {}} backLabel="Back to home"
        action={<IconButton flavour="text" size="small" shape="full" icon="more-vertical" label="More options" />} />

      <div ref={scroller} style={{ flex: 1, overflowY: "auto", padding: "var(--space-md)", display: "grid", alignContent: "start", gap: "var(--space-lg)" }}>
        <div style={{ ...body("small"), textAlign: "center", color: "var(--foreground-secondary)" }}>Today · 08:42</div>
        {msgs.map((m) => (m.from === "me" ? <Mine key={m.id} m={m} /> : <Theirs key={m.id} m={m} onSuggest={(t) => send(t)} />))}
        {thinking ? (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
            <Avatar size="xsmall" type="icon" icon="chat-bot" showClose={false} showStatus={false} />
            <StatusLabel status="info" leading="indicator">Thinking…</StatusLabel>
          </div>
        ) : null}
      </div>

      <div style={{ padding: "0 var(--space-md) var(--space-sm)" }}>
        <MessageInput placeholder="Ask about tasks, stock or deliveries"
          onSend={(m: MessageSubmission) => send(m.text, m.attachments)} defaultSpeakResponse={false} />
      </div>

      <NavigationBar label="Main" distribution="space-between">
        <NavigationItem label="Home" icon="home" href="#home" />
        <NavigationItem label="Tasks" icon="list" href="#tasks" badge={1} badgeLabel="1 overdue" />
        <NavigationItem label="Assistant" icon="chat-bot" href="#assistant" active />
        <NavigationItem label="Inbox" icon="inbox" href="#inbox" badge={3} badgeLabel="3 unread" />
      </NavigationBar>
    </Phone>
  );
}

const meta: Meta<typeof AssistantPage> = {
  title: "Experimental/Pages/Mobile Assistant",
  component: AssistantPage,
  parameters: {
    layout: "centered",
    docs: { description: { component: "**Experimental mock page.** A store associate's assistant screen on a 390 × 844 handheld, composed only from library components: Screen Header Bar, Card with Card Heading, Avatar, Status Label, Priority Pill, Badge Label, Progress Bar, Divider, Assist Chips (suggestions and colour-coded files), Message Input and Navigation Bar. Send a message or tap a suggestion to add to the thread." } },
  },
};
export default meta;
type Story = StoryObj<typeof AssistantPage>;

export const Light: Story = {};

export const Dark: Story = { args: { theme: "mode-dark" } };

/** Light and dark side by side, to check every component follows the theme class. */
export const SideBySide: Story = {
  parameters: { layout: "padded" },
  render: () => <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}><AssistantPage /><AssistantPage theme="mode-dark" /></div>,
};
