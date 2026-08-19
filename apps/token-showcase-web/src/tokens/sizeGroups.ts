export interface SizeToken {
  cssVar: string;
  label: string;
}

function token(cssVar: string, group: string): SizeToken {
  return { cssVar, label: cssVar.replace(`--${group}-`, '') };
}

export const spaceScale: SizeToken[] = [
  'space-2xs',
  'space-xs',
  'space-sm',
  'space-md',
  'space-lg',
  'space-xl',
  'space-2xl',
].map((v) => token(`--${v}`, 'space'));

export const appliedSpace: SizeToken[] = ['space-page', 'space-card', 'space-section', 'space-gutter'].map(
  (v) => token(`--${v}`, 'space'),
);

export const radiusScale: SizeToken[] = [
  'radius-xs',
  'radius-sm',
  'radius-md',
  'radius-lg',
  'radius-xl',
  'radius-pill',
  'radius-container',
].map((v) => token(`--${v}`, 'radius'));

export const strokeScale: SizeToken[] = ['stroke-thin', 'stroke-base', 'stroke-thick', 'stroke-heavy'].map(
  (v) => token(`--${v}`, 'stroke'),
);

export const controlScale: SizeToken[] = [
  'control-target-min',
  'control-sm',
  'control-md',
  'control-lg',
].map((v) => token(`--${v}`, 'control'));

export const controlIconScale: SizeToken[] = ['control-icon-sm', 'control-icon-md', 'control-icon-lg'].map(
  (v) => token(`--${v}`, 'control-icon'),
);
