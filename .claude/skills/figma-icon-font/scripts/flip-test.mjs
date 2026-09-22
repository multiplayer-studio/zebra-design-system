import { SVGIcons2SVGFontStream } from "svgicons2svgfont";
import svg2ttf from "svg2ttf";
import svgpath from "svgpath";
import { Readable } from "node:stream";

const EM = 1000;
// A bar across the TOP of a 24x24 icon (SVG is Y-down, so y = 0..6 is the top).
const SRC = "M0 0 H24 V6 H0 Z";

const build = (d) => new Promise((res, rej) => {
  const chunks = [];
  const s = new SVGIcons2SVGFontStream({ fontName: "T", fontHeight: EM, normalize: false, descent: 0, log: () => {} });
  s.on("data", (c) => chunks.push(Buffer.from(c)));
  s.on("end", () => res(Buffer.concat(chunks).toString("utf8")));
  s.on("error", rej);
  const g = Readable.from([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${EM} ${EM}"><path d="${d}"/></svg>`]);
  g.metadata = { unicode: [""], name: "t" };
  s.write(g); s.end();
});

function glyphBBox(ttfBuf) {
  const b = ttfBuf;
  const num = b.readUInt16BE(4); const t = {}; let off = 12;
  for (let i = 0; i < num; i++) { t[b.toString("ascii", off, off + 4)] = { off: b.readUInt32BE(off + 8), len: b.readUInt32BE(off + 12) }; off += 16; }
  const head = t.head.off;
  const indexToLoc = b.readInt16BE(head + 50);
  const numGlyphs = b.readUInt16BE(t.maxp.off + 4);
  const loca = t.loca.off;
  const out = [];
  for (let i = 0; i < numGlyphs; i++) {
    const s = indexToLoc ? b.readUInt32BE(loca + i * 4) : b.readUInt16BE(loca + i * 2) * 2;
    const e = indexToLoc ? b.readUInt32BE(loca + (i + 1) * 4) : b.readUInt16BE(loca + (i + 1) * 2) * 2;
    if (e <= s) continue;
    const g = t.glyf.off + s;
    out.push({ i, yMin: b.readInt16BE(g + 6), yMax: b.readInt16BE(g + 10) });
  }
  return out;
}

const k = EM / 24;
for (const [label, d] of [
  ["CURRENT  scale(k,-k).translate(0,EM)", svgpath(SRC).scale(k, -k).translate(0, EM).abs().round(2).toString()],
  ["PROPOSED scale(k) only            ", svgpath(SRC).scale(k).abs().round(2).toString()],
]) {
  const ttf = Buffer.from(svg2ttf(await build(d), {}).buffer);
  const boxes = glyphBBox(ttf).filter((g) => g.yMax !== g.yMin);
  console.log(`${label} -> glyph yMin=${boxes[0]?.yMin} yMax=${boxes[0]?.yMax}`);
}
console.log(`\nA top bar (SVG y 0..6 of 24) must land HIGH in the font: expect yMin~750 yMax~1000.`);
