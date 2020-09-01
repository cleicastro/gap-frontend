import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    minWidth: 600
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

export default useStyles;
