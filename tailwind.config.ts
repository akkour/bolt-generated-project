import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors');

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { // Vibrant blue from Dribbble design
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4', // Main primary blue
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
          DEFAULT: '#00bcd4',
        },
        secondary: { // Example secondary color (adjust as needed from design)
          50: '#f0f4c3',
          100: '#e6ee9c',
          200: '#dce775',
          300: '#d4e157',
          400: '#cddc39',
          500: '#c0ca33', // Example secondary yellow-green
          600: '#afb42b',
          700: '#9e9d24',
          800: '#827717',
          900: '#558b2f',
          DEFAULT: '#c0ca33',
        },
        accent: { // Example accent color (orange from Dribbble design)
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#ff9800', // Main accent orange
          600: '#fb8c00',
          700: '#f57c00',
          800: '#ef6c00',
          900: '#e65100',
          DEFAULT: '#ff9800',
        },
        neutral: colors.gray,
        gray: colors.gray,
      },
      fontFamily: {
        'sans': ['"Nunito Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Example: Nunito Sans (check actual font)
        'serif': ['ui-serif', 'serif'],
        'mono': ['ui-monospace', 'monospace'],
      },
      borderRadius: { // Add rounded corner values to match design
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.5rem', // More rounded default
        'md': '0.75rem',
        'lg': '1rem',
        'full': '9999px',
        'large': '12px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
