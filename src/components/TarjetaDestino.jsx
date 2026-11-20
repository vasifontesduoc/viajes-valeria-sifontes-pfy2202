import { Link } from 'react-router';

function TarjetaDestino({ destino }) {
  const { id, ciudad, pais, bandera, descripcion, actividades } = destino;

  return (
    <Link
      to={`/destinos/${id}`}
      className="panel group flex flex-col gap-3 transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-terracota-claro"
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl">{bandera}</span>
        <div>
          <h3 className="text-xl font-bold text-terracota-oscuro group-hover:text-terracota">{ciudad}</h3>
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
      <span className="mt-1 text-sm font-semibold text-mostaza-oscuro">Ver vuelos y hoteles →</span>
    </Link>
  );
}

export default TarjetaDestino;
