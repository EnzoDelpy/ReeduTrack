/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-color': '#F5F5F5',
        'green-custom': '#58A980',
        'yellow-custom': '#BFBC6B',
        'blue-custom': '#588AA9',
        'gray-custom': '#D2D2D2'
      }
    },
    fontFamily: {
      sans: ["SourceSansPro", "sans-serif"]
    }
  },
  plugins: [],
}

