import { useState } from 'react';
import { simularErrorRest } from '../services/api';
import { clienteApollo } from '../graphql/cliente';
import { SIMULAR_ERROR_GRAPHQL, mensajeErrorGraphQL } from '../graphql/consultas';
import Cargando from './Cargando';
import MensajeError from './MensajeError';

const pruebas = {
  rest: {
    texto: 'Simular error 500 en REST',
    ejecutar: () => simularErrorRest(),
    mensaje: (error) => error.message,
  },
  graphql: {
    texto: 'Simular error en GraphQL',
    ejecutar: () => clienteApollo.query({ query: SIMULAR_ERROR_GRAPHQL, fetchPolicy: 'no-cache' }),
    mensaje: (error) => mensajeErrorGraphQL(error),
  },
};

// Permite ver en vivo cómo responde la app cuando falla cada API
function ProbadorErrores() {
  const [prueba, setPrueba] = useState({ estado: 'inactivo', tipo: null, mensaje: '' });

  const probar = async (tipo) => {
    setPrueba({ estado: 'cargando', tipo, mensaje: '' });
    try {
      await pruebas[tipo].ejecutar();
      setPrueba({ estado: 'inactivo', tipo: null, mensaje: '' });
    } catch (error) {
      setPrueba({ estado: 'error', tipo, mensaje: pruebas[tipo].mensaje(error) });
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-3">
        {Object.entries(pruebas).map(([tipo, p]) => (
          <button
            key={tipo}
            type="button"
            onClick={() => probar(tipo)}
            disabled={prueba.estado === 'cargando'}
            className="btn btn-secundario"
          >
            {p.texto}
          </button>
        ))}
      </div>

      {prueba.estado === 'cargando' && <Cargando texto="Consultando al servidor..." />}
      {prueba.estado === 'error' && (
        <MensajeError mensaje={prueba.mensaje} onReintentar={() => probar(prueba.tipo)} />
      )}
    </div>
  );
}

export default ProbadorErrores;
