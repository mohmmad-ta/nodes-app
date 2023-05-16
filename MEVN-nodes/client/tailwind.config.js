/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        co: '#fab005'
      }
    },
    container:{
      center:true,
      padding: "10rem"
    },
  },
  plugins: [],
}

