import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const dark = false;

const theme = createMuiTheme({
  palette: dark
    ? {
      type: 'dark'
    }
    : palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
