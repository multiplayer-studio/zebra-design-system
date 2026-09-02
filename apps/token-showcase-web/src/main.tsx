import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'design-system-tokens/css/colors';
import 'design-system-tokens/css/sizes';
import 'design-system-tokens/css/typography';

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
