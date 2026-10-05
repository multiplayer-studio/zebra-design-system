import { fixture, html, expect } from "@open-wc/testing";
import type { ZetaTopAppbar } from "../../components/top-appbar/top-appbar.js";
import "../../components/top-appbar/top-appbar.js";
import "../../index.css";

describe("zeta-top-appbar", () => {
  // let subject: ZetaAppbar;

  // const createComponent = (template = `<zeta-top-appbar></zeta-top-appbar>`) => {
  //   // prettier-ignore
  //   return fixture<ZetaAppbar>(html`${unsafeStatic(template)}`);
  // };

  // beforeEach(async () => {
  //   subject = await createComponent();
  // });

  // describe.skip("Accessibility", () => {});

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
    it("uses space tokens for padding and gap", async () => {
      const appbar = await fixture(html`<zeta-top-appbar></zeta-top-appbar>`);
      const style = getComputedStyle(appbar.shadowRoot!.querySelector("header")!);
      expect(style.paddingTop).to.equal("12px");
      expect(style.paddingLeft).to.equal("8px");
      expect(style.rowGap).to.equal("8px");
    });

    it("uses larger gap when extended", async () => {
      const appbar = await fixture(html`<zeta-top-appbar extended></zeta-top-appbar>`);
      expect(getComputedStyle(appbar.shadowRoot!.querySelector("header")!).rowGap).to.equal("16px");
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
