"""Bundle the prototyping kit into zebra-design-system-prototyping.zip at the repo root. Maintainers only (Python 3, stdlib).

Usage: python3 scripts/prototyping-zip.py

The zip holds one folder, zebra-design-system-prototyping/, with:
  atoms/ molecules/ organisms/ prototypes/ templates/ .claude/skills/   as-is
  DESIGN.md PROTOTYPING.AGENTS.md PROTOTYPING.JIRA.md PROTOTYPING.FIGMA.md icons.json tokens.css   as-is
  CLAUDE.md                                  PROTOTYPING.CLAUDE.md
  README.md                                  copied from PROTOTYPING.README.md
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _bundle import read_claude, write_zip

write_zip(
    'zebra-design-system-prototyping.zip', 'zebra-design-system-prototyping',
    ['atoms', 'molecules', 'organisms', 'prototypes', 'templates', '.claude/skills'],
    ['DESIGN.md', 'PROTOTYPING.AGENTS.md', 'PROTOTYPING.JIRA.md', 'PROTOTYPING.FIGMA.md', 'icons.json', 'tokens.css'],
    {'PROTOTYPING.README.md': 'README.md'},
    read_claude('PROTOTYPING.CLAUDE.md'),
)
