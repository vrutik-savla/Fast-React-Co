/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // 307. Configuring Tailwind: Custom Font Family
    //OVERRIDES (DELETES OLD CONTENT)
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },
    //EXTENDS WITHOUT OVERRIDING
    extend: {
      colors: {
        pizza: '#ab49fe',
      },
      fontSize: {
        huge: ['80rem', { lineHeight: '1' }],
      },
      height: {
        screen: '100dvh', //dynamic viewport height units
      },
    },
    // 307. Configuring Tailwind: Custom Font Family
  },
  plugins: [],
};
