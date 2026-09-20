import { describe, it, expect } from 'vitest';
import { dashToCamel } from './utils.js';

describe('dashToCamel', () => {
  it('converts kebab-case to camelCase', () => {
    expect(dashToCamel('font-size')).toBe('fontSize');
    expect(dashToCamel('body-medium-line-height')).toBe('bodyMediumLineHeight');
  });

  it('leaves strings with no separators untouched', () => {
    expect(dashToCamel('primitives')).toBe('primitives');
  });

  it('handles underscores the same way as dashes', () => {
    expect(dashToCamel('font_size')).toBe('fontSize');
  });
});
