import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaChatMessage } from "../../components/chat-message/chat-message.js";
import "../../components/chat-message/chat-message.js";
import "../../components/dropdown/menu-item/dropdown-menu-item.js";
import "../../index.css";

const createComponent = (attrs: Partial<ZetaChatMessage> = {}) =>
  fixture<ZetaChatMessage>(
    html`<zeta-chat-message name="First Last" initials="FL" time="09:41"
      >Hello<zeta-dropdown-menu-item slot="menu">Copy text</zeta-dropdown-menu-item></zeta-chat-message
    >`
  ).then(async el => {
    Object.assign(el, attrs);
    await elementUpdated(el);
    return el;
  });
const q = (el: ZetaChatMessage, s: string) => el.shadowRoot!.querySelector<HTMLElement>(s);
const probe = (prop: string, value: string) => {
  const p = document.createElement("div");
  p.style.setProperty(prop, value);
  document.body.append(p);
  const v = getComputedStyle(p).getPropertyValue(prop);
  p.remove();
  return v;
};

describe("zeta-chat-message", () => {
  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      const subject = await createComponent();
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("names the controls toolbar's buttons", async () => {
      const subject = await createComponent({ state: "active" });
      const controls = q(subject, "zeta-chat-controls") as HTMLElement & { shadowRoot: ShadowRoot };
      const labels = [...controls.shadowRoot.querySelectorAll("zeta-icon-button")].map(b => b.getAttribute("aria-label"));
      expect(labels).to.include.members(["Add reaction", "More actions"]);
    });
  });

  describe("Content", () => {
    it("shows the header on a first message and the time column on a consecutive one", async () => {
      const first = await createComponent();
      expect(q(first, ".header")).to.exist;
      const next = await createComponent({ sequence: "consecutive" });
      expect(q(next, ".header")).to.not.exist;
      expect(q(next, ".time-column")).to.exist;
    });

    it("puts your conversation messages in a fill bubble, without avatar or header", async () => {
      const subject = await createComponent({ chatStyle: "conversation", roleName: "sender" });
      expect(q(subject, "zeta-chat-bubble")!.getAttribute("bubblestyle")).to.equal("fill");
      expect(q(subject, "zeta-avatar")).to.not.exist;
      expect(q(subject, ".header")).to.not.exist;
    });

    it("shows the loading indicator instead of the content", async () => {
      const subject = await createComponent({ state: "loading", roleName: "assistant" });
      expect(q(subject, "zeta-chat-loading-indicator")!.getAttribute("label")).to.equal("Thinking");
      expect(q(subject, ".content")).to.not.exist;
    });

    it("keeps the assistant's controls under the message, with no floating bar", async () => {
      const subject = await createComponent({ roleName: "assistant" });
      expect(q(subject, ".assistant-controls")).to.exist;
      expect(q(subject, ".float")).to.not.exist;
    });

    it("draws an icon avatar from the Zebra font in place of initials", async () => {
      const subject = await createComponent({ roleName: "assistant", avatarIcon: "companion" });
      const glyph = q(subject, "zeta-avatar .avatar-glyph")!;
      expect(glyph.textContent).to.equal("\u{e2d4}");
      expect(getComputedStyle(glyph).fontFamily).to.contain("ZdsIcons");
    });
  });

  describe("Styling", () => {
    it("takes the hover surface when active on desktop", async () => {
      const subject = await createComponent({ state: "active" });
      expect(getComputedStyle(q(subject, ".root")!).backgroundColor).to.equal(probe("background-color", "var(--interactive-ghost-background-hover)"));
    });

    it("fills your bubble with the primary background", async () => {
      const subject = await createComponent({ chatStyle: "conversation", roleName: "sender" });
      expect(getComputedStyle(q(subject, "zeta-chat-bubble")!).backgroundColor).to.equal(
        probe("background-color", "var(--interactive-primary-background-default)")
      );
    });
  });

  describe("Interaction", () => {
    it("opens the reactions row and the menu one at a time", async () => {
      const subject = await createComponent({ reactionControls: true });
      expect(q(subject, ".reactions-row")).to.exist;
      subject.expandMenu = true;
      subject.reactionControls = false;
      await elementUpdated(subject);
      expect(q(subject, ".reactions-row")).to.not.exist;
      expect(q(subject, ".menu")).to.exist;
    });

    it("fires react with the chosen reaction", async () => {
      const subject = await createComponent({ reactionControls: true });
      setTimeout(() => q(subject, ".reaction")!.click());
      const event = await oneEvent(subject, "react");
      expect((event as CustomEvent<{ reaction: string }>).detail.reaction).to.equal("👍");
    });
  });
});
