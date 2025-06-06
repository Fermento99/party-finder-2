import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'app';
import { store } from 'state/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
