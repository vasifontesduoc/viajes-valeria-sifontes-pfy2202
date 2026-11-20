import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En GitHub Pages el sitio vive en /viajes-valeria-sifontes-pfy2202/
// En tu computador (npm run dev) funciona en localhost:3000 normal.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/viajes-valeria-sifontes-pfy2202/' : '/',
  server: {
    port: 3000,
    open: true,
  },
}));
