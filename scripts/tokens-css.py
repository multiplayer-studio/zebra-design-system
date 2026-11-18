"""Regenerate tokens.css, the token CSS blocks PROTOTYPING.AGENTS.md describes. Maintainers only (needs Python 3).

Usage: python3 scripts/tokens-css.py
Reads the DESIGN.md frontmatter and the `tokens:` block of every component file, and writes tokens.css
at the repo root with every component in it. Rerun it after any change to DESIGN.md or a component's tokens.
Prototypes just link the finished file, so the people building them never run this.

It also checks the tokens and exits 1 (after writing the file) when a reference is undefined, a component
references a colour primitive or a component it doesn't compose, or two tokens share a CSS name.
AAA modes are sharp: block 8 points at --radius-none, under [data-contrast="aaa"], every component radius token that is a
shape variant (`*-radius-rounded*`, `*-radius-round`, `*-radius-full*`) or a plain corner (any radius except radius-pill).
Meaningful circles (radio, switch, avatar, dots) reference radius-pill under a non-shape name, so they stay round.
Theme modes in the frontmatter list only the keys they override (BASE names what each overrides); the light, dark and
AAA blocks are written out in full, merged onto their base. Each Companion block (6a-6d) sets every key any Companion
mode overrides, so a Companion AA override never leaks into Companion AAA. Their selectors use :is() so each block has one
specificity: AAA (0,3,0) beats AA (0,2,0), and dark beats light by coming later.
"""
import re, sys, os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
FONT = '"IBM Plex Sans", sans-serif'
MONO = '"IBM Plex Mono", monospace'
REF = re.compile(r"^'?\{([a-z0-9-]+)\.([a-z0-9-]+)\}'?$")
SHAPE = re.compile(r'-radius-(rounded|round|full)(-|$)')  # shape-variant tokens that go sharp in AAA
MODES = ['colors', 'colors-dark', 'colors-aaa', 'colors-aaa-dark', 'colors-companion', 'colors-companion-dark', 'colors-companion-aaa', 'colors-companion-aaa-dark']
BASE = {'colors-dark': 'colors', 'colors-aaa': 'colors', 'colors-aaa-dark': 'colors-dark', 'colors-companion': 'colors', 'colors-companion-dark': 'colors-dark', 'colors-companion-aaa': 'colors-aaa', 'colors-companion-aaa-dark': 'colors-aaa-dark'}
COMPANION = '[data-brand="companion"], [data-brand="companion"] [data-theme="light"]'
COMPANION_DARK = '[data-brand="companion"][data-theme="dark"], [data-brand="companion"] [data-theme="dark"], [data-theme="dark"] [data-brand="companion"]'
PLAIN = ['primitives', 'space', 'control', 'radius', 'stroke', 'container', 'shadow', 'font-weight', 'motion', 'opacity', 'component-sizes']

def val(raw):
    raw = raw.strip()
    if raw[:1] in "'\"":
        q = raw[0]; return raw[1:raw.index(q, 1)]
    return raw.split(' #')[0].strip()

def parse_front(path):
    text = open(path).read().split('\n---\n')[0]
    groups, cur = {}, None
    for line in text.splitlines():
        if re.match(r'^[a-z-]+:', line):
            cur = line.split(':')[0]; groups[cur] = {}
        elif cur and re.match(r'^  [a-z0-9-]+:', line):
            k, v = line.strip().split(':', 1); groups[cur][k] = v.strip()
    return groups

def main():
    g = parse_front(os.path.join(ROOT, 'DESIGN.md'))
    errors, names = [], {}

    def css(k, v, where):
        if k in names and names[k] != where: errors.append(f'--{k} defined in both {names[k]} and {where}')
        names.setdefault(k, where)
        m = REF.match(v.strip())
        return f'  --{k}: var(--{m[2]});' if m else f'  --{k}: {val(v)};'

    def typo(v):
        if 'alias' in v: return f'var(--{re.search(r"alias: ([a-z0-9-]+)", v).group(1)})'
        m = dict(re.findall(r"(\w+): '?([^,'}]+)'?", v))
        return f"{m['fontWeight']} {m['fontSize'].strip()}/{m['lineHeight'].strip()} {MONO if 'Mono' in m.get('fontFamily', '') else FONT}"

    root = []
    for grp in PLAIN: root += [css(k, v, grp) for k, v in g[grp].items()]
    root += [css(k, v, 'layout') for k, v in g['layout'].items() if re.fullmatch(r'[\d.]+(px)?', val(v))]  # px sizes and unitless counts (grid columns)
    root += [f'  --{k}: {typo(v)};' for k, v in g['typography'].items()]
    for k in g['typography']: names.setdefault(k, 'typography')
    for m in MODES: g.setdefault(m, {})  # an older DESIGN.md (e.g. a tenant's copy) may lack a mode: no overrides
    full = {'colors': g['colors']}  # each mode merged onto its base, in colors key order
    for m in MODES[1:]:
        if set(g[m]) - set(g['colors']): errors.append(f'{m} overrides keys colors does not have: {sorted(set(g[m]) - set(g["colors"]))}')
        full[m] = {**full[BASE[m]], **g[m]}
    modes = {m: [css(k, v, 'colors') for k, v in full[m].items()] for m in MODES[:4]}
    union = [k for k in g['colors'] if any(k in g[m] for m in MODES[4:])]  # every key some Companion mode overrides
    modes.update({m: [css(k, full[m][k], 'colors') for k in union] for m in MODES[4:]})

    # semantic references must land on a defined key in the named group
    for grp in PLAIN + MODES:
        for k, v in g[grp].items():
            m = REF.match(v.strip())
            if m and m[2] not in g.get(m[1], {}): errors.append(f'DESIGN.md {grp}.{k}: undefined {{{m[1]}.{m[2]}}}')

    # component tokens, following composes all the way down
    files = {os.path.basename(p)[:-3]: os.path.join(ROOT, d, p) for d in ('atoms', 'molecules', 'organisms') for p in os.listdir(os.path.join(ROOT, d)) if p.endswith('.md')}
    seen, order, own = set(), [], {}
    def visit(name):
        if name in seen: return
        seen.add(name); fm = open(files[name]).read().split('\n---\n')[0]
        kids = re.findall(r'([a-z0-9-]+)\.md', re.search(r'composes: \[(.*)\]', fm).group(1))
        for child in kids:
            if child in files: visit(child)
            else: errors.append(f'{name}: composes missing file {child}.md')
        order.append((name, fm, kids))
    for name in sorted(files): visit(name)  # every component; composed children are visited first
    for name, fm, _ in order: own[name] = set(re.findall(r"^  ([a-z0-9-]+):", fm.split('\ntokens:', 1)[-1], re.M))
    comp, sharp = [], []
    for name, fm, kids in order:
        comp.append(f'  /* {name} */')
        for k, grp, ref in re.findall(r"^  ([a-z0-9-]+): '\{([a-z0-9-]+)\.([a-z0-9-]+)\}'", fm, re.M):
            if grp in MODES[1:] or (grp == 'primitives' and not ref.startswith('scale-')):
                errors.append(f'{name}.{k}: components may not reference {grp}.{ref} (only primitives scale-* steps)')
            elif grp in files:
                if grp != name and grp not in kids: errors.append(f'{name}.{k}: references {grp}, which it does not compose')
                elif ref not in own[grp]: errors.append(f'{name}.{k}: undefined {{{grp}.{ref}}}')
            elif ref not in g.get(grp, {}): errors.append(f'{name}.{k}: undefined {{{grp}.{ref}}}')
            if k in names: errors.append(f'--{k} defined in both {names[k]} and {name}')
            names.setdefault(k, name)
            comp.append(f'  --{k}: var(--{ref});')
            if '-radius' in k and (SHAPE.search(k) or (grp == 'radius' and ref not in ('radius-none', 'radius-pill'))): sharp.append(k)

    out = '\n'.join([
      ':root {  /* 1. primitives, light colours (AA) + every non-colour token */', *root, *modes['colors'], '}',
      '[data-theme="dark"] {  /* 2. dark */', *modes['colors-dark'], '}',
      '[data-contrast="aaa"] {  /* 3. AAA contrast (light) */', *modes['colors-aaa'], '}',
      '[data-theme="light"] {  /* 4. light inside a dark area */', *modes['colors'], '}',
      '[data-contrast="aaa"] [data-theme="light"], [data-theme="light"][data-contrast="aaa"] {  /* 5. AAA light inside a dark area */', *modes['colors-aaa'], '}',
      '[data-contrast="aaa"] [data-theme="dark"], [data-theme="dark"] [data-contrast="aaa"], [data-theme="dark"][data-contrast="aaa"] {  /* 6. AAA dark */', *modes['colors-aaa-dark'], '}',
      f':is({COMPANION}) {{  /* 6a. Companion (light) */', *modes['colors-companion'], '}',
      f':is({COMPANION_DARK}) {{  /* 6b. Companion dark */', *modes['colors-companion-dark'], '}',
      f'[data-contrast="aaa"]:is({COMPANION}), [data-contrast="aaa"] :is({COMPANION}) {{  /* 6c. Companion AAA (light) */', *modes['colors-companion-aaa'], '}',
      f'[data-contrast="aaa"]:is({COMPANION_DARK}), [data-contrast="aaa"] :is({COMPANION_DARK}) {{  /* 6d. Companion AAA dark */', *modes['colors-companion-aaa-dark'], '}',
      ':root, [data-theme], [data-contrast], [data-brand] {  /* 7. component tokens: ' + ', '.join(n for n, _, _ in order) + ' */', *comp, '}',
      '[data-contrast="aaa"], [data-contrast="aaa"] [data-theme] {  /* 8. AAA is always sharp: shape tokens → radius-none */',
      *[f'  --{k}: var(--radius-none);' for k in sharp], '}'])
    with open(os.path.join(ROOT, 'tokens.css'), 'w') as f:
        f.write('/* Generated by scripts/tokens-css.py from DESIGN.md and the component files. Do not edit by hand. */\n' + out + '\n')
    print(f'tokens.css: {len(order)} components, {out.count(chr(10))} lines')
    if errors:
        print(f'{len(errors)} token error(s):', *errors, sep='\n  ', file=sys.stderr); sys.exit(1)


if __name__ == '__main__':  # importable, so scripts/_tenants.py can reuse parse_front and val
    main()
