import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import { sync } from 'glob';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import express from 'express';
import react from '@vitejs/plugin-react';

import { APP_DATA } from './src/constants';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @returns {import('vite').Plugin}
 */
const computedStyleReload = () => ({
  name: 'vite-plugin-computed-style-reload',
  handleHotUpdate({ read, server }) {
    /** @type {Promise<string>} */(read()).then((content) => {
      const computedStyles = content.match(/style.prop[^$]+?]: ?\(/g) || [];

      if (computedStyles.length) {
        server.ws.send({
          type: 'full-reload'
        });
      }
    });
  }
});

/**
 * @returns {import('vite').Plugin}
 */
const staticAssetReload = () => ({
  name: 'vite-plugin-static-asset-reload',
  configureServer(server) {
    const { ws, watcher } = server;
    watcher.on('change', (file) => {

      if (file.includes('asset')) {
        ws.send({ type: 'full-reload' });
      }
    });
  }
});

/**
 * Custom plugin for resolving requested content-type
 * 
 * @param {string[]} contentTypes
 * @returns {import('vite').Plugin}
 */
const mimeSniffer = (contentTypes) => ({
  name: 'vite-plugin-mime-sniffer',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const requestedContentType = req.headers['content-type'];

      if (contentTypes.includes(requestedContentType)) { 
        const responseHeaderOverride = new Headers({
          'Content-Type': requestedContentType
        });

        res.setHeaders(responseHeaderOverride);
      }

      return next();
    });
  }
});

/**
 * intercepts request to html and sends SSR
 * 
 * @returns {import('vite').Plugin}
 */
const expressMiddleware = () => ({
  name: 'vite-plugin-express-middleware',
  configureServer(server) {
    const app = express();
    const isIgnorePath = (url) => [
      '.',
      '@vite',
      '@react-refresh'
    ].some((item) => url.includes(item));

    app.use('*all', async (req, res, next) => {
      const url = req.originalUrl;

      // DEBUG:
      // console.log('url', url);

      if (isIgnorePath(url)) return next();
      
      try {
        // 1. Read index.html
        const sourceHTML = fs.readFileSync(
          path.resolve(__dirname, 'src/index.html'),
          'utf-8'
        );
    
        // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
        //    and also applies HTML transforms from Vite plugins, e.g. global
        //    preambles from @vitejs/plugin-react
        const template = await server.transformIndexHtml(url, sourceHTML);
    
        // 3. Load the server entry. ssrLoadModule automatically transforms
        //    ESM source code to be usable in Node.js! There is no bundling
        //    required, and provides efficient invalidation similar to HMR.
        const { render } = await server.ssrLoadModule('./src/entry-server.tsx');
    
        // 4. render the app HTML. This assumes entry-server.js's exported
        //     `render` function calls appropriate framework SSR APIs,
        //    e.g. ReactDOMServer.renderToString()
        const { html, sheets } = await render(url);

        const script = `<script>var ${APP_DATA} = ${JSON.stringify(url)};</script>`;
    
        // 5. Inject the app-rendered HTML into the template.
        const renderedHTML = template
          .replace('<!--app-script-->', () => script)
          .replace('<!--app-styles-->', () => sheets)
          .replace('<!--app-html-->', () => html);
    
        // 6. Send the rendered HTML back
        res
          .status(200)
          .contentType('text/html')
          .send(renderedHTML);
      } catch (e) {
        server.ssrFixStacktrace(e);
        next(e);
      }
    });

    server.middlewares.use(app);
  }
});

/**
 * TODO:
 * 
 * @returns {import('vite').Plugin}
 */
const ssrBuild = () => ({
  name: 'vite-plugin-ssr-build',
  apply: 'build',
  transformIndexHtml(html) {
    return html;
  }
  // transformIndexHtml(template, context) {
  //   const url = path.dirname(context.path);
  //   // DEBUG:
  //   // console.group('vite-plugin-ssr-build');
  //   // // console.log('template', template);
  //   // console.log('context.path', context.path);
  //   // console.log('url', url);
  //   // console.groupEnd();

  //   // const templates = 'src/pages';
  //   // const base = '/';

  //   // sync(`${templates}/**/index.html`).map((file) => {
  //   //   const page = file.replace(templates, '');
  //   //   const dir = path.dirname(page);
  //   //   const pagePath = dir === base ? base : `${dir}/`;

  //   //   // DEBUG:
  //   //   console.log('pagePath', pagePath);
  //   // });

  //   const { render } = import('./src/entry-server.tsx');

  //   const { html, sheets } = render(url);

  //   const script = `<script>var ${APP_DATA} = ${JSON.stringify(url)};</script>`;

  //   const renderedHTML = template
  //     .replace('<!--app-script-->', () => script)
  //     .replace('<!--app-styles-->', () => sheets)
  //     .replace('<!--app-html-->', () => html);

  //   return renderedHTML;
  // }
});

/**
 * @param {string} pathToResolve
 * @returns {string}
 */
const resolvePath = (pathToResolve) =>
  path.resolve(__dirname, `./${pathToResolve}`);

// https://vite.dev/config/
export default defineConfig({
  base: './',
  root: 'src',
  publicDir: resolvePath('dist'),
  // assetsInclude: [
  //   './src/assets/**/*.jpeg'
  // ],
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    host: true,
    open: true
  },
  ssr: {
    noExternal: ['@n3e/styled']
  },
  plugins: [
    expressMiddleware(),
    mimeSniffer([
      'application/json; charset=utf-8'
    ]),
    ssrBuild(),
    computedStyleReload(),
    staticAssetReload(),
    eslint(),
    react()
  ]
});
