
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

const primary = '#B4D42A'
const additionalPrimary = '#E30B13'

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary,
      additionalPrimary,
      black: colors.black,
      white: colors.white,
      transparent: colors.transparent,
      yellow: {
        700: '#F5C521'
      },
      gray: {
        300: '#d9dae8',
        500: '#999AA5',
        600: '#66676E',
        700: '#39393f',
        800: '#242529',
        900: '#191B1F',
        950: '#101215',
      }
    },
    extend: {
      spacing: {
        0.5: '0.12rem',
        layout: '2.5rem'
      },
      fontSize: {
        '2lg': '1.38rem'
      },
      borderRadius: {
        image: '0.5rem',
        layout: '0.8rem'
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out'
      },
      transitionDuration: {
        DEFAULT: '200ms'
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
      },
      keyframes: {
        fadeIn: {
          from: {opacity: 0},
          to: {opacity: 1},
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)', 
          },
          '50%': {
            opacity: 0.3,
          },
          '1000%': {
            opacity: 1,
            transform: 'scale(1)', 
          },
        }
      },
      animations: {
        fadeIn: 'fadeIn .5s ease-in-out',
        scaleIn: 'scaleIn .35s ease-in-out'
      }
    },
  },
  plugins: [
    plugin(({addComponents, theme, addUtilities}) => {
      addComponents({
        '.btn-primary': {
          backgroundColor: primary,
          color: '#000',
          borderRadius: '0.6rem',
          transition: 'background-color .3s ease-in-out',
          '&:hover': {
            backgroundColor: '#879E1C'
          }
        },
        '.text-link': {
          textUnderlineOffset: 4,
          color: 'rgba(255, 255, 255, .9)',
          transition: 'text-decoration-color .3s ease-in-out',
          textDecorationLine: 'underline',
          textDecorationColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            textDecorationColor: 'rgba(255, 255, 255, 0.9)',
          }
        },
        '.air-block': {
          borderRadius: theme('borderRadius.layout'),
          backgroundColor: theme('colors.gray.950'),
          color: theme('colors.white'),
          boxShadow: theme('boxShadow.lg')
        }
      }),
      addUtilities({
        '.text-shadow': {
          textShadow: '1px 1px rgba(0, 0, 0, 0.9)'
        },
        '.outline-border-none': {
          outline: 'none',
          border: 'none',
        },
        '.flex-center-between': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        '.image-like-bg': {
          'objectPosition': 'center',
          'objectFit':'cover',
          'pointerEvents': 'none'
        }
      })
    }),
  ],
}

