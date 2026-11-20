// Quita tildes y pasa a minúsculas: "Perú" → "peru"
export function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
