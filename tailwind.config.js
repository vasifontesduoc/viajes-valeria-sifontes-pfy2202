/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        arena: '#fbf7f0',
        tinta: '#1e293b',
        gris: '#64748b',
        borde: '#e2e8f0',
        oceano: {
          DEFAULT: '#0e7490',
          oscuro: '#164e63',
          claro: '#e0f2f7',
        },
        coral: {
          DEFAULT: '#f0644f',
          claro: '#fde8e4',
        },
      },
      fontFamily: {
        titulo: ['Sora', 'sans-serif'],
        texto: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        suave: '0 4px 20px rgba(15, 23, 42, 0.07)',
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
