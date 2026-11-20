/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Paleta "Atardecer andino"
      colors: {
        crema: '#fdf6ec',
        tinta: '#2b1d16',
        gris: '#7a6a5f',
        borde: '#eadfd2',
        terracota: {
          DEFAULT: '#b4532a',
          oscuro: '#7c2d12',
          claro: '#fbe9df',
        },
        mostaza: {
          DEFAULT: '#e0a526',
          oscuro: '#9a6a0b',
          claro: '#fbefd5',
        },
      },
      fontFamily: {
        titulo: ['Fraunces', 'serif'],
        texto: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        suave: '0 4px 20px rgba(124, 45, 18, 0.08)',
      },
      keyframes: {
        aparecer: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        aparecer: 'aparecer 0.35s ease-out',
      },
    },
  },
  plugins: [],
};
