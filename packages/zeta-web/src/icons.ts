import { iconGlyphs } from "@zebra-design-system/icons/codepoints.js";
import { iconNames, type IconName } from "@zebra-design-system/icons/names";

/**
 * Icons come from the Zebra Design System icon set, `@zebra-design-system/icons`: one font in two families
 * ("ZdsIcons-Rounded" and "ZdsIcons-Sharp") that share their codepoints.
 *
 * The set names its glyphs in kebab-case (`expand-more`). Zeta Web also takes the same name with underscores
 * (`expand_more`), as it always has, so existing markup keeps working.
 */
type Underscored<S extends string> = S extends `${infer Head}-${infer Tail}` ? `${Head}_${Underscored<Tail>}` : S;

/** The name of a glyph in the Zebra icon set, in kebab-case or with underscores. */
export type ZetaIconName = IconName | Underscored<IconName>;

/** Every glyph name in the Zebra icon set, as the set spells it. */
export const ZetaIconNameList: readonly IconName[] = iconNames;

/** Names Zeta's former icon font spelt differently from the Zebra set. */
const ALIASES: Record<string, string> = { quote_: "quote" };

/** The font character for an icon name, or `undefined` when the set has no glyph of that name. */
export const zetaIconGlyph = (name: string | null | undefined): string | undefined => {
  const key = name?.trim();
  if (!key) return undefined;
  return (iconGlyphs as Record<string, string>)[(ALIASES[key] ?? key).replace(/_/g, "-")];
};
