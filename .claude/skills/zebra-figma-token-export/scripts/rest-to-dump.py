"""Normalise the REST variables/local response into the dump shape build-tokens.py reads
(the same encoding dump-variables.js produces through the Plugin API)."""
import json, sys, os, glob
rest_path, dump_dir = sys.argv[1], sys.argv[2]
meta = json.load(open(rest_path))["meta"]
def h(x): return format(round(x * 255), "02x")
def hexc(c):
    a = c.get("a", 1)
    return "#" + h(c["r"]) + h(c["g"]) + h(c["b"]) + (h(a) if a < 1 else "")
def enc(v):
    if isinstance(v, dict) and v.get("type") == "VARIABLE_ALIAS": return {"a": v["id"]}
    # An alias at an opacity: keep the target and the 0-1 alpha laid over it.
    if isinstance(v, dict) and isinstance(v.get("color"), dict) and v["color"].get("type") == "VARIABLE_ALIAS":
        return {"a": v["color"]["id"], "o": round(v["opacity"] / 100, 3)}
    if isinstance(v, dict) and "r" in v: return hexc(v)
    if isinstance(v, bool): return v
    if isinstance(v, (int, float)):
        r = round(v * 1000) / 1000
        return int(r) if r == int(r) else r
    return v
# Local only, as the Plugin API's getLocal* calls return.
cols = [c for c in meta["variableCollections"].values() if not c.get("remote")]
# Keep the Plugin API's collection order (from a previous dump, if given) so a
# REST export regenerates the CSS without reordering every block.
if len(sys.argv) > 3 and os.path.exists(sys.argv[3]):
    order = [c["id"] for c in json.load(open(sys.argv[3]))["collections"]]
    cols.sort(key=lambda c: order.index(c["id"]) if c["id"] in order else len(order))
declared = {c["id"]: [m["modeId"] for m in c["modes"]] for c in cols}
out_cols = []
for c in cols:
    e = {"id": c["id"], "name": c["name"], "key": c["key"], "defaultModeId": c["defaultModeId"],
         "modes": [dict({"id": m["modeId"], "name": m["name"]}, **({"parent": m["parentModeId"]} if m.get("parentModeId") else {})) for m in c["modes"]],
         "count": len([i for i in c.get("variableIds", []) if not meta["variables"].get(i, {}).get("deletedButReferenced")])}
    if c.get("hiddenFromPublishing"): e["hidden"] = True
    if c.get("isExtension"):
        e.update(isExtension=True, parentId=c.get("parentVariableCollectionId"), rootId=c.get("rootVariableCollectionId"),
                 overrides={vid: {mid: enc(val) for mid, val in bym.items()} for vid, bym in (c.get("variableOverrides") or {}).items()})
    out_cols.append(e)
variables, orphans = [], []
# The Plugin API doesn't list a variable deleted from the file, but REST keeps one while anything still references it.
local = [v for v in meta["variables"].values() if not v.get("remote")]
deleted = sorted(v["name"] for v in local if v.get("deletedButReferenced"))
for v in sorted((v for v in local if not v.get("deletedButReferenced")), key=lambda v: v["id"]):
    ok = declared.get(v["variableCollectionId"], [])
    vals = {}
    for mid, val in v["valuesByMode"].items():
        if mid not in ok: orphans.append(f'{v["name"]} @ {mid}'); continue
        vals[mid] = enc(val)
    keys = list(vals)
    e = {"i": v["id"], "n": v["name"], "t": v["resolvedType"], "c": v["variableCollectionId"]}
    e["v"] = {"*": vals[keys[0]]} if len(keys) == len(ok) and len(keys) > 1 and all(json.dumps(vals[k]) == json.dumps(vals[keys[0]]) for k in keys) else vals
    sc = v.get("scopes") or []
    if sc and sc != ["ALL_SCOPES"]: e["s"] = sc
    if v.get("description"): e["d"] = v["description"]
    if v.get("codeSyntax"): e["x"] = v["codeSyntax"]
    if v.get("hiddenFromPublishing"): e["h"] = 1
    variables.append(e)
for f in glob.glob(os.path.join(dump_dir, "vars-*.json")): os.remove(f)
json.dump({"collections": out_cols}, open(os.path.join(dump_dir, "collections.json"), "w"), indent=1)
json.dump(variables, open(os.path.join(dump_dir, "vars-rest.json"), "w"), indent=1)
if orphans: json.dump(orphans, open(os.path.join(dump_dir, "orphans.json"), "w"), indent=1)
json.dump(deleted, open(os.path.join(dump_dir, "deleted.json"), "w"), indent=1)
print(f"collections {len(out_cols)} (extensions {sum(1 for c in out_cols if c.get('isExtension'))}), variables {len(variables)}, orphan mode values {len(orphans)}")
for o in orphans[:10]: print("  orphan:", o)
