import { getContrast } from "polished";
import { elementUpdated, expect } from "@open-wc/testing";
import "../../index.css";

interface AccessibilityTests {
  darkMode: boolean;
  highContrast: boolean;
}

function rgbToHex(rgb: string): string {
  const result = rgb.match(/\d+/g);
  if (!result) return rgb;
  const [r, g, b] = result.map(Number);
  return (
    "#" +
    [r, g, b]
      .map(x => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

const modes = [false, true];
const tests: AccessibilityTests[] = modes.flatMap(darkMode => modes.map(highContrast => ({ darkMode, highContrast })));
/**
 * Tests the color contrast between a foreground and background element.
 * @param foreground - The foreground element (e.g., text).
 * @param background - The background element (e.g., button).
 * @param options - `highContrast: false` skips the data-contrast="more" passes, for components on the Zebra tokens,
 * which have no contrast mode yet.
 */
export const contrastTest = async (
  testName: string,
  foreground: HTMLElement | Element,
  background: HTMLElement | Element,
  options: { highContrast?: boolean } = {}
) => {
  const themeMode = "theme-mode";
  const contrastMode = "contrast-mode";

  for (const test of tests.filter(t => options.highContrast !== false || !t.highContrast)) {
    if (document.getElementById(themeMode)) {
      document.getElementById(themeMode)!.remove();
    }
    if (document.getElementById(contrastMode)) {
      document.getElementById(contrastMode)!.remove();
    }
    const html = document.documentElement;
    html.setAttribute("data-theme", test.darkMode ? "dark" : "light");
    html.setAttribute("data-contrast", test.highContrast ? "more" : "less");

    await elementUpdated(foreground);
    await elementUpdated(background);

    const fgStyles = getComputedStyle(foreground);
    const bgStyles = getComputedStyle(background);
    const fg = fgStyles.color;
    const bg = bgStyles.backgroundColor;
    const contrast = getContrast(fg, bg);

    try {
      if (test.highContrast) {
        expect(contrast).to.be.gte(7); // WCAG AAA minimum for normal text
      } else {
        expect(contrast).to.be.gte(4.5); // WCAG AA minimum for normal text
      }
    } catch (error) {
      console.error(
        `${testName} Contrast test failed. Foreground: ${rgbToHex(fg)}, background: ${rgbToHex(bg)}. ${test.darkMode ? "Dark" : "Light"} mode, ${test.highContrast ? "High Contrast" : "Normal"} mode.`,
        error
      );
      throw error;
    }
    html.removeAttribute("data-theme");
    html.removeAttribute("data-contrast");
  }
};
