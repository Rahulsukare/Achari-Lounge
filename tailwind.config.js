/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 8s linear infinite',
        popup: 'popup 1s ease-in-out'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
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