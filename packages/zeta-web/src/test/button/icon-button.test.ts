import { fixture, html, expect, elementUpdated, unsafeStatic } from "@open-wc/testing";
import { emulateMedia } from "@web/test-runner-commands";
import type { ZetaIconButton } from "../../components/button/icon-button/icon-button.js";
import { getCssVarColorValue, toRGB, getSlotText } from "../utils.js";
import "../../components/button/icon-button/icon-button.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

const flavors = ["primary", "positive", "negative", "outline", "outline-subtle", "text", "subtle"];
const iconName = "star";

describe("zeta-icon-button", () => {
  let subject: ZetaIconButton;

  const createComponent = (template = `<zeta-icon-button>${iconName}</zeta-icon-button>`) => {
    // prettier-ignore
    return fixture<ZetaIconButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    // Button and Icon transition their colours and size; reduced motion makes a read straight after a change final.
    await emulateMedia({ reducedMotion: "reduce" });
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    flavors.map(flavor => {
      it(`meets contrast requirements for the ${flavor} flavor`, async () => {
        // The ghost flavours are transparent at rest, so their icon is measured against the page surface under them;
        // the Zebra tokens have no high-contrast mode yet.
        const surface = await fixture<HTMLElement>(
          html`<div style="background: var(--surface-page)"><zeta-icon-button flavor=${flavor}>${iconName}</zeta-icon-button></div>`
        );
        const button = surface.querySelector("zeta-icon-button")!;
        await elementUpdated(button);
        const buttonEl = button.shadowRoot?.querySelector("button");
        const icon = button.shadowRoot?.querySelector("zeta-icon");
        if (buttonEl && icon) {
          const onSurface = ["outline-subtle", "text", "subtle"].includes(flavor);
          await contrastTest(`Button ${flavor} `, icon, onSurface ? surface : buttonEl, { highContrast: false });
        }
      });
      it(`meets aria requirements for the ${flavor} flavor`, async () => {
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });

  describe("Content", () => {
    it("should render the correct icon", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      await expect(getSlotText(iconButton.shadowRoot!.querySelector("zeta-icon")!)).to.equal(iconName);
    });
  });

  describe("Dimensions", () => {
    /* Resolves a size token to pixels, through a probe's width. */
    const length = (token: string) => {
      const probe = document.createElement("div");
      probe.style.width = `var(${token})`;
      document.body.append(probe);
      const value = probe.getBoundingClientRect().width;
      probe.remove();
      return value;
    };
    // A square on control/sm, -md and -lg; the glyph is control/icon-sm at small and control/icon-md above.
    const sizes = {
      small: ["--control-sm", "--control-icon-sm"],
      medium: ["--control-md", "--control-icon-md"],
      large: ["--control-lg", "--control-icon-md"]
    };
    (Object.keys(sizes) as Array<keyof typeof sizes>).forEach(size => {
      it(`renders a ${size} button as a ${sizes[size][0]} square with a ${sizes[size][1]} glyph`, async () => {
        subject.setAttribute("size", size);
        await elementUpdated(subject);
        const box = subject.getBoundingClientRect();
        await expect(box.height).to.equal(length(sizes[size][0]));
        await expect(box.width).to.equal(box.height);
        const icon = subject.shadowRoot?.querySelector("zeta-icon") as HTMLElement;
        await expect(icon.getBoundingClientRect().height).to.equal(length(sizes[size][1]));
      });
    });
    it("pads the glyph by space/2xs", async () => {
      const button = subject.shadowRoot?.querySelector("button") as HTMLElement;
      await expect(parseFloat(getComputedStyle(button).paddingTop)).to.equal(length("--space-2xs"));
    });
    it("keeps the outline flavours' border", async () => {
      subject.setAttribute("flavor", "outline");
      await elementUpdated(subject);
      const button = subject.shadowRoot?.querySelector("button") as HTMLElement;
      await expect(getComputedStyle(button).borderTopStyle).to.equal("solid");
      expect(parseFloat(getComputedStyle(button).borderTopWidth)).to.be.greaterThan(0);
    });
  });

  describe("Styling", () => {
    it("should display correct icon color when disabled", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      iconButton.setAttribute("disabled", "true");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      await expect(getComputedStyle(icon!).color).to.equal(getCssVarColorValue(icon!, "--interactive-primary-foreground-disabled"));
    });

    it("should display correct icon color for primary flavor", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      iconButton.setAttribute("flavor", "primary");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      await expect(getComputedStyle(icon!).color).to.equal(getCssVarColorValue(icon!, "--interactive-primary-foreground-default"));
    });

    it("should display correct icon color for negative flavor", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      iconButton.setAttribute("flavor", "negative");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      await expect(getComputedStyle(icon!).color).to.equal(getCssVarColorValue(icon!, "--interactive-destructive-foreground-default"));
    });

    it("should display correct icon color for text flavor", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      iconButton.setAttribute("flavor", "text");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      await expect(getComputedStyle(icon!).color).to.equal(getCssVarColorValue(icon!, "--interactive-ghost-foreground-default"));
    });

    it("should display correct icon color for outline-subtle flavor", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      iconButton.setAttribute("flavor", "outline-subtle");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      await expect(getComputedStyle(icon!).color).to.equal(getCssVarColorValue(icon!, "--interactive-neutral-foreground-default"));
    });

    flavors.map(flavor => {
      it(`button should have correct background color for the ${flavor} flavor`, async () => {
        const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

        iconButton.setAttribute("flavor", flavor);
        const button: Element | null | undefined = iconButton.shadowRoot?.querySelector("button");
        const buttonColor = getComputedStyle(button!).backgroundColor;
        // Resting backgrounds from specs/button (the icon button shares the button's flavours).
        const finalFlavor = {
          primary: "--interactive-primary-background-default",
          positive: "--interactive-positive-background-default",
          negative: "--interactive-destructive-background-default",
          outline: "--interactive-neutral-background-default",
          "outline-subtle": "--interactive-ghost-background-default",
          text: "--interactive-ghost-background-default",
          subtle: "--interactive-ghost-background-default"
        }[flavor]!;
        await expect(buttonColor).to.equal(getCssVarColorValue(button!, finalFlavor));
      });
    });

    it("should render the button with the correct color when set by CSS Variable", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      const testColor = "#BADA55";
      iconButton.style.setProperty("--icon-button-color", testColor);
      const button: Element | null | undefined = iconButton.shadowRoot?.querySelector("button");
      const buttonColor = getComputedStyle(button!).backgroundColor;
      await expect(buttonColor).to.equal(toRGB(testColor));
    });

    it("should render the icon with the correct color when set by CSS Variable", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      const testColor = "#BADA55";
      iconButton.style.setProperty("--icon-button-icon-color", testColor);
      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      const iconColor = getComputedStyle(icon!).color;
      await expect(iconColor).to.equal(toRGB(testColor));
    });

    it("should render the icon with the correct color when disabled when set by CSS Variable", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      const testColor = "#BADA55";
      iconButton.style.setProperty("--icon-button-icon-color-disabled", testColor);
      iconButton.setAttribute("disabled", "true");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      const iconColor = getComputedStyle(icon!).color;
      await expect(iconColor).to.equal(toRGB(testColor));
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});

describe("zeta-icon-button AS form reset control", () => {
  const TEST_STRING = "test string";
  let button: ZetaIconButton;
  let form: HTMLFormElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    form = await fixture(
      html`<form>
        <input type="text" name="text-control" />
        <zeta-icon-button type="reset">reset</zeta-icon-button>
      </form>`
    );
    input = form.querySelector("input[name='text-control']") as HTMLInputElement;
    button = form.querySelector("zeta-icon-button[type='reset']") as ZetaIconButton;
  });

  // describe("Accessibility", () => {});

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("should reset forms", async () => {
      expect(input?.value).to.be.empty;
      input.value = TEST_STRING;
      await expect(input?.value).to.equal(TEST_STRING);
      button?.click();
      await expect(input?.value).to.equal("");
    });

    it("should not reset forms if disabled via JS", async () => {
      expect(input?.value).to.be.empty;
      input.value = TEST_STRING;
      await expect(input?.value).to.equal(TEST_STRING);
      button.disabled = true;
      button?.click();
      await expect(input?.value).to.equal(TEST_STRING);
    });

    it("should not reset forms if disabled via DOM", async () => {
      expect(input?.value).to.be.empty;
      input.value = TEST_STRING;
      await expect(input?.value).to.equal(TEST_STRING);
      button.setAttribute("disabled", "");
      button?.click();
      await expect(input?.value).to.equal(TEST_STRING);
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
