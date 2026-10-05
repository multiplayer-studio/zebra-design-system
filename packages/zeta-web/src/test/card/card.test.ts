import { fixture, html, expect } from "@open-wc/testing";
import type { ZetaCard } from "../../components/card/card.js";
import "../../components/card/card.js";
import "../../index.css";

describe("zeta-card", () => {
  describe("Styling", () => {
    it("clips content, uses the card surface and thin border", async () => {
      const subject = await fixture<ZetaCard>(html`<zeta-card></zeta-card>`);
      const style = getComputedStyle(subject.shadowRoot!.querySelector(".card")!);
      expect(style.overflow).to.equal("hidden");
      expect(style.borderTopWidth).to.equal("1px");
      expect(style.backgroundColor).to.not.equal("rgba(0, 0, 0, 0)");
    });

    it("uses radius-sm when rounded and none when sharp", async () => {
      const subject = await fixture<ZetaCard>(html`<zeta-card></zeta-card>`);
      const card = subject.shadowRoot!.querySelector(".card")!;
      expect(getComputedStyle(card).borderTopLeftRadius).to.equal("4px");
      subject.rounded = false;
      subject.removeAttribute("rounded");
      await subject.updateComplete;
      expect(getComputedStyle(card).borderTopLeftRadius).to.equal("0px");
    });
  });
});
