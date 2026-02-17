import styled, { style } from '@n3e/styled';

export const HelloWorldRoot = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  padding: '24px 16px',
  maxWidth: '1140px',
  height: '100%'
});

type HelloWorldTitleProps = {
  children?: React.ReactNode;
  hasOutline?: boolean;
};

export const HelloWorldTitle = styled.h1<HelloWorldTitleProps>({
  margin: 0,
  padding: 0,
  color: '#fc0',
  fontSize: '64px',
  lineHeight: '72px',
  [style.prop<HelloWorldTitleProps>('hasOutline')]: {
    borderStyle: 'dashed',
    borderWidth: '2px',
    borderColor: 'currentColor'
  } 
});
