/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite',
        popup: 'popup 1s ease-in-out',
        order: 'order 2s ease-in-out infinite'
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
        },
        order: {
          '0%': {
            // opacity: 0,
            transform: 'scale(1)'
          },
          '50%': {
            // opacity: 1,
            transform: 'scale(1.1)'
          },
          '100%': {
            // opacity: 1,
            transform: 'scale(1)'
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