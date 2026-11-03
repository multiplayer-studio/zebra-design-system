import { fixture, html, expect, unsafeStatic, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaStatusLabel } from "../../../components/badges/badges";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner";
import "../../../index.css";
import { getCssVarColorValue } from "../../utils.js";
import "../../../components/badges/status-label/status-label";

describe("zeta-status-label", () => {
  let subject: ZetaStatusLabel;
  const createComponent = (template = `<zeta-status-label></zeta-status-label>`) => {
    // prettier-ignore
    return fixture<ZetaStatusLabel>(html`${unsafeStatic(template)}`);
  };
  beforeEach(async () => {
    subject = await createComponent();
  });
  describe("Accessibility", () => {
    ["info", "positive", "warning", "negative", "neutral"].forEach(status => {
      it(`meets contrast requirements for ${status}`, async () => {
        subject.setAttribute("status", status);
        subject.setAttribute("label", `Label ${status}`);
        await elementUpdated(subject);

        // Check color contrast between text and background
        const bg = subject.shadowRoot?.querySelector("[part='container']");
        const fg = subject.shadowRoot?.querySelector("[part='text']");
        if (fg && bg && fg instanceof HTMLElement && bg instanceof HTMLElement) {
          await contrastTest(`Status Label ${status}`, fg, bg, { highContrast: false });
        }
      });
      it("meets aria requirements", async () => {
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });
  describe("Content", () => {
    it("sets default status to neutral", async () => {
      await expect(subject.status).to.equal("neutral");
    });

    ["info", "positive", "warning", "negative", "neutral"].forEach(status => {
      it(`can set status to ${status}`, async () => {
        subject.status = status as any;
        await elementUpdated(subject);
        await expect(subject.status).to.equal(status);
        await expect(subject.getAttribute("status")).to.equal(status);
      });
    });

    it("renders label text when label prop is set", async () => {
      subject.label = "Test Label";
      await elementUpdated(subject);

      const textPart = subject.shadowRoot?.querySelector("[part='text']");
      await expect(textPart?.textContent).to.equal("Test Label");
    });

    it("should be undefined by default", () => {
      expect(subject.label).to.be.undefined;
    });

    it("overrides slot content when label prop is set", async () => {
      const componentWithSlot = await createComponent(`<zeta-status-label>Slot Text</zeta-status-label>`);
      expect(componentWithSlot.textContent).to.include("Slot Text");

      componentWithSlot.label = "Label Text";
      await elementUpdated(componentWithSlot);
      const textPart = componentWithSlot.shadowRoot?.querySelector("[part='text']");
      await expect(textPart?.textContent).to.equal("Label Text");
    });

    it("should be undefined by default", () => {
      expect(subject.icon).to.be.undefined;
    });

    it("renders a zeta-icon when icon prop is set", async () => {
      subject.icon = "star";
      subject.label = "Test";
      await elementUpdated(subject);

      const icon = subject.shadowRoot?.querySelector("zeta-icon");
      expect(icon).to.exist;
      await expect(icon?.textContent).to.equal("star");
    });

    it("renders an indicator dot when icon is not set", async () => {
      subject.label = "Test";
      await elementUpdated(subject);

      const circle = subject.shadowRoot?.querySelector(".dot");
      expect(circle).to.exist;
    });

    it("renders zeta-icon instead of indicator circle when icon is provided", async () => {
      subject.icon = "star";
      subject.label = "Test";
      await elementUpdated(subject);

      const icon = subject.shadowRoot?.querySelector("zeta-icon");
      const circle = subject.shadowRoot?.querySelector(".dot");
      expect(icon).to.exist;
      expect(circle).to.not.exist;
    });

    it("defaults to true", () => {
      expect(subject.showIcon).to.be.true;
    });

    it("renders icon container when showIcon is true", async () => {
      subject.label = "Test";
      subject.showIcon = true;
      await elementUpdated(subject);

      const iconContainer = subject.shadowRoot?.querySelector("[part='icon-container']");
      expect(iconContainer).to.exist;
    });

    it("hides icon container when showIcon is false", async () => {
      subject.label = "Test";
      subject.showIcon = false;
      await elementUpdated(subject);

      const iconContainer = subject.shadowRoot?.querySelector("[part='icon-container']");
      expect(iconContainer).to.not.exist;
    });

    it("removes icon when showIcon is toggled from true to false", async () => {
      subject.label = "Test";
      subject.showIcon = true;
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector("[part='icon-container']")).to.exist;

      subject.showIcon = false;
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector("[part='icon-container']")).to.not.exist;
    });

    it("renders slot content when no label prop is set", async () => {
      const componentWithSlot = await createComponent(`<zeta-status-label>Slotted Text Content</zeta-status-label>`);

      expect(componentWithSlot.textContent).to.include("Slotted Text Content");
    });

    it("does not render slot when label prop is set", async () => {
      const componentWithSlot = await createComponent(`<zeta-status-label label="Label Text">Slotted Text</zeta-status-label>`);

      const textPart = componentWithSlot.shadowRoot?.querySelector("[part='text']");
      await expect(textPart?.textContent).to.equal("Label Text");
      expect(textPart?.textContent).to.not.include("Slotted Text");
    });

    it("supports multiple elements in slot", async () => {
      const componentWithSlot = await createComponent(`<zeta-status-label><span>Span Text</span> Extra Text</zeta-status-label>`);

      expect(componentWithSlot.textContent).to.include("Span Text");
      expect(componentWithSlot.textContent).to.include("Extra Text");
    });

    it("renders correctly with status, label, and icon", async () => {
      subject.status = "positive";
      subject.label = "Success";
      subject.icon = "star";
      await elementUpdated(subject);

      await expect(subject.status).to.equal("positive");
      await expect(subject.shadowRoot?.querySelector("[part='text']")?.textContent).to.equal("Success");
      expect(subject.shadowRoot?.querySelector("zeta-icon")).to.exist;
    });

    it("renders correctly with status and label without icon", async () => {
      subject.status = "warning";
      subject.label = "Warning";
      subject.showIcon = false;
      await elementUpdated(subject);

      await expect(subject.status).to.equal("warning");
      await expect(subject.shadowRoot?.querySelector("[part='text']")?.textContent).to.equal("Warning");
      expect(subject.shadowRoot?.querySelector("[part='icon-container']")).to.not.exist;
    });
    it("draws the glyph fixed per status when leading is icon", async () => {
      const glyphs = { neutral: "info", info: "info", positive: "check_circle", warning: "warning", negative: "error" } as const;
      subject.leading = "icon";
      for (const [status, glyph] of Object.entries(glyphs)) {
        subject.status = status as keyof typeof glyphs;
        await elementUpdated(subject);
        await expect(subject.shadowRoot?.querySelector("[part='icon-container'] zeta-icon")?.textContent).to.equal(glyph);
      }
    });

    it("lets leading override showIcon", async () => {
      subject.showIcon = false;
      subject.leading = "indicator";
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector(".dot")).to.exist;
      subject.leading = "none";
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector("[part='icon-container']")).to.not.exist;
    });

    it("adds a named dismiss button when discardable", async () => {
      expect(subject.shadowRoot?.querySelector("[part='discard']")).to.not.exist;
      subject.discardable = true;
      subject.discardLabel = "Remove Overdue";
      await elementUpdated(subject);
      const discard = subject.shadowRoot?.querySelector("[part='discard']") as HTMLButtonElement;
      await expect(discard.tagName).to.equal("BUTTON");
      await expect(discard.getAttribute("aria-label")).to.equal("Remove Overdue");
    });
  });
  describe("Dimensions", () => {
    it("is 24px tall at every leading", async () => {
      subject.label = "Label";
      for (const leading of ["indicator", "icon", "none"] as const) {
        subject.leading = leading;
        await elementUpdated(subject);
        await expect(subject.getBoundingClientRect().height).to.equal(24);
      }
    });

    it("draws a control/icon-xxs dot in a control/icon-sm box", async () => {
      subject.label = "Label";
      await elementUpdated(subject);
      const v = (name: string) => getComputedStyle(subject).getPropertyValue(name).trim();
      const box = subject.shadowRoot?.querySelector("[part='icon-container']") as HTMLElement;
      const dot = subject.shadowRoot?.querySelector(".dot") as HTMLElement;
      await expect(`${box.getBoundingClientRect().width}px`).to.equal(v("--control-icon-sm"));
      await expect(`${dot.getBoundingClientRect().width}px`).to.equal(v("--control-icon-xxs"));
    });
  });
  describe("Styling", () => {
    const tokens = {
      neutral: ["--feedback-neutral-background-subtle", "--zebra-border-default", "--foreground-primary"],
      info: ["--feedback-info-background-subtle", "--zebra-border-info", "--foreground-info"],
      positive: ["--feedback-success-background-subtle", "--border-success", "--foreground-success"],
      warning: ["--feedback-warning-background-subtle", "--zebra-border-warning", "--foreground-warning"],
      negative: ["--feedback-error-background-subtle", "--border-error", "--foreground-error"]
    } as const;

    Object.entries(tokens).forEach(([status, [fill, border, accent]]) => {
      it(`binds the spec tokens for ${status}`, async () => {
        subject.status = status as keyof typeof tokens;
        subject.label = "Label";
        await elementUpdated(subject);
        const container = getComputedStyle(subject.shadowRoot?.querySelector("[part='container']") as HTMLElement);
        await expect(container.backgroundColor).to.equal(getCssVarColorValue(subject, fill));
        await expect(container.borderTopColor).to.equal(getCssVarColorValue(subject, border));
        const dot = subject.shadowRoot?.querySelector(".dot") as HTMLElement;
        await expect(getComputedStyle(dot).backgroundColor).to.equal(getCssVarColorValue(subject, accent));
        const text = subject.shadowRoot?.querySelector("[part='text']") as HTMLElement;
        await expect(getComputedStyle(text).color).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
      });
    });
  });

  describe("Interaction", () => {
    it("keeps the Zebra info and warning borders, not the legacy ones sharing their names", async () => {
      for (const [status, palette] of [
        ["info", "--palette-status-info-default"],
        ["warning", "--palette-status-warning-default"]
      ] as const) {
        subject.status = status;
        await elementUpdated(subject);
        const container = getComputedStyle(subject.shadowRoot?.querySelector("[part='container']") as HTMLElement);
        await expect(container.borderTopColor).to.equal(getCssVarColorValue(subject, palette));
        expect(container.borderTopColor).to.not.equal(getCssVarColorValue(subject, `--border-${status}`));
      }
    });

    it("fires close when the dismiss button is clicked", async () => {
      subject.discardable = true;
      await elementUpdated(subject);
      const discard = subject.shadowRoot?.querySelector("[part='discard']") as HTMLButtonElement;
      setTimeout(() => discard.click());
      const event = await oneEvent(subject, "close");
      expect(event).to.exist;
    });
  });
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
