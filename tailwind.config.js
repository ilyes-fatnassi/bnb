/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bitebed: {
          coral: '#F15B38',
          coralLight: '#F97A56',
          cream: '#F7F3EC',
          clay: '#E4C9B0',
          charcoal: '#1C1C1C',
          gray: '#3C3C3C',
          whitesmoke: '#FAF8F5',
        },
        coral: '#F15B38',
        coralLight: '#F97A56',
        cream: '#F7F3EC',
        clay: '#E4C9B0',
        charcoal: '#1C1C1C',
        gray: '#3C3C3C',
        whitesmoke: '#FAF8F5',
      },
    },
  },
  plugins: [],
}