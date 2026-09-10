import * as assert from 'assert';
import type {
  FigmaNodeRaw,
  HeroSection,
  AnatomyItem,
  DocSection,
  ComponentMetadataDoc,
} from './types.js';

// --- URL Parsing ---

export function parseFigmaUrl(url: string): { fileKey: string; nodeId: string } {
  // Extract fileKey from path segment after /design/ or /file/
  const designMatch = url.match(/\/design\/([a-zA-Z0-9]{20,})/);
  const fileKeyRaw = designMatch?.[1];
  if (!fileKeyRaw) {
    throw new Error(`Could not extract fileKey from Figma URL: ${url}`);
  }

  // Extract node-id query param and convert hyphen form to colon form
  const nodeIdMatch = url.match(/[?&]node-id=(\d+)-(\d+)/);
  if (!nodeIdMatch) {
    throw new Error(`Could not extract node-id from Figma URL: ${url}`);
  }
  const nodeId = `${nodeIdMatch[1]}:${nodeIdMatch[2]}`;

  return { fileKey: fileKeyRaw, nodeId };
}

// --- Text Extraction ---

function getTextContent(node: FigmaNodeRaw): string[] {
  const texts: string[] = [];
  if (node.type === 'TEXT' && node.characters) {
    texts.push(node.characters);
  }
  if (node.children) {
    for (const child of node.children) {
      texts.push(...getTextContent(child));
    }
  }
  return texts;
}

// --- Heading Extraction ---

function extractHeadingText(node: FigmaNodeRaw): string | null {
  // First direct child of type TEXT
  if (node.children) {
    for (const child of node.children) {
      if (child.type === 'TEXT' && child.characters) {
        return child.characters.trim();
      }
    }
    // Fallback: 2-level search
    for (const child of node.children) {
      if (child.children) {
        for (const grandchild of child.children) {
          if (grandchild.type === 'TEXT' && grandchild.characters) {
            return grandchild.characters.trim();
          }
        }
      }
    }
  }
  return null;
}

// --- Checkmark Detection ---

function containsCheckmarkDescendant(node: FigmaNodeRaw): boolean {
  if (
    (node.type === 'VECTOR' ||
      node.type === 'BOOLEAN_OPERATION' ||
      node.type === 'INSTANCE' ||
      node.type === 'COMPONENT') &&
    node.name &&
    (/check\s*mark/i.test(node.name) || /verified/i.test(node.name))
  ) {
    return true;
  }
  if (node.children) {
    for (const child of node.children) {
      if (containsCheckmarkDescendant(child)) {
        return true;
      }
    }
  }
  return false;
}

// --- Position-based cell zipping ---

interface CellPosition {
  value: string | boolean | string[];
  xMid: number;
}

function extractCellsByPosition(rowNode: FigmaNodeRaw): CellPosition[] {
  const cells: CellPosition[] = [];
  if (!rowNode.children) {
    return cells;
  }

  for (const child of rowNode.children) {
    const xMid =
      child.absoluteBoundingBox?.x !== undefined &&
      child.absoluteBoundingBox?.width !== undefined
        ? child.absoluteBoundingBox.x + child.absoluteBoundingBox.width / 2
        : 0;

    // Check for checkmark
    if (containsCheckmarkDescendant(child)) {
      cells.push({ value: true, xMid });
      continue;
    }

    // Get text descendants
    const texts = getTextContent(child).map(t => t.trim()).filter(t => t);

    if (texts.length === 0) {
      continue;
    } else if (texts.length === 1) {
      cells.push({ value: texts[0], xMid });
    } else {
      // Multiple text nodes → collect as array
      cells.push({ value: texts, xMid });
    }
  }

  return cells;
}

// --- Table Parsing ---

function extractTableSection(sectionNode: FigmaNodeRaw): DocSection {
  const title = extractHeadingText(sectionNode) || 'Untitled';
  const tableFrame = sectionNode.children?.find(
    (c: FigmaNodeRaw) => c.name === 'Table'
  );

  if (!tableFrame?.children || tableFrame.children.length === 0) {
    // Fallback: no Table frame found, treat as unknown
    return {
      kind: 'unknown',
      nodeId: sectionNode.id,
      layerName: sectionNode.name,
      title,
      rawTextContent: getTextContent(sectionNode),
    };
  }

  const headerRow = tableFrame.children[0];
  const rows = tableFrame.children.slice(1);

  // Extract column headers by x-position
  const headerCells = extractCellsByPosition(headerRow);
  const headerCellsSorted = headerCells.sort((a, b) => a.xMid - b.xMid);
  const columns = headerCellsSorted
    .map((c: CellPosition) => {
      if (typeof c.value === 'string') return c.value;
      return '';
    })
    .filter(c => c);

  // Extract rows, zipping by x-position to nearest column
  const parsedRows: Record<string, string | boolean | string[]>[] = [];
  let previousFirstColumnValue: string | boolean | string[] = '';

  for (const row of rows) {
    const rowCells = extractCellsByPosition(row);
    const rowRecord: Record<string, string | boolean | string[]> = {};

    // Initialize all columns to empty string
    for (const col of columns) {
      rowRecord[col] = '';
    }

    // Assign cells to nearest column by x-position
    for (const cell of rowCells) {
      let nearestColumn = columns[0];
      let minDistance = Infinity;
      for (const col of columns) {
        const colXMid = headerCellsSorted.find((hc: CellPosition) => {
          if (typeof hc.value === 'string') return hc.value === col;
          return false;
        })?.xMid;
        if (colXMid !== undefined) {
          const distance = Math.abs(cell.xMid - colXMid);
          if (distance < minDistance) {
            minDistance = distance;
            nearestColumn = col;
          }
        }
      }

      // If column already has a value, prefer checkmark/boolean over string
      const existing = rowRecord[nearestColumn];
      if (cell.value === true || existing === '') {
        rowRecord[nearestColumn] = cell.value;
      } else if (typeof cell.value !== 'boolean' && typeof existing === 'string' && existing === '') {
        rowRecord[nearestColumn] = cell.value;
      }
    }

    // If the first column is empty, copy from the previous row
    const firstColumn = columns[0];
    if (rowRecord[firstColumn] === '' && previousFirstColumnValue) {
      rowRecord[firstColumn] = previousFirstColumnValue;
    } else if (rowRecord[firstColumn] !== '') {
      previousFirstColumnValue = rowRecord[firstColumn];
    }

    parsedRows.push(rowRecord);
  }

  return {
    kind: 'table',
    nodeId: sectionNode.id,
    title,
    columns,
    rows: parsedRows,
  };
}

// --- Anatomy Parsing ---

function extractAnatomySection(sectionNode: FigmaNodeRaw): DocSection {
  const title = extractHeadingText(sectionNode) || 'Anatomy';
  const detailsNode = sectionNode.children?.find((c: FigmaNodeRaw) =>
    c.name?.includes('Details')
  );

  const items: AnatomyItem[] = [];
  if (detailsNode?.children) {
    // Anatomy items are usually grouped: number + annotation pair
    // The Details node has children where some are number frames and some are annotation frames
    let currentNumber = '';
    let currentTitle = '';

    for (const child of detailsNode.children) {
      const childTexts = getTextContent(child)
        .map(t => t.trim())
        .filter(t => t);

      if (childTexts.length === 0) continue;

      // Check if first text is a number
      const firstText = childTexts[0];
      if (/^\d+\.?$/.test(firstText)) {
        // This is a number marker
        currentNumber = firstText;
      } else if (currentNumber && childTexts.length >= 2) {
        // This is likely the annotation for the previous number
        items.push({
          number: currentNumber,
          title: childTexts[0],
          description: childTexts.slice(1).join(' '),
        });
        currentNumber = '';
      }
    }
  }

  // Find diagram node
  const diagramNode = sectionNode.children?.find(
    (c: FigmaNodeRaw) =>
      c.name?.includes('Diagram') ||
      (c.children?.some((cc: FigmaNodeRaw) =>
        cc.name?.includes('Diagram')
      ) ?? false)
  );
  const diagramNodeId = diagramNode?.id;

  return {
    kind: 'anatomy',
    nodeId: sectionNode.id,
    title,
    diagramNodeId,
    items,
  };
}

// --- How-to-use Parsing ---

function extractHowToUseSection(sectionNode: FigmaNodeRaw): DocSection {
  const title = extractHeadingText(sectionNode) || 'How to use';
  const dos: string[] = [];
  const donts: string[] = [];

  // The grid container typically has a specific name or is a child after the title
  // Find the grid/layout frame that contains the Detail cards
  let gridNode: FigmaNodeRaw | undefined;
  if (sectionNode.children) {
    // Look for a child frame that contains multiple "Details" children
    for (const child of sectionNode.children) {
      if ((child.type === 'FRAME' || child.type === 'GROUP') && child.children) {
        const hasDetails = child.children.some(
          (c: FigmaNodeRaw) => c.name === 'Details'
        );
        if (hasDetails) {
          gridNode = child;
          break;
        }
      }
    }
  }

  // Process the Details cards within the grid
  const cardsToProcess = gridNode?.children || sectionNode.children || [];
  for (const card of cardsToProcess) {
    // Only process Details cards (or frames that look like cards)
    if (card.name === 'Details' || (card.type === 'FRAME' && card.children)) {
      const cardTexts = getTextContent(card)
        .map(t => t.trim())
        .filter(t => t && t !== 'Diagram area'); // skip placeholder text

      if (cardTexts.length < 2) continue;

      // First text is the label (Do/Don't), rest is the description
      const label = cardTexts[0];
      const description = cardTexts.slice(1).join(' ');

      if (label === 'Do') {
        dos.push(description);
      } else if (label === "Don't") {
        donts.push(description);
      }
    }
  }

  return {
    kind: 'how-to-use',
    nodeId: sectionNode.id,
    title,
    dos: [...new Set(dos)], // deduplicate
    donts: [...new Set(donts)],
  };
}

// --- Bullet List Parsing ---

function extractBulletListSection(sectionNode: FigmaNodeRaw): DocSection {
  const title = extractHeadingText(sectionNode) || 'List';
  const items: string[] = [];

  // Collect all text content and split by newlines
  const allTexts = getTextContent(sectionNode)
    .map(t => t.trim())
    .filter(t => t && t !== title);

  // Join all text and split by newlines to get individual items
  const fullText = allTexts.join('\n');
  const splitItems = fullText
    .split('\n')
    .map(line => line.replace(/^[•\-*]\s*/, '').trim()) // strip bullet glyphs
    .filter(line => line && line !== title);

  items.push(...splitItems);

  return {
    kind: 'bullet-list',
    nodeId: sectionNode.id,
    title,
    items: [...new Set(items)], // deduplicate
  };
}

// --- Section Classification and Parsing ---

function classifyAndParseSection(sectionNode: FigmaNodeRaw): DocSection {
  try {
    // 1. Check for table structure
    const tableFrame = sectionNode.children?.find(
      (c: FigmaNodeRaw) => c.name === 'Table'
    );
    if (tableFrame) {
      return extractTableSection(sectionNode);
    }

    // Fallback table detection: first child is rows of pure TEXT siblings followed by rows mixing text/icon children
    const firstChild = sectionNode.children?.[0];
    const secondChild = sectionNode.children?.[1];
    if (
      firstChild &&
      secondChild &&
      firstChild.type === 'FRAME' &&
      secondChild.type === 'FRAME'
    ) {
      const firstChildTexts = firstChild.children?.every(
        (c: FigmaNodeRaw) => c.type === 'TEXT'
      );
      const secondChildHasMixed = secondChild.children?.some(
        (c: FigmaNodeRaw) => c.type !== 'TEXT'
      );
      if (firstChildTexts && secondChildHasMixed) {
        return extractTableSection(sectionNode);
      }
    }

    // 2. Check for anatomy structure (numbered list pattern)
    const detailsNode = sectionNode.children?.find((c: FigmaNodeRaw) =>
      c.name?.includes('Details')
    );
    if (detailsNode) {
      const hasNumberedItems = detailsNode.children?.some((c: FigmaNodeRaw) =>
        c.children?.some(
          (cc: FigmaNodeRaw) =>
            cc.type === 'TEXT' &&
            cc.characters &&
            /^\d+\.?$/.test(cc.characters.trim())
        )
      );
      if (hasNumberedItems) {
        return extractAnatomySection(sectionNode);
      }
    }

    // 3. Check for how-to-use (Do/Don't cards)
    const allTexts = getTextContent(sectionNode);
    const hasDoOrDont = allTexts.some(t => t.trim() === 'Do' || t.trim() === "Don't");
    if (hasDoOrDont) {
      return extractHowToUseSection(sectionNode);
    }

    // 4. Check for bullet-list (flat TEXT children with no nested structure)
    const hasOnlyTextChildren = sectionNode.children?.every(
      (c: FigmaNodeRaw) =>
        c.type === 'TEXT' ||
        (c.type === 'FRAME' &&
          c.children?.every((cc: FigmaNodeRaw) => cc.type === 'TEXT'))
    );
    if (hasOnlyTextChildren && (sectionNode.children?.length ?? 0) > 1) {
      return extractBulletListSection(sectionNode);
    }

    // 5. Fallback to unknown
    const title = extractHeadingText(sectionNode);
    return {
      kind: 'unknown',
      nodeId: sectionNode.id,
      layerName: sectionNode.name,
      title,
      rawTextContent: getTextContent(sectionNode),
    };
  } catch (err) {
    console.warn(
      `⚠️ Error classifying section "${sectionNode.name}":`,
      err instanceof Error ? err.message : String(err)
    );
    const title = extractHeadingText(sectionNode);
    return {
      kind: 'unknown',
      nodeId: sectionNode.id,
      layerName: sectionNode.name,
      title,
      rawTextContent: getTextContent(sectionNode),
    };
  }
}

// --- Hero Parsing ---

function parseHero(heroNode: FigmaNodeRaw): HeroSection {
  const statusNode = heroNode.children?.find(
    (c: FigmaNodeRaw) => c.name === 'Hero Status'
  );
  const whatItDoesNode = heroNode.children?.find(
    (c: FigmaNodeRaw) => c.name === 'What it does'
  );

  const statusLabel = statusNode
    ? getTextContent(statusNode)
        .map(t => t.trim())
        .join(' ')
    : '';

  let heading = '';
  let description = '';

  if (whatItDoesNode?.children) {
    // Find heading (first TEXT child)
    const headingNode = whatItDoesNode.children.find(
      (c: FigmaNodeRaw) => c.type === 'TEXT'
    );
    if (headingNode && headingNode.characters) {
      heading = headingNode.characters.trim();
    }

    // Find description (text in Details sibling)
    const detailsNode = whatItDoesNode.children.find(
      (c: FigmaNodeRaw) => c.name === 'Details'
    );
    if (detailsNode) {
      const descTexts = getTextContent(detailsNode)
        .map(t => t.trim())
        .filter(t => t);
      description = descTexts.join(' ');
    }
  }

  return { statusLabel, heading, description };
}

// --- Main Frame Parser ---

export function parseFrame(frameNode: FigmaNodeRaw, sourceUrl: string, fileKey: string): ComponentMetadataDoc {
  // The Hero frame might be a direct child, or we might be looking at a frame that contains Hero
  const heroFrameNode =
    frameNode.children?.find((c: FigmaNodeRaw) => c.name === 'Hero') ||
    frameNode.children?.[0] ||
    frameNode;

  const hero = parseHero(heroFrameNode);

  const componentName = hero.statusLabel
    ? hero.statusLabel.split('·')[0].trim()
    : frameNode.name;

  // The sections are children of the Hero frame (after "What it does" frame)
  const sections: DocSection[] = [];
  if (heroFrameNode.children) {
    // Skip the first 2 children: "Hero Status" and "What it does"
    const startIndex = heroFrameNode.children.findIndex(
      (c: FigmaNodeRaw) => c.name === 'What it does'
    );
    const sectionStartIndex = startIndex >= 0 ? startIndex + 1 : 2;

    for (let i = sectionStartIndex; i < heroFrameNode.children.length; i++) {
      const child = heroFrameNode.children[i];

      // Skip dividers
      if (child.name === 'Divider' && (!child.children || child.children.length === 0)) {
        continue;
      }

      // Skip dividers even if they have decorative children
      if (
        child.name === 'Divider' &&
        child.children?.every((c: FigmaNodeRaw) => c.type !== 'TEXT')
      ) {
        continue;
      }

      const section = classifyAndParseSection(child);
      sections.push(section);
    }
  }

  return {
    componentName,
    sourceUrl,
    fileKey,
    nodeId: frameNode.id,
    fetchedAt: new Date().toISOString(),
    hero,
    sections,
  };
}

// --- Self-check ---

export function selfCheck(): void {
  console.log('Running self-checks...');

  // Test 1: parseFigmaUrl()
  const urlResult = parseFigmaUrl(
    'https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3840-907&m=dev'
  );
  assert.strictEqual(urlResult.fileKey, 'hvRmnZZOZrmTW0wf8hbrt5');
  assert.strictEqual(urlResult.nodeId, '3840:907');
  console.log('✓ parseFigmaUrl() works');

  // Test 2: extractCellsByPosition() with x-position bucketing
  const fakeHeader: FigmaNodeRaw = {
    id: 'header',
    name: 'Header',
    type: 'FRAME',
    children: [
      {
        id: 'col1',
        name: 'Col1',
        type: 'TEXT',
        characters: 'Property',
        absoluteBoundingBox: { x: 0, y: 0, width: 100, height: 20 },
      },
      {
        id: 'col2',
        name: 'Col2',
        type: 'TEXT',
        characters: 'Type',
        absoluteBoundingBox: { x: 110, y: 0, width: 100, height: 20 },
      },
      {
        id: 'col3',
        name: 'Col3',
        type: 'TEXT',
        characters: 'Default',
        absoluteBoundingBox: { x: 220, y: 0, width: 100, height: 20 },
      },
      {
        id: 'col4',
        name: 'Col4',
        type: 'TEXT',
        characters: 'Description',
        absoluteBoundingBox: { x: 330, y: 0, width: 100, height: 20 },
      },
    ],
  };

  const headerCells = extractCellsByPosition(fakeHeader);
  assert.strictEqual(headerCells.length, 4);
  assert.strictEqual(headerCells[0].value, 'Property');
  console.log('✓ extractCellsByPosition() works for headers');

  // Test 3: containsCheckmarkDescendant()
  const fakeCheckmark: FigmaNodeRaw = {
    id: 'icon',
    name: 'Icon',
    type: 'FRAME',
    children: [
      {
        id: 'check',
        name: 'Verified',
        type: 'VECTOR',
      },
    ],
  };
  assert.strictEqual(containsCheckmarkDescendant(fakeCheckmark), true);
  console.log('✓ containsCheckmarkDescendant() works');

  // Test 4: Simple table classification
  const fakeTableSection: FigmaNodeRaw = {
    id: 'section',
    name: 'Property Breakdown',
    type: 'FRAME',
    children: [
      {
        id: 'heading',
        name: 'Heading',
        type: 'TEXT',
        characters: 'Property breakdown',
      },
      {
        id: 'table',
        name: 'Table',
        type: 'FRAME',
        children: [fakeHeader, { id: 'row1', name: 'Row', type: 'FRAME', children: [] }],
      },
    ],
  };
  const classified = classifyAndParseSection(fakeTableSection);
  assert.strictEqual(classified.kind, 'table');
  console.log('✓ classifyAndParseSection() detects tables');

  // Test 5: Bullet-list classification
  const fakeBulletSection: FigmaNodeRaw = {
    id: 'section',
    name: 'Accessibility',
    type: 'FRAME',
    children: [
      {
        id: 'heading',
        name: 'Heading',
        type: 'TEXT',
        characters: 'Accessibility and content guidelines',
      },
      {
        id: 'item1',
        name: 'Item1',
        type: 'TEXT',
        characters: '• First item',
      },
      {
        id: 'item2',
        name: 'Item2',
        type: 'TEXT',
        characters: '• Second item',
      },
    ],
  };
  const bulletClassified = classifyAndParseSection(fakeBulletSection);
  assert.strictEqual(bulletClassified.kind, 'bullet-list');
  console.log('✓ classifyAndParseSection() detects bullet lists');

  // Test 6: Unknown fallback
  const fakeUnknown: FigmaNodeRaw = {
    id: 'unknown',
    name: 'SomeWeirdThing',
    type: 'FRAME',
    children: [
      {
        id: 'text',
        name: 'Text',
        type: 'TEXT',
        characters: 'Some content',
      },
    ],
  };
  const unknownClassified = classifyAndParseSection(fakeUnknown);
  assert.strictEqual(unknownClassified.kind, 'unknown');
  assert.strictEqual(unknownClassified.rawTextContent.length > 0, true);
  console.log('✓ classifyAndParseSection() falls back to unknown');

  console.log('✓✓✓ All self-checks passed! ✓✓✓');
  process.exit(0);
}

// Entry point for self-check via tsx
if (process.argv[2] === '--selfcheck') {
  selfCheck();
}
