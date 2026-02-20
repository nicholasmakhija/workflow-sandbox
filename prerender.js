const fs = require('fs');
const path = require('path');

// transpile imports on the fly
require('@babel/register')({
  configFile: path.resolve(__dirname, './.babelrc'),
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

const { render } = require('./src/entry-server.tsx');

const filePath = path.resolve(__dirname, './dist/index.html');

// read `index.html` file
const rawHTML = fs.readFileSync(filePath, {
  encoding: 'utf8'
});

const { html, sheets } = render('/');

const renderedHTML = rawHTML
    // .replace('<!--app-script-->', () => script)
    .replace('<!--app-styles-->', () => sheets)
    .replace('<!--app-html-->', () => html);

console.log('render', render);
// console.log('render', render);
// console.log('rawHTML', rawHTML);
console.log('renderedHTML', renderedHTML);
