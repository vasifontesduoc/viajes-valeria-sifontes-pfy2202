// Indicador de carga mientras se espera la respuesta de la API
function Cargando({ texto = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16" role="status" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-terracota-claro border-t-terracota" />
      <p className="text-gris">{texto}</p>
    </div>
  );
}

export default Cargando;
