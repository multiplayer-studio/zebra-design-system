import { assert, fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import { ZetaDialog, type DialogFlavor } from "../../components/dialog/dialog.js";
import "../../components/dialog/dialog.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import "../../index.css";
import sinon from "sinon";
import { MouseActions, getCssVarColorValue } from "../utils.js";
import { emulateMedia } from "@web/test-runner-commands";

const flavors = ["default", "info", "success", "warning", "error"];
const confirmButtonFlavors = ["primary", "positive", "negative"];

describe("zeta-dialog", () => {
  let subject: ZetaDialog;
  const createComponent = (
    template = `<zeta-dialog id="dialog1" title="Dialog title" flavor="default" initialOpen>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          <zeta-icon slot="icon">block</zeta-icon>
          <zeta-button slot="confirm">Button</zeta-button>
          <zeta-button slot="cancel">Button</zeta-button>
          <zeta-button slot="other">Button</zeta-button>
        </zeta-dialog>`
  ) => {
    // prettier-ignore
    return fixture<ZetaDialog>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    // zeta-button transitions its colours over 120ms; reduced motion makes a read straight after a change final.
    await emulateMedia({ reducedMotion: "reduce" });
    subject = await createComponent();
  });

  const createFlavoredDialog = async (subject: ZetaDialog, flavor: DialogFlavor = "default") => {
    subject.remove();
    await elementUpdated(subject);
    return await createComponent(`<zeta-dialog id="dialog1" title="Dialog title" flavor=${flavor} initialOpen>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          <zeta-icon slot="icon">block</zeta-icon>
          <zeta-button slot="confirm">Button</zeta-button>
          <zeta-button slot="cancel">Button</zeta-button>
          <zeta-button slot="other">Button</zeta-button>
        </zeta-dialog>`);
  };

  describe("Accessibility", () => {
    //Remove the theme and contrast stylesheets after each test
    afterEach(() => {
      document.getElementById("theme-mode")?.remove();
      document.getElementById("contrast-mode")?.remove();
    });

    flavors.map(flavor => {
      it(`meets contrast requirements for the ${flavor} flavor`, async () => {
        subject = await createFlavoredDialog(subject, flavor as DialogFlavor);
        await elementUpdated(subject);
        // Check color contrast between text and background
        const dialogEl = subject.shadowRoot?.querySelector("dialog");
        if (dialogEl) {
          await contrastTest(`Dialog ${flavor} `, dialogEl, dialogEl);
        }
      });
      it(`meets aria requirements for the ${flavor} flavor`, async () => {
        subject = await createFlavoredDialog(subject, flavor as DialogFlavor);
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });

  describe("Content", () => {
    it("creates from document.createElement", function () {
      const el = document.createElement("zeta-dialog");
      assert.equal("ZETA-DIALOG", el.nodeName);
    });

    it("creates from constructor", function () {
      const el = new ZetaDialog();
      assert.equal("ZETA-DIALOG", el.nodeName);
    });

    it("changes open property on open", async () => {
      // prettier-ignore
      const el = await fixture<ZetaDialog>(html` <zeta-dialog> </zeta-dialog> `);
      await el.updateComplete;
      await el.show();
      assert.equal(el.open, true);
    });

    it("changes open property on close", async () => {
      // prettier-ignore
      const el = await fixture<ZetaDialog>(html` <zeta-dialog> </zeta-dialog> `);
      await el.show();
      await el.hide();
      assert.equal(el.open, false);
    });

    it("calls close method and sets return value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaDialog>(html` <zeta-dialog> </zeta-dialog> `);
      await el.show();
      await el.hide("testing");
      assert.equal(el.returnValue, "testing");
    });

    it("closes when clicking on the barrier if closeOnBarrierClick is true", async () => {
      // prettier-ignore
      const el = await fixture<ZetaDialog>(html`<zeta-dialog .closeOnBarrierClicked=${true}></zeta-dialog>`);
      await el.showModal();
      const dialogElement = el.shadowRoot?.querySelector("dialog");
      dialogElement?.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    it("does not close when clicking on the barrier if closeOnBarrierClick is false", async () => {
      // prettier-ignore
      const el = await fixture<ZetaDialog>(html`<zeta-dialog .closeOnBarrierClicked=${false}></zeta-dialog>`);
      await el.showModal();
      const dialogElement = el.shadowRoot?.querySelector("dialog");
      dialogElement?.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
      await el.updateComplete;
      expect(el.open).to.be.true;
    });

    it("renders an icon", async () => {
      const icon = subject.shadowRoot?.querySelector("zeta-icon");
      expect(icon).to.exist;
      await expect(icon?.name).to.equal("block");
    });

    it("renders the correct icon for each flavor", async () => {
      for (const flavor of flavors) {
        subject = await createFlavoredDialog(subject, flavor as DialogFlavor);
        await elementUpdated(subject);
        const icon = subject.shadowRoot?.querySelector("zeta-icon");
        const expectedIcon = flavor === "success" ? "verified" : flavor === "default" ? "block" : flavor;
        await expect(icon?.name).to.equal(expectedIcon);
      }
    });

    it("renders the title in the header slot", () => {
      const headerH1 = subject.shadowRoot?.querySelector("header h1");
      expect(headerH1).to.exist;
      expect(headerH1?.textContent).to.include("Dialog title");
    });

    it("renders the confirm button in the 'confirm' slot", () => {
      const confirmButton = subject.querySelector('zeta-button[slot="confirm"]');
      expect(confirmButton).to.exist;
      expect(confirmButton?.textContent).to.include("Button");
    });

    it("renders the cancel button in the 'cancel' slot", () => {
      const cancelButton = subject.querySelector('zeta-button[slot="cancel"]');
      expect(cancelButton).to.exist;
      expect(cancelButton?.textContent).to.include("Button");
    });

    it("renders the other button in the 'other' slot", () => {
      const otherButton = subject.querySelector('zeta-button[slot="other"]');
      expect(otherButton).to.exist;
      expect(otherButton?.textContent).to.include("Button");
    });

    it("truncates the label when text is longer than button width", async () => {
      const headerH1 = subject.shadowRoot?.querySelector("header h1");
      expect(headerH1).to.exist;
      headerH1!.textContent = "This title is very long and should be truncated well before it reaches the close button";
      await elementUpdated(subject);
      expect((headerH1 as HTMLElement).offsetWidth).to.be.lessThan((headerH1 as HTMLElement).scrollWidth);
      await expect(getComputedStyle(headerH1 as HTMLElement).textOverflow).to.equal("ellipsis");
      await expect(getComputedStyle(headerH1 as HTMLElement).overflow).to.equal("hidden");
    });
  });

  describe("Dimensions", () => {
    it("renders the correct width", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      await expect(getComputedStyle(dialog!).width).to.equal("480px");
    });

    it("renders the correct height", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      // Content box: with the space/md padding and both stroke/thin borders it is Figma's measured 222.
      await expect(getComputedStyle(dialog!).height).to.equal("196px");
    });

    it("stays the same width when the title is very long", async () => {
      const headerH1 = subject.shadowRoot?.querySelector("header h1");
      expect(headerH1).to.exist;
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      headerH1!.textContent = "This title is very long and should not change the dialog width";
      await elementUpdated(subject);
      await expect(getComputedStyle(dialog!).width).to.equal("480px");
    });

    it("stays the same width when the content is very long", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      const body = subject.shadowRoot?.querySelector("div[part='body']");
      expect(body).to.exist;
      body!.textContent = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nulla blandit maximus iaculis. Donec quam lacus, feugiat vel pellentesque nec, 
      pharetra eu ante. Cras ante nisi, iaculis non sapien non, gravida tempus magna. 
      Aenean in ligula convallis, ullamcorper tortor id, vehicula mi. 
      Duis sit amet lacus blandit, lacinia ligula a, tristique tortor.`;
      await elementUpdated(subject);
      await expect(getComputedStyle(dialog!).width).to.equal("480px");
    });

    it("adjusts height to fit content when the content is very long", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      const body = subject.shadowRoot?.querySelector("div[part='body']");
      expect(body).to.exist;
      body!.textContent = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nulla blandit maximus iaculis. Donec quam lacus, feugiat vel pellentesque nec, 
      pharetra eu ante. Cras ante nisi, iaculis non sapien non, gravida tempus magna. 
      Aenean in ligula convallis, ullamcorper tortor id, vehicula mi. 
      Duis sit amet lacus blandit, lacinia ligula a, tristique tortor.`;
      await elementUpdated(subject);
      await expect(getComputedStyle(dialog!).height).to.not.equal("196px");
    });
  });

  describe("Styling", () => {
    it("has the surface/overlay background, foreground/primary text and border/default border", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog") as HTMLElement;
      const style = getComputedStyle(dialog);
      await expect(style.backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-overlay"));
      await expect(style.color).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
      await expect(style.borderTopColor).to.equal(getCssVarColorValue(subject, "--zebra-border-default"));
      await expect(style.paddingTop).to.equal(getComputedStyle(subject).getPropertyValue("--space-md").trim());
      await expect(style.borderTopLeftRadius).to.equal(getComputedStyle(subject).getPropertyValue("--radius-element-md").trim());
    });

    it("dims the page behind a modal with overlay/scrim", async () => {
      const el = await fixture<ZetaDialog>(html`<zeta-dialog></zeta-dialog>`);
      await el.showModal();
      const dialog = el.shadowRoot?.querySelector("dialog") as HTMLElement;
      await expect(getComputedStyle(dialog, "::backdrop").backgroundColor).to.equal(getCssVarColorValue(el, "--overlay-scrim"));
    });

    it("keeps every flavour's glyph foreground/primary; flavour changes only the glyph", async () => {
      for (const flavor of flavors) {
        subject = await createFlavoredDialog(subject, flavor as DialogFlavor);
        await elementUpdated(subject);
        const icon = subject.shadowRoot?.querySelector("zeta-icon");
        expect(icon).to.exist;
        await expect(getComputedStyle(icon!).color).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
      }
    });

    it("sets the title in title/large and the body in body/medium", async () => {
      const v = (n: string) => getComputedStyle(subject).getPropertyValue(n).trim();
      await expect(getComputedStyle(subject.shadowRoot?.querySelector("h1") as HTMLElement).fontSize).to.equal(v("--title-large-font-size"));
      await expect(getComputedStyle(subject.shadowRoot?.querySelector("[part='body']") as HTMLElement).fontSize).to.equal(v("--body-medium-font-size"));
    });

    it("hides the close button when showClose is false", async () => {
      subject.showClose = false;
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector(".close")).to.not.exist;
    });

    it("makes close a labelled button", async () => {
      const close = subject.shadowRoot?.querySelector(".close") as HTMLElement;
      await expect(close.tagName).to.equal("BUTTON");
      await expect(close.getAttribute("aria-label")).to.equal("Close");
    });

    it("removes the footer when no actions are slotted", async () => {
      const el = await createComponent(`<zeta-dialog title="Info" initialOpen>Only a message.</zeta-dialog>`);
      await elementUpdated(el);
      await expect(getComputedStyle(el.shadowRoot?.querySelector("footer") as HTMLElement).display).to.equal("none");
    });

    it("has the correct confirm button background colour when confirmButtonFlavor is changed", async () => {
      const buttonEl = subject.querySelector('zeta-button[slot="confirm"]')?.shadowRoot?.querySelector("button");
      expect(buttonEl).to.exist;
      for (const flavor of confirmButtonFlavors) {
        subject.confirmButtonFlavor = flavor as "primary" | "positive" | "negative";
        await elementUpdated(subject);
        if (flavor === "primary") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal(getCssVarColorValue(buttonEl!, "--interactive-primary-background-default"));
        } else if (flavor === "positive") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal(getCssVarColorValue(buttonEl!, "--interactive-positive-background-default"));
        } else if (flavor === "negative") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal(getCssVarColorValue(buttonEl!, "--interactive-destructive-background-default"));
        }
      }
    });

    it("has primary button flavour by default", async () => {
      const buttonEl = subject.querySelector('zeta-button[slot="confirm"]')?.shadowRoot?.querySelector("button");
      expect(buttonEl).to.exist;
      await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal(getCssVarColorValue(buttonEl!, "--interactive-primary-background-default"));
    });

    it("has the correct background colour when confirm button is hovered for each flavor", async () => {
      const buttonEl = subject.querySelector('zeta-button[slot="confirm"]')?.shadowRoot?.querySelector("button");
      expect(buttonEl).to.exist;
      for (const flavor of confirmButtonFlavors) {
        subject.confirmButtonFlavor = flavor as "primary" | "positive" | "negative";
        await MouseActions.hover(buttonEl!);
        await elementUpdated(subject);
        if (flavor === "primary") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal(getCssVarColorValue(buttonEl!, "--interactive-primary-background-hover"));
        } else if (flavor === "positive") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal(getCssVarColorValue(buttonEl!, "--interactive-positive-background-hover"));
        } else if (flavor === "negative") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal(getCssVarColorValue(buttonEl!, "--interactive-destructive-background-hover"));
        }
      }
    });

    it("has the correct background colour when the cancel button is hovered", async () => {
      const buttonEl = subject.querySelector('zeta-button[slot="cancel"]')?.shadowRoot?.querySelector("button");
      expect(buttonEl).to.exist;
      await MouseActions.hover(buttonEl!);
      await elementUpdated(subject);
      await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal(getCssVarColorValue(buttonEl!, "--interactive-ghost-background-hover"));
    });
  });

  describe("Interaction", () => {
    it("closes the dialog when the close button is clicked", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      const closeButton = subject.shadowRoot?.querySelector('zeta-icon[name="close"]');
      expect(closeButton).to.exist;
      const eventSpy = sinon.spy();
      closeButton!.addEventListener("click", eventSpy);
      await MouseActions.click(closeButton! as HTMLElement);
      await elementUpdated(subject);
      expect(dialog!.open).to.be.false;
    });
    it("opens the dialog when show() is called", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      await subject.show();
      await elementUpdated(subject);
      expect(dialog!.open).to.be.true;
    });
    it("closes the dialog when hide() is called", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      await subject.hide();
      await elementUpdated(subject);
      expect(dialog!.open).to.be.false;
    });
    it("calls the onClick handler when the confirm button is clicked", async () => {
      const confirmButton = subject.querySelector('zeta-button[slot="confirm"]');
      expect(confirmButton).to.exist;
      const eventSpy = sinon.spy();
      confirmButton!.addEventListener("click", eventSpy);
      await MouseActions.click(confirmButton! as HTMLElement);
      expect(eventSpy).to.have.been.calledOnce;
    });
    it("calls the onClick handler when the cancel button is clicked", async () => {
      const cancelButton = subject.querySelector('zeta-button[slot="cancel"]');
      expect(cancelButton).to.exist;
      const eventSpy = sinon.spy();
      cancelButton!.addEventListener("click", eventSpy);
      await MouseActions.click(cancelButton! as HTMLElement);
      expect(eventSpy).to.have.been.calledOnce;
    });
    it("calls the onClick handler when the other button is clicked", async () => {
      const otherButton = subject.querySelector('zeta-button[slot="other"]');
      expect(otherButton).to.exist;
      const eventSpy = sinon.spy();
      otherButton!.addEventListener("click", eventSpy);
      await MouseActions.click(otherButton! as HTMLElement);
      expect(eventSpy).to.have.been.calledOnce;
    });
  });
  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
