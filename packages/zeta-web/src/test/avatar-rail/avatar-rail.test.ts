import { fixture, html, expect, elementUpdated, unsafeStatic } from "@open-wc/testing";
import type { ZetaAvatarRail } from "../../components/avatar-rail/avatar-rail.js";
import "../../components/avatar-rail/avatar-rail.js";
import "../../components/avatar/avatar.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const cssVar = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

const rail = (count: number, attrs = "") => {
  const avatars = Array.from({ length: count }, (_, i) => `<zeta-avatar>A${i + 1}</zeta-avatar>`).join("");
  return fixture<ZetaAvatarRail>(html`${unsafeStatic(`<zeta-avatar-rail ${attrs}>${avatars}</zeta-avatar-rail>`)}`);
};

const shown = (el: ZetaAvatarRail) => Array.from(el.querySelectorAll("zeta-avatar")).filter(a => getComputedStyle(a).display !== "none");
const overflow = (el: ZetaAvatarRail) => el.shadowRoot?.querySelector(".overflow") as HTMLElement | null;

describe("zeta-avatar-rail", () => {
  describe("Accessibility", () => {
    it("meets aria requirements", async () => {
      const el = await rail(6);
      await expect(el).shadowDom.to.be.accessible();
    });

    it("names the counter", async () => {
      const el = await rail(6);
      await expect(overflow(el)?.getAttribute("aria-label")).to.equal("2 more");
    });
  });

  describe("Content", () => {
    it("shows up to max avatars and counts the rest", async () => {
      const el = await rail(6);
      await expect(shown(el).length).to.equal(4);
      await expect(overflow(el)?.textContent?.trim()).to.equal("+2");
    });

    it("counts the remainder against a lower max", async () => {
      const el = await rail(6, `max="3"`);
      await expect(shown(el).length).to.equal(3);
      await expect(overflow(el)?.textContent?.trim()).to.equal("+3");
    });

    it("hides the counter when the whole group fits", async () => {
      const el = await rail(3);
      expect(overflow(el)).to.not.exist;
    });

    it("hides the counter when show-overflow is off", async () => {
      const el = await rail(6);
      el.showOverflow = false;
      await elementUpdated(el);
      expect(overflow(el)).to.not.exist;
    });

    it("updates the count when avatars are added", async () => {
      const el = await rail(4);
      expect(overflow(el)).to.not.exist;
      el.append(Object.assign(document.createElement("zeta-avatar"), { textContent: "A5" }));
      await elementUpdated(el);
      await new Promise(r => setTimeout(r));
      await expect(overflow(el)?.textContent?.trim()).to.equal("+1");
    });

    it("propagates show-close to avatars that do not set their own", async () => {
      const el = await rail(2, "show-close");
      const avatars = el.querySelectorAll("zeta-avatar");
      expect(avatars[0].showClose).to.be.true;
      el.showClose = false;
      await elementUpdated(el);
      expect(avatars[0].showClose).to.be.false;
    });
  });

  describe("Dimensions", () => {
    it("overlaps each avatar by a quarter of its diameter", async () => {
      const el = await rail(6, `size="xxl"`);
      const [a, b] = shown(el).map(x => x.getBoundingClientRect());
      await expect(a.width).to.equal(120);
      await expect(b.left - a.left).to.equal(90);
      await expect(overflow(el)!.getBoundingClientRect().width).to.equal(120);
    });

    it("binds medium to control/lg and space/neg/xl", async () => {
      const el = await rail(6);
      const [a, b] = shown(el).map(x => x.getBoundingClientRect());
      await expect(`${a.width}px`).to.equal(cssVar(el, "--control-lg"));
      await expect(`${b.left - a.right}px`).to.equal(cssVar(el, "--space-neg-xl"));
    });

    it("spans four avatars and the counter at four diameters", async () => {
      const el = await rail(6, `size="xxxs"`);
      await expect(el.getBoundingClientRect().width).to.equal(96);
    });
  });

  describe("Styling", () => {
    it("cuts each avatar out with border/inverse", async () => {
      const el = await rail(2);
      const shadow = getComputedStyle(el.querySelector("zeta-avatar")!).boxShadow;
      expect(shadow).to.include(getCssVarColorValue(el, "--border-inverse"));
    });

    it("draws the counter with the spec tokens", async () => {
      const el = await rail(6);
      const style = getComputedStyle(overflow(el)!);
      await expect(style.backgroundColor).to.equal(getCssVarColorValue(el, "--feedback-neutral-background-subtle"));
      await expect(style.borderTopColor).to.equal(getCssVarColorValue(el, "--zebra-border-default"));
      await expect(style.color).to.equal(getCssVarColorValue(el, "--foreground-primary"));
      await expect(style.fontSize).to.equal(cssVar(el, "--label-large-font-size"));
    });

    it("puts the first avatar on top under start and the last under end", async () => {
      const el = await rail(6);
      const avatars = el.querySelectorAll("zeta-avatar");
      expect(Number(getComputedStyle(avatars[0]).zIndex)).to.be.greaterThan(Number(getComputedStyle(avatars[1]).zIndex));
      el.stacking = "end";
      await elementUpdated(el);
      expect(Number(getComputedStyle(avatars[3]).zIndex)).to.be.greaterThan(Number(getComputedStyle(avatars[2]).zIndex));
      expect(Number(getComputedStyle(overflow(el)!).zIndex)).to.be.greaterThan(Number(getComputedStyle(avatars[3]).zIndex));
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
