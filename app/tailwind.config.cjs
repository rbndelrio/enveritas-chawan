const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        enveritas: {
          700: '#2e8b57',
          600: '#35a064',
          500: '#44c17b',
        },
        jebena: {
          900: '#002060',
          800: '#1a3670',
          700: '#003193',
          600: '#1a469e',
          500: '#335aa9',
          400: '#4d6fb3',
          300: '#6683be',
          200: '#8098c9',
          100: '#99add4',
        },
        purple: {
          700: '#761276'
        },
        yellow: {
          300: '#faed27',
          500: '#dbb300',
        },
        tan: {
          200: '#f7f2e8',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
