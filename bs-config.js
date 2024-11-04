module.exports = {
  proxy: "localhost:3000",
  files: [
    "views/**/*.ejs",
    "public/**/*.css",
    "public/**/*.js"
  ],
  ignore: [
    "node_modules",
    "public/stylesheets/tailwindcss.css"
  ],
  reloadDelay: 1000,
  reloadDebounce: 1000,
  port: 3001,
  open: false,
  notify: false,
  ui: false,
  ghostMode: false,
  socket: {
    domain: "localhost:3001"
  },
  watchOptions: {
    ignoreInitial: true,
    ignored: ['node_modules', 'public/stylesheets/tailwindcss.css']
  },
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: function (snippet, match) {
        return snippet + match;
      }
    }
  }
}; 