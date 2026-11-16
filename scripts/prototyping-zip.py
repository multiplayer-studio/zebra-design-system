"""Bundle the prototyping kits into prototyping-kits/: the generic zebra-design-system-prototyping.zip, the testing kit
zebra-design-system-prototyping-testing.zip, plus one zebra-design-system-prototyping-<project>.zip per consumers.json
project that has templates/<project>/ or an open tenant (tenants/<tenant>/). Maintainers only (Python 3, stdlib).

Usage: python3 scripts/prototyping-zip.py              every kit; deletes project zips with neither templates nor a tenant
       python3 scripts/prototyping-zip.py <project>    only that project's kit (the nightly tenants sync runs this)

Each zip holds one folder, zebra-design-system-prototyping[-<project>]/, with:
  atoms/ molecules/ organisms/ prototypes/  as-is
  .claude/skills/                            PROTOTYPING.SKILLS/ (create-template)
  templates/                                 empty (generic kit), or templates/<project>/ flattened (project kit)
  DESIGN.md PROTOTYPING.AGENTS.md PROTOTYPING.JIRA.md PROTOTYPING.GITHUB.md PROTOTYPING.FIGMA.md icons.json tokens.css   as-is
  CLAUDE.md                                  PROTOTYPING.CLAUDE.md
  README.md                                  copied from PROTOTYPING.README.md
  github.json                                project kit only: its repo, branch and design-system path from consumers.json
A project kit whose project has a tenant is that tenant's view of the system: its DESIGN.md and component docs from
tenants/<tenant>/files/ replace (or add to) master's, files it deleted are left out, and tokens.css and the starter
and showcase are regenerated from the result (warns, but still writes, when tokens-css.py finds a token error).
The testing kit is the generic kit plus PROTOTYPING.TESTING.md and the scripts that regenerate tokens.css and the
starter (TESTING_SCRIPTS), since testers may edit the docs; PROTOTYPING.TESTING.md is imported at the end of its PROTOTYPING.AGENTS.md, with
PROTOTYPING.TESTING.README.md appended to its README.md. 'testing' is therefore a reserved project name.
"""
import contextlib, glob, io, json, os, shutil, subprocess, sys, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _bundle import ROOT, entries, read_claude, write_dir, write_zip

NAME = 'zebra-design-system-prototyping'
OUT = os.path.join(ROOT, 'prototyping-kits')
CONSUMERS = {c['project']: c for c in json.load(open(os.path.join(ROOT, 'consumers.json')))}


TESTING = 'testing'
TESTING_SCRIPTS = ['scripts/tokens-css.py', 'scripts/starter-html.py', 'scripts/_bundle.py']  # Claude regenerates after doc edits
DOCS = ('DESIGN.md', 'atoms/', 'molecules/', 'organisms/')  # the tenant files a kit takes; the rest are production-only


def tenant_dir(project):
    c = CONSUMERS.get(project)
    d = c and os.path.join(ROOT, 'tenants', c['tenant'])
    return d if d and os.path.isdir(d) else None


def tenant_kit(out, name, items, claude, extra, tenant):
    """Overlay the tenant's docs on items, regenerate tokens.css and the starter in a temp copy, and zip that."""
    files = os.path.join(tenant, 'files')
    ours = {os.path.relpath(os.path.join(d, n), files): os.path.join(d, n) for d, _, ns in os.walk(files) for n in ns}
    ours = {rel: path for rel, path in ours.items() if rel.startswith(DOCS)}
    deleted = {k for k, d in json.load(open(os.path.join(tenant, 'tenant.json')))['differences']['files'].items() if d['status'] == 'deleted'}
    items = [(s, d) for s, d in items if d not in ours and d not in deleted] + [(path, rel) for rel, path in sorted(ours.items())]
    tmp = tempfile.mkdtemp()
    try:
        with contextlib.redirect_stdout(io.StringIO()):
            write_dir(tmp, name, items + [(os.path.join(ROOT, s), s) for s in TESTING_SCRIPTS], claude, extra=extra)
        for script in ('tokens-css.py', 'starter-html.py'):
            r = subprocess.run([sys.executable, os.path.join(tmp, name, 'scripts', script)], capture_output=True, text=True)
            if r.returncode:
                print(f'warning: {name}: {script} reported:\n{r.stdout}{r.stderr}', file=sys.stderr)
        shutil.rmtree(os.path.join(tmp, name, 'scripts'))
        shutil.make_archive(os.path.join(ROOT, out[:-4]), 'zip', tmp, name)
    finally:
        shutil.rmtree(tmp)
    print(f'Wrote {out}')


def kit(project=None):
    name = f'{NAME}-{project}' if project else NAME
    testing = project == TESTING
    templates = [(f'templates/{project}', 'templates')] if project and not testing and os.path.isdir(os.path.join(ROOT, 'templates', project)) else []
    items = entries(['atoms', 'molecules', 'organisms', 'prototypes', ('PROTOTYPING.SKILLS', '.claude/skills'), *templates],
                    ['DESIGN.md', *([] if testing else ['PROTOTYPING.AGENTS.md']), 'PROTOTYPING.JIRA.md', 'PROTOTYPING.GITHUB.md', 'PROTOTYPING.FIGMA.md',
                     'icons.json', 'tokens.css', *(['PROTOTYPING.TESTING.md', *TESTING_SCRIPTS] if testing else [])],
                    {} if testing else {'PROTOTYPING.README.md': 'README.md'})
    c = CONSUMERS.get(project)
    extra = {'github.json': json.dumps({'repo': c['repo'], 'branch': c['branch'], 'path': c.get('path', 'design-system')}, indent=2) + '\n'} if c else {}
    if testing:
        extra['PROTOTYPING.AGENTS.md'] = read_claude('PROTOTYPING.AGENTS.md').rstrip('\n') + '\n\n@PROTOTYPING.TESTING.md\n'
        extra['README.md'] = read_claude('PROTOTYPING.README.md').rstrip('\n') + '\n' + read_claude('PROTOTYPING.TESTING.README.md')
    items += [] if templates else [(None, 'templates')]
    os.makedirs(OUT, exist_ok=True)
    out, tenant = os.path.join(os.path.relpath(OUT, ROOT), f'{name}.zip'), tenant_dir(project)
    if tenant:
        tenant_kit(out, name, items, read_claude('PROTOTYPING.CLAUDE.md'), extra, tenant)
    else:
        write_zip(out, name, items, read_claude('PROTOTYPING.CLAUDE.md'), extra=extra)


TEMPLATES = os.path.join(ROOT, 'templates')  # may be missing: git doesn't keep an empty folder
projects = sorted(({d for d in os.listdir(TEMPLATES) if os.path.isdir(os.path.join(TEMPLATES, d))} if os.path.isdir(TEMPLATES) else set())
                  | {p for p in CONSUMERS if tenant_dir(p)})
if TESTING in projects:
    sys.exit(f"'{TESTING}' is reserved for the testing kit; rename the project in consumers.json")
if len(sys.argv) > 1:
    project = sys.argv[1]
    if project in projects:
        kit(project)
    elif os.path.exists(os.path.join(OUT, f'{NAME}-{project}.zip')):  # its templates and tenant are gone
        os.remove(os.path.join(OUT, f'{NAME}-{project}.zip'))
        print(f'Removed {NAME}-{project}.zip')
    else:
        sys.exit(f'no templates/{project}/ folder or tenant')
else:
    kit()
    kit(TESTING)
    for project in projects:
        kit(project)
    for path in glob.glob(os.path.join(OUT, f'{NAME}-*.zip')):
        if os.path.basename(path)[len(NAME) + 1:-4] not in projects + [TESTING]:
            os.remove(path)
            print(f'Removed {os.path.basename(path)}')
