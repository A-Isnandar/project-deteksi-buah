/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-green': '#116A46', // Hijau tua navbar
        'brand-hover': '#0E5C3B', // Hijau untuk hover
        'brand-light': '#E8F3EE', // Hijau muda background
        'accent-orange': '#F97316', // Oranye untuk 'Setengah Busuk'
        'accent-red': '#EF4444', // Merah untuk 'Busuk'
        'accent-green': '#22C55E', // Hijau untuk 'Segar'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Opsional: biar font lebih modern
      },
    },
  },
  plugins: [],
};
