"""Bundle the prototyping kits: the generic zebra-design-system-prototyping.zip, the testing kit
zebra-design-system-prototyping-testing.zip, plus one zebra-design-system-prototyping-<project>.zip per
templates/<project>/ folder. Maintainers only (Python 3, stdlib).

Usage: python3 scripts/prototyping-zip.py              every kit; deletes project zips whose templates/<project>/ is gone
       python3 scripts/prototyping-zip.py <project>    only that project's kit (the nightly tenants sync runs this)

Each zip holds one folder, zebra-design-system-prototyping[-<project>]/, with:
  atoms/ molecules/ organisms/ prototypes/  as-is
  .claude/skills/                            PROTOTYPING.SKILLS/ (create-template)
  templates/                                 empty (generic kit), or templates/<project>/ flattened (project kit)
  DESIGN.md PROTOTYPING.AGENTS.md PROTOTYPING.JIRA.md PROTOTYPING.GITHUB.md PROTOTYPING.FIGMA.md icons.json tokens.css   as-is
  CLAUDE.md                                  PROTOTYPING.CLAUDE.md
  README.md                                  copied from PROTOTYPING.README.md
  github.json                                project kit only: its repo, branch and design-system path from consumers.json
The testing kit is the generic kit plus PROTOTYPING.TESTING.md and the scripts that regenerate tokens.css and the
starter (TESTING_SCRIPTS), since testers may edit the docs; PROTOTYPING.TESTING.md is imported at the end of its PROTOTYPING.AGENTS.md, with
PROTOTYPING.TESTING.README.md appended to its README.md. 'testing' is therefore a reserved project name.
"""
import glob, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _bundle import ROOT, entries, read_claude, write_zip

NAME = 'zebra-design-system-prototyping'
CONSUMERS = {c['project']: c for c in json.load(open(os.path.join(ROOT, 'consumers.json')))}


TESTING = 'testing'
TESTING_SCRIPTS = ['scripts/tokens-css.py', 'scripts/starter-html.py', 'scripts/_bundle.py']  # Claude regenerates after doc edits


def kit(project=None):
    name = f'{NAME}-{project}' if project else NAME
    testing = project == TESTING
    templates = [(f'templates/{project}', 'templates')] if project and not testing else []
    items = entries(['atoms', 'molecules', 'organisms', 'prototypes', ('PROTOTYPING.SKILLS', '.claude/skills'), *templates],
                    ['DESIGN.md', *([] if testing else ['PROTOTYPING.AGENTS.md']), 'PROTOTYPING.JIRA.md', 'PROTOTYPING.GITHUB.md', 'PROTOTYPING.FIGMA.md',
                     'icons.json', 'tokens.css', *(['PROTOTYPING.TESTING.md', *TESTING_SCRIPTS] if testing else [])],
                    {} if testing else {'PROTOTYPING.README.md': 'README.md'})
    c = CONSUMERS.get(project)
    extra = {'github.json': json.dumps({'repo': c['repo'], 'branch': c['branch'], 'path': c.get('path', 'design-system')}, indent=2) + '\n'} if c else {}
    if testing:
        extra['PROTOTYPING.AGENTS.md'] = read_claude('PROTOTYPING.AGENTS.md').rstrip('\n') + '\n\n@PROTOTYPING.TESTING.md\n'
        extra['README.md'] = read_claude('PROTOTYPING.README.md').rstrip('\n') + '\n' + read_claude('PROTOTYPING.TESTING.README.md')
    write_zip(f'{name}.zip', name, items + ([] if templates else [(None, 'templates')]), read_claude('PROTOTYPING.CLAUDE.md'), extra=extra)


TEMPLATES = os.path.join(ROOT, 'templates')  # may be missing: git doesn't keep an empty folder
projects = sorted(d for d in os.listdir(TEMPLATES) if os.path.isdir(os.path.join(TEMPLATES, d))) if os.path.isdir(TEMPLATES) else []
if TESTING in projects:
    sys.exit(f"templates/{TESTING}/: '{TESTING}' is reserved for the testing kit; rename the project in consumers.json")
if len(sys.argv) > 1:
    project = sys.argv[1]
    if project in projects:
        kit(project)
    elif os.path.exists(os.path.join(ROOT, f'{NAME}-{project}.zip')):  # its templates are gone
        os.remove(os.path.join(ROOT, f'{NAME}-{project}.zip'))
        print(f'Removed {NAME}-{project}.zip')
    else:
        sys.exit(f'no templates/{project}/ folder')
else:
    kit()
    kit(TESTING)
    for project in projects:
        kit(project)
    for path in glob.glob(os.path.join(ROOT, f'{NAME}-*.zip')):
        if os.path.basename(path)[len(NAME) + 1:-4] not in projects + [TESTING]:
            os.remove(path)
            print(f'Removed {os.path.basename(path)}')
