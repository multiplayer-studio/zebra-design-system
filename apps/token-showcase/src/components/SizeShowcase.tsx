import {
  appliedSpace,
  controlIconScale,
  controlScale,
  radiusScale,
  spaceScale,
  strokeScale,
  type SizeToken,
} from '../tokens/sizeGroups';
import { ContainerBreakpointDemo } from './ContainerBreakpointDemo';
import './SizeShowcase.css';

function SpaceBars({ tokens }: { tokens: SizeToken[] }) {
  return (
    <div className="size-list">
      {tokens.map((t) => (
        <div className="size-row" key={t.cssVar}>
          <div className="size-bar" style={{ width: `calc(var(${t.cssVar}) * 1px)` }} />
          <code>{t.cssVar}</code>
        </div>
      ))}
    </div>
  );
}

function RadiusBoxes({ tokens }: { tokens: SizeToken[] }) {
  return (
    <div className="size-swatch-row">
      {tokens.map((t) => (
        <div className="size-swatch" key={t.cssVar}>
          <div
            className="radius-box"
            style={{ borderRadius: `calc(var(${t.cssVar}) * 1px)` }}
          />
          <code>{t.cssVar}</code>
        </div>
      ))}
    </div>
  );
}

function StrokeBars({ tokens }: { tokens: SizeToken[] }) {
  return (
    <div className="size-swatch-row">
      {tokens.map((t) => (
        <div className="size-swatch" key={t.cssVar}>
          <div className="stroke-bar" style={{ height: `calc(var(${t.cssVar}) * 1px)` }} />
          <code>{t.cssVar}</code>
        </div>
      ))}
    </div>
  );
}

function ControlBoxes({ tokens }: { tokens: SizeToken[] }) {
  return (
    <div className="size-swatch-row">
      {tokens.map((t) => (
        <div className="size-swatch" key={t.cssVar}>
          <div
            className="control-box"
            style={{
              width: `calc(var(${t.cssVar}) * 1px)`,
              height: `calc(var(${t.cssVar}) * 1px)`,
            }}
          />
          <code>{t.cssVar}</code>
        </div>
      ))}
    </div>
  );
}

export function SizeShowcase() {
  return (
    <section>
      <h2>Size tokens</h2>
      <p className="section-intro">
        Size tokens are unitless numbers (e.g. <code>--space-md: 12;</code>), so consuming CSS
        multiplies by <code>1px</code> via <code>calc()</code>.
      </p>

      <div className="token-group">
        <h3>Space scale</h3>
        <SpaceBars tokens={spaceScale} />
      </div>

      <div className="token-group">
        <h3>Applied spacing</h3>
        <p className="group-description">
          Semantic aliases onto the scale above — e.g. <code>--space-page</code> is what a layout
          should actually use, not <code>--space-lg</code> directly.
        </p>
        <SpaceBars tokens={appliedSpace} />
      </div>

      <div className="token-group">
        <h3>Radius scale</h3>
        <RadiusBoxes tokens={radiusScale} />
      </div>

      <div className="token-group">
        <h3>Stroke widths</h3>
        <StrokeBars tokens={strokeScale} />
      </div>

      <div className="token-group">
        <h3>Control sizes</h3>
        <p className="group-description">Tap/click target and control heights.</p>
        <ControlBoxes tokens={controlScale} />
      </div>

      <div className="token-group">
        <h3>Control icon sizes</h3>
        <ControlBoxes tokens={controlIconScale} />
      </div>

      <div className="token-group">
        <h3>Responsive container width</h3>
        <ContainerBreakpointDemo />
      </div>
    </section>
  );
}
