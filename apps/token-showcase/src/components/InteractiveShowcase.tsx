import './InteractiveShowcase.css';

const variants = [
  'primary',
  'secondary',
  'destructive',
  'ghost',
  'subtle',
  'positive',
  'neutral',
  'inverse',
];

export function InteractiveShowcase() {
  return (
    <section>
      <h2>Interactive tokens</h2>
      <p className="section-intro">
        These aren't swatches — they're real buttons. Each variant's default/hover/pressed/
        disabled colors come straight from the matching{' '}
        <code>--interactive-{'{variant}'}-{'{background|foreground|border}'}-{'{state}'}</code>{' '}
        tokens. Try hovering, clicking, and tabbing to them.
      </p>
      <div className="button-row">
        {variants.map((variant) => (
          <button key={variant} className={`btn btn-${variant}`}>
            {variant}
          </button>
        ))}
      </div>
      <div className="button-row">
        {variants.map((variant) => (
          <button key={`${variant}-disabled`} className={`btn btn-${variant}`} disabled>
            {variant} (disabled)
          </button>
        ))}
      </div>
    </section>
  );
}
