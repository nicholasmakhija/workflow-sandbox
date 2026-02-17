import { HelloWorldRoot } from './elements';

type HelloWorldProps = {
  children: React.ReactNode;
};

export const HelloWorld = ({
  children
}: HelloWorldProps) => {
  return (
    <HelloWorldRoot>
      <h1
        style={{
          color: 'hotpink'
        }}
      >{ children }</h1>
    </HelloWorldRoot>
  );
};
