import { colors } from '@material-ui/core';

const white = '#1f1f1f';
const black = '#000';
const whiteLigth = '#FFF';

export default {
  black,
  white,
  primary: {
    contrastText: whiteLigth,
    dark: '#69306D',
    // main: '#550052',
    main: '#1f1f1f',
    light: colors.grey[50]
  },
  secondary: {
    contrastText: whiteLigth,
    dark: colors.blue[900],
    main: colors.blue.A400,
    light: colors.blue.A400
  },
  success: {
    contrastText: whiteLigth,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: black,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: black,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: black,
    dark: colors.red[900],
    main: colors.red[200],
    light: colors.red[400]
  },
  disable: {
    contrastText: colors.grey[900],
    dark: colors.grey[200],
    main: colors.grey[100],
    light: colors.grey[800]
  },
  cammon: {
    contrastText: black,
    dark: colors.grey[500],
    main: '#1f1f1f',
    light: '#121212'
  },
  text: {
    main: '#ddd',
    primary: '#FFF',
    secondary: '#ddd',
    link: '#ddd'
  },
  background: {
    default: '#1f1f1f',
    paper: '#1f1f1f'
  },

  icon: colors.grey[700],
  divider: colors.grey[200]
};
