import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaLabel } from "../../../components/badges/badges";
import "../../../components/badges/label/label";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner";
import { getCssVarColorValue } from "../../utils.js";
import "../../../index.css";

const statuses = ["neutral", "info", "positive", "warning", "negative"] as const;

describe("zeta-label", () => {
  let subject: ZetaLabel;
  const createComponent = (template = `<zeta-label label="Label"></zeta-label>`) => {
    // prettier-ignore
    return fixture<ZetaLabel>(html`${unsafeStatic(template)}`);
  };
  const container = (el: ZetaLabel) => el.shadowRoot?.querySelector(".container") as HTMLElement;

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    statuses.forEach(status => {
      it(`meets contrast requirements for ${status}, bold and tinted`, async () => {
        subject.status = status;
        await elementUpdated(subject);
        const text = subject.shadowRoot?.querySelector(".text") as HTMLElement;
        await contrastTest(`Label ${status} bold`, text, container(subject), { highContrast: false });
        subject.bold = false;
        await elementUpdated(subject);
        await contrastTest(`Label ${status} tinted`, text, container(subject), { highContrast: false });
      });
    });

    it("meets aria requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the label property and slotted text", async () => {
      const slotted = await createComponent(`<zeta-label>Slotted</zeta-label>`);
      await expect(subject.shadowRoot?.querySelector(".text")?.textContent?.trim()).to.equal("Label");
      const slot = slotted.shadowRoot?.querySelector("slot") as HTMLSlotElement;
      await expect(slot.assignedNodes()[0].textContent).to.equal("Slotted");
    });
  });

  describe("Dimensions", () => {
    it("is 26px tall bold and 24px tinted", async () => {
      await expect(subject.getBoundingClientRect().height).to.equal(26);
      subject.bold = false;
      subject.outlined = true;
      await elementUpdated(subject);
      await expect(subject.getBoundingClientRect().height).to.equal(24);
      subject.outlined = false;
      await elementUpdated(subject);
      await expect(subject.getBoundingClientRect().height).to.equal(24);
    });

    it("pads by space/xxs and rounds by radius/element-sm", async () => {
      const style = getComputedStyle(container(subject));
      const v = (name: string) => getComputedStyle(subject).getPropertyValue(name).trim();
      await expect(style.paddingLeft).to.equal(v("--space-xxs"));
      await expect(style.borderTopLeftRadius).to.equal(v("--radius-element-sm"));
      subject.rounded = false;
      await elementUpdated(subject);
      await expect(getComputedStyle(container(subject)).borderTopLeftRadius).to.equal("0px");
    });
  });

  describe("Styling", () => {
    const bold = {
      neutral: ["--foreground-secondary", "--foreground-inverse"],
      info: ["--feedback-info-background-strong", "--interactive-primary-foreground-default"],
      positive: ["--feedback-success-background-strong", "--interactive-primary-foreground-default"],
      warning: ["--feedback-warning-background-strong", "--foreground-inverse"],
      negative: ["--feedback-error-background-strong", "--interactive-destructive-foreground-default"]
    } as const;
    const tinted = {
      neutral: ["--surface-subtle", "--border-strong"],
      info: ["--feedback-info-background-subtle", "--feedback-info-background-strong"],
      positive: ["--feedback-success-background-subtle", "--border-success"],
      warning: ["--feedback-warning-background-subtle", "--zebra-border-warning"],
      negative: ["--feedback-error-background-subtle", "--border-error"]
    } as const;

    statuses.forEach(status => {
      it(`binds the spec tokens for ${status}`, async () => {
        subject.status = status;
        await elementUpdated(subject);
        let style = getComputedStyle(container(subject));
        await expect(style.backgroundColor).to.equal(getCssVarColorValue(subject, bold[status][0]));
        await expect(style.borderTopColor).to.equal(getCssVarColorValue(subject, bold[status][0]));
        await expect(style.color).to.equal(getCssVarColorValue(subject, bold[status][1]));

        subject.bold = false;
        subject.outlined = true;
        await elementUpdated(subject);
        style = getComputedStyle(container(subject));
        await expect(style.backgroundColor).to.equal(getCssVarColorValue(subject, tinted[status][0]));
        await expect(style.outlineColor).to.equal(getCssVarColorValue(subject, tinted[status][1]));
        await expect(style.color).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
      });
    });

    it("shows the stroke only on the outlined form", async () => {
      subject.bold = false;
      await elementUpdated(subject);
      await expect(getComputedStyle(container(subject)).outlineWidth).to.equal("0px");
      subject.outlined = true;
      await elementUpdated(subject);
      await expect(getComputedStyle(container(subject)).outlineWidth).to.equal("1px");
    });

    it("lets bold win over outlined", async () => {
      subject.outlined = true;
      await elementUpdated(subject);
      await expect(getComputedStyle(container(subject)).backgroundColor).to.equal(getCssVarColorValue(subject, "--foreground-secondary"));
    });
  });

  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
