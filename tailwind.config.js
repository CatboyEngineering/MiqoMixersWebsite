/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        mmBlack: '#252324',
        mmPink: '#FF2C82',
        mmMint: '#EAF7DF',
        mmTeal: '#72EFD9',
        mmGreen: '#83FB9E',
        mmRed: '#F34355'
      },
      fontFamily: {
        lilitaOne: ['Lilita One', 'sans-serif']
      }
    }
  },
  plugins: []
};
