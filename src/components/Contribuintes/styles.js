import { makeStyles, TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(1) * 2)]: {
      marginTop: theme.spacing(2),
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
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main, // theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 12,
    cursor: 'pointer'
  },
  body: {
    fontSize: 9
  }
}))(TableCell);

export { useStyles, StyledTableCell };
