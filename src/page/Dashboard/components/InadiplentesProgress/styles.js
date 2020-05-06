import { makeStyles, withStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#ffcccc'
  },
  barColorPrimary: {
    backgroundColor: '#ff4d4d'
  }
})(LinearProgress);

export { useStyles, ColorLinearProgress };
