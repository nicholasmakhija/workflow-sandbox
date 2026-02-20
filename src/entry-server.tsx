import React, { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { getStyles } from '@n3e/styled';
import { App } from './components/App';

export function render(currentPage: string) {
  // DEBUG:
  // console.log('currentPage', currentPage);

  const html = renderToString(
    <StrictMode>
      <App currentPage={currentPage} />
    </StrictMode>
  );

  const sheets = getStyles();

  return { html, sheets };
};
