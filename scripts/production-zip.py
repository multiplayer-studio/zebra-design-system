"""Bundle the design system for a project repo into zebra-design-system-production.zip at the repo root. Maintainers only (Python 3, stdlib).

Usage: python3 scripts/production-zip.py

The zip holds zebra-design-system-production/, containing one folder, design-system/ (the name AGENTS.md's Setup expects), with:
  atoms/ molecules/ organisms/ templates/    as-is
  DESIGN.md AGENTS.md icons.json tokens.css  as-is
  scripts/tokens-css.py scripts/icons-json.py   the generators AGENTS.md asks projects to keep
  CLAUDE.md                                  PRODUCTION.CLAUDE.md with only the production-builds section
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _bundle import claude_md, write_zip

write_zip(
    'zebra-design-system-production.zip', 'zebra-design-system-production/design-system',
    ['atoms', 'molecules', 'organisms', 'templates'],
    ['DESIGN.md', 'AGENTS.md', 'icons.json', 'tokens.css', 'scripts/tokens-css.py', 'scripts/icons-json.py'],
    {},
    claude_md('@AGENTS.md'),
)
