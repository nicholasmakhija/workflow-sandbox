import { useEffect } from 'react';
import { HelloWorld } from '../HelloWorld';

import { AppRoot } from './elements';

export const App = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('App mounted');
  }, []);

  return (
    <AppRoot>
      <HelloWorld>Hello World</HelloWorld>
    </AppRoot>
  );
};
