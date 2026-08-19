import { colorGroups } from '../tokens/colorGroups';
import './ColorSwatches.css';

export function ColorSwatches() {
  return (
    <section>
      <h2>Color tokens</h2>
      <p className="section-intro">
        Every swatch below is rendered with <code>background: var(--token-name)</code> — no
        hardcoded colors. Swap in a different palette/primitives pair and these update
        automatically.
      </p>
      {colorGroups.map((group) => (
        <div className="token-group" key={group.title}>
          <h3>{group.title}</h3>
          <p className="group-description">{group.description}</p>
          <div className="swatch-grid">
            {group.tokens.map((t) => (
              <div className="swatch" key={t.cssVar}>
                <div className="swatch-color" style={{ background: `var(${t.cssVar})` }} />
                <div className="swatch-label">{t.label}</div>
                <code className="swatch-var">{t.cssVar}</code>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
