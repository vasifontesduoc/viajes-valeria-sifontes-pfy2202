// "Base de datos" del backend simulado. El frontend nunca importa este archivo:
// recibe los destinos por REST y los vuelos y hoteles por GraphQL.

export const destinos = [
  {
    id: 'rio-de-janeiro',
    ciudad: 'Río de Janeiro',
    pais: 'Brasil',
    bandera: '🇧🇷',
    descripcion: 'Playas famosas, cerros con vistas increíbles y mucha música.',
    actividades: ['Visitar el Cristo Redentor', 'Subir al Pan de Azúcar', 'Día de playa en Copacabana'],
  },
  {
    id: 'cusco',
    ciudad: 'Cusco',
    pais: 'Perú',
    bandera: '🇵🇪',
    descripcion: 'La antigua capital inca, puerta de entrada a Machu Picchu.',
    actividades: ['Excursión a Machu Picchu', 'Recorrer el Valle Sagrado', 'Caminata a la Montaña de Siete Colores'],
  },
  {
    id: 'buenos-aires',
    ciudad: 'Buenos Aires',
    pais: 'Argentina',
    bandera: '🇦🇷',
    descripcion: 'Barrios con historia, gastronomía y vida cultural todo el año.',
    actividades: ['Paseo por Caminito', 'Visita al Teatro Colón', 'Show de tango'],
  },
  {
    id: 'cancun',
    ciudad: 'Cancún',
    pais: 'México',
    bandera: '🇲🇽',
    descripcion: 'Mar turquesa del Caribe y ruinas mayas a pocas horas.',
    actividades: ['Excursión a Chichén Itzá', 'Snorkel en arrecifes', 'Paseo a Isla Mujeres'],
  },
  {
    id: 'madrid',
    ciudad: 'Madrid',
    pais: 'España',
    bandera: '🇪🇸',
    descripcion: 'Museos, plazas y una vida nocturna que no se detiene.',
    actividades: ['Museo del Prado', 'Paseo por el Parque del Retiro', 'Visita al Palacio Real'],
  },
  {
    id: 'san-pedro-de-atacama',
    ciudad: 'San Pedro de Atacama',
    pais: 'Chile',
    bandera: '🇨🇱',
    descripcion: 'Desierto, salares y uno de los cielos más limpios del mundo.',
    actividades: ['Atardecer en el Valle de la Luna', 'Géiseres del Tatio', 'Tour astronómico'],
  },
];

// Todos los vuelos salen desde Santiago (ida y vuelta)
export const vuelos = [
  { id: 'v1', destinoId: 'rio-de-janeiro', aerolinea: 'LATAM', codigo: 'LA 750', fechaIda: '2026-12-10', fechaVuelta: '2026-12-17', duracion: '4 h 15 min', escalas: 0, precio: 389990, asientosDisponibles: 12 },
  { id: 'v2', destinoId: 'rio-de-janeiro', aerolinea: 'Sky Airline', codigo: 'H2 820', fechaIda: '2027-01-08', fechaVuelta: '2027-01-15', duracion: '4 h 20 min', escalas: 0, precio: 329990, asientosDisponibles: 4 },
  { id: 'v3', destinoId: 'cusco', aerolinea: 'LATAM', codigo: 'LA 2410', fechaIda: '2026-12-05', fechaVuelta: '2026-12-11', duracion: '5 h 40 min', escalas: 1, precio: 449990, asientosDisponibles: 8 },
  { id: 'v4', destinoId: 'cusco', aerolinea: 'Sky Airline', codigo: 'H2 4100', fechaIda: '2027-02-02', fechaVuelta: '2027-02-08', duracion: '6 h 10 min', escalas: 1, precio: 399990, asientosDisponibles: 0 },
  { id: 'v5', destinoId: 'buenos-aires', aerolinea: 'Aerolíneas Argentinas', codigo: 'AR 1281', fechaIda: '2026-12-18', fechaVuelta: '2026-12-22', duracion: '2 h 05 min', escalas: 0, precio: 219990, asientosDisponibles: 20 },
  { id: 'v6', destinoId: 'buenos-aires', aerolinea: 'JetSMART', codigo: 'JA 3010', fechaIda: '2027-01-20', fechaVuelta: '2027-01-24', duracion: '2 h 10 min', escalas: 0, precio: 159990, asientosDisponibles: 6 },
  { id: 'v7', destinoId: 'buenos-aires', aerolinea: 'LATAM', codigo: 'LA 445', fechaIda: '2027-03-05', fechaVuelta: '2027-03-09', duracion: '2 h 00 min', escalas: 0, precio: 249990, asientosDisponibles: 15 },
  { id: 'v8', destinoId: 'cancun', aerolinea: 'Aeroméxico', codigo: 'AM 15', fechaIda: '2027-01-12', fechaVuelta: '2027-01-20', duracion: '9 h 30 min', escalas: 1, precio: 789990, asientosDisponibles: 9 },
  { id: 'v9', destinoId: 'cancun', aerolinea: 'LATAM', codigo: 'LA 8120', fechaIda: '2027-02-15', fechaVuelta: '2027-02-23', duracion: '9 h 05 min', escalas: 1, precio: 839990, asientosDisponibles: 3 },
  { id: 'v10', destinoId: 'madrid', aerolinea: 'Iberia', codigo: 'IB 6830', fechaIda: '2027-03-01', fechaVuelta: '2027-03-15', duracion: '13 h 10 min', escalas: 0, precio: 1149990, asientosDisponibles: 7 },
  { id: 'v11', destinoId: 'madrid', aerolinea: 'LATAM', codigo: 'LA 704', fechaIda: '2027-04-10', fechaVuelta: '2027-04-24', duracion: '13 h 25 min', escalas: 0, precio: 1089990, asientosDisponibles: 11 },
  // San Pedro de Atacama no tiene vuelos directos: sirve para mostrar el estado vacío
];

export const hoteles = [
  { id: 'h1', destinoId: 'rio-de-janeiro', nombre: 'Hotel Brisa Carioca', estrellas: 4, zona: 'Copacabana', precioPorNoche: 79990, disponibleDesde: '2026-12-01', disponibleHasta: '2027-01-31', habitacionesDisponibles: 5, servicios: ['Piscina', 'Desayuno', 'Wifi'] },
  { id: 'h2', destinoId: 'rio-de-janeiro', nombre: 'Pousada Morro Azul', estrellas: 3, zona: 'Santa Teresa', precioPorNoche: 45990, disponibleDesde: '2026-12-15', disponibleHasta: '2027-03-31', habitacionesDisponibles: 2, servicios: ['Desayuno', 'Wifi'] },
  { id: 'h3', destinoId: 'cusco', nombre: 'Casona Inti', estrellas: 4, zona: 'Centro histórico', precioPorNoche: 69990, disponibleDesde: '2026-11-20', disponibleHasta: '2027-02-28', habitacionesDisponibles: 6, servicios: ['Desayuno', 'Wifi', 'Traslado al aeropuerto'] },
  { id: 'h4', destinoId: 'cusco', nombre: 'Hostal Piedras Andinas', estrellas: 2, zona: 'San Blas', precioPorNoche: 29990, disponibleDesde: '2027-01-01', disponibleHasta: '2027-06-30', habitacionesDisponibles: 0, servicios: ['Wifi'] },
  { id: 'h5', destinoId: 'buenos-aires', nombre: 'Hotel Palermo Verde', estrellas: 4, zona: 'Palermo', precioPorNoche: 64990, disponibleDesde: '2026-12-01', disponibleHasta: '2027-04-30', habitacionesDisponibles: 8, servicios: ['Gimnasio', 'Desayuno', 'Wifi'] },
  { id: 'h6', destinoId: 'buenos-aires', nombre: 'Casa San Telmo', estrellas: 3, zona: 'San Telmo', precioPorNoche: 39990, disponibleDesde: '2027-01-10', disponibleHasta: '2027-03-31', habitacionesDisponibles: 3, servicios: ['Desayuno', 'Wifi'] },
  { id: 'h7', destinoId: 'cancun', nombre: 'Resort Arena Blanca', estrellas: 5, zona: 'Zona Hotelera', precioPorNoche: 159990, disponibleDesde: '2027-01-01', disponibleHasta: '2027-04-30', habitacionesDisponibles: 4, servicios: ['Todo incluido', 'Piscina', 'Spa', 'Playa privada'] },
  { id: 'h8', destinoId: 'cancun', nombre: 'Hotel Coral del Caribe', estrellas: 3, zona: 'Centro', precioPorNoche: 59990, disponibleDesde: '2026-12-01', disponibleHasta: '2027-02-28', habitacionesDisponibles: 7, servicios: ['Piscina', 'Wifi'] },
  { id: 'h9', destinoId: 'madrid', nombre: 'Hotel Gran Vía Central', estrellas: 4, zona: 'Centro', precioPorNoche: 109990, disponibleDesde: '2027-02-01', disponibleHasta: '2027-05-31', habitacionesDisponibles: 5, servicios: ['Desayuno', 'Wifi', 'Bar'] },
  { id: 'h10', destinoId: 'madrid', nombre: 'Hostal Plaza Mayor', estrellas: 2, zona: 'Sol', precioPorNoche: 49990, disponibleDesde: '2027-03-01', disponibleHasta: '2027-06-30', habitacionesDisponibles: 10, servicios: ['Wifi'] },
  { id: 'h11', destinoId: 'san-pedro-de-atacama', nombre: 'Lodge Cielo Estrellado', estrellas: 4, zona: 'Ayllu de Solor', precioPorNoche: 119990, disponibleDesde: '2026-11-15', disponibleHasta: '2027-12-31', habitacionesDisponibles: 3, servicios: ['Desayuno', 'Tours incluidos', 'Observatorio'] },
  { id: 'h12', destinoId: 'san-pedro-de-atacama', nombre: 'Hostal Licancabur', estrellas: 2, zona: 'Centro', precioPorNoche: 34990, disponibleDesde: '2026-11-15', disponibleHasta: '2027-12-31', habitacionesDisponibles: 6, servicios: ['Wifi', 'Cocina compartida'] },
];
