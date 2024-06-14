/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': { 'max': '640px' },
      'md': { 'max': '768px' },
      'lg': { 'max': '1024px' },
      'xl': { 'max': '1280px' },
      '2xl': { 'max': '1536px' },
      'm-sm': { 'min': '320px' },
      'm-md': { 'min': '768px' },
      'm-lg': { 'min': '1024px' },
      'm-xl': { 'min': '1280px' },
      'm-2xl': { 'min': '1536px' },
    },
    colors: {
      'color-receipt': '#0a5c5a',
      'color-cost': '#3c1f2d',
      'color-background': '#09090b',
      'color-rows': '#131316',
      'color-bgforms': '#131316',
      'color-border': '#1e1e1e',
      'color-bginputs': '#1E1E24',
      'color-border-login': '#ffffff',
      'white-primary': '#fff',
      'modal-background': '#00000066',
      'color-nubank': '#8A05BE'
    },
    fontFamily: {
      quick: ['QuickSand', 'quickserif'],
    },
    extend: {
      transitionProperty: {
        'width': 'width'
      },
    },
  },
  plugins: [],
  layerOrder: ['components', 'utilities'],
}

