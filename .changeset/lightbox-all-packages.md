---
"@zebra-design-system/react-baseui": minor
"@zebra-design-system/web-components": minor
---

Lightbox ships as a spec-built component everywhere. In react-baseui it
graduates from `/experimental` to the main entry (`@spec specs/lightbox`);
web-components gains `<zds-lightbox>` with the same API, built on the native
`<dialog>` as `zds-dialog`. Per the spec: the stage fills with surface/subtle,
the panel springs in from the bottom (animations/spring) with the stage
already at the first frame's height — height animates only on paging — and
paging slides a mounted track (400ms) while offscreen videos pause.
Importing Lightbox from `/experimental` no longer works; import it from the
package root (the experimental surface carried no SemVer promise).
