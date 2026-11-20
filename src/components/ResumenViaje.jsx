import { formatearFecha, formatearPrecio } from '../utils/formato';

// Resumen del plan de viaje con el costo total estimado
function ResumenViaje({ destino, vuelo, hotel, pasajeros, habitaciones, noches, onLimpiar }) {
  const costoVuelos = vuelo ? vuelo.precio * pasajeros : 0;
  const costoHotel = hotel && noches ? hotel.precioPorNoche * noches * habitaciones : 0;
  const total = costoVuelos + costoHotel;

  return (
    <aside className="panel h-fit lg:sticky lg:top-6" aria-label="Resumen del viaje">
      <h2 className="mb-1 text-xl font-bold text-oceano-oscuro">Tu viaje</h2>
      <p className="mb-5 text-sm text-gris">
        {destino.bandera} {destino.ciudad}, {destino.pais}
      </p>

      <dl className="space-y-4 text-sm">
        <div>
          <dt className="font-semibold">✈️ Vuelo</dt>
          <dd className="text-gris">
            {vuelo ? (
              <>
                {vuelo.aerolinea} {vuelo.codigo}
                <br />
                {formatearFecha(vuelo.fechaIda)} → {formatearFecha(vuelo.fechaVuelta)}
                <br />
                {pasajeros} {pasajeros === 1 ? 'pasajero' : 'pasajeros'} · {formatearPrecio(costoVuelos)}
              </>
            ) : (
              'Elige un vuelo'
            )}
          </dd>
        </div>

        <div>
          <dt className="font-semibold">🏨 Hotel</dt>
          <dd className="text-gris">
            {hotel ? (
              <>
                {hotel.nombre}
                <br />
                {noches
                  ? `${noches} noches · ${habitaciones} ${habitaciones === 1 ? 'habitación' : 'habitaciones'} · ${formatearPrecio(costoHotel)}`
                  : 'Elige un vuelo para calcular las noches'}
              </>
            ) : (
              'Elige un hotel'
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-baseline justify-between border-t border-borde pt-4">
        <span className="font-semibold">Total estimado</span>
        <span className="text-2xl font-bold text-coral">{formatearPrecio(total)}</span>
      </div>

      {vuelo && hotel && (
        <p className="mt-4 rounded-xl bg-oceano-claro px-4 py-2 text-sm font-medium text-oceano-oscuro" role="status">
          ✓ ¡Tu viaje está listo para reservar!
        </p>
      )}

      {(vuelo || hotel) && (
        <button type="button" onClick={onLimpiar} className="btn btn-secundario mt-4 w-full">
          Limpiar selección
        </button>
      )}
    </aside>
  );
}

export default ResumenViaje;
