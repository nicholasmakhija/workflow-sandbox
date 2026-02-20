const fs = require('fs');
const path = require('path');

// transpile imports on the fly
require('@babel/register')({
  configFile: path.resolve(__dirname, './.babelrc'),
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

const { render } = require('./src/entry-server.tsx');
const { APP_DATA } = require('./src/constants');

const file = './dist/index.html'

const filePath = path.resolve(__dirname, file);

const url = '/';

// read `index.html` file
const rawHTML = fs.readFileSync(filePath, {
  encoding: 'utf8'
});

const { html, sheets } = render(url);

const script = `<script>var ${APP_DATA} = ${JSON.stringify(url)};</script>`;

const renderedHTML = rawHTML
    .replace('<!--app-script-->', () => script)
    .replace('<!--app-styles-->', () => sheets)
    .replace('<!--app-html-->', () => html);

fs.writeFileSync(file, renderedHTML);
