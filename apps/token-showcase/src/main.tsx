import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'zebra-design-system-tokens/css/colors';
import 'zebra-design-system-tokens/css/sizes';
import 'zebra-design-system-tokens/css/typography';

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
