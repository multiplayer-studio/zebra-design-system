# Token Showcase - Flutter

A Flutter app that showcases the Zebra Design System tokens. This mirrors the approach of `@apps/token-showcase/` but adapted for Flutter.

## Overview

This app imports the generated Flutter tokens from `zebra-design-system-tokens` and demonstrates:

- **Color tokens** — Surface, foreground, border, and feedback colors
- **Typography tokens** — Display, heading, title, body, and label styles
- **Size tokens** — Spacing scales, border radius values, and control sizes

All values displayed are design tokens pulled directly from the token generation system.

## Running the app

```bash
cd apps/token-showcase-flutter
flutter pub get
flutter run
```

## Adding to the showcase

The app is structured as a tab-based navigation:
- `lib/screens/home_screen.dart` — Navigation home
- `lib/screens/colors_screen.dart` — Color token groups
- `lib/screens/typography_screen.dart` — Typography styles
- `lib/screens/sizes_screen.dart` — Size scales and controls

To add more token groups (e.g., shadows, animations), add a new screen file and link it from `home_screen.dart`.
