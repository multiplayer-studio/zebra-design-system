import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import type { ZetaSwitch } from "../../components/switch/switch.js";
import "../../components/switch/switch.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const part = (el: Element, name: string) => el.shadowRoot?.querySelector(`[part="${name}"]`) as HTMLElement;

describe("zeta-switch (spec)", () => {
  describe("Accessibility", () => {
    it("reports its state from the start and toggles with Space", async () => {
      const el = await fixture<ZetaSwitch>(html`<zeta-switch checked aria-label="Wi-Fi"></zeta-switch>`);
      await expect(el.matches(":state(checked)") || el.checked).to.equal(true);
      part(el, "track").focus();
      await sendKeys({ press: "Space" });
      await elementUpdated(el);
      await expect(el.checked).to.equal(false);
    });
  });

  describe("Dimensions", () => {
    it("is a 64 by 32 track with a control/xs thumb that travels 32", async () => {
      const el = await fixture<ZetaSwitch>(html`<zeta-switch></zeta-switch>`);
      const track = part(el, "track").getBoundingClientRect();
      await expect([track.width, track.height]).to.deep.equal([64, 32]);
      const thumb = part(el, "thumb");
      await expect(`${thumb.getBoundingClientRect().width}px`).to.equal(v(el, "--control-xs"));
      const off = thumb.getBoundingClientRect().left;
      await expect(off - track.left).to.equal(parseFloat(v(el, "--space-2xs")));
      el.checked = true;
      await elementUpdated(el);
      thumb.getAnimations().forEach(a => a.finish());
      await expect(Math.round(thumb.getBoundingClientRect().left - off)).to.equal(32);
    });
  });

  describe("Styling", () => {
    it("moves the track to the pressed selection token when on, leaving the thumb alone", async () => {
      const el = await fixture<ZetaSwitch>(html`<zeta-switch checked></zeta-switch>`);
      part(el, "track")
        .getAnimations()
        .forEach(a => a.finish());
      await expect(getComputedStyle(part(el, "track")).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-selection-background-pressed"));
      await expect(getComputedStyle(part(el, "thumb")).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-primary-foreground-default"));
    });

    it("rings the track outside on keyboard focus", async () => {
      const el = await fixture<ZetaSwitch>(html`<zeta-switch></zeta-switch>`);
      part(el, "track").focus();
      await sendKeys({ press: "Shift" });
      const s = getComputedStyle(part(el, "track"));
      await expect(s.outlineWidth).to.equal(v(el, "--stroke-thick"));
      await expect(s.outlineColor).to.equal(getCssVarColorValue(el, "--border-focus"));
    });
  });
});
