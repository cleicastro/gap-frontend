import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1)
  },
  form: {
    padding: theme.spacing(3)
  }
}));

export default useStyles;
