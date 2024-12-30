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
        mmDarkRust: '#a04e35',
        mmClubPurple: '#2E1C35',
        mmClubLavender: '#554971',
        mmClubSpace: '#383348',
        mmClubDeepSpace: '#2B2934',
        mmClubBlack: '#1D1E20',
        mmClubBlue: '#121A2B',
        mmCyan: '#18848e'
      },
      fontFamily: {
        lilitaOne: ['Lilita One', 'sans-serif'],
        FFXIV: ['FFXIV', 'serif']
      }
    }
  },
  plugins: []
};
