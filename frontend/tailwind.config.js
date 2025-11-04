/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7F5AF0',
        secondary: '#2CB1BC',
        accent: '#FF9F1C',
        muted: '#A0AEC0',
        background: '#0F172A'
      },
      boxShadow: {
        glow: '0 20px 80px rgba(127, 90, 240, 0.25)'
      }
    }
  },
  plugins: []
};
