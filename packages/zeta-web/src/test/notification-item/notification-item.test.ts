import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaNotificationItem } from "../../components/notification-item/notification-item.js";
import "../../components/notification-item/notification-item.js";
import "../../components/avatar/avatar.js";
import "../../components/button/button.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const one = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;
const item = () =>
  fixture<ZetaNotificationItem>(
    html`<zeta-notification-item attachment="Spring-donation-drive.pdf" group
      ><zeta-avatar slot="leading" size="xxs">PS</zeta-avatar>New urgent message from Phil Starr
      <zeta-button slot="action" size="small" flavor="outline" shape="rounded">User Action</zeta-button></zeta-notification-item
    >`
  );

describe("zeta-notification-item", () => {
  describe("Accessibility", () => {
    it("names the unread state and the urgency indicator", async () => {
      const el = await item();
      await expect(one(el, ".sr").textContent).to.equal(", Unread");
      await expect(one(el, ".urgency").getAttribute("aria-label")).to.equal("Urgent");
      // The timestamp is foreground/tertiary on surface/card, 3.91:1 (spec warn); everything else must pass.
      await expect(el).shadowDom.to.be.accessible({ ignoredRules: ["color-contrast"] });
    });
  });

  describe("Content", () => {
    it("shows the title, timestamp, attachment and action, and drops each row with its toggle", async () => {
      const el = await item();
      expect(one(el, ".title").textContent).to.include("Urgent Message");
      await expect(one(el, ".timestamp").textContent).to.equal("Just now");
      await expect(one(el, ".filename").textContent).to.equal("Spring-donation-drive.pdf");
      expect(one(el, ".actions")).to.exist;
      el.showAttachment = false;
      el.showActions = false;
      el.showUrgencyIndicator = false;
      await elementUpdated(el);
      expect(one(el, ".attachment")).to.not.exist;
      expect(one(el, ".actions")).to.not.exist;
      expect(one(el, ".urgency")).to.not.exist;
    });

    it("hides the attachment row when there is no filename", async () => {
      const el = await fixture<ZetaNotificationItem>(html`<zeta-notification-item>Body</zeta-notification-item>`);
      expect(one(el, ".attachment")).to.not.exist;
    });

    it("drops the dot, the unread text and the group bar once read", async () => {
      const el = await item();
      expect(one(el, ".dot")).to.exist;
      expect(one(el, ".group")).to.exist;
      el.read = true;
      await elementUpdated(el);
      expect(one(el, ".dot")).to.not.exist;
      expect(one(el, ".sr")).to.not.exist;
      expect(one(el, ".group")).to.not.exist;
    });

    it("takes its leading flavour from what is slotted", async () => {
      const el = await item();
      await elementUpdated(el);
      await expect(one(el, ".leading").dataset.flavor).to.equal("avatar");
      const icon = await fixture<ZetaNotificationItem>(html`<zeta-notification-item><zeta-icon slot="leading">verified</zeta-icon></zeta-notification-item>`);
      await elementUpdated(icon);
      await expect(one(icon, ".leading").dataset.flavor).to.equal("icon");
    });
  });

  describe("Dimensions", () => {
    it("is 360 wide with space/gutter by space/card padding and a control/sm leading slot", async () => {
      const el = await item();
      const card = one(el, ".item");
      await expect(card.getBoundingClientRect().width).to.equal(360);
      await expect(getComputedStyle(card).paddingTop).to.equal(v(el, "--space-gutter"));
      await expect(getComputedStyle(card).paddingLeft).to.equal(v(el, "--space-card"));
      await expect(getComputedStyle(card).columnGap).to.equal(v(el, "--space-sm"));
      await expect(`${one(el, ".leading").getBoundingClientRect().width}px`).to.equal(v(el, "--control-sm"));
    });
  });

  describe("Styling", () => {
    it("fills the unread card with surface/card and the read one with nothing", async () => {
      const el = await item();
      const card = one(el, ".item");
      await expect(getComputedStyle(card).backgroundColor).to.equal(getCssVarColorValue(el, "--surface-card"));
      await expect(getComputedStyle(card).borderTopLeftRadius).to.equal(v(el, "--radius-md"));
      el.read = true;
      await elementUpdated(el);
      await expect(getComputedStyle(card).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
    });

    it("sets the type and colours from the spec", async () => {
      const el = await item();
      await expect(getComputedStyle(one(el, ".title")).fontSize).to.equal(v(el, "--label-large-font-size"));
      await expect(getComputedStyle(one(el, ".timestamp")).color).to.equal(getCssVarColorValue(el, "--foreground-tertiary"));
      await expect(getComputedStyle(one(el, ".filename")).color).to.equal(getCssVarColorValue(el, "--foreground-link"));
      await expect(getComputedStyle(one(el, ".dot")).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-primary-background-default"));
      await expect(getComputedStyle(one(el, ".urgency")).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-destructive-background-default"));
      await expect(getComputedStyle(one(el, ".group")).backgroundColor).to.equal(getCssVarColorValue(el, "--border-focus"));
    });
  });
});
