import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaProgressBar } from "../../components/progress-indicators/progress-bar/progress-bar.js";
import "../../components/progress-indicators/progress-bar/progress-bar.js";
import "../../index.css";

describe("zeta-progress-bar", () => {
  let subject: ZetaProgressBar;

  const createComponent = (template = `<zeta-progress-bar></zeta-progress-bar>`) => {
    // prettier-ignore
    return fixture<ZetaProgressBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe.skip("Accessibility", () => {
    it("meets accessibility requirements", () => {
      expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    it("uses token radius per size and sharp shape", async () => {
      const radius = () => getComputedStyle(subject.shadowRoot!.querySelector(".wrapper")!).borderRadius;
      expect(radius()).to.equal("8px");
      subject.size = "small";
      await subject.updateComplete;
      expect(radius()).to.equal("4px");
      subject.rounded = false;
      await subject.updateComplete;
      expect(radius()).to.equal("0px");
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
