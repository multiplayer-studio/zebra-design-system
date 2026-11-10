"""Open a PR with the current design system on every repo in consumers.json. Maintainers and CI only
(Python 3 stdlib + git + gh; .github/workflows/release.yml runs it, triggered by hand).

Usage: python3 scripts/release.py [--dry-run [--keep]] [--notes "text for the PR body"] [tenant ...]
       --keep leaves each dry-run result in a temp folder (printed) to inspect
Auth:  DS_BOT_TOKEN (or GH_TOKEN), with contents and pull-requests write on the consumer repos.
       A consumers.json "repo" that is a local folder is read from disk; use --dry-run with those (for testing).

It works out per repo what to do; there is no option for it:
  new     (no design-system/): the whole production bundle, plus the project's templates/<project>/ flattened into
          design-system/templates/. The root CLAUDE.md is added only if the repo has none.
  update  every bundle file and the root CLAUDE.md, against the bundle of the version the repo has installed (its base):
          unchanged locally -> replaced; changed locally -> 3-way merged (git merge-file), a conflict keeps theirs and
          is listed; removed upstream -> removed unless changed locally. LIBRARY.md, CHANGES.md and templates/ are
          never touched (the project owns them), and tokens.css is regenerated from the result.
Differences the DS team rejected (tenants/<tenant>/tenant.json) are listed in the PR as "please revert".
Never force-pushes: each version gets its own branch, zebra-design-system/<version>; older release PRs are closed.
"""
import json, os, shutil, subprocess, sys, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _tenants import ROOT, base_bundle, design_version, load_tenant, run, same, state

TOKEN = os.environ.get('DS_BOT_TOKEN') or os.environ.get('GH_TOKEN')
OWNED = ('design-system/LIBRARY.md', 'design-system/CHANGES.md', 'design-system/tokens.css')


def url(repo):
    return f'https://x-access-token:{TOKEN}@github.com/{repo}.git' if TOKEN else f'https://github.com/{repo}.git'


def files_of(top):
    out = set()
    for d, dirs, names in os.walk(top):
        dirs[:] = [x for x in dirs if x != '.git']
        for n in names:
            rel = os.path.relpath(os.path.join(d, n), top)
            if n != '.DS_Store' and rel not in OWNED and not rel.startswith('design-system/templates/'):
                out.add(rel)
    return out


def copy(src, dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copyfile(src, dst)


def new_install(repo, new, project, r):
    for rel in sorted(files_of(new) | {'design-system/LIBRARY.md', 'design-system/tokens.css'}):
        if rel == 'CLAUDE.md' and os.path.exists(os.path.join(repo, rel)):
            r['notes'].append('This repo already has a `CLAUDE.md`, so it was left alone: merge the design-system section from '
                              'the kit into it (see `design-system/AGENTS.md`, Setup).')
            continue
        copy(os.path.join(new, rel), os.path.join(repo, rel)); r['updated'].append(rel)
    templates = os.path.join(ROOT, 'templates', project)
    os.makedirs(os.path.join(repo, 'design-system', 'templates'), exist_ok=True)
    if os.path.isdir(templates):
        shutil.copytree(templates, os.path.join(repo, 'design-system', 'templates'), dirs_exist_ok=True)


def update(repo, base, new, r):
    for rel in sorted(files_of(base) | files_of(new)):
        b, n, l = (os.path.join(x, rel) for x in (base, new, repo))
        hb, hn, hl = (os.path.exists(x) for x in (b, n, l))
        if not hn:                                   # removed upstream
            if hl and hb and same(l, b):
                os.remove(l); r['removed'].append(rel)
            elif hl:
                r['conflicts'].append(f'{rel}: removed upstream, changed here')
        elif not hl:
            if not hb:
                copy(n, l); r['updated'].append(rel)
            elif not same(n, b):
                r['conflicts'].append(f'{rel}: removed here, changed upstream')
        elif same(l, n) or (hb and same(n, b)):      # nothing to do, or only a local change
            continue
        elif hb and same(l, b):
            copy(n, l); r['updated'].append(rel)
        elif not hb:
            r['conflicts'].append(f'{rel}: added both here and upstream')
        else:
            m = subprocess.run(['git', 'merge-file', '-p', '-L', 'yours', '-L', 'base', '-L', 'master', l, b, n],
                               capture_output=True, text=True)
            if m.returncode == 0:
                open(l, 'w').write(m.stdout); r['merged'].append(rel)
            elif m.returncode > 0:
                r['conflicts'].append(f'{rel}: your change and master\'s overlap')
            else:
                raise RuntimeError(m.stderr)
    if not os.path.exists(os.path.join(repo, 'design-system', 'LIBRARY.md')):
        copy(os.path.join(new, 'design-system', 'LIBRARY.md'), os.path.join(repo, 'design-system', 'LIBRARY.md'))
        r['updated'].append('design-system/LIBRARY.md')


def body(version, c, r, notes):
    lines = [f'Design system **{version}**, opened by the release workflow in the master design-system repo.', '']
    if notes:
        lines += ['## Release notes', '', notes, '']
    lines += [f"This is {'a **first install**' if r['case'] == 'new' else 'an **update** from ' + r['base']}. "
              'Merge it, then ask your agent to finish pulling the new version (`design-system/AGENTS.md`, '
              'Syncing with the master design system).', '']
    for title, key in (('Updated', 'updated'), ('Merged with your changes', 'merged'), ('Removed upstream', 'removed')):
        if r[key]:
            lines += [f'<details><summary>{title} ({len(r[key])})</summary>', '', *[f'- `{x}`' for x in r[key]], '', '</details>', '']
    if r['conflicts']:
        lines += ['## Needs your agent', '', 'Kept as your version; resolve each against master (ask the developer where unsure):', '',
                  *[f'- {x}' for x in r['conflicts']], '']
    if r['rejected']:
        lines += ['## Please revert', '', 'The design-system team reviewed these local differences and rejected them:', '',
                  *[f'- `{x}`' for x in r['rejected']], '']
    lines += [*r['notes'], '', '`LIBRARY.md`, `CHANGES.md` and your templates were not touched.']
    return '\n'.join(lines)


def release(c, version, new, dry, notes):
    r = {'case': None, 'base': None, 'updated': [], 'merged': [], 'removed': [], 'conflicts': [], 'rejected': [], 'notes': []}
    tenant = load_tenant(c['tenant'])
    if tenant:
        r['rejected'] = [k for kind in ('tokens', 'files') for k in tenant['differences'][kind] if state(tenant, kind, k) == 'rejected']
    branch = f'zebra-design-system/{version}'
    local = os.path.isdir(c['repo'])
    if local and not dry:
        return 'local folders only work with --dry-run', False
    repo = tempfile.mkdtemp()
    try:
        if local:
            shutil.copytree(c['repo'], repo, dirs_exist_ok=True)
        else:
            run('git', 'clone', '--quiet', '--depth', '1', '--branch', c['branch'], url(c['repo']), repo)
            if run('git', 'ls-remote', '--exit-code', '--heads', 'origin', branch, cwd=repo, check=False).returncode == 0:
                run('git', 'fetch', '--quiet', '--depth', '1', 'origin', f'{branch}:{branch}', cwd=repo)
                run('git', 'checkout', '--quiet', branch, cwd=repo)   # a rerun of this version builds on its own branch
            else:
                run('git', 'checkout', '--quiet', '-b', branch, cwd=repo)

        ds = os.path.join(repo, 'design-system')
        if not os.path.isdir(ds):
            r['case'] = 'new'
            new_install(repo, new, c['project'], r)
        else:
            r['case'], r['base'] = 'update', design_version(ds)
            try:
                base = os.path.dirname(base_bundle(r['base']))
            except LookupError as e:
                return str(e), False
            update(repo, base, new, r)
            run(sys.executable, os.path.join(ds, 'scripts', 'tokens-css.py'))

        summary = (f"{r['case']}{' from ' + r['base'] if r['base'] else ''}: {len(r['updated'])} updated, {len(r['merged'])} merged, "
                   f"{len(r['removed'])} removed, {len(r['conflicts'])} conflicts, {len(r['rejected'])} to revert")
        changed = r['updated'] or r['merged'] or r['removed']
        if dry:
            for key in ('updated', 'merged', 'removed', 'conflicts', 'rejected', 'notes'):
                for x in r[key]:
                    print(f'    {key}: {x}')
            if '--keep' in sys.argv:
                kept = tempfile.mkdtemp(); shutil.copytree(repo, kept, dirs_exist_ok=True); print(f'    kept: {kept}')
            return ('no changes, no PR' if not changed else summary) + ' (dry run)', True
        run('git', 'add', '-A', cwd=repo)
        if run('git', 'diff', '--cached', '--quiet', cwd=repo, check=False).returncode == 0:
            return 'no changes, no PR', True
        run('git', '-c', 'user.name=zebra-design-system', '-c', 'user.email=design-system@users.noreply.github.com',
            'commit', '--quiet', '-m', f'chore(design-system): update to {version}', cwd=repo)
        run('git', 'push', '--quiet', 'origin', branch, cwd=repo)
        text = body(version, c, r, notes)
        prs = json.loads(run('gh', 'pr', 'list', '--repo', c['repo'], '--state', 'open', '--json', 'number,headRefName').stdout)
        mine = [p for p in prs if p['headRefName'] == branch]
        if mine:
            run('gh', 'pr', 'edit', str(mine[0]['number']), '--repo', c['repo'], '--body', text)
        else:
            run('gh', 'pr', 'create', '--repo', c['repo'], '--base', c['branch'], '--head', branch,
                '--title', f'Design system {version}', '--body', text)
        for p in prs:
            if p['headRefName'].startswith('zebra-design-system/') and p['headRefName'] != branch:
                run('gh', 'pr', 'close', str(p['number']), '--repo', c['repo'], '--comment', f'Superseded by design system {version}.')
        return summary, True
    finally:
        shutil.rmtree(repo, ignore_errors=True)


args = sys.argv[1:]
dry = '--dry-run' in args
notes = args[args.index('--notes') + 1] if '--notes' in args else ''
only = {a for i, a in enumerate(args) if not a.startswith('--') and (i == 0 or args[i - 1] != '--notes')}
version = design_version(ROOT)
run(sys.executable, os.path.join(ROOT, 'scripts', 'production-bundle.py'))
new = os.path.join(ROOT, 'build', 'zebra-design-system-production')
ok = True
for c in json.load(open(os.path.join(ROOT, 'consumers.json'))):
    if not only or c['tenant'] in only:
        try:
            msg, good = release(c, version, new, dry, notes)
        except (subprocess.CalledProcessError, RuntimeError) as e:
            msg, good = f'failed: {getattr(e, "stderr", e)}'.strip(), False
        ok &= good
        print(f"{c['tenant']}: {msg}")
sys.exit(0 if ok else 1)
