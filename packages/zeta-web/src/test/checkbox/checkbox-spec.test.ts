import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import { emulateMedia, sendMouse, resetMouse } from "@web/test-runner-commands";
import type { ZetaCheckbox } from "../../components/checkbox/checkbox.js";
import "../../components/checkbox/checkbox.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

describe("zeta-checkbox (spec)", () => {
  let el: ZetaCheckbox;
  const box = () => el.shadowRoot?.querySelector(".container") as HTMLElement;
  const paint = () => {
    const s = getComputedStyle(box());
    return { border: s.borderTopColor, fill: s.backgroundColor };
  };
  const hover = async () => {
    const r = box().getBoundingClientRect();
    await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
  };

  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
    el = await fixture<ZetaCheckbox>(html`<zeta-checkbox>Label</zeta-checkbox>`);
  });

  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("meets contrast requirements for the label", async () => {
      const surface = await fixture<HTMLDivElement>(html`<div style="background: var(--surface-default)"><zeta-checkbox>Label</zeta-checkbox></div>`);
      const cb = surface.querySelector("zeta-checkbox") as ZetaCheckbox;
      await cb.updateComplete;
      await contrastTest("Checkbox label", cb.shadowRoot?.querySelector("label") as HTMLElement, surface, { highContrast: false });
    });
  });

  describe("Dimensions", () => {
    it("centres a control/icon-sm box at medium and control/xs at large in a control/target-min target", async () => {
      await expect(`${box().getBoundingClientRect().width}px`).to.equal(v(el, "--control-icon-sm"));
      await expect(`${el.getBoundingClientRect().height}px`).to.equal(v(el, "--control-target-min"));
      el.size = "large";
      await elementUpdated(el);
      await expect(`${box().getBoundingClientRect().width}px`).to.equal(v(el, "--control-xs"));
      await expect(`${el.getBoundingClientRect().height}px`).to.equal(v(el, "--control-target-min"));
    });

    it("rounds by radius/xs at medium and radius/element-sm at large", async () => {
      await expect(getComputedStyle(box()).borderTopLeftRadius).to.equal(v(el, "--radius-xs"));
      el.size = "large";
      await elementUpdated(el);
      await expect(getComputedStyle(box()).borderTopLeftRadius).to.equal(v(el, "--radius-element-sm"));
    });
  });

  describe("Styling", () => {
    it("draws unchecked with a selection border and no fill", async () => {
      await expect(paint().border).to.equal(getCssVarColorValue(el, "--interactive-selection-border-default"));
      await expect(paint().fill).to.equal("rgba(0, 0, 0, 0)");
      await expect(getComputedStyle(box()).borderTopWidth).to.equal(v(el, "--stroke-thick"));
    });

    for (const attr of ["checked", "indeterminate"] as const) {
      it(`fills ${attr} with the pressed selection tokens and an on-strong mark`, async () => {
        el[attr] = true;
        await elementUpdated(el);
        await expect(paint().fill).to.equal(getCssVarColorValue(el, "--interactive-selection-background-pressed"));
        await expect(paint().border).to.equal(getCssVarColorValue(el, "--interactive-selection-border-pressed"));
        const mark = el.shadowRoot?.querySelector("[part='icon']") as HTMLElement;
        await expect(mark.textContent?.trim()).to.equal(attr === "checked" ? "check_mark" : "remove");
        await expect(getComputedStyle(mark).color).to.equal(getCssVarColorValue(el, "--foreground-on-strong"));
      });
    }

    it("keeps the mark and moves to the disabled tokens when disabled", async () => {
      el.checked = true;
      el.disabled = true;
      await elementUpdated(el);
      await expect(paint().fill).to.equal(getCssVarColorValue(el, "--interactive-selection-background-disabled"));
      await expect(paint().border).to.equal(getCssVarColorValue(el, "--interactive-selection-border-disabled"));
      const mark = el.shadowRoot?.querySelector("[part='icon']") as HTMLElement;
      await expect(getComputedStyle(mark).display).to.not.equal("none");
      await expect(getComputedStyle(mark).color).to.equal(getCssVarColorValue(el, "--foreground-disabled"));
      await expect(getComputedStyle(el.shadowRoot?.querySelector("label") as HTMLElement).color).to.equal(getCssVarColorValue(el, "--foreground-disabled"));
    });

    it("draws disabled unchecked with no fill", async () => {
      el.disabled = true;
      await elementUpdated(el);
      await expect(paint().fill).to.equal("rgba(0, 0, 0, 0)");
    });
  });

  describe("Interaction", () => {
    it("answers hover with the border, and the fill once checked", async () => {
      await hover();
      await expect(paint().border).to.equal(getCssVarColorValue(el, "--interactive-selection-border-hover"));
      el.checked = true;
      await elementUpdated(el);
      await hover();
      await expect(paint().fill).to.equal(getCssVarColorValue(el, "--interactive-selection-background-hover"));
      await expect(paint().border).to.equal(getCssVarColorValue(el, "--interactive-selection-border-hover"));
    });
  });
});
