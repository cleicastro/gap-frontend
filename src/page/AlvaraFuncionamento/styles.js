const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3)
  }
}));

export default useStyles;
