import { elementUpdated, expect, fixture, fixtureCleanup, html } from "@open-wc/testing";
import type { ZetaTopAppbar } from "../../components/top-appbar/top-appbar.js";
import "../../components/top-appbar/top-appbar.js";

import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

describe("zeta-top-appbar", () => {
  // let subject: ZetaAppbar;

  // const createComponent = (template = `<zeta-top-appbar></zeta-top-appbar>`) => {
  //   // prettier-ignore
  //   return fixture<ZetaAppbar>(html`${unsafeStatic(template)}`);
  // };

  // beforeEach(async () => {
  //   subject = await createComponent();
  // });

  describe("Accessibility", () => {
    it("meets accessibility requirements on every type", async () => {
      for (const type of ["default", "centered", "contextual", "contextual alt", "search", "extended"] as const) {
        const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar .type=${type} pageTitle="Inbox"></zeta-top-appbar>`);
        await expect(appbar).shadowDom.to.be.accessible();
        fixtureCleanup();
      }
    });

    it("exposes the title as a heading at headingLevel", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar type="default" pageTitle="Inbox" .headingLevel=${2}></zeta-top-appbar>`);
      const heading = appbar.shadowRoot?.querySelector("[role='heading']");
      await expect(heading?.textContent).to.equal("Inbox");
      await expect(heading?.getAttribute("aria-level")).to.equal("2");
    });

    it("names the leading control after the type, unless leadingLabel says otherwise", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar type="contextual"></zeta-top-appbar>`);
      const control = appbar.shadowRoot?.querySelector("zeta-icon-button");
      await expect(control?.getAttribute("aria-label")).to.equal("Clear selection");
      appbar.leadingLabel = "Cancel";
      await elementUpdated(appbar);
      await expect(control?.getAttribute("aria-label")).to.equal("Cancel");
    });
  });

  describe("Content", () => {
    it("renders the appbar with default values", async () => {
      const appbar: ZetaTopAppbar = await fixture(html`<zeta-top-appbar></zeta-top-appbar>`);
      expect(appbar.centered).to.be.false;
      expect(appbar.extended).to.be.false;
    });

    it("renders the appbar with centered title", async () => {
      const appbar: ZetaTopAppbar = await fixture(html`<zeta-top-appbar centered></zeta-top-appbar>`);
      expect(appbar.centered).to.be.true;
      expect(appbar.extended).to.be.false;
    });

    it("renders the appbar with extended title", async () => {
      const appbar: ZetaTopAppbar = await fixture(html`<zeta-top-appbar extended></zeta-top-appbar>`);
      expect(appbar.centered).to.be.false;
      expect(appbar.extended).to.be.true;
    });

    it("renders content in the appbars leading slot", async () => {
      const appbar = await fixture(html`
        <zeta-top-appbar>
          <div slot="leading">Leading content</div>
        </zeta-top-appbar>
      `);

      const slot: HTMLSlotElement | null | undefined = appbar.shadowRoot?.querySelector("#leading-slot");
      expect(slot?.assignedElements()).to.not.be.empty;
    });

    it("renders content in the appbars trailing slot", async () => {
      const appbar = await fixture(html`
        <zeta-top-appbar>
          <div slot="trailing">trailing content</div>
        </zeta-top-appbar>
      `);

      const slot: HTMLSlotElement | null | undefined = appbar.shadowRoot?.querySelector("#trailing-slot");
      expect(slot?.assignedElements()).to.not.be.empty;
    });

    it("renders content in the appbar", async () => {
      const appbar = await fixture(html` <zeta-top-appbar> <div>Title</div> </zeta-top-appbar> `);

      const slot: HTMLSlotElement | null | undefined = appbar.shadowRoot?.querySelector("#content-slot");
      expect(slot?.assignedElements()).to.not.be.empty;
    });
  });

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    const token = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

    it("binds the bar to its spec tokens", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar type="default"></zeta-top-appbar>`);
      const bar = appbar.shadowRoot?.querySelector("header") as Element;
      await expect(getComputedStyle(bar).paddingTop).to.equal(token(appbar, "--space-md"));
      await expect(getComputedStyle(bar).paddingLeft).to.equal(token(appbar, "--space-sm"));
      await expect(getComputedStyle(bar).backgroundColor).to.equal(getCssVarColorValue(appbar, "--surface-section"));
      appbar.shape = "rounded";
      await elementUpdated(appbar);
      await expect(getComputedStyle(bar).borderRadius).to.equal(token(appbar, "--radius-element-sm"));
    });

    it("keeps nested controls rounded on a sharp bar", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar type="default" shape="sharp"></zeta-top-appbar>`);
      await expect(appbar.shadowRoot?.querySelector("zeta-icon-button")?.getAttribute("shape")).to.equal("rounded");
    });

    it("sets trailing actions space/none apart", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar type="default"></zeta-top-appbar>`);
      const slot = appbar.shadowRoot?.querySelector("#trailing-slot") as Element;
      await expect(getComputedStyle(slot).columnGap).to.equal("0px");
    });

    it("stands 60 tall, and extended takes a second row", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar type="default" pageTitle="Inbox"></zeta-top-appbar>`);
      await expect(appbar.shadowRoot?.querySelector("header")?.getBoundingClientRect().height).to.equal(60);
      appbar.type = "extended";
      await elementUpdated(appbar);
      await expect(appbar.shadowRoot?.querySelector("header")?.getBoundingClientRect().height).to.equal(100);
    });
  });

  describe("Interaction", () => {
    it("draws its own leading control for a type and reports activation", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar type="search"></zeta-top-appbar>`);
      let clicks = 0;
      appbar.addEventListener("leading-click", () => clicks++);
      (appbar.shadowRoot?.querySelector("zeta-icon-button") as HTMLElement).click();
      await expect(clicks).to.equal(1);
      expect(appbar.shadowRoot?.querySelector("zeta-search")).to.exist;
    });

    it("reports the count on contextual", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar type="contextual" count="3 Items"></zeta-top-appbar>`);
      await expect(appbar.shadowRoot?.querySelector("[role='status']")?.textContent).to.equal("3 Items");
    });

    it("shows the page title beside whitespace in the default slot", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar type="default" pageTitle="Inbox"> </zeta-top-appbar>`);
      expect(appbar.shadowRoot?.querySelector(".title")?.textContent).to.contain("Inbox");
    });

    it("carries an avatar on default only, from a photo or initials", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar type="default" avatarInitials="RK"></zeta-top-appbar>`);
      expect(appbar.shadowRoot?.querySelector("zeta-avatar")?.textContent).to.contain("RK");
      appbar.type = "centered";
      await elementUpdated(appbar);
      expect(appbar.shadowRoot?.querySelector("zeta-avatar")).to.not.exist;
    });

    it("passes searchValue to the field and drops the trailing slot on search", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar type="search" searchValue="Boxes"></zeta-top-appbar>`);
      expect(appbar.shadowRoot?.querySelector("zeta-search")?.value).to.equal("Boxes");
      expect(appbar.shadowRoot?.querySelector("#trailing-slot")).to.not.exist;
    });

    it("takes its actions through contextual-controls on the selection types", async () => {
      const appbar = await fixture<ZetaTopAppbar>(
        html`<zeta-top-appbar type="contextual alt"><button slot="contextual-controls">Share</button></zeta-top-appbar>`
      );
      const slot = appbar.shadowRoot?.querySelector("#trailing-slot") as HTMLSlotElement;
      await expect(slot.name).to.equal("contextual-controls");
      await expect(slot.assignedElements().length).to.equal(1);
    });

    it("draws nothing of its own without a type", async () => {
      const appbar = await fixture<ZetaTopAppbar>(html`<zeta-top-appbar></zeta-top-appbar>`);
      expect(appbar.shadowRoot?.querySelector("zeta-icon-button")).to.not.exist;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
