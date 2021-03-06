import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  containerVencimento: {
    margin: 10,
    maxWidth: 300
  },
  btnLinkPrint: {
    minWidth: 100
  }
}));

export default useStyles;
