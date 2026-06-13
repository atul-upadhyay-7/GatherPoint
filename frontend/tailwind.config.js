/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: '#D4AF37',
          dark: '#050505',
          goldLight: '#F3E5AB',
          goldDark: '#AA7C11',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        cinzelDec: ['"Cinzel Decorative"', 'serif'],
        pinyon: ['"Pinyon Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
