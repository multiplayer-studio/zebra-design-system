export interface ColorToken {
  cssVar: string;
  label: string;
}

export interface ColorGroup {
  title: string;
  description: string;
  tokens: ColorToken[];
}

// Label is derived from the CSS variable name itself (e.g. --surface-page -> "page")
// so this list only has to name the token once, matching what's actually in colors.css.
function token(cssVar: string, group: string): ColorToken {
  const label = cssVar.replace(`--${group}-`, '').replace(/-/g, ' ');
  return { cssVar, label };
}

export const colorGroups: ColorGroup[] = [
  {
    title: 'Surface',
    description: 'Background colors for pages, containers, and overlays.',
    tokens: [
      'surface-page',
      'surface-section',
      'surface-card',
      'surface-dialog',
      'surface-sheet',
      'surface-popover',
      'surface-tooltip',
      'surface-brand',
      'surface-inverse',
      'surface-success',
      'surface-warning',
      'surface-error',
      'surface-info',
    ].map((v) => token(`--${v}`, 'surface')),
  },
  {
    title: 'Foreground',
    description: 'Text and icon colors.',
    tokens: [
      'foreground-primary',
      'foreground-secondary',
      'foreground-tertiary',
      'foreground-disabled',
      'foreground-inverse',
      'foreground-link',
      'foreground-cursor',
      'foreground-success',
      'foreground-warning',
      'foreground-error',
      'foreground-info',
    ].map((v) => token(`--${v}`, 'foreground')),
  },
  {
    title: 'Border',
    description: 'Border and divider colors.',
    tokens: [
      'border-default',
      'border-subtle',
      'border-strong',
      'border-focus',
      'border-success',
      'border-warning',
      'border-error',
      'border-info',
    ].map((v) => token(`--${v}`, 'border')),
  },
  {
    title: 'Feedback',
    description: 'Background/text/icon triads for banners, toasts, and alerts.',
    tokens: [
      'feedback-success-background',
      'feedback-success-text',
      'feedback-success-icon',
      'feedback-warning-background',
      'feedback-warning-text',
      'feedback-warning-icon',
      'feedback-error-background',
      'feedback-error-text',
      'feedback-error-icon',
      'feedback-info-background',
      'feedback-info-text',
      'feedback-info-icon',
    ].map((v) => token(`--${v}`, 'feedback')),
  },
  {
    title: 'Chart',
    description: 'Gridlines, axes, and a 12-color categorical data series.',
    tokens: [
      'chart-grid',
      'chart-axis',
      'chart-reference',
      'chart-positive',
      'chart-negative',
      'chart-neutral',
      'chart-series-1',
      'chart-series-2',
      'chart-series-3',
      'chart-series-4',
      'chart-series-5',
      'chart-series-6',
      'chart-series-7',
      'chart-series-8',
      'chart-series-9',
      'chart-series-10',
      'chart-series-11',
      'chart-series-12',
    ].map((v) => token(`--${v}`, 'chart')),
  },
  {
    title: 'Navigation, focus & selection',
    description: 'Focus rings, text selection, overlays, and nav item states.',
    tokens: [
      'focus-ring',
      'focus-outline',
      'contrast-high',
      'contrast-low',
      'overlay-scrim',
      'overlay-modal',
      'selection-background',
      'selection-border',
      'selection-text',
      'navigation-background',
      'navigation-item-default',
      'navigation-item-active',
      'navigation-item-hover',
      'navigation-item-selected',
    ].map((v) => {
      const group = v.split('-')[0];
      return token(`--${v}`, group);
    }),
  },
];
