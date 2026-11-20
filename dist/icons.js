import { iconGlyphs } from "@zebra-design-system/icons/codepoints.js";
import { iconNames } from "@zebra-design-system/icons/names";
/** Every glyph name in the Zebra icon set, as the set spells it. */
export const ZetaIconNameList = iconNames;
/** Names Zeta's former icon font spelt differently from the Zebra set. */
const ALIASES = { quote_: "quote" };
/** The font character for an icon name, or `undefined` when the set has no glyph of that name. */
export const zetaIconGlyph = (name) => {
    const key = name?.trim();
    if (!key)
        return undefined;
    return iconGlyphs[(ALIASES[key] ?? key).replace(/_/g, "-")];
};
//# sourceMappingURL=icons.js.map