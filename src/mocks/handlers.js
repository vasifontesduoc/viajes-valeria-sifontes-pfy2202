import { http, graphql, HttpResponse, delay } from 'msw';
import { destinos, vuelos, hoteles } from './datos';

// GraphQL espera que cada objeto indique su tipo con __typename
const comoVuelo = ({ destinoId, ...vuelo }) => ({ __typename: 'Vuelo', ...vuelo });
const comoHotel = ({ destinoId, ...hotel }) => ({ __typename: 'Hotel', ...hotel });

export const handlers = [
  // ───────────── REST: destinos ─────────────

  // GET /api/destinos → lista de destinos con país y actividades populares
  http.get('/api/destinos', async () => {
    await delay(800);
    return HttpResponse.json(destinos);
  }),

  // GET /api/destinos/:id → un destino (404 si no existe)
  http.get('/api/destinos/:id', async ({ params }) => {
    await delay(600);
    const destino = destinos.find((d) => d.id === params.id);
    if (!destino) {
      return HttpResponse.json({ mensaje: `El destino "${params.id}" no existe.` }, { status: 404 });
    }
    return HttpResponse.json(destino);
  }),

  // GET /api/simular-error → solo para probar el manejo de errores REST
  http.get('/api/simular-error', async () => {
    await delay(600);
    return HttpResponse.json(
      { mensaje: 'Error interno del servidor (500). Intenta nuevamente en unos minutos.' },
      { status: 500 }
    );
  }),

  // ───────────── GraphQL: vuelos y hoteles ─────────────

  // query VuelosYHoteles($destinoId: ID!) → vuelos y hoteles del destino en UNA sola petición
  graphql.query('VuelosYHoteles', async ({ variables }) => {
    await delay(900);

    const existe = destinos.some((d) => d.id === variables.destinoId);
    if (!existe) {
      return HttpResponse.json({
        errors: [{ message: `No hay vuelos ni hoteles para el destino "${variables.destinoId}".` }],
      });
    }

    return HttpResponse.json({
      data: {
        vuelos: vuelos.filter((v) => v.destinoId === variables.destinoId).map(comoVuelo),
        hoteles: hoteles.filter((h) => h.destinoId === variables.destinoId).map(comoHotel),
      },
    });
  }),

  // query SimularErrorGraphQL → solo para probar el manejo de errores GraphQL
  graphql.query('SimularErrorGraphQL', async () => {
    await delay(600);
    return HttpResponse.json({
      errors: [{ message: 'El servicio de vuelos no está disponible en este momento. Intenta más tarde.' }],
    });
  }),
];
