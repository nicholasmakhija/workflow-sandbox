type HelloWorldProps = {
  children: React.ReactNode;
};

export const HelloWorld = ({
  children
}: HelloWorldProps) => {
  return (
    <div className="HelloWorld">
      <h1>{ children }</h1>
    </div>
  );
};
