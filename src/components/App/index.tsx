import React, { useEffect } from 'react';
import { Banner } from '../Banner';
import { HelloWorld } from '../HelloWorld';

import { AppRoot } from './elements';

type AppProps = {
  currentPage: string;
};

export const App = ({
  currentPage
}: AppProps) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('App mounted');
  }, []);

  return (
    <AppRoot>
      <Banner imageSource="assets/images/banner.jpeg" />
      <h2>Current page is {currentPage}</h2>
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
