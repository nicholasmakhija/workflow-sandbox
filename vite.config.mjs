import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Buffer } from 'node:buffer';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import express from 'express';
import react from '@vitejs/plugin-react';
import { brotliCompress } from 'zlib';
import { promisify } from 'util';
import gzipPlugin from 'rollup-plugin-gzip';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brotliPromise = promisify(brotliCompress);

import { getPages } from './server/get-pages';

// DEBUG:
// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

/**
 * @param {string} pathToResolve
 * @returns {string}
 */
const resolvePath = (pathToResolve) =>
  path.resolve(__dirname, `./${pathToResolve}`);

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
    const fullReload = (file) => {
      if (file.includes('asset') || file.includes('pages')) {
        ws.send({ type: 'full-reload' });
      }
    };

    watcher.on('add', fullReload);
    watcher.on('change', fullReload);
    watcher.on('unlink', fullReload);
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

    app.use('/assets/data/pages.json', (_req, res) => {
      const pages = getPages();

      res
        .status(200)
        .contentType('application/json; charset=utf-8')
        .send({ pages });
    });

    app.use('*all', async (req, res, next) => {
      const url = req.originalUrl;

      if (isIgnorePath(url)) {
        return next();
      }
      
      try {
        const pages = getPages();
        const isValidPath = pages[url];
        const fileName = isValidPath ? 'index' : '404';
        const sourceHTML = fs.readFileSync(
          resolvePath(`src/${fileName}.html`),
          'utf-8'
        );

        if (!isValidPath) {
          res
            .status(404)
            .contentType('text/html')
            .send(sourceHTML);
        }
        
        const template = await server.transformIndexHtml(url, sourceHTML);
        const { updateHTML } = await server.ssrLoadModule('./server/index.tsx');
        const renderedHTML = updateHTML(template, {
          currentPage: url,
          isDark: false,
          pages: pages
        });
    
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

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  root: 'src',
  publicDir: resolvePath('dist'),
  
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      ecma: 2022,
      mangle: {
        toplevel: true
      },
      compress: {
        toplevel: true,
        drop_console: true
      }
    },
    rollupOptions: {
      plugins: [
        gzipPlugin({
          customCompression: (content) => brotliPromise(Buffer.from(content)),
          filter: /\.js/,
          fileName: '.br'
        })
      ]
    }
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
    computedStyleReload(),
    staticAssetReload(),
    eslint(),
    react()
  ]
});
