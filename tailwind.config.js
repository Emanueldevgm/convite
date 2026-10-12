/** @type {import('tailwindcss').Config} */
import { colors } from './src/theme.js'

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bottle: {
          DEFAULT: colors.gold,
          light: colors.goldLight,
          dark: colors.goldDark,
        },
        champagne: {
          DEFAULT: colors.gold,
          light: colors.goldLight,
          dark: colors.goldDeep,
        },
        forest: colors.forest,
        'forest-dark': colors.forestDark,
        sand: colors.sand,
        'sand-dark': colors.sandDark,
        charcoal: colors.charcoal,
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
}
