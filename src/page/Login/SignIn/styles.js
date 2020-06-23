import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },

  form: {
    width: '100%'
  },

  btnSubmit: {
    margin: theme.spacing(3, 0, 2),
    height: 48
  }
}));

export default useStyles;
