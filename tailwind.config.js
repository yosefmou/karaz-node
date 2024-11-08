/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/javascripts/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    fontFamily: {
      sans: ["Neo Sans Arabic", "sans-serif"],
    },
    extend: {
      colors: {
        "k-red": "#9E0C26",
        "k-light-red": "#F9F0F2",
        "k-drak-white": "#FCFCFC",
        "k-green": "#23856D",
        "k-light-green": "#D1FADF",
        "k-drak-green": "#039855",
        "k-light-gray": "#FAFAFA",
        "k-dark-gray": "#737373",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

