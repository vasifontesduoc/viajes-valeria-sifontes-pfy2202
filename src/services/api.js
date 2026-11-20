// Capa de servicios REST: todas las llamadas fetch a /api están en este archivo.
// Incluye una caché en memoria para no repetir peticiones que ya se hicieron.
const URL_BASE = '/api';
const DURACION_CACHE_MS = 5 * 60 * 1000; // 5 minutos

const cache = new Map(); // ruta → { datos, expira }
const pendientes = new Map(); // ruta → promesa de una petición que todavía no responde

// Rutas de la API REST en un solo lugar
export const rutas = {
  destinos: () => '/destinos',
  destino: (id) => `/destinos/${encodeURIComponent(id)}`,
};

// Hace la petición HTTP y convierte las respuestas con error en mensajes claros
async function pedir(ruta) {
  let respuesta;
  try {
    respuesta = await fetch(`${URL_BASE}${ruta}`);
  } catch {
    throw new Error('No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.');
  }

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    if (datos?.mensaje) throw new Error(datos.mensaje);
    if (respuesta.status >= 500) {
      throw new Error(`El servidor tuvo un problema (${respuesta.status}). Intenta nuevamente en unos minutos.`);
    }
    throw new Error(`No se encontró la información solicitada (${respuesta.status}).`);
  }
  return datos;
}

function guardarEnCache(ruta, datos) {
  cache.set(ruta, { datos, expira: Date.now() + DURACION_CACHE_MS });
}

// Devuelve los datos guardados si todavía son válidos
export function leerCache(ruta) {
  const entrada = cache.get(ruta);
  if (!entrada) return undefined;
  if (Date.now() > entrada.expira) {
    cache.delete(ruta);
    return undefined;
  }
  return entrada.datos;
}

// Obtiene datos evitando peticiones repetidas (caché + peticiones en curso compartidas)
export function obtener(ruta) {
  const enCache = leerCache(ruta);
  if (enCache) return Promise.resolve(enCache);
  if (pendientes.has(ruta)) return pendientes.get(ruta);

  const promesa = pedir(ruta)
    .then((datos) => {
      guardarEnCache(ruta, datos);
      // La lista de destinos ya trae cada destino completo: se guardan por separado
      // para que abrir uno no necesite otra petición
      if (ruta === rutas.destinos() && Array.isArray(datos)) {
        datos.forEach((destino) => guardarEnCache(rutas.destino(destino.id), destino));
      }
      return datos;
    })
    .finally(() => pendientes.delete(ruta));

  pendientes.set(ruta, promesa);
  return promesa;
}

// Solo para la página "Cómo funciona": provoca un error 500 a propósito (sin caché)
export const simularErrorRest = () => pedir('/simular-error');
