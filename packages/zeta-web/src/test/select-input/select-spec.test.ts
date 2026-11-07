import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import { emulateMedia, sendMouse, resetMouse } from "@web/test-runner-commands";
import type { ZetaSelectInput } from "../../components/select-input/select-input.js";
import "../../components/select-input/select-input.js";
import "../../components/select-input/option.js";
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
const select = () =>
  fixture<ZetaSelectInput>(
    html`<zeta-select-input label="Field name" hintText="Default hint message"
      ><zeta-option value="1">Option 1</zeta-option><zeta-option value="2">Option 2</zeta-option></zeta-select-input
    >`
  );

describe("zeta-select-input (spec)", () => {
  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
  });
  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("is a combobox named by its label that reports when the listbox is open", async () => {
      const el = await select();
      const field = one(el, ".input");
      await expect(field.getAttribute("role")).to.equal("combobox");
      await expect(field.getAttribute("aria-labelledby")).to.equal("label");
      await expect(field.getAttribute("aria-expanded")).to.equal("false");
      field.click();
      await elementUpdated(el);
      await expect(field.getAttribute("aria-expanded")).to.equal("true");
      await expect(el.querySelector("zeta-option")?.getAttribute("role")).to.equal("option");
    });
  });

  describe("Content", () => {
    it("marks the label optional, adds the information icon and can drop the hint icon", async () => {
      const el = await select();
      el.optional = true;
      el.showInformation = true;
      el.showHintIcon = false;
      await elementUpdated(el);
      await expect(one(el, ".optional").textContent).to.equal("(optional)");
      expect(one(el, ".information")).to.exist;
      expect(one(el, ".hint-icon")).to.not.exist;
    });

    it("shows the sub label under the label and describes the field with it", async () => {
      const el = await select();
      expect(one(el, ".sub-label")).to.not.exist;
      el.subLabel = "Where the order ships to";
      await elementUpdated(el);
      const sub = one(el, ".sub-label");
      await expect(sub.textContent).to.equal("Where the order ships to");
      await expect(one(el, ".input").getAttribute("aria-describedby")).to.equal("sub-label");
      await expect(getComputedStyle(one(el, ".label-group")).rowGap).to.equal(v(el, "--space-xs"));
      await expect(getComputedStyle(sub).color).to.equal(colorOf(el, "--foreground-secondary"));
      el.disabled = true;
      await elementUpdated(el);
      await expect(getComputedStyle(sub).color).to.equal(colorOf(el, "--foreground-disabled"));
    });

    it("puts a trailing check mark on the selected option only", async () => {
      const el = await select();
      el.value = "2";
      el.open = true;
      await elementUpdated(el);
      const [first, second] = Array.from(el.querySelectorAll("zeta-option"));
      await elementUpdated(second);
      const check = second.shadowRoot?.querySelector(".check") as HTMLElement;
      await expect(check.textContent?.trim()).to.equal("check_mark");
      await expect(check.getAttribute("aria-hidden")).to.equal("true");
      const row = second.shadowRoot?.querySelector(".option") as HTMLElement;
      await expect(Math.round(row.getBoundingClientRect().right - check.getBoundingClientRect().right)).to.equal(parseFloat(v(row, "--space-md")));
      await expect(first.shadowRoot?.querySelector(".check")).to.equal(null);
    });
  });

  describe("Dimensions", () => {
    it("keeps its own width whatever value is selected, and fills a width it is given", async () => {
      const box = await fixture<HTMLDivElement>(
        html`<div style="display: flex; flex-direction: column; align-items: flex-start">
          <zeta-select-input
            ><zeta-option value="a">A</zeta-option
            ><zeta-option value="b">A much longer option label that would otherwise widen the field</zeta-option></zeta-select-input
          >
        </div>`
      );
      const el = box.querySelector("zeta-select-input") as ZetaSelectInput;
      await elementUpdated(el);
      const field = () => one(el, ".input").getBoundingClientRect().width;
      const min = 6 * parseFloat(v(el, "--control-sm"));
      await expect(field()).to.equal(min);
      for (const value of ["a", "b"]) {
        el.value = value;
        await elementUpdated(el);
        await expect(field()).to.equal(min);
      }
      box.style.alignItems = "stretch";
      box.style.width = "400px";
      await expect(field()).to.equal(400);
    });

    it("sizes the field from control/sm, control/md and control/lg, and stacks the parts space/2xs apart", async () => {
      const el = await select();
      await expect(`${one(el, ".input").getBoundingClientRect().height}px`).to.equal(v(el, "--control-md"));
      el.size = "large";
      await elementUpdated(el);
      await expect(`${one(el, ".input").getBoundingClientRect().height}px`).to.equal(v(el, "--control-lg"));
      el.size = "small";
      await elementUpdated(el);
      await expect(`${one(el, ".input").getBoundingClientRect().height}px`).to.equal(v(el, "--control-sm"));
      await expect(getComputedStyle(one(el, ".wrapper")).rowGap).to.equal(v(el, "--space-xs"));
    });

    it("opens the options space/2xs below the field, as wide as it", async () => {
      const el = await select();
      one(el, ".input").click();
      await elementUpdated(el);
      const field = one(el, ".input").getBoundingClientRect();
      const options = one(el, ".options").getBoundingClientRect();
      await expect(`${options.top - field.bottom}px`).to.equal(v(el, "--space-2xs"));
      await expect(options.width).to.equal(field.width);
    });
  });

  describe("Styling", () => {
    it("opens on the compact menu with compact: a space/xs inset instead of space/card", async () => {
      const el = await select();
      el.open = true;
      await elementUpdated(el);
      const options = one(el, ".options");
      await expect(getComputedStyle(options).paddingTop).to.equal(v(el, "--space-card"));
      el.compact = true;
      await elementUpdated(el);
      await expect(el.hasAttribute("compact")).to.equal(true);
      await expect(getComputedStyle(options).paddingTop).to.equal(v(el, "--space-xs"));
    });

    it("borders the field on the neutral tokens, border/focus while open and border/error on error", async () => {
      const el = await select();
      const field = one(el, ".input");
      await expect(v(field, "--_border")).to.equal(v(el, "--interactive-neutral-border-default"));
      el.open = true;
      await elementUpdated(el);
      await expect(v(field, "--_border")).to.equal(v(el, "--border-focus"));
      el.open = false;
      el.error = true;
      await elementUpdated(el);
      await expect(v(field, "--_border")).to.equal(v(el, "--border-error"));
    });

    it("rounds the field to a pill with shape full, and drops the border on ghost", async () => {
      const el = await select();
      el.shape = "full";
      el.flavor = "ghost";
      await elementUpdated(el);
      await expect(getComputedStyle(one(el, ".input")).borderTopLeftRadius).to.equal(v(el, "--radius-pill"));
      await expect(v(one(el, ".input"), "--_border-width")).to.equal(v(el, "--stroke-base"));
    });

    it("shows the placeholder on foreground/disabled and a value on foreground/primary", async () => {
      const el = await select();
      await expect(getComputedStyle(one(el, ".input")).color).to.equal(colorOf(el, "--foreground-disabled"));
      one(el, ".input").click();
      await elementUpdated(el);
      (el.querySelector("zeta-option")!.shadowRoot?.querySelector(".option") as HTMLElement).click();
      await elementUpdated(el);
      await expect(getComputedStyle(one(el, ".input")).color).to.equal(colorOf(el, "--foreground-primary"));
    });

    it("sits the options on surface/overlay with ghost-filled rows", async () => {
      const el = await select();
      el.open = true;
      await elementUpdated(el);
      await expect(getComputedStyle(one(el, ".options")).backgroundColor).to.equal(colorOf(el, "--surface-overlay"));
    });
  });

  describe("Interaction", () => {
    it("answers hover on the field with the border alone", async () => {
      const el = await select();
      const r = one(el, ".input").getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
      await expect(v(one(el, ".input"), "--_border")).to.equal(v(el, "--interactive-neutral-border-hover"));
    });

    it("does not open when read-only", async () => {
      const el = await select();
      el.readOnly = true;
      await elementUpdated(el);
      one(el, ".input").click();
      await elementUpdated(el);
      expect(el.open).to.be.false;
    });
  });
});
