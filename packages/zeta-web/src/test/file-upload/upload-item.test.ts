import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaUploadItem } from "../../components/upload-item/upload-item.js";
import "../../components/upload-item/upload-item.js";
import "../../index.css";

const MB = 1024 * 1024;
const createComponent = (status: ZetaUploadItem["status"] = "waiting", indicator: ZetaUploadItem["indicator"] = "bar") =>
  fixture<ZetaUploadItem>(
    html`<zeta-upload-item status=${status} indicator=${indicator} fileName="Delivery manifest.pdf" .size=${3.8 * MB} .progress=${50}></zeta-upload-item>`
  );
const labels = (el: ZetaUploadItem) => [...el.shadowRoot!.querySelectorAll("zeta-icon-button")].map(b => b.getAttribute("aria-label"));

describe("zeta-upload-item", () => {
  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      const subject = await createComponent();
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("names the trailing control after what it does to this file", async () => {
      const waiting = await createComponent("waiting");
      expect(labels(waiting)).to.deep.equal(["Cancel upload of Delivery manifest.pdf"]);
      const complete = await createComponent("complete");
      expect(labels(complete)).to.deep.equal(["Remove Delivery manifest.pdf"]);
    });
  });

  describe("Content", () => {
    it("reads the extension off the file name", async () => {
      const subject = await createComponent();
      expect(subject.shadowRoot!.querySelector("zeta-file-indicator")!.getAttribute("extension")).to.equal("pdf");
    });

    it("shows a progress bar and the byte count while uploading on a bar row", async () => {
      const subject = await createComponent("uploading");
      expect(subject.shadowRoot!.querySelector("zeta-progress-bar")).to.exist;
      expect(subject.shadowRoot!.querySelector(".size")!.textContent).to.equal("1.9 MB of 3.8 MB");
    });

    it("puts the percentage on the meta line of a ring row", async () => {
      const subject = await createComponent("uploading", "ring");
      expect(subject.shadowRoot!.querySelector(".size")!.textContent).to.equal("1.9 MB of 3.8 MB · 50%");
      expect(subject.shadowRoot!.querySelector("zeta-progress-circle")).to.exist;
    });

    it("offers Try again on a failed row, and the reason", async () => {
      const subject = await createComponent("error");
      subject.errorText = "Connection lost";
      await elementUpdated(subject);
      expect(subject.shadowRoot!.querySelector(".retry")).to.exist;
      expect(subject.shadowRoot!.querySelector(".status")!.textContent).to.contain("Connection lost");
    });

    it("drops the trailing control when showDismiss is off", async () => {
      const subject = await createComponent("waiting");
      subject.showDismiss = false;
      await elementUpdated(subject);
      expect(labels(subject)).to.deep.equal([]);
    });
  });

  describe("Styling", () => {
    it("turns the border to border/error on a failed row", async () => {
      const subject = await createComponent("error");
      const p = document.createElement("div");
      p.style.borderTopColor = "var(--border-error)";
      document.body.append(p);
      const want = getComputedStyle(p).borderTopColor;
      p.remove();
      expect(getComputedStyle(subject.shadowRoot!.querySelector(".row")!).borderTopColor).to.equal(want);
    });
  });

  describe("Interaction", () => {
    it("fires retry from Try again", async () => {
      const subject = await createComponent("error");
      setTimeout(() => subject.shadowRoot!.querySelector<HTMLElement>(".retry")!.click());
      await oneEvent(subject, "retry");
    });
  });
});
