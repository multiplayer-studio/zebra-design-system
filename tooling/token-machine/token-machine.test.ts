// # fetch-tokens
//
// it creates tokens/raw-tokens.json file
// it populates tokens/raw-tokens.json with correct high-level structure: { schemaVersion, collections, variables }
// collections array contains expected objects: { id, name, modes, isExtension, variableOverrides, defaultModeId }
// variables array contains expected objects: { id, name, description, collectionId, type, scopes, valuesByMode }
// it filters out hiddenFromPublishing and deletedButReferenced variables
// it normalizes valuesByMode with kind: 'alias' or kind: 'literal' wrappers
// it converts Figma RGBA to internal format (e.g., { r, g, b, a })
// it handles missing/invalid FIGMA_TOKEN environment variable
// it handles missing/invalid FIGMA_FILE_KEY environment variable
// it handles Figma API errors (status != 200)
// it returns early if no variables found
//
//
// # convert-tokens
//
// it outputs correct number of token files (one per collection × mode combination, plus extensions)
// all files have $value only at leaf nodes (not intermediate objects)
// root key matches parent collection name (e.g., { "palette": { ... } })
// it converts all Figma types correctly: COLOR → 'color', FLOAT → 'number', STRING → 'string', BOOLEAN → 'boolean'
// it resolves color aliases to { kind: 'alias', variableId } → {palette.brand.primary} format
// it converts RGBA objects to hex strings (with optional alpha channel)
// it preserves variable descriptions in $description field
// extension collections merge overridden + base variables into single output
// extension collections look up parent collection by finding first overridden variable's collectionId
// it handles missing overrides by falling back to base collection values
// it nests nested paths (e.g., brand/primary/500) into nested JSON objects
// it skips empty collections (writes only if file has content)
// filename format: {collection}-{mode}.json or {parentCollection}-{extension}-{mode}.json
//
//
// # build-tokens
//
// it creates color CSS files with --{tokenName}: {value} variables
// it creates separate CSS file for each discovered theme
// color CSS includes both light and dark mode variants (light → :root, dark → @media (prefers-color-scheme: dark) + manual .dark-mode override)
// it creates size CSS with media queries per breakpoint (mobile: no query, tablet: 768px, desktop compact: 1024px, desktop: 1440px)
// building block CSS files emit var() references instead of flattened values
// building block directory structure: primitives/{theme}.css, palette/{theme}.css, size/{theme}.css, semantics.css
// semantics building block unprefixes --semantics- to -- but keeps palette references as-is
// it skips building blocks for non-default themes if no theme-specific override file exists
// it cleans up temp directory before and after build
// all output CSS has auto-generated header comment
// it handles missing token files gracefully (logs warn, continues)
// it discovers themes by glob pattern matching {collection}-{theme}-{mode}.json
//
//
// # clean-tokens
//
// it deletes specified folder paths recursively
// it handles multiple folder paths in parallel (Promise.all)
// it uses recursive: true, force: true flags
// it doesn't error if folders don't exist (force flag)
// it logs success message per deleted folder
// it logs error message if deletion fails
// it exits with code 1 on fatal execution error
//
//
// # Integration tests
//
// full pipeline: fetch → convert → build → verify output structure
// theme discovery and propagation through all stages
// alias resolution chain (palette → primitives, semantics → palette)
// building block composability (any primitives + any palette combination)
