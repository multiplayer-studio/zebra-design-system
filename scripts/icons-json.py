"""Regenerate icons.json from the @zebra-fed/zeta-icons npm package. Maintainers only (needs Python 3 + internet).

Usage: python3 scripts/icons-json.py [version]
The version defaults to the one in the DESIGN.md frontmatter (`icons: "Zebra Icons 1.9.8 ..."`).

Downloads the package tarball from the npm registry, checks its integrity hash, and reads two files
straight out of the archive in memory (nothing is extracted to disk):
  - outputs/web/icon-types.ts      the ligature names that exist in the icon font (the source of truth)
  - outputs/icon-manifest.json     display name, category and search terms for each icon
Writes icons.json at the repo root, keyed by ligature name: use the key as the text of an `.icon` element.
"""
import base64, hashlib, io, json, os, re, sys, tarfile, urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PACKAGE = '@zebra-fed/zeta-icons'

if len(sys.argv) > 1:
    version = sys.argv[1]
else:
    version = re.search(r'^icons:.*?(\d+\.\d+\.\d+)', open(os.path.join(ROOT, 'DESIGN.md')).read(), re.M).group(1)

def get(url): return urllib.request.urlopen(url, timeout=60).read()

meta = json.loads(get(f'https://registry.npmjs.org/{PACKAGE}/{version}'))
tgz = get(meta['dist']['tarball'])
algo, _, want = meta['dist']['integrity'].partition('-')
got = base64.b64encode(hashlib.new(algo, tgz).digest()).decode()
if got != want: sys.exit(f'integrity check failed for {PACKAGE}@{version}')

tar = tarfile.open(fileobj=io.BytesIO(tgz))
read = lambda name: tar.extractfile('package/' + name).read().decode()

fonts = re.findall(r'"([a-z0-9_]+)"', read('outputs/web/icon-types.ts').split('=', 1)[1].split('];')[0])
manifest = json.loads(read('outputs/icon-manifest.json'))

icons = {}
for entry in manifest.values():
    ligature = re.search(r'/([^/]+)_round\.svg$', entry['roundPath']).group(1)
    icon = icons.setdefault(ligature, {'label': entry['name'], 'category': entry['category'], 'searchTerms': []})
    for term in entry['searchTerms']:  # a few ligatures appear twice in the manifest: merge them
        if term not in icon['searchTerms']: icon['searchTerms'].append(term)

if set(icons) != set(fonts):
    sys.exit(f'manifest and font list disagree: {sorted(set(icons) ^ set(fonts))}')

out = {'package': PACKAGE, 'version': version, 'count': len(icons), 'icons': dict(sorted(icons.items()))}
with open(os.path.join(ROOT, 'icons.json'), 'w') as f:
    json.dump(out, f, indent=2); f.write('\n')
print(f'icons.json: {len(icons)} icons from {PACKAGE}@{version}')
