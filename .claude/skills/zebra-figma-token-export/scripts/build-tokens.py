#!/usr/bin/env python3
"""build-tokens.py — turn the compact dump from dump-variables.js into the tokens/ folder.

Runs locally; reads <root>/_dump/*.json and writes:

    <root>/base/<collection>/<mode>.json          every variable, one file per mode
    <root>/extensions/<ext>/<parent>/<mode>.json  ONLY that extension's overrides
    <root>/extensions/<ext>/manifest.json
    <root>/manifest.json

Usage: python3 build-tokens.py [tokens-root] [--keep-dump]
"""
import json, os, sys, html, glob, datetime, collections

ROOT = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("-") else "tokens"
DUMP = os.path.join(ROOT, "_dump")

DIM_SCOPES = {"GAP","WIDTH_HEIGHT","CORNER_RADIUS","STROKE_FLOAT","FONT_SIZE","LINE_HEIGHT",
              "LETTER_SPACING","PARAGRAPH_SPACING","PARAGRAPH_INDENT","EFFECT_FLOAT"}
# Primitive collections often carry no scopes at all, so fall back to the name.
PX_PATTERNS = ("fontsize","lineheight","letterspacing","space","control","radius","stroke",
               "scale","container","size","width","height")

def flat(s): return "".join(ch for ch in s.lower() if ch.isalnum())
def slug(s): return s.strip().lower().replace("/", "-").replace(" ", "-")

def token_type(v):
    scopes = set(v.get("s") or [])
    n = flat(v["n"])
    t = v["t"]
    if t == "COLOR":   return "color"
    if t == "BOOLEAN": return "boolean"
    if t == "STRING":
        if "FONT_FAMILY" in scopes or "fontfamily" in n: return "fontFamily"
        if "fontweight" in n: return "fontWeight"
        return "string"
    if "FONT_WEIGHT" in scopes or "fontweight" in n: return "fontWeight"
    if "OPACITY" in scopes or "opacity" in n: return "number"
    if scopes & DIM_SCOPES: return "dimension"
    if any(p in n for p in PX_PATTERNS): return "dimension"
    return "number"

def fmt(raw, ttype):
    if isinstance(raw, (int, float)) and not isinstance(raw, bool):
        r = round(raw, 3)
        r = int(r) if r == int(r) else r
        return f"{r}px" if ttype == "dimension" else r
    return raw

def set_deep(tree, path, leaf, collisions):
    node = tree
    for k in path[:-1]:
        if k in node and "$value" in node[k]:
            collisions.append("/".join(path)); node[k] = {"$root": node[k]}
        node = node.setdefault(k, {})
    last = path[-1]
    if last in node and "$value" not in node[last] and node[last]:
        node[last]["$root"] = leaf; collisions.append("/".join(path))
    else:
        node[last] = leaf

def write_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

# ---------- load ----------
with open(os.path.join(DUMP, "collections.json")) as f:
    collections_raw = json.load(f)["collections"]

by_id = {c["id"]: c for c in collections_raw}

variables, dupes = {}, 0
for path in sorted(glob.glob(os.path.join(DUMP, "vars-*.json"))):
    with open(path) as f:
        for v in json.load(f):
            if v["i"] in variables: dupes += 1
            else: variables[v["i"]] = v

warnings = []

# Every variable belongs to a base collection; an extension only overrides them.
def ref(var_id):
    v = variables.get(var_id)
    if not v:
        warnings.append(f"Alias target {var_id} was not in the dump")
        return "{unresolved:" + var_id + "}"
    cname = by_id[v["c"]]["name"] if v["c"] in by_id else "unknown"
    return "{" + cname + "." + v["n"].replace("/", ".") + "}"

def value_of(raw, ttype):
    if isinstance(raw, dict) and "a" in raw: return ref(raw["a"])
    return fmt(raw, ttype)

# ---------- base collections ----------
manifest_cols, manifest_exts = [], []
counts = collections.Counter()
files_written = []

for c in collections_raw:
    if c.get("isExtension"): continue
    members = [v for v in variables.values() if v["c"] == c["id"]]
    if not members:
        warnings.append(f"Collection '{c['name']}' has no variables in the dump; no files written")
        continue
    if len(members) != c["count"]:
        warnings.append(f"Collection '{c['name']}': dump holds {len(members)} of {c['count']} declared variables")
    cslug, entry_files = slug(c["name"]), []
    for mode in c["modes"]:
        tree, collisions, n = {}, [], 0
        for v in sorted(members, key=lambda x: x["n"]):
            vals = v["v"]
            raw = vals.get("*", vals.get(mode["id"], "__none__"))
            if raw == "__none__":
                warnings.append(f"{c['name']}.{v['n']} has no value in mode {mode['name']}")
                continue
            ttype = token_type(v)
            ext = {"id": v["i"], "collection": c["name"], "mode": mode["name"],
                   "resolvedType": v["t"], "scopes": v.get("s", [])}
            if v.get("x"): ext["codeSyntax"] = v["x"]
            if v.get("h"): ext["hiddenFromPublishing"] = True
            if isinstance(raw, dict) and "a" in raw: ext["aliasOf"] = raw["a"]
            if isinstance(raw, dict) and "o" in raw: ext["aliasOpacity"] = raw["o"]
            leaf = {"$type": ttype, "$value": value_of(raw, ttype)}
            if v.get("d"): leaf["$description"] = html.unescape(v["d"])
            leaf["$extensions"] = {"com.figma": ext}
            set_deep(tree, v["n"].split("/"), leaf, collisions)
            n += 1
        rel = f"base/{cslug}/{slug(mode['name'])}.json"
        write_json(os.path.join(ROOT, rel), tree)
        entry_files.append(rel); files_written.append(rel); counts["tokens"] += n
        if collisions: warnings.append(f"{c['name']}/{mode['name']} name collisions: {sorted(set(collisions))}")
    manifest_cols.append({"name": c["name"], "slug": cslug, "id": c["id"],
                          "modes": [m["name"] for m in c["modes"]],
                          "defaultMode": next(m["name"] for m in c["modes"] if m["id"] == c["defaultModeId"]),
                          "variableCount": len(members), "isExtension": False,
                          "hiddenFromPublishing": bool(c.get("hidden")), "files": entry_files})

# ---------- extensions: overrides only ----------
for c in collections_raw:
    if not c.get("isExtension"): continue
    parent = by_id.get(c["parentId"], {})
    overrides = c.get("overrides") or {}
    if not overrides:
        warnings.append(f"Extension '{c['name']}' overrides nothing; no files written")
        continue
    eslug, pslug = slug(c["name"]), slug(parent.get("name", "unknown"))
    entry_files, mode_map = [], []
    for mode in c["modes"]:
        pm = next((m["name"] for m in parent.get("modes", []) if m["id"] == mode.get("parent")), None)
        mode_map.append({"mode": mode["name"], "parentMode": pm})
        tree, collisions, n = {}, [], 0
        for var_id in sorted(overrides):
            if mode["id"] not in overrides[var_id]:
                continue  # inherited unchanged in this mode — deliberately absent
            v = variables.get(var_id)
            if not v:
                warnings.append(f"Extension '{c['name']}' overrides {var_id}, which is not in the dump")
                continue
            raw = overrides[var_id][mode["id"]]
            ttype = token_type(v)
            ext = {"id": v["i"],
                   "overrides": (by_id[v["c"]]["name"] if v["c"] in by_id else "unknown") + "." + v["n"].replace("/", "."),
                   "extension": c["name"], "mode": mode["name"], "resolvedType": v["t"],
                   "scopes": v.get("s", [])}
            if pm: ext["parentMode"] = pm
            if v.get("x"): ext["codeSyntax"] = v["x"]
            if isinstance(raw, dict) and "a" in raw: ext["aliasOf"] = raw["a"]
            if isinstance(raw, dict) and "o" in raw: ext["aliasOpacity"] = raw["o"]
            leaf = {"$type": ttype, "$value": value_of(raw, ttype)}
            if v.get("d"): leaf["$description"] = html.unescape(v["d"])
            leaf["$extensions"] = {"com.figma": ext}
            set_deep(tree, v["n"].split("/"), leaf, collisions)
            n += 1
        if not n:
            warnings.append(f"Extension '{c['name']}' mode '{mode['name']}' overrides nothing; no file written")
            continue
        rel = f"extensions/{eslug}/{pslug}/{slug(mode['name'])}.json"
        write_json(os.path.join(ROOT, rel), tree)
        entry_files.append(rel); files_written.append(rel); counts["overrides"] += n
        if collisions: warnings.append(f"{c['name']}/{mode['name']} name collisions: {sorted(set(collisions))}")
    ext_manifest = {"name": c["name"], "slug": eslug, "id": c["id"],
                    "extends": {"name": parent.get("name"), "id": c["parentId"], "slug": pslug},
                    "root": {"name": by_id.get(c["rootId"], {}).get("name"), "id": c["rootId"]},
                    "overrideCount": len(overrides), "modeMap": mode_map, "files": entry_files,
                    "note": "Each file holds ONLY the variables this extension overrides. Read the parent collection first, then layer this on top."}
    manifest_exts.append(ext_manifest)

# One manifest per extension folder. Two extensions can share a name while
# extending different parents (target over primitives and over palette); they
# share the folder, so the manifest lists every parent rather than letting the
# last one built overwrite the others.
by_slug = collections.OrderedDict()
for e in manifest_exts: by_slug.setdefault(e["slug"], []).append(e)
for eslug, group in by_slug.items():
    rel = f"extensions/{eslug}/manifest.json"
    if len(group) == 1:
        body = group[0]
    else:
        body = {"name": group[0]["name"], "slug": eslug,
                "note": "Several extensions share this name, each extending a different parent. Each entry under 'extends' holds ONLY the variables it overrides; read its parent first, then layer it on top.",
                "extends": sorted(group, key=lambda e: e["extends"]["name"] or "")}
    write_json(os.path.join(ROOT, rel), body); files_written.append(rel)

# ---------- text styles + fonts ----------
# From dump-text-styles.js. Each style becomes one DTCG typography token whose five parts alias the variables
# the style binds, so a style never carries a second copy of a value. An unbound part keeps Figma's literal and
# is reported. fonts.json lists every family and weight the export needs, for fetch-fonts.mjs.
WEIGHT = {"thin": 100, "extralight": 200, "light": 300, "regular": 400, "normal": 400, "medium": 500,
          "semibold": 600, "bold": 700, "extrabold": 800, "black": 900}
PARTS = {"fontFamily": "fontFamily", "fontStyle": "fontWeight", "fontSize": "fontSize",
         "lineHeight": "lineHeight", "letterSpacing": "letterSpacing"}

def literal_part(s, figma_key):
    if figma_key == "fontFamily": return s["fontFamily"]
    if figma_key == "fontStyle": return flat(s["fontStyle"]).replace("italic", "") or "regular"
    if figma_key == "fontSize": return fmt(s["fontSize"], "dimension")
    u = s[figma_key]
    if u["unit"] == "PIXELS": return fmt(u["value"], "dimension")
    if u["unit"] == "PERCENT":
        return round(u["value"] / 100, 4) if figma_key == "lineHeight" else f"{round(u['value'] / 100, 4)}em"
    return "normal"  # AUTO line height

def resolve_literal(var_id, seen=()):
    """Follow an alias chain to its literal in each collection's default mode."""
    v = variables.get(var_id)
    if not v or var_id in seen: return None
    c = by_id.get(v["c"], {})
    default = c.get("defaultModeId")
    raw = v["v"].get("*", v["v"].get(default))
    if isinstance(raw, dict) and "a" in raw: return resolve_literal(raw["a"], seen + (var_id,))
    return raw

text_styles_path = os.path.join(DUMP, "text-styles.json")
text_styles_entry = None
if os.path.exists(text_styles_path):
    raw_styles = json.load(open(text_styles_path))
    raw_styles = raw_styles["styles"] if isinstance(raw_styles, dict) else raw_styles
    tree, collisions, unbound = {}, [], []
    fams = collections.OrderedDict()  # family -> {"weights": set, "styles": set, "byStyles": bool, "tokens": set}
    def fam(name): return fams.setdefault(name, {"weights": set(), "styles": set(), "byStyles": False, "tokens": set()})
    for s in sorted(raw_styles, key=lambda x: x["name"]):
        value, missing = {}, []
        for fk, dk in PARTS.items():
            vid = s.get("bound", {}).get(fk)
            if vid and vid in variables: value[dk] = ref(vid)
            else: value[dk] = literal_part(s, fk); missing.append(dk)
        if missing: unbound.append(f"{s['name']}: {', '.join(missing)}")
        f = fam(s["fontFamily"]); f["byStyles"] = True; f["styles"].add(s["fontStyle"])
        w = WEIGHT.get(flat(s["fontStyle"]).replace("italic", ""))
        if w: f["weights"].add(w)
        ext = {"id": s["id"], "key": s.get("key"), "textCase": s.get("textCase"), "textDecoration": s.get("textDecoration"),
               "leadingTrim": s.get("leadingTrim"), "paragraphSpacing": s.get("paragraphSpacing"),
               "paragraphIndent": s.get("paragraphIndent"), "fontStyle": s["fontStyle"]}
        if missing: ext["unbound"] = missing
        leaf = {"$type": "typography", "$value": value}
        if s.get("description"): leaf["$description"] = html.unescape(s["description"])
        leaf["$extensions"] = {"com.figma": {k: v for k, v in ext.items() if v not in (None, "")}}
        set_deep(tree, s["name"].split("/"), leaf, collisions)
    # Every family and weight token, whether or not a style uses it: a component may bind one directly.
    for v in variables.values():
        tt = token_type(v)
        if tt not in ("fontFamily", "fontWeight"): continue
        lit = resolve_literal(v["i"])
        if lit is None: continue
        if tt == "fontFamily": fam(str(lit))["tokens"].add((by_id.get(v["c"], {}).get("name", "?") + "." + v["n"].replace("/", ".")))
    all_weights = sorted({WEIGHT[flat(str(resolve_literal(v["i"]) or ""))] for v in variables.values()
                          if token_type(v) == "fontWeight" and flat(str(resolve_literal(v["i"]) or "")) in WEIGHT})
    rel = "base/text-styles.json"
    write_json(os.path.join(ROOT, rel), tree); files_written.append(rel)
    fonts = {"note": "Every font family the tokens name, and the weights the type ramp needs. fetch-fonts.mjs downloads "
                     "the families it can into fonts/; a family it cannot fetch must be self-hosted by hand.",
             "families": [{"family": n, "usedByTextStyles": d["byStyles"], "figmaStyles": sorted(d["styles"]),
                           "weights": sorted(d["weights"]) if d["byStyles"] else [], "tokens": sorted(d["tokens"])}
                          for n, d in fams.items()],
             "weightsDeclared": all_weights}
    write_json(os.path.join(ROOT, "fonts.json"), fonts); files_written.append("fonts.json")
    text_styles_entry = {"file": rel, "count": len(raw_styles), "fonts": "fonts.json",
                         "note": "Each style aliases the typography variables it binds; resolve them per breakpoint mode."}
    counts["textStyles"] = len(raw_styles)
    if unbound: warnings.append(f"Text style parts with no variable (literal kept): {unbound}")
    if collisions: warnings.append(f"text style name collisions: {sorted(set(collisions))}")
    unused = [f["family"] for f in fonts["families"] if not f["usedByTextStyles"]]
    if unused: warnings.append(f"Font families declared by tokens but used by no text style: {unused}")
else:
    warnings.append("No _dump/text-styles.json: text styles and fonts.json were not written (run dump-text-styles.js)")

# ---------- root manifest ----------
if dupes: warnings.append(f"{dupes} duplicate variable rows across dump pages were de-duplicated by id")
# Variables deleted from the file that something still references. REST returns them; they are not tokens.
deleted_path = os.path.join(DUMP, "deleted.json")
if os.path.exists(deleted_path):
    with open(deleted_path) as f: deleted = json.load(f)
    if deleted: warnings.append(f"{len(deleted)} variables deleted from the file but still referenced, not exported: {deleted}")

# Values stored against modes the collection no longer declares (deleted modes).
orphan_path = os.path.join(DUMP, "orphans.json")
orphans = json.load(open(orphan_path)) if os.path.exists(orphan_path) else []
if orphans:
    modes = sorted({o.rsplit(" @ ", 1)[1] for o in orphans})
    warnings.append(f"{len(orphans)} values sit on deleted modes {modes} and were skipped, e.g. {orphans[:3]}")
manifest = {
    "fileKey": os.environ.get("FIGMA_FILE_KEY", "hvRmnZZOZrmTW0wf8hbrt5"),
    "extractedAt": datetime.date.today().isoformat(),
    "source": os.environ.get("TOKEN_SOURCE", "Figma Plugin API via use_figma (zebra-figma-token-export skill)"),
    "collections": manifest_cols,
    "extensions": [{k: e[k] for k in ("name","slug","extends","root","overrideCount","modeMap","files")} for e in manifest_exts],
    "textStyles": text_styles_entry,
    "orphanModeValues": orphans,
    "counts": {"collections": len(manifest_cols), "extensions": len(manifest_exts),
               "tokens": counts["tokens"], "overrideTokens": counts["overrides"],
               "textStyles": counts["textStyles"], "files": len(files_written)},
    "conventions": {
        "alias": "{<collection name>.<dotted variable name>}",
        "names": "verbatim from Figma, spaces included; sanitise downstream if building CSS",
        "extensions": "an extension file contains only the variables that extension overrides, never a merged copy of its parent",
    },
    "warnings": warnings,
}
write_json(os.path.join(ROOT, "manifest.json"), manifest)

print(f"collections {len(manifest_cols)}  extensions {len(manifest_exts)}  "
      f"tokens {counts['tokens']}  overrides {counts['overrides']}  textStyles {counts['textStyles']}  "
      f"files {len(files_written)+1}")
for w in warnings: print("  warn:", w)
