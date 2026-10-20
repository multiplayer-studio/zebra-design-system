import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer, except
 * the size ladder itself: only medium's width, ring weight and initials font
 * size are bound to real tokens in Figma (control-lg, stroke-thick,
 * label-large/font-size); every other size step is an authored pixel value
 * carried over as-is (spec issue). Badge size and initials font size are
 * otherwise never token-bound — both are exactly one third of the avatar's
 * own size (--zds-avatar-size / 3), the ratio measured across all nine Figma
 * variants. The ring is expanded outward by its own weight so it surrounds
 * the content circle rather than overlapping it (confirmed intent — Figma's
 * raw stroke is inside-aligned on a same-size ellipse). Every badge (Close
 * and every Status) has a foreground-inverse border (Figma's "void" layer) at
 * badgeSize / 16 — universal, not Offline-only; Offline is only the one
 * status whose border switches to foreground-secondary.
 *
 * Spec: specs/avatar/avatar.spec.json
 */
export default css`
  :host {
    position: relative;
    display: inline-flex;
    flex: none;
    box-sizing: border-box;
    vertical-align: middle;
    width: var(--zds-avatar-size);
    height: var(--zds-avatar-size);
    border-radius: var(--radius-pill);
    /* Badge size is never token-bound at any step. */
    --zds-avatar-badge-size: calc(var(--zds-avatar-size) / 3);
  }

  :host([hidden]) {
    display: none;
  }

  .content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: var(--radius-pill);
  }

  .swatch {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .initials {
    font-family: var(--label-large-font-family), system-ui, sans-serif;
    /* Scales with the avatar (--zds-avatar-size / 3, same ratio as the
       badge); only medium binds the real label-large token — see size below. */
    font-size: var(--zds-avatar-initials-font-size);
    font-weight: var(--label-large-font-weight);
    line-height: 1;
    letter-spacing: var(--label-large-letter-spacing);
    /* Raw white — the spec records no token or style on this fill (spec issue). */
    color: #ffffff;
  }

  .content-icon {
    font-size: calc(var(--zds-avatar-size) * 0.5);
    /* Matches the badge glyph convention (foreground-inverse on a
       chart-series swatch); the spec doesn't separately bind this fill. */
    color: var(--foreground-inverse);
    line-height: 1;
  }

  .ring {
    /* Expanded outward by its own weight so the ring surrounds the content
       circle instead of overlapping its outer rim — confirmed intent;
       Figma's own raw stroke is inside-aligned on a same-size ellipse. */
    position: absolute;
    inset: calc(var(--zds-avatar-ring-weight) * -1);
    box-sizing: border-box;
    border-radius: var(--radius-pill);
    border: var(--zds-avatar-ring-weight) solid var(--border-default);
  }

  .badge {
    position: absolute;
    box-sizing: border-box;
    width: var(--zds-avatar-badge-size);
    height: var(--zds-avatar-badge-size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-pill);
    /* The Figma "void" layer: a full-badge-size foreground-inverse circle
       behind the fill, on every status including Close — not just Offline.
       Measured ratio (badgeSize ÷ 16), not a token. */
    border: calc(var(--zds-avatar-badge-size) / 16) solid var(--foreground-inverse);
    padding: 0;
    color: var(--foreground-inverse);
  }

  .badge--close {
    top: 0;
    right: 0;
    background: var(--chart-series-12);
    cursor: pointer;
  }

  .badge--status {
    bottom: 0;
    right: 0;
  }

  .badge-icon {
    /* Measured ratio from the Status Indicator subcomponent (7.5px icon
       inside a 12px badge = 0.625), not a token — the spec has no
       glyph-size binding. */
    font-size: calc(var(--zds-avatar-badge-size) * 0.625);
    line-height: 1;
  }

  /* ---- status colour ----------------------------------------------- */
  .badge--status[data-status="available"] { background: var(--chart-positive); }
  .badge--status[data-status="away"] { background: var(--chart-series-8); }
  .badge--status[data-status="busy"] { background: var(--chart-negative); }
  .badge--status[data-status="dnd"] { background: var(--chart-series-4); }
  .badge--status[data-status="on-shift"] { background: var(--chart-series-1); }
  .badge--status[data-status="icon"] { background: var(--chart-series-1); }
  /* Offline is the only status where the border (void) switches colour —
     foreground-secondary instead of the universal foreground-inverse — which
     is what makes it read as "hollow" rather than a solid dot with a ring. */
  .badge--status[data-status="offline"] {
    background: var(--foreground-inverse);
    color: var(--foreground-secondary);
    border-color: var(--foreground-secondary);
  }

  /* ---- swatch colour (behind initials / a content icon) ------------- */
  .swatch[data-swatch-color="purple"] { background: var(--chart-series-4); }
  .swatch[data-swatch-color="blue"] { background: var(--chart-series-1); }
  .swatch[data-swatch-color="sea"] { background: var(--chart-series-9); }
  .swatch[data-swatch-color="yellow"] { background: var(--chart-series-7); }
  .swatch[data-swatch-color="orange"] { background: var(--chart-series-11); }
  .swatch[data-swatch-color="green"] { background: var(--chart-series-6); }
  .swatch[data-swatch-color="burgundy"] { background: var(--chart-series-5); }

  /* ---- size -----------------------------------------------------------
     Only medium is token-bound (control-lg, stroke-thick); every other size
     is an authored raw value, exactly as extracted from Figma (spec issue). */
  :host([size="xxxsmall"]) { --zds-avatar-size: 24px; --zds-avatar-ring-weight: 1px; --zds-avatar-initials-font-size: 8px; }
  :host([size="xxsmall"]) { --zds-avatar-size: 32px; --zds-avatar-ring-weight: 1.33px; --zds-avatar-initials-font-size: 10.67px; }
  :host([size="xsmall"]) { --zds-avatar-size: 36px; --zds-avatar-ring-weight: 1.5px; --zds-avatar-initials-font-size: 12px; }
  :host([size="small"]) { --zds-avatar-size: 40px; --zds-avatar-ring-weight: 1.67px; --zds-avatar-initials-font-size: 13.33px; }
  :host,
  :host([size="medium"]) { --zds-avatar-size: var(--control-lg); --zds-avatar-ring-weight: var(--stroke-thick); --zds-avatar-initials-font-size: var(--label-large-font-size); }
  :host([size="large"]) { --zds-avatar-size: 60px; --zds-avatar-ring-weight: 2.5px; --zds-avatar-initials-font-size: 20px; }
  :host([size="xlarge"]) { --zds-avatar-size: 80px; --zds-avatar-ring-weight: 3.33px; --zds-avatar-initials-font-size: 26.67px; }
  :host([size="xxlarge"]) { --zds-avatar-size: 120px; --zds-avatar-ring-weight: 5px; --zds-avatar-initials-font-size: 40px; }
  :host([size="xxxlarge"]) { --zds-avatar-size: 200px; --zds-avatar-ring-weight: 8.33px; --zds-avatar-initials-font-size: 66.67px; }
`;
