import { makeStyles, TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  layout: {
    height: '75vh',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(1) * 2)]: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2)
    }
  },
  table: {
    minWidth: 650
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2)
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.light, // theme.palette.common.black,
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}))(TableCell);

export { useStyles, StyledTableCell };
