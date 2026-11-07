import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import { emulateMedia, sendMouse, resetMouse } from "@web/test-runner-commands";
import type { ZetaAssistChip } from "../../components/chips/assist-chip/assist-chip.js";
import type { ZetaFilterChip } from "../../components/chips/filter-chip/filter-chip.js";
import type { ZetaInputChip } from "../../components/chips/input-chip/input-chip.js";
import "../../components/chips/assist-chip/assist-chip.js";
import "../../components/chips/filter-chip/filter-chip.js";
import "../../components/chips/input-chip/input-chip.js";
import "../../components/avatar/avatar.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const chipOf = (el: Element) => el.shadowRoot?.querySelector(".chip") as HTMLElement;
const hover = async (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
};

describe("zeta-chips (spec)", () => {
  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
  });
  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("meets contrast requirements for each chip's label", async () => {
      const row = await fixture<HTMLDivElement>(
        html`<div style="background: var(--surface-default)">
          <zeta-assist-chip>Assist</zeta-assist-chip><zeta-filter-chip>Filter</zeta-filter-chip><zeta-input-chip>Input</zeta-input-chip>
        </div>`
      );
      for (const el of Array.from(row.children)) {
        await (el as ZetaAssistChip).updateComplete;
        // Ghost and neutral fills are translucent, so the label is measured against the surface behind the chip.
        await contrastTest(el.tagName, chipOf(el), row, { highContrast: false });
      }
    });

    it("names the remove controls and marks the filter's state", async () => {
      const assist = await fixture<ZetaAssistChip>(html`<zeta-assist-chip discardable discard-label="Remove file">File</zeta-assist-chip>`);
      const input = await fixture<ZetaInputChip>(html`<zeta-input-chip remove-label="Remove Jane">Jane</zeta-input-chip>`);
      const filter = await fixture<ZetaFilterChip>(html`<zeta-filter-chip active>On</zeta-filter-chip>`);
      await expect(assist.shadowRoot?.querySelector(".remove")?.getAttribute("aria-label")).to.equal("Remove file");
      await expect(input.shadowRoot?.querySelector(".remove")?.getAttribute("aria-label")).to.equal("Remove Jane");
      await expect(chipOf(filter).getAttribute("aria-pressed")).to.equal("true");
    });
  });

  describe("Dimensions", () => {
    it("pads the assist chip space/xs by space/sm with a control/icon-xs glyph", async () => {
      const el = await fixture<ZetaAssistChip>(html`<zeta-assist-chip icon="star">Share</zeta-assist-chip>`);
      const s = getComputedStyle(chipOf(el));
      await expect(s.paddingTop).to.equal(v(el, "--space-xs"));
      await expect(s.paddingLeft).to.equal(v(el, "--space-sm"));
      await expect(`${(el.shadowRoot?.querySelector(".icon") as HTMLElement).getBoundingClientRect().width}px`).to.equal(v(el, "--control-icon-xs"));
    });

    it("holds the filter chip at 32px, switching padding and gap when active", async () => {
      const el = await fixture<ZetaFilterChip>(html`<zeta-filter-chip>Stock</zeta-filter-chip>`);
      await expect(chipOf(el).getBoundingClientRect().height).to.equal(32);
      await expect(getComputedStyle(chipOf(el)).paddingTop).to.equal(v(el, "--space-sm"));
      el.active = true;
      await elementUpdated(el);
      await expect(chipOf(el).getBoundingClientRect().height).to.equal(32);
      await expect(getComputedStyle(chipOf(el)).paddingTop).to.equal(v(el, "--space-2xs"));
      await expect(getComputedStyle(chipOf(el)).columnGap).to.equal(v(el, "--space-sm"));
    });

    it("sizes the input chip from control/target-min", async () => {
      const el = await fixture<ZetaInputChip>(html`<zeta-input-chip><zeta-avatar slot="leading" size="xxxs">JD</zeta-avatar>Jane</zeta-input-chip>`);
      await expect(`${chipOf(el).getBoundingClientRect().height}px`).to.equal(v(el, "--control-target-min"));
      await expect(getComputedStyle(chipOf(el)).columnGap).to.equal(v(el, "--space-sm"));
    });

    it("keeps the input chip on one row in a narrow parent, wherever the avatar is slotted", async () => {
      const box = await fixture<HTMLDivElement>(
        html`<div style="display: flex; flex-direction: column; width: 60px">
          <zeta-input-chip><zeta-avatar slot="leading" size="xxxs">JD</zeta-avatar>Jane Doe Smith</zeta-input-chip>
          <zeta-input-chip><zeta-avatar size="xxxs">JD</zeta-avatar>Jane Doe Smith</zeta-input-chip>
        </div>`
      );
      for (const el of Array.from(box.children) as ZetaInputChip[]) {
        await el.updateComplete;
        const chip = chipOf(el).getBoundingClientRect();
        await expect(`${chip.height}px`).to.equal(v(el, "--control-target-min"));
        await expect(el.getBoundingClientRect().width).to.equal(chip.width);
        const [avatar, remove] = [el.querySelector("zeta-avatar")!, el.shadowRoot!.querySelector(".remove")!].map(n => n.getBoundingClientRect());
        await expect(Math.abs(avatar.top + avatar.height / 2 - (remove.top + remove.height / 2))).to.equal(0);
      }
    });
  });

  describe("Styling", () => {
    it("recolours the assist chip's border and text with color, leaving the fill neutral", async () => {
      const el = await fixture<ZetaAssistChip>(html`<zeta-assist-chip color="green">Sheet</zeta-assist-chip>`);
      const s = getComputedStyle(chipOf(el));
      await expect(s.borderTopColor).to.equal(getCssVarColorValue(el, "--border-success"));
      await expect(s.color).to.equal(getCssVarColorValue(el, "--feedback-success-foreground"));
      await expect(s.backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-background-default"));
    });

    it("lets the code-only overrides win", async () => {
      const el = await fixture<ZetaAssistChip>(html`<zeta-assist-chip style="--assist-chip-background: rgb(1, 2, 3)">X</zeta-assist-chip>`);
      await expect(getComputedStyle(chipOf(el)).backgroundColor).to.equal("rgb(1, 2, 3)");
    });

    it("flips an active filter chip to the inverse palette with a check mark", async () => {
      const el = await fixture<ZetaFilterChip>(html`<zeta-filter-chip active>On</zeta-filter-chip>`);
      const s = getComputedStyle(chipOf(el));
      await expect(s.backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-inverse-background-selected"));
      await expect(s.borderTopColor).to.equal(getCssVarColorValue(el, "--interactive-inverse-border-pressed"));
      await expect(s.color).to.equal(getCssVarColorValue(el, "--interactive-inverse-foreground-default"));
      await expect(el.shadowRoot?.querySelector(".icon")?.textContent?.trim()).to.equal("check_mark");
    });

    it("draws every disabled chip on the neutral disabled tokens with no border", async () => {
      for (const tpl of [
        html`<zeta-assist-chip disabled>A</zeta-assist-chip>`,
        html`<zeta-filter-chip disabled>F</zeta-filter-chip>`,
        html`<zeta-input-chip disabled>I</zeta-input-chip>`
      ]) {
        const el = await fixture<HTMLElement>(tpl);
        const s = getComputedStyle(chipOf(el));
        await expect(s.backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-background-disabled"));
        await expect(s.color).to.equal(getCssVarColorValue(el, "--interactive-neutral-foreground-disabled"));
        await expect(s.borderTopColor).to.equal("rgba(0, 0, 0, 0)");
      }
    });
  });

  describe("Interaction", () => {
    it("fills the hovered chip on its own hover token", async () => {
      const assist = await fixture<ZetaAssistChip>(html`<zeta-assist-chip>A</zeta-assist-chip>`);
      await hover(chipOf(assist));
      await expect(getComputedStyle(chipOf(assist)).backgroundColor).to.equal(getCssVarColorValue(assist, "--interactive-neutral-background-hover"));
      const input = await fixture<ZetaInputChip>(html`<zeta-input-chip>I</zeta-input-chip>`);
      await hover(chipOf(input));
      await expect(getComputedStyle(chipOf(input)).backgroundColor).to.equal(getCssVarColorValue(input, "--interactive-ghost-background-hover"));
    });

    it("gives an active filter chip no hover fill", async () => {
      const el = await fixture<ZetaFilterChip>(html`<zeta-filter-chip active>On</zeta-filter-chip>`);
      await hover(chipOf(el));
      await expect(getComputedStyle(chipOf(el)).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-inverse-background-selected"));
    });

    it("fires close from the remove controls", async () => {
      const assist = await fixture<ZetaAssistChip>(html`<zeta-assist-chip discardable>A</zeta-assist-chip>`);
      setTimeout(() => (assist.shadowRoot?.querySelector(".remove") as HTMLButtonElement).click());
      expect(await oneEvent(assist, "close")).to.exist;
      const input = await fixture<ZetaInputChip>(html`<zeta-input-chip>I</zeta-input-chip>`);
      setTimeout(() => (input.shadowRoot?.querySelector(".remove") as HTMLButtonElement).click());
      expect(await oneEvent(input, "close")).to.exist;
    });
  });
});
