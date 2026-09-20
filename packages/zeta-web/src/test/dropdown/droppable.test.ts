import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaDroppable } from "../../components/dropdown/droppable.js";
import "../../components/dropdown/droppable.js";
import "../../components/button/button.js";
import "../../index.css";

describe("zeta-droppable", () => {
  let subject: ZetaDroppable;

  const createComponent = (
    template = `<zeta-droppable rounded=true ?open="true">
          
        </zeta-droppable>`
  ) => {
    // prettier-ignore
    return fixture<ZetaDroppable>(html`${unsafeStatic(template)}`);
  };

  // Attaches a zeta-button anchor to the document, wires it to `droppable` and opens it. Caller is responsible for removing the returned anchor.
  const attachAnchor = async (droppable: ZetaDroppable) => {
    const anchorButton = document.createElement("zeta-button");
    anchorButton.textContent = "Dropdown";
    document.body.appendChild(anchorButton);
    await elementUpdated(anchorButton);

    droppable.anchor = anchorButton;
    droppable.open = true;
    await elementUpdated(droppable);

    return anchorButton;
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
    it("sets the open attribute correctly", async () => {
      let open = true;
      subject.open = open;
      await elementUpdated(subject);

      expect(subject.open).to.equal(open);

      open = false;
      subject.open = open;
      await elementUpdated(subject);

      expect(subject.open).to.equal(open);
    });

    it("is visible when open is true", async () => {
      subject.open = true;
      await elementUpdated(subject);

      const style = getComputedStyle(subject);

      expect(style.display).to.not.equal("none");
    });

    it("is not visible when open is false", async () => {
      subject.open = false;
      await elementUpdated(subject);

      const style = getComputedStyle(subject);

      expect(style.display).to.equal("none");
    });

    it("sets the rounded attribute correctly", async () => {
      const rounded = true;
      subject.rounded = rounded;
      await elementUpdated(subject);

      expect(subject.rounded).to.equal(rounded);
    });

    it("sets the position attribute correctly", async () => {
      subject.position = "left";
      await elementUpdated(subject);

      expect(subject.position).to.equal("left");
    });

    it("sets the align attribute correctly", async () => {
      subject.align = "bottom";
      await elementUpdated(subject);

      expect(subject.align).to.equal("bottom");
    });

    it("opens below the anchor, left-aligned, by default", async () => {
      const anchorButton = await attachAnchor(subject);

      const anchorRect = anchorButton.getBoundingClientRect();
      const droppableRect = subject.getBoundingClientRect();

      // "bottom" placement adds an 8px gap below the anchor.
      expect(Math.round(droppableRect.top)).to.equal(Math.round(anchorRect.bottom) + 8);
      expect(Math.round(droppableRect.left)).to.equal(Math.round(anchorRect.left));

      document.body.removeChild(anchorButton);
    });

    it("positions using the new `position`/`align` props", async () => {
      subject.position = "right";
      subject.align = "bottom";
      const anchorButton = await attachAnchor(subject);

      const anchorRect = anchorButton.getBoundingClientRect();
      const droppableRect = subject.getBoundingClientRect();

      // "right" placement adds an 8px gap; "bottom" align shifts down an extra anchor-height.
      expect(Math.round(droppableRect.left)).to.equal(Math.round(anchorRect.right) + 8);
      expect(Math.round(droppableRect.bottom)).to.equal(Math.round(anchorRect.bottom + anchorRect.height));

      document.body.removeChild(anchorButton);
    });

    it("falls back to the deprecated `direction`/`alignment` props when `position`/`align` are unset", async () => {
      subject.direction = "right";
      subject.alignment = "end";
      const anchorButton = await attachAnchor(subject);

      const anchorRect = anchorButton.getBoundingClientRect();
      const droppableRect = subject.getBoundingClientRect();

      expect(Math.round(droppableRect.left)).to.equal(Math.round(anchorRect.right) + 8);
      expect(Math.round(droppableRect.bottom)).to.equal(Math.round(anchorRect.bottom + anchorRect.height));

      document.body.removeChild(anchorButton);
    });

    it("prefers `position`/`align` over the deprecated `direction`/`alignment` props when both are set", async () => {
      subject.direction = "bottom";
      subject.alignment = "start";
      subject.position = "left";
      const anchorButton = await attachAnchor(subject);

      const anchorRect = anchorButton.getBoundingClientRect();
      const droppableRect = subject.getBoundingClientRect();

      // "left" placement adds an 8px gap.
      expect(Math.round(droppableRect.top)).to.equal(Math.round(anchorRect.top));
      expect(Math.round(droppableRect.left + droppableRect.width)).to.equal(Math.round(anchorRect.left) - 8);

      document.body.removeChild(anchorButton);
    });
  });

  describe.skip("Dimensions", () => {
    it("ensures the droppable does not exceed the dropdown menu button width when dropdown menu item text is long", async () => {
      // Create a zeta-button as the anchor
      const anchorButton = document.createElement("zeta-button");
      anchorButton.textContent = "Dropdown";
      anchorButton.setAttribute("size", "medium");
      document.body.appendChild(anchorButton);
      await elementUpdated(anchorButton);

      subject.anchor = anchorButton;
      subject.matchParentWidth = true;
      subject.open = true;
      await elementUpdated(subject);

      const longText = "This is a very long dropdown menu item text to test the width of the droppable component.";
      subject.innerHTML = `<zeta-dropdown-menu-item>${longText}</zeta-dropdown-menu-item>`;
      await elementUpdated(subject);

      const droppableWidth = subject.getBoundingClientRect().width;
      const buttonWidth = anchorButton.getBoundingClientRect().width;

      // The droppable width should match the button width
      expect(droppableWidth).to.equal(buttonWidth);

      // Check overflow-x: auto
      const computedStyle = window.getComputedStyle(subject);
      expect(computedStyle.overflowX).to.equal("auto");

      // Clean up
      document.body.removeChild(anchorButton);
    });
  });

  describe.skip("Styling", () => {
    it("sets the correct border radius when rounded is true", async () => {
      subject.rounded = true;
      await elementUpdated(subject);

      const style = getComputedStyle(subject);

      expect(style.borderRadius).to.equal("4px");
    });

    it("sets the correct border radius when rounded is false", async () => {
      subject.rounded = false;
      await elementUpdated(subject);

      const style = getComputedStyle(subject);

      expect(style.borderRadius).to.equal("0px");
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
