/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'noto-sans': ['"Noto Sans"', 'sans-serif'],
        'comforter-brush': ['"Comforter Brush"', 'cursive']
      },
    },
  },
  plugins: [],
};
