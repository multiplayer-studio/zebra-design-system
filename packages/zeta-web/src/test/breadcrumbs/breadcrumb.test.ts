import { fixture, html, expect, elementUpdated, unsafeStatic, aTimeout } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import sinon from "sinon";
import type { ZetaBreadcrumb, ZetaBreadcrumbItem } from "../../components/breadcrumbs/breadcrumb.js";
import type { ZetaDroppable } from "../../components/dropdown/droppable.js";
import "../../components/breadcrumbs/breadcrumb.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const token = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

describe("zeta-breadcrumb", () => {
  let subject: ZetaBreadcrumb;
  const maxItems = 4;
  const rounded = true;

  const createComponent = (
    template = `<zeta-breadcrumb maxItems=${maxItems} .rounded=${rounded}>
      <zeta-breadcrumb-item href="#sites">Sites</zeta-breadcrumb-item>
      <zeta-breadcrumb-item href="#north-america">North America</zeta-breadcrumb-item>
      <zeta-breadcrumb-item href="#chicago"><zeta-icon slot="icon">location</zeta-icon>Chicago</zeta-breadcrumb-item>
      <zeta-breadcrumb-item href="#warehouse">Warehouse 12</zeta-breadcrumb-item>
      <zeta-breadcrumb-item href="#receiving">Receiving</zeta-breadcrumb-item>
      <zeta-breadcrumb-item href="#dock">
        <zeta-icon slot="icon">location</zeta-icon>
        Dock 4
      </zeta-breadcrumb-item>
    </zeta-breadcrumb>`
  ) => {
    // prettier-ignore
    return fixture<ZetaBreadcrumb>(html`${unsafeStatic(template)}`);
  };

  const trigger = () => subject.shadowRoot?.querySelector("#overflow-button")?.shadowRoot?.querySelector("button") as HTMLButtonElement;
  const droppable = () => subject.shadowRoot?.querySelector("zeta-droppable") as ZetaDroppable;
  const rows = () => [...(subject.shadowRoot?.querySelectorAll("zeta-dropdown-menu-item") ?? [])];
  const visible = () => subject.items.filter(item => !item.hidden);
  const openMenu = async () => {
    trigger().click();
    await elementUpdated(subject);
    await aTimeout(0);
  };

  beforeEach(async () => {
    subject = await createComponent();
    await elementUpdated(subject);
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("is a labelled navigation region holding a list", () => {
      const nav = subject.shadowRoot?.querySelector("nav");
      expect(nav?.getAttribute("aria-label")).to.equal("Breadcrumb");
      expect(nav?.querySelector("[role='list']")).to.exist;
      for (const item of subject.items) expect(item.getAttribute("role")).to.equal("listitem");
    });

    it("marks the last item as the current page, and not as a link", () => {
      const last = subject.items.at(-1) as ZetaBreadcrumbItem;
      expect(last.shadowRoot?.querySelector("[aria-current='page']")).to.exist;
      expect(last.shadowRoot?.querySelector("a")).to.equal(null);
    });

    it("names the overflow control and reports whether the menu is open", async () => {
      const button = subject.shadowRoot?.querySelector("#overflow-button");
      expect(button?.getAttribute("aria-label")).to.equal("Show hidden pages");
      subject.overflowLabel = "More pages";
      await elementUpdated(subject);
      expect(button?.getAttribute("aria-label")).to.equal("More pages");
      expect(trigger().getAttribute("aria-haspopup")).to.equal("menu");
      expect(trigger().getAttribute("aria-expanded")).to.equal("false");
      await openMenu();
      expect(trigger().getAttribute("aria-expanded")).to.equal("true");
    });

    it("hides the separators from assistive technology", () => {
      const separator = subject.items[0].shadowRoot?.querySelector(".separator");
      expect(separator?.getAttribute("aria-hidden")).to.equal("true");
    });
  });

  describe("Content", () => {
    it("keeps the first item and the last ones, and hides the middle", () => {
      expect(subject.items.map(item => item.hidden)).to.deep.equal([false, true, true, false, false, false]);
      expect(visible().length).to.equal(maxItems);
    });

    it("places the overflow control after the first item", () => {
      const list = subject.shadowRoot?.querySelector(".list") as Element;
      const kids = [...list.children];
      expect(kids.indexOf(subject.shadowRoot?.querySelector(".overflow") as Element)).to.equal(1);
      expect(subject.items[0].slot).to.equal("leading");
    });

    it("shows every item with no maxItems, and no overflow control", async () => {
      subject.maxItems = 0;
      await elementUpdated(subject);
      await elementUpdated(subject);
      expect(visible().length).to.equal(6);
      expect(subject.shadowRoot?.querySelector(".overflow")).to.equal(null);
    });

    it("treats a maxItems of 1 as the minimum of 2", async () => {
      subject.maxItems = 1;
      await elementUpdated(subject);
      expect(visible().length).to.equal(2);
    });

    it("labels menu rows cleanly when the items were rendered by Lit", async () => {
      const labels = ["Sites", "Chicago", "Receiving", "Dock 4"];
      subject = await fixture<ZetaBreadcrumb>(
        html`<zeta-breadcrumb maxItems="3">${labels.map(label => html`<zeta-breadcrumb-item>${label}</zeta-breadcrumb-item>`)}</zeta-breadcrumb>`
      );
      await elementUpdated(subject);
      await openMenu();
      expect(
        rows().map(row =>
          [...row.childNodes]
            .map(node => (node.nodeType === Node.COMMENT_NODE ? "" : node.textContent))
            .join("")
            .trim()
        )
      ).to.deep.equal(["Chicago"]);
    });

    it("draws a separator after every item but the last", () => {
      expect(subject.items.map(item => item.separator)).to.deep.equal([true, true, true, true, true, false]);
    });

    it("lists the hidden items as menu rows, with their icons", async () => {
      await openMenu();
      expect(rows().map(row => row.textContent?.trim().replace(/^location/, ""))).to.deep.equal(["North America", "Chicago"]);
      expect(rows()[0].querySelector("zeta-icon")).to.equal(null);
      expect(rows()[1].querySelector("zeta-icon")?.textContent).to.equal("location");
    });
  });

  describe("Dimensions", () => {
    it("sets the overflow control at small", () => {
      expect(subject.shadowRoot?.querySelector("#overflow-button")?.getAttribute("size")).to.equal("small");
    });

    it("spaces the trail by space/md", () => {
      const list = subject.shadowRoot?.querySelector(".list") as Element;
      expect(getComputedStyle(list).columnGap).to.equal(token(subject, "--space-md"));
      expect(getComputedStyle(list).rowGap).to.equal(token(subject, "--space-2xs"));
    });

    it("opens the menu space/sm below the control, left aligned", async () => {
      await openMenu();
      const button = trigger().getBoundingClientRect();
      const menu = droppable().getBoundingClientRect();
      expect(menu.top - button.bottom).to.equal(parseFloat(token(subject, "--space-sm")));
      expect(menu.left).to.be.closeTo(button.left, 1);
    });
  });

  describe("Styling", () => {
    const crumb = (item: Element) => item.shadowRoot?.querySelector(".crumb") as Element;

    it("sets crumbs in foreground/secondary and body/medium", () => {
      const first = crumb(subject.items[0]);
      expect(getComputedStyle(first).color).to.equal(getCssVarColorValue(subject, "--foreground-secondary"));
      expect(getComputedStyle(first).fontSize).to.equal(token(subject, "--body-medium-font-size"));
    });

    it("sets the current page in foreground/primary, and in foreground/link on accent", async () => {
      const last = subject.items.at(-1) as ZetaBreadcrumbItem;
      expect(getComputedStyle(crumb(last)).color).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
      subject.flavor = "accent";
      await elementUpdated(subject);
      expect(getComputedStyle(crumb(last)).color).to.equal(getCssVarColorValue(subject, "--foreground-link"));
    });

    it("uses the compact menu, and passes rounded to the control and the menu", async () => {
      expect(droppable().compact).to.equal(true);
      expect(droppable().rounded).to.equal(true);
      subject.rounded = false;
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector("#overflow-button")?.getAttribute("shape")).to.equal("sharp");
      expect(droppable().rounded).to.equal(false);
    });

    it("uses the outline-subtle Icon Button for the overflow control", () => {
      expect(subject.shadowRoot?.querySelector("#overflow-button")?.getAttribute("flavor")).to.equal("outline-subtle");
    });
  });

  describe("Interaction", () => {
    it("opens the menu from the overflow control, and closes on an outside click", async () => {
      expect(droppable().open).to.equal(false);
      await openMenu();
      expect(droppable().open).to.equal(true);
      document.body.click();
      await elementUpdated(subject);
      expect(droppable().open).to.equal(false);
    });

    it("moves focus to the first row, and through the rows with the arrow keys", async () => {
      await openMenu();
      expect(subject.shadowRoot?.activeElement).to.equal(rows()[0]);
      await sendKeys({ press: "ArrowDown" });
      expect(subject.shadowRoot?.activeElement).to.equal(rows()[1]);
      await sendKeys({ press: "ArrowDown" });
      expect(subject.shadowRoot?.activeElement).to.equal(rows()[0]);
      await sendKeys({ press: "ArrowUp" });
      expect(subject.shadowRoot?.activeElement).to.equal(rows()[1]);
    });

    it("closes on Escape and returns focus to the control", async () => {
      await openMenu();
      await sendKeys({ press: "Escape" });
      await elementUpdated(subject);
      expect(droppable().open).to.equal(false);
      expect(subject.shadowRoot?.activeElement?.id).to.equal("overflow-button");
    });

    it("follows the hidden crumb from its row, by pointer or Enter, and closes the menu", async () => {
      const hidden = subject.items[1];
      const spy = sinon.spy();
      hidden.addEventListener("click", event => {
        event.preventDefault();
        spy();
      });
      await openMenu();
      rows()[0].click();
      await elementUpdated(subject);
      expect(spy).to.have.been.calledOnce;
      expect(droppable().open).to.equal(false);

      await openMenu();
      await sendKeys({ press: "Enter" });
      await elementUpdated(subject);
      expect(spy).to.have.been.calledTwice;
    });

    it("re-works the trail when items are added", async () => {
      const added = document.createElement("zeta-breadcrumb-item");
      added.textContent = "Bay 2";
      subject.append(added);
      await elementUpdated(subject);
      await aTimeout(0);
      expect(added.current).to.equal(true);
      expect((subject.items.at(-2) as ZetaBreadcrumbItem).current).to.equal(false);
      expect(visible().length).to.equal(maxItems);
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
