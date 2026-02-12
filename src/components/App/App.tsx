import { useEffect } from 'react';
import { HelloWorld } from '../HelloWorld';

export const App = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('App mounted');
  }, []);

  return (
    <div className="App">
      <HelloWorld>Hello World</HelloWorld>
    </div>
  );
};
