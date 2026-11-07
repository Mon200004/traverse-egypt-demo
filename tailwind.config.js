/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        egypt: {
          navy: '#05233e',
          'navy-dark': '#021526',
          'navy-light': '#0a365f',
          blue: '#0284c7',
          'blue-light': '#38bdf8',
          'blue-glow': '#0ea5e9',
          gold: '#f59e0b',
          'gold-light': '#fbbf24',
          'gold-dark': '#d97706',
          sand: '#dfb776',
          'sand-light': '#fae8b6',
          'sand-muted': '#f4ecd8',
          oasis: '#0d9488',
          terracotta: '#c2410c'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'Playfair Display', 'serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'egypt-sun': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'egypt-sea': 'linear-gradient(135deg, #0284c7 0%, #05233e 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
