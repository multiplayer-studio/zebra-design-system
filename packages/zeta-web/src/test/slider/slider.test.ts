import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaSlider } from "../../components/slider/slider.js";
import "../../components/slider/slider.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";
import { sendMouse, resetMouse } from "@web/test-runner-commands";

describe("zeta-slider", () => {
  let subject: ZetaSlider;

  const createComponent = (template = `<zeta-slider></zeta-slider>`) => {
    // prettier-ignore
    return fixture<ZetaSlider>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
    await subject.updateComplete;
  });
  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the track", () => {
      const track = subject.shadowRoot?.querySelector(".track");
      expect(track).to.exist;
    });

    it("renders the left handle and not the right handle when type is default", () => {
      const handle = subject.shadowRoot?.querySelector("#handle-l");
      expect(handle).to.exist;

      const handleR = subject.shadowRoot?.querySelector("#handle-r");
      expect(handleR).to.not.exist;
    });

    it("renders the right handle when type is range", async () => {
      subject.type = "range";
      await subject.updateComplete;
      const handle = subject.shadowRoot?.querySelector("#handle-r");
      expect(handle).to.exist;
    });

    it("sets initial values correctly", async () => {
      await expect(subject.value).to.equal(50);
      await expect(subject.lowerValue).to.equal(10);
      await expect(subject.upperValue).to.equal(90);
      await expect(subject.min).to.equal(0);
      await expect(subject.max).to.equal(100);
      await expect(subject.stepIncrement).to.equal(undefined);
      await expect(subject.type).to.equal("default");
    });
  });

  describe("Dimensions", () => {
    it("sets the track height correctly", async () => {
      const track = subject.shadowRoot?.querySelector(".track");

      await expect(track?.clientHeight).to.equal(4);
    });

    it("sets the handle width and height correctly", async () => {
      const handle = subject.shadowRoot?.querySelector(".handle");
      await expect(handle?.clientHeight).to.equal(16);
      await expect(handle?.clientHeight).to.equal(16);
    });

    it("sets the correct margin on the slider", async () => {
      const track = subject.shadowRoot?.querySelector(".slider");
      await expect(getComputedStyle(track as Element).margin).to.equal("0px 8px");
    });
  });

  describe("Styling", () => {
    it("draws the base track on surface/track", async () => {
      const track = subject.shadowRoot?.querySelector(".track");
      await expect(getComputedStyle(track as Element).backgroundColor).to.equal(getCssVarColorValue(track!, "--surface-track"));
    });

    it("draws the fill and the thumb on interactive/neutral/foreground/default", async () => {
      const selected = subject.shadowRoot?.querySelector(".selected-area");
      const handle = subject.shadowRoot?.querySelector(".handle");
      const colour = getCssVarColorValue(subject, "--interactive-neutral-foreground-default");
      await expect(getComputedStyle(selected as Element).backgroundColor).to.equal(colour);
      await expect(getComputedStyle(handle as Element).backgroundColor).to.equal(colour);
    });

    it("moves the fill and thumb to interactive/ghost/foreground/default while a thumb is pressed", async () => {
      const handle = subject.shadowRoot?.querySelector(".handle") as HTMLElement;
      const r = handle.getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
      await sendMouse({ type: "down" });
      await subject.updateComplete;
      const colour = getCssVarColorValue(subject, "--interactive-ghost-foreground-default");
      await expect(getComputedStyle(subject.shadowRoot!.querySelector(".selected-area")!).backgroundColor).to.equal(colour);
      await expect(getComputedStyle(handle).backgroundColor).to.equal(colour);
      await sendMouse({ type: "up" });
    });

    it("rounds the thumb to radius/pill and the track to radius/xs, and squares both when sharp", async () => {
      const handle = subject.shadowRoot?.querySelector(".handle") as HTMLElement;
      const track = subject.shadowRoot?.querySelector(".track") as HTMLElement;
      subject.rounded = true;
      await subject.updateComplete;
      await expect(getComputedStyle(handle).borderTopLeftRadius).to.equal(getComputedStyle(subject).getPropertyValue("--radius-pill").trim());
      await expect(getComputedStyle(track).borderTopLeftRadius).to.equal(getComputedStyle(subject).getPropertyValue("--radius-xs").trim());
      subject.rounded = false;
      await subject.updateComplete;
      await expect(getComputedStyle(handle).borderTopLeftRadius).to.equal("0px");
      await expect(getComputedStyle(track).borderTopLeftRadius).to.equal("0px");
    });
  });

  describe("Interaction", () => {
    const drag = async (from: HTMLElement, toX: number) => {
      const r = from.getBoundingClientRect();
      const y = Math.round(r.y + r.height / 2);
      await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), y] });
      await sendMouse({ type: "down" });
      await sendMouse({ type: "move", position: [Math.round(toX), y] });
      await sendMouse({ type: "up" });
      await subject.updateComplete;
    };

    it("updates the value when the handle is dragged", async () => {
      const track = subject.shadowRoot?.querySelector(".track") as HTMLElement;
      await drag(subject.shadowRoot?.querySelector(".handle") as HTMLElement, track.getBoundingClientRect().right + 50);
      await expect(subject.value).to.equal(100);
    });

    it("updates the lower and upper values when the handles are dragged", async () => {
      subject.type = "range";
      await subject.updateComplete;
      await expect(subject.lowerValue).to.equal(10);
      await expect(subject.upperValue).to.equal(90);
      const t = (subject.shadowRoot?.querySelector(".track") as HTMLElement).getBoundingClientRect();
      await drag(subject.shadowRoot?.querySelector("#handle-l") as HTMLElement, t.left + t.width * 0.3);
      await drag(subject.shadowRoot?.querySelector("#handle-r") as HTMLElement, t.left + t.width * 0.65);
      expect(subject.lowerValue).to.be.closeTo(30, 2);
      expect(subject.upperValue).to.be.closeTo(65, 2);
    });
  });

  describe("Golden", () => {});

  describe("Performance", () => {});
});
