// Etiqueta que indica de qué API vienen los datos de una sección
function OrigenDato({ tipo, detalle }) {
  const estilos = tipo === 'REST' ? 'bg-green-100 text-green-800' : 'bg-pink-100 text-pink-800';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${estilos}`}>
      {tipo} <span className="font-mono font-normal">{detalle}</span>
    </span>
  );
}

export default OrigenDato;
