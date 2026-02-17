import {
  HelloWorldRoot,
  HelloWorldTitle
} from './elements';

type HelloWorldProps = {
  children: React.ReactNode;
};

export const HelloWorld = ({
  children
}: HelloWorldProps) => {
  return (
    <HelloWorldRoot>
      <HelloWorldTitle>
        { children }
      </HelloWorldTitle>
    </HelloWorldRoot>
  );
};
