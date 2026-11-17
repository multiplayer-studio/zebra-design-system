---
name: build-from-reference
description: Build a prototype that matches a reference design exactly, using only Zebra Design System tokens and components. Use whenever the designer gives a design to build from — a Figma link, frame, section or flow, or a screenshot — before writing any markup. Covers reading the reference, mapping its values, text styles and components onto the system, laying it out, and checking the result against it.
---

# Build from a reference

A reference is a Figma frame, flow or screenshot the designer wants built. The prototype must match it. `PROTOTYPING.AGENTS.md` still applies in full; this skill adds how to read and translate the reference without drift.

**Order of authority:** the reference, then the component files, then `DESIGN.md` §4 and §6 (for whatever the reference doesn't show), then the rest of `DESIGN.md`. `DESIGN.md` §7 describes the generic Zebra look and doesn't apply here. Nothing below the reference overrides a value, a component choice or an alignment it shows, except that every value is a token (see 3).

## 1. Read the reference before building

- **Read data, not the picture.** With a Figma link, use the Figma MCP to read every frame: each text node's style, each instance's variant properties, each auto-layout's direction, gap, padding and alignment, and each bound variable. Never build from the thumbnail. With a screenshot, measure what you can and ask about anything you can't read.
- **Inventory first.** A link to a section or page holds many frames. List every frame by name, group them into flows, and ask the designer which flows are in scope (with the question prompt, see Asking the designer in `PROTOTYPING.AGENTS.md`) before writing markup. Say which frames you're leaving out.
- **One frame, one screen.** Read each in-scope frame on its own and keep its render as that screen's visual target.
- **Annotations are requirements.** Follow designer notes attached to frames. They never appear as visible text.

## 2. Translate, don't invent

- Every reference node becomes an existing component, a layout wrapper or text. Nothing is re-imagined.
- Don't add, drop, reorder or reword content. Fix an obvious typo only if you report it.
- Don't invent screens. A path the reference doesn't draw stays inert and is listed in the report.
- When the reference and the system disagree, build the closest on-system result and report the difference. Never silently pick one.

## 3. Map by value, never by name

A reference library's variable names aren't this system's names, and the same word can mean a different size: a library's `spacing/xl` may be 16px where `--space-xl` here is 24px. Resolve every reference value to pixels, then find the token with that value in the `DESIGN.md` frontmatter or the component's `tokens:`.

- **Exact match:** use the token.
- **No exact match:** use the nearest token and add the value to the report as a **token request** (the reference value, the token used, where). Never write the raw value: a value that isn't a token doesn't exist in a prototype. The requests go to the design system through `DESIGN.md` §9 Governance.
- **Colour follows role.** Map the reference's role (primary action, page surface, secondary text, status) to the semantic token with that role, never to a token whose name happens to match. Don't use opacity for hierarchy.

## 4. Typography: match the text style exactly

Font hierarchy is the first thing that reads as wrong. For every text node read the size, line height and weight, then choose the `--type-*` token whose three values all match. Headings and titles drawn heavier than the base style usually match a `-bold` variant (`DESIGN.md` §4).

- **Exact match:** use the token.
- **No exact match:** keep the size and role first, then the nearest weight, and add a token request (3). Never pick a style by its name alone: a heading at weight 400 where the reference says 700 is a defect.

## 5. Brand, mode and density

- **Brand.** Build with this kit's tokens: a project kit already carries its project's own colours. If the reference's primary action colour or page surface doesn't match the kit's, say so before building, because the reference may belong to another product or brand.
- **Mode per frame.** A frame drawn dark gets `data-theme="dark"` on its own wrapper (for example a camera screen inside a light flow). Anything drawn over a photo keeps the mode the reference drew it in. Never pick a dark colour by hand.
- **Density.** Read control heights from the reference and set each component's size to match (48px is `large`, 40px the default medium).

## 6. Shape is decided once

Read the reference's corner treatment and declare it once for the screen. If its buttons are pills, every button is shape `full`; if its fields have 4px corners, every field is `rounded`. Don't mix shapes per component, and don't fall back to `rounded` just because it's the default.

## 7. Choose components by anatomy

- Match each reference instance to the component file whose **anatomy** matches, then set every property as the reference sets it: flavour, size, shape, leading and trailing icons, state.
- Pick the variant by what's drawn, not by the component's name. A centred small title with a back arrow is the centred Top App Bar, not the default one. A drawer rising from the bottom is a Bottom Sheet. A status word in a filled pill is a Label or Status Label, never a Chip.
- **Library first.** A hand-made button, chip, field, switch, checkbox, stepper, dialog, sheet or snackbar is a defect.
- A local reference part ("Pinned Actions", "Task row") is composed from existing components and tokens.
- Only genuinely new content is hand-built (for example a marker box over a photo). Build it from tokens, make it keyboard reachable, and report it as a component gap.
- **Icons.** Match the reference icon to a key in `icons.json` by name and search terms. Report a missing icon; never redraw one.
- **Images.** Use the reference's own image assets, in the position and crop it gives them.

## 8. Layout comes from auto-layout

Reproduce each frame's auto-layout, in this order:

1. **Direction and distribution** (row or column, packed or space-between).
2. **Gap** between children, mapped by value (3).
3. **Padding** on the container, each side.
4. **Alignment** on both axes. Don't centre what the reference starts, or the reverse.
5. **Sizing** of each child: fill, hug or fixed. A button that fills its row in the reference fills it here.

- **Regions.** The header and pinned actions stay fixed; only the body scrolls (`.device-body`). Pinned actions sit at the bottom of the screen with the reference's padding.
- **Every divider the reference draws is drawn**, with the Divider component.
- **Overlays on an image** (markers, frames, hints) are positioned from the frame's coordinates on a fixed-size stage that scales as one unit, so they stay registered to the image at any width. This is the only use of absolute positioning.
- Everything else uses flex or grid with `gap`. No margins (`DESIGN.md` §6).

## 9. Screen frame

- Build a handheld reference inside the starter's device frame (`.device-stage` > `.device`, see Screens in `PROTOTYPING.AGENTS.md`). If the reference frame is a different size from `--frame-handheld-width` × `--frame-handheld-height`, build in the frame and report the difference.
- **Device chrome is part of the screen.** If the reference draws a status bar, use `.status-bar`. Anything else it draws (camera cut-out, gesture bar, keyboard) is hand-built from tokens and reported.
- Order inside the frame: status bar, header, scrolling body, pinned actions.

## 10. States and flow

- Wire the flow the reference draws: every arrow between frames is a working tap.
- Keep one set of mock data across screens. If the reference contradicts itself between frames, pick one version and report it.

## 11. Check against the reference

Measure, don't eyeball: read the computed values from the rendered page and compare each screen with its reference render.

- [ ] Every text node: size, line height and weight equal the reference's, or the difference is a token request.
- [ ] Every gap and padding equals the reference's value, or is a token request.
- [ ] Every control is the reference's size, shape and flavour.
- [ ] Alignment matches on both axes; fill and hug match.
- [ ] Every divider, icon and image is present and in place.
- [ ] The checks in Before you hand over (`PROTOTYPING.AGENTS.md`) that always apply: light and dark, phone and desktop, visible keyboard focus.

## 12. Report

End with:
- the screens built, and the frames left out;
- the components used;
- each hand-built part, and why;
- every **token request** (reference value, token used, where);
- every other place the system couldn't express the reference;
- anything faked.
