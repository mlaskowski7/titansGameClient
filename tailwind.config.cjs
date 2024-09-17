/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        secondaryBg: '#260F26',
        primaryBg: '#010112',
        accent: '#71B48D' 
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],  // Define custom sans-serif font
        serif: ['Lora', 'serif'],        // Define custom serif font
        mono: ['Courier New', 'monospace'], // Optional: define monospace font
      },
    },
  },
  plugins: [],
}

