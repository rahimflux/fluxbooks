/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './shared/**/*.{vue,js,ts}',
    './domains/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        flux: {
          green: '#10b981',
          dark: '#0f172a',
        },
      },
    },
  },
  plugins: [],
}
