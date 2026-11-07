import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import { emulateMedia, sendMouse, resetMouse } from "@web/test-runner-commands";
import sinon from "sinon";
import type { ZetaGlobalHeader } from "../../components/global-header/global-header.js";
import "../../components/global-header/global-header.js";
import "../../index.css";
import "../../components/global-header/global-header.styles.js";
import { getCssVarColorValue } from "../utils.js";

describe("zeta-global-header", () => {
  beforeEach(() => {
    window.resizeTo?.(1920, 1080); // If supported
    // Or, for jsdom:
    (window as any).innerWidth = 1920;
    (window as any).innerHeight = 1080;
    document.documentElement.style.width = "1920px";
    window.dispatchEvent(new Event("resize"));
  });

  let subject: ZetaGlobalHeader;
  const createComponent = (
    template = `<zeta-global-header platformName="Platform Name" .name="Name" .initials="RK" appSwitcher=true .rounded=true>

          <!-- Menu items -->
          <zeta-dropdown-menu-button rounded=true slot="menu-items" flavor="subtle"
          .items=[{ label: "Menu Item" }, { label: "Menu Item" }, { label: "Menu Item" }]>Nav Item</zeta-dropdown-menu-button>
          <zeta-button shape=rounded slot="menu-items" flavor="subtle">Nav Item</zeta-button>
          <zeta-button shape=rounded slot="menu-items" flavor="subtle">Nav Item</zeta-button>
          <zeta-button shape=rounded slot="menu-items" flavor="subtle">Nav Item</zeta-button>
          <zeta-button shape=rounded slot="menu-items" flavor="subtle">Nav Item</zeta-button>
          <zeta-button shape=rounded slot="menu-items" flavor="subtle">Nav Item</zeta-button>

          <!-- Action items -->
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>

          <!-- Avatar -->
          <zeta-avatar id="avatar" slot="user-avatar" size="xxs" .showClose=false .showRing=false>RK</zeta-avatar>

        </zeta-global-header>`
  ) => {
    // prettier-ignore
    return fixture<ZetaGlobalHeader>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("names the menu button, app switcher and navigation region", async () => {
      subject.menuLabel = "Open menu";
      subject.appSwitcherLabel = "Change product";
      subject.navigationLabel = "Primary";
      await elementUpdated(subject);
      const root = subject.shadowRoot!;
      await expect(root.querySelector("zeta-icon-button")?.getAttribute("aria-label")).to.equal("Open menu");
      await expect(root.querySelector("#app-switcher")?.getAttribute("aria-label")).to.equal("Change product");
      await expect(root.querySelector("nav")?.getAttribute("aria-label")).to.equal("Primary");
    });
    //Remove the theme and contrast stylesheets after each test
    afterEach(() => {
      document.getElementById("theme-mode")?.remove();
      document.getElementById("contrast-mode")?.remove();
    });

    it("meets accessibility requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("takes a full avatar in the account slot and sizes it to xxs", async () => {
      const header: ZetaGlobalHeader = await fixture(html`<zeta-global-header>
        <zeta-avatar slot="user-avatar" swatch-color="burgundy"><zeta-icon>verified</zeta-icon></zeta-avatar>
      </zeta-global-header>`);
      await elementUpdated(header);
      const avatar = header.querySelector("zeta-avatar")!;
      await expect(avatar.getAttribute("size")).to.equal("xxs");
      await expect(avatar.getAttribute("swatch-color")).to.equal("burgundy");
    });

    it("draws both dividers together, and neither without the toggle", async () => {
      await expect(subject.shadowRoot?.querySelectorAll("zeta-divider").length).to.equal(0);
      subject.dividers = true;
      await elementUpdated(subject);
      const dividers = subject.shadowRoot?.querySelectorAll("zeta-divider");
      await expect(dividers?.length).to.equal(2);
      dividers?.forEach(divider => expect(divider.getBoundingClientRect().height).to.be.above(0));
    });
    it("hides the regions nothing is slotted into", async () => {
      const bare = await fixture<ZetaGlobalHeader>(html`<zeta-global-header></zeta-global-header>`);
      await expect(getComputedStyle(bare.shadowRoot!.querySelector("#action-items")!).display).to.equal("none");
      await expect(getComputedStyle(bare.shadowRoot!.querySelector("#menu-items")!).display).to.equal("none");
    });
    it("renders the platform name", async () => {
      const platformName = subject.shadowRoot?.querySelector("#platform-name");
      expect(platformName).to.exist;
      await expect(platformName?.textContent).to.equal("Platform Name");
    });
    it("renders the name", async () => {
      const name = subject.shadowRoot?.querySelector("#name");
      expect(name).to.exist;
      await expect(name?.textContent).to.equal("Name");
    });
    it("renders the initials", async () => {
      const avatar = subject.querySelector("#avatar");
      expect(avatar).to.exist;
      await expect(avatar?.textContent).to.equal("RK");
    });
    it("renders the app switcher", () => {
      const appSwitcher = subject.shadowRoot?.querySelector("#app-switcher");
      expect(appSwitcher).to.exist;
    });
    it("renders the menu items", async () => {
      const menuItems = subject.shadowRoot?.querySelector("slot[name='menu-items']");
      expect(menuItems).to.exist;
      const assignedNodesLength = (menuItems as HTMLSlotElement)?.assignedNodes().length;
      await expect(assignedNodesLength).to.equal(6);
    });
    it("renders the action items", async () => {
      const actionItems = subject.shadowRoot?.querySelector("slot[name='action-items']");
      expect(actionItems).to.exist;
      const assignedNodesLength = (actionItems as HTMLSlotElement)?.assignedNodes().length;
      await expect(assignedNodesLength).to.equal(6);
    });
    it("hides the platform name and the logo region on request", async () => {
      const header = await fixture<ZetaGlobalHeader>(html`<zeta-global-header .showPlatformName=${false} .showLogo=${false}></zeta-global-header>`);
      expect(header.shadowRoot?.querySelector("#platform-name")).to.not.exist;
      expect(header.shadowRoot?.querySelector('[part="logo"]')?.hasAttribute("hidden")).to.be.true;
    });
    it("renders the zebra logo", () => {
      const logo = subject.shadowRoot?.querySelector('[part="logo"]');
      expect(logo).to.exist;
      const svg = logo?.querySelector("svg");
      expect(svg).to.exist;
    });
  });

  describe("Dimensions", () => {
    it("caps search at 280 and shrinks it in a narrow bar without touching its neighbours", async () => {
      const wrap = await fixture<HTMLDivElement>(html`<div style="width: 1600px"><zeta-global-header name="Name" searchbar></zeta-global-header></div>`);
      const header = wrap.firstElementChild as HTMLElement;
      const search = header.shadowRoot!.querySelector("#search-bar")!;
      await expect(search.getBoundingClientRect().width).to.equal(280);
      wrap.style.width = "520px";
      const shrunk = search.getBoundingClientRect();
      expect(shrunk.width).to.be.below(280);
      const left = header.shadowRoot!.querySelector("#header-left")!.getBoundingClientRect();
      const account = header.shadowRoot!.querySelector("#user-info-button")!.getBoundingClientRect();
      expect(shrunk.left).to.be.at.least(left.right);
      expect(shrunk.right).to.be.at.most(account.left);
    });

    it("logo has correct dimensions", () => {
      const logo = subject.shadowRoot?.querySelector('[part="logo"]') as HTMLElement;
      expect(logo).to.exist;
      const rect = logo.getBoundingClientRect();
      expect(rect.height).to.be.closeTo(32, 1); // allow 1px tolerance
      expect(rect.width).to.be.closeTo(80, 1);
    });
    it("has icon buttons with dimensions of 40px by 40px", () => {
      const iconButtons = subject.shadowRoot?.querySelectorAll("zeta-icon-button");
      expect(iconButtons).to.exist;
      iconButtons!.forEach(button => {
        expect(button).to.have.style("width", "40px");
        expect(button).to.have.style("height", "40px");
      });
    });
  });

  describe("Styling", () => {
    it("stays dark on a light page unless overridden on the header", async () => {
      const page = await fixture<HTMLDivElement>(html`<div data-theme="light"><zeta-global-header></zeta-global-header></div>`);
      const header = page.firstElementChild as ZetaGlobalHeader;
      const bar = header.shadowRoot?.querySelector("#header-main") as Element;
      const dark = getComputedStyle(bar).backgroundColor;
      await expect(header.getAttribute("data-theme")).to.equal("dark");
      header.theme = "light";
      await elementUpdated(header);
      await expect(getComputedStyle(bar).backgroundColor).to.not.equal(dark);
      await expect(getComputedStyle(bar).backgroundColor).to.equal(getCssVarColorValue(page, "--surface-section"));
    });
    it("leaves a subtle dropdown in the navigation region with no fill at rest", () => {
      const anchor = subject.querySelector("zeta-dropdown-menu-button")?.shadowRoot?.querySelector("#anchor") as Element;
      expect(getComputedStyle(anchor).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
    });
    it("binds the logo to foreground/primary", () => {
      const logo = subject.shadowRoot?.querySelector("[part='logo']") as Element;
      expect(getComputedStyle(logo).color).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
    });
    it("spaces slotted items by space/3xs", () => {
      const slot = subject.shadowRoot?.querySelector("slot[name='action-items']") as HTMLSlotElement;
      const gap = getComputedStyle(subject).getPropertyValue("--space-3xs").trim();
      expect(getComputedStyle(slot).columnGap).to.equal(gap);
    });
    it("sizes the account chevron from control/icon-sm", () => {
      const chevron = subject.shadowRoot?.querySelector("#user-info-icon") as Element;
      expect(`${chevron.getBoundingClientRect().width}px`).to.equal(getComputedStyle(subject).getPropertyValue("--control-icon-sm").trim());
    });
    it("has the correct background color", () => {
      const mainContainer = subject.shadowRoot?.querySelector("#header-main");
      expect(mainContainer).to.exist;
      const expected = getCssVarColorValue(subject, "--surface-section");
      expect(getComputedStyle(mainContainer as HTMLElement).backgroundColor).to.equal(expected);
    });
    it("has buttons with flavor of subtle", () => {
      const buttons = subject.shadowRoot?.querySelectorAll("zeta-button");
      expect(buttons).to.exist;
      buttons!.forEach(button => {
        expect(button).to.have.attribute("flavor", "subtle");
      });
    });
    it("has an avatar with the correct background color", () => {
      const avatarElement = subject.querySelector("#avatar");
      expect(avatarElement).to.exist;
      const avatar = avatarElement?.shadowRoot?.querySelector(".avatar");
      expect(avatar).to.exist;
      expect(getComputedStyle(avatar as Element).backgroundColor).to.equal(getCssVarColorValue(subject, "--chart-series-4"));
    });
    it("has platform name with the correct color", () => {
      const platformName = subject.shadowRoot?.querySelector("#platform-name");
      expect(platformName).to.exist;
      expect(getComputedStyle(platformName as Element).color).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
    });
    it("has name with the correct color", () => {
      const name = subject.shadowRoot?.querySelector("#name");
      expect(name).to.exist;
      expect(getComputedStyle(name as Element).color).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
    });
  });

  describe("Interaction", () => {
    afterEach(async () => {
      await resetMouse();
    });

    it("fills the whole account control on hover", async () => {
      await emulateMedia({ reducedMotion: "reduce" });
      // A narrow wrapper keeps the control inside the viewport, past the 1920 page width set above.
      const wrap = await fixture<HTMLDivElement>(html`<div style="width: 600px"><zeta-global-header></zeta-global-header></div>`);
      const bare = wrap.firstElementChild as ZetaGlobalHeader;
      const part = bare.shadowRoot?.querySelector("#user-info-button")?.shadowRoot?.querySelector("button") as HTMLElement;
      const box = part.getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(box.left + 3), Math.round(box.top + 3)] });
      expect(getComputedStyle(part).backgroundColor).to.equal(getCssVarColorValue(bare, "--interactive-neutral-background-hover"));
    });
    it("fires app-switcher-click when the app switcher is clicked", () => {
      const eventSpy = sinon.spy();
      subject.addEventListener("app-switcher-click", eventSpy);
      (subject.shadowRoot?.querySelector("#app-switcher") as HTMLElement).click();
      expect(eventSpy).to.have.been.calledOnce;
    });
    it("user info button is clickable", () => {
      const userInfoButton = subject.shadowRoot?.querySelector("#user-info-button") as HTMLButtonElement;
      expect(userInfoButton).to.exist;

      const onClickSpy = sinon.spy();
      userInfoButton?.addEventListener("click", onClickSpy);
      userInfoButton?.click();
      expect(onClickSpy).to.have.been.calledOnce;
    });
    it("hamburger menu button is clickable", () => {
      const hamburgerMenuButton = subject.shadowRoot?.querySelector("zeta-icon-button");
      expect(hamburgerMenuButton).to.exist;

      const onClickSpy = sinon.spy();
      hamburgerMenuButton?.addEventListener("click", onClickSpy);
      hamburgerMenuButton?.click();
      expect(onClickSpy).to.have.been.calledOnce;
    });
    it("app switcher button is clickable", () => {
      const appSwitcherButton = subject.shadowRoot?.querySelector("#app-switcher") as HTMLButtonElement;
      expect(appSwitcherButton).to.exist;

      const onClickSpy = sinon.spy();
      appSwitcherButton?.addEventListener("click", onClickSpy);
      appSwitcherButton?.click();
      expect(onClickSpy).to.have.been.calledOnce;
    });
    //Test of userInfoButton calls the onUserInfoClick callback function
    it("calls the onUserInfoClick callback when user info button is clicked", () => {
      const eventSpy = sinon.spy();
      subject.addEventListener("user-info-click", eventSpy);

      // Get the user info button
      const userInfoButton = subject.shadowRoot?.querySelector("#user-info-button");
      expect(userInfoButton).to.exist;

      // Simulate the click
      (userInfoButton as HTMLButtonElement).click();

      // Assert the event was dispatched
      expect(eventSpy).to.have.been.calledOnce;
    });
    it("calls the onHamburgerMenuClick callback when hamburger menu button is clicked", () => {
      const eventSpy = sinon.spy();
      subject.addEventListener("hamburger-menu-click", eventSpy);

      // Get the hamburger menu button
      const hamburgerMenuButton = subject.shadowRoot?.querySelector("zeta-icon-button");
      expect(hamburgerMenuButton).to.exist;

      // Simulate the click
      hamburgerMenuButton!.click();

      // Assert the event was dispatched
      expect(eventSpy).to.have.been.calledOnce;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
