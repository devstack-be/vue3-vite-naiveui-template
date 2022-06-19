const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': '.75rem',
        'sm': '.85rem',
        'tiny': '.875rem',
      },
      spacing: {
        '64': '14rem',
      },
      fontFamily: {
        'sans': ['Inter', 'Proxima Nova', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        sky: colors.sky,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}