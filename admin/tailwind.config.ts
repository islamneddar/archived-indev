import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/app-page-component/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10172A',
        secondary: '#1E293B',
        blue: '#39BDF8',
        gray1: '#A9A9A9',
        'gray-d4': '#D4D4D4',
        'gray-9d': '#9D9D9D',
        'gray-4548': '#45484C',
        'blue-second': '#0038C8',
        'gray-e4': '#E4E7F1',
        green: '#40CFA1',
        'blue-ciel': '#FBFBFE',
        'blue-ciel-2': '#F5F5F5',
      },
      borderWidth: {
        1: '1px',
      },
      fontSize: {
        10: '10px',
        12: '12px',
        14: '14px',
        mobile: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        25: '25px',
        30: '30px',
        40: '40px',
      },
      minWidth: {
        300: '300px',
        827: '827px',
      },
      maxWidth: {
        150: '150px',
        300: '300px',
        510: '510px',
      },
      width: {
        214: '214px',
        248: '248px',
        260: '260px',
        300: '300px',
        354: '354px',
        509: '509px',
        649: '649px',
      },
      height: {
        81: '81px',
        180: '180px',
        254: '254px',
        300: '300px',
        400: '400px',
        429: '429px',
        450: '450px',
      },
      padding: {
        30: '30px',
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
      },
    },
    screens: {
      tn: '0px',

      sm: '426px',

      md: '769px',
      // => @media (min-width: 768px) { ... }

      lg: '1025px',
      // => @media (min-width: 1024px) { ... }

      xl: '1300px',
      // => @media (min-width: 1300px) { ... }

      '2xl': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/forms')],
};
export default config;
