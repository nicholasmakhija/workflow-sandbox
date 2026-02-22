const {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} = require('node:fs');
const { dirname, resolve } = require('node:path');

// transpile imports on the fly
require('@babel/register')({
  configFile: resolve(__dirname, './.babelrc'),
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

const { getPages } = require('./server/get-pages.ts');
const { injectIntoHTML } = require('./src/entry-server.tsx');
const { templateData } = require('./server/template-data.ts');

/**
 * @param {string} file 
 * @param {string} data 
 * @returns {void}
 */
const createFile = (file, data) => {
  const dir = dirname(file);

  if (!existsSync(dir)) {
    mkdirSync(dir, {
      recursive: true
    });
  }

  writeFileSync(file, data);
};

const file = './dist/index.html'
const filePath = resolve(__dirname, file);
const pages = getPages();
const rawHTML = readFileSync(filePath, {
  encoding: 'utf8'
});

createFile('dist/assets/data/pages.json', JSON.stringify({
  pages: pages
}));

templateData.forEach(({ page, path }) => {
  const renderedHTML = injectIntoHTML(rawHTML, {
    currentPage: path,
    isDark: false,
    pages
  });

  createFile('dist' + page, renderedHTML);
});
