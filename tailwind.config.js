/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Oswald вместо Bebas Neue: у Bebas на Google Fonts нет кириллицы,
        // русские заголовки падали в system-ui
        display: ['Oswald', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#06070a',
          900: '#0b0d12',
          800: '#12151c',
          700: '#1a1e27',
          600: '#262b36',
        },
        flame: {
          600: '#ea580c',
          500: '#f97316',
          400: '#fb923c',
          300: '#fdba74',
        },
        steel: {
          400: '#9aa3b2',
          300: '#c4cad5',
        },
      },
      boxShadow: {
        'glow-flame': '0 0 60px -10px rgba(249, 115, 22, 0.55)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
