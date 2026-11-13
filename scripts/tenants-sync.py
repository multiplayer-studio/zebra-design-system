"""Nightly: pull every repo in consumers.json and record how its design system differs from master. Maintainers and CI only
(Python 3 stdlib + git; .github/workflows/tenants-sync.yml runs it, then commits tenants/, templates/ and any project zips).

Usage: python3 scripts/tenants-sync.py [tenant ...]
Auth:  DS_BOT_TOKEN (or GH_TOKEN) for private repos; locally: DS_BOT_TOKEN=$(gh auth token) python3 scripts/tenants-sync.py
       A consumers.json "repo" that is a local folder is read straight from disk, no git needed (for testing).

For each consumer:
  - templates: the repo's <path>/templates/* (<path> is consumers.json "path", default design-system) is mirrored into
    templates/<project>/ (the project owns them, no review), and that project's prototyping zip is rebuilt when they change;
  - differences: <path>/ is compared with the bundle of the version it has installed (scripts/_tenants.py).
    None: tenants/<tenant>/ is removed. Some: tenants/<tenant>/ holds tenant.json (differences + the DS team's
    approved/rejected decisions, kept while they still match), changelog.md, CHANGES.md and files/ (their changed files).
Tenants whose repo is no longer in consumers.json are removed. Exits 1 if any repo failed, after doing the rest.
"""
import json, os, shutil, subprocess, sys, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _tenants import ROOT, TENANTS, base_bundle, counts, design_version, ds_path, load_tenant, local_changes, run, save_tenant, value

TOKEN = os.environ.get('DS_BOT_TOKEN') or os.environ.get('GH_TOKEN')


def url(repo):
    return f'https://x-access-token:{TOKEN}@github.com/{repo}.git' if TOKEN else f'https://github.com/{repo}.git'


def files_of(top):
    return {os.path.relpath(os.path.join(d, n), top): os.path.join(d, n)
            for d, _, names in os.walk(top) for n in names if n != '.DS_Store'} if os.path.isdir(top) else {}


def mirror(src, dst):
    """Make dst an exact copy of src (missing or empty src removes dst). True if anything changed."""
    s, d = files_of(src), files_of(dst)
    if s.keys() == d.keys() and all(open(s[k], 'rb').read() == open(d[k], 'rb').read() for k in s):
        return False
    shutil.rmtree(dst, ignore_errors=True)
    if s:
        shutil.copytree(src, dst, ignore=shutil.ignore_patterns('.DS_Store'))
    return True


def kept(old, diff, decision):
    """The DS team's decisions that still match a current difference exactly."""
    out = {'tokens': {}, 'files': {}}
    probe = {'differences': diff}
    for kind in out:
        for key, v in (old or {}).get(decision, {}).get(kind, {}).items():
            if key in diff[kind] and value(probe, kind, key) == v:
                out[kind][key] = v
    return out


def sync(c):
    try:
        p = ds_path(c)
    except ValueError as e:
        return str(e), False
    tmp = tempfile.mkdtemp()
    try:
        if os.path.isdir(c['repo']):  # local folder, for testing
            shutil.copytree(c['repo'], tmp, dirs_exist_ok=True, ignore=shutil.ignore_patterns('.git'))
        else:
            try:
                run('git', 'clone', '--quiet', '--depth', '1', '--branch', c['branch'], '--filter=blob:none', '--sparse', url(c['repo']), tmp)
                run('git', 'sparse-checkout', 'set', p, cwd=tmp)
            except subprocess.CalledProcessError as e:
                return f"clone failed: {e.stderr.strip().splitlines()[-1] if e.stderr.strip() else e.returncode}", False
        ds = os.path.join(tmp, p)
        if not os.path.isdir(ds):
            return f'no {p}/ yet, skipped', True

        project, note = c['project'], ''
        if mirror(os.path.join(ds, 'templates'), os.path.join(ROOT, 'templates', project)):
            run(sys.executable, os.path.join(ROOT, 'scripts', 'prototyping-zip.py'), project)
            note = ', templates updated'

        version = design_version(ds)
        try:
            diff = local_changes(ds, base_bundle(version))
        except LookupError as e:
            return f'{e}{note}', False
        tdir = os.path.join(TENANTS, c['tenant'])
        if not diff['tokens'] and not diff['files']:
            shutil.rmtree(tdir, ignore_errors=True)
            return f'in sync with {version}{note}', True

        old = load_tenant(c['tenant'])
        tenant = {'repo': c['repo'], 'base': version, 'differences': diff,
                  'approved': kept(old, diff, 'approved'), 'rejected': kept(old, diff, 'rejected')}
        shutil.rmtree(os.path.join(tdir, 'files'), ignore_errors=True)
        for rel in {k.split(':')[0] for k in diff['tokens']} | {k for k, d in diff['files'].items() if d['status'] != 'deleted'}:
            dst = os.path.join(tdir, 'files', rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copyfile(os.path.join(ds, rel), dst)
        if os.path.exists(os.path.join(ds, 'CHANGES.md')):
            shutil.copyfile(os.path.join(ds, 'CHANGES.md'), os.path.join(tdir, 'CHANGES.md'))
        elif os.path.exists(os.path.join(tdir, 'CHANGES.md')):
            os.remove(os.path.join(tdir, 'CHANGES.md'))
        save_tenant(c['tenant'], tenant)
        n = counts(tenant)
        return f"{n['needs review']} need review, {n['approved']} approved, {n['rejected']} rejected (base {version}){note}", True
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


consumers = json.load(open(os.path.join(ROOT, 'consumers.json')))
only = set(sys.argv[1:])
ok = True
for c in consumers:
    if not only or c['tenant'] in only:
        msg, good = sync(c)
        ok &= good
        print(f"{c['tenant']}: {msg}")
if not only and os.path.isdir(TENANTS):
    for name in sorted(set(os.listdir(TENANTS)) - {c['tenant'] for c in consumers}):
        if os.path.isdir(os.path.join(TENANTS, name)):
            shutil.rmtree(os.path.join(TENANTS, name))
            print(f'{name}: no longer in consumers.json, tenant removed')
sys.exit(0 if ok else 1)
