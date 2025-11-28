import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-inter)', 'monospace'],
      },
      colors: {
        nude: {
          50: '#faf8f6',
          100: '#f5f1ec',
          200: '#e8dfd5',
          300: '#d4c4b5',
          400: '#b8a08c',
          500: '#9d8169',
          600: '#826a54',
          700: '#6b5747',
          800: '#57473b',
          900: '#463b32',
        },
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config

