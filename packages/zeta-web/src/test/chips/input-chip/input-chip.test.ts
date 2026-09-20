import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaInputChip } from "../../../index.js";
import "../../../index.js";

const labelText = "Label";

describe("zeta-input-chip", () => {
  let subject: ZetaInputChip;

  const createComponent = (template = `<zeta-input-chip>${labelText}</zeta-input-chip>`) => {
    // prettier-ignore
    return fixture<ZetaInputChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe.skip("Accessibility", () => {
    it("it meets accessibility requirements", () => {
      expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("sets the correct text on the chip", () => {
      expect(subject.lastChild?.nodeValue).to.equal(labelText);
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
