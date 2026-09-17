import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14120F',
        'ink-soft': '#2B2722',
        stone: '#6B645B',
        line: '#E3DED5',
        cream: '#F7F4EF',
        ivory: '#FFFFFF',
        gold: '#A8823C',
        'gold-soft': '#C9A465',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        md: '4px',
        lg: '8px',
      },
      boxShadow: {
        soft: '0 2px 24px rgba(20,18,15,0.06)',
        lift: '0 12px 40px rgba(20,18,15,0.10)',
      },
      letterSpacing: {
        eyebrow: '0.18em',
        btn: '0.12em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'marquee-slow': 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
