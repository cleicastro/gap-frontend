import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import paletteDark from './palette-dark';
import typography from './typography';
import overrides from './overrides';

const dark = localStorage.getItem('theme') === 'dark';

const theme = createMuiTheme({
  palette: dark ? paletteDark : palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
