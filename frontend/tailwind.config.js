// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    // ---- CHANGE IS HERE ----
    // We are no longer using 'extend'. We are defining the entire color palette.
    colors: {
      // Your custom colors
     primary: '#6A3DE8',
        secondary: '#FDC448',
        accent: '#FF6B6B',
        darkbg: '#121212',
        lightbg: '#1E1E1E',
        textPrimary: '#FFFFFF',
        textSecondary: '#A0A0A0',
      
      // It's good practice to also include some default colors you might need.
      'white': '#ffffff',
      'black': '#000000',
      'transparent': 'transparent',
      'current': 'currentColor',
      // You can add more from Tailwind's default palette if you need them, e.g., 'red-500': '#ef4444'
    },
    // You can still use extend for other properties like fonts or spacing
    extend: {
      // For example, if you wanted to add a custom font-size
      // fontSize: {
      //   'huge': '5rem',
      // }
    },
  },
  plugins: [],
}