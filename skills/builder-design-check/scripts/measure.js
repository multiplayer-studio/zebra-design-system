/* Measure the parts of a page, for the parity check (SOURCE-PARITY.md, 2,
 * and builder-design-check, which keeps an identical copy).
 *
 * Evaluate this whole file in the page. It returns
 *   { width, height, order: [name…], parts: { name: { …values } } }
 *
 * Which parts are measured:
 * - every element with data-parity="<name>". On a custom element whose look
 *   is drawn inside it, add data-parity-inner="<selector>" to measure that
 *   inner element instead of the host;
 * - or, for a page you can't mark (the source, running at an address), set
 *   window.__parityMap = { name: "css selector" } before evaluating. Use
 *   " >>> " in a selector to step into a shadow root: "my-button >>> button".
 *
 * parity.mjs runs this for you when a browser is available.
 */
(() => {
  const pick = (root, selector) => {
    let node = root;
    const steps = selector.split(">>>").map((s) => s.trim());
    for (let i = 0; i < steps.length; i += 1) {
      const scope = i === 0 ? node : node && node.shadowRoot;
      node = scope ? scope.querySelector(steps[i]) : null;
      if (!node) return null;
    }
    return node;
  };

  const found = [];
  const map = window.__parityMap;
  if (map && typeof map === "object") {
    for (const [name, selector] of Object.entries(map)) {
      const el = pick(document, selector);
      found.push({ name, el, host: el });
    }
  } else {
    for (const host of document.querySelectorAll("[data-parity]")) {
      const inner = host.getAttribute("data-parity-inner");
      const el = inner && host.shadowRoot ? pick(host.shadowRoot, inner) || host : host;
      found.push({ name: host.getAttribute("data-parity"), el, host });
    }
  }

  const px = (v) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? Math.round(n * 10) / 10 : v;
  };
  const hostOf = new Map(found.filter((f) => f.host).map((f) => [f.host, f.name]));
  const parentPart = (node) => {
    let p = node.parentNode || node.host;
    while (p) {
      if (hostOf.has(p)) return hostOf.get(p);
      p = p.parentNode || p.host;
    }
    return null;
  };

  const parts = {};
  const order = [];
  const placed = [];
  for (const { name, el, host } of found) {
    if (!el) { parts[name] = { missing: true }; continue; }
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const lineHeight = cs.lineHeight === "normal" ? "normal" : px(cs.lineHeight);
    const hasPartInside = found.some((f) => f.host && f.host !== host && host.contains(f.host));
    const part = {
      parent: parentPart(host),
      x: px(r.left + window.scrollX),
      y: px(r.top + window.scrollY),
      width: px(r.width),
      height: px(r.height),
      display: cs.display,
      paddingTop: px(cs.paddingTop),
      paddingRight: px(cs.paddingRight),
      paddingBottom: px(cs.paddingBottom),
      paddingLeft: px(cs.paddingLeft),
      rowGap: cs.rowGap === "normal" ? 0 : px(cs.rowGap),
      columnGap: cs.columnGap === "normal" ? 0 : px(cs.columnGap),
      fontFamily: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
      fontSize: px(cs.fontSize),
      lineHeight,
      fontWeight: px(cs.fontWeight),
      letterSpacing: cs.letterSpacing === "normal" ? 0 : px(cs.letterSpacing),
      textAlign: cs.textAlign,
      textTransform: cs.textTransform,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      backgroundImage: cs.backgroundImage,
      borderTopWidth: px(cs.borderTopWidth),
      borderRightWidth: px(cs.borderRightWidth),
      borderBottomWidth: px(cs.borderBottomWidth),
      borderLeftWidth: px(cs.borderLeftWidth),
      borderColor: cs.borderTopColor,
      borderStyle: cs.borderTopStyle,
      radiusTopLeft: px(cs.borderTopLeftRadius),
      radiusTopRight: px(cs.borderTopRightRadius),
      radiusBottomRight: px(cs.borderBottomRightRadius),
      radiusBottomLeft: px(cs.borderBottomLeftRadius),
      boxShadow: cs.boxShadow,
      opacity: px(cs.opacity),
    };
    if (!hasPartInside) part.text = (host.innerText || host.textContent || "").replace(/\s+/g, " ").trim().slice(0, 200);
    parts[name] = part;
    placed.push({ name, host });
  }
  placed.sort((a, b) => (a.host.compareDocumentPosition(b.host) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  for (const p of placed) order.push(p.name);

  return {
    width: window.innerWidth,
    height: document.documentElement.scrollHeight,
    order,
    parts,
  };
})()
