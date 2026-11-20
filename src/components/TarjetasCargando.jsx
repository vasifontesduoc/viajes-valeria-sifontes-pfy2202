// "Esqueleto" de tarjetas mientras llega la respuesta de la API
function TarjetasCargando({ cantidad = 3, columnas = 'sm:grid-cols-2 lg:grid-cols-3' }) {
  return (
    <div className={`grid gap-5 ${columnas}`} role="status" aria-live="polite">
      {Array.from({ length: cantidad }, (_, i) => (
        <div key={i} className="panel animate-pulse space-y-3">
          <div className="h-8 w-8 rounded-full bg-borde" />
          <div className="h-5 w-2/3 rounded bg-borde" />
          <div className="h-4 w-full rounded bg-borde" />
          <div className="h-4 w-1/2 rounded bg-borde" />
        </div>
      ))}
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

export default TarjetasCargando;
