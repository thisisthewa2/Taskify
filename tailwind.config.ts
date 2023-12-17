import type { Config } from 'tailwindcss';

const createPxEntries = (size: number) => {
  return {
    0: '0',
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i}`]: `${i / 16}rem` };
    }),
  };
};

const PX_ENTRIES = createPxEntries(500);

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      mobile: '360px',
      tablet: '768px',
      pc: '1200px',
    },
    zIndex: {
      base: '1',
      nav: '2',
      popup: '999',
      floating: '1000',
    },
    colors: {
      transparent: 'transparent',
      primary: {
        DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
        light: 'rgb(var(--primary-light) / <alpha-value>)',
      },
      red: 'rgb(var(--red) / <alpha-value>)',
      green: 'rgb(var(--green) / <alpha-value>)',
      purple: 'rgb(var(--purple) / <alpha-value>)',
      orange: 'rgb(var(--orange) / <alpha-value>)',
      blue: 'rgb(var(--blue) / <alpha-value>)',
      pink: 'rgb(var(--pink) / <alpha-value>)',
      black: 'rgb(var(--black) / <alpha-value>)',
      white: 'rgb(var(--white) / <alpha-value>)',
      gray: {
        1: 'rgb(var(--gray-1) / <alpha-value>)',
        2: 'rgb(var(--gray-2) / <alpha-value>)',
        3: 'rgb(var(--gray-3) / <alpha-value>)',
        4: 'rgb(var(--gray-4) / <alpha-value>)',
        5: 'rgb(var(--gray-5) / <alpha-value>)',
        6: 'rgb(var(--gray-6) / <alpha-value>)',
        7: 'rgb(var(--gray-7) / <alpha-value>)',
      },
    },
    fontFamily: {
      sans: ['Pretendard', 'Arial'],
    },
    fontSize: {
      10: '0.625rem',
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      18: '1.125rem',
      20: '1.25rem',
      24: '1.5rem',
    },
    fontWeight: {
      light: '400',
      normal: '500',
      bold: '700',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
    },
    spacing: PX_ENTRIES,
  },
  plugins: [],
};
export default config;
