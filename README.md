# ✈️ Rumbo Sur · Agencia de viajes

🌐 **Sitio publicado:** https://vasifontesduoc.github.io/viajes-valeria-sifontes-pfy2202/

Aplicación en **React** para planificar viajes: el usuario elige un destino, revisa sus actividades populares y arma su viaje eligiendo un **vuelo** y un **hotel**, con el costo total estimado.

- Los **destinos** se obtienen desde una **API REST mock**.
- Los **vuelos y hoteles** de cada destino se obtienen desde una **API GraphQL mock** con **Apollo Client**.
- Ambas APIs se simulan con **MSW (Mock Service Worker)**.

## Funcionalidades

- **Destinos** (`/`): lista obtenida por REST con país, descripción y actividades populares, y buscador por ciudad, país o actividad (sin importar tildes).
- **Planificador** (`/destinos/:destinoId`):
  - Datos del destino por REST.
  - Vuelos (aerolínea, fechas, duración, escalas, precio y asientos) y hoteles (estrellas, zona, servicios, precio por noche, fechas y habitaciones) por GraphQL, en **una sola consulta**.
  - Selección de **pasajeros**, filtro **"solo opciones disponibles"** y selección de vuelo y hotel.
  - Los hoteles se bloquean si no tienen disponibilidad para las fechas del vuelo elegido o habitaciones suficientes.
  - **Resumen del viaje** con noches, habitaciones y **total estimado**.
- **Cómo funciona** (`/como-funciona`): comparación REST vs. GraphQL, la consulta usada, optimizaciones y botones para **probar errores** de cada API.
- **Estados de la interfaz:** esqueletos de carga, mensajes de error claros con *Reintentar* y estados vacíos (por ejemplo, San Pedro de Atacama no tiene vuelos).

## Tecnologías

- React + **Vite**
- **React Router** (`react-router`): layout con `Outlet`, ruta dinámica `/destinos/:destinoId`, `NavLink`, ruta 404 y lazy loading con `Suspense`.
- **MSW**: handlers REST (`http.get`) y GraphQL (`graphql.query`).
- **Apollo Client**: `ApolloProvider`, `useQuery`, `gql` e `InMemoryCache`.
- **Estado:** `useState` (selección de vuelo y hotel, pasajeros, filtros, búsqueda) y `useEffect` (carga de datos REST, limpiar la selección al cambiar de destino y quitar opciones que dejan de ser válidas).
- **Tailwind CSS** con tema propio y clases reutilizables con `@apply`. Diseño responsive.
- **GitHub Pages** con `gh-pages`.

## APIs simuladas

### REST

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/destinos` | Lista de destinos (país, descripción, actividades) |
| GET | `/api/destinos/:id` | Un destino · **404** si no existe |
| GET | `/api/simular-error` | Solo para pruebas: responde **500** |

### GraphQL (`POST /graphql`)

```graphql
query VuelosYHoteles($destinoId: ID!) {
  vuelos(destinoId: $destinoId) {
    id aerolinea codigo fechaIda fechaVuelta duracion escalas precio asientosDisponibles
  }
  hoteles(destinoId: $destinoId) {
    id nombre estrellas zona precioPorNoche disponibleDesde disponibleHasta habitacionesDisponibles servicios
  }
}
```

Si el destino no existe responde con `errors`. La query `SimularErrorGraphQL` siempre responde con un error, para probar su manejo.

## Optimización de consultas

- **REST:** caché en memoria (5 minutos), peticiones en curso compartidas (sin duplicados) y reutilización de la lista para el detalle de cada destino.
- **GraphQL:** caché de Apollo (`InMemoryCache`): volver a un destino ya visitado no consulta de nuevo. Una sola consulta trae vuelos y hoteles juntos.

## Estructura

```
src/
├── mocks/        → datos, handlers (REST + GraphQL) y browser (worker de MSW)
├── services/     → api.js: llamadas REST con caché y manejo de errores
├── graphql/      → cliente.js (Apollo Client) y consultas.js (queries gql)
├── hooks/        → useApi: carga de datos REST con useState y useEffect
├── components/   → TarjetaDestino, TarjetaVuelo, TarjetaHotel, ResumenViaje, Disponibilidad,
│                   OrigenDato, Cargando, TarjetasCargando, MensajeError, EstadoVacio, ProbadorErrores
├── layouts/      → Layout (header, menú, Outlet y footer)
├── pages/        → Inicio, Destino, ComoFunciona, NoEncontrado
├── routes/       → AppRoutes
└── utils/        → formato (precios, fechas, noches) y normalizar
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Destinos |
| `/destinos/:destinoId` | Planificador del viaje (vuelos y hoteles) |
| `/como-funciona` | Explicación de las APIs |
| `*` | Página no encontrada |

## Revisión de recorridos

| Recorrido | Resultado esperado |
|---|---|
| Abrir el inicio | Esqueletos de carga y luego los 6 destinos (REST) |
| Buscar `peru` o `tango` | Aparece Cusco o Buenos Aires |
| Entrar a Buenos Aires | Datos del destino y, tras la carga, 3 vuelos y 2 hoteles (GraphQL) |
| Elegir un vuelo y un hotel | El resumen muestra noches, habitaciones y total estimado |
| En Buenos Aires, elegir el vuelo de diciembre (Aerolíneas Argentinas) | *Casa San Telmo* se bloquea: "No disponible para las fechas de tu vuelo" |
| En Cancún, cambiar a 4 pasajeros | El vuelo de LATAM (3 asientos) se bloquea: "No alcanza para 4 pasajeros" |
| Marcar "solo opciones disponibles" | Se ocultan las opciones bloqueadas |
| Entrar a San Pedro de Atacama | "No hay vuelos disponibles" y sus hoteles |
| Volver a un destino ya visitado | Aparece al instante, sin nuevas peticiones en la consola |
| Abrir `/destinos/tokio` | Mensaje "Destino no encontrado" (404) con Reintentar |
| Cómo funciona → probar errores | Mensajes claros para el error 500 de REST y el error de GraphQL |
| Abrir una ruta inexistente | Página no encontrada |

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Se abre en http://localhost:3000.

## Cómo publicarlo en GitHub Pages

```bash
npm run deploy
```
