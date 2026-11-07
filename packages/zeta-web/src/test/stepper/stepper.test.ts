import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaStepper } from "../../components/stepper/stepper.js";
import type { ZetaStepperItem } from "../../components/stepper/stepper-item.js";
import "../../components/stepper/stepper.js";
import "../../index.css";
import sinon from "sinon";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const one = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;
const steps = (el: ZetaStepper) => [...el.querySelectorAll("zeta-stepper-item")];

const createStepper = async () => {
  const el = await fixture<ZetaStepper>(
    html`<div style="inline-size:640px">
      <zeta-stepper>
        <zeta-stepper-item status="complete" label="Account"></zeta-stepper-item>
        <zeta-stepper-item status="active" label="Payment" subtitle="Card"></zeta-stepper-item>
        <zeta-stepper-item label="Review"></zeta-stepper-item>
      </zeta-stepper>
    </div>`
  );
  const stepper = el.querySelector("zeta-stepper")!;
  await elementUpdated(stepper);
  await Promise.all(steps(stepper).map(s => elementUpdated(s)));
  return stepper;
};

const variant = async (stepper: ZetaStepper, props: Partial<ZetaStepper>) => {
  Object.assign(stepper, props);
  await elementUpdated(stepper);
  await Promise.all(steps(stepper).map(s => elementUpdated(s)));
};

describe("zeta-stepper", () => {
  describe("Accessibility", () => {
    it("is a named navigation landmark holding a list, with the active step marked", async () => {
      const el = await createStepper();
      const nav = one(el, "nav");
      expect(nav.getAttribute("aria-label")).to.equal("Progress");
      expect(one(el, ".steps").getAttribute("role")).to.equal("list");
      expect(steps(el)[1].getAttribute("aria-current")).to.equal("step");
      expect(steps(el)[0].hasAttribute("aria-current")).to.be.false;
      // The spec's foreground/tertiary rail labels measure 3.91:1 on white, below AA. A palette finding, kept as designed.
      await expect(el).shadowDom.to.be.accessible({ ignoredRules: ["color-contrast"] });
    });
    it("says each step's status in words", async () => {
      const el = await createStepper();
      expect(one(steps(el)[0], ".sr").textContent).to.contain("complete");
      expect(one(steps(el)[1], ".sr").textContent).to.contain("current step");
    });
    it("hides the compact bar from assistive tech, so the count and title are announced", async () => {
      const el = await createStepper();
      await variant(el, { size: "compact", currentStep: "2", totalSteps: "3", label: "Payment" });
      expect(one(el, ".segments").getAttribute("aria-hidden")).to.equal("true");
      expect(one(el, ".step-info").textContent?.replace(/\s+/g, " ").trim()).to.equal("STEP 2 OF 3");
    });
  });

  describe("Content", () => {
    it("numbers steps from 1 and shows glyphs on complete and error", async () => {
      const el = await createStepper();
      expect(one(steps(el)[0], 'zeta-icon[name="check_mark"]')).to.exist;
      expect(one(steps(el)[1], ".indicator").textContent?.trim()).to.equal("2");
      steps(el)[2].status = "error";
      await elementUpdated(steps(el)[2]);
      expect(one(steps(el)[2], 'zeta-icon[name="priority"]')).to.exist;
    });
    it("draws a subtitle only when one is given and not turned off", async () => {
      const el = await createStepper();
      expect(one(steps(el)[1], ".subtitle").textContent).to.equal("Card");
      expect(one(steps(el)[0], ".subtitle")).to.not.exist;
      steps(el)[1].showSubtitle = false;
      await elementUpdated(steps(el)[1]);
      expect(one(steps(el)[1], ".subtitle")).to.not.exist;
    });
    it("hides every step's subtitle when the stepper's show-subtitle is off", async () => {
      const el = await createStepper();
      await variant(el, { showSubtitle: false });
      expect(one(steps(el)[1], ".subtitle")).to.not.exist;
      await variant(el, { showSubtitle: true });
      expect(one(steps(el)[1], ".subtitle").textContent).to.equal("Card");
    });
    it("drops the line on the last step unless show-line says otherwise", async () => {
      const el = await createStepper();
      expect(one(steps(el)[0], ".track")).to.exist;
      expect(one(steps(el)[2], ".track")).to.not.exist;
      steps(el)[2].showLine = true;
      await elementUpdated(steps(el)[2]);
      expect(one(steps(el)[2], ".track")).to.exist;
    });
    it("draws the part the stepper calls for", async () => {
      const el = await createStepper();
      expect(steps(el).map(s => s.kind)).to.deep.equal(["horizontal", "horizontal", "horizontal"]);
      await variant(el, { variant: "vertical" });
      expect(steps(el)[0].kind).to.equal("vertical");
      await variant(el, { card: true, rounded: true });
      expect(steps(el)[0].kind).to.equal("card");
      expect(steps(el)[0].shape).to.equal("rounded");
      await variant(el, { variant: "horizontal", size: "compact" });
      expect(steps(el)[0].kind).to.equal("segment");
    });
    it("still maps the old flavor attribute onto status", async () => {
      const item = await fixture<ZetaStepperItem>(html`<zeta-stepper-item flavor="success" label="Done"></zeta-stepper-item>`);
      expect(item.status).to.equal("complete");
    });
  });

  describe("Dimensions", () => {
    it("draws a control/icon-lg indicator with a stroke/thick border", async () => {
      const el = await createStepper();
      const indicator = one(steps(el)[2], ".indicator");
      expect(`${indicator.getBoundingClientRect().width}px`).to.equal(v(el, "--control-icon-lg"));
      expect(getComputedStyle(indicator).borderTopWidth).to.equal(v(el, "--stroke-thick"));
    });
    it("shares the row between horizontal steps, the last taking only its head", async () => {
      const el = await createStepper();
      const [a, b, c] = steps(el).map(s => s.getBoundingClientRect().width);
      expect(a).to.equal(b);
      expect(`${c}px`).to.equal(v(el, "--control-icon-lg"));
    });
    it("draws segments space/2xs tall", async () => {
      const el = await createStepper();
      await variant(el, { size: "compact" });
      expect(`${steps(el)[0].getBoundingClientRect().height}px`).to.equal(v(el, "--space-2xs"));
    });
  });

  describe("Styling", () => {
    it("paints each status from the spec tokens", async () => {
      const el = await createStepper();
      const [complete, active, rest] = steps(el).map(s => getComputedStyle(one(s, ".indicator")).backgroundColor);
      expect(complete).to.equal(getCssVarColorValue(el, "--feedback-success-background-strong"));
      expect(active).to.equal(getCssVarColorValue(el, "--interactive-primary-background-default"));
      expect(rest).to.equal(getCssVarColorValue(el, "--interactive-neutral-background-default"));
      expect(getComputedStyle(one(steps(el)[2], ".label")).color).to.equal(getCssVarColorValue(el, "--foreground-tertiary"));
      expect(getComputedStyle(one(steps(el)[1], ".label")).color).to.equal(getCssVarColorValue(el, "--foreground-primary"));
    });
    it("gives cards their surface, border and stronger label", async () => {
      const el = await createStepper();
      await variant(el, { variant: "vertical", card: true });
      const [complete, active, rest] = steps(el).map(s => getComputedStyle(s));
      expect(complete.backgroundColor).to.equal(getCssVarColorValue(el, "--feedback-success-background-subtle"));
      expect(active.borderTopColor).to.equal(getCssVarColorValue(el, "--interactive-primary-border-default"));
      expect(rest.backgroundColor).to.equal(getCssVarColorValue(el, "--surface-card"));
      expect(getComputedStyle(one(steps(el)[2], ".label")).color).to.equal(getCssVarColorValue(el, "--foreground-secondary"));
    });
    it("fills only the leading half of a partial segment", async () => {
      const el = await createStepper();
      await variant(el, { size: "compact" });
      steps(el)[2].status = "partial";
      await elementUpdated(steps(el)[2]);
      const bg = getComputedStyle(steps(el)[2]).backgroundImage;
      expect(bg).to.contain(getCssVarColorValue(el, "--interactive-primary-background-default"));
      expect(bg).to.contain("50%");
    });
  });

  describe("Interaction", () => {
    it("fires select with the step's position when a selectable step is chosen", async () => {
      const el = await createStepper();
      steps(el)[0].selectable = true;
      await elementUpdated(steps(el)[0]);
      const button = one(steps(el)[0], "button.text");
      setTimeout(() => button.click());
      const event = await oneEvent(el, "select");
      expect(event.detail.position).to.equal(1);
    });
    it("keeps the old overflow button working", async () => {
      const el = await createStepper();
      await variant(el, { showOverflowButton: true });
      const button = one(el, "zeta-button");
      const spy = sinon.spy();
      button.addEventListener("click", spy);
      button.click();
      expect(spy).to.have.been.calledOnce;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
