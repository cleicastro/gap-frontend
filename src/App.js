import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/core';
import Routes from './routes';
import theme from './theme';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes history={browserHistory} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
