# CHANGES.md

Local changes to the design-system docs in this project. Add an entry for every change, newest first, in the format `AGENTS.md` sets (Changing the design system, step 4). The design-system team reads these entries each sprint, so the **Why** matters most.

Installed version: 2.2611.2-beta

## 2026-11-13: Global Header adapts to its own width, down to phone
- Type: new variant
- Files: organisms/global-header.md (Anatomy, Spacing & Sizing, new Responsiveness section, Properties: MenuItems, Usage, Accessibility), DESIGN.md (§6 Responsive Behavior & Touch: Adaptive navigation)
- Why: this project keeps one Global Header on every screen size instead of switching to the Top App Bar on handhelds. The header now collapses, driven by its content and with no new breakpoints: navigation items overflow one at a time into a `more` menu, then search becomes an icon that opens a search row, then the platform name hides, then the username, app switcher and dividers. MenuItems becomes a list of navigation items (label, icon, icon-only, current) so items can move between the bar and the `more` menu.
- Upstream: propose
