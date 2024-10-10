/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        mmBlue: '#257180',
        mmDarkBlue: '#1f606d',
        mmDarkerBlue: '#194c56',
        mmSand: '#F2E5BF',
        mmDarkSand: '#d6caa9',
        mmDarkerSand: '#c1b699',
        mmOrange: '#FD8B51',
        mmRust: '#CB6040',
        mmDarkRust: '#a04e35'
      },
      fontFamily: {
        lilitaOne: ['Lilita One', 'sans-serif'],
        FFXIV: ['FFXIV', 'serif']
      }
    }
  },
  plugins: []
};
