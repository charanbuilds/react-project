/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        ice: '#BBE0EF',
        navy: '#161E54',
        brand: '#F16D34',
        peach: '#FF986A',
      },
    },
  },
  plugins: [],
};
