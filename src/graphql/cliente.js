import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Cliente Apollo: envía las consultas GraphQL a /graphql (interceptado por MSW)
// y guarda las respuestas en su caché para no repetir consultas.
export const clienteApollo = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
});
