/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const FlipClass = plugin(({addUtilities})=> {
  addUtilities({
    "rotate-y-180": {transform: "rotateY(180deg)"}
  })
})
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indigo-blue' : '#053C61',
        'viridian-green' : '#3BBAB8',
        'ocean-green' : '#49C18F',
        'algae-green': '#67E085',
        'apple-green' : '#ACECB1'
      },
      animation: {
        'enlarge': 'enlarge 1s cubic-bezier(0, 0, 0.2, 1) ;'
      },
      keyframes: {
        'enlarge': { 
          '75%, 100%' : {transform: 'scale(1.1)'}
        }
      }
    },
  },
  plugins: [FlipClass],
}
