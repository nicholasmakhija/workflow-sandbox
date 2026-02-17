import styled from '@n3e/styled';

const boxSizing = `
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
`;

const html = `
  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }
`;

const htmlAndBody = `
  body,
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`;

const body = `
  body {
    font-size: 16px;
    line-height: 24px;
    font-family: Verdana, sans-serif;
    color: #333;
    background-color: #fff;
  }
`;

export const AppRoot = styled
  .div()
  .withCSS(
    boxSizing,
    html,
    htmlAndBody,
    body
  );
