/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      animation: {
        fadeInScale: 'fadeInScale 0.3s ease-out',
      },
      keyframes: {
        fadeInScale: {
          from: {
            opacity: '0',
            transform: 'scale(0.98)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};
