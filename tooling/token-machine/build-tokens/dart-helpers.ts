export function dashToCamel(str: string): string {
  return str.replace(/[-_]([a-zA-Z0-9])/g, (g) => g[1].toUpperCase());
}

export function dashToPascal(str: string): string {
  const camel = dashToCamel(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

export function pathToSnake(path: string[]): string {
  return path.join('_').replace(/-/g, '_');
}

export function dartValueLiteral(value: unknown): { dartType: string; expr: string } {
  if (typeof value === 'number') {
    return { dartType: 'double', expr: `${value}` };
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (trimmed.startsWith('#')) {
      let hex = trimmed.substring(1).toUpperCase();
      if (hex.length === 6) hex = 'FF' + hex;
      return { dartType: 'Color', expr: `Color(0x${hex})` };
    }

    const rgbaMatch = trimmed.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/);
    if (rgbaMatch) {
      return {
        dartType: 'Color',
        expr: `Color.fromRGBO(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${rgbaMatch[4]})`,
      };
    }

    const numMatch = trimmed.match(/^(-?[\d.]+)(px|%)?$/);
    if (numMatch) {
      return { dartType: 'double', expr: numMatch[1] };
    }

    return { dartType: 'String', expr: `'${trimmed.replace(/'/g, "\\'")}'` };
  }

  return { dartType: 'dynamic', expr: `null /* unsupported value: ${JSON.stringify(value)} */` };
}
