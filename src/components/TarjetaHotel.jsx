import Disponibilidad from './Disponibilidad';
import { formatearFecha, formatearPrecio } from '../utils/formato';

function TarjetaHotel({ hotel, seleccionado, deshabilitado, motivo, onSeleccionar }) {
  return (
    <button
      type="button"
      onClick={onSeleccionar}
      disabled={deshabilitado}
      aria-pressed={seleccionado}
      className={`tarjeta-seleccionable ${seleccionado ? 'border-oceano bg-oceano-claro/50' : ''}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-titulo text-lg font-bold text-oceano-oscuro">{hotel.nombre}</p>
          <p className="text-sm text-gris">
            <span className="text-amber-500" aria-label={`${hotel.estrellas} estrellas`}>
              {'★'.repeat(hotel.estrellas)}
            </span>{' '}
            · {hotel.zona}
          </p>
        </div>
        <p className="text-right text-xl font-bold text-coral">
          {formatearPrecio(hotel.precioPorNoche)}
          <span className="block text-xs font-normal text-gris">por noche, por habitación</span>
        </p>
      </div>

      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Servicios">
        {hotel.servicios.map((servicio) => (
          <li key={servicio} className="etiqueta">
            {servicio}
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm">
        📅 Disponible del {formatearFecha(hotel.disponibleDesde)} al {formatearFecha(hotel.disponibleHasta)}
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <Disponibilidad cantidad={hotel.habitacionesDisponibles} unidad="habitaciones" />
        {seleccionado && <span className="text-sm font-semibold text-oceano">✓ Seleccionado</span>}
        {motivo && <span className="text-sm text-gris">{motivo}</span>}
      </div>
    </button>
  );
}

export default TarjetaHotel;
