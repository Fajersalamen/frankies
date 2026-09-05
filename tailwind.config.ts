import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        fc: {
          cream: '#FBF4EA',
          'cream-dark': '#F1E6D3',
          paper: '#FFFDF8',
          cocoa: '#3A2A20',
          'cocoa-light': '#6B5140',
          blush: '#D9A594',
          gold: '#BD9457',
          sage: '#93A388',
        },
      },
      fontFamily: {
        sans: ['var(--font-fc-sans)', 'ui-sans-serif', 'sans-serif'],
        'fc-serif': ['var(--font-fc-serif)', 'ui-serif', 'serif'],
        'fc-sans': ['var(--font-fc-sans)', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
