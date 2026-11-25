# Visual foundations and theming

The look, stated as roles and relationships: colour, states, themes, type, weight, space, shape, elevation, icons, imagery, motion as look, brand, and re-theming one system to a given product. Values come from the host system's tokens. These principles say what each role means, how roles relate, and what may and may not change when a product re-themes. Every principle here must clear the contrast floors in every theme.

Not covered here: hierarchy on a screen, density and size changes, interaction timing, and which palette a chart uses.

**When principles conflict.** Accessibility minimums come first. A product's own shell and established patterns come next, and win over the defaults here. A more specific principle wins over a general one. Where two files disagree, the one whose subject it is wins.

**Terms used here**
- **Role:** a named purpose (action, error, surface, title) that components use instead of a raw value. A theme supplies each role's value.
- **Shell:** what stays the same on every screen of a product: the header, global navigation, and any device or session context. Everything inside it is the content area.
- **Pinned:** stays in place while the rest scrolls.
- **Floors:** accessibility minimums (contrast, target size, text size, reflow). They're minimums, never design values.

---

## 1. Colour roles
8.1. **Colour is chosen by role, never by how it looks.** Every colour use names its purpose: background, surface, text, border, action, selected, focus, or a status. The role is chosen because its meaning matches, not because its colour happens to look right. A colour picked by appearance breaks in other themes.
8.2. **Every fill has a paired foreground role, and colours are only used in their pairs.** Text and icons on a coloured fill use that fill's partner. A fill role is never used for text.
8.3. **The interface is mostly neutral, and colour is the exception.** Neutrals carry backgrounds, surfaces, default text and secondary controls. That's what makes coloured things stand out.
8.4. **By default, there's one action colour.** It marks the primary action, links, interactive accents and the selected marker. Saturated colour on controls and text therefore means "can be acted on" or "needs attention". Labelling accents (8.9), illustration (8.72) and the AI treatment (8.96) are the only other colour. A product whose precedent uses a second accent maps it to a role, never to action.
8.5. **One colour has one meaning everywhere.** By default, the action colour doesn't appear on text that can't be acted on, except the selected or current marker. A status colour never decorates.
8.6. **Surfaces form a ladder.** The page sits on the base surface. Cards, panels, sheets, overlays and navigation sit on graded steps above it. Overlapping containers use different steps, so their edges show without a line by default. In products used in bright light or on low-quality screens, any two surfaces that must be told apart also take a line.
8.7. **The edge of something interactive uses a stronger line than a decorative divider.** A field's outline is a real boundary. A divider between groups is lighter, and never defines a target.
8.8. **By default, an inverse surface (the opposite tone to the theme) is used only for a passing overlay, such as a toast, or for large framing chrome.** It never spotlights one item.
8.9. **Accent colours for labelling (tags, avatars, categories) are interchangeable.** Swapping one for another changes nothing. They never stand in for a status.
8.10. **Each status role has one job:**
    - error means blocked or failed;
    - warning means needs attention but isn't blocked;
    - success means done, with nothing to do;
    - information means helpful and not urgent.

    There are four levels, with one warning level. Neutral states (draft, not started, inactive) take a neutral treatment.
8.11. **A status is never colour alone.** It always comes with an icon shape and a word.
8.12. **A group of statuses shows the colour of its most severe member.**
8.13. **Status colours stay fixed when the brand changes.** A product theme never re-colours error, warning or success.
8.14. **Priority (urgent, high, normal, low) is a separate scale from status.** It doesn't borrow status colours. Priority is shown by position, a word and an icon, with colour as a quiet extra at most.
8.15. **Focus has its own colour, used for nothing else.** Selection never uses the focus, link or action colour on its own. It has its own role, plus a non-colour mark (8.19).
8.111. **By default, each region keeps its surface level at every size.** When navigation changes form (bottom bar, rail, expanded rail; 5.15), it keeps the same surface, and the content area keeps the base surface.
8.112. **By default, a badge takes the action colour, not a status colour, unless it counts errors.** A count of new or waiting items isn't a failure, and on status-heavy screens a red badge reads as errors. A badge that counts errors takes the error role (10.44).

## 2. States
8.16. **States are derived from the resting colour by one fixed relationship across the whole system,** never chosen per component. Hover is the smallest change, pressed is a stronger change, and the same state looks the same on every component.
8.17. **Hover and pressed are temporary, and sit on top of selected.** Selected persists. Something selected and hovered still reads as selected. Something selected and focused keeps its selection and adds focus.
8.18. **Focus is a ring around the control, following its shape one step out.** The control's own colour doesn't change. Only one thing on a screen has focus.
8.19. **Selection is shown by more than colour:** a check, an underline, a border, a filled icon or a change of shape comes with it.
8.20. **Unavailable is drawn from the neutrals.** It loses any elevation and doesn't respond to hover. It still looks like the control it is, and its reason sits beside it.
8.21. **By default, only actions, choices and inputs can be unavailable.** Containers never are. An unavailable floating action is removed, not greyed. Steps not yet reachable, and features locked by licence or permission, show as locked, with the reason.
8.22. **An icon button shows its state on a background behind the icon,** not by recolouring the icon.
8.23. **No state lowers a control's contrast with its surroundings,** or the contrast of its focus or selection.
8.113. **Everything that can be tapped or clicked shows pressed the moment input lands:** buttons, chips, checkboxes, and rows or cards that open. Containers that don't act themselves (headers, bars, dialogs, panels) take no hover or pressed state; the controls inside them do. A card or row that opens as a whole is a control, not a container.

## 3. Themes and modes
8.24. **A theme changes values, never roles.** Every role has a value in every theme, and components refer only to roles, so they switch without changes.
8.25. **By default, light is the theme for reading and working, and dark is offered as a full theme.** Products used in low light, such as in-cab and night-shift products, default to dark, and never dazzle a driver.
8.26. **Dark isn't an inversion of light.** Backgrounds go dimmer and foregrounds brighter, but colours are re-tuned for dark, not flipped. Saturated colours are softened. Large surfaces stay dark, and the action colour sits only on a few key elements.
8.27. **By default, the darkest surface in a dark theme is a dark grey, not black,** so higher surfaces have room to be lighter. A platform whose own dark base is black follows the platform.
8.28. **In a dark theme, nearer surfaces are lighter.** Depth is shown by surface lightness, because shadows are hard to see. Shadows stay, but nothing relies on them.
8.29. **Images and icons get dark-theme versions where the light one fails.** White-backed decorative images are dimmed slightly. True content is never altered (8.102).
8.30. **The product follows the device's appearance setting by default.** Products on shared or managed devices may also offer an in-product choice, so one worker's need doesn't depend on the device's setting.
8.31. **High contrast is its own theme, not dark mode.** It uses a small palette, removes decoration, adds borders wherever two surfaces of the same colour meet, and gives every edge that matters a real line. Selected, hover and pressed share one highlight pair. Interactive and non-interactive things are told apart by their colour pair.

## 4. Type
8.33. **Type sizes are a small set of named roles, each with one job:**
    - display, for short important text on large screens;
    - metric, for a single key number at any size;
    - headline, for page titles;
    - title, for sections and containers;
    - body, for reading;
    - label, for text inside controls.

    No size is used outside the set.
8.34. **Product screens use the compact product scale.** The larger, responsive scale belongs to editorial and marketing pages, and by default doesn't appear in a working screen.
8.35. **The biggest styles are only for short text and numbers.** A key metric may use a display or metric style.
8.36. **Sections are marked with heading styles, in order, never with bold body text.**
8.37. **Large styles have tighter line spacing. Body and label text have looser spacing.** Three or more lines are never set tight.
8.38. **One typeface family per script serves the product, plus a monospace role for codes (8.103).** A brand face, if any, is used for headings only, in the scripts it supports.
8.39. **Numbers that are compared in columns use figures of equal width.**
8.40. **Text follows the person's text-size setting, and the hierarchy holds as it grows.**

## 5. Weight and emphasis
8.41. **There are few weights.** Regular is for reading. One heavier weight is for emphasis and headings. Bold is rare. Light and thin weights aren't used in working screens.
8.42. **Emphasis comes from weight, size or colour. By default, all caps isn't used for emphasis.** Acronyms, unit codes and product identifiers keep their own case. Italics are kept for titles, terms and captions.
8.43. **De-emphasis uses a lighter neutral text role, at most two steps below default.** The faintest step is never used for anything that has to be read.
8.44. **Weight and size trade off.** A larger, regular style can outrank a smaller bold one. Hierarchy is set by the pair, not by weight alone.

## 6. Space
8.45. **By default, every space is a step on one scale built from one base unit.** In-between values exist only to align icons with text.
8.46. **More space means more importance and a weaker relationship.** Space replaces a divider wherever it can.
8.47. **Spacing is a theme dimension.** Density and platform swap its values while the role names stay the same.

## 7. Shape
8.48. **Corner radius is a small scale assigned by role, and the same role always gets the same radius,** unless the platform's own shapes apply (8.53).
    - Small details (badges, checkboxes) are rounded least.
    - Controls (buttons, fields, navigation items) take a middle step.
    - Containers (cards, menus, floating panels) take more.
    - Large surfaces (overlays, sheets) take the most.
    - People (avatars) are fully round.
8.49. **Nested corners are concentric.** An inner corner equals the outer corner minus the padding between them, so nested objects with padding never share one radius. A focus ring's radius is its control's radius plus the ring's offset.
8.50. **Shapes that reach the screen's edge aren't rounded on that edge.** The parts of one control (a split button, a segmented control) share one outer shape, with no gaps.
8.51. **Dense, information-heavy containers are only modestly rounded.** Strong shapes are kept for emphasis.
8.52. **Stroke weight grows with the size of the element.**
8.53. **On native mobile, shapes follow the platform's own.**

## 8. Elevation
8.54. **Elevation has a few named levels, each tied to a kind of surface:**
    - sunken, a backdrop for grouping;
    - default, the page;
    - raised, for items that can be moved;
    - overlay, for anything above other content: menus, popovers, overlays, floating bars.
8.55. **Most surfaces are flat. Tone separates layers, and shadow is the exception** (space first, then a divider, then a container).
8.56. **Shadow size means distance.** A small, sharp shadow is close and a large, soft one is far. Light comes from one direction across the whole product.
8.57. **Shadow is used to lift something being dragged, and to protect elements over busy content.** A dragged item rises to the overlay level and returns when dropped. By default, hover doesn't lift anything.
8.58. **A modal sits over a scrim, and the scrim is one fixed role.**
8.59. **By default, content scrolled under a pinned header or footer is shown by a border, or by a change of tone where the platform does that.** A shadow is used only where neither would be noticed.
8.60. **Coloured surfaces don't take the neutral shadow.**
8.61. **Controls and navigation form a layer above content.** A translucent or glass treatment, where the platform uses one, is kept to that layer and never used in content (precedence 2).

## 9. Icons
8.62. **One icon style runs across the product:** the same stroke weight, detail, perspective and corner treatment.
8.63. **An icon's size is tied to the text beside it, and the ratio never changes.** Icons centre on the text, not its baseline, and match its weight and colour unless the icon is the point.
8.64. **Outlined means available or not selected. Filled means selected or emphasised.** A slashed version means the thing it names is off (muted, disconnected). Unavailable controls follow 8.20.
8.65. **The smallest icons inform and are never tapped.** An interactive icon sits in a target of at least the touch size, centred optically.
8.66. **Icons carry a visible label, except the few that everyone knows (search, home, close).** One icon has one meaning everywhere.
8.67. **Status icons take the status colour. Ordinary icons don't take colour, except the action colour on interactive and selected icons.** Only icons that carry their own meaning (a red icon for data loss) use more than one colour.
8.68. **Animated icons show change or activity,** such as a pulse for ongoing work or one bounce for "something happened". They aren't decoration, and they stop with reduced motion.
8.69. **Icons that imply direction flip in right-to-left layouts.**
8.70. **A device or its parts drawn on screen is drawn in one consistent illustration style, recognisable as the real device.** Where it's an instruction (where to load labels, which button to press), the part in question is highlighted, and the rest is quieter.
8.114. **By default, within one set of peers (navigation destinations, tabs, a segmented control, a menu), either every item has an icon or none does.** An icon sits before or above its label, the same for every peer.

## 10. Imagery and illustration
8.71. **Illustration appears in a few moments: empty states, errors, first use and real milestones.** It never appears in dense working screens, and never as decoration.
8.72. **The tone of the moment sets the illustration's colour.** Routine moments are neutral, and celebrations are colourful.
8.73. **Illustrations are never used as icons or logos.**
8.74. **Illustration explains an idea. A photo or a faithful drawing shows a specific thing** (a device, a part, a label). One product's images share style and purpose.
8.75. **Every interface image works in every theme,** or has a version for each. True content follows 8.102.
8.76. **Brand assets never take space from content.** The logo appears where it gives context, not on every screen.

## 11. Motion as look
8.77. **There are two registers of motion.** Quick, quiet motion serves everyday work and is the default. Fuller motion is kept for rare, significant moments.
8.78. **Constant motion is used only for things that run at a constant rate,** such as an indeterminate spinner.
8.79. **Motion is part of the theme.** Reduced motion is a mode the theme carries, not a per-component exception.
8.115. **By default, a transition between screens shows how the two screens relate, and the same kind of move always looks the same.** Global navigation stays still during every transition. Moves people make constantly take the least motion, or a near-instant change (3.123), while each kind of move stays recognisable. With reduced motion, every screen transition becomes a fade or an instant change (6.66). Duration and easing follow (3.121, 3.122).
8.116. **Going deeper and coming back use the platform's own forward and back transition, and back is always forward reversed.** By default, where the platform has none, as on a web console, the content changes near-instantly and the header's title and way back change with it. A sideways forward and back mirrors in right-to-left layouts (5.39).
8.117. **By default, moving between peers in one set (tabs, the previous or next item in a sequence) changes the content with a quick fade.** Where people can also swipe between those peers (2.91, 3.97), the content slides along the axis the set runs on, toward the chosen peer, and mirrors in right-to-left layouts (5.39). A slide tells people they can swipe, so it's never used where they can't.
8.118. **By default, switching between top-level destinations is a quick fade of the content area, or an instant change, never a slide.** Only the selected marker in global navigation moves. A slide would suggest destinations can be swiped between, which clashes with swipes inside them (3.100).
8.119. **By default, something that expands in place grows out of what was tapped and closes back into it:** a card or row expanding within its list, a control into its menu. Opening an item onto its own screen is going deeper and follows 8.116. Overlays enter from the edge they're anchored to and leave the same way (3.125).

## 12. Brand inside the product
8.80. **Brand shows through a few deliberate touches, not by covering surfaces.** Those touches are the action colour on the primary action and the selected navigation marker, the logo where it gives context, and a brand face on headings at most.
8.81. **Branding changes look, never placement, behaviour or meaning.** A branded component keeps its size, position and behaviour.
8.82. **The launch screen shows only what the platform's launch screen shows (the app icon), and working screens carry no brand content.** Welcome and first-use screens may.
8.83. **A customer's or site's own branding in a multi-tenant product is usually limited to its logo and its action colour,** in the shell's identity slot. It never reaches status or meaning.

## 13. Re-theming to a product
8.84. **Values are usually layered in three tiers:**
    - raw values;
    - roles that give those values a meaning;
    - component-level values, only where one component genuinely needs its own.

    Components use roles. A theme reassigns the values beneath them.
8.85. **A product theme overrides values on the default theme. It never forks it.** Only what differs is changed, and the change reaches every component.
8.86. **Role names and meanings never change. Only values do.** A product never repurposes a role. "Error" stays error and "action" stays action, whatever their values.
8.87. **A brand theme can start from one brand colour.** The system generates the full range and its dark version, and feeds it into the action and selected roles. Status colours stay where they are.
8.88. **Generated colour ranges are preferred for roles, and the exact brand value is kept for brand touches.** Every generated pair still clears the floors.
8.89. **A product re-themed from its own existing values ends with each of those values on the role whose meaning fits:**
    - its main button colour on action, its page grey on the base surface, its alert red on error;
    - a value that fits no role either stays a one-off in the product's code, or marks a missing role (8.91);
    - a value that clashes with a fixed role, such as a brand red that would read as an error, stays off that role and lives only in brand touches (8.80);
    - every pair clears the floors in every mode, and a product value that didn't is adjusted, not kept.
8.90. **Theme and mode are independent.** Every mode a product offers exists for every theme it offers, and high contrast is always offered. Each combination is checked on its own. A single-mode product, such as a monochrome printer panel, has only that mode.
8.91. **A new role is added only when no existing role fits, and only once several uses need it.** It must define its meaning, its pair, its value in every mode, and its contrast.
8.92. **No colour is ever set directly anywhere a theme must reach.** Setting one directly is how dark and high-contrast themes break.
8.93. **Names describe use,** by default built from category, then property, then role, then state. A name never describes a colour.
8.94. **Platforms may adapt values such as size and density, but share the same names.**

## 14. Colours that mark AI
8.95. **The AI treatment marks AI and nothing else.** It's never decoration, never a "new" signal, and never applied to anything AI didn't produce or doesn't run.
8.96. **The AI marker is always an icon and a label, opening an explanation.** A distinct AI colour or glow may reinforce it, but is never the only signal, and disappears in high contrast.
8.97. **The AI treatment is a variant of the normal component, and behaves the same.** By default, once a person changes AI-produced content it returns to the normal style, keeping a way back to the AI version.
8.98. **A decorative gradient is its own role.** It never shows data (data scales belong to 10), and it keeps the floors wherever text or a boundary sits on it.

## 15. Colour for urgent and device states
8.99. **A raised emergency may colour the shell, so the state is unmissable from across the room.** It uses the error role, with a word and an icon, and holds until resolved. A silent duress alert changes nothing visible. The only other shell colouring is the environment marker (8.110).
8.100. **On-screen device status uses the product's fixed status set.** A drawing of the device shows its lights in their physical colours, with their meaning in words (8.70).
8.101. **Scan feedback on screen uses the success and error roles for an instant, with the captured value in words.** It never flashes.

## 16. True content, scripts and Zebra hardware
8.102. **Label previews, documents, photos and customer logos keep their true colours in every theme.** They're never inverted, dimmed or tinted, and sit on a neutral frame that separates them from the surface.
8.103. **Codes and identifiers have their own monospace type role,** in which similar characters (0 and O; 1, l and I) are clearly different. That covers serial numbers, network addresses, barcode data and printer command code.
8.104. **Type serves every script the product ships in.** Each script uses a face designed for it, with taller line spacing for tall scripts (Thai, Devanagari, Arabic). Italics, all caps and synthetic bold aren't relied on where a script has none.
8.105. **Small monochrome displays carry meaning without colour.** Every role collapses to foreground and background. Selection shows by inversion, status by icon and word, and emphasis by size, never by grey levels the panel can't show.
8.106. **A customer's colour is made to fit, never trusted as given.** It feeds the action role only after it clears the floors in every mode. If it fails, it's adjusted toward passing, or kept to the logo. A tenant logo has light and dark versions, and sits in a fixed slot that never grows (8.83).
8.107. **By default, a screen is either fully re-themed or not at all.** During a migration, an old and a new look never share one screen. Content the product can't theme (system dialogs, embedded web views) is framed, not imitated.
8.108. **Icon meanings travel across cultures.** Icons avoid local objects, hand gestures and marks whose meaning differs by region (a tick can mean "wrong"). Where a meaning can't travel, the word carries it.
8.109. **Where on-screen guidance points at a physical control that has a colour (a yellow scan trigger), the drawing shows that colour.** It never borrows the action or status roles.
8.110. **An admin console marks a non-production environment** (test, staging) with a lasting marker in the shell's identity slot, distinct from both brand and status colours.
