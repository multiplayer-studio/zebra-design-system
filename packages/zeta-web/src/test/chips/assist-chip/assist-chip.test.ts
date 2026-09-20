import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaAssistChip } from "../../../index.js";
import "../../../index.js";

const labelText = "Label";
const icon = "star";

describe("zeta-assist-chip", () => {
  let subject: ZetaAssistChip;

  const createComponent = (template = `<zeta-assist-chip icon=${icon}>${labelText}</zeta-assist-chip>`) => {
    // prettier-ignore
    return fixture<ZetaAssistChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe.skip("Accessibility", () => {
    it("meets accessibility requirements", () => {
      expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("sets the correct text on the chip", () => {
      expect(subject.lastChild?.nodeValue).to.equal(labelText);
    });

    it("displays the correct icon", () => {
      const iconElement = subject.shadowRoot?.querySelector("zeta-icon");
      expect(iconElement?.textContent).to.equal(icon);
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
