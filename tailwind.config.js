module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Arial', 'sans-serif'],
    },
    extend: {
      fontSize: {
        '2xs': '.65rem',
        '10xl': '14rem',
        '11xl': '18rem',
        '12xl': '24rem',
      },
      transitionDuration: {
        1250: '1250ms',
      },
      animation: {
        slide: 'slide 200s linear infinite',
        spin: 'spin 1s ease infinite',
      },
      keyframes: {
        slide: {
          '0%': {
            'background-position': 'center 3240px',
          },
          '100%': {
            'background-position': 'center 0',
          },
        },
      },
    },
  },
  variants: {
    extend: {
      width: ['group-hover'],
      translate: ['group-hover'],
    },
  },
  plugins: [],
};
