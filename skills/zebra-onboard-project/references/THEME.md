# Writing a project theme

Step 6 of `zebra-onboard-project`, for a project at the level **Zebra with a
project theme**. A project theme is generated, never written by hand:
`zebra-theme` builds it from a small file, the same way the shipped
extensions are built, so it holds in every mode and wherever its class is put.

**A theme changes values, never names or meanings** (`patterns 8.85`,
`patterns 8.86`). It only gives existing tokens new values. Components then
follow it with no change.

`zebra-theme` ships in `@zebra-design-system/tokens`, and a copy ships with
the Design System plugin. Find it as the `zebra-theme` skill's step 1 says:
`npx zebra-theme` when the project has the packages, else the plugin's copy
at `tools/zebra-theme/bin/zebra-theme.mjs`. Below, `npx zebra-theme` stands
for whichever was found. Never ask the designer to install anything to get
it.

## 1. Work out the ramps

Replace whole ramps, not single roles. Every mode points the same roles at
different steps of the same ramps, so one new ramp re-themes light, dark and
the higher-contrast modes together.

| The designer confirmed | Replace |
|---|---|
| Brand colour | the `color/brand/main` ramp |
| A second brand colour | the ramp its role uses: find it with `npx zebra-theme --list=brand` |
| Neutrals | the neutral ramp the surfaces use: find it with `npx zebra-theme --list=neutral` |

For each one, run `npx zebra-theme --ramp=<hex> --like=<ramp>`. It prints the
ramp to paste in. Each step takes the lightness of the step it replaces, so
Zebra's contrast carries over (`patterns 8.87`).

Tell the designer which step carries their exact colour. The command says
so. A brand colour darker or lighter than Zebra's primary step won't be the
button colour: the button takes the step at the right lightness, and the
exact value is kept for brand touches such as the logo (`patterns 8.88`).

If the project's colour is already a shipped ramp (the command says "the
same colour"), don't write a new ramp. Point the brand roles at that ramp
instead, the way a shipped extension does.

## 2. Write the theme file

`zebra-context/<project>.theme.json`:

```json
{
  "name": "route-planner",
  "extends": "companion",
  "values": {
    "primitives": {
      "color/brand/main/10": "#f6e7ff",
      "color/brand/main/20": "#eac7ff"
    }
  },
  "modes": {
    "Dark": { "palette": { "brand/primary/default": "{primitives.color.brand.main.40}" } }
  }
}
```

- `name` is the project's name. The class becomes `.ext-<name>`.
- `extends` is only for a project that starts from a shipped extension. Leave it out otherwise.
- `values` apply in every mode, including the higher-contrast ones. Put the ramps here.
- `modes` change one role in one mode. Use it only when a role must point at a different step in that mode. A change that belongs in one mode must go here, never in `values`.
- Every path is a token that exists. `npx zebra-theme --list=<word>` finds them. A role takes an alias such as `{primitives.color.brand.main.60}`, never a raw value.

A theme never changes status colours (`patterns 8.13`), spacing, sizes or
the type scale. `zebra-theme` refuses the last three.

## 3. Generate and check

```bash
npx zebra-theme zebra-context/<project>.theme.json zebra-context/theme.css
```

Read what it prints:

- **Problems:** it lists every one and writes nothing. Fix the file and run it again.
- **Contrast lost:** each line is a text and background pair that passed before the theme and fails with it. Change that step's lightness, or the step the role points at in that mode, until the line goes. Never ship a theme with a line left (`patterns 8.89`, `patterns 8.106`).

Write the mapping, the ramps and the contrast result into
`zebra-context/THEME.md`.

## 4. In a prototype

- Load `theme.css` after the Zebra token stylesheet.
- Put `ext-<project>` on the page root, beside the mode class.
- Never edit `theme.css`. Change the theme file and generate again.
- The prototype still uses tokens only. It never takes a value from the theme file directly.

After writing a theme, open one prototype in each of the project's modes and
look at a primary button, a link, a selected control and the focus ring.

## Special treatments

A treatment the system already has, such as the AI treatment, uses the
system's tokens for it. Change them only when the designer chose the
project's own, and then per mode under `modes`, because those tokens are
roles. Find them with `npx zebra-theme --list=gradient`. In the
higher-contrast modes, keep what the system does there.

## Fonts

Only when the designer confirmed the project's own font. The family is one
token: find it with `npx zebra-theme --list="font family"` and set it under
`values`, keeping the path exactly as listed:

```json
"values": { "primitives": { "text/font family/IBM Plex Sans": "Poppins" } }
```

Every text style follows. The theme doesn't load the font: add its
stylesheet to the prototype, from the URL the project already loads it from,
with the weights Zebra's text styles use. A weight the font lacks takes its
nearest weight; say which. A licensed font that can't be loaded from a URL
takes the closest free font, and the report says so.
