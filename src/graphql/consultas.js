import { gql } from '@apollo/client';

// Una sola consulta trae vuelos Y hoteles del destino, solo con los campos que se usan.
export const VUELOS_Y_HOTELES = gql`
  query VuelosYHoteles($destinoId: ID!) {
    vuelos(destinoId: $destinoId) {
      id
      aerolinea
      codigo
      fechaIda
      fechaVuelta
      duracion
      escalas
      precio
      asientosDisponibles
    }
    hoteles(destinoId: $destinoId) {
      id
      nombre
      estrellas
      zona
      precioPorNoche
      disponibleDesde
      disponibleHasta
      habitacionesDisponibles
      servicios
    }
  }
`;

// Solo para la página "Cómo funciona": el mock responde con un error GraphQL
export const SIMULAR_ERROR_GRAPHQL = gql`
  query SimularErrorGraphQL {
    estado
  }
`;

// Convierte un error de Apollo en un mensaje claro para el usuario
export function mensajeErrorGraphQL(error) {
  const errores = error?.graphQLErrors?.length ? error.graphQLErrors : error?.errors;
  if (errores?.length) return errores.map((e) => e.message).join(' ');
  return 'No se pudo conectar con el servicio de vuelos y hoteles. Revisa tu conexión e inténtalo de nuevo.';
}
