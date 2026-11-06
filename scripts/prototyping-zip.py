"""Bundle the prototyping kit into zebra-prototyping.zip at the repo root. Maintainers only (Python 3, stdlib).

Usage: python3 scripts/prototyping-zip.py

The zip holds one folder, zebra-prototyping/, with:
  atoms/ molecules/ organisms/ prototypes/   as-is
  DESIGN.md PROTOTYPE.md icons.json tokens.css   as-is
  CLAUDE.md                                  with the "Optional: production builds" section removed
  README.md                                  copied from PROTOTYPING.README.md
"""
import os, re, zipfile

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
OUT = os.path.join(ROOT, 'zebra-prototyping.zip')
PREFIX = 'zebra-prototyping'
FOLDERS = ['atoms', 'molecules', 'organisms', 'prototypes']
FILES = ['DESIGN.md', 'PROTOTYPE.md', 'icons.json', 'tokens.css']
JUNK = {'.DS_Store', 'Thumbs.db'}


def prototype_only_claude_md():
    text = open(os.path.join(ROOT, 'CLAUDE.md')).read()
    stripped = re.sub(r'## Optional: production builds\n.*?\n---\n\n', '', text, flags=re.S)
    assert stripped != text and '@AGENTS.md' not in stripped, 'CLAUDE.md layout changed; update the regex'
    return stripped


with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
    for folder in FOLDERS:
        for dirpath, dirnames, filenames in os.walk(os.path.join(ROOT, folder)):
            dirnames.sort()
            for name in sorted(filenames):
                if name in JUNK or name.startswith('._'):
                    continue
                path = os.path.join(dirpath, name)
                z.write(path, os.path.join(PREFIX, os.path.relpath(path, ROOT)))
    for name in FILES:
        z.write(os.path.join(ROOT, name), os.path.join(PREFIX, name))
    z.write(os.path.join(ROOT, 'PROTOTYPING.README.md'), os.path.join(PREFIX, 'README.md'))
    z.writestr(os.path.join(PREFIX, 'CLAUDE.md'), prototype_only_claude_md())

print(f'Wrote {os.path.relpath(OUT, ROOT)}')
