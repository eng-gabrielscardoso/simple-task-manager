import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';
import { App } from './App.tsx'

import "./index.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-dark-amber/theme.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
)
