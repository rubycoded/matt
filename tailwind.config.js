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
  plugins: [],
}

