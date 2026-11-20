import { lazy } from 'react';
import { Routes, Route } from 'react-router';
import Layout from '../layouts/Layout';

// Lazy loading: cada página se descarga recién cuando el usuario la visita
const Inicio = lazy(() => import('../pages/Inicio'));
const Destino = lazy(() => import('../pages/Destino'));
const ComoFunciona = lazy(() => import('../pages/ComoFunciona'));
const NoEncontrado = lazy(() => import('../pages/NoEncontrado'));

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="destinos/:destinoId" element={<Destino />} />
        <Route path="como-funciona" element={<ComoFunciona />} />
        {/* Ruta comodín: siempre al final */}
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
