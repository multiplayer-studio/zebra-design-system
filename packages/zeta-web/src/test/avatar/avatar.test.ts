import { fixture, html, expect, oneEvent } from "@open-wc/testing";
import type { ZetaAvatar } from "../../components/avatar/avatar.js";
import "../../components/avatar/avatar.js";
import "../../index.css";

import type { ZetaIcon } from "../../components/icon/icon.js";
import type { ZetaIconIndicator } from "../../components/badges/indicators/indicators.js";
import { getCssVarColorValue, getSlotText } from "../utils.js";
import { zebraIconGlyphs } from "../../generated/zebra-icons/glyphs.js";

const cssVar = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

describe("zeta-avatar", () => {
  describe("Accessibility", () => {
    it("meets aria requirements with a labelled status and close", async () => {
      const avatar: ZetaAvatar = await fixture(
        html`<zeta-avatar show-close close-label="Remove Jane" status="available" status-label="Available">JD</zeta-avatar>`
      );
      await expect(avatar).shadowDom.to.be.accessible();
    });

    it("names the dismiss badge", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-close close-label="Remove Jane">JD</zeta-avatar>`);
      const close = avatar.shadowRoot?.querySelector(".close") as HTMLButtonElement;
      await expect(close.tagName).to.equal("BUTTON");
      await expect(close.getAttribute("aria-label")).to.equal("Remove Jane");
    });

    it("gives the presence badge a text equivalent", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar status="busy" status-label="Busy">JD</zeta-avatar>`);
      const status = avatar.shadowRoot?.querySelector(".status") as HTMLElement;
      await expect(status.getAttribute("role")).to.equal("img");
      await expect(status.getAttribute("aria-label")).to.equal("Busy");
    });
  });

  describe("Content", () => {
    it("renders the avatar with a custom size", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar size="xl"></zeta-avatar>`);
      await expect(avatar.size).to.equal("xl");
    });

    it("renders the ring only when show-ring is set", async () => {
      const withRing: ZetaAvatar = await fixture(html`<zeta-avatar show-ring></zeta-avatar>`);
      const without: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
      expect(withRing.shadowRoot?.querySelector(".ring")).to.exist;
      expect(without.shadowRoot?.querySelector(".ring")).to.not.exist;
    });

    it("renders the close badge only when show-close is set", async () => {
      const withClose: ZetaAvatar = await fixture(html`<zeta-avatar show-close></zeta-avatar>`);
      const without: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
      expect(withClose.shadowRoot?.querySelector(".close")).to.exist;
      expect(without.shadowRoot?.querySelector(".close")).to.not.exist;
    });

    it("renders the avatar with an image", async () => {
      const url = "https://example.com/image.jpg";
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><img src=${url} /></zeta-avatar>`);
      const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#CONTENT_SLOT");
      const img = slot?.assignedElements()[0] as HTMLImageElement;

      expect(img).to.exist;
      return await expect(img?.src).to.equal(url);
    });

    it("renders the avatar with an icon", async () => {
      const iconName = "user";
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><zeta-icon>${iconName}</zeta-icon></zeta-avatar>`);
      const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#CONTENT_SLOT");
      const icon = slot?.assignedElements()[0] as ZetaIcon;

      expect(icon).to.exist;
      await expect(getSlotText(icon)).to.equal(iconName);
    });

    it("renders a custom badge in the status slot when status is unset", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><zeta-icon-indicator icon="star" slot="status"></zeta-icon-indicator></zeta-avatar>`);
      const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#STATUS_SLOT");

      const badge = slot?.assignedElements()[0] as ZetaIconIndicator;
      expect(badge).to.exist;
    });

    it("draws a distinct Zebra glyph for each presence state", async () => {
      const seen = new Set<string>();
      for (const status of ["available", "away", "busy", "dnd", "on-shift", "offline"] as const) {
        const avatar: ZetaAvatar = await fixture(html`<zeta-avatar status=${status}></zeta-avatar>`);
        const glyph = avatar.shadowRoot?.querySelector(".glyph")?.textContent ?? "";
        await expect(glyph).to.equal(zebraIconGlyphs[status]);
        seen.add(glyph);
      }
      await expect(seen.size).to.equal(6);
    });
  });

  describe("Dimensions", () => {
    it("steps through the spec sizes", async () => {
      const ladder = { xxxs: 24, xxs: 32, xs: 36, s: 40, m: 48, l: 60, xl: 80, xxl: 120, xxxl: 200 } as const;
      for (const [size, px] of Object.entries(ladder)) {
        const avatar: ZetaAvatar = await fixture(html`<zeta-avatar size=${size}></zeta-avatar>`);
        await expect(avatar.getBoundingClientRect().width).to.equal(px);
      }
    });

    it("defaults to medium, bound to control/lg", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
      await expect(`${avatar.getBoundingClientRect().width}px`).to.equal(cssVar(avatar, "--control-lg"));
    });

    it("sizes badges at a third of the avatar", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar size="xxl" show-close status="available"></zeta-avatar>`);
      const close = avatar.shadowRoot?.querySelector(".close") as HTMLElement;
      const status = avatar.shadowRoot?.querySelector(".status") as HTMLElement;
      expect(close.getBoundingClientRect().width).to.be.closeTo(40, 0.5);
      expect(status.getBoundingClientRect().width).to.be.closeTo(40, 0.5);
    });

    it("draws the ring outside the content circle", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-ring></zeta-avatar>`);
      const ring = avatar.shadowRoot?.querySelector(".ring") as HTMLElement;
      const weight = parseFloat(cssVar(avatar, "--stroke-thick"));
      await expect(ring.getBoundingClientRect().width).to.equal(48 + 2 * weight);
      await expect(getComputedStyle(ring).borderTopWidth).to.equal(`${weight}px`);
    });
  });

  describe("Styling", () => {
    it("uses the spec tokens for the swatch, ring and initials", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-ring>JD</zeta-avatar>`);
      const content = avatar.shadowRoot?.querySelector(".avatar") as HTMLElement;
      const ring = avatar.shadowRoot?.querySelector(".ring") as HTMLElement;
      await expect(getComputedStyle(content).backgroundColor).to.equal(getCssVarColorValue(avatar, "--chart-series-4"));
      await expect(getComputedStyle(ring).borderTopColor).to.equal(getCssVarColorValue(avatar, "--zebra-border-default"));
      await expect(getComputedStyle(content).fontSize).to.equal(cssVar(avatar, "--label-large-font-size"));
    });

    it("maps swatch colours to chart series", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar swatch-color="sea">JD</zeta-avatar>`);
      const content = avatar.shadowRoot?.querySelector(".avatar") as HTMLElement;
      await expect(getComputedStyle(content).backgroundColor).to.equal(getCssVarColorValue(avatar, "--chart-series-9"));
    });

    it("colours each presence state from its chart token", async () => {
      const map = { available: "--chart-positive", busy: "--chart-negative", away: "--chart-series-8" } as const;
      for (const [status, token] of Object.entries(map)) {
        const avatar: ZetaAvatar = await fixture(html`<zeta-avatar status=${status}></zeta-avatar>`);
        const badge = avatar.shadowRoot?.querySelector(".status") as HTMLElement;
        await expect(getComputedStyle(badge).backgroundColor).to.equal(getCssVarColorValue(avatar, token));
        await expect(getComputedStyle(badge).borderTopColor).to.equal(getCssVarColorValue(avatar, "--foreground-inverse"));
      }
    });

    it("draws Offline hollow, with a foreground/secondary rim", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar status="offline"></zeta-avatar>`);
      const badge = avatar.shadowRoot?.querySelector(".status") as HTMLElement;
      await expect(getComputedStyle(badge).backgroundColor).to.equal(getCssVarColorValue(avatar, "--foreground-inverse"));
      await expect(getComputedStyle(badge).borderTopColor).to.equal(getCssVarColorValue(avatar, "--foreground-secondary"));
    });

    it("applies the colour to the avatar ring", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-ring></zeta-avatar>`);
      avatar.style.setProperty("--avatar-border-color", "rgb(255, 0, 0)");
      const ring = avatar.shadowRoot?.querySelector(".ring") as HTMLElement;
      await expect(getComputedStyle(ring).borderTopColor).to.equal("rgb(255, 0, 0)");
    });
  });

  describe("Interaction", () => {
    it("fires close when the dismiss badge is clicked", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-close></zeta-avatar>`);
      const close = avatar.shadowRoot?.querySelector(".close") as HTMLButtonElement;
      setTimeout(() => close.click());
      const event = await oneEvent(avatar, "close");
      expect(event).to.exist;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
