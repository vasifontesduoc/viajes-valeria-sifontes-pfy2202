// Mensaje para cuando la API responde bien, pero sin resultados
function EstadoVacio({ icono = '📭', titulo, mensaje, children }) {
  return (
    <div className="panel py-10 text-center">
      <p className="mb-3 text-5xl">{icono}</p>
      <h3 className="mb-2 text-xl font-bold text-terracota-oscuro">{titulo}</h3>
      {mensaje && <p className="text-gris">{mensaje}</p>}
      {children}
    </div>
  );
}

export default EstadoVacio;
