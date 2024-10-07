/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-color': '#F5F5F5'
      }
    },
    fontFamily: {
      sans: ["SourceSansPro", "sans-serif"]
    }
  },
  plugins: [],
}

