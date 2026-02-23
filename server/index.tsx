import React, { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { getStyles } from '@n3e/styled';

import { AppProps, App } from '../src/components/App';
import { APP_DATA } from '../src/constants';

export function render(props: AppProps) {
  // DEBUG:
  // console.log('props', props);

  const html = renderToString(
    <StrictMode>
      <App {...props} />
    </StrictMode>
  );

  const sheets = getStyles();

  return { html, sheets };
};

export function updateHTML(
  source: string,
  data: AppProps
) {
  const { html, sheets } = render(data);
  const initialData = JSON.stringify({
    currentPage: data.currentPage
  });

  const script = `
  <script>var ${APP_DATA} = ${initialData};</script>
  <script>
    (function () {
      const isDark = window.localStorage.getItem('ws.isDarkMode') === 'true';

      window.${APP_DATA}.isDark = isDark;

      if (isDark) {
        document.documentElement.classList.add('isDarkMode');
      }
    })();
  </script>
  `;

  const renderedHTML = source
    .replace('<!--app-script-->', () => script)
    .replace('<!--app-styles-->', () => sheets)
    .replace('<!--app-html-->', () => html);

  return renderedHTML;
}
