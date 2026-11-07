import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import { emulateMedia, sendMouse, resetMouse } from "@web/test-runner-commands";
import type { ZetaTextInput } from "../../components/text-input/text-input.js";
import "../../components/text-input/text-input.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

describe("zeta-text-input (spec)", () => {
  let el: ZetaTextInput;
  const field = () => el.shadowRoot?.querySelector(".input-container") as HTMLElement;
  const shadowColor = () => getComputedStyle(field()).boxShadow;

  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
    el = await fixture<ZetaTextInput>(html`<zeta-text-input label="Email" placeholder="name@example.com" hintText="We never share it"></zeta-text-input>`);
  });
  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("meets contrast requirements for label, value and hint", async () => {
      const surface = await fixture<HTMLDivElement>(
        html`<div style="background: var(--surface-default)">
          <zeta-text-input label="Email" value="a@b.c" hintText="Hint"></zeta-text-input>
        </div>`
      );
      const input = surface.querySelector("zeta-text-input") as ZetaTextInput;
      await input.updateComplete;
      await contrastTest("Input label", input.shadowRoot?.querySelector(".label") as HTMLElement, surface, { highContrast: false });
      await contrastTest("Input value", input.shadowRoot?.querySelector("input") as HTMLElement, surface, { highContrast: false });
      await contrastTest("Input hint", input.shadowRoot?.querySelector(".hint-text") as HTMLElement, surface, { highContrast: false });
    });
  });

  describe("Content", () => {
    it("marks required and optional, and adds the information icon", async () => {
      el.required = true;
      el.showInformation = true;
      await elementUpdated(el);
      await expect(el.shadowRoot?.querySelector(".required")?.textContent).to.equal("*");
      expect(el.shadowRoot?.querySelector(".information")).to.exist;
      el.required = false;
      el.optional = true;
      await elementUpdated(el);
      await expect(el.shadowRoot?.querySelector(".optional")?.textContent).to.equal("(optional)");
    });

    it("shows the sub label under the label as the field's description, not its name", async () => {
      expect(el.shadowRoot?.querySelector(".sub-label")).to.not.exist;
      el.subLabel = "Used for receipts";
      await elementUpdated(el);
      const sub = el.shadowRoot?.querySelector(".sub-label") as HTMLElement;
      await expect(sub.textContent).to.equal("Used for receipts");
      await expect(sub.getAttribute("aria-hidden")).to.equal("true");
      await expect(el.shadowRoot?.querySelector("input")?.getAttribute("aria-description")).to.equal("Used for receipts");
      await expect(getComputedStyle(el.shadowRoot?.querySelector(".label-group") as HTMLElement).rowGap).to.equal(v(el, "--space-xs"));
      el.subLabel = "";
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector("input")?.hasAttribute("aria-description")).to.be.false;
    });

    it("drops the hint icon when showHintIcon is off", async () => {
      el.showHintIcon = false;
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector(".hint-text zeta-icon")).to.not.exist;
    });
  });

  describe("Dimensions", () => {
    it("fills its container when block is set", async () => {
      const wrap = await fixture<HTMLDivElement>(html`<div style="width: 600px"><zeta-text-input block></zeta-text-input></div>`);
      const input = wrap.firstElementChild as ZetaTextInput;
      await expect(input.getBoundingClientRect().width).to.equal(600);
      await expect(input.shadowRoot?.querySelector(".input-container")?.getBoundingClientRect().width).to.equal(600);
    });

    it("sizes the field from control/sm, md and lg", async () => {
      for (const [size, token] of [
        ["small", "--control-sm"],
        ["medium", "--control-md"],
        ["large", "--control-lg"]
      ] as const) {
        el.size = size;
        await elementUpdated(el);
        await expect(`${field().getBoundingClientRect().height}px`).to.equal(v(el, token));
      }
    });

    it("pads the field space/sm by space/md and spaces the stack by space/xs", async () => {
      await expect(getComputedStyle(field()).paddingLeft).to.equal(v(el, "--space-md"));
      await expect(getComputedStyle(field()).paddingTop).to.equal(v(el, "--space-sm"));
      await expect(getComputedStyle(el.shadowRoot?.querySelector(".container") as HTMLElement).rowGap).to.equal(v(el, "--space-xs"));
    });

    it("rounds by shape: none, radius/sm, pill", async () => {
      el.shape = "sharp";
      await elementUpdated(el);
      await expect(getComputedStyle(field()).borderTopLeftRadius).to.equal("0px");
      el.shape = "rounded";
      await elementUpdated(el);
      await expect(getComputedStyle(field()).borderTopLeftRadius).to.equal(v(el, "--radius-sm"));
      el.shape = "full";
      await elementUpdated(el);
      await expect(getComputedStyle(field()).borderTopLeftRadius).to.equal(v(el, "--radius-pill"));
    });
  });

  describe("Styling", () => {
    it("sets the label in label/medium and the hint in body/xsmall secondary", async () => {
      await expect(getComputedStyle(el.shadowRoot?.querySelector(".label") as HTMLElement).fontSize).to.equal(v(el, "--label-medium-font-size"));
      const hint = getComputedStyle(el.shadowRoot?.querySelector(".hint-text") as HTMLElement);
      await expect(hint.fontSize).to.equal(v(el, "--body-xsmall-font-size"));
      await expect(hint.color).to.equal(getCssVarColorValue(el, "--foreground-secondary"));
    });

    it("draws the default field on the neutral tokens", async () => {
      await expect(getComputedStyle(field()).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-background-default"));
      expect(shadowColor()).to.include(getCssVarColorValue(el, "--interactive-neutral-border-default"));
    });

    it("draws invalid with a border/error border and an error hint, keeping the neutral fill", async () => {
      el.error = true;
      el.errorText = "Enter an email";
      await elementUpdated(el);
      expect(shadowColor()).to.include(getCssVarColorValue(el, "--border-error"));
      await expect(getComputedStyle(field()).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-background-default"));
      await expect(getComputedStyle(el.shadowRoot?.querySelector(".hint-text") as HTMLElement).color).to.equal(getCssVarColorValue(el, "--foreground-error"));
    });

    it("draws disabled on the disabled tokens throughout", async () => {
      el.disabled = true;
      await elementUpdated(el);
      await expect(getComputedStyle(field()).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-background-disabled"));
      await expect(getComputedStyle(el.shadowRoot?.querySelector(".label") as HTMLElement).color).to.equal(getCssVarColorValue(el, "--foreground-disabled"));
      await expect(getComputedStyle(el.shadowRoot?.querySelector(".hint-text") as HTMLElement).color).to.equal(
        getCssVarColorValue(el, "--foreground-disabled")
      );
    });

    it("draws read-only with a border/subtle border", async () => {
      el.readOnly = true;
      await elementUpdated(el);
      expect(shadowColor()).to.include(getCssVarColorValue(el, "--border-subtle"));
    });

    it("draws ghost with no fill and gradient with a gradient border", async () => {
      el.flavor = "ghost";
      await elementUpdated(el);
      await expect(getComputedStyle(field()).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
      el.flavor = "gradient";
      await elementUpdated(el);
      expect(getComputedStyle(field()).backgroundImage).to.contain("linear-gradient");
    });
  });

  describe("Interaction", () => {
    it("answers hover with the hover border, and focus with a border/focus ring", async () => {
      const r = field().getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
      expect(shadowColor()).to.include(getCssVarColorValue(el, "--interactive-neutral-border-hover"));
      el.focus();
      await elementUpdated(el);
      const style = getComputedStyle(field());
      await expect(style.outlineColor).to.equal(getCssVarColorValue(el, "--border-focus"));
      await expect(style.outlineWidth).to.equal(v(el, "--stroke-thick"));
    });
  });
});
