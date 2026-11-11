import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaBottomSheet } from "../../components/bottom-sheets/bottom-sheet.js";
import "../../components/bottom-sheets/bottom-sheet.js";
import "../../components/dropdown/menu-item/dropdown-menu-item.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";
const headerText = "Title";
const token = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

describe("zeta-bottom-sheet + zeta-list-item", () => {
  let subject: ZetaBottomSheet;

  const createComponent = (
    template = `<zeta-bottom-sheet headerText=${headerText}>
    <zeta-list-item headline=${"Item 1"}></zeta-list-item>
    <zeta-list-item headline=${"Item 2"}></zeta-list-item>
    <zeta-list-item headline=${"Item 3"}></zeta-list-item>
    </zeta-bottom-sheet>`
  ) => {
    // prettier-ignore
    return fixture<ZetaBottomSheet>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("names the sheet from its title", async () => {
      subject.headerText = "Attach";
      await elementUpdated(subject);
      const sheet = subject.shadowRoot?.querySelector("section");
      const title = subject.shadowRoot?.querySelector("h2");
      await expect(sheet?.getAttribute("aria-labelledby")).to.equal(title?.id);
      await expect(title?.textContent).to.equal("Attach");
    });
    it("it meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("treats menu rows as a list and honours contentType over what is slotted", async () => {
      const sheet = await fixture<ZetaBottomSheet>(html`<zeta-bottom-sheet><zeta-dropdown-menu-item>Share</zeta-dropdown-menu-item></zeta-bottom-sheet>`);
      await elementUpdated(sheet);
      const content = sheet.shadowRoot?.querySelector(".content") as Element;
      expect(content.className).to.not.contain("isGenericContent");
      sheet.contentType = "grid";
      await elementUpdated(sheet);
      expect(content.className).to.contain("isGrid");
    });
    it("shows no leading button until headerIcon is set, and no footer until actions are slotted", async () => {
      const sheet = await fixture<ZetaBottomSheet>(html`<zeta-bottom-sheet></zeta-bottom-sheet>`);
      await expect(sheet.shadowRoot?.querySelector("zeta-icon-button")).to.equal(null);
      await expect(sheet.shadowRoot?.querySelector("zeta-card-footer")?.hidden).to.equal(true);
    });

    it("renders the bottom sheet", () => {
      expect(subject).to.exist;
    });

    it("displays the header text correctly", async () => {
      const headerText = "Custom Header Text";
      subject.headerText = headerText;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".title");
      await expect(headerElement?.textContent).to.equal(headerText);
    });

    it("updates when isExpanded changes", async () => {
      subject.isExpanded = true;
      await elementUpdated(subject);

      await expect(subject.isExpanded).to.not.equal(false);
    });
  });

  describe("Dimensions", () => {
    it("applies the correct header alignment", async () => {
      const headerAlignment = "center";
      subject.headerAlignment = headerAlignment;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".header");
      await expect(getComputedStyle(headerElement!).justifyContent).to.equal(headerAlignment);

      const headerAlignmentStart = "start";
      subject.headerAlignment = headerAlignmentStart;
      await elementUpdated(subject);

      await expect(getComputedStyle(headerElement!).justifyContent).to.equal("flex-" + headerAlignmentStart);
    });

    it("applies the correct css display for list items", async () => {
      const sheetContent = subject.shadowRoot?.querySelector(".content");
      await expect(getComputedStyle(sheetContent!).display).to.equal("flex");
    });
  });

  describe("Styling", () => {
    it("draws the leading control as a small subtle Icon Button that names itself and reports clicks", async () => {
      subject.headerIcon = "arrow_back";
      subject.leadingLabel = "Close";
      await elementUpdated(subject);
      const button = subject.shadowRoot?.querySelector("zeta-icon-button") as HTMLElement;
      await expect(button.getAttribute("size")).to.equal("small");
      await expect(button.getAttribute("flavor")).to.equal("subtle");
      await expect(button.getAttribute("aria-label")).to.equal("Close");
      let clicks = 0;
      subject.addEventListener("leading-click", () => clicks++);
      button.click();
      await expect(clicks).to.equal(1);
    });
    it("pads the header per alignment", async () => {
      const header = subject.shadowRoot?.querySelector(".header") as Element;
      await expect(getComputedStyle(header).paddingLeft).to.equal(token(subject, "--space-lg"));
      await expect(getComputedStyle(header).columnGap).to.equal(token(subject, "--space-2xs"));
      subject.headerAlignment = "center";
      await elementUpdated(subject);
      await expect(getComputedStyle(header).paddingTop).to.equal(token(subject, "--space-gutter"));
      await expect(getComputedStyle(header).columnGap).to.equal(token(subject, "--space-gutter"));
    });
    it("binds the content region and the bottom edge to their spec tokens", () => {
      const content = subject.shadowRoot?.querySelector(".content") as Element;
      const container = subject.shadowRoot?.querySelector(".container") as Element;
      expect(getComputedStyle(content).paddingLeft).to.equal(token(subject, "--space-lg"));
      expect(getComputedStyle(container).paddingBottom).to.equal(token(subject, "--space-card"));
    });
  });

  describe("Interaction", () => {
    it("shows the footer only when actions are slotted", async () => {
      const footer = () => subject.shadowRoot?.querySelector("zeta-card-footer");
      expect(footer()?.hasAttribute("hidden")).to.be.true;
      const sheet = await fixture<ZetaBottomSheet>(html`<zeta-bottom-sheet><button slot="actions">Apply</button></zeta-bottom-sheet>`);
      await elementUpdated(sheet);
      expect(sheet.shadowRoot?.querySelector("zeta-card-footer")?.hasAttribute("hidden")).to.be.false;
    });

    it("contentType overrides what is slotted", async () => {
      const sheet = await fixture<ZetaBottomSheet>(html`<zeta-bottom-sheet contentType="grid"><div>Item</div></zeta-bottom-sheet>`);
      await elementUpdated(sheet);
      await expect(getComputedStyle(sheet.shadowRoot!.querySelector(".content")!).display).to.equal("grid");
    });

    it("modal presents the sheet over a zeta-scrim and removes both on hide", async () => {
      const sheet = await fixture<ZetaBottomSheet>(html`<zeta-bottom-sheet modal><div>Item</div></zeta-bottom-sheet>`);
      const scrim = () => sheet.shadowRoot!.querySelector("zeta-scrim") as HTMLElement;
      const dialog = () => sheet.shadowRoot!.querySelector("dialog") as HTMLDialogElement;
      await expect(dialog().open).to.equal(false);
      sheet.show();
      await elementUpdated(sheet);
      await expect(dialog().open).to.equal(true);
      await expect(scrim().matches(":popover-open")).to.equal(true);
      await expect(getComputedStyle(scrim()).backgroundColor).to.equal(getCssVarColorValue(sheet, "--overlay-scrim"));
      sheet.hide();
      await elementUpdated(sheet);
      await expect(dialog().open).to.equal(false);
      await expect(scrim().matches(":popover-open")).to.equal(false);
    });

    it("without modal renders no dialog or scrim", async () => {
      const sheet = await fixture<ZetaBottomSheet>(html`<zeta-bottom-sheet><div>Item</div></zeta-bottom-sheet>`);
      await expect(sheet.shadowRoot!.querySelector("dialog, zeta-scrim")).to.equal(null);
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});

describe("zeta-bottom-sheet + zeta-grid-menu-item", () => {
  let subject: ZetaBottomSheet;

  const createComponent = (
    template = `<zeta-bottom-sheet headerText=${headerText}>
      <zeta-grid-menu-item>Item 1</zeta-grid-menu-item>
        <zeta-grid-menu-item>Item 2</zeta-grid-menu-item>
        <zeta-grid-menu-item>Item 3</zeta-grid-menu-item>
        <zeta-grid-menu-item>Item 4</zeta-grid-menu-item>
      </zeta-bottom-sheet>`
  ) => {
    // prettier-ignore
    return fixture<ZetaBottomSheet>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("it meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the bottom sheet", () => {
      expect(subject).to.exist;
    });

    it("displays the header text correctly", async () => {
      const headerText = "Custom Header Text";
      subject.headerText = headerText;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".title");
      await expect(headerElement?.textContent).to.equal(headerText);
    });

    it("updates when isExpanded changes", async () => {
      subject.isExpanded = true;
      await elementUpdated(subject);

      await expect(subject.isExpanded).to.not.equal(false);
    });
  });

  describe("Dimensions", () => {
    it("applies the correct header alignment", async () => {
      const headerAlignment = "center";
      subject.headerAlignment = headerAlignment;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".header");
      await expect(getComputedStyle(headerElement!).justifyContent).to.equal(headerAlignment);

      const headerAlignmentStart = "start";
      subject.headerAlignment = headerAlignmentStart;
      await elementUpdated(subject);

      await expect(getComputedStyle(headerElement!).justifyContent).to.equal("flex-" + headerAlignmentStart);
    });

    it("applies the correct css display for grid items", async () => {
      subject.isGrid = true;
      await elementUpdated(subject);

      const sheetContent = subject.shadowRoot?.querySelector(".content");
      await expect(getComputedStyle(sheetContent!).display).to.equal("grid");
    });
  });

  describe("Styling", () => {
    it("binds the content region and the bottom edge to their spec tokens", () => {
      const content = subject.shadowRoot?.querySelector(".content") as Element;
      const container = subject.shadowRoot?.querySelector(".container") as Element;
      expect(getComputedStyle(content).paddingLeft).to.equal(token(subject, "--space-gutter"));
      expect(getComputedStyle(container).paddingBottom).to.equal(token(subject, "--space-card"));
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});

describe("zeta-bottom-sheet + generic content", () => {
  let subject: ZetaBottomSheet;

  const createComponent = (
    template = `<zeta-bottom-sheet headerText=${headerText}>
      <div>
          <h1>Generic Content</h1>
          <p>This is generic content</p>
          <div>
            <h2>Section 1</h2>
            <p>This is the first section of the generic content.</p>
          </div>
          <div>
            <h2>Section 2</h2>
            <p>This is the second section of the generic content.</p>
          </div>
          <div>
            <h2>Section 3</h2>
            <p>This is the third section of the generic content.</p>
          </div>
          <div>
            <h2>Section 4</h2>
            <p>This is the fourth section of the generic content.</p>
          </div>
          <div>
            <h2>Section 5</h2>
            <p>This is the fifth section of the generic content.</p>
          </div>
        </div>
      </zeta-bottom-sheet>`
  ) => {
    // prettier-ignore
    return fixture<ZetaBottomSheet>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("it meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the bottom sheet", () => {
      expect(subject).to.exist;
    });

    it("displays the header text correctly", async () => {
      const headerText = "Custom Header Text";
      subject.headerText = headerText;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".title");
      await expect(headerElement?.textContent).to.equal(headerText);
    });

    it("updates when isExpanded changes", async () => {
      subject.isExpanded = true;
      await elementUpdated(subject);

      await expect(subject.isExpanded).to.not.equal(false);
    });
  });

  describe("Dimensions", () => {
    it("applies the correct header alignment", async () => {
      const headerAlignment = "center";
      subject.headerAlignment = headerAlignment;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".header");
      await expect(getComputedStyle(headerElement!).justifyContent).to.equal(headerAlignment);

      const headerAlignmentStart = "start";
      subject.headerAlignment = headerAlignmentStart;
      await elementUpdated(subject);

      await expect(getComputedStyle(headerElement!).justifyContent).to.equal("flex-" + headerAlignmentStart);
    });

    it("applies the correct css display for generic content", async () => {
      subject.isGenericContent = true;
      await elementUpdated(subject);

      const sheetContent = subject.shadowRoot?.querySelector(".content");
      await expect(getComputedStyle(sheetContent!).display).to.equal("block");
    });
  });

  describe("Styling", () => {
    it("binds the content region and the bottom edge to their spec tokens", () => {
      const content = subject.shadowRoot?.querySelector(".content") as Element;
      const container = subject.shadowRoot?.querySelector(".container") as Element;
      expect(getComputedStyle(content).paddingLeft).to.equal(token(subject, "--space-gutter"));
      expect(getComputedStyle(container).paddingBottom).to.equal(token(subject, "--space-card"));
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
