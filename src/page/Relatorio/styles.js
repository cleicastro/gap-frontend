const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 'calc(100vh - 114px)',
    margin: theme.spacing(3),
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center'
  }
}));

export default useStyles;
