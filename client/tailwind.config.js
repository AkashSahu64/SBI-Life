/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#1E88E5',
          600: '#1976d2',
          700: '#1565c0',
          800: '#0d47a1',
          900: '#0a3880',
        },
        accent: {
          50: '#e0f7f6',
          100: '#b3ebe8',
          200: '#80dfd9',
          300: '#4dd2ca',
          400: '#26c6be',
          500: '#00BFA6',
          600: '#00b09b',
          700: '#009e8c',
          800: '#008d7e',
          900: '#007061',
        },
        dark: {
          100: '#d5d5d5',
          200: '#acacac',
          300: '#828282',
          400: '#595959',
          500: '#2f2f2f',
          600: '#262626',
          700: '#1c1c1c',
          800: '#131313',
          900: '#090909',
        },
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backgroundImage: {
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}