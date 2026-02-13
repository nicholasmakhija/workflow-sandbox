import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

/**
 * @returns {import('vite').Plugin}
 */
const computedStyleReload = () => ({
  name: 'vite-plugin-computed-style-reload',
  handleHotUpdate({ read, server }) {
    /** @type {Promise<string>} */(read()).then((content) => {
      const computedStyles = content.match(/style.prop([^$]+?)]: \(/g) || [];

      if (computedStyles.length) {
        server.ws.send({
          type: 'full-reload'
        });
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
const mimeSniffer = (contentTypes) => ( {
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
 * @param {string} pathToResolve
 * @returns {string}
 */
const resolvePath = (pathToResolve) =>
  // eslint-disable-next-line no-undef
  path.resolve(__dirname, `./${pathToResolve}`);

// https://vite.dev/config/
export default defineConfig({
  base: './',
  root: 'src',
  publicDir: resolvePath('dist'),
  mode: 'production',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    host: true,
    open: true
  },
  plugins: [
    mimeSniffer([
      'application/json; charset=utf-8'
    ]),
    computedStyleReload(),
    eslint(),
    react()
  ],
  resolve: {
    alias: {
      'react-dom/client': 'react-dom/profiling'
    }
  }
});
