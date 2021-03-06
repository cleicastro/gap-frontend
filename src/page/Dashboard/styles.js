import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 'calc(100% - 64px)',
    margin: theme.spacing(3)
  }
}));

export default useStyles;
