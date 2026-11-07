import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import "../../components/navigation-rail/navigation-rail";
import "../../components/navigation-rail/navigation-rail-item";
import "../../components/navigation-rail/navigation-header";
import "../../components/icon/icon";
import { getSlotText } from "../utils";
import type { ZetaIcon } from "../../components/icon/icon";

describe("zeta-navigation-rail", () => {
  // describe("Accessibility", () => {});

  describe("Content", () => {
    it("renders the navigation items", async () => {
      const items = [
        { label: "Home", icon: "home" },
        { label: "Profile", icon: "person" },
        { label: "Settings", icon: "settings" }
      ];

      const element = await fixture(html`
        <zeta-navigation-rail>
          ${items.map(item => html` <zeta-navigation-rail-item><zeta-icon slot="icon">${item.icon}</zeta-icon>${item.label} </zeta-navigation-rail-item> `)}
        </zeta-navigation-rail>
      `);

      const navigationItems = element.querySelectorAll("zeta-navigation-rail-item");
      expect(navigationItems).to.have.lengthOf(items.length);

      let i = 0;
      for (const item of navigationItems) {
        const label = getSlotText(item);
        await expect(label).to.equal(items[i].label);

        const icon = (item.shadowRoot?.querySelector("slot[name=icon]") as HTMLSlotElement).assignedElements()[0] as ZetaIcon;
        await expect(getSlotText(icon)).to.equal(items[i].icon);
        i++;
      }
    });

    it("keeps a divider between items in the menu slot", async () => {
      const element = await fixture(
        html`<zeta-navigation-rail
          ><zeta-navigation-rail-item>Item 1</zeta-navigation-rail-item>
          <hr id="divider"
        /></zeta-navigation-rail>`
      );
      const divider = element.querySelector("#divider") as HTMLElement;
      await expect(window.getComputedStyle(divider).display).to.not.equal("none");
    });
  });

  describe("Dimensions", () => {
    const railWidth = async (template: ReturnType<typeof html>) => {
      const host = await fixture(template);
      const rail = host.querySelector("zeta-navigation-rail")!;
      await (rail as unknown as { updateComplete: Promise<unknown> }).updateComplete;
      return (rail.shadowRoot?.querySelector(".rail") as HTMLElement).getBoundingClientRect().width;
    };

    it("is 200px wide by default", async () => {
      await expect(await railWidth(html`<div style="width: 400px"><zeta-navigation-rail expanded></zeta-navigation-rail></div>`)).to.equal(200);
    });

    it("takes the width the project sets", async () => {
      await expect(await railWidth(html`<div style="width: 400px"><zeta-navigation-rail expanded rail-width="255"></zeta-navigation-rail></div>`)).to.equal(255);
    });

    it("fills its container with rail-width=fill", async () => {
      await expect(await railWidth(html`<div style="width: 320px; display: flex"><zeta-navigation-rail expanded rail-width="fill"></zeta-navigation-rail></div>`)).to.equal(320);
    });
  });

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("draws the header action with the icon it is given", async () => {
      const header = await fixture(html`<zeta-navigation-header expanded action-icon="home" action-label="Home"></zeta-navigation-header>`);
      const button = header.shadowRoot?.querySelector("zeta-icon-button") as HTMLElement;
      await expect(button.textContent?.trim()).to.equal("home");
      await expect(button.getAttribute("aria-label")).to.equal("Home");
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
