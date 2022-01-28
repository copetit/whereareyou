module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        default: ['Noto Sans JP', 'sans-serif'],
      },
      colors: {
        black: '#20232a',
      },
      spacing: {
        '8/100': '8%',
        '92/100': '92%',
      },
      minHeight: {
        profileCard: '20rem',
      },
      minWidth: {
        profileCard: '20rem',
      },
      borderRadius: {
        profileCard: '10rem',
      },
    },
  },
  plugins: [],
};
