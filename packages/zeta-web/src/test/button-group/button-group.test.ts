import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import { emulateMedia, sendMouse, resetMouse } from "@web/test-runner-commands";
import type { ZetaButtonGroup, ZetaButtonGroupItem } from "../../components/button-group/button-group.js";
import "../../components/button-group/button-group.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

describe("zeta-button-group", () => {
  let group: ZetaButtonGroup;
  let items: ZetaButtonGroupItem[];
  const button = (item: ZetaButtonGroupItem) => item.shadowRoot?.querySelector("button") as HTMLButtonElement;

  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
    group = await fixture<ZetaButtonGroup>(
      html`<zeta-button-group>
        <zeta-button-group-item>One</zeta-button-group-item>
        <zeta-button-group-item>Two</zeta-button-group-item>
        <zeta-button-group-item>Three</zeta-button-group-item>
      </zeta-button-group>`
    );
    items = Array.from(group.querySelectorAll("zeta-button-group-item"));
    await Promise.all(items.map(i => i.updateComplete));
  });

  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("meets aria requirements", async () => {
      await expect(group).to.be.accessible();
    });

    it("meets contrast requirements for the item label", async () => {
      const surface = await fixture<HTMLDivElement>(
        html`<div style="background: var(--surface-section)">
          <zeta-button-group-item>Label</zeta-button-group-item>
        </div>`
      );
      const item = surface.querySelector("zeta-button-group-item") as ZetaButtonGroupItem;
      await item.updateComplete;
      await contrastTest("Group item", button(item), surface, { highContrast: false });
    });
  });

  describe("Content", () => {
    it("gives every item the group's size", async () => {
      expect(items.every(i => i.size === "medium")).to.be.true;
      group.size = "large";
      await elementUpdated(group);
      expect(items.every(i => i.size === "large")).to.be.true;
    });

    it("hides children that are not group items", async () => {
      const el = await fixture<ZetaButtonGroup>(html`<zeta-button-group><span>x</span></zeta-button-group>`);
      await expect(getComputedStyle(el.querySelector("span")!).display).to.equal("none");
    });
  });

  describe("Dimensions", () => {
    it("sizes items from control/sm, md and lg", async () => {
      for (const [size, token] of [
        ["small", "--control-sm"],
        ["medium", "--control-md"],
        ["large", "--control-lg"]
      ] as const) {
        group.size = size;
        await elementUpdated(group);
        await items[0].updateComplete;
        await expect(`${items[0].getBoundingClientRect().height}px`).to.equal(v(group, token));
      }
    });

    it("pads items by space/md, and space/lg at large", async () => {
      await expect(getComputedStyle(button(items[0])).paddingLeft).to.equal(v(group, "--space-md"));
      group.size = "large";
      await elementUpdated(group);
      await items[0].updateComplete;
      await expect(getComputedStyle(button(items[0])).paddingLeft).to.equal(v(group, "--space-lg"));
    });
  });

  describe("Styling", () => {
    it("draws the surface, outline and dividers on the group", async () => {
      const style = getComputedStyle(group);
      await expect(style.backgroundColor).to.equal(getCssVarColorValue(group, "--surface-section"));
      await expect(style.outlineColor).to.equal(getCssVarColorValue(group, "--zebra-border-default"));
      await expect(style.outlineWidth).to.equal("1px");
      await expect(getComputedStyle(items[0]).borderRightWidth).to.equal(v(group, "--stroke-thin"));
      await expect(getComputedStyle(items[0]).borderRightColor).to.equal(getCssVarColorValue(group, "--zebra-border-default"));
      await expect(getComputedStyle(items[2]).borderRightWidth).to.equal("0px");
    });

    it("rounds only the group and the outer corners of the end items", async () => {
      group.rounded = false;
      await elementUpdated(group);
      await expect(getComputedStyle(group).borderTopLeftRadius).to.equal("0px");
      await expect(getComputedStyle(button(items[0])).borderTopLeftRadius).to.equal("0px");
      group.rounded = true;
      await elementUpdated(group);
      const r = v(group, "--radius-sm");
      await expect(getComputedStyle(group).borderTopLeftRadius).to.equal(r);
      await expect(getComputedStyle(button(items[0])).borderTopLeftRadius).to.equal(r);
      await expect(getComputedStyle(button(items[0])).borderTopRightRadius).to.equal("0px");
      await expect(getComputedStyle(button(items[1])).borderTopLeftRadius).to.equal("0px");
      await expect(getComputedStyle(button(items[2])).borderTopRightRadius).to.equal(r);
    });

    it("uses the subtle Button tokens on items", async () => {
      const style = getComputedStyle(button(items[0]));
      await expect(style.color).to.equal(getCssVarColorValue(group, "--interactive-neutral-foreground-default"));
      await expect(style.fontSize).to.equal(v(group, "--label-large-font-size"));
    });
  });

  describe("Interaction", () => {
    it("fills only the hovered item with the ghost hover", async () => {
      const box = items[1].getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(box.x + box.width / 2), Math.round(box.y + box.height / 2)] });
      await expect(getComputedStyle(button(items[1])).backgroundColor).to.equal(getCssVarColorValue(group, "--interactive-ghost-background-hover"));
      await expect(getComputedStyle(button(items[0])).backgroundColor).to.equal(getCssVarColorValue(group, "--interactive-ghost-background-default"));
    });

    it("does not take hover when disabled", async () => {
      items[1].disabled = true;
      await elementUpdated(items[1]);
      const box = items[1].getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(box.x + box.width / 2), Math.round(box.y + box.height / 2)] });
      await expect(getComputedStyle(button(items[1])).backgroundColor).to.equal(getCssVarColorValue(group, "--interactive-primary-background-disabled"));
    });
  });
});
