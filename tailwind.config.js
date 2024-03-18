/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backBody: '#101010',
        brightColor: '#F4511F',
        backgroundColor: '#b7bca9',
        lightText: '#959595'
      },
    },
  },
  plugins: [],
}