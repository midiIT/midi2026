/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        es: '360px', // Extra Small (custom)
        sm: '640px', // Small (default)
        md: '768px', // Medium (default)
        lg: '1024px', // Large (default)
        xl: '1280px', // Extra Large (default)
        '2xl': '1536px', // 2X Extra Large (default)
      },
    },
  },
  plugins: [],
};