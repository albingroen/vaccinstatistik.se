module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    scrollSnapMargin: ['responsive'],
    scrollSnapAlign: ['responsive'],
  },
  plugins: [
    require('tailwindcss-scroll-snap'),
    require('tailwind-scrollbar')
  ],
}
