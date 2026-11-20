import Disponibilidad from './Disponibilidad';
import { formatearFecha, formatearPrecio } from '../utils/formato';

function TarjetaVuelo({ vuelo, seleccionado, deshabilitado, motivo, onSeleccionar }) {
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
          <p className="font-titulo text-lg font-bold text-oceano-oscuro">
            {vuelo.aerolinea} <span className="text-sm font-normal text-gris">{vuelo.codigo}</span>
          </p>
          <p className="text-sm text-gris">
            Desde Santiago (SCL) · {vuelo.duracion} · {vuelo.escalas === 0 ? 'Directo' : `${vuelo.escalas} escala`}
          </p>
        </div>
        <p className="text-right text-xl font-bold text-coral">
          {formatearPrecio(vuelo.precio)}
          <span className="block text-xs font-normal text-gris">por persona, ida y vuelta</span>
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <span>🛫 Ida: {formatearFecha(vuelo.fechaIda)}</span>
        <span>🛬 Vuelta: {formatearFecha(vuelo.fechaVuelta)}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <Disponibilidad cantidad={vuelo.asientosDisponibles} unidad="asientos" />
        {seleccionado && <span className="text-sm font-semibold text-oceano">✓ Seleccionado</span>}
        {motivo && <span className="text-sm text-gris">{motivo}</span>}
      </div>
    </button>
  );
}

export default TarjetaVuelo;
