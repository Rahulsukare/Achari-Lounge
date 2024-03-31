/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite',
        popup: 'popup 1s ease-in-out'
      },
      keyframes: {
        marquee: {
          'from': {
            transform: 'translateX(100%)'
          },
          'to': {
            transform: 'translateX(-200%)'
          }
        },
        popup: {
          'from': {
            opacity: 0,
            transform: 'translateY(20%)'
          },
          'to': {
            opacity: 1,
            transform: 'translateY(0%)'
          }

        }
      },
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