import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  difference: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 36,
    width: 36,
    fontSize: 14
  },
  differenceValue: {
    color: theme.palette.primary.dark,
    marginRight: theme.spacing(1)
  }
}));

const useStylesPago = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    height: 36,
    width: 36,
    fontSize: 14
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const useStylesCancelado = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.disable.light
  },
  avatar: {
    backgroundColor: theme.palette.disable.main,
    color: theme.palette.disable.contrastText,
    height: 36,
    width: 36,
    fontSize: 14
  },
  differenceValue: {
    color: theme.palette.disable.main,
    marginRight: theme.spacing(1)
  }
}));

const useStylesVencido = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    height: 36,
    width: 36,
    fontSize: 14
  },
  differenceValue: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(1)
  }
}));

export { useStyles, useStylesPago, useStylesCancelado, useStylesVencido };
