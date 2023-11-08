/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'todo-primary': '#2C3E50',
        'todo-secondary': "#1C2833",
      },
    },
    fontFamily: {
      Inter: ['inter, sans-serif'],
    },
    container: {
      padding: '2rem',
      center: true,
    },
    screens: {
      sm: '640px',
      md: '768px',
    },
  },
  plugins: [],
};