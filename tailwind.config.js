/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        diamond: '#02f2fa',
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32',
        standard: '#3B82F6',
        purple: '#c39bd3',
        partner: '#10B981',
      },
      screens: {
        es: '360px', // Extra Small (custom)
        sm: '640px', // Small (default)
        md: '768px', // Medium (default)
        lg: '1024px', // Large (default)
        xl: '1280px', // Extra Large (default)
        '2xl': '1536px', // 2X Extra Large (default)
      },
      keyframes: {
        talk: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(3deg)' },
          '50%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(2deg)' },
        },
      },
      fontFamily: {
        medieval: ['Allura', 'serif'],
      },
      animation: {
        talk: 'talk 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};