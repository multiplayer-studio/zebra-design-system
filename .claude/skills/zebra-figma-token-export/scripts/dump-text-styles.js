// dump-text-styles.js — read-only. Run with use_figma, once.
// Returns every local text style with its raw values and the variable bound to each property.
// build-tokens.py turns this into tokens/base/text-styles.json and the font list in tokens/fonts.json.
// Save the returned `styles` array to <root>/_dump/text-styles.json. No INPUT to replace.
//
// Text styles are not in GET /v1/files/:key/variables/local, and GET /v1/files/:key/styles only lists
// styles published to a library, so this is the one part of the export that always needs the Plugin API.

const styles = await figma.getLocalTextStylesAsync();
const r = (n) => Math.round(n * 1000) / 1000;
const unit = (v) => (v && typeof v === "object" ? { unit: v.unit, value: "value" in v ? r(v.value) : undefined } : v);

return {
  count: styles.length,
  styles: styles.map((s) => ({
    id: s.id,
    key: s.key,
    name: s.name,
    description: s.description || "",
    remote: s.remote,
    fontFamily: s.fontName.family,
    fontStyle: s.fontName.style,
    fontSize: r(s.fontSize),
    lineHeight: unit(s.lineHeight),
    letterSpacing: unit(s.letterSpacing),
    paragraphSpacing: r(s.paragraphSpacing),
    paragraphIndent: r(s.paragraphIndent),
    textCase: s.textCase,
    textDecoration: s.textDecoration,
    leadingTrim: s.leadingTrim,
    // property -> variable id. fontStyle is Figma's binding for weight.
    bound: Object.fromEntries(Object.entries(s.boundVariables || {}).map(([k, a]) => [k, a.id]))
  }))
};
