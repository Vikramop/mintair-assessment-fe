import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '0.7rem',
          sm: '0.7rem',
          lg: '1rem',
          xl: '1rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
};
export default config;
