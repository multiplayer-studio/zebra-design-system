import { describe, it, expect } from 'vitest';
import { buildTypographyShorthand } from './css-synthesizer.js';

describe('buildTypographyShorthand', () => {
  it('groups font-weight/size/line-height/family into one shorthand var per type scale', () => {
    const vars = `
      --body-medium-font-family: 'IBM Plex Sans', sans-serif;
      --body-medium-font-size: 16px;
      --body-medium-font-weight: 400;
      --body-medium-line-height: 24px;
      --body-medium-letter-spacing: 0px;
    `;
    const result = buildTypographyShorthand(vars);
    expect(result).toBe(
      '--body-medium: var(--body-medium-font-weight) var(--body-medium-font-size)/var(--body-medium-line-height) var(--body-medium-font-family);'
    );
  });

  it('emits one line per distinct type scale, sorted, ignoring unrelated vars', () => {
    const vars = `
      --title-small-font-weight: 500;
      --display-large-font-weight: 300;
      --space-md: 12px;
    `;
    const result = buildTypographyShorthand(vars);
    const lines = result.split('\n  ');
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain('--display-large:');
    expect(lines[1]).toContain('--title-small:');
  });

  it('returns an empty string when there are no typography vars', () => {
    expect(buildTypographyShorthand('--space-md: 12px;')).toBe('');
  });
});
