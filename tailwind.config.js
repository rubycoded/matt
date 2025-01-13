/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ffd900',
          light: '#fff5b3',
          lighter: '#fffae6',
          dark: '#ccae00',
          darker: '#997f00',
        },
        dark: {
          DEFAULT: '#21200b',
          light: '#363415',
          lighter: '#4d4a1f',
          dark: '#171608',
          darker: '#0d0c04',
        },
        accent: {
          orange: '#ff9900',
          amber: '#ffb84d',
          sage: '#9fa000',
          olive: '#616119',
          sand: '#f5e6c3',
        },
      },
      fontFamily: {
        'body': ['Atkinson', 'sans-serif'],
      },
      maxWidth: {
        'prose': '65ch',
        'content': '42rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      addUtilities({
        '.text-fluid-base': {
          'font-size': 'clamp(1rem, 0.85vw + 0.875rem, 1.125rem)',      // 16px → 18px
          'line-height': '1.6',
        },
        '.text-fluid-lg': {
          'font-size': 'clamp(1.125rem, 1vw + 0.975rem, 1.3125rem)',    // 18px → 21px
          'line-height': '1.5',
        },
        '.text-fluid-xl': {
          'font-size': 'clamp(1.25rem, 1.25vw + 1.075rem, 1.5625rem)',  // 20px → 25px
          'line-height': '1.4',
        },
        '.text-fluid-2xl': {
          'font-size': 'clamp(1.5rem, 1.5vw + 1.25rem, 1.875rem)',      // 24px → 30px
          'line-height': '1.3',
        },
        '.text-fluid-3xl': {
          'font-size': 'clamp(1.75rem, 2vw + 1.375rem, 2.25rem)',       // 28px → 36px
          'line-height': '1.2',
        },
        '.text-fluid-4xl': {
          'font-size': 'clamp(2rem, 2.5vw + 1.5rem, 2.75rem)',          // 32px → 44px
          'line-height': '1.1',
        },
        '.text-fluid-5xl': {
          'font-size': 'clamp(2.5rem, 3vw + 1.75rem, 3.25rem)',         // 40px → 52px
          'line-height': '1.1',
        },
        '.text-fluid-6xl': {
          'font-size': 'clamp(3rem, 4vw + 2rem, 4rem)',                 // 48px → 64px
          'line-height': '1',
        },
      })
    }
  ],
}

