import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaFileUpload, FileUploadState } from "../../components/file-upload/file-upload.js";
import "../../components/file-upload/file-upload.js";
import "../../components/upload-item/upload-item.js";
import "../../index.css";

const createComponent = (state?: FileUploadState) =>
  fixture<ZetaFileUpload>(html`<zeta-file-upload .state=${state}><zeta-upload-item fileName="a.pdf"></zeta-upload-item></zeta-file-upload>`);
const zone = (el: ZetaFileUpload) => el.shadowRoot!.querySelector<HTMLElement>(".zone")!;
const probe = (prop: string, value: string) => {
  const p = document.createElement("div");
  p.style.setProperty(prop, value);
  document.body.append(p);
  const v = getComputedStyle(p).getPropertyValue(prop);
  p.remove();
  return v;
};

describe("zeta-file-upload", () => {
  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      const subject = await createComponent();
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("announces the error row", async () => {
      const subject = await createComponent();
      subject.errorMessage = "notes.exe isn't a supported file type.";
      await elementUpdated(subject);
      expect(subject.shadowRoot!.querySelector(".error")!.getAttribute("role")).to.equal("alert");
    });
  });

  describe("Content", () => {
    it("derives default, then error from errorMessage", async () => {
      const subject = await createComponent();
      expect(subject.getAttribute("state")).to.equal("default");
      subject.errorMessage = "Too many files";
      await elementUpdated(subject);
      expect(subject.getAttribute("state")).to.equal("error");
    });

    it("swaps the headline while dragging", async () => {
      const subject = await createComponent("dragging");
      expect(subject.shadowRoot!.querySelector(".headline")!.textContent).to.equal("Release to upload");
    });

    it("hides the caption when showCaption is off", async () => {
      const subject = await createComponent();
      subject.showCaption = false;
      await elementUpdated(subject);
      expect(subject.shadowRoot!.querySelector(".caption")).to.not.exist;
    });

    it("passes rounded to the rows in its slot", async () => {
      const subject = await createComponent();
      subject.rounded = false;
      await elementUpdated(subject);
      expect(subject.querySelector("zeta-upload-item")!.rounded).to.be.false;
    });
  });

  describe("Styling", () => {
    it("draws the zone on surface/card with a border/default dashed outline", async () => {
      const subject = await createComponent();
      const style = getComputedStyle(zone(subject));
      expect(style.backgroundColor).to.equal(probe("background-color", "var(--surface-card)"));
      expect(style.borderTopColor).to.equal(probe("border-top-color", "var(--zebra-border-default)"));
      expect(style.borderTopStyle).to.equal("dashed");
    });

    it("turns solid border/focus on surface/info while dragging", async () => {
      const subject = await createComponent("dragging");
      const style = getComputedStyle(zone(subject));
      expect(style.backgroundColor).to.equal(probe("background-color", "var(--zebra-surface-info)"));
      expect(style.borderTopStyle).to.equal("solid");
    });

    it("greys to surface/subtle when disabled", async () => {
      const subject = await createComponent("disabled");
      expect(getComputedStyle(zone(subject)).backgroundColor).to.equal(probe("background-color", "var(--surface-subtle)"));
    });
  });

  describe("Interaction", () => {
    it("refuses a file of the wrong type", async () => {
      const subject = await createComponent();
      subject.accept = ".pdf";
      await elementUpdated(subject);
      const input = subject.shadowRoot!.querySelector("input")!;
      const dt = new DataTransfer();
      dt.items.add(new File(["x"], "notes.exe"));
      input.files = dt.files;
      setTimeout(() => input.dispatchEvent(new Event("change")));
      const event = await oneEvent(subject, "filesrejected");
      expect((event as CustomEvent<{ rejections: { reason: string }[] }>).detail.rejections[0].reason).to.equal("type");
    });
  });
});
