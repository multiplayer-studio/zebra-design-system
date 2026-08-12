import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// The default theme, fully resolved — this is the "just import it and go" path.

import 'zebra-design-system-tokens/css/colors'
import 'zebra-design-system-tokens/css/sizes';

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
