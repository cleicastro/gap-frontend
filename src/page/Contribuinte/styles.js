import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 'calc(100% - 64px)',
    margin: theme.spacing(3)
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.main
  }
}));

export default useStyles;
