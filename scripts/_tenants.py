"""Shared helpers for the consumer loop (tenants-sync.py, tenants-approve.py, release.py). Python 3 stdlib + the git CLI.

A consumer repo's local changes are whatever differs between its design-system folder (consumers.json "path",
default design-system/) and the production bundle
of the version it has installed (the `version` in its DESIGN.md), never the latest master.
Token keys (DESIGN.md frontmatter, a component's tokens:) are compared one by one; everything else per file.
LIBRARY.md, CHANGES.md and templates/ belong to the project, and tokens.css is generated, so none of them count.

Self-test: python3 scripts/_tenants.py
"""
import hashlib, importlib.util, json, os, re, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..'))
TENANTS = os.path.join(ROOT, 'tenants')
_spec = importlib.util.spec_from_file_location('tokens_css', os.path.join(HERE, 'tokens-css.py'))
tokens_css = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(tokens_css)

SKIP = {'LIBRARY.md', 'CHANGES.md', 'tokens.css'}
JUNK = {'.DS_Store', 'Thumbs.db'}
TOKEN_LINE = re.compile(r'^  [a-z0-9-]+:')


def run(*cmd, cwd=ROOT, check=True):
    return subprocess.run(cmd, cwd=cwd, check=check, capture_output=True, text=True)


def counted(rel):
    return rel not in SKIP and not rel.startswith('templates/')


def tree(top):
    """Relative paths of every file under top that counts as a design-system difference."""
    out = set()
    for dirpath, _, names in os.walk(top):
        for name in names:
            if name not in JUNK and not name.startswith('._'):
                rel = os.path.relpath(os.path.join(dirpath, name), top)
                if counted(rel):
                    out.add(rel)
    return out


def split(path):
    """(token values by 'group.key', the text with the token lines removed)."""
    text = open(path).read()
    if not text.startswith('---\n'):
        return {}, text
    front, sep, body = text.partition('\n---\n')
    tokens = {f'{g}.{k}': tokens_css.val(v) for g, kv in tokens_css.parse_front(path).items() for k, v in kv.items()}
    return tokens, '\n'.join(l for l in front.split('\n') if not TOKEN_LINE.match(l)) + sep + body


def sha(path):
    return 'sha256:' + hashlib.sha256(open(path, 'rb').read()).hexdigest()


def same(a, b):
    return open(a, 'rb').read() == open(b, 'rb').read()


def local_changes(local, base):
    """Compare two design-system/ folders. Returns
    {'tokens': {'DESIGN.md:primitives.color-brand-main-60': {'base': '#1f69ff', 'local': '#0a5cc2'}},   (None = key absent)
     'files':  {'molecules/banner.md': {'status': 'changed' | 'added' | 'deleted', 'hash': 'sha256:…' | 'deleted'}}}"""
    tokens, files = {}, {}
    lf, bf = tree(local), tree(base)
    for rel in sorted(lf | bf):
        l, b = os.path.join(local, rel), os.path.join(base, rel)
        if rel not in lf:
            files[rel] = {'status': 'deleted', 'hash': 'deleted'}
        elif rel not in bf:
            files[rel] = {'status': 'added', 'hash': sha(l)}
        elif not same(l, b):
            rest_differs = True
            if rel.endswith('.md'):
                (lt, lr), (bt, br) = split(l), split(b)
                for k in sorted(lt.keys() | bt.keys()):
                    if lt.get(k) != bt.get(k):
                        tokens[f'{rel}:{k}'] = {'base': bt.get(k), 'local': lt.get(k)}
                rest_differs = lr != br
            if rest_differs:
                files[rel] = {'status': 'changed', 'hash': sha(l)}
    return {'tokens': tokens, 'files': files}


def ds_path(c):
    """Where a consumers.json entry keeps its design-system folder, relative to its repo root (default design-system)."""
    p = os.path.normpath(c.get('path', 'design-system'))
    if os.path.isabs(p) or p == '.' or p.split(os.sep)[0] == '..':
        raise ValueError(f"{c['tenant']}: path must be a folder inside the repo, got {c['path']!r}")
    return p


def design_version(ds_dir):
    m = re.search(r"^version: '?([^'\n]+?)'?\s*$", open(os.path.join(ds_dir, 'DESIGN.md')).read(), re.M)
    return m.group(1) if m else None


def tag(version):
    return f'design-system-v{version}'


def base_bundle(version):
    """The design-system/ folder of the production bundle for a released version (built from its git tag, cached
    in build/base/). The current, not-yet-released version is built from the working tree instead."""
    ds = lambda out: os.path.join(out, 'zebra-design-system-production', 'design-system')
    cached = os.path.join(ROOT, 'build', 'base', version)
    if os.path.isdir(ds(cached)):
        return ds(cached)
    if run('git', 'rev-parse', '-q', '--verify', f'refs/tags/{tag(version)}', check=False).returncode == 0:
        wt = tempfile.mkdtemp()
        run('git', 'worktree', 'add', '--detach', '-f', wt, tag(version))
        try:
            run(sys.executable, os.path.join(wt, 'scripts', 'production-bundle.py'), cached)
        finally:
            run('git', 'worktree', 'remove', '--force', wt)
        return ds(cached)
    if version == design_version(ROOT):
        out = tempfile.mkdtemp()
        run(sys.executable, os.path.join(HERE, 'production-bundle.py'), out)
        return ds(out)
    raise LookupError(f'no tag {tag(version)} for installed version {version}')


# ── tenants ────────────────────────────────────────────────────────────────────────────────────────────────

def load_tenant(name):
    path = os.path.join(TENANTS, name, 'tenant.json')
    return json.load(open(path)) if os.path.exists(path) else None


def value(tenant, kind, key):
    d = tenant['differences'][kind][key]
    return d['local'] if kind == 'tokens' else d['hash']


def state(tenant, kind, key):
    v = value(tenant, kind, key)
    for decision in ('approved', 'rejected'):
        if key in tenant[decision][kind] and tenant[decision][kind][key] == v:
            return decision
    return 'needs review'


def counts(tenant):
    c = {'needs review': 0, 'approved': 0, 'rejected': 0}
    for kind in ('tokens', 'files'):
        for key in tenant['differences'][kind]:
            c[state(tenant, kind, key)] += 1
    return c


def render(name, tenant):
    c = counts(tenant)
    md = [f'# Tenant: {name}', '',
          f"`{tenant['repo']}` differs from master `{tenant['base']}`: {c['needs review']} need review, "
          f"{c['approved']} approved, {c['rejected']} rejected.", '',
          'Generated by `scripts/tenants-sync.py`; decide with `scripts/tenants-approve.py` (see `CLAUDE.md`, Sprint reconcile). '
          'Their files are in `files/`, their reasons in `CHANGES.md`.', '']
    fmt = lambda v: '—' if v is None else f'`{v}`'
    for heading in ('needs review', 'approved', 'rejected'):
        rows = [f"| `{k}` | {fmt(d['base'])} | {fmt(d['local'])} |" for k, d in tenant['differences']['tokens'].items() if state(tenant, 'tokens', k) == heading]
        rows += [f"| `{k}` | | {d['status']}{'' if d['status'] == 'deleted' else f' (files/{k})'} |" for k, d in tenant['differences']['files'].items() if state(tenant, 'files', k) == heading]
        if rows:
            md += [f'## {heading.capitalize()}', '', '| Where | Master | Theirs |', '|---|---|---|', *rows, '']
    return '\n'.join(md)


def save_tenant(name, tenant):
    tdir = os.path.join(TENANTS, name)
    os.makedirs(tdir, exist_ok=True)
    with open(os.path.join(tdir, 'tenant.json'), 'w') as f:
        json.dump(tenant, f, indent=2, sort_keys=True); f.write('\n')
    with open(os.path.join(tdir, 'changelog.md'), 'w') as f:
        f.write(render(name, tenant))


# ── self-test ──────────────────────────────────────────────────────────────────────────────────────────────

def _self_test():
    t = tempfile.mkdtemp()
    def write(path, text):
        os.makedirs(os.path.dirname(path), exist_ok=True); open(path, 'w').write(text)
    design = "---\nversion: '1.0.0'\nprimitives:\n  color-brand-main-60: '#1f69ff'\n  color-neutral-cool-10: '#f8fbff'\n---\n\n# Rules\n"
    button = "---\nname: Button\ntokens:\n  button-primary-container-background-enabled: '{colors.color-brand-primary-default}'\n---\n\nA button.\n"
    base, local = os.path.join(t, 'base'), os.path.join(t, 'local')
    for d in (base, local):
        write(f'{d}/DESIGN.md', design); write(f'{d}/atoms/button.md', button)
        write(f'{d}/LIBRARY.md', 'template'); write(f'{d}/tokens.css', ':root{}')
    write(f'{local}/DESIGN.md', design.replace("color-brand-main-60: '#1f69ff'", "color-brand-main-60: '#0a5cc2'  # theirs"))
    write(f'{local}/atoms/button.md', button.replace('A button.', 'A big button.'))
    write(f'{local}/atoms/new.md', 'new')
    write(f'{local}/LIBRARY.md', 'filled in'); write(f'{local}/CHANGES.md', 'log')
    write(f'{local}/templates/scan-list.md', 'layout'); write(f'{local}/tokens.css', ':root{--x:1}')

    c = local_changes(local, base)
    assert c['tokens'] == {'DESIGN.md:primitives.color-brand-main-60': {'base': '#1f69ff', 'local': '#0a5cc2'}}, c['tokens']
    assert sorted(c['files']) == ['atoms/button.md', 'atoms/new.md'], c['files']
    assert c['files']['atoms/new.md']['status'] == 'added' and c['files']['atoms/button.md']['status'] == 'changed'
    assert local_changes(base, base) == {'tokens': {}, 'files': {}}
    os.remove(f'{local}/atoms/button.md')
    assert local_changes(local, base)['files']['atoms/button.md'] == {'status': 'deleted', 'hash': 'deleted'}

    tenant = {'repo': 'org/x', 'base': '1.0.0', 'differences': c,
              'approved': {'tokens': {'DESIGN.md:primitives.color-brand-main-60': '#0a5cc2'}, 'files': {}},
              'rejected': {'tokens': {}, 'files': {'atoms/new.md': 'sha256:stale'}}}
    assert counts(tenant) == {'needs review': 2, 'approved': 1, 'rejected': 0}  # a stale hash doesn't count
    assert '## Approved' in render('x', tenant) and '`#0a5cc2`' in render('x', tenant)
    assert ds_path({'tenant': 'x'}) == 'design-system' and ds_path({'tenant': 'x', 'path': 'docs/ds/'}) == 'docs/ds'
    for bad in ('../x', '/x', '.', 'a/../../x'):
        try:
            ds_path({'tenant': 'x', 'path': bad}); raise AssertionError(bad)
        except ValueError:
            pass
    shutil.rmtree(t)
    print('_tenants self-test OK')


if __name__ == '__main__':
    _self_test()
