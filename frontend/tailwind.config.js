// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6A3DE8',
        'secondary': '#FDC448',
        'accent': '#FF6B6B',
        'dark-bg': '#121212',
        'light-bg': '#1E1E1E',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0A0A0',
      },
    },
  },
  plugins: [], // No plugins needed for now, we can add them later if required.
}