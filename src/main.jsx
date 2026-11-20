import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Inicia el backend simulado (MSW) ANTES de mostrar la app,
// para que las primeras peticiones REST y GraphQL ya sean interceptadas.
// Como no hay un backend real, el mock también se usa en GitHub Pages.
async function habilitarMock() {
  const { worker } = await import('./mocks/browser');
  return worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: 'bypass', // fuentes, imágenes y otros archivos pasan normal
  });
}

habilitarMock().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
