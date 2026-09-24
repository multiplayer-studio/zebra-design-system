import * as assert from 'assert';

export interface FigmaUrlRef {
  fileKey: string;
  nodeId: string;
  branchId?: string;
}

// Figma page/component links look like:
//   https://www.figma.com/design/<fileKey>/<file-name-slug>?node-id=<id-with-dashes>&m=dev
// (older links use /file/ instead of /design/). The node-id query param uses a dash
// where the API wants a colon (3840-907 -> 3840:907).
export function parseFigmaUrl(url: string): FigmaUrlRef {
  const fileKeyMatch = url.match(/\/(?:design|file)\/([a-zA-Z0-9]{20,})/);
  if (!fileKeyMatch) {
    throw new Error(`Could not extract fileKey from Figma URL: ${url}`);
  }

  const branchMatch = url.match(/\/branch\/([a-zA-Z0-9]{20,})/);

  const nodeIdMatch = url.match(/[?&]node-id=(\d+)-(\d+)/);
  if (!nodeIdMatch) {
    throw new Error(`Could not extract node-id from Figma URL: ${url}`);
  }

  return {
    fileKey: fileKeyMatch[1],
    nodeId: `${nodeIdMatch[1]}:${nodeIdMatch[2]}`,
    branchId: branchMatch?.[1],
  };
}

export function selfCheck(): void {
  const designResult = parseFigmaUrl(
    'https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3840-907&m=dev'
  );
  assert.strictEqual(designResult.fileKey, 'hvRmnZZOZrmTW0wf8hbrt5');
  assert.strictEqual(designResult.nodeId, '3840:907');

  // Page-level link (canvas node id) and the older /file/ prefix.
  const pageResult = parseFigmaUrl(
    'https://www.figma.com/file/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=0-1'
  );
  assert.strictEqual(pageResult.fileKey, 'hvRmnZZOZrmTW0wf8hbrt5');
  assert.strictEqual(pageResult.nodeId, '0:1');

  assert.throws(() => parseFigmaUrl('https://www.figma.com/design/short/Name?node-id=1-2'));
  assert.throws(() =>
    parseFigmaUrl('https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Name')
  );

  console.log('✓ url.selfCheck() passed');
}
