# Using @zebra-fed/zeta-web

For existing Zeta consumers; new builds should prefer the
@zebra-design-system packages.

- Import `@zebra-fed/zeta-web` (registers zeta-* elements) and
  `@zebra-fed/zeta-web/index.css`. React wrappers: `@zebra-fed/zeta-web/react`.
- Theme with attributes on an ancestor: `data-theme="dark"`,
  `data-brand="companion"|"condensed"`, `data-breakpoint`.
- The element API is in custom-elements.json (machine-readable).

## Spec-refined components
- [Accordion](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/accordion.md): A vertically stacked list of disclosure rows sharing one container, for a page that has more sections than it has room to show at once.
- [Assist Chip](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/assist-chip.md): Offers a contextual action, or stands for an item someone can discard, such as an attached file.
- [Avatar](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/avatar.md): A visual representation of a user or entity, shown as a photo, initials, or icon, with an optional status indicator.
- [Avatar Rail](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/avatar-rail.md): Shows a group of people as overlapping avatars, with an optional counter standing in for everyone who did not fit.
- [Bottom Sheet](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/bottom-sheet.md): A surface anchored to the bottom edge of the screen, holding supplementary content or a short set of actions without moving a person off the view behind it.
- [Breadcrumb](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/breadcrumb.md): Shows where a page sits in the hierarchy, as a trail of links ending on the current page.
- [Button](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/button.md): Triggers an action from a text label, with optional icons on either side.
- [Button Group](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/button-group.md): A row of related actions sharing one bordered surface, where each carries equal weight rather than one leading.
- [Card](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/card.md)
- [Chat Message](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/chat-message.md): One message in a chat, from someone else, you or the assistant.
- [Checkbox](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/checkbox.md): A square control for turning a single option on or off, with an optional label beside it.
- [Dialog](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/dialog.md): A modal message that interrupts the current task until the user responds or dismisses it.
- [Divider](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/divider.md): A thin line used to visually separate content into distinct sections or groups, such as list rows, cards, or menu items.
- [Dropdown](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/dropdown.md): A pattern rather than a component, pairing a trigger with a Dropdown Menu and placing the menu relative to it.
- [File Upload](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/file-upload.md): A drop zone with a Select files button, and the list of chosen files beneath it.
- [Filter Chip](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/filter-chip.md): Lets someone narrow a set of content by switching criteria on and off, such as categories in a list of results.
- [Global Header](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/global-header.md): The bar across the top of an application, carrying the product’s identity at the leading edge, navigation and search in the middle, and the person’s account at the trailing edge.
- [Icon](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/icon.md): Wraps a single glyph from the icon library so it can be sized consistently and embedded in other components.
- [Icon Button](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/icon-button.md): Triggers an action from a single glyph, with no text label.
- [Inline Banner](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/inline-banner.md): A status message placed inside the content it is about: a form, a card, a panel.
- [Input](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/input.md): The full field assembly, a label above, the field itself and a hint below, stacked and spaced as one unit.
- [Input Chip](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/input-chip.md): Represents a person, entity or value someone has entered or picked, such as a recipient on a message, so it can be reviewed and removed without retyping.
- [Lightbox](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/lightbox.md): A full-size preview over the page, opened from the item being viewed.
- [Message Input](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/message-input.md): A composer for conversational, AI-assisted surfaces: type, attach, dictate, record a voice message, hear the reply.
- [Navigation Bar](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/navigation-bar.md): A horizontal bar of top-level destinations, pinned to one edge of a view.
- [Navigation Drawer](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/navigation-drawer.md): The app's destinations in a tall panel at the edge of the screen, opened from a menu button.
- [Navigation Item](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/navigation-item.md): A single destination inside a Navigation Bar, shown as an icon above a label with an optional badge.
- [Navigation Rail](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/navigation-rail.md): A vertical navigation column for the edge of a desktop view, made of a narrow icon rail and a sub menu panel beside it.
- [Navigation Rail Item](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/navigation-rail-item.md): A single destination in a Navigation Rail, shown as a glyph in a square target or, in the wide form, a glyph and label on one row.
- [Notification Indicator](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/notification-indicator.md): Marks that something is waiting on whatever it is pinned to, optionally with a count.
- [Notification Item](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/notification-item.md): A single entry in a notification list, carrying who or what it came from, a title and message, an optional attachment, and an action.
- [Pagination](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/pagination.md): A horizontal bar of page controls, first/previous/next/last jump buttons, a row of page number indicators, and an optional overflow marker for a long page range.
- [Phone Input](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/phone-input.md): Takes a phone number, with a country picker joined to its start.
- [Progress Bar](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/progress-bar.md): A horizontal track that fills to show how far an ongoing process has got.
- [Progress Circle](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/progress-circle.md): A ring that reports an ongoing process where a bar will not fit, beside an icon or inside a dense row.
- [Radio Button](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/radio-button.md): A circular control for choosing exactly one option from a set, with an optional text label beside it.
- [Screen Header Bar](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/screen-header-bar.md): The bar at the top of a screen, carrying a back affordance, the screen's title and one action.
- [Scrim](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/scrim.md): The translucent barrier between a raised surface and the page behind it.
- [Scrollbar](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/scrollbar.md): The scroll indicator for a region that clips its content.
- [Search](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/search.md): A single-line input for typing a query, with a magnifier leading it and a trailing control that takes whatever icon and function the implementation passes.
- [Segmented Control](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/segmented-control.md): A row of mutually exclusive options sharing one track, where exactly one is active at a time.
- [Select](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/select.md): The full select assembly: a label above, a Select Field in the middle and a hint below, stacked and spaced as one unit.
- [Slider](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/slider.md): A control for choosing a value along a range by dragging a thumb.
- [Snackbar](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/snackbar.md): A brief message about something the app just did, carrying at most one action.
- [Stepper](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/stepper.md): Shows where a person is in a fixed sequence of steps, marking what is finished, what is current and what is still ahead.
- [Stepper Input](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/stepper-input.md): A numeric value with a button on either side to decrease or increase it.
- [Sub Menu Item](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/sub-menu-item.md): A row in the Navigation Rail's sub menu panel, with a leading glyph, a label, an optional badge and an optional caret.
- [Switch](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/switch.md): A single on or off toggle, a track with a thumb slider that switches between its two ends.
- [System Banner (Desktop)](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/system-banner-desktop.md): A full-width message pinned to the top of a desktop view, carrying a status colour, a title, an optional description and an optional action.
- [System Banner (Mobile)](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/system-banner-mobile.md): A full-width message pinned to the top of a mobile screen, carrying a status colour, a title, an optional description and an optional action.
- [Tab Bar](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/tab-bar.md): A row of tabs for switching between views at the same level.
- [Table](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/table.md): A data table with rows of content in columns, framed by an optional controls bar above and a footer below.
- [Tooltip](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/tooltip.md): A short floating message that names what an adjacent control does.
- [Top App Bar](https://github.com/zebratechnologies/zebra-design-system/blob/main/docs/components/top-app-bar.md): The header at the top of a mobile screen, carrying the screen’s name between a leading control and whatever actions the screen needs.
