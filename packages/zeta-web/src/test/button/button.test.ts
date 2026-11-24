import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import { emulateMedia, sendMouse } from "@web/test-runner-commands";
import type { ZetaButton } from "../../components/button/button.js";
import "../../components/button/button.js";
import "../../index.css";
import "@zebra-design-system/icons/icons.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

const buttonText = "Button";
/* Every flavour with a flat colour to measure. gradient and text-gradient paint a gradient, which has no single
   background or text colour for a contrast ratio. */
const flavors = ["primary", "positive", "negative", "subtle", "text", "outline-subtle", "outline", "contrast", "outline-contrast"];
/* These sit on the ghost scrim (transparent at rest), so their label is measured against the surface under them. */
const onSurface = ["subtle", "text", "outline-subtle", "outline-contrast"];

/* Resolves a token to the computed value of `property` on a probe element in the same document. */
const resolve = (token: string, property: "backgroundColor" | "color" | "borderTopColor" = "backgroundColor") => {
  const probe = document.createElement("div");
  probe.style.setProperty(property === "color" ? "color" : property === "borderTopColor" ? "border-top-color" : "background-color", `var(${token})`);
  probe.style.borderTopStyle = "solid";
  document.body.append(probe);
  const value = getComputedStyle(probe)[property];
  probe.remove();
  return value;
};

/* Resolves a spacing token to pixels, through a probe's padding. */
const length = (token: string) => {
  const probe = document.createElement("div");
  probe.style.paddingLeft = `var(${token})`;
  document.body.append(probe);
  const value = getComputedStyle(probe).paddingLeft;
  probe.remove();
  return value;
};

describe("zeta-button", () => {
  let subject: ZetaButton;
  let surface: HTMLElement;

  const createComponent = async (template = `<zeta-button>${buttonText}</zeta-button>`) => {
    // prettier-ignore
    surface = await fixture<HTMLElement>(html`<div style="background: var(--surface-page); padding: 8px">${unsafeStatic(template)}</div>`);
    return surface.querySelector("zeta-button") as ZetaButton;
  };

  beforeEach(async () => {
    // Colours transition over 120ms; reduced motion turns that off so a read straight after a change is final.
    await emulateMedia({ reducedMotion: "reduce" });
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    ["small", "medium", "large"].forEach(size => {
      flavors.forEach(flavor => {
        it(`meets contrast requirements for the ${flavor} flavor, ${size}`, async () => {
          subject.setAttribute("flavor", flavor);
          subject.setAttribute("size", size);
          await elementUpdated(subject);

          const buttonEl = subject.shadowRoot?.querySelector("button");
          if (buttonEl) {
            // The Zebra tokens have no high-contrast mode yet, so only the light and dark passes apply.
            await contrastTest(`Button ${flavor} ${size}`, buttonEl, onSurface.includes(flavor) ? surface : buttonEl, {
              highContrast: false
            });
          }
        });
      });
    });
    it("meets aria requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("should render the correct text within the button", async () => {
      await expect(subject.lastChild?.nodeValue).to.equal(buttonText);
    });
    it("wraps the label in the label part", () => {
      const label = subject.shadowRoot?.querySelector('[part="label"]');
      expect(label).to.exist;
      expect(label?.querySelector("slot")).to.exist;
    });
    it("renders leading and trailing icons", async () => {
      subject.leadingIcon = "star";
      subject.trailingIcon = "arrow_forward";
      await elementUpdated(subject);
      const icons = subject.shadowRoot?.querySelectorAll("zeta-icon");
      await expect(icons?.length).to.equal(2);
    });
  });

  describe("Dimensions", () => {
    // control/sm, control/md and control/lg (spec: variants bySize).
    const heights = { small: 36, medium: 40, large: 48 };
    (Object.keys(heights) as Array<keyof typeof heights>).forEach(size => {
      it(`renders a ${size} button at its control height`, async () => {
        subject.setAttribute("size", size);
        await elementUpdated(subject);
        await expect(subject.getBoundingClientRect().height).to.equal(heights[size]);

        subject.setAttribute("leadingIcon", "star");
        subject.setAttribute("trailingIcon", "star");
        await elementUpdated(subject);
        await expect(subject.getBoundingClientRect().height).to.equal(heights[size]);
      });
    });
    it("gives the label wrapper space/2xs at small and space/sm at medium and large", async () => {
      const label = subject.shadowRoot?.querySelector(".label") as HTMLElement;
      subject.setAttribute("size", "small");
      await elementUpdated(subject);
      const small = getComputedStyle(label).paddingInlineStart;
      subject.setAttribute("size", "large");
      await elementUpdated(subject);
      const large = getComputedStyle(label).paddingInlineStart;
      await expect(small).to.equal(length("--space-2xs"));
      await expect(large).to.equal(length("--space-sm"));
    });
  });

  describe("Styling", () => {
    const resting: Record<string, [bg: string, fg: string]> = {
      primary: ["--interactive-primary-background-default", "--interactive-primary-foreground-default"],
      positive: ["--interactive-positive-background-default", "--interactive-positive-foreground-default"],
      negative: ["--interactive-destructive-background-default", "--interactive-destructive-foreground-default"],
      subtle: ["--interactive-ghost-background-default", "--interactive-neutral-foreground-default"],
      text: ["--interactive-ghost-background-default", "--interactive-ghost-foreground-default"],
      "outline-subtle": ["--interactive-ghost-background-default", "--interactive-neutral-foreground-default"],
      outline: ["--interactive-neutral-background-default", "--interactive-ghost-foreground-default"],
      contrast: ["--interactive-inverse-background-default", "--interactive-inverse-foreground-default"],
      "outline-contrast": ["--interactive-ghost-background-default", "--foreground-primary"]
    };
    Object.entries(resting).forEach(([flavor, [bg, fg]]) => {
      it(`binds ${bg} and ${fg} for the ${flavor} flavor`, async () => {
        subject.setAttribute("flavor", flavor);
        await elementUpdated(subject);
        const buttonEl = subject.shadowRoot?.querySelector("button") as HTMLElement;
        await expect(getComputedStyle(buttonEl).backgroundColor).to.equal(resolve(bg));
        await expect(getComputedStyle(buttonEl).color).to.equal(resolve(fg, "color"));
      });
    });
    it("draws the outline flavours' border on stroke/thin and the rest on stroke/base", async () => {
      const buttonEl = subject.shadowRoot?.querySelector("button") as HTMLElement;
      subject.setAttribute("flavor", "outline-contrast");
      await elementUpdated(subject);
      await expect(getComputedStyle(buttonEl).borderTopColor).to.equal(resolve("--interactive-inverse-border-default", "borderTopColor"));
      const thin = getComputedStyle(buttonEl).borderTopWidth;
      subject.setAttribute("flavor", "primary");
      await elementUpdated(subject);
      expect(parseFloat(thin)).to.be.greaterThan(parseFloat(getComputedStyle(buttonEl).borderTopWidth));
    });
    it("rounds with radius/none, radius/element-sm and radius/pill", async () => {
      const buttonEl = subject.shadowRoot?.querySelector("button") as HTMLElement;
      const radius = async (shape: string) => {
        subject.setAttribute("shape", shape);
        await elementUpdated(subject);
        return parseFloat(getComputedStyle(buttonEl).borderTopLeftRadius);
      };
      await expect(await radius("sharp")).to.equal(0);
      const rounded = await radius("rounded");
      expect(rounded).to.be.greaterThan(0);
      expect(await radius("full")).to.be.greaterThan(rounded);
    });
    it("takes the disabled tokens when disabled", async () => {
      subject.disabled = true;
      await elementUpdated(subject);
      const buttonEl = subject.shadowRoot?.querySelector("button") as HTMLElement;
      await expect(getComputedStyle(buttonEl).backgroundColor).to.equal(resolve("--interactive-primary-background-disabled"));
      await expect(getComputedStyle(buttonEl).color).to.equal(resolve("--interactive-primary-foreground-disabled", "color"));
    });
    it("does not change on hover or press when disabled, in any flavour", async () => {
      const buttonEl = subject.shadowRoot?.querySelector("button") as HTMLElement;
      const look = () => {
        const c = getComputedStyle(buttonEl);
        return [c.backgroundColor, c.backgroundImage, c.backgroundPosition, c.borderTopColor, c.color, c.cursor].join("|");
      };
      subject.disabled = true;
      for (const flavor of [...flavors, "gradient", "text-gradient"]) {
        subject.setAttribute("flavor", flavor);
        await elementUpdated(subject);
        await sendMouse({ type: "move", position: [0, 0] });
        const rest = look();
        const { x, y, width, height } = buttonEl.getBoundingClientRect();
        const position: [number, number] = [Math.round(x + width / 2), Math.round(y + height / 2)];
        await sendMouse({ type: "move", position });
        expect(look(), `${flavor} hover`).to.equal(rest);
        await sendMouse({ type: "down" });
        expect(look(), `${flavor} press`).to.equal(rest);
        await sendMouse({ type: "up" });
      }
      await sendMouse({ type: "move", position: [0, 0] });
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});

describe("zeta-button AS form reset control", () => {
  const TEST_STRING = "test string";
  let button: ZetaButton;
  let form: HTMLFormElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    form = await fixture(
      html`<form>
        <input type="text" name="text-control" />
        <zeta-button type="reset"></zeta-button>
      </form>`
    );
    input = form.querySelector("input[name='text-control']") as HTMLInputElement;
    button = form.querySelector("zeta-button[type='reset']") as ZetaButton;
  });

  // describe("Accessibility", () => {});

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("should reset forms", async () => {
      // debugger;
      expect(input?.value).to.be.empty;
      input.value = TEST_STRING;
      await expect(input?.value).to.equal(TEST_STRING);
      button?.click();
      //console.log("loko at me", input?.value, form.querySelector("input[name='text-control']"), form.querySelector("input[name='text-control']").value)
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
