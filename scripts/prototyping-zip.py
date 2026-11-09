"""Bundle the prototyping kit into zebra-design-system-prototyping.zip at the repo root. Maintainers only (Python 3, stdlib).

Usage: python3 scripts/prototyping-zip.py

The zip holds one folder, zebra-design-system-prototyping/, with:
  atoms/ molecules/ organisms/ prototypes/ templates/ .claude/skills/   as-is
  DESIGN.md PROTOTYPE.md PROTOTYPING.JIRA.md PROTOTYPING.FIGMA.md icons.json tokens.css   as-is
  CLAUDE.md                                  PRODUCTION.CLAUDE.md with only the prototypes section
  README.md                                  copied from PROTOTYPING.README.md
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _bundle import claude_md, write_zip

write_zip(
    'zebra-design-system-prototyping.zip', 'zebra-design-system-prototyping',
    ['atoms', 'molecules', 'organisms', 'prototypes', 'templates', '.claude/skills'],
    ['DESIGN.md', 'PROTOTYPE.md', 'PROTOTYPING.JIRA.md', 'PROTOTYPING.FIGMA.md', 'icons.json', 'tokens.css'],
    {'PROTOTYPING.README.md': 'README.md'},
    claude_md('@PROTOTYPE.md'),
)
