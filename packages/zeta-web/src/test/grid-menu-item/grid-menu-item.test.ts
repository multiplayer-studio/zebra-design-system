import { elementUpdated, expect, fixture, html, unsafeStatic } from "@open-wc/testing";
import type { ZetaGridMenuItem } from "../../components/grid-menu-item/grid-menu-item.js";
import { getCssVarColorValue, getSlottedIconName, getSlotText } from "../utils.js";
import "../../components/grid-menu-item/grid-menu-item.js";
import "../../index.css";

describe("zeta-grid-menu-item", () => {
  const label = "Label";
  const icon = "star";
  const badgeId = "badge";

  let subject: ZetaGridMenuItem;

  const createComponent = (
    template = `<zeta-grid-menu-item>
    <zeta-icon slot="icon">${icon}</zeta-icon>
    <zeta-notification-indicator slot="badge" id=${badgeId}>2</zeta-notification-indicator>
    ${label}
  </zeta-grid-menu-item>`
  ) => {
    // prettier-ignore
    return fixture<ZetaGridMenuItem>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the given icon", async () => {
      await expect(getSlottedIconName(subject)).to.equal(icon);
    });

    it("renders the given label", async () => {
      await expect(getSlotText(subject)).to.equal(label);
    });

    it("renders the given badge", () => {
      const badgeElement = subject.shadowRoot?.querySelector(`#${badgeId}`);

      expect(badgeElement).to.not.be.undefined;
    });
  });

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    it("gives the tile's icon and label the state's token when active and when disabled", async () => {
      subject.tile = true;
      const glyph = subject.querySelector("zeta-icon") as Element;
      const label = subject.shadowRoot?.querySelector(".label") as Element;
      await expect(getComputedStyle(glyph).getPropertyValue("--icon-color").trim()).to.equal("currentColor");
      subject.active = true;
      await elementUpdated(subject);
      await expect(getComputedStyle(label).color).to.equal(getCssVarColorValue(subject, "--interactive-subtle-foreground-default"));
      subject.active = false;
      subject.disabled = true;
      await elementUpdated(subject);
      await expect(getComputedStyle(label).color).to.equal(getCssVarColorValue(subject, "--interactive-subtle-foreground-disabled"));
    });

    it("sets the tile's label in label/medium", async () => {
      subject.tile = true;
      await elementUpdated(subject);
      const label = subject.shadowRoot?.querySelector(".label") as Element;
      expect(getComputedStyle(label).fontSize).to.equal(getComputedStyle(subject).getPropertyValue("--label-medium-font-size").trim());
    });
  });

  describe("Interaction", () => {
    it("the tile activates from the keyboard", async () => {
      const tile = await fixture<ZetaGridMenuItem>(html`<zeta-grid-menu-item tile>Label</zeta-grid-menu-item>`);
      let clicks = 0;
      tile.addEventListener("click", () => clicks++);
      tile.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      await expect(clicks).to.equal(1);
      await expect(tile.getAttribute("tabindex")).to.equal("0");
    });

    it("a disabled tile leaves the tab order", async () => {
      const tile = await fixture<ZetaGridMenuItem>(html`<zeta-grid-menu-item tile disabled>Label</zeta-grid-menu-item>`);
      expect(tile.hasAttribute("tabindex")).to.be.false;
    });

    it("an active tile reports it", async () => {
      const tile = await fixture<ZetaGridMenuItem>(html`<zeta-grid-menu-item tile active>Label</zeta-grid-menu-item>`);
      await expect(tile.getAttribute("aria-current")).to.equal("true");
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
