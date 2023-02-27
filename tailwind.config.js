/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'All-Round-Gothic': ['all-round-gothic', 'sans-serif'],
      'Sabon': ['linotype-sabon', 'sans-serif'],
    },
    extend: {
      colors: {
        lightOrange: '#f07167',
        peach: '#fed9b7',
        softWhite: '#fdfcdc',
        lightTeal: '#00afb9',
        darkTeal: '#0081a7',
        youngYellow: '#e9ea73',
        freshGreen: '#009780',
        earth: '#984527',
        rosyBrown: '#D5A18E',
        spaceCadet: '#1F2041'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
