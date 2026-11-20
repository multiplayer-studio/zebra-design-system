import type { IconName } from "./icon-names.js";
export declare const iconFamily: {
    readonly rounded: "ZdsIcons-Rounded";
    readonly sharp: "ZdsIcons-Sharp";
};
export type IconStyle = keyof typeof iconFamily;
export declare const iconGlyphs: Record<IconName, string>;
