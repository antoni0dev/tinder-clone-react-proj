import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.jsx';
import GlobalStyle from './GlobalStyles.js';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme.js';
import QueryProvider from './providers/QueryProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <GlobalStyle />
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>
);
