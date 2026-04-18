/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        upvaly: {
          50: '#f8f9fc',
          100: '#f1f3f9',
          200: '#e2e7f0',
          300: '#d1d9e8',
          400: '#a5b4d1',
          500: '#6b7eb5',
          600: '#4a5f8f',
          700: '#354770',
          800: '#232d4b',
          900: '#141a2a',
        },
        famvest: {
          50: '#faf5ff',
          100: '#f5ebff',
          200: '#ead4ff',
          300: '#d9a7ff',
          400: '#c56dff',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        netly: {
          50: '#f0fdfb',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#134e4a',
          900: '#0f2f2e',
        },
      },
      backgroundImage: {
        'gradient-upvaly': 'linear-gradient(135deg, #141a2a 0%, #1f2847 50%, #141a2a 100%)',
        'gradient-famvest': 'linear-gradient(135deg, #2a1a3d 0%, #3d2451 50%, #2a1a3d 100%)',
        'gradient-netly': 'linear-gradient(135deg, #0f2f2e 0%, #1a5051 50%, #0f2f2e 100%)',
      },
    },
  },
  plugins: [],
}

