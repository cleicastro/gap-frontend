import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },

  image: {
    backgroundImage: 'url(https://source.unsplash.com/collection/9873245)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '87vh',
    justifyContent: 'center',
  },
}));

export default useStyles;
