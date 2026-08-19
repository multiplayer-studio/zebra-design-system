import {
  labelTypography,
  bodyTypography,
  displayTypography,
  headingTypography,
  titleTypography,
  type TypographyToken,
} from '../tokens/typographyGroups';
import './TypographyShowcase.css';

function TypographySample({ token }: { token: TypographyToken }) {
  const combinedVar = `--${token.type}-${token.size}`;

  return (
    <div className="typography-sample">
      <div
        className="typography-preview"
        style={{
          fontFamily: `var(${combinedVar}-fontfamily)`,
          fontSize: `var(${combinedVar}-fontsize)`,
          fontWeight: `var(${combinedVar}-fontweight)`,
          lineHeight: `var(${combinedVar}-lineheight)`,
          letterSpacing: `var(${combinedVar}-letterspacing)`,
        }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
      <div className="typography-tokens">
        <code>{combinedVar}-fontfamily</code>
        <code>{combinedVar}-fontsize</code>
        <code>{combinedVar}-fontweight</code>
        <code>{combinedVar}-lineheight</code>
        <code>{combinedVar}-letterspacing</code>
      </div>
    </div>
  );
}

function TypographyGroup({
  title,
  tokens,
}: {
  title: string;
  tokens: TypographyToken[];
}) {
  return (
    <div className="token-group">
      <h3>{title}</h3>
      <div className="typography-grid">
        {tokens.map((token) => (
          <TypographySample
            key={`${token.type}-${token.size}`}
            token={token}
          />
        ))}
      </div>
    </div>
  );
}

export function TypographyShowcase() {
  return (
    <section>
      <h2>Typography tokens</h2>
      <p className="section-intro">
        Typography tokens combine font family, size, weight, line height, and letter spacing — all
        values are design tokens, not hardcoded.
      </p>

      <TypographyGroup title="Label" tokens={labelTypography} />
      <TypographyGroup title="Body" tokens={bodyTypography} />
      <TypographyGroup title="Title" tokens={titleTypography} />
      <TypographyGroup title="Heading" tokens={headingTypography} />
      <TypographyGroup title="Display" tokens={displayTypography} />
    </section>
  );
}
