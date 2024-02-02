/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#1f2937', 
        primary2:'#111827',
        secondary: '#38a169',
      }
    },
  },
  plugins: [],
}

