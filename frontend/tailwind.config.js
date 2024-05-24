/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily:{
      Roboto: ["Roboto","sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        "1000px" : "1050px",
        "1100px" :  "1110px",
        "800px" : "800px",
        "1300px" : "1300px",
        "400px" : "400px"
      },
      backgroundColor: { //customized colors
        'fe8373': '#FE8373',
        '006665' : '#006665',
        'F0F0F0' : '#F0F0F0',
      },
      textColor: {
        'fe8373': '#FE8373',
        '006665' : '#006665'
      },
    },
  },
  variants: {},
  plugins: [],
};



