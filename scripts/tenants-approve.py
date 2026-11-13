"""Record the DS team's sprint decision on a tenant difference. Maintainers only (Python 3 stdlib).

Usage: python3 scripts/tenants-approve.py <tenant> <key-or-path> [<key-or-path> ...] [--reject | --undo]
  <key-or-path> as listed in tenants/<tenant>/changelog.md: a token key (DESIGN.md:primitives.color-blue-60)
  or a file (molecules/banner.md). A trailing * matches a prefix (DESIGN.md:primitives.*).
  default   approve: the difference is allowed to stay; the nightly sync stops flagging it while it still matches
  --reject  reject: the next release PR asks the repo to revert it
  --undo    forget the decision: back to "needs review"
Adopting a change needs no command: edit the master docs; the difference disappears after the repo merges the release.
"""
import fnmatch, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _tenants import load_tenant, save_tenant, value

args = [a for a in sys.argv[1:] if not a.startswith('--')]
flags = {a for a in sys.argv[1:] if a.startswith('--')}
if len(args) < 2 or flags - {'--reject', '--undo'}:
    sys.exit(__doc__)
name, patterns = args[0], args[1:]
tenant = load_tenant(name) or sys.exit(f'no tenant {name} (tenants/{name}/tenant.json)')

hits = [(kind, key) for kind in ('tokens', 'files') for key in tenant['differences'][kind]
        if any(fnmatch.fnmatchcase(key, p) for p in patterns)]
if not hits:
    sys.exit(f'nothing in tenants/{name}/changelog.md matches {" ".join(patterns)}')
for kind, key in hits:
    for decision in ('approved', 'rejected'):
        tenant[decision][kind].pop(key, None)
    if '--undo' not in flags:
        tenant['rejected' if '--reject' in flags else 'approved'][kind][key] = value(tenant, kind, key)
    print(f"{'undone' if '--undo' in flags else 'rejected' if '--reject' in flags else 'approved'}: {key}")
save_tenant(name, tenant)
