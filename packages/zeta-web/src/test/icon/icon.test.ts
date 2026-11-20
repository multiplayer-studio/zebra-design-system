import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import { emulateMedia } from "@web/test-runner-commands";
import type { ZetaIcon } from "../../components/icon/icon.js";
import "../../components/icon/icon.js";
import "../../components/button/icon-button/icon-button.js";
import "../../index.css";
import { zetaIconGlyph } from "../../icons.js";

/* Resolves a size token to pixels, through a probe's width. */
const length = (token: string) => {
  const probe = document.createElement("div");
  probe.style.width = `var(${token})`;
  document.body.append(probe);
  const value = probe.getBoundingClientRect().width;
  probe.remove();
  return value;
};

describe("zeta-icon", () => {
  let subject: ZetaIcon;

  const createComponent = (template = `<zeta-icon name="star"></zeta-icon>`) => {
    // prettier-ignore
    return fixture<ZetaIcon>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    // The icon transitions every property over 0.3s; reduced motion makes a read straight after a change final.
    await emulateMedia({ reducedMotion: "reduce" });
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the name property as its glyph from the Zebra icon set", async () => {
      await expect(subject.shadowRoot?.textContent?.trim()).to.equal(zetaIconGlyph("star"));
    });
    it("takes a name with underscores or with hyphens", async () => {
      const underscored = await createComponent(`<zeta-icon name="expand_more"></zeta-icon>`);
      const hyphenated = await createComponent(`<zeta-icon name="expand-more"></zeta-icon>`);
      await expect(underscored.shadowRoot?.textContent?.trim()).to.equal(zetaIconGlyph("expand-more"));
      await expect(hyphenated.shadowRoot?.textContent?.trim()).to.equal(zetaIconGlyph("expand-more"));
    });
    it("shows a name the set does not have as written", async () => {
      const unknown = await createComponent(`<zeta-icon name="not_an_icon"></zeta-icon>`);
      await expect(unknown.shadowRoot?.textContent?.trim()).to.equal("not_an_icon");
    });
    it("renders the slotted name when no name property is set", async () => {
      const slotted = await createComponent(`<zeta-icon>home</zeta-icon>`);
      expect(slotted.shadowRoot?.querySelector("slot")).to.exist;
      await expect(slotted.textContent?.trim()).to.equal("home");
      await expect(slotted.shadowRoot?.textContent?.trim()).to.equal(zetaIconGlyph("home"));
    });
    it("draws the glyph with the Zebra icon font, in both families", async () => {
      const glyph = zetaIconGlyph("star") as string;
      for (const family of ["ZdsIcons-Rounded", "ZdsIcons-Sharp"]) {
        const loaded = await document.fonts.load(`24px "${family}"`, glyph);
        expect(loaded.length, `${family} has a face for the glyph`).to.be.greaterThan(0);
        await expect(document.fonts.check(`24px "${family}"`, glyph)).to.equal(true);
      }
    });
    it("draws a slotted name with underscores, and keeps the name readable", async () => {
      const slotted = await createComponent(`<zeta-icon>expand_more</zeta-icon>`);
      await expect(slotted.shadowRoot?.querySelector("span")?.textContent).to.equal(zetaIconGlyph("expand-more"));
      await expect(slotted.innerText.trim()).to.equal("expand_more");
      const box = slotted.getBoundingClientRect();
      await expect(box.width).to.equal(box.height);
    });
    it("draws a name forwarded through another component's slot", async () => {
      const button = await fixture<HTMLElement>(html`<zeta-icon-button>more_vertical</zeta-icon-button>`);
      const icon = button.shadowRoot?.querySelector("zeta-icon") as ZetaIcon;
      await elementUpdated(icon);
      await expect(icon.shadowRoot?.querySelector("span")?.textContent).to.equal(zetaIconGlyph("more-vertical"));
    });
    it("follows a slotted name when its text changes", async () => {
      const slotted = await createComponent(`<zeta-icon>home</zeta-icon>`);
      (slotted.firstChild as Text).data = "star";
      await new Promise(resolve => setTimeout(resolve));
      await elementUpdated(slotted);
      await expect(slotted.shadowRoot?.querySelector("span")?.textContent).to.equal(zetaIconGlyph("star"));
    });
    it("shows a slotted SVG as it is", async () => {
      const custom = await createComponent(`<zeta-icon><svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg></zeta-icon>`);
      expect(custom.shadowRoot?.querySelector("span")).to.not.exist;
      expect(custom.querySelector("svg")).to.exist;
    });
    it("prefers the name property over the slot", async () => {
      const both = await createComponent(`<zeta-icon name="star">home</zeta-icon>`);
      await expect(both.shadowRoot?.textContent?.trim()).to.equal(zetaIconGlyph("star"));
    });
  });

  describe("Dimensions", () => {
    // control/icon-xs, -sm, -md and -lg (spec: variants).
    const sizes = { xsmall: "--control-icon-xs", small: "--control-icon-sm", medium: "--control-icon-md", large: "--control-icon-lg" };
    (Object.keys(sizes) as Array<keyof typeof sizes>).forEach(size => {
      it(`renders ${size} at ${sizes[size]}, square`, async () => {
        subject.size = size;
        await elementUpdated(subject);
        const box = subject.getBoundingClientRect();
        await expect(box.height).to.equal(length(sizes[size]));
        await expect(box.width).to.equal(box.height);
      });
    });
    it("pads to control/target-min when framed, keeping the glyph's own size", async () => {
      subject.size = "small";
      subject.framed = true;
      await elementUpdated(subject);
      const box = subject.getBoundingClientRect();
      await expect(box.width).to.equal(length("--control-target-min"));
      await expect(box.height).to.equal(length("--control-target-min"));
      await expect(getComputedStyle(subject).fontSize).to.equal(`${length("--control-icon-sm")}px`);
    });
    it("pads xsmall to control/xs when framed", async () => {
      subject.size = "xsmall";
      subject.framed = true;
      await elementUpdated(subject);
      const box = subject.getBoundingClientRect();
      await expect(box.width).to.equal(length("--control-xs"));
      await expect(box.height).to.equal(length("--control-xs"));
      await expect(getComputedStyle(subject).fontSize).to.equal(`${length("--control-icon-xs")}px`);
    });
    it("keeps the legacy 24px default when no size is set", async () => {
      await expect(subject.getBoundingClientRect().height).to.equal(24);
    });
    it("lets --icon-size win when no size is set", async () => {
      subject.style.setProperty("--icon-size", "32px");
      await elementUpdated(subject);
      await expect(subject.getBoundingClientRect().height).to.equal(32);
    });
  });

  describe("Styling", () => {
    it("takes the embedding component's foreground through --icon-color", async () => {
      const wrapper = await fixture<HTMLElement>(html`<div style="--icon-color: rgb(204, 0, 0)"><zeta-icon name="star"></zeta-icon></div>`);
      const icon = wrapper.querySelector("zeta-icon")!;
      await expect(getComputedStyle(icon).color).to.equal("rgb(204, 0, 0)");
    });
    it("falls back to --main-default, not the surrounding text colour", async () => {
      const wrapper = await fixture<HTMLElement>(html`<button style="color: rgb(204, 0, 0)"><zeta-icon name="star"></zeta-icon></button>`);
      const icon = wrapper.querySelector("zeta-icon")!;
      const probe = document.createElement("div");
      probe.style.color = "var(--main-default)";
      document.body.append(probe);
      const mainDefault = getComputedStyle(probe).color;
      probe.remove();
      await expect(getComputedStyle(icon).color).to.equal(mainDefault);
    });
    it("lets --icon-color set on the icon itself win", async () => {
      subject.style.setProperty("--icon-color", "rgb(0, 128, 0)");
      await elementUpdated(subject);
      await expect(getComputedStyle(subject).color).to.equal("rgb(0, 128, 0)");
    });
    it("uses the sharp family when not rounded", async () => {
      subject.rounded = false;
      await elementUpdated(subject);
      expect(getComputedStyle(subject).fontFamily).to.contain("ZdsIcons-Sharp");
    });
    it("uses the round family when rounded", async () => {
      subject.rounded = true;
      await elementUpdated(subject);
      expect(getComputedStyle(subject).fontFamily).to.contain("ZdsIcons-Rounded");
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
