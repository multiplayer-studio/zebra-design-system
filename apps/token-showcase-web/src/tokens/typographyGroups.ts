export interface TypographyToken {
  type: string;
  size: string;
  fontfamily: string;
  fontsize: string;
  fontweight: string;
  lineheight: string;
  letterspacing: string;
}

function typToken(type: string, size: string): TypographyToken {
  return {
    type,
    size,
    fontfamily: `--${type}-${size}-fontfamily`,
    fontsize: `--${type}-${size}-fontsize`,
    fontweight: `--${type}-${size}-fontweight`,
    lineheight: `--${type}-${size}-lineheight`,
    letterspacing: `--${type}-${size}-letterspacing`,
  };
}

export const labelTypography: TypographyToken[] = [
  typToken('label', 'large'),
  typToken('label', 'medium'),
  typToken('label', 'small'),
  typToken('label', 'indicator'),
];

export const bodyTypography: TypographyToken[] = [
  typToken('body', 'large'),
  typToken('body', 'medium'),
  typToken('body', 'small'),
  typToken('body', 'xsmall'),
];

export const displayTypography: TypographyToken[] = [
  typToken('display', 'large'),
  typToken('display', 'medium'),
  typToken('display', 'small'),
];

export const headingTypography: TypographyToken[] = [
  typToken('heading', 'large'),
  typToken('heading', 'medium'),
  typToken('heading', 'small'),
];

export const titleTypography: TypographyToken[] = [
  typToken('title', 'large'),
  typToken('title', 'medium'),
  typToken('title', 'small'),
];
