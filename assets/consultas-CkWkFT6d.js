import{d as e}from"./index-BlE_Oqji.js";import{a as t}from"./graphql-DhyBalGr.js";var n=new Map,r=new Map,i=!0,a=!1;function o(e){return e.replace(/[\s,]+/g,` `).trim()}function s(e){return o(e.source.body.substring(e.start,e.end))}function c(t){var n=new Set,a=[];return t.definitions.forEach(function(e){if(e.kind===`FragmentDefinition`){var t=e.name.value,o=s(e.loc),c=r.get(t);c&&!c.has(o)?i&&console.warn(`Warning: fragment with name `+t+` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`):c||r.set(t,c=new Set),c.add(o),n.has(o)||(n.add(o),a.push(e))}else a.push(e)}),e(e({},t),{definitions:a})}function l(e){var t=new Set(e.definitions);t.forEach(function(e){e.loc&&delete e.loc,Object.keys(e).forEach(function(n){var r=e[n];r&&typeof r==`object`&&t.add(r)})});var n=e.loc;return n&&(delete n.startToken,delete n.endToken),e}function u(e){var r=o(e);if(!n.has(r)){var i=t(e,{experimentalFragmentVariables:a,allowLegacyFragmentVariables:a,experimentalFragmentArguments:a});if(!i||i.kind!==`Document`)throw Error(`Not a valid GraphQL document.`);n.set(r,l(c(i)))}return n.get(r)}function d(e){var t=[...arguments].slice(1);typeof e==`string`&&(e=[e]);var n=e[0];return t.forEach(function(t,r){t&&t.kind===`Document`?n+=t.loc.source.body:n+=t,n+=e[r+1]}),u(n)}function f(){n.clear(),r.clear()}function p(){i=!1}function m(){a=!0}function h(){a=!1}var g={gql:d,resetCaches:f,disableFragmentWarnings:p,enableExperimentalFragmentVariables:m,disableExperimentalFragmentVariables:h};(function(e){e.gql=g.gql,e.resetCaches=g.resetCaches,e.disableFragmentWarnings=g.disableFragmentWarnings,e.enableExperimentalFragmentVariables=g.enableExperimentalFragmentVariables,e.disableExperimentalFragmentVariables=g.disableExperimentalFragmentVariables})(d||={}),d.default=d;var _=d`
  query VuelosYHoteles($destinoId: ID!) {
    vuelos(destinoId: $destinoId) {
      id
      aerolinea
      codigo
      fechaIda
      fechaVuelta
      duracion
      escalas
      precio
      asientosDisponibles
    }
    hoteles(destinoId: $destinoId) {
      id
      nombre
      estrellas
      zona
      precioPorNoche
      disponibleDesde
      disponibleHasta
      habitacionesDisponibles
      servicios
    }
  }
`,v=d`
  query SimularErrorGraphQL {
    estado
  }
`;function y(e){let t=e?.graphQLErrors?.length?e.graphQLErrors:e?.errors;return t?.length?t.map(e=>e.message).join(` `):`No se pudo conectar con el servicio de vuelos y hoteles. Revisa tu conexión e inténtalo de nuevo.`}export{_ as n,y as r,v as t};