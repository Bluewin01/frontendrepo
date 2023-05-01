import React from "react";
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/Constants';
import GlobalStyle from './utils/GlobalStyle';


import App from "./containers/App";

function ThemeApp() {
  
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyle></GlobalStyle>
        <App />
    </ThemeProvider>
  );
}

export default ThemeApp;
