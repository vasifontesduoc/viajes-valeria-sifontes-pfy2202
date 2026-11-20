// 389990 → "$389.990"
export function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-CL')}`;
}

// "2026-12-14" → "lun, 14 dic 2026"
export function formatearFecha(fechaISO) {
  return new Date(`${fechaISO}T12:00:00`).toLocaleDateString('es-CL', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Cantidad de noches entre dos fechas "AAAA-MM-DD"
export function calcularNoches(desdeISO, hastaISO) {
  const unDia = 24 * 60 * 60 * 1000;
  return Math.round((new Date(`${hastaISO}T12:00:00`) - new Date(`${desdeISO}T12:00:00`)) / unDia);
}
