"""Bundle the design system for a project repo into build/zebra-design-system-production/. Maintainers and CI only (Python 3, stdlib).

Usage: python3 scripts/production-bundle.py [out-dir]     (default: build, gitignored)

The release workflow (scripts/release.py) runs this and opens a PR with the result on every repo in consumers.json.
The folder holds zebra-design-system-production/, containing:
  CLAUDE.md                                  PRODUCTION.CLAUDE.md, importing @design-system/AGENTS.md;
                                             goes at the project root
  .claude/skills/                            PRODUCTION.SKILLS/ (design-system-init), also at the project root
  design-system/                             (release.py moves it to the repo's consumers.json path, if set), with:
  atoms/ molecules/ organisms/               as-is
  templates/universal/                       templates/universal/ (master's universal templates); release.py adds
                                             the project's own templates flat in templates/
  DESIGN.md icons.json tokens.css            as-is
  AGENTS.md                                  PRODUCTION.AGENTS.md, renamed
  LIBRARY.md                                 PRODUCTION.LIBRARY.md, renamed: the template the project fills in
  CHANGES.md                                 PRODUCTION.CHANGES.md, renamed, with the DESIGN.md version filled in: the project's log
  scripts/tokens-css.py scripts/icons-json.py   the generators AGENTS.md asks projects to keep
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _bundle import ROOT, entries, read_claude, write_dir
from _tenants import design_version

write_dir(
    sys.argv[1] if len(sys.argv) > 1 else 'build', 'zebra-design-system-production/design-system',
    entries(['atoms', 'molecules', 'organisms', 'templates/universal', ('PRODUCTION.SKILLS', '../.claude/skills')],
            ['DESIGN.md', 'icons.json', 'tokens.css', 'scripts/tokens-css.py', 'scripts/icons-json.py'],
            {'PRODUCTION.AGENTS.md': 'AGENTS.md', 'PRODUCTION.LIBRARY.md': 'LIBRARY.md'}),
    read_claude('PRODUCTION.CLAUDE.md').replace('@PRODUCTION.AGENTS.md', '@design-system/AGENTS.md'),
    claude_dir='zebra-design-system-production',
    extra={'CHANGES.md': read_claude('PRODUCTION.CHANGES.md').replace('<version from DESIGN.md>', design_version(ROOT))},
)
