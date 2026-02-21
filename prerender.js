const fs = require('fs');
const path = require('path');

// transpile imports on the fly
require('@babel/register')({
  configFile: path.resolve(__dirname, './.babelrc'),
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

const { injectIntoHTML } = require('./src/entry-server.tsx');

const file = './dist/index.html'
const filePath = path.resolve(__dirname, file);

// read `index.html` file
const rawHTML = fs.readFileSync(filePath, {
  encoding: 'utf8'
});

const renderedHTML = injectIntoHTML(rawHTML, {
  currentPage: '/',
  isDark: false,
  pages: {}
});

fs.writeFileSync(file, renderedHTML);
