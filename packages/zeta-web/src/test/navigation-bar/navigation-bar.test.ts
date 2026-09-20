import { expect, fixture, html, unsafeStatic } from "@open-wc/testing";
import type { ZetaNavigationBar } from "../../components/navigation-bar/navigation-bar.js";
import type { ZetaGridMenuItem } from "../../components/grid-menu-item/grid-menu-item.js";
import "../../components/grid-menu-item/grid-menu-item.js";
import "../../components/navigation-bar/navigation-bar.js";
import "../../components/badges/indicators/indicators.js";

describe("zeta-navigation-bar", () => {
  const label = "Label";
  const icon = "star";
  const badgeValue = "2";

  let subject: ZetaNavigationBar;

  const createComponent = (
    template = `<zeta-navigation-bar>
      <zeta-grid-menu-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-grid-menu-item>
    <zeta-grid-menu-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-grid-menu-item>
    <zeta-grid-menu-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-grid-menu-item>
    </zeta-navigation-bar>`
  ) => {
    // prettier-ignore
    return fixture<ZetaNavigationBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe.skip("Accessibility", () => {
    it("meets accessability requirements", () => {
      expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the correct number of navigation bar items", () => {
      const items = subject.querySelectorAll("zeta-grid-menu-item");
      expect(items.length).to.equal(3);
    });

    it("renders the correct label and icon for each navigation bar item", () => {
      const items = subject.querySelectorAll("zeta-grid-menu-item");
      Array.from(items).forEach(item => {
        const itemLabel = item.getAttribute("label");
        const itemIcon = item.getAttribute("icon");
        expect(itemLabel).to.equal(label);
        expect(itemIcon).to.equal(icon);
      });
    });

    it("renders the correct badge content for each navigation bar item", () => {
      const badges = subject.querySelectorAll("zeta-notification-indicator");
      Array.from(badges).forEach(badge => {
        expect(badge.getAttribute("value")).to.equal(badgeValue);
      });
    });

    it("updates badge content when the value changes", async () => {
      const newBadgeValue = "5";
      const badges = subject.querySelectorAll("zeta-notification-indicator");
      await Promise.all(
        Array.from(badges).map(async badge => {
          badge.setAttribute("value", newBadgeValue);
          await badge.updateComplete;
          expect(badge.value?.toString()).to.equal(newBadgeValue);
        })
      );
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});

describe("zeta-navigation-bar spacer", () => {
  const label = "Label";
  const icon = "star";
  const badgeValue = "2";

  let subject: ZetaNavigationBar;

  const createComponent = (
    template = `<zeta-navigation-bar shrinkItems>
      <zeta-grid-menu-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-grid-menu-item>
    <div class="spacer"></div>
    <zeta-grid-menu-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-grid-menu-item>
    </zeta-navigation-bar>`
  ) => {
    // prettier-ignore
    return fixture<ZetaNavigationBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  // describe.skip("Accessibility", () => {});

  // describe("Content", () => {});

  describe.skip("Dimensions", () => {
    it.skip("keeps a fixed width", async () => {
      const item0: ZetaGridMenuItem = subject.querySelector("zeta-grid-menu-item")!;
      item0.setAttribute("label", "SomethingVeryVeryLong");
      await item0.updateComplete;
      expect(item0.getBoundingClientRect().width).to.equal(62);
    });
  });

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
