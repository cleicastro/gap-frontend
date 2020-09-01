import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700
  },
  searchNDam: {
    width: '5ch'
  },
  searchReceita: {
    width: '10ch'
  },
  searchEmitido: {
    width: '16ch'
  },
  searchContribuinte: {
    width: '18ch'
  },
  searchVencimento: {
    width: '16ch'
  },
  searchValor: {
    width: '7ch'
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
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2)
  }
}));
export default useStyles;
