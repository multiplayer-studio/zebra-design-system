# Figma Metadata Scraper

Scrapes component metadata documentation frames from the Zebra Figma design system and exports them as structured JSON.

## What it does

This tool reads "component metadata" documentation frames from Figma (e.g., Button, Dialog, Icon Button, etc.) and converts them into structured JSON suitable for:
- Providing rich context to AI models
- Generating markdown documentation (future work)
- Feeding into other build/doc pipeline steps

## Setup

1. Ensure your root `.env` file contains a `FIGMA_PERSONAL_ACCESS_TOKEN` and a `FIGMA_FILE_KEY`:
   ```
   FIGMA_FILE_KEY=<your-figma-file-key>
   FIGMA_PERSONAL_ACCESS_TOKEN=<your-personal-access-token>
   ```

2. Add component metadata frame node ids to `components.json`:
   ```json
   {
     "Button": "3840-907",
     "Dialog": "XXXX-XXXX"
   }
   ```

## Usage

### From the root workspace
```bash
# Scrape all components listed in components.json
pnpm scrape:metadata

# Scrape a single component
pnpm scrape:metadata -- Button

# Self-check
pnpm exec nx run @zebra-design-system/figma-metadata-scraper:selfcheck

# Type checking
pnpm exec nx run @zebra-design-system/figma-metadata-scraper:typecheck

```

### From the `tooling/figma-metadata-scraper/` directory
```bash
# All components
pnpm scrape

# Single component
pnpm scrape -- Button

# Self-check
pnpm selfcheck

# Type checking
pnpm typecheck
```

## Output format

The tool generates one JSON file per component in `output/`:

```json
{
  "componentName": "Button",
  "sourceUrl": "https://www.figma.com/design/...",
  "fileKey": "hvRmnZZOZrmTW0wf8hbrt5",
  "nodeId": "3840:907",
  "fetchedAt": "2025-09-10T12:34:56.789Z",
  "hero": {
    "statusLabel": "BUTTON · COMPONENT METADATA",
    "heading": "What this component does",
    "description": "Triggers one action. Flavour sets intent and emphasis..."
  },
  "sections": [
    {
      "kind": "table",
      "nodeId": "3840:916",
      "title": "Property breakdown",
      "columns": ["Property", "Type", "Default", "Description"],
      "rows": [
        {
          "Property": "Size",
          "Type": "small",
          "Default": true,
          "Description": "Dense UI, secondary actions..."
        }
      ]
    },
    {
      "kind": "anatomy",
      "nodeId": "3840:1033",
      "title": "Anatomy",
      "items": [
        {
          "number": "1",
          "title": "Container",
          "description": "Horizontal row..."
        }
      ]
    },
    {
      "kind": "how-to-use",
      "nodeId": "3840:1060",
      "title": "How to use",
      "dos": ["Match Flavour to intent..."],
      "donts": ["Use gradient for routine actions..."]
    },
    {
      "kind": "bullet-list",
      "nodeId": "3840:1076",
      "title": "Accessibility and content guidelines",
      "items": ["Behaves like a standard button...", "Focus indicator always shows..."]
    }
  ]
}
```

## Section kinds

- **table**: A multi-column property/state/behavior table (Property breakdown, States & Triggers, etc.)
- **anatomy**: A numbered list of component parts with descriptions
- **how-to-use**: Do/Don't guidance cards
- **bullet-list**: Flat lists (Accessibility guidelines, etc.)
- **unknown**: Fallback for any unrecognized section structure (includes all text content for manual review)

## Implementation notes

### Classification is structural, not name-based
Sections are detected by their internal structure (tables have a `Table` frame with rows, anatomy has numbered items, etc.), not by layer names or heading text. This makes the scraper robust to Figma frame naming quirks and component-specific variations.

### Position-based cell zipping for tables
Since the raw Figma REST API doesn't provide CSS classes like `col-N`, table cells are assigned to columns by x-coordinate bucketing: each cell is matched to its nearest column header by horizontal position. This handles sparse rows (some cells missing) gracefully.

### Checkmark icons as booleans
When a table cell contains a checkmark VECTOR/COMPONENT/INSTANCE named "Verified" or "Check Mark", it's represented as `true` in the JSON rather than a string.

### Fallback to unknown
If a section doesn't match any known structure, it degrades to `kind: 'unknown'` with all flattened text content preserved. This ensures nothing is silently dropped.

## Self-check

Run `pnpm selfcheck` (or `pnpm --filter @zebra-design-system/figma-metadata-scraper run selfcheck`) to verify the parsing logic with synthetic test data. This catches regressions in the structural classifiers and position bucketing.

## Future work

- Markdown generation from the JSON output
- Image/asset download and embedding in docs
- Schema validation (JSONSchema or Zod)
- Integration into a doc generation pipeline
