/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        diamond: '#018E94',
        gold: '#B59410',
        silver: '#9D9D9D',
        bronze: '#CD7F32',
        standard: '#3B82F6',
        purple: '#c39bd3',
        partner: '#10B981',
      },
      screens: {
        es: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
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