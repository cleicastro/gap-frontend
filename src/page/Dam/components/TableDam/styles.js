import { makeStyles, withStyles } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700
  },
  searchNDam: {
    width: '5ch'
  },
  searchReceita: {
    width: '12ch'
  },
  searchEmitido: {
    width: '16ch'
  },
  searchContribuinte: {
    width: '20ch'
  },
  searchVencimento: {
    width: '16ch'
  },
  searchValor: {
    width: '8ch'
  },
  btnPago: {
    color: theme.palette.success.main,
    border: 0,
    boxShadow: 'none'
  },
  btnCancelado: {
    color: theme.palette.disable.main,
    border: 0,
    boxShadow: 'none'
  },
  btnInadimplente: {
    color: theme.palette.error.main,
    border: 0,
    boxShadow: 'none'
  },
  btnPrimary: {
    color: theme.palette.primary.dark,
    border: 0,
    boxShadow: 'none'
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

export { useStyles, StyledTableCell, StyledTableRow };
