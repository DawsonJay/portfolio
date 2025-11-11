/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Palette - Night Sky + Warm Lamplight
        'deep-navy': '#1A2332',
        'greyish-blue': '#3A4A5A',
        'warm-tan': '#B89968',
        'golden-bronze': '#D4A574',
        'soft-gold': '#E8C896',
        'cream': '#F5F1E8',
        'soft-sage': '#8A9A7B',
      },
    },
  },
  plugins: [],
}



