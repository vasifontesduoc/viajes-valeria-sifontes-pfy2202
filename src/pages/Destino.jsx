import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { useQuery } from '@apollo/client/react';
import { useApi } from '../hooks/useApi';
import { rutas } from '../services/api';
import { VUELOS_Y_HOTELES, mensajeErrorGraphQL } from '../graphql/consultas';
import { calcularNoches } from '../utils/formato';
import Cargando from '../components/Cargando';
import TarjetasCargando from '../components/TarjetasCargando';
import MensajeError from '../components/MensajeError';
import EstadoVacio from '../components/EstadoVacio';
import OrigenDato from '../components/OrigenDato';
import TarjetaVuelo from '../components/TarjetaVuelo';
import TarjetaHotel from '../components/TarjetaHotel';
import ResumenViaje from '../components/ResumenViaje';

function Destino() {
  const { destinoId } = useParams(); // lee :destinoId de la URL

  // REST: datos del destino (país y actividades)
  const rest = useApi(rutas.destino(destinoId));

  // GraphQL: vuelos y hoteles del destino en una sola consulta (Apollo guarda la respuesta en caché)
  const graphql = useQuery(VUELOS_Y_HOTELES, {
    variables: { destinoId },
    notifyOnNetworkStatusChange: true, // muestra la carga también al reintentar
  });

  // Estado local de la planificación del viaje
  const [vueloId, setVueloId] = useState(null);
  const [hotelId, setHotelId] = useState(null);
  const [pasajeros, setPasajeros] = useState(1);
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  const vuelos = graphql.data?.vuelos ?? [];
  const hoteles = graphql.data?.hoteles ?? [];
  const vuelo = vuelos.find((v) => v.id === vueloId) ?? null;
  const hotel = hoteles.find((h) => h.id === hotelId) ?? null;
  const habitaciones = Math.ceil(pasajeros / 2); // 2 personas por habitación
  const noches = vuelo ? calcularNoches(vuelo.fechaIda, vuelo.fechaVuelta) : null;

  // ¿Por qué no se puede elegir este vuelo / hotel? ('' = sí se puede)
  const motivoVuelo = (v) => {
    if (v.asientosDisponibles === 0) return 'Vuelo agotado';
    if (v.asientosDisponibles < pasajeros) return `No alcanza para ${pasajeros} pasajeros`;
    return '';
  };
  const motivoHotel = (h) => {
    if (h.habitacionesDisponibles === 0) return 'Hotel completo';
    if (h.habitacionesDisponibles < habitaciones) return `Necesitas ${habitaciones} habitaciones`; {
      return 'No disponible para las fechas de tu vuelo';
    }
    return '';
  };

  // Al cambiar de destino, se limpia la selección anterior
  useEffect(() => {
    setVueloId(null);
    setHotelId(null);
  }, [destinoId]);

  // Si cambian los pasajeros o el vuelo, se quita lo que ya no es válido
  useEffect(() => {
    if (vuelo && motivoVuelo(vuelo)) setVueloId(null);
    if (hotel && motivoHotel(hotel)) setHotelId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pasajeros, vueloId, hotelId]);

  const vuelosVisibles = soloDisponibles ? vuelos.filter((v) => !motivoVuelo(v)) : vuelos;
  const hotelesVisibles = soloDisponibles ? hoteles.filter((h) => !motivoHotel(h)) : hoteles;

  if (rest.cargando) return <Cargando texto="Cargando destino..." />;

  if (rest.error) {
    return <MensajeError titulo="Destino no encontrado" mensaje={rest.error} onReintentar={rest.reintentar} />;
  }

  const destino = rest.datos;

  return (
    <section>
      <nav className="mb-4 text-sm text-gris" aria-label="Ruta de navegación">
        <Link to="/" className="hover:text-oceano hover:underline">
          Destinos
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-tinta">{destino.ciudad}</span>
      </nav>

      {/* Datos del destino (REST) */}
      <div className="panel mb-8">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <h1 className="titulo-pagina">
            {destino.bandera} {destino.ciudad}
          </h1>
          <OrigenDato tipo="REST" detalle="GET /api/destinos/:id" />
        </div>
        <p className="mb-1 text-lg text-gris">{destino.pais}</p>
        <p className="mb-4">{destino.descripcion}</p>
        <h2 className="mb-2 font-semibold">Actividades populares</h2>
        <ul className="flex flex-wrap gap-2">
          {destino.actividades.map((actividad) => (
            <li key={actividad} className="etiqueta">
              {actividad}
            </li>
          ))}
        </ul>
      </div>

      {/* Controles de la búsqueda */}
      <div className="mb-6 flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 font-medium">
          Pasajeros
          <select
            value={pasajeros}
            onChange={(e) => setPasajeros(Number(e.target.value))}
            className="rounded-xl border-2 border-borde bg-white px-3 py-2 focus:border-oceano focus:outline-none"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={soloDisponibles}
            onChange={(e) => setSoloDisponibles(e.target.checked)}
            className="h-5 w-5 accent-oceano"
          />
          Mostrar solo opciones disponibles
        </label>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {graphql.loading && (
            <>
              <TarjetasCargando cantidad={2} columnas="grid-cols-1" />
              <TarjetasCargando cantidad={2} columnas="grid-cols-1" />
            </>
          )}

          {!graphql.loading && graphql.error && (
            <MensajeError
              titulo="No pudimos cargar vuelos y hoteles"
              mensaje={mensajeErrorGraphQL(graphql.error)}
              onReintentar={() => graphql.refetch()}
            />
          )}

          {!graphql.loading && graphql.data && (
            <>
              {/* Vuelos (GraphQL) */}
              <div>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="titulo-seccion">✈️ Vuelos</h2>
                  <OrigenDato tipo="GraphQL" detalle="query VuelosYHoteles" />
                </div>
                {vuelosVisibles.length === 0 ? (
                  <EstadoVacio
                    icono="🛫"
                    titulo="No hay vuelos disponibles"
                    mensaje={
                      vuelos.length === 0
                        ? `Por ahora no tenemos vuelos hacia ${destino.ciudad}.`
                        : 'Ningún vuelo tiene cupos para tu búsqueda. Prueba con menos pasajeros.'
                    }
                  />
                ) : (
                  <div className="space-y-4">
                    {vuelosVisibles.map((v) => (
                      <TarjetaVuelo
                        key={v.id}
                        vuelo={v}
                        seleccionado={v.id === vueloId}
                        deshabilitado={Boolean(motivoVuelo(v))}
                        motivo={motivoVuelo(v)}
                        onSeleccionar={() => setVueloId(v.id === vueloId ? null : v.id)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Hoteles (GraphQL) */}
              <div>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="titulo-seccion">🏨 Hoteles</h2>
                  <OrigenDato tipo="GraphQL" detalle="query VuelosYHoteles" />
                </div>
                {hotelesVisibles.length === 0 ? (
                  <EstadoVacio
                    icono="🏨"
                    titulo="No hay hoteles disponibles"
                    mensaje="Ningún hotel tiene disponibilidad para tu búsqueda."
                  />
                ) : (
                  <div className="space-y-4">
                    {hotelesVisibles.map((h) => (
                      <TarjetaHotel
                        key={h.id}
                        hotel={h}
                        seleccionado={h.id === hotelId}
                        deshabilitado={Boolean(motivoHotel(h))}
                        motivo={motivoHotel(h)}
                        onSeleccionar={() => setHotelId(h.id === hotelId ? null : h.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <ResumenViaje
          destino={destino}
          vuelo={vuelo}
          hotel={hotel}
          pasajeros={pasajeros}
          habitaciones={habitaciones}
          noches={noches}
          onLimpiar={() => {
            setVueloId(null);
            setHotelId(null);
          }}
        />
      </div>
    </section>
  );
}

export default Destino;
