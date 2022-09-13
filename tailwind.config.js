/** @type {import('tailwindcss').Config} */
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
      }
    },
  },
  plugins: [],
}
