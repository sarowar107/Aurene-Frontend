/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FDF8F0',
        'brand-primary': '#8E7D70',
        'brand-secondary': '#C4B6A9',
        'dark-bg': '#1a1a1a',
        'dark-surface': '#2a2a2a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        'xl': '1rem',
      }
    },
  },
  plugins: [],
}
