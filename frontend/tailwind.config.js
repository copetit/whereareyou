module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        default: ['Noto Sans JP', 'sans-serif'],
      },
      colors: {
        black: '#20232a',
        requiredTagRed: '#ff3a1a',
      },
      spacing: {
        '8/100': '8%',
        '92/100': '92%',
        '30/100': '30%',
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
      boxShadow: {
        btn: '6px 6px 4px rgba(0, 0, 0, 0.3);',
      },
    },
  },
  plugins: [],
};
