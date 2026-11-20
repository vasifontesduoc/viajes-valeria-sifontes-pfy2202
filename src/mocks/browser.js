import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Service Worker de MSW: intercepta las peticiones REST (/api/...) y GraphQL (/graphql)
// y responde con los handlers definidos en handlers.js
export const worker = setupWorker(...handlers);
