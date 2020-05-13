import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto'
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

export default useStyles;
