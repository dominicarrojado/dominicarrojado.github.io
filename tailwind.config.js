const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
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
        96: '24rem',
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
        0: '0ms',
        1250: '1250ms',
      },
      transitionDelay: {
        1250: '1250ms',
        1500: '1500ms',
        1750: '1750ms',
        2500: '2500ms',
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
      typography: {
        DEFAULT: {
          css: {
            color: 'rgba(107, 114, 128, 1)',
            fontSize: '1rem',
            lineHeight: '1.5rem',
            a: {
              color: 'rgba(107, 114, 128, 1)',
              fontWeight: 300,
              textDecoration: 'none',
              '&:hover': {
                color: 'rgba(0, 0, 0, 1)',
              },
            },
            strong: {
              fontWeight: 400,
            },
            h2: {
              color: 'rgba(31, 41, 55, 1)',
              fontSize: '1.125rem',
              fontWeight: 400,
              lineHeight: '1.75rem',
            },
            pre: {
              backgroundColor: '#2c2c34',
            },
            code: {
              display: 'inline-block',
              border: '1px solid rgba(229, 231, 235, 1)',
              borderRadius: '0.375rem',
              backgroundColor: 'rgba(243, 244, 246, 1)',
              padding: '0.25rem 0.5rem',
              color: 'rgba(31, 41, 55, 1)',
              fontWeight: 400,
              '&::before': {
                display: 'none',
              },
              '&::after': {
                display: 'none',
              },
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
            h2: {
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
            },
          },
        },
        xl: {
          css: {
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            h2: {
              fontSize: '1.5rem',
              lineHeight: '1.75rem',
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      inset: ['group-hover'],
      width: ['group-hover'],
      margin: ['first'],
      translate: ['group-hover'],
      rotate: ['even', 'odd'],
      cursor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
