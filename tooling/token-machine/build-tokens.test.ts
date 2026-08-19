import { describe, it, expect } from 'vitest';
import primitives from '../../packages/zebra-design-system-tokens/dist/js/primitives/default.js';
import palette from '../../packages/zebra-design-system-tokens/dist/js/palette/default.js';
import semantics from '../../packages/zebra-design-system-tokens/dist/js/semantics.js';
import colors from '../../packages/zebra-design-system-tokens/dist/js/colors.js';
import sizes from '../../packages/zebra-design-system-tokens/dist/js/sizes.js';

describe('JS token building blocks', () => {
  it('semantics light mode resolves to expected values via building-block composition', () => {
    const semanticsLight = semantics(palette.light(primitives));
    // surfaceTooltip should resolve: semantics -> palette -> primitives
    // semantics.surfaceTooltip = palette.fillInverse
    // palette.fillInverse = primitives.colorNeutralCool90
    expect(semanticsLight.surfaceTooltip).toBe(primitives.colorNeutralCool90);
    expect(semanticsLight.surfaceTooltip).toBe('#1d1e23');
  });

  it('palette light mode resolves to expected primitives values', () => {
    const paletteLight = palette.light(primitives);
    expect(paletteLight.fillCanvas).toBe(primitives.colorNeutralCool20);
    expect(paletteLight.brandPrimaryDefault).toBe(primitives.colorBrandMain60);
  });

  it('resolved colors light mode matches primitive color values', () => {
    // colors.light should be a flattened snapshot that equals the semantics composition
    const semanticsLight = semantics(palette.light(primitives));
    expect(colors.light.surfaceTooltip).toBe(semanticsLight.surfaceTooltip);
    expect(colors.light.surfaceTooltip).toBe('#1d1e23');
  });

  it('resolved sizes match across breakpoints', () => {
    // mobile spacePage should be present in sizes
    expect(sizes.mobile.spacePage).toBe('16px');
    expect(sizes.tablet.spacePage).toBe('16px');
    expect(sizes.desktop.spacePage).toBe('16px');
  });
});
