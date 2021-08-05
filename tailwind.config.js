module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Arial', 'sans-serif'],
    },
    extend: {
      letterSpacing: {
        px: '1px',
      },
      minWidth: {
        11: '2.75rem',
      },
      maxWidth: {
        'screen-3xl': '2880px',
      },
      minHeight: {
        24: '6rem',
      },
      backgroundColor: {
        'gray-1000': '#2c2c34',
      },
      fontSize: {
        '3xs': '.55rem',
        '2xs': '.65rem',
        '10xl': '14rem',
        '11xl': '18rem',
        '12xl': '24rem',
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        'transform-opacity-color': 'transform, opacity, color',
      },
      transitionDuration: {
        1250: '1250ms',
      },
      boxShadow: {
        '3xl':
          '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
      },
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing',
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
      margin: ['first'],
      translate: ['group-hover'],
      rotate: ['even', 'odd'],
      cursor: ['active'],
    },
  },
  plugins: [],
};
