import { BrowserRouter } from 'react-router';
import { ApolloProvider } from '@apollo/client/react';
import { clienteApollo } from './graphql/cliente';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    // ApolloProvider entrega el cliente GraphQL a toda la app
    <ApolloProvider client={clienteApollo}>
      {/* basename hace que las rutas funcionen también dentro de GitHub Pages */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppRoutes />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
