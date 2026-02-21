import styled, { style, mq } from '@n3e/styled';

const boxSizing = `
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
`;

const root = `
  ${style.root} {
    --ws-background-primary: #fff;
    --ws-colour-content: #333;
  }
`;

const darkTheme = `
--ws-background-primary: #1d2125;
--ws-colour-content: #fff;
`;

const rootDarkTheme = `
  ${mq().prefersColorScheme('dark')} {
    ${style.root} {
      ${darkTheme}
    }
  }
`;

const classIsDarkMode = `
  .isDarkMode {
    ${darkTheme}
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
    color: var(--ws-colour-content);
    background-color: var(--ws-background-primary);
  }
`;

export const AppRoot = styled
  .div()
  .withCSS(
    boxSizing,
    root,
    rootDarkTheme,
    classIsDarkMode,
    html,
    htmlAndBody,
    body
  );
