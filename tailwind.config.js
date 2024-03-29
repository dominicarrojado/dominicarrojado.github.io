const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
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
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
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
        'gray-550': 'rgba(61, 61, 66, 1)',
        'gray-650': 'rgba(57, 57, 65, 1)',
        'gray-750': 'rgba(44, 44, 52, 1)',
        'gray-850': 'rgba(31, 31, 39, 1)',
      },
      textColor: {
        red: 'rgba(255, 0, 0, 1)',
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
        'opacity-color': 'opacity, color',
        'transform-opacity': 'transform, opacity',
        'transform-opacity-color': 'transform, opacity, color',
      },
      transitionDuration: {
        0: '0ms',
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
        stripes: 'stripes 1s linear infinite',
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
        stripes: {
          '0%': {
            'background-position-x': '1rem',
          },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.500'),
            fontSize: theme('fontSize.base'),
            lineHeight: theme('lineHeight.6'),
            a: {
              color: theme('colors.gray.500'),
              fontWeight: theme('fontWeight.light'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.black'),
              },
            },
            strong: {
              fontWeight: theme('fontWeight.normal'),
            },
            h2: {
              color: theme('colors.gray.800'),
              fontSize: theme('fontSize.lg'),
              fontWeight: theme('fontWeight.normal'),
              lineHeight: theme('lineHeight.7'),
            },
            figure: {
              figcaption: {
                color: theme('colors.gray.400'),
              },
            },
            code: {
              display: 'inline-block',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: theme('colors.gray.200'),
              borderRadius: theme('borderRadius.md'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0 0.5rem',
              color: theme('colors.gray.800'),
              fontWeight: theme('fontWeight.normal'),
              wordBreak: 'break-all',
              '&::before': {
                display: 'none',
              },
              '&::after': {
                display: 'none',
              },
            },
            pre: {
              backgroundColor: 'rgba(44, 44, 52, 1)',
              code: {
                display: 'inline',
                overflow: 'visible',
                border: 'none',
                backgroundColor: 'transparent',
                padding: '0',
                color: theme('colors.gray.300'),
              },
            },
            thead: {
              th: {
                color: theme('colors.gray.800'),
                fontWeight: theme('fontWeight.normal'),
              },
            },
            blockquote: {
              color: theme('colors.gray.500'),
              fontWeight: theme('fontWeight.normal'),
            },
          },
        },
        lg: {
          css: {
            fontSize: theme('fontSize.lg'),
            lineHeight: theme('lineHeight.7'),
            h2: {
              fontSize: theme('fontSize.xl'),
              lineHeight: theme('lineHeight.7'),
            },
          },
        },
        xl: {
          css: {
            fontSize: theme('fontSize.xl'),
            lineHeight: theme('lineHeight.7'),
            h2: {
              fontSize: theme('fontSize.2xl'),
              lineHeight: theme('lineHeight.7'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.gray.300'),
              '&:hover': {
                color: theme('colors.white'),
              },
            },
            strong: {
              color: theme('colors.gray.300'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.gray.100'),
              borderColor: 'transparent',
              backgroundColor: 'rgba(44, 44, 52, 1)',
            },
            pre: {
              code: {
                color: theme('colors.gray.100'),
              },
            },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            blockquote: {
              color: theme('colors.gray.300'),
              fontWeight: theme('fontWeight.normal'),
              borderLeftColor: theme('colors.gray.500'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
