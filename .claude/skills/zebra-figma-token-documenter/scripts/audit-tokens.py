"""Compare the token export with the last documented state and audit colour descriptions.

Reads   <root>/_dump/ (written by zebra-figma-token-export)
Writes  <root>/_docs/audit.md     the full report
        <root>/_docs/status.json  the next version and the frames to rebuild
With --mark, after the frames are built:
        <root>/_docs/snapshot.json  what is now documented
        <root>/_docs/changelog.md   one entry per version

Usage: audit-tokens.py [root] [--mark] [--date=YYYY-MM-DD]
"""
import datetime, html, json, os, re, sys
from collections import defaultdict

args = [a for a in sys.argv[1:] if not a.startswith("--")]
root = args[0] if args else "tokens"
mark = "--mark" in sys.argv
today = next((a.split("=")[1] for a in sys.argv if a.startswith("--date=")), datetime.date.today().isoformat())
docs = os.path.join(root, "_docs")
os.makedirs(docs, exist_ok=True)

variables = json.load(open(os.path.join(root, "_dump", "vars-rest.json")))
collections = json.load(open(os.path.join(root, "_dump", "collections.json")))["collections"]
styles_path = os.path.join(root, "_dump", "text-styles.json")
styles = json.load(open(styles_path)) if os.path.exists(styles_path) else []
styles = styles["styles"] if isinstance(styles, dict) else styles

by_id = {c["id"]: c for c in collections}
names = {v["i"]: v["n"] for v in variables}
FRAMES = {"primitives": "primitive", "palette": "palette", "semantics": "semantic", "size": "size", "typography": "typography",
         "companion": "companion", "target": "target", "condensed": "size"}
COLOUR = ("primitives", "palette", "semantics")
# Frames print resolved values, so a change also rebuilds every frame that resolves through it.
DOWNSTREAM = {"primitive": ["palette", "semantic", "companion", "target", "size", "typography"], "palette": ["semantic", "companion", "target"]}


def plain(value):
    """A value as text, with aliases as token names so a re-pointed alias reads as a change."""
    if isinstance(value, dict) and "a" in value:
        target = names.get(value["a"], value["a"])
        return f"{target} @ {value['o']}" if "o" in value else target
    return value


def mode_names(collection):
    return {m["id"]: m["name"] for m in collection["modes"]}


def snapshot():
    out = {}
    for v in variables:
        c = by_id[v["c"]]
        modes = mode_names(c)
        values = {("*" if k == "*" else modes.get(k, k)): plain(x) for k, x in v["v"].items()}
        out[v["i"]] = {"name": v["n"], "collection": c["name"], "type": v["t"], "description": html.unescape(v.get("d") or "").strip(), "values": values}
    for c in collections:
        if not c.get("isExtension"):
            continue
        modes = mode_names(c)
        for vid, by_mode in (c.get("overrides") or {}).items():
            row = out.get(vid)
            if row:
                for k, x in by_mode.items():
                    row.setdefault("overrides", {})[f"{c['name']}/{modes.get(k, k)}"] = plain(x)
    for s in styles:
        out[s["id"]] = {"name": s["name"], "collection": "typography", "type": "TEXT_STYLE", "description": (s.get("description") or "").strip(),
                        "values": {"*": f"{s['fontFamily']} {s['fontStyle']} {s['fontSize']}"}}
    return out


def diff(old, new):
    changes = []
    for i, row in new.items():
        was = old.get(i)
        if was is None:
            changes.append(("added", row["collection"], row["name"], ""))
            continue
        if was["name"] != row["name"]:
            changes.append(("renamed", row["collection"], row["name"], f"was {was['name']}"))
        for key, label in (("values", "value"), ("overrides", "override")):
            a, b = was.get(key) or {}, row.get(key) or {}
            for mode in sorted(set(a) | set(b)):
                if a.get(mode) != b.get(mode):
                    where = "" if mode == "*" else f"{mode}: "
                    changes.append((label, row["collection"], row["name"], f"{where}{a.get(mode, 'none')} to {b.get(mode, 'none')}"))
        if was["description"] != row["description"]:
            changes.append(("description", row["collection"], row["name"], "added" if not was["description"] else "changed"))
    for i, row in old.items():
        if i not in new:
            changes.append(("removed", row["collection"], row["name"], ""))
    return changes


def group(name):
    parts = name.split("/")
    return "/".join(parts[:2]) if parts[0] in ("interactive", "feedback", "color", "status") and len(parts) > 2 else parts[0]


def audit(new):
    """Colour tokens with no description, and descriptions used on more than one token."""
    report = {}
    for collection in COLOUR:
        rows = [r for r in new.values() if r["collection"] == collection and r["type"] == "COLOR"]
        missing = defaultdict(list)
        repeated = defaultdict(list)
        for r in sorted(rows, key=lambda x: x["name"]):
            if r["description"]:
                repeated[r["description"].lower()].append(r)
            else:
                missing[group(r["name"])].append(r["name"])
        groups = [{"text": v[0]["description"], "tokens": [x["name"] for x in v]} for v in repeated.values() if len(v) > 1]
        report[collection] = {"total": len(rows), "missing": dict(missing), "repeated": sorted(groups, key=lambda g: -len(g["tokens"]))}
    shared = defaultdict(set)
    for r in new.values():
        if r["collection"] in COLOUR and r["type"] == "COLOR" and r["description"]:
            shared[r["description"].lower()].add(r["collection"])
    report["acrossCollections"] = sum(1 for v in shared.values() if len(v) > 1)
    return report


def size_drift(new):
    """Size descriptions that state a px value or scale step the token no longer has."""
    scale = {r["name"]: r["values"].get("*", next(iter(r["values"].values()))) for r in new.values() if r["collection"] == "primitives" and r["name"].startswith("scale/")}
    drift = []
    for r in sorted(new.values(), key=lambda x: x["name"]):
        if r["collection"] != "size":
            continue
        m = re.match(r"=\s*(\d+)px,\s*source:\s*(scale/\S+)", r["description"])
        if not m:
            continue
        source = r["values"].get("Desktop", r["values"].get("*"))
        actual = scale.get(source)
        if source != m[2] or (actual is not None and str(actual) != m[1]):
            drift.append({"token": r["name"], "says": r["description"], "is": f"{source} ({actual}px)"})
    return drift


snapshot_path = os.path.join(docs, "snapshot.json")
previous = json.load(open(snapshot_path)) if os.path.exists(snapshot_path) else None
current = snapshot()
version = (previous or {}).get("version", 0)
changes = diff(previous["tokens"], current) if previous else []
report = audit(current)
drift = size_drift(current)

# Descriptions aren't shown on the frames, so a description change logs a version but rebuilds nothing.
direct = {FRAMES.get(c, c) for kind, c, _, _ in changes if kind != "description"}
affected = sorted(direct | {d for frame in direct for d in DOWNSTREAM.get(frame, [])})
out = [f"# Token audit, {today}", ""]
for collection in COLOUR:
    section = report[collection]
    out += [f"## {collection}", "", f"{sum(map(len, section['missing'].values()))} of {section['total']} colour tokens have no description.", ""]
    out += [f"- **{k}** ({len(v)}): {', '.join(f'`{t}`' for t in v)}" for k, v in sorted(section["missing"].items())]
    out += ["", f"{len(section['repeated'])} descriptions are repeated.", ""]
    out += [f"- “{g['text']}”: {', '.join(f'`{t}`' for t in g['tokens'])}" for g in section["repeated"]]
    out.append("")
out += [f"{report['acrossCollections']} descriptions appear in more than one colour collection.", "", "## Size descriptions that no longer match", ""]
out += [f"- `{d['token']}`: says “{d['says']}”, is {d['is']}" for d in drift] or ["None."]
out += ["", "## Changes since the last documented version", ""]
out += [f"- {kind}: `{name}` {detail}".rstrip() for kind, _, name, detail in changes] or ["None." if previous else "First documented version."]
open(os.path.join(docs, "audit.md"), "w").write("\n".join(out) + "\n")

needs_version = previous is None or bool(changes)
next_version = version + 1 if needs_version else version
json.dump({"version": f"v{next_version}", "date": today, "rebuild": affected}, open(os.path.join(docs, "status.json"), "w"), indent=1)

if mark:
    if needs_version:
        log = os.path.join(docs, "changelog.md")
        head = "" if os.path.exists(log) else "# Token changelog\n\nWritten by zebra-figma-token-documenter. Newest last.\n"
        entry = [f"\n## v{next_version}, {today}\n"]
        entry += [f"- {kind}: `{name}` {detail}".rstrip() for kind, _, name, detail in changes] or ["- First documented version."]
        open(log, "a").write(head + "\n".join(entry) + "\n")
    json.dump({"version": next_version, "date": today, "tokens": current}, open(snapshot_path, "w"), indent=0, ensure_ascii=False)

for collection in COLOUR:
    section = report[collection]
    print(f"{collection}: {sum(map(len, section['missing'].values()))}/{section['total']} colours undescribed, {len(section['repeated'])} repeated")
print(f"size descriptions out of date: {len(drift)}")
print(f"changes: {len(changes)}  frames to rebuild: {', '.join(affected) or 'none'}  version: v{next_version}{'' if needs_version else ' (unchanged)'}")
