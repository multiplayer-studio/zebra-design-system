import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaMessageInput, MessageInputState, MessageSubmission } from "../../components/message-input/message-input.js";
import "../../components/message-input/message-input.js";
import "../../index.css";

const createComponent = (state?: MessageInputState, value = "") =>
  fixture<ZetaMessageInput>(html`<zeta-message-input .state=${state ?? null} .value=${value}></zeta-message-input>`);
const root = (el: ZetaMessageInput) => el.shadowRoot!.querySelector<HTMLElement>(".root")!;
const labels = (el: ZetaMessageInput) => [...el.shadowRoot!.querySelectorAll("zeta-icon-button")].map(b => b.getAttribute("aria-label"));
const send = (el: ZetaMessageInput) => el.shadowRoot!.querySelector<HTMLElement & { disabled: boolean }>("zeta-icon-button.send")!;

describe("zeta-message-input", () => {
  describe("Accessibility", () => {
    it("is accessible at rest", async () => {
      const subject = await createComponent();
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("names the composer and every icon control", async () => {
      const subject = await createComponent();
      expect(root(subject).getAttribute("aria-label")).to.equal("Message");
      expect(labels(subject).every(Boolean)).to.be.true;
    });

    it("names the toggle after what it will do, with aria-expanded", async () => {
      const subject = await createComponent("attachment-open");
      const toggle = subject.shadowRoot!.querySelector("zeta-icon-button.tray-toggle")!;
      expect(toggle.getAttribute("aria-label")).to.equal("Close attachments");
    });
  });

  describe("Content", () => {
    it("derives empty, then filled once there is text", async () => {
      const subject = await createComponent();
      expect(subject.getAttribute("state")).to.equal("empty");
      subject.value = "Hello";
      await elementUpdated(subject);
      expect(subject.getAttribute("state")).to.equal("filled");
    });

    it("enables Send only where there is something to send", async () => {
      const empty = await createComponent();
      expect(send(empty).disabled).to.be.true;
      const filled = await createComponent(undefined, "Hello");
      expect(send(filled).disabled).to.be.false;
      const listening = await createComponent("listening");
      expect(send(listening).disabled).to.be.true;
      const playback = await createComponent("playback");
      expect(send(playback).disabled).to.be.false;
    });

    it("shows the voice bar and Stop while listening, and drops More Tools", async () => {
      const subject = await createComponent("listening");
      expect(subject.shadowRoot!.querySelector(".bar")).to.exist;
      expect(subject.shadowRoot!.querySelector("textarea")).to.not.exist;
      expect(labels(subject)).to.include("Stop and transcribe");
      expect(subject.shadowRoot!.querySelector<HTMLElement>(".more-tools")!.hidden).to.be.true;
    });

    it("has no toolbar while speaking, only Stop speaking", async () => {
      const subject = await createComponent("speaking");
      expect(subject.shadowRoot!.querySelector(".toolbar")).to.not.exist;
      expect(labels(subject)).to.deep.equal(["Stop speaking"]);
    });

    it("sends the text and clears", async () => {
      const subject = await createComponent(undefined, "Book a table");
      setTimeout(() => send(subject).click());
      const event = await oneEvent<CustomEvent<MessageSubmission>>(subject, "send");
      expect(event.detail.text).to.equal("Book a table");
      await elementUpdated(subject);
      expect(subject.value).to.equal("");
    });
  });

  describe("Styling", () => {
    it("sits on surface/card with a border/default outline and radius/container", async () => {
      const subject = await createComponent();
      const style = getComputedStyle(root(subject));
      const probe = document.createElement("div");
      probe.style.background = "var(--surface-card)";
      probe.style.borderColor = "var(--zebra-border-default)";
      probe.style.borderRadius = "var(--radius-container)";
      document.body.append(probe);
      const want = getComputedStyle(probe);
      expect(style.backgroundColor).to.equal(want.backgroundColor);
      expect(style.borderTopColor).to.equal(want.borderTopColor);
      expect(style.borderTopLeftRadius).to.equal(want.borderTopLeftRadius);
      probe.remove();
    });

    it("takes the disabled surface when disabled", async () => {
      const subject = await createComponent("disabled");
      const probe = document.createElement("div");
      probe.style.background = "var(--interactive-neutral-background-disabled)";
      document.body.append(probe);
      expect(getComputedStyle(root(subject)).backgroundColor).to.equal(getComputedStyle(probe).backgroundColor);
      probe.remove();
    });

    it("draws the voice bar on surface/subtle", async () => {
      const subject = await createComponent("recording");
      const probe = document.createElement("div");
      probe.style.background = "var(--surface-subtle)";
      document.body.append(probe);
      const bar = subject.shadowRoot!.querySelector<HTMLElement>(".bar")!;
      expect(getComputedStyle(bar).backgroundColor).to.equal(getComputedStyle(probe).backgroundColor);
      probe.remove();
    });
  });
});
