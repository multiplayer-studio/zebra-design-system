"""Shared helpers for the zip bundlers (prototyping-zip.py, production-zip.py). Python 3, stdlib only."""
import os, re, zipfile

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
JUNK = {'.DS_Store', 'Thumbs.db'}


def claude_md(keep):
    """PRODUCTION.CLAUDE.md reduced to the shared rules plus the one section that imports `keep` (e.g. '@PROTOTYPE.md')."""
    head, *sections = open(os.path.join(ROOT, 'PRODUCTION.CLAUDE.md')).read().split('\n---\n')
    section = next(s for s in sections if keep in s)
    assert 'Mode check' in head, 'PRODUCTION.CLAUDE.md layout changed; update _bundle.claude_md'
    head = re.sub(r'\*\*Mode check:\*\*.*\n\n?', '', head)
    section = re.sub(r'## Optional: (\w)', lambda m: '## ' + m[1].upper(), re.sub(r'Keep this section.*\n\n', '', section))
    return head.rstrip() + '\n\n---\n' + section


def write_zip(out, prefix, folders, files, renames, claude):
    """folders/files copy as-is; renames maps repo path -> zip path; claude is the text of the shipped CLAUDE.md."""
    with zipfile.ZipFile(os.path.join(ROOT, out), 'w', zipfile.ZIP_DEFLATED) as z:
        for folder in folders:
            z.write(os.path.join(ROOT, folder), os.path.join(prefix, folder))  # dir entry, so an empty folder still ships
            for dirpath, dirnames, filenames in os.walk(os.path.join(ROOT, folder)):
                dirnames.sort()
                for name in sorted(filenames):
                    if name in JUNK or name.startswith('._'):
                        continue
                    path = os.path.join(dirpath, name)
                    z.write(path, os.path.join(prefix, os.path.relpath(path, ROOT)))
        for name in files:
            z.write(os.path.join(ROOT, name), os.path.join(prefix, name))
        for src, dst in renames.items():
            z.write(os.path.join(ROOT, src), os.path.join(prefix, dst))
        z.writestr(os.path.join(prefix, 'CLAUDE.md'), claude)
    print(f'Wrote {out}')
