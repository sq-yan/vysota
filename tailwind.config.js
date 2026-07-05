/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Oswald вместо Bebas Neue: у Bebas на Google Fonts нет кириллицы,
        // русские заголовки падали в system-ui.
        // «* Variable» — self-hosted вариативные версии из @fontsource-variable.
        display: ['Oswald Variable', 'Oswald', 'system-ui', 'sans-serif'],
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Тёмно-синяя (navy) база в цвет логотипа «Вертикальные Решения»
        ink: {
          950: '#070b16',
          900: '#0b1120',
          800: '#111a30',
          700: '#1b2748',
          600: '#26365c',
        },
        flame: {
          600: '#ea580c',
          500: '#f97316',
          400: '#fb923c',
          300: '#fdba74',
        },
        steel: {
          600: '#5b6472',
          500: '#7a8494',
          400: '#9aa3b2',
          300: '#c4cad5',
          200: '#dde1e8',
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
