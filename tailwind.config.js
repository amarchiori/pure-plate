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
        lightOrange: '#FF4400',
        peach: '#fed9b7',
        softGrey: '#e4e4e4',
        lightTeal: '#00afb9',
        darkTeal: '#0081a7',
        youngYellow: '#e9ea73',
        freshGreen: '#009780',
        earth: '#362C28',
        rosyBrown: '#D5A18E',
        spaceCadet: '#191919',
      },
      saturate: {
        125: '1.25',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
