import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import { emulateMedia, sendKeys, sendMouse, resetMouse } from "@web/test-runner-commands";
import type { ZetaSegmentedControl } from "../../components/segmented-control/segmented-control.js";
import "../../components/segmented-control/segmented-control.js";
import "../../components/icon/icon.js";
import "../../index.css";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const colorOf = (host: Element, token: string) => {
  const probe = document.createElement("div");
  probe.style.color = `var(${token})`;
  host.shadowRoot!.append(probe);
  const c = getComputedStyle(probe).color;
  probe.remove();
  return c;
};
const control = () =>
  fixture<ZetaSegmentedControl>(
    html`<zeta-segmented-control aria-label="View"
      ><zeta-segmented-item>Day</zeta-segmented-item><zeta-segmented-item active>Week</zeta-segmented-item
      ><zeta-segmented-item>Month</zeta-segmented-item></zeta-segmented-control
    >`
  );

describe("zeta-segmented-control (spec)", () => {
  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
  });
  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("is a radio group with one checked radio and one tab stop", async () => {
      const el = await control();
      await expect(el.getAttribute("role")).to.equal("radiogroup");
      await expect(el.items.map(i => i.getAttribute("aria-checked"))).to.deep.equal(["false", "true", "false"]);
      await expect(el.items.map(i => i.tabIndex)).to.deep.equal([-1, 0, -1]);
      await expect(el).to.be.accessible();
    });
  });

  describe("Content", () => {
    it("passes rounded and flavor to every segment", async () => {
      const el = await control();
      el.rounded = false;
      el.flavor = "text-only";
      await elementUpdated(el);
      await expect(el.items.every(i => !i.rounded && i.flavor === "text-only")).to.equal(true);
    });
  });

  describe("Dimensions", () => {
    it("pads the track space/2xs and a segment space/md to space/lg, both sides space/lg for one part", async () => {
      const el = await control();
      const track = el.shadowRoot?.querySelector(".track") as HTMLElement;
      await expect(getComputedStyle(track).paddingTop).to.equal(v(el, "--space-2xs"));
      const segment = el.items[0].shadowRoot?.querySelector(".segment") as HTMLElement;
      await expect(getComputedStyle(segment).paddingLeft).to.equal(v(el, "--space-md"));
      await expect(getComputedStyle(segment).paddingRight).to.equal(v(el, "--space-lg"));
      expect(segment.getBoundingClientRect().height).to.be.at.least(parseFloat(v(el, "--control-sm")));
      el.flavor = "text-only";
      await elementUpdated(el);
      await elementUpdated(el.items[0]);
      await expect(getComputedStyle(segment).paddingLeft).to.equal(v(el, "--space-lg"));
    });
  });

  describe("Styling", () => {
    it("lays the indicator over the active segment on the focused fill, on a pressed track", async () => {
      const el = await control();
      await new Promise(r => requestAnimationFrame(r));
      const indicator = el.shadowRoot?.querySelector(".indicator") as HTMLElement;
      const track = el.shadowRoot?.querySelector(".track") as HTMLElement;
      await expect(getComputedStyle(indicator).backgroundColor).to.equal(colorOf(el, "--interactive-neutral-background-focused"));
      await expect(getComputedStyle(track).backgroundColor).to.equal(colorOf(el, "--interactive-neutral-background-pressed"));
      await expect(Math.round(indicator.getBoundingClientRect().left)).to.equal(Math.round(el.items[1].getBoundingClientRect().left));
      await expect(Math.round(indicator.getBoundingClientRect().width)).to.equal(Math.round(el.items[1].getBoundingClientRect().width));
    });

    it("sets labels on foreground/secondary and the active one on foreground/primary", async () => {
      const el = await control();
      const label = (i: number) => getComputedStyle(el.items[i].shadowRoot?.querySelector(".segment") as HTMLElement).color;
      await expect(label(0)).to.equal(colorOf(el, "--foreground-secondary"));
      await expect(label(1)).to.equal(colorOf(el, "--foreground-primary"));
    });
  });

  describe("Interaction", () => {
    it("moves the choice with the arrow keys", async () => {
      const el = await control();
      el.items[1].focus();
      await sendKeys({ press: "ArrowRight" });
      await elementUpdated(el);
      await expect(el.activeItem).to.equal(el.items[2]);
      await sendKeys({ press: "ArrowRight" });
      await elementUpdated(el);
      await expect(el.activeItem).to.equal(el.items[0]);
    });

    it("lifts a hovered label to foreground/primary with no fill", async () => {
      const el = await control();
      const segment = el.items[0].shadowRoot?.querySelector(".segment") as HTMLElement;
      const r = segment.getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
      await expect(getComputedStyle(segment).color).to.equal(colorOf(el, "--foreground-primary"));
      await expect(getComputedStyle(segment).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
    });
  });
});
