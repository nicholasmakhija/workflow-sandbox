type HelloWorldProps = {
  children: React.ReactNode;
};

export const HelloWorld = ({
  children
}: HelloWorldProps) => {
  return (
    <div
      className="HelloWorld"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        padding: '24px 16px',
        maxWidth: '1140px',
        height: '100%'  
      }}
    >
      <h1
        style={{
          color: 'hotpink'
        }}
      >{ children }</h1>
    </div>
  );
};
