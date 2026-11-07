import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import { emulateMedia } from "@web/test-runner-commands";
import type { ZetaIcon } from "../../components/icon/icon.js";
import "../../components/icon/icon.js";
import "../../index.css";

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
    it("renders the name property as the ligature", async () => {
      await expect(subject.shadowRoot?.textContent?.trim()).to.equal("star");
    });
    it("renders the slotted name when no name property is set", async () => {
      const slotted = await createComponent(`<zeta-icon>home</zeta-icon>`);
      expect(slotted.shadowRoot?.querySelector("slot")).to.exist;
      await expect(slotted.textContent?.trim()).to.equal("home");
    });
    it("prefers the name property over the slot", async () => {
      const both = await createComponent(`<zeta-icon name="star">home</zeta-icon>`);
      await expect(both.shadowRoot?.textContent?.trim()).to.equal("star");
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
      expect(getComputedStyle(subject).fontFamily).to.contain("zeta-icons-sharp");
    });
    it("uses the round family when rounded", async () => {
      subject.rounded = true;
      await elementUpdated(subject);
      expect(getComputedStyle(subject).fontFamily).to.contain("zeta-icons-round");
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
