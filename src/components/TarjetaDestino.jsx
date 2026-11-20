import { Link } from 'react-router';

function TarjetaDestino({ destino }) {
  const { id, ciudad, pais, bandera, descripcion, actividades } = destino;

  return (
    <Link
      to={`/destinos/${id}`}
      className="panel group flex flex-col gap-3 transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-oceano-claro"
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl">{bandera}</span>
        <div>
          <h3 className="text-xl font-bold text-oceano-oscuro group-hover:text-oceano">{ciudad}</h3>
          <p className="text-sm text-gris">{pais}</p>
        </div>
      </div>
      <p className="text-sm text-gris">{descripcion}</p>
      <ul className="flex flex-1 flex-wrap content-start gap-1.5" aria-label="Actividades populares">
        {actividades.map((actividad) => (
          <li key={actividad} className="etiqueta">
            {actividad}
          </li>
        ))}
      </ul>
      <span className="mt-1 text-sm font-semibold text-coral">Ver vuelos y hoteles →</span>
    </Link>
  );
}

export default TarjetaDestino;
