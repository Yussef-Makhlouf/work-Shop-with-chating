

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Marcellus', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]}
