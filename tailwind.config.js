/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins:[
    function ({addUtilities}){
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(31 29 29) black"
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar":{
            width: "8px"
          },
          "&::-webkit-scrollbar-track":{
            background: "none"
          },
          "&::-webkit-scrollbar-thumb":{
            backgroundColor: "rgb(31 41 55) black",
            borderRadius: "40px",
            border:"1px solid black"
          },
        },
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ]  
}
