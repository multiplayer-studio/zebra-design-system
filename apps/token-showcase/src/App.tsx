import { ColorSwatches } from './components/ColorSwatches';
import { InteractiveShowcase } from './components/InteractiveShowcase';
import { SizeShowcase } from './components/SizeShowcase';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Zebra Design Tokens</h1>
        <p>
          This app imports only <code>zebra-design-system-tokens/css/colors</code> and{' '}
          <code>zebra-design-system-tokens/css/sizes</code> — the fully-resolved <strong>default
          theme</strong>. Every color and size below is a design token, not a hardcoded value.
        </p>
      </header>

      <main className="app-main">
        <ColorSwatches />
        <InteractiveShowcase />
        <SizeShowcase />
      </main>

      <footer className="app-footer">
        <p>
          See <code>tooling/token-machine/README.md</code> for how these tokens are generated,
          and how to mix an alternate primitives/palette pair instead of the default theme shown
          here.
        </p>
      </footer>
    </div>
  );
}

export default App;
