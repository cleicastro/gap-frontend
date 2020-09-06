import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1)
  },
  form: {
    padding: theme.spacing(3),
    justifyContent: 'space-between'
  }
}));

export default useStyles;
