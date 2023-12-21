/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      extend: {
        colors: {
          'primary-100': '#2192ff',
          'primary-200': '#529dff',
          'primary-300': '#70a9ff',
          'primary-400': '#89b5ff',
          'primary-500': '#9fc1ff',
          'primary-600': '#b4cdff',
          'surface-100': '#040d12',
          'surface-200': '#1f2428',
          'surface-300': '#373b3f',
          'surface-400': '#505457',
          'surface-500': '#6b6e71',
          'surface-600': '#86898b',
        },
      },
    },
  },
  plugins: [],
}

