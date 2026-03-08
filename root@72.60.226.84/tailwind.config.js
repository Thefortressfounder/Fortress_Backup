/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fortress: {
          bg: '#0a0a0a',       
          card: '#121212',     
          gold: '#D4AF37',     
          golddim: '#aa8c2c',  
          text: '#e5e5e5',     
          muted: '#a1a1aa',    
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans
