/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#00040f',
        secondary: '#00f6ff',
        dimWhite: 'rgba(255, 255, 255, 0.7)',
        dimBlue: 'rgba(9, 151, 124, 0.1)',
        text_primary: '#112D4E',
        text_dimPrimary: '#3F72AF',
        text_light: '#F9F7F7',
        highlight: '#0094FF',
        highlight_spot: '#40608F',
        border_primary: '#6B7280',
        bg_card: '#fff',
        table_header: '#3F72AF',
      },
      /*
      purple
      colors: {
        primary: '#00040f',
        secondary: '#00f6ff',
        dimWhite: 'rgba(255, 255, 255, 0.7)',
        dimBlue: 'rgba(9, 151, 124, 0.1)',
        text_primary: '#474554',
        text_dimPrimary: '#ACA7CB',
        highlight: '#8083FF',
        border_primary: '#6B7280',
        bg_card: '#F2ECFF',
        table_header: '#ACA7CB',
      },*/
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-setif'],
      },
      flex: {
        '40%': '0 0 40%',
        '60%': '0 0 60%',
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [],
}
