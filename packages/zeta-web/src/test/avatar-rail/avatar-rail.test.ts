import { fixture, html, expect } from "@open-wc/testing";
import type { ZetaAvatarRail } from "../../components/avatar-rail/avatar-rail.js";
import "../../components/avatar-rail/avatar-rail.js";
import type { ZetaAvatar } from "../../components/avatar/avatar.js";
import "../../components/avatar/avatar.js";

describe("zeta-avatar-rail", () => {
  describe("Content", () => {
    it("pushes show-close onto slotted avatars that don't set their own", async () => {
      const rail: ZetaAvatarRail = await fixture(html`
        <zeta-avatar-rail show-close>
          <zeta-avatar>AB</zeta-avatar>
        </zeta-avatar-rail>
      `);
      const avatar = rail.querySelector("zeta-avatar") as ZetaAvatar;
      return expect(avatar.showClose).to.be.true;
    });

    it("keeps an avatar's own show-close when it opts in explicitly, even if the rail doesn't", async () => {
      const rail: ZetaAvatarRail = await fixture(html`
        <zeta-avatar-rail>
          <zeta-avatar show-close>AB</zeta-avatar>
        </zeta-avatar-rail>
      `);
      const avatar = rail.querySelector("zeta-avatar") as ZetaAvatar;
      return expect(avatar.showClose).to.be.true;
    });

    it("propagates a later change to the rail's show-close onto its avatars", async () => {
      const rail: ZetaAvatarRail = await fixture(html`
        <zeta-avatar-rail>
          <zeta-avatar>AB</zeta-avatar>
        </zeta-avatar-rail>
      `);
      const avatar = rail.querySelector("zeta-avatar") as ZetaAvatar;
      expect(avatar.showClose).to.be.false;

      rail.showClose = true;
      await rail.updateComplete;

      return expect(avatar.showClose).to.be.true;
    });

    it("removes show-close from avatars when the rail's show-close is toggled off (regression test)", async () => {
      const rail: ZetaAvatarRail = await fixture(html`
        <zeta-avatar-rail show-close>
          <zeta-avatar>AB</zeta-avatar>
        </zeta-avatar-rail>
      `);
      const avatar = rail.querySelector("zeta-avatar") as ZetaAvatar;
      expect(avatar.showClose).to.be.true;

      rail.showClose = false;
      await rail.updateComplete;

      return expect(avatar.showClose).to.be.false;
    });

    it("cycles show-close on and off multiple times, updating avatars each time", async () => {
      const rail: ZetaAvatarRail = await fixture(html`
        <zeta-avatar-rail>
          <zeta-avatar>AB</zeta-avatar>
          <zeta-avatar>CD</zeta-avatar>
        </zeta-avatar-rail>
      `);
      const avatars = [rail.querySelector("zeta-avatar:nth-child(1)") as ZetaAvatar, rail.querySelector("zeta-avatar:nth-child(2)") as ZetaAvatar];

      // Initially false
      expect(avatars[0].showClose).to.be.false;
      expect(avatars[1].showClose).to.be.false;

      // Toggle on
      rail.showClose = true;
      await rail.updateComplete;
      expect(avatars[0].showClose).to.be.true;
      expect(avatars[1].showClose).to.be.true;

      // Toggle off
      rail.showClose = false;
      await rail.updateComplete;
      expect(avatars[0].showClose).to.be.false;
      expect(avatars[1].showClose).to.be.false;

      // Toggle on again
      rail.showClose = true;
      await rail.updateComplete;
      expect(avatars[0].showClose).to.be.true;
      return expect(avatars[1].showClose).to.be.true;
    });

    it("pushes size onto slotted avatars that don't set their own", async () => {
      const rail: ZetaAvatarRail = await fixture(html`
        <zeta-avatar-rail size="l">
          <zeta-avatar>AB</zeta-avatar>
        </zeta-avatar-rail>
      `);
      const avatar = rail.querySelector("zeta-avatar") as ZetaAvatar;
      return expect(avatar.size).to.equal("l");
    });

    it("keeps an avatar's own size when it opts in explicitly, even if the rail has a different size", async () => {
      const rail: ZetaAvatarRail = await fixture(html`
        <zeta-avatar-rail size="l">
          <zeta-avatar size="xs">AB</zeta-avatar>
        </zeta-avatar-rail>
      `);
      const avatar = rail.querySelector("zeta-avatar") as ZetaAvatar;
      return expect(avatar.size).to.equal("xs");
    });

    it("propagates a later change to the rail's size onto its avatars", async () => {
      const rail: ZetaAvatarRail = await fixture(html`
        <zeta-avatar-rail>
          <zeta-avatar>AB</zeta-avatar>
        </zeta-avatar-rail>
      `);
      const avatar = rail.querySelector("zeta-avatar") as ZetaAvatar;
      expect(avatar.size).to.be.undefined;

      rail.size = "xl";
      await rail.updateComplete;

      return expect(avatar.size).to.equal("xl");
    });
  });
});
