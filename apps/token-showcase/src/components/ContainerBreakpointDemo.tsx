import { useEffect, useState } from 'react';

function readContainerDefault(): string {
  return getComputedStyle(document.documentElement).getPropertyValue('--container-default').trim();
}

// --container-default (and other size tokens) change value at each breakpoint
// defined in sizes.css (768px / 1024px / 1440px). This re-reads the resolved
// CSS variable on resize to prove it's genuinely responsive, not just a static number.
export function ContainerBreakpointDemo() {
  const [value, setValue] = useState(readContainerDefault);

  useEffect(() => {
    const onResize = () => setValue(readContainerDefault());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="container-demo">
      <div className="container-demo-box">
        <code>--container-default: {value}</code>
      </div>
      <p className="section-intro">
        Resize the window — this box's <code>max-width</code> is{' '}
        <code>calc(var(--container-default) * 1px)</code>, and the resolved value jumps at the
        768px, 1024px, and 1440px breakpoints defined in <code>sizes.css</code>.
      </p>
    </div>
  );
}
