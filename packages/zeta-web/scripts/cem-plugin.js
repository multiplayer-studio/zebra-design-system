
import { generateJsxTypes } from "custom-element-jsx-integration";
import * as fs from "fs"; import * as path from "path";
import { iconNames } from "@zebra-design-system/icons/names";

// ZetaIconName is every name in the Zebra icon set, spelt two ways: about 1,400 string literals. Written out for
// each icon property it adds megabytes to the manifest and the JSX types and says nothing a reader can use, so a
// type that lists the icon names is put back as the name of the type.
const ICON_NAMES = new Set(iconNames.flatMap((name) => [name, name.replace(/-/g, "_")]));
const collapseIconNames = (text) => {
    if (typeof text !== "string" || !text.includes("aac_attach")) return text;
    let placed = false;
    const members = text.split(" | ").flatMap((member) => {
        const literal = /^\s*['"]([^'"]+)['"]\s*$/.exec(member);
        if (!literal || !ICON_NAMES.has(literal[1])) return [member];
        if (placed) return [];
        placed = true;
        return ["ZetaIconName"];
    });
    return members.join(" | ");
};
const collapseIn = (node) => {
    if (!node || typeof node !== "object") return;
    for (const [key, value] of Object.entries(node)) {
        if (key === "text" && typeof value === "string") node[key] = collapseIconNames(value);
        else collapseIn(value);
    }
};

export const JSXPluginWrapped = () => ({
    name: 'jsx-plugin-wrapped',
    packageLinkPhase({ customElementsManifest, context }) {
        const myCEM = customElementsManifest;
        collapseIn(myCEM);
        myCEM.modules.forEach((module) => {
            module.declarations?.forEach((declaration) => {
                ['attributes', 'members'].forEach((key) => {
                    declaration[key]?.forEach((item) => {
                        if (item['change-type']) {
                            item.type = item['change-type'];
                        }
                    });
                });
            });
        });
        generateJsxTypes(myCEM, {
            outdir: "dist",
            fileName: "jsx.d.ts",
            globalEvents: `
/** Triggered when the element is clicked by the user by mouse or keyboard. */
onClick?: (event: MouseEvent) => void;
/** Fired when a key is pressed down. */
onKeyDown?: (event: KeyboardEvent) => void;
/** Fired when a key is released.. */
onKeyUp?: (event: KeyboardEvent) => void;
/** Fired when a key is pressed down. */
onKeyPressed?: (event: KeyboardEvent) => void;
/** Fired when the element receives focus, often triggered by tab navigation. */
onFocus?: (event: FocusEvent) => void;
/** Fired when the element loses focus. */
onBlur?: (event: FocusEvent) => void;
`,
        });
        const filePath = path.join("dist", "jsx.d.ts");
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            fs.writeFileSync(filePath, 'import { type ZetaIconName } from "./icons.js";\n' + content, 'utf8');
        }
    },
})
