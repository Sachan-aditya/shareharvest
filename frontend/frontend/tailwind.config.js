/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      "light-green": "#D4E4D2",
        "medium-green": "#A3BFA8",
        "darker-green": "#4A704A",
        "deep-green": "#355C35",
        "yellow": "#FFD700",
      },
      backgroundImage: {
        "hero-bg": "url('https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hhcmluZ3xlbnwwfHwwfHx8MA%3D%3D')", // Add your hero background image
        "food-bg": "url('https://images.unsplash.com/photo-1614442042855-e17d53875286?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNoYXJpbmclMjBmb29kfGVufDB8fDB8fHww')", // Add your food background image
      "food-items-bg": "url('https://images.unsplash.com/photo-1614442042855-e17d53875286?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNoYXJpbmclMjBmb29kfGVufDB8fDB8fHww')",
      },
    },
  },
 
  plugins: [require('@tailwindcss/forms')],

}