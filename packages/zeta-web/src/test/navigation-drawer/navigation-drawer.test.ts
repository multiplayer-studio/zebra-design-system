import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaNavigationDrawer } from "../../components/navigation-drawer/navigation-drawer.js";
import type { ZetaNavigationHeader } from "../../components/navigation-rail/navigation-header.js";
import type { ZetaSubMenuItem } from "../../components/navigation-rail/sub-menu-item.js";
import "../../components/navigation-drawer/navigation-drawer.js";
import "../../components/navigation-rail/navigation-header.js";
import "../../components/navigation-rail/sub-menu-item.js";
import "../../components/navigation-rail/collapsible-menu-item.js";
import "../../index.css";

const one = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;
const dialog = (el: ZetaNavigationDrawer) => one(el, "dialog") as HTMLDialogElement;
const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

const drawer = () =>
  fixture<ZetaNavigationDrawer>(
    html`<zeta-navigation-drawer>
      <zeta-navigation-header slot="header" type="logo" headline="Workcloud"></zeta-navigation-header>
      <zeta-sub-menu-item id="home" selected>Home</zeta-sub-menu-item>
      <zeta-collapsible-menu-item id="group"><span slot="heading">Reports</span>
        <zeta-sub-menu-item>Daily</zeta-sub-menu-item>
      </zeta-collapsible-menu-item>
      <zeta-sub-menu-item slot="footer">Help</zeta-sub-menu-item>
    </zeta-navigation-drawer>`
  );

describe("zeta-navigation-drawer", () => {
  describe("Accessibility", () => {
    it("is a named navigation landmark", async () => {
      const el = await drawer();
      await el.show();
      await expect(one(el, "nav").getAttribute("aria-label")).to.equal("Main");
      await expect(el).shadowDom.to.be.accessible();
    });

    it("turns the header's icon button into a named close button", async () => {
      const el = await drawer();
      const header = el.querySelector("zeta-navigation-header") as ZetaNavigationHeader;
      await elementUpdated(header);
      await expect(header.expanded).to.equal(true);
      await expect(header.showIconButton).to.equal(true);
      await expect(header.actionIcon).to.equal("close");
      await expect(header.actionLabel).to.equal("Close navigation");
    });
  });

  describe("Content", () => {
    it("slots the header, menu and footer", async () => {
      const el = await drawer();
      const names = ["header", "", "footer"].map(n => {
        const slot = el.shadowRoot!.querySelector(n ? `slot[name=${n}]` : "slot:not([name])") as HTMLSlotElement;
        return slot.assignedElements().length;
      });
      await expect(names).to.deep.equal([1, 2, 1]);
    });

    it("shows the action button only with an action label", async () => {
      const el = await drawer();
      expect(one(el, ".action")).to.not.exist;
      el.actionLabel = "New task";
      await elementUpdated(el);
      await expect(one(el, ".action").textContent?.trim()).to.equal("New task");
    });

    it("hands its shape to the parts inside", async () => {
      const el = await drawer();
      el.rounded = false;
      await elementUpdated(el);
      await expect((el.querySelector("#home") as ZetaSubMenuItem).rounded).to.equal(false);
    });
  });

  describe("Dimensions", () => {
    it("is 320px wide by default", async () => {
      const el = await drawer();
      await el.show();
      await expect(dialog(el).getBoundingClientRect().width).to.equal(320);
    });
  });

  describe("Styling", () => {
    it("is raised on surface/overlay when modal, and on surface/section when standard", async () => {
      const el = await drawer();
      await el.show();
      const probe = document.createElement("div");
      document.body.append(probe);
      probe.style.background = "var(--surface-overlay)";
      await expect(getComputedStyle(dialog(el)).backgroundColor).to.equal(getComputedStyle(probe).backgroundColor);
      await expect(getComputedStyle(dialog(el)).boxShadow).to.not.equal("none");
      el.modal = false;
      await elementUpdated(el);
      probe.style.background = "var(--surface-section)";
      await expect(getComputedStyle(dialog(el)).backgroundColor).to.equal(getComputedStyle(probe).backgroundColor);
      probe.remove();
    });

    it("has no corner radius", async () => {
      const el = await drawer();
      await el.show();
      await expect(getComputedStyle(dialog(el)).borderTopRightRadius).to.equal("0px");
      await expect(v(el, "--space-md")).to.not.equal("");
    });
  });

  describe("Interaction", () => {
    it("opens modally over a scrim", async () => {
      const el = await drawer();
      await el.show();
      await expect(dialog(el).open).to.equal(true);
      await expect(one(el, "zeta-scrim").matches(":popover-open")).to.equal(true);
    });

    it("closes when a destination is chosen, not when a group opens", async () => {
      const el = await drawer();
      await el.show();
      (el.querySelector("#group") as HTMLElement).click();
      await expect(dialog(el).open).to.equal(true);
      const closed = oneEvent(el, "close");
      (el.querySelector("#home") as HTMLElement).click();
      await closed;
      await expect(el.returnValue).to.equal("navigate");
    });

    it("closes from the header's close button", async () => {
      const el = await drawer();
      await el.show();
      const header = el.querySelector("zeta-navigation-header") as ZetaNavigationHeader;
      const closed = oneEvent(el, "close");
      header.dispatchEvent(new CustomEvent("action", { bubbles: true, composed: true }));
      await closed;
      await expect(el.returnValue).to.equal("close");
    });

    it("keeps the drawer open on navigation when close-on-navigate is false", async () => {
      const el = await drawer();
      el.closeOnNavigate = false;
      await elementUpdated(el);
      await el.show();
      (el.querySelector("#home") as HTMLElement).click();
      await elementUpdated(el);
      await expect(dialog(el).open).to.equal(true);
    });

    it("opens in place when standard", async () => {
      const el = await drawer();
      el.modal = false;
      await elementUpdated(el);
      await el.show();
      await expect(dialog(el).open).to.equal(true);
      expect(one(el, "zeta-scrim")).to.not.exist;
      await expect(getComputedStyle(dialog(el)).position).to.equal("static");
    });
  });
});
