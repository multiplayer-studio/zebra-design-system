# File Upload

> A drop zone with a Select files button, and the list of chosen files beneath it. The component never uploads anything. It hands the files over and shows whatever state the product sets on each row, while State reports what the zone itself is doing, from resting through a drag to a refusal.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-file-upload>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `state` | enum | `default` | `default` `dragging` `error` `disabled` |  |
| `shape` | enum | `rounded` | `rounded` `sharp` |  |
| `showCaption` | boolean | `true` |  |  |
| `caption` | string | `Supports PDF, PNG and JPG. Max file size 10 MB.` |  |  |
| `files` | slot |  |  |  |

## When and how to use

### Do

- Say what is accepted in the caption, the types and the size limit, so refusals stay rare.
- Move each row through waiting, uploading and complete yourself, as the upload really progresses.

### Don't

- Don't rely on drag and drop alone. The Select files button is the accessible path, so keep it visible.
- Don't stack zone errors. The error row shows one message, either the product's error or the first refusal.

## States

| State | Trigger | What changes |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Behaviour

- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]

## Content

| Part | Kind | Guidance |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Accessibility

- The Select files button is the keyboard path. It is described by the headline and the caption, so both should read as instruction rather than decoration. The zone itself takes no focus, which is why the button has to stay visible and reachable rather than being treated as a fallback. The error message is the only place a refusal is named, so announce it when it appears rather than leaving the border colour to carry it alone.

---
*Generated from `specs/file-upload` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
