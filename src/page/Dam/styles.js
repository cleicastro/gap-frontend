const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3)
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    display: 'no-print'
  }
}));

export default useStyles;
