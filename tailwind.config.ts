import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFF9E5',
          100: '#FFF0B8',
          200: '#FFE48A',
          300: '#FFD85C',
          400: '#FFCC2E',
          500: '#C9A84C',
          600: '#B8952E',
          700: '#8A6F22',
          800: '#5C4A17',
          900: '#2E250B',
        },
        charcoal: {
          50: '#F5F5F6',
          100: '#E5E5E7',
          200: '#CCCCCE',
          300: '#B2B2B5',
          400: '#8C8C90',
          500: '#66666B',
          600: '#4D4D52',
          700: '#333338',
          800: '#1F1F24',
          900: '#141418',
          950: '#0A0A0E',
        },
        ivory: {
          50: '#FEFDFB',
          100: '#FBF9F5',
          200: '#F7F3EB',
          300: '#F0EBE0',
          400: '#E8E2D5',
        },
        burgundy: {
          500: '#722F37',
          600: '#5A252C',
        },
        emerald: {
          500: '#0D9668',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        wider: '0.05em',
        widest: '0.1em',
      },
      maxWidth: {
        '8xl': '1400px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(201, 168, 76, 0.3)',
        'glow-gold-lg': '0 0 40px rgba(201, 168, 76, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
