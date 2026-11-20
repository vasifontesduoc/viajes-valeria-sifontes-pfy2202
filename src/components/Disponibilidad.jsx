// Muestra cuántos cupos quedan con un color según la cantidad
function Disponibilidad({ cantidad, unidad }) {
  if (cantidad === 0) {
    return <span className="text-sm font-semibold text-red-600">Sin {unidad} disponibles</span>;
  }
  if (cantidad < 5) {
    return <span className="text-sm font-semibold text-amber-600">¡Quedan solo {cantidad} {unidad}!</span>;
  }
  return <span className="text-sm font-semibold text-green-700">{cantidad} {unidad} disponibles</span>;
}

export default Disponibilidad;
