import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import { emulateMedia } from "@web/test-runner-commands";
import type { ZetaProgressBar } from "../../components/progress-indicators/progress-bar/progress-bar.js";
import type { ZetaProgressCircle } from "../../components/progress-indicators/progress-circle/progress-circle.js";
import "../../components/progress-indicators/progress-bar/progress-bar.js";
import "../../components/progress-indicators/progress-circle/progress-circle.js";
import "../../index.css";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const one = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;
const colorOf = (host: Element, token: string) => {
  const probe = document.createElement("div");
  probe.style.color = `var(${token})`;
  host.shadowRoot!.append(probe);
  const c = getComputedStyle(probe).color;
  probe.remove();
  return c;
};

describe("zeta-progress (spec)", () => {
  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
  });

  describe("Accessibility", () => {
    it("reports the bar's value as a progressbar named by its label", async () => {
      const el = await fixture<ZetaProgressBar>(html`<zeta-progress-bar label="Uploading" value="0.25"></zeta-progress-bar>`);
      const bar = one(el, "[role=progressbar]");
      await expect(bar.getAttribute("aria-valuenow")).to.equal("0.25");
      await expect(bar.getAttribute("aria-labelledby")).to.equal("label");
      await expect(el).shadowDom.to.be.accessible();
    });

    it("gives the circle's cancel control a name and keeps it focusable", async () => {
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle size="medium" upload progress="40"></zeta-progress-circle>`);
      await expect(one(el, ".cancel").getAttribute("aria-label")).to.equal("Cancel upload");
      await expect(one(el, "[role=progressbar]").getAttribute("aria-valuenow")).to.equal("40");
      await expect(el).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("shows the buffer band only on a determinate buffering bar, and caps the value at it", async () => {
      const el = await fixture<ZetaProgressBar>(html`<zeta-progress-bar buffering value="0.9" buffer="0.5"></zeta-progress-bar>`);
      expect(one(el, ".buffer")).to.exist;
      await expect(one(el, ".bar").style.width).to.equal("50%");
      el.indeterminate = true;
      await elementUpdated(el);
      expect(one(el, ".buffer")).to.not.exist;
    });

    it("hides the label row until there is a label or trailing content", async () => {
      const el = await fixture<ZetaProgressBar>(html`<zeta-progress-bar></zeta-progress-bar>`);
      expect(one(el, ".label-row").hidden).to.be.true;
      const trailing = document.createElement("span");
      trailing.slot = "trailing";
      trailing.textContent = "2 of 8";
      el.append(trailing);
      await new Promise(r => setTimeout(r));
      await elementUpdated(el);
      expect(one(el, ".label-row").hidden).to.be.false;
    });

    it("builds the upload control from small up, and not below", async () => {
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle size="xsmall" upload></zeta-progress-circle>`);
      expect(one(el, ".uploading")).to.not.exist;
      el.size = "small";
      await elementUpdated(el);
      expect(one(el, ".uploading")).to.exist;
    });
  });

  describe("Dimensions", () => {
    it("draws the bar 8px small and 16px large, with radius/sm and radius/md ends", async () => {
      const el = await fixture<ZetaProgressBar>(html`<zeta-progress-bar size="small" value="0.5"></zeta-progress-bar>`);
      const track = one(el, ".track");
      await expect(track.getBoundingClientRect().height).to.equal(8);
      await expect(getComputedStyle(track).borderTopLeftRadius).to.equal(v(el, "--radius-sm"));
      el.size = "large";
      await elementUpdated(el);
      await expect(track.getBoundingClientRect().height).to.equal(16);
      await expect(getComputedStyle(track).borderTopLeftRadius).to.equal(v(el, "--radius-md"));
    });

    it("defaults to large and keeps medium as its old name", async () => {
      const el = await fixture<ZetaProgressBar>(html`<zeta-progress-bar value="0.5"></zeta-progress-bar>`);
      await expect(el.size).to.equal("large");
      el.size = "medium";
      await elementUpdated(el);
      await expect(one(el, ".track").getBoundingClientRect().height).to.equal(16);
    });

    it("sizes the circle by name, and still takes pixel numbers", async () => {
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle size="large"></zeta-progress-circle>`);
      await expect(one(el, ".container").getBoundingClientRect().width).to.equal(64);
      el.size = 36;
      await elementUpdated(el);
      await expect(one(el, ".container").getBoundingClientRect().width).to.equal(36);
    });
  });

  describe("Styling", () => {
    it("paints the bar's track surface/track and its indicator foreground/link", async () => {
      const el = await fixture<ZetaProgressBar>(html`<zeta-progress-bar value="0.5"></zeta-progress-bar>`);
      await expect(getComputedStyle(one(el, ".track")).backgroundColor).to.equal(colorOf(el, "--surface-track"));
      await expect(getComputedStyle(one(el, ".bar")).backgroundColor).to.equal(colorOf(el, "--foreground-link"));
    });

    it("paints the buffer band surface/shade", async () => {
      const el = await fixture<ZetaProgressBar>(html`<zeta-progress-bar buffering value="0.25" buffer="0.75"></zeta-progress-bar>`);
      await expect(getComputedStyle(one(el, ".buffer")).backgroundColor).to.equal(colorOf(el, "--surface-shade"));
    });

    it("strokes the circle's track border/subtle and arc border/info at stroke/heavy, butt-capped when sharp", async () => {
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle .rounded=${false} progress="50"></zeta-progress-circle>`);
      await elementUpdated(el);
      const arc = one(el, ".arc");
      await expect(one(el, ".track") instanceof SVGCircleElement).to.equal(true);
      await expect(getComputedStyle(one(el, ".track")).stroke).to.equal(colorOf(el, "--zebra-border-subtle"));
      await expect(getComputedStyle(arc).stroke).to.equal(colorOf(el, "--zebra-border-info"));
      await expect(`${arc.getAttribute("stroke-width")}px`).to.equal(v(el, "--stroke-heavy"));
      await expect(arc.getAttribute("stroke-linecap")).to.equal("butt");
    });

    it("hides the track on both with showTrack off", async () => {
      const bar = await fixture<ZetaProgressBar>(html`<zeta-progress-bar .showTrack=${false}></zeta-progress-bar>`);
      await expect(getComputedStyle(one(bar, ".track")).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
      const circle = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle .showTrack=${false}></zeta-progress-circle>`);
      expect(one(circle, ".track")).to.not.exist;
    });
  });

  describe("Interaction", () => {
    it("fires cancelUpload from the circle's cancel button", async () => {
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle size="medium" upload></zeta-progress-circle>`);
      setTimeout(() => one(el, ".cancel").click());
      const e = await oneEvent(el, "cancelUpload");
      expect(e).to.exist;
    });
  });
});
