import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaDropdownMenuItem } from "../../components/dropdown/menu-item/dropdown-menu-item.js";
import type { ZetaIcon } from "../../components/icon/icon.js";
import "../../components/dropdown/menu-item/dropdown-menu-item.js";
import "../../index.css";
import { sendMouse, resetMouse } from "@web/test-runner-commands";
import { getCssVarValue, getCssVarColorValue, getSlottedIconName } from "../utils.js";
// import sinon from "sinon";
import "../../components/dropdown/menu-item/dropdown-menu-item.js";

describe("zeta-dropdown-menu-item", () => {
  const text = "Menu Item";

  let subject: ZetaDropdownMenuItem;

  const createComponent = (
    template = `<zeta-dropdown-menu-item size="medium" rounded=true disabled=false>
    <zeta-icon slot="icon">star</zeta-icon>${text}</zeta-dropdown-menu-item>`
  ) => {
    // prettier-ignore
    return fixture<ZetaDropdownMenuItem>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("names a checkbox row's role and state, and keeps the control out of reach", async () => {
      const el = await fixture<ZetaDropdownMenuItem>(html`<zeta-dropdown-menu-item type="checkbox" selected disabled>Option</zeta-dropdown-menu-item>`);
      const row = el.shadowRoot?.querySelector(".droppable-item") as HTMLElement;
      const control = el.shadowRoot?.querySelector("zeta-checkbox") as HTMLElement & { checked: boolean; disabled: boolean };
      await expect(row.getAttribute("role")).to.equal("menuitemcheckbox");
      await expect(row.getAttribute("aria-checked")).to.equal("true");
      await expect(control.checked && control.disabled).to.equal(true);
      await expect(control.inert && control.getAttribute("aria-hidden") === "true").to.equal(true);
      el.selected = false;
      await elementUpdated(el);
      await expect(control.checked).to.equal(false);
    });

    it("meets accessability requirements", async () => {
      const item: ZetaDropdownMenuItem = await fixture(html`<zeta-dropdown-menu-item><zeta-icon slot="icon">star</zeta-icon>${text}</zeta-dropdown-menu-item>`);
      await elementUpdated(item);

      await expect(item).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the given text", async () => {
      await expect(subject.lastChild?.nodeValue).to.equal(text);
    });

    it("renders an icon with the correct name with the 'default' type", async () => {
      const icon = await fixture(html`<zeta-icon slot="icon">star</zeta-icon>`);
      subject.appendChild(icon);
      await elementUpdated(subject);

      await expect(getSlottedIconName(subject)).to.equal("star");
    });

    it("sets the rounded attribute correctly", async () => {
      const rounded = true;
      subject.rounded = rounded;
      await elementUpdated(subject);

      await expect(subject.rounded).to.equal(rounded);
    });

    it("sets the disabled attribute correctly", async () => {
      const disabled = true;
      subject.disabled = disabled;
      await elementUpdated(subject);

      await expect(subject.disabled).to.equal(disabled);
    });
  });

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    it("sets the correct colors when not disabled", async () => {
      subject.disabled = false;
      await elementUpdated(subject);

      const droppableItemElement = subject.shadowRoot?.querySelector(".droppable-item") as HTMLElement;
      const style = window.getComputedStyle(droppableItemElement);

      await expect(style.color).to.equal(getCssVarColorValue(droppableItemElement, "--interactive-neutral-foreground-default"));
      await expect(style.backgroundColor).to.equal(getCssVarColorValue(droppableItemElement, "--interactive-ghost-background-default"));
    });

    it("tints a selected row and sizes it from control/md", async () => {
      subject.disabled = false;
      subject.selected = true;
      await elementUpdated(subject);
      const row = subject.shadowRoot?.querySelector(".droppable-item") as HTMLElement;
      await expect(getComputedStyle(row).backgroundColor).to.equal(getCssVarColorValue(row, "--interactive-ghost-background-selected"));
      await expect(`${row.getBoundingClientRect().height}px`).to.equal(getComputedStyle(row).getPropertyValue("--control-md").trim());
      await expect(getComputedStyle(row).fontSize).to.equal(getComputedStyle(row).getPropertyValue("--label-medium-font-size").trim());
    });

    it("puts a selected row's label on foreground/primary and keeps the brand tint on hover", async () => {
      subject.disabled = false;
      subject.selected = true;
      await elementUpdated(subject);
      const row = subject.shadowRoot?.querySelector(".droppable-item") as HTMLElement;
      await expect(getComputedStyle(row).color).to.equal(getCssVarColorValue(row, "--foreground-primary"));
      const r = row.getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
      await expect(getComputedStyle(row).backgroundColor).to.equal(getCssVarColorValue(row, "--interactive-ghost-background-selected"));
      await expect(getComputedStyle(row).backgroundColor).not.to.equal(getCssVarColorValue(row, "--interactive-ghost-background-hover"));
      await resetMouse();
    });

    it("leads checkbox and radio rows with the real control, no gap and no leading padding", async () => {
      for (const type of ["checkbox", "radio"] as const) {
        const el = await fixture<ZetaDropdownMenuItem>(html`<zeta-dropdown-menu-item type=${type}>Option</zeta-dropdown-menu-item>`);
        const row = el.shadowRoot?.querySelector(".droppable-item") as HTMLElement;
        const control = el.shadowRoot?.querySelector(".control") as HTMLElement;
        await expect(control.localName).to.equal(type === "checkbox" ? "zeta-checkbox" : "zeta-radio-button");
        await expect(getComputedStyle(row).columnGap).to.equal(getComputedStyle(row).getPropertyValue("--space-none").trim());
        await expect(`${control.getBoundingClientRect().width}px`).to.equal(getComputedStyle(row).getPropertyValue("--control-target-min").trim());
        await expect(el.querySelector("[slot=icon]")).to.equal(null);
        const pad = getComputedStyle(row).getPropertyValue("--space-none").trim();
        await expect(getComputedStyle(row).paddingLeft).to.equal(pad);
        const label = el.shadowRoot?.querySelector(".label") as HTMLElement;
        await expect(label.getBoundingClientRect().left - row.getBoundingClientRect().left).to.equal(parseFloat(pad) + control.getBoundingClientRect().width);
      }
    });

    it("sets the correct colors when disabled", async () => {
      subject.disabled = true;
      await elementUpdated(subject);

      const droppableItemElement = subject.shadowRoot?.querySelector(".droppable-item") as HTMLElement;
      const style = window.getComputedStyle(droppableItemElement);

      await expect(style.color).to.equal(getCssVarColorValue(droppableItemElement, "--interactive-neutral-foreground-disabled"));
      await expect(style.backgroundColor).to.equal(getCssVarColorValue(droppableItemElement, "--interactive-ghost-background-disabled"));
    });

    it.skip("sets the correct icon color when not disabled", async () => {
      // fails due to change to icon slot
      subject.disabled = false;
      await elementUpdated(subject);

      const iconElement = subject.shadowRoot?.querySelector("zeta-icon") as Element;
      const style = window.getComputedStyle(iconElement);

      await expect(style.color).to.equal(getCssVarColorValue(iconElement, "--main-subtle"));
    });

    it.skip("sets the correct icon color when disabled", async () => {
      // fails due to change to icon slot
      subject.disabled = true;
      await elementUpdated(subject);

      const iconElement = subject.shadowRoot?.querySelector("zeta-icon") as ZetaIcon;
      const style = window.getComputedStyle(iconElement);

      await expect(style.color).to.equal(getCssVarColorValue(iconElement, "--main-disabled"));
    });

    it("sets the correct border radius when rounded is true", async () => {
      subject.rounded = true;
      await elementUpdated(subject);

      const style = window.getComputedStyle(subject.shadowRoot?.querySelector(".droppable-item") as Element);

      await expect(style.borderRadius).to.equal(getCssVarValue(subject, "--radius-minimal"));
    });

    it("sets the correct border radius when rounded is false", async () => {
      subject.rounded = false;
      await elementUpdated(subject);

      const style = window.getComputedStyle(subject.shadowRoot?.querySelector(".droppable-item") as HTMLElement);

      await expect(style.borderRadius).to.equal(getCssVarValue(subject, "--radius-none"));
    });
  });

  describe("Interaction", () => {
    it("toggles a checkbox row and moves a radio choice when anywhere on the row is clicked", async () => {
      const box = await fixture<HTMLDivElement>(
        html`<div>
          <zeta-dropdown-menu-item type="checkbox">A</zeta-dropdown-menu-item>
          <zeta-dropdown-menu-item type="radio" selected>B</zeta-dropdown-menu-item>
          <zeta-dropdown-menu-item type="radio">C</zeta-dropdown-menu-item>
          <zeta-dropdown-menu-item type="checkbox" disabled>D</zeta-dropdown-menu-item>
        </div>`
      );
      const [a, b, c, d] = Array.from(box.children) as ZetaDropdownMenuItem[];
      const label = (el: ZetaDropdownMenuItem) => el.shadowRoot?.querySelector(".label") as HTMLElement;
      label(a).click();
      label(c).click();
      label(d).click();
      await elementUpdated(c);
      await expect([a.selected, b.selected, c.selected, d.selected]).to.deep.equal([true, false, true, false]);
      label(a).click();
      await expect(a.selected).to.equal(false);
    });
  });

  // describe("Interaction", () => {
  //   it("triggers a click event on keyboard down", () => {
  //     const clickSpy = sinon.spy();
  //     subject.addEventListener("keydown", clickSpy);

  //     const event = new KeyboardEvent("keydown", { key: "Enter" });
  //     subject.dispatchEvent(event);

  //     expect(clickSpy.calledOnce).to.be.true;
  //   });
  // });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
