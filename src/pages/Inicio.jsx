import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { rutas } from '../services/api';
import { normalizar } from '../utils/normalizar';
import TarjetasCargando from '../components/TarjetasCargando';
import MensajeError from '../components/MensajeError';
import EstadoVacio from '../components/EstadoVacio';
import TarjetaDestino from '../components/TarjetaDestino';
import OrigenDato from '../components/OrigenDato';

function Inicio() {
  // REST: GET /api/destinos (si ya se pidió antes, se usa la caché)
  const { datos: destinos, cargando, error, reintentar } = useApi(rutas.destinos());
  const [busqueda, setBusqueda] = useState('');

  const texto = normalizar(busqueda);
  const filtrados = (destinos ?? []).filter(
    (d) =>
      normalizar(d.ciudad).includes(texto) ||
      normalizar(d.pais).includes(texto) ||
      d.actividades.some((a) => normalizar(a).includes(texto))
  );

  return (
    <section>
      <div className="mb-10 rounded-3xl bg-gradient-to-br from-terracota-claro to-mostaza-claro px-6 py-12 text-center sm:px-10">
        <h1 className="titulo-pagina mb-3">¿A dónde quieres viajar?</h1>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-gris">
          Elige un destino y arma tu viaje con el vuelo y el hotel que más te acomoden.
        </p>
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Busca por ciudad, país o actividad..."
          aria-label="Buscar destinos"
          className="w-full max-w-xl rounded-full border-2 border-white bg-white px-5 py-3 shadow-suave focus:border-terracota focus:outline-none"
        />
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="titulo-seccion">Destinos disponibles</h2>
        <OrigenDato tipo="REST" detalle="GET /api/destinos" />
      </div>

      {cargando && <TarjetasCargando cantidad={6} />}

      {error && <MensajeError mensaje={error} onReintentar={reintentar} />}

      {destinos && filtrados.length === 0 && (
        <EstadoVacio
          icono="🔍"
          titulo="No encontramos destinos"
          mensaje={`No hay destinos que coincidan con "${busqueda}". Prueba con otra palabra.`}
        />
      )}

      {filtrados.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((destino) => (
            <TarjetaDestino key={destino.id} destino={destino} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Inicio;
