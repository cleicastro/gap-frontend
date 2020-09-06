import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '100%'
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 10
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  buttonClassname: {
    margin: 16
  }
}));

export default useStyles;
