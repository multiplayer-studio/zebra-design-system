// read-metadata.js — read-only. Run with use_figma.
// Parses a "<Component> Metadata" frame built from the Button Metadata template into
// sections → tables (columns + rows) and prose blocks, preserving the authored text verbatim.
// Replace INPUT before running.
const INPUT = {
  frameId: "__METADATA_FRAME_ID__",
  headingLayerName: "Component Name" // the template's section-heading text layer
};

const root = await figma.getNodeByIdAsync(INPUT.frameId);
if (!root) return { error: "Node " + INPUT.frameId + " not found" };
let page = root;
while (page && page.type !== "PAGE") page = page.parent;
if (page) await figma.setCurrentPageAsync(page);

const absY = (n) => n.absoluteTransform[1][2];
const absX = (n) => n.absoluteTransform[0][2];
const byReading = (a, b) => (Math.abs(absY(a) - absY(b)) > 4 ? absY(a) - absY(b) : absX(a) - absX(b));
const visibleChain = (n) => { let x = n; while (x && x !== root) { if (x.visible === false) return false; x = x.parent; } return true; };

// Text of a cell: all visible text descendants in reading order; icon-only cells report the instance name.
function cellText(n) {
  if (n.type === "TEXT") return n.characters.trim();
  if (!("findAllWithCriteria" in n)) return "";
  const texts = n.findAllWithCriteria({ types: ["TEXT"] }).filter(visibleChain).sort(byReading);
  if (texts.length) return texts.map((t) => t.characters.trim()).filter(Boolean).join("\n");
  const inst = n.type === "INSTANCE" ? [n] : n.findAllWithCriteria({ types: ["INSTANCE"] }).filter(visibleChain);
  return inst.length ? "[icon: " + inst[0].name + "]" : "";
}

function parseTable(table) {
  const kids = table.children.filter((c) => c.visible !== false);
  const header = kids.find((c) => /header/i.test(c.name)) || kids[0];
  const hCells = ("children" in header ? header.children.filter((c) => c.visible !== false) : []).sort((a, b) => absX(a) - absX(b));
  const columns = hCells.map(cellText);
  const colX = hCells.map(absX);
  const rows = [];
  for (const row of kids) {
    if (row === header || !("children" in row)) continue;
    const cells = row.children.filter((c) => c.visible !== false).sort((a, b) => absX(a) - absX(b));
    const obj = {};
    cells.forEach((c, i) => {
      let col = i;
      if (cells.length !== hCells.length && colX.length) {
        // map by nearest header x when counts differ
        let best = 0, bestD = Infinity;
        colX.forEach((x, j) => { const d = Math.abs(absX(c) - x); if (d < bestD) { bestD = d; best = j; } });
        col = best;
      }
      const key = columns[col] || "col" + col;
      const val = cellText(c);
      obj[key] = obj[key] ? obj[key] + "\n" + val : val;
    });
    if (!Object.values(obj).some((v) => v)) continue;
    // Continuation rows (e.g. the "false" row under "Show Close") leave the first column empty:
    // inherit it from the row above so every row is self-describing.
    const first = columns[0];
    if (first && !obj[first] && rows.length) { obj[first] = rows[rows.length - 1][first]; obj._continuation = true; }
    rows.push(obj);
  }
  return { columns, rows };
}

// Sections = frames that directly contain the heading text layer.
const headings = root.findAllWithCriteria({ types: ["TEXT"] })
  .filter((t) => t.name === INPUT.headingLayerName && visibleChain(t));
let sectionFrames = headings.map((h) => ({ frame: h.parent, heading: h }));
if (!sectionFrames.length) {
  // Fallback for frames not built from the template: each child frame's first text is its heading.
  const container = root.children.length === 1 && "children" in root.children[0] ? root.children[0] : root;
  sectionFrames = container.children
    .filter((c) => "children" in c && c.visible !== false)
    .map((f) => ({ frame: f, heading: f.findAllWithCriteria({ types: ["TEXT"] }).sort(byReading)[0] }))
    .filter((s) => s.heading);
}
sectionFrames.sort((a, b) => byReading(a.frame, b.frame));

const sections = sectionFrames.map(({ frame, heading }) => {
  const tables = frame.findAllWithCriteria({ types: ["FRAME"] })
    .filter((f) => /^table$/i.test(f.name.trim()) && visibleChain(f))
    .map(parseTable);
  const inTable = (t) => { let x = t.parent; while (x && x !== frame) { if (/^table$/i.test(x.name.trim())) return true; x = x.parent; } return false; };
  // Prose, grouped by parent layer so a card's label stays with its text (e.g. "Do" + guidance).
  const texts = frame.findAllWithCriteria({ types: ["TEXT"] })
    .filter((t) => t !== heading && visibleChain(t) && !inTable(t) && t.characters.trim())
    .sort(byReading);
  const groups = new Map();
  for (const t of texts) {
    if (!groups.has(t.parent.id)) groups.set(t.parent.id, { group: t.parent.name, texts: [] });
    groups.get(t.parent.id).texts.push(t.characters.trim());
  }
  const blocks = Array.from(groups.values());
  const out = { title: heading.characters.trim(), frame: frame.name };
  if (tables.length) out.tables = tables;
  if (blocks.length) out.blocks = blocks;
  return out;
});

// Header-level text outside any section (e.g. "AVATAR · COMPONENT METADATA")
const sectionSet = new Set(sectionFrames.map((s) => s.frame.id));
const inSection = (t) => { let x = t.parent; while (x && x !== root) { if (sectionSet.has(x.id)) return true; x = x.parent; } return false; };
const header = root.findAllWithCriteria({ types: ["TEXT"] })
  .filter((t) => visibleChain(t) && !inSection(t))
  .sort(byReading).map((t) => t.characters.trim()).filter(Boolean);

return { frame: root.name, header, sections };
