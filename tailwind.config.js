/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF4F1',
          100: '#FDE8E2',
          200: '#FBD1C5',
          300: '#F9B9A8',
          400: '#F7A28B',
          500: '#F15B38', // Your coral color
          600: '#F97A56', // Your coralLight color
          700: '#D44B2B',
          800: '#B33C1E',
          900: '#922D11',
        },
        secondary: {
          50: '#F7F3EC', // Your cream color
          100: '#F0E8DB',
          200: '#E4C9B0', // Your clay color
          300: '#D8B08A',
          400: '#CC9764',
          500: '#C07E3E',
          600: '#A66B35',
          700: '#8C582C',
          800: '#734523',
          900: '#5A321A',
        },
        gray: {
          50: '#FAF8F5', // Your whitesmoke color
          100: '#F2F0ED',
          200: '#E5E3E0',
          300: '#D8D6D3',
          400: '#BBBAB7',
          500: '#9E9D9A',
          600: '#81807D',
          700: '#646361',
          800: '#3C3C3C', // Your gray color
          900: '#1C1C1C', // Your charcoal color
        },
        // Keep the legacy color names for backward compatibility
        coral: '#F15B38',
        coralLight: '#F97A56',
        cream: '#F7F3EC',
        clay: '#E4C9B0',
        charcoal: '#1C1C1C',
        whitesmoke: '#FAF8F5',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}