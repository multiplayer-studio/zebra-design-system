import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaInPageBanner } from "../../components/in-page-banner/in-page-banner.js";
import "../../components/in-page-banner/in-page-banner.js";
import "../../components/button/button.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const one = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;
const banner = () =>
  fixture<ZetaInPageBanner>(
    html`<zeta-in-page-banner heading="Update available" description="Install it from Settings." show-close
      ><zeta-button slot="actions" size="small" flavor="outline-subtle">Install</zeta-button></zeta-in-page-banner
    >`
  );

describe("zeta-in-page-banner", () => {
  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      const el = await banner();
      await expect(el).shadowDom.to.be.accessible();
    });

    it("announces politely, negative interrupts, and names the dismiss", async () => {
      const el = await banner();
      await expect(one(el, ".banner").getAttribute("role")).to.equal("status");
      el.status = "negative";
      await elementUpdated(el);
      await expect(one(el, ".banner").getAttribute("role")).to.equal("alert");
      await expect(one(el, ".dismiss").getAttribute("aria-label")).to.equal("Dismiss");
    });
  });

  describe("Content", () => {
    it("shows the heading and the description", async () => {
      const el = await banner();
      await expect(one(el, ".title").textContent?.trim()).to.equal("Update available");
      await expect(one(el, ".description").textContent?.trim()).to.equal("Install it from Settings.");
    });

    it("follows status with its glyph", async () => {
      const el = await banner();
      const glyphs: Record<string, string> = {
        neutral: "lightbulb",
        default: "lightbulb",
        info: "info",
        positive: "check_circle",
        warning: "warning",
        negative: "error"
      };
      for (const [status, glyph] of Object.entries(glyphs)) {
        el.status = status as ZetaInPageBanner["status"];
        await elementUpdated(el);
        await expect(one(el, "zeta-icon").textContent?.trim()).to.equal(glyph);
      }
    });

    it("drops the glyph with show-icon false and takes a custom icon", async () => {
      const el = await banner();
      el.icon = "star";
      await elementUpdated(el);
      await expect(one(el, "zeta-icon").textContent?.trim()).to.equal("star");
      el.showIcon = false;
      await elementUpdated(el);
      await expect(one(el, ".glyph")).to.equal(null);
    });

    it("takes the legacy title, default slot and action slot", async () => {
      const el = await fixture<ZetaInPageBanner>(
        html`<zeta-in-page-banner title="Legacy title"
          >Legacy body<zeta-button slot="action" size="small">Go</zeta-button></zeta-in-page-banner
        >`
      );
      await expect(one(el, ".title").textContent?.trim()).to.equal("Legacy title");
      const slot = el.shadowRoot!.querySelector(".description slot") as HTMLSlotElement;
      await expect((slot.assignedNodes()[0] as Text).data.trim()).to.equal("Legacy body");
      await expect(one(el, ".actions").hidden).to.equal(false);
    });

    it("shows the dismiss only with show-close or the legacy canClose", async () => {
      const el = await fixture<ZetaInPageBanner>(html`<zeta-in-page-banner heading="No close"></zeta-in-page-banner>`);
      await expect(one(el, ".dismiss")).to.equal(null);
      el.canClose = true;
      await elementUpdated(el);
      await expect(one(el, ".dismiss")).to.not.equal(null);
    });

    it("gives the actions and the dismiss the banner's shape", async () => {
      const el = await banner();
      el.rounded = false;
      await elementUpdated(el);
      await expect(el.querySelector("zeta-button")?.getAttribute("shape")).to.equal("sharp");
      await expect(one(el, ".dismiss").getAttribute("shape")).to.equal("sharp");
    });
  });

  describe("Dimensions", () => {
    it("pads space/md by space/lg", async () => {
      const el = await banner();
      const s = getComputedStyle(one(el, ".banner"));
      await expect(s.paddingTop).to.equal(v(el, "--space-md"));
      await expect(s.paddingLeft).to.equal(v(el, "--space-lg"));
    });

    it("rounds with radius/sm and squares with radius/none", async () => {
      const el = await banner();
      await expect(getComputedStyle(one(el, ".banner")).borderTopLeftRadius).to.equal(v(el, "--radius-sm"));
      el.rounded = false;
      await elementUpdated(el);
      await expect(getComputedStyle(one(el, ".banner")).borderTopLeftRadius).to.equal("0px");
    });
  });

  describe("Styling", () => {
    it("binds the subtle fill, border and glyph colour per status", async () => {
      const el = await banner();
      const s = () => getComputedStyle(one(el, ".banner"));
      await expect(s().backgroundColor).to.equal(getCssVarColorValue(el, "--feedback-info-background-subtle"));
      await expect(s().borderTopColor).to.equal(getCssVarColorValue(el, "--zebra-border-info"));
      el.status = "warning";
      await elementUpdated(el);
      await expect(s().backgroundColor).to.equal(getCssVarColorValue(el, "--feedback-warning-background-subtle"));
      await expect(s().borderTopColor).to.equal(getCssVarColorValue(el, "--zebra-border-warning"));
      el.status = "neutral";
      await elementUpdated(el);
      await expect(s().borderTopColor).to.equal(getCssVarColorValue(el, "--zebra-border-default"));
    });

    it("fills solid with the strong colour and on-strong text", async () => {
      const el = await banner();
      el.appearance = "solid";
      el.status = "negative";
      await elementUpdated(el);
      const s = getComputedStyle(one(el, ".banner"));
      await expect(s.backgroundColor).to.equal(getCssVarColorValue(el, "--feedback-error-background-strong"));
      await expect(s.borderTopColor).to.equal(s.backgroundColor);
      await expect(getComputedStyle(one(el, ".title")).color).to.equal(getCssVarColorValue(el, "--foreground-on-strong"));
    });

    it("puts the slotted actions in Dark on solid, and takes them back on subtle", async () => {
      const el = await banner();
      const button = el.querySelector("zeta-button")!;
      el.appearance = "solid";
      await elementUpdated(el);
      await expect(button.getAttribute("data-theme")).to.equal("dark");
      el.appearance = "subtle";
      await elementUpdated(el);
      await expect(button.hasAttribute("data-theme")).to.equal(false);
    });
  });

  describe("Interaction", () => {
    it("fires close from the dismiss and stays in place", async () => {
      const el = await banner();
      setTimeout(() => one(el, ".dismiss").click());
      await oneEvent(el, "close");
      await expect(el.isConnected).to.equal(true);
    });
  });
});
