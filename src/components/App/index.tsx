import React, { useEffect } from 'react';
import { Banner } from '../Banner';
import { HelloWorld } from '../HelloWorld';

import { AppRoot } from './elements';

export type AppProps = {
  currentPage: string;
  isDark?: boolean;
  pages?: Record<string, unknown>;
};

export const App = ({
  currentPage,
  isDark,
  pages
}: AppProps) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('App mounted');
  }, []);

  return (
    <AppRoot>
      <Banner imageSource="assets/images/banner.jpeg" />
      <h2>App Props:</h2>
      <ul>
        <li>currentPage: {currentPage}</li>
        <li>isDark: {isDark}</li>
        <li>pages: {JSON.stringify(pages)}</li>
      </ul>
      <nav>
        <ul>
          <li><a href="/">home</a></li>
          <li><a href="/api">api</a></li>
        </ul>
      </nav>
      <HelloWorld>Hello World!!</HelloWorld>
    </AppRoot>
  );
};
