import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import { lightboxKindOf, type ZetaLightbox, type LightboxItem } from "../../components/lightbox/lightbox.js";
import "../../components/lightbox/lightbox.js";
import "../../index.css";
import { oneEvent } from "@open-wc/testing";

const svg = (name: string): LightboxItem => ({
  file: new File([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24"><rect width="32" height="24" fill="#888"/></svg>`], name, {
    type: "image/svg+xml"
  })
});
const IMAGES: LightboxItem[] = [svg("One.svg"), svg("Two.svg"), svg("Three.svg")];
const ZIP: LightboxItem = { file: new File(["z"], "Export.zip", { type: "application/zip" }) };

const createComponent = (items: LightboxItem[] = IMAGES, extra: Partial<ZetaLightbox> = {}) =>
  fixture<ZetaLightbox>(html`<zeta-lightbox initialOpen .items=${items}></zeta-lightbox>`).then(async el => {
    Object.assign(el, extra);
    await elementUpdated(el);
    return el;
  });

describe("zeta-lightbox", () => {
  describe("Accessibility", () => {
    it("names the dialog after the current item", async () => {
      const subject = await createComponent();
      const dialog = subject.shadowRoot!.querySelector("dialog")!;
      await expect(dialog.getAttribute("aria-label")).to.equal("One.svg");
    });

    it("labels every toolbar control", async () => {
      const subject = await createComponent();
      const labels = [...subject.shadowRoot!.querySelectorAll(".actions zeta-icon-button")].map(b => b.getAttribute("aria-label"));
      await expect(labels).to.deep.equal(["Open in a new tab", "Download", "Close"]);
    });

    it("marks every frame but the current one hidden and inert", async () => {
      const subject = await createComponent();
      const slots = [...subject.shadowRoot!.querySelectorAll<HTMLElement>(".slot")];
      await expect(slots.map(s => s.getAttribute("aria-hidden"))).to.deep.equal([null, "true", "true"]);
      await expect(slots.map(s => s.hasAttribute("inert"))).to.deep.equal([false, true, true]);
    });
  });

  describe("Content", () => {
    it("derives the kind from the MIME type or extension, never a property", () => {
      expect(lightboxKindOf(svg("a.svg"))).to.equal("image");
      expect(lightboxKindOf({ src: "clip.mp4" })).to.equal("video");
      expect(lightboxKindOf({ src: "doc.pdf" })).to.equal("pdf");
      expect(lightboxKindOf(ZIP)).to.equal("other");
    });

    it("shows the item's name and the counter in the toolbar", async () => {
      const subject = await createComponent();
      await expect(subject.shadowRoot!.querySelector(".name")!.textContent).to.equal("One.svg");
      await expect(subject.shadowRoot!.querySelector(".counter")!.textContent).to.equal("1 of 3");
    });

    it("hides the counter and navigation with a single item", async () => {
      const subject = await createComponent([IMAGES[0]]);
      await expect(subject.shadowRoot!.querySelector(".counter")).to.equal(null);
      await expect(subject.shadowRoot!.querySelector(".prev")).to.equal(null);
    });

    it("shows the drawn sheet and the no-preview message for an unpreviewable item", async () => {
      const subject = await createComponent([ZIP]);
      await expect(subject.shadowRoot!.querySelector(".sheet")).to.not.equal(null);
      await expect(subject.shadowRoot!.querySelector(".no-preview")!.textContent).to.equal("No preview for this file");
    });

    it("mounts only the neighbouring frames, so paging never reloads", async () => {
      const subject = await createComponent([...IMAGES, svg("Four.svg")]);
      const filled = [...subject.shadowRoot!.querySelectorAll(".slot")].map(s => s.children.length > 0);
      await expect(filled).to.deep.equal([true, true, false, false]);
    });
  });

  describe("Styling", () => {
    it("fills the stage with surface/subtle", async () => {
      const subject = await createComponent();
      const stage = subject.shadowRoot!.querySelector(".stage")!;
      const expected = getComputedStyle(subject).getPropertyValue("--surface-subtle").trim();
      const probe = document.createElement("div");
      probe.style.background = expected;
      document.body.appendChild(probe);
      await expect(getComputedStyle(stage).backgroundColor).to.equal(getComputedStyle(probe).backgroundColor);
      probe.remove();
    });

    it("binds the panel border through the --zebra alias of the shadowed border/default", async () => {
      const subject = await createComponent();
      const dialog = subject.shadowRoot!.querySelector("dialog")!;
      const expected = getComputedStyle(subject).getPropertyValue("--zebra-border-default").trim();
      const probe = document.createElement("div");
      probe.style.color = expected;
      document.body.appendChild(probe);
      await expect(getComputedStyle(dialog).borderTopColor).to.equal(getComputedStyle(probe).color);
      probe.remove();
    });

    it("squares the panel and stage when rounded is off", async () => {
      const subject = await createComponent(IMAGES, { rounded: false });
      const dialog = subject.shadowRoot!.querySelector("dialog")!;
      await expect(getComputedStyle(dialog).borderTopLeftRadius).to.equal("0px");
    });
  });

  describe("Interaction", () => {
    it("pages with the next control and fires change", async () => {
      const subject = await createComponent();
      const next = subject.shadowRoot!.querySelector<HTMLElement>(".next")!;
      setTimeout(() => next.click());
      const e: CustomEvent<{ index: number }> = await oneEvent(subject, "change");
      await expect(e.detail.index).to.equal(1);
      await expect(subject.index).to.equal(1);
    });

    it("pages with the arrow keys", async () => {
      const subject = await createComponent();
      const dialog = subject.shadowRoot!.querySelector("dialog")!;
      dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      await elementUpdated(subject);
      await expect(subject.index).to.equal(1);
      dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
      await elementUpdated(subject);
      await expect(subject.index).to.equal(0);
    });

    it("disables previous on the first item and next on the last", async () => {
      const subject = await createComponent();
      await expect(subject.shadowRoot!.querySelector(".prev")!.hasAttribute("disabled")).to.equal(true);
      subject.index = 2;
      await elementUpdated(subject);
      await expect(subject.shadowRoot!.querySelector(".next")!.hasAttribute("disabled")).to.equal(true);
    });

    it("hides each toolbar control behind its show* property", async () => {
      const subject = await createComponent(IMAGES, { showOpenInNew: false, showDownload: false, showNavigation: false });
      await expect(subject.shadowRoot!.querySelectorAll(".actions zeta-icon-button").length).to.equal(1);
      await expect(subject.shadowRoot!.querySelector(".prev")).to.equal(null);
    });

    it("closes from the close control", async () => {
      const subject = await createComponent();
      subject.shadowRoot!.querySelector<HTMLElement>(".actions zeta-icon-button:last-of-type")!.click();
      await elementUpdated(subject);
      await expect(subject.open).to.equal(false);
    });
  });
});
