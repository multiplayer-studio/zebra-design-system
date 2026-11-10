"""Shared helpers for the bundlers (prototyping-zip.py, production-bundle.py). Python 3, stdlib only.

A bundle is a list of (source path, bundle path) entries; source None means an empty folder.
write_zip and write_dir write the same entries as a zip or as a plain folder.
"""
import os, shutil, zipfile

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
JUNK = {'.DS_Store', 'Thumbs.db'}


def read_claude(name):
    return open(os.path.join(ROOT, name)).read()


def entries(folders, files=(), renames=None):
    """folders: repo folder names, or (repo folder, bundle folder) pairs, e.g. ('templates/acme', 'templates')
    to ship one project's templates flat; a missing folder ships empty. files copy as-is; renames maps
    repo path -> bundle path."""
    out = []
    for folder in folders:
        src, dst = folder if isinstance(folder, tuple) else (folder, folder)
        out.append((None, dst))  # dir entry, so an empty folder still ships
        top = os.path.join(ROOT, src)
        for dirpath, dirnames, filenames in os.walk(top):
            dirnames.sort()
            for name in sorted(filenames):
                if name in JUNK or name.startswith('._'):
                    continue
                path = os.path.join(dirpath, name)
                out.append((path, os.path.join(dst, os.path.relpath(path, top))))
    out += [(os.path.join(ROOT, f), f) for f in files]
    out += [(os.path.join(ROOT, s), d) for s, d in (renames or {}).items()]
    return out


def write_zip(out, prefix, items, claude, claude_dir=None):
    """claude is the text of the shipped CLAUDE.md (read it with read_claude), written to claude_dir (default prefix)."""
    with zipfile.ZipFile(os.path.join(ROOT, out), 'w', zipfile.ZIP_DEFLATED) as z:
        for src, dst in items:
            if src is None:
                z.writestr(os.path.join(prefix, dst) + '/', '')
            else:
                z.write(src, os.path.join(prefix, dst))
        z.writestr(os.path.join(claude_dir or prefix, 'CLAUDE.md'), claude)
    print(f'Wrote {out}')


def write_dir(out, prefix, items, claude, claude_dir=None):
    """Same as write_zip, as plain files under out/ (relative to the repo root unless absolute).
    The bundle's top folder (the first part of prefix) is replaced, so deletions carry; the rest of out/ is left alone."""
    out = os.path.join(ROOT, out)
    shutil.rmtree(os.path.join(out, prefix.split('/')[0]), ignore_errors=True)
    for src, dst in items:
        path = os.path.join(out, prefix, dst)
        if src is None:
            os.makedirs(path, exist_ok=True)
        else:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            shutil.copyfile(src, path)
    path = os.path.join(out, claude_dir or prefix, 'CLAUDE.md')
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w').write(claude)
    print(f"Wrote {os.path.relpath(os.path.join(out, prefix.split('/')[0]), ROOT)}/")
