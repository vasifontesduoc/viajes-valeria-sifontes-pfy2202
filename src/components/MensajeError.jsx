import { Link } from 'react-router';

// Mensaje claro cuando una petición falla, con alternativas para el usuario
function MensajeError({ titulo = 'No pudimos cargar la información', mensaje, onReintentar, children }) {
  return (
    <div className="panel border-l-4 border-red-500 py-10 text-center" role="alert">
      <p className="mb-3 text-5xl">⚠️</p>
      <h2 className="mb-2 text-2xl font-bold text-tinta">{titulo}</h2>
      <p className="mb-6 text-gris">{mensaje}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {onReintentar && (
          <button type="button" onClick={onReintentar} className="btn btn-primario">
            Reintentar
          </button>
        )}
        <Link to="/" className="btn btn-secundario">
          Ver todos los destinos
        </Link>
      </div>
      {children}
    </div>
  );
}

export default MensajeError;
