import ProbadorErrores from '../components/ProbadorErrores';

const comparacion = [
  { aspecto: 'Qué datos trae', rest: 'Destinos: país, descripción y actividades', graphql: 'Vuelos y hoteles de un destino' },
  { aspecto: 'Cómo se pide', rest: 'GET /api/destinos y GET /api/destinos/:id', graphql: 'POST /graphql con la query VuelosYHoteles' },
  { aspecto: 'Cantidad de peticiones', rest: 'Una por recurso', graphql: 'Una sola para vuelos y hoteles juntos' },
  { aspecto: 'Campos recibidos', rest: 'Los que define el servidor', graphql: 'Solo los que pide la consulta' },
  { aspecto: 'Herramienta en el frontend', rest: 'fetch + hook useApi', graphql: 'Apollo Client + useQuery' },
];

const consulta = `query VuelosYHoteles($destinoId: ID!) {
  vuelos(destinoId: $destinoId) {
    aerolinea  fechaIda  fechaVuelta  precio  asientosDisponibles ...
  }
  hoteles(destinoId: $destinoId) {
    nombre  estrellas  precioPorNoche  habitacionesDisponibles ...
  }
}`;

const optimizaciones = [
  'REST: caché en memoria (5 minutos) y peticiones en curso compartidas, así no se repiten consultas.',
  'REST: la lista de destinos ya trae cada destino completo, por eso abrir uno no hace otra petición.',
  'GraphQL: Apollo Client guarda las respuestas en su caché (InMemoryCache); volver a un destino ya visitado no consulta de nuevo.',
  'GraphQL: una sola consulta trae vuelos y hoteles, en lugar de dos peticiones separadas.',
  'Lazy loading: cada página se descarga recién cuando el usuario la visita.',
];

function ComoFunciona() {
  return (
    <section className="max-w-4xl">
      <h1 className="titulo-pagina mb-4">Cómo funciona</h1>
      <p className="mb-8 text-lg text-gris">
        Rumbo Sur combina dos formas de comunicarse con el backend: <strong className="text-tinta">REST</strong>{' '}
        para los destinos y <strong className="text-tinta">GraphQL</strong> para los vuelos y hoteles. Como todavía
        no hay un backend real, ambas APIs se simulan con <strong className="text-tinta">MSW (Mock Service Worker)</strong>.
      </p>

      <h2 className="titulo-seccion mb-3">REST vs. GraphQL en este proyecto</h2>
      <div className="mb-10 overflow-x-auto rounded-2xl bg-white shadow-suave">
        <table className="w-full text-left text-sm">
          <thead className="bg-terracota-claro uppercase text-terracota-oscuro">
            <tr>
              <th className="px-5 py-3">Aspecto</th>
              <th className="px-5 py-3">REST</th>
              <th className="px-5 py-3">GraphQL</th>
            </tr>
          </thead>
          <tbody>
            {comparacion.map((fila) => (
              <tr key={fila.aspecto} className="border-t border-borde">
                <td className="px-5 py-3 font-semibold">{fila.aspecto}</td>
                <td className="px-5 py-3 text-gris">{fila.rest}</td>
                <td className="px-5 py-3 text-gris">{fila.graphql}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="titulo-seccion mb-3">La consulta GraphQL</h2>
      <pre className="mb-10 overflow-x-auto rounded-2xl bg-tinta p-5 text-sm text-white">
        <code>{consulta}</code>
      </pre>

      <h2 className="titulo-seccion mb-3">Optimización de consultas</h2>
      <ul className="mb-10 list-disc space-y-2 pl-6 text-gris">
        {optimizaciones.map((texto) => (
          <li key={texto}>{texto}</li>
        ))}
      </ul>

      <h2 className="titulo-seccion mb-3">Probar el manejo de errores</h2>
      <p className="mb-4 text-gris">
        Estos botones llaman a endpoints que fallan a propósito, para ver cómo responde la aplicación en cada API.
      </p>
      <ProbadorErrores />
    </section>
  );
}

export default ComoFunciona;
