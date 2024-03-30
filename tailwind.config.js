/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
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