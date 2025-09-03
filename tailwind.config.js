/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#FF4D00',
        'text-dark': '#111111',
        'text-gray': '#4B5563',
      },
      fontFamily: {
        'mont': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '1860': '1860px',
        '1200': '1200px',
      },
      height: {
        '586.59': '586.59px',
      },
      width: {
        '345.5': '345.5px',
      },
      minHeight: {
        '72vh': '72vh',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} 