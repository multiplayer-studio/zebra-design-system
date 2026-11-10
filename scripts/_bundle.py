"""Shared helpers for the zip bundlers (prototyping-zip.py, production-zip.py). Python 3, stdlib only."""
import os, zipfile

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
JUNK = {'.DS_Store', 'Thumbs.db'}


def read_claude(name):
    return open(os.path.join(ROOT, name)).read()


def write_zip(out, prefix, folders, files, renames, claude, claude_dir=None):
    """folders/files copy as-is; renames maps repo path -> zip path; claude is the text of the shipped CLAUDE.md (read it with read_claude), written to claude_dir (default prefix)."""
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
        z.writestr(os.path.join(claude_dir or prefix, 'CLAUDE.md'), claude)
    print(f'Wrote {out}')
