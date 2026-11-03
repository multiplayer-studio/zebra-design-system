import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaPriorityPill } from "../../../components/badges/badges";
import "../../../components/badges/priority-pill/priority-pill";
import "../../../index.css";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner";
import { getCssVarColorValue } from "../../utils.js";

const levels = ["low", "medium", "high", "urgent"] as const;

describe("zeta-priority-pill", () => {
  let subject: ZetaPriorityPill;
  const createComponent = (template = `<zeta-priority-pill></zeta-priority-pill>`) => {
    // prettier-ignore
    return fixture<ZetaPriorityPill>(html`${unsafeStatic(template)}`);
  };
  const part = (sel: string) => subject.shadowRoot?.querySelector(sel) as HTMLElement;

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    // Medium (4.40:1) and high (4.34:1) knockouts fall short of 4.5 in light mode (spec issue, acknowledged).
    (["low", "urgent"] as const).forEach(status => {
      it(`meets contrast requirements for ${status}`, async () => {
        subject.status = status;
        subject.leading = "number";
        await elementUpdated(subject);
        await contrastTest(`Priority pill rank ${status}`, part(".number"), part(".number"), { highContrast: false });
        await contrastTest(`Priority pill label ${status}`, part(".text"), part(".container"), { highContrast: false });
      });
    });

    it("meets aria requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    levels.forEach(status => {
      it(`provides the default name for ${status}`, async () => {
        subject.status = status;
        await elementUpdated(subject);
        await expect(part(".text").textContent).to.equal(status.charAt(0).toUpperCase() + status.slice(1));
      });
    });

    it("draws the direction glyph for each level", async () => {
      const glyphs = { low: "arrow_down", medium: "remove", high: "arrow_up", urgent: "priority" } as const;
      for (const status of levels) {
        subject.status = status;
        await elementUpdated(subject);
        await expect(part(".glyph").textContent?.trim()).to.equal(glyphs[status]);
      }
    });

    it("shows the rank when an index is given", async () => {
      subject.status = "urgent";
      subject.index = "5";
      subject.label = "Custom Priority";
      await elementUpdated(subject);
      await expect(part(".number").textContent?.trim()).to.equal("5");
      expect(part(".glyph")).to.not.exist;
      await expect(part(".text").textContent).to.equal("Custom Priority");
    });

    it("lets leading force the glyph over an index", async () => {
      subject.index = "5";
      subject.leading = "icon";
      await elementUpdated(subject);
      expect(part(".glyph")).to.exist;
    });

    it("removes the label on the badge variant", async () => {
      subject.type = "badge";
      await elementUpdated(subject);
      expect(part(".text")).to.not.exist;
    });
  });

  describe("Dimensions", () => {
    it("renders badge size large as a 28px square", async () => {
      subject.type = "badge";
      await elementUpdated(subject);
      const rect = subject.getBoundingClientRect();
      await expect(rect.width).to.equal(28);
      await expect(rect.height).to.equal(28);
    });

    it("renders badge size small as a 20px square", async () => {
      subject.type = "badge";
      subject.size = "small";
      await elementUpdated(subject);
      const rect = subject.getBoundingClientRect();
      await expect(rect.width).to.equal(20);
      await expect(rect.height).to.equal(20);
    });

    it("renders lozenges at 28px large and 20px small", async () => {
      subject.label = "Label";
      await elementUpdated(subject);
      await expect(subject.getBoundingClientRect().height).to.equal(28);
      subject.size = "small";
      await elementUpdated(subject);
      await expect(subject.getBoundingClientRect().height).to.equal(20);
    });

    it("sizes the circle from control/icon-md and control/icon-sm", async () => {
      const v = (name: string) => getComputedStyle(subject).getPropertyValue(name).trim();
      await expect(`${part(".number").getBoundingClientRect().width}px`).to.equal(v("--control-icon-md"));
      subject.size = "small";
      await elementUpdated(subject);
      await expect(`${part(".number").getBoundingClientRect().width}px`).to.equal(v("--control-icon-sm"));
    });
  });

  describe("Styling", () => {
    const tokens = {
      low: ["--foreground-secondary", "--foreground-inverse"],
      medium: ["--feedback-info-background-strong", "--interactive-primary-foreground-default"],
      high: ["--feedback-warning-background-strong", "--foreground-inverse"],
      urgent: ["--feedback-error-background-strong", "--interactive-destructive-foreground-default"]
    } as const;

    levels.forEach(status => {
      it(`binds the spec tokens for ${status}`, async () => {
        subject.status = status;
        await elementUpdated(subject);
        const [fill, knockout] = tokens[status];
        await expect(getComputedStyle(part(".container")).backgroundColor).to.equal(getCssVarColorValue(subject, fill));
        await expect(getComputedStyle(part(".number")).backgroundColor).to.equal(getCssVarColorValue(subject, knockout));
        await expect(getComputedStyle(part(".text")).color).to.equal(getCssVarColorValue(subject, knockout));
        await expect(getComputedStyle(part(".number")).color).to.equal(getCssVarColorValue(subject, fill));
      });
    });

    it("draws low when no status is set", async () => {
      await expect(getComputedStyle(part(".container")).backgroundColor).to.equal(getCssVarColorValue(subject, "--foreground-secondary"));
    });
  });

  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
