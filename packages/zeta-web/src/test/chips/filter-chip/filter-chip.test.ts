import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaFilterChip } from "../../../index.js";
import "../../../index.js";

const labelText = "Label";

describe("zeta-filter-chip", () => {
  let subject: ZetaFilterChip;

  const createComponent = (template = `<zeta-filter-chip>${labelText}</zeta-filter-chip>`) => {
    // prettier-ignore
    return fixture<ZetaFilterChip>(html`${unsafeStatic(template)}`);
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

    it("shows the check icon when active", async () => {
      subject.active = true;
      await elementUpdated(subject);

      const iconElement = subject.shadowRoot?.querySelector("zeta-icon");

      expect(iconElement).to.exist;
      expect(iconElement?.textContent).to.equal("check_mark");
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
