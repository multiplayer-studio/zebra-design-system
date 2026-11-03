import { fixture, html, expect, elementUpdated, aTimeout } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import sinon from "sinon";
import type { ZetaDroppable } from "../../components/dropdown/droppable.js";
import type { ZetaTextInput } from "../../components/text-input/text-input.js";
import { PHONE_COUNTRIES, type ZetaPhoneInput } from "../../components/phone-input/phone-input.js";
import "../../components/phone-input/phone-input.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const token = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

describe("zeta-phone-input", () => {
  let subject: ZetaPhoneInput;

  const createComponent = () =>
    fixture<ZetaPhoneInput>(
      html`<zeta-phone-input label="Phone number" hintText="For delivery updates" errorText="Enter a valid number" value="8006535350"></zeta-phone-input>`
    );

  const number = () => subject.shadowRoot?.querySelector("zeta-text-input") as ZetaTextInput;
  const input = () => number().shadowRoot?.querySelector("input") as HTMLInputElement;
  const field = () => number().shadowRoot?.querySelector(".input-container") as HTMLElement;
  const country = () => subject.shadowRoot?.querySelector("#country") as HTMLButtonElement;
  const droppable = () => subject.shadowRoot?.querySelector("zeta-droppable") as ZetaDroppable;
  const rows = () => [...(subject.shadowRoot?.querySelectorAll("zeta-dropdown-menu-item") ?? [])];
  const settle = async () => {
    await elementUpdated(subject);
    await elementUpdated(number());
    await aTimeout(0);
  };
  const type = async (text: string, caret: number) => {
    const el = input();
    el.value = text;
    el.setSelectionRange(caret, caret);
    el.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    await settle();
  };
  const openMenu = async () => {
    country().click();
    await settle();
  };

  beforeEach(async () => {
    subject = await createComponent();
    await settle();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("names the country control with the selected country", () => {
      expect(country().getAttribute("aria-label")).to.equal("Country code: United States, +1");
    });

    it("reports the menu on the country control", async () => {
      expect(country().getAttribute("aria-expanded")).to.equal("false");
      await openMenu();
      expect(country().getAttribute("aria-expanded")).to.equal("true");
      expect(country().getAttribute("aria-haspopup")).to.equal("menu");
    });

    it("names the number and describes it with the hint", () => {
      expect(input().getAttribute("aria-label")).to.equal("Phone number");
      expect(input().getAttribute("aria-description")).to.equal("For delivery updates");
    });

    it("asks for a phone keyboard and phone autofill", () => {
      expect(input().getAttribute("inputmode")).to.equal("tel");
      expect(input().getAttribute("autocomplete")).to.equal("tel-national");
    });

    it("reports an error on the number", async () => {
      subject.error = true;
      await settle();
      expect(input().getAttribute("aria-invalid")).to.equal("true");
      expect(input().getAttribute("aria-description")).to.equal("Enter a valid number");
    });

    it("moves focus to the selected row when the menu opens", async () => {
      subject.country = "GB";
      await settle();
      await openMenu();
      await aTimeout(0);
      expect(subject.shadowRoot?.activeElement).to.equal(rows()[2]);
    });

    it("moves through the rows with the arrow keys", async () => {
      await openMenu();
      await aTimeout(0);
      await sendKeys({ press: "ArrowDown" });
      expect(subject.shadowRoot?.activeElement).to.equal(rows()[1]);
      await sendKeys({ press: "End" });
      expect(subject.shadowRoot?.activeElement).to.equal(rows()[rows().length - 1]);
    });

    it("closes on Escape and returns focus to the country control", async () => {
      await openMenu();
      await aTimeout(0);
      await sendKeys({ press: "Escape" });
      await settle();
      expect(droppable().open).to.equal(false);
      expect(subject.shadowRoot?.activeElement).to.equal(country());
    });
  });

  describe("Content", () => {
    it("shows the label and hint", () => {
      expect(subject.shadowRoot?.querySelector(".label")?.textContent).to.contain("Phone number");
      expect(subject.shadowRoot?.querySelector(".hint-text")?.textContent).to.contain("For delivery updates");
    });

    it("hides the label and hint when empty", async () => {
      subject.label = "";
      subject.hintText = undefined;
      await settle();
      expect(subject.shadowRoot?.querySelector(".label")).to.equal(null);
      expect(subject.shadowRoot?.querySelector(".hint-text")).to.equal(null);
    });

    it("draws one hint, with the error replacing it", async () => {
      subject.error = true;
      await settle();
      expect(subject.shadowRoot?.querySelector(".hint-text")?.textContent).to.contain("Enter a valid number");
      expect(number().shadowRoot?.querySelector(".hint-text")).to.equal(null);
    });

    it("marks the label required or optional", async () => {
      subject.required = true;
      await settle();
      expect(subject.shadowRoot?.querySelector(".required")).to.not.equal(null);
      subject.required = false;
      subject.optional = true;
      await settle();
      expect(subject.shadowRoot?.querySelector(".optional")?.textContent).to.equal("(optional)");
    });

    it("shows the dial code and groups the number", () => {
      expect(number().prefix).to.equal("+ 1");
      expect(input().value).to.equal("(800)653-5350");
    });

    it("lists every country with its dial code", async () => {
      await openMenu();
      expect(rows().length).to.equal(PHONE_COUNTRIES.length);
      expect(rows()[2].textContent).to.contain("United Kingdom").and.to.contain("+44");
    });

    it("marks the selected country in the menu", async () => {
      await openMenu();
      expect(rows()[0].selected).to.equal(true);
      expect(rows()[1].selected).to.equal(false);
    });

    it("draws real flag artwork when a country has it", async () => {
      subject.countries = [{ code: "NG", name: "Nigeria", dialCode: "234", flag: html`<img alt="" src="data:," />` }];
      subject.country = "NG";
      await settle();
      expect(country().querySelector(".flag img")).to.not.equal(null);
    });

    it("falls back to the system emoji flag", () => {
      expect(country().querySelector(".flag")?.textContent).to.equal("🇺🇸");
    });

    it("leaves a country with no format ungrouped", async () => {
      subject.country = "DE";
      await settle();
      expect(input().value).to.equal("8006535350");
    });
  });

  describe("Interaction", () => {
    it("groups digits and gives the value in E.164", async () => {
      const spy = sinon.spy();
      subject.addEventListener("value-change", spy);
      await type("(800)653-53501", 14);
      expect(subject.value).to.equal("8006535350");
      await type("(800)653-535", 12);
      expect(input().value).to.equal("(800)653-535");
      const detail = (spy.lastCall.args[0] as CustomEvent).detail as { value: string; e164: string; country: { code: string } };
      expect(detail.value).to.equal("800653535");
      expect(detail.e164).to.equal("+1800653535");
      expect(detail.country.code).to.equal("US");
    });

    it("drops anything that isn't a digit", async () => {
      await type("(800)653-53a", 12);
      expect(subject.value).to.equal("80065353");
      expect(input().value).to.equal("(800)653-53");
    });

    it("keeps the caret on the same digit after regrouping", async () => {
      await type("(8900)653-5350", 3);
      expect(input().selectionStart).to.equal(3);
    });

    it("takes the digit in front of a separator on backspace", async () => {
      await type("(800653-5350", 4);
      expect(subject.value).to.equal("806535350");
      expect(input().value).to.equal("(806)535-350");
    });

    it("picks a country, closes the menu and fires country-change", async () => {
      const spy = sinon.spy();
      subject.addEventListener("country-change", spy);
      await openMenu();
      rows()[2].click();
      await settle();
      expect(subject.country).to.equal("GB");
      expect(droppable().open).to.equal(false);
      expect(input().value).to.equal("8006 535350");
      expect(subject.e164).to.equal("+448006535350");
      expect(((spy.firstCall.args[0] as CustomEvent).detail as { country: { code: string } }).country.code).to.equal("GB");
    });

    it("does not fire country-change for the country already selected", async () => {
      const spy = sinon.spy();
      subject.addEventListener("country-change", spy);
      await openMenu();
      rows()[0].click();
      await settle();
      expect(spy.called).to.equal(false);
    });

    it("trims digits a new country has no room for", async () => {
      subject.value = "80065353501234";
      subject.country = "DE";
      await settle();
      await openMenu();
      rows()[11].click();
      await settle();
      expect(subject.country).to.equal("AU");
      expect(subject.value.length).to.equal(9);
    });

    it("closes on an outside click", async () => {
      await openMenu();
      document.body.click();
      await settle();
      expect(droppable().open).to.equal(false);
    });

    it("does not open while disabled", async () => {
      subject.disabled = true;
      await settle();
      country().click();
      await settle();
      expect(droppable().open).to.equal(false);
      expect(number().disabled).to.equal(true);
    });

    it("submits E.164 under name and resets", async () => {
      const form = await fixture<HTMLFormElement>(html`<form><zeta-phone-input name="phone" value="8006535350"></zeta-phone-input></form>`);
      const inner = form.querySelector("zeta-phone-input") as ZetaPhoneInput;
      await elementUpdated(inner);
      expect(new FormData(form).get("phone")).to.equal("+18006535350");
      inner.value = "212";
      await elementUpdated(inner);
      form.reset();
      await elementUpdated(inner);
      expect(inner.value).to.equal("8006535350");
    });

    it("blocks a form while a required number is empty", async () => {
      subject.required = true;
      subject.value = "";
      await settle();
      expect((subject as unknown as { internals: ElementInternals }).internals.validity.valueMissing).to.equal(true);
    });

    it("focuses the number", async () => {
      subject.focus();
      await settle();
      expect(number().shadowRoot?.activeElement).to.equal(input());
    });
  });

  describe("Dimensions", () => {
    it("follows size", async () => {
      for (const [size, name] of [
        ["small", "--control-sm"],
        ["medium", "--control-md"],
        ["large", "--control-lg"]
      ] as const) {
        subject.size = size;
        await settle();
        expect(getComputedStyle(country()).height).to.equal(token(subject, name));
        expect(getComputedStyle(field()).height).to.equal(token(subject, name));
      }
    });

    it("shares the corner between the country control's start and the number's end", async () => {
      subject.shape = "full";
      await settle();
      const radius = token(subject, "--radius-pill");
      expect(getComputedStyle(country()).borderStartStartRadius).to.equal(radius);
      expect(getComputedStyle(country()).borderEndStartRadius).to.equal(radius);
      expect(getComputedStyle(field()).borderStartEndRadius).to.equal(radius);
      expect(getComputedStyle(field()).borderStartStartRadius).to.equal("0px");
    });

    it("fills its container with block", async () => {
      const wrapper = await fixture<HTMLElement>(html`<div style="width: 480px;"><zeta-phone-input block></zeta-phone-input></div>`);
      expect(wrapper.querySelector("zeta-phone-input")?.getBoundingClientRect().width).to.equal(480);
    });

    it("draws no border between the two parts", () => {
      expect(getComputedStyle(country()).borderInlineEndStyle).to.equal("none");
    });
  });

  describe("Styling", () => {
    it("draws the country control from the neutral tokens", () => {
      expect(getComputedStyle(country()).backgroundColor).to.equal(getCssVarColorValue(country(), "--interactive-neutral-background-default"));
      expect(getComputedStyle(country()).borderBlockStartColor).to.equal(getCssVarColorValue(country(), "--interactive-neutral-border-default"));
    });

    it("sets the dial code in the value's colour", () => {
      const prefix = number().shadowRoot?.querySelector(".affix") as HTMLElement;
      expect(getComputedStyle(prefix).color).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
    });

    it("fills and outlines the number on error, leaving the country control neutral", async () => {
      subject.error = true;
      await settle();
      expect(getComputedStyle(field()).backgroundColor).to.equal(getCssVarColorValue(subject, "--feedback-error-background-subtle"));
      expect(getComputedStyle(field()).boxShadow).to.contain(token(subject, "--stroke-thick"));
      expect(getComputedStyle(country()).backgroundColor).to.equal(getCssVarColorValue(country(), "--interactive-neutral-background-default"));
    });

    it("keeps the error while the number is focused", async () => {
      subject.error = true;
      await settle();
      input().focus();
      await settle();
      expect(getComputedStyle(field()).boxShadow).to.contain(token(subject, "--stroke-thick"));
      expect(getComputedStyle(field()).outlineStyle).to.equal("none");
    });

    it("starts the gradient on the country control", async () => {
      subject.flavor = "gradient";
      await settle();
      expect(getComputedStyle(country()).borderBlockStartColor).to.equal(getCssVarColorValue(subject, "--foreground-gradient-start"));
      expect(number().flavor).to.equal("gradient");
    });

    it("drops the gradient on error", async () => {
      subject.flavor = "gradient";
      subject.error = true;
      await settle();
      expect(number().flavor).to.equal("default");
    });

    it("clears the surface in ghost", async () => {
      subject.flavor = "ghost";
      await settle();
      expect(getComputedStyle(country()).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
    });

    it("draws disabled from the disabled tokens", async () => {
      subject.disabled = true;
      await settle();
      expect(getComputedStyle(country()).backgroundColor).to.equal(getCssVarColorValue(country(), "--interactive-neutral-background-disabled"));
      const prefix = number().shadowRoot?.querySelector(".affix") as HTMLElement;
      expect(getComputedStyle(prefix).color).to.equal(getCssVarColorValue(subject, "--foreground-disabled"));
    });

    it("passes size, shape and flavor to the number", async () => {
      subject.size = "large";
      subject.shape = "sharp";
      subject.flavor = "ghost";
      await settle();
      expect(number().size).to.equal("large");
      expect(number().shape).to.equal("sharp");
      expect(number().flavor).to.equal("ghost");
    });
  });
});
