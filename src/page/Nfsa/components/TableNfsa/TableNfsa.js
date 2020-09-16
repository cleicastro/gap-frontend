import React, {
  useState,
  useMemo,
  useContext,
  useCallback,
  useEffect,
  useRef
} from 'react';

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  TableBody,
  IconButton,
  TableFooter,
  Paper,
  CircularProgress
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import InfiniteScroll from 'react-infinite-scroller';
import { StyledTableCell } from '../../../../components/Contribuintes/styles';
import { StyledTableRow } from '../../../Dam/components/TableDam/styles';
import { usePagination, useStore } from '../../../../hooks/nfsaHooks';

import useStyles from './styles';
import { NfsaContext } from '../../../../contexts';
import { useFilterNfsa } from '../../../../hooks';

const classButton = (status, classes) => {
  switch (status) {
    case 'Pago':
      return classes.btnPago;
    case 'Cancelado':
      return classes.btnCancelado;
    case 'Inadimplente':
      return classes.btnInadimplente;
    default:
      return classes.btnPrimary;
  }
};

const classCaption = (status, days) => {
  switch (status) {
    case 'Pago':
      return `Pago`;
    case 'Cancelado':
      return `Cancelado`;
    case 'Inadimplente':
      return `${days} dia(s) de atraso`;
    default:
      return days > 0 ? `${days} dia(s) para vencer` : `Vence hoje`;
  }
};

function TableNfsa() {
  const {
    state: { listNfsa, pagination, paramsQuery }
  } = useContext(NfsaContext);

  const setSelecetNfsa = useStore();
  const setPagination = usePagination();
  const [order, setOrder] = useState('id');
  const [sort, setSort] = useState(false);

  const classes = useStyles();
  const timerToClearSomewhere = useRef(false);

  const [params, setparams] = useState({
    id: '',
    receita: '',
    emissao: '',
    contribuinte: '',
    nameTomadorFilter: '',
    vencimento: '',
    valorCalculo: ''
  });
  const valueTotal = useMemo(
    () =>
      listNfsa.reduce((acc, nfsa) => {
        return acc + Number(nfsa.valor_calculo);
      }, 0),
    [listNfsa]
  );
  // eslint-disable-next-line no-unused-vars
  const [statusServer, setFilter] = useFilterNfsa();

  useEffect(() => {
    if (
      params.id !== '' ||
      params.receita !== '' ||
      params.contribuinte !== '' ||
      params.nameTomadorFilter !== '' ||
      params.vencimento !== '' ||
      params.valorCalculo !== ''
    ) {
      timerToClearSomewhere.current = setTimeout(() => {
        setFilter(params);
      }, 500);
    } else {
      setFilter({ page: 1 });
    }
    return () => {
      clearTimeout(timerToClearSomewhere.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function handleChangeParams(event) {
    const { id, value } = event.target;
    setparams((values) => ({ ...values, [id]: value }));
  }

  function handleOrderSort(campo, isDefaultOrder) {
    if (campo === order) {
      setSort((isSort) => !isSort);
    } else {
      setSort((isSort) => (isDefaultOrder ? true : !isSort));
      setOrder(campo);
    }
  }

  const handlePagination = useCallback(
    (currentPage) => {
      if (pagination.current_page < pagination.last_page) {
        const set = setPagination({
          ...paramsQuery,
          order,
          sort,
          page: currentPage + 1
        });
        set.then((response) => {
          if (response.status !== 200) {
            alert('Falha no carregamento dos dados, favor tente mais tarde!');
          }
        });
      }
    },
    [
      order,
      pagination.current_page,
      pagination.last_page,
      paramsQuery,
      setPagination,
      sort
    ]
  );
  return (
    <InfiniteScroll
      useWindow
      pageStart={0}
      hasMore={pagination.current_page < pagination.last_page}
      loadMore={handlePagination}
      loader={
        <div className={classes.loader} key={0}>
          <CircularProgress color="primary" />
        </div>
      }>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell onClick={() => handleOrderSort('id')}>
                Nota Fiscal
              </StyledTableCell>
              <StyledTableCell
                align="left"
                onClick={() => handleOrderSort('receita', false)}>
                Prestador
              </StyledTableCell>
              <StyledTableCell
                align="left"
                onClick={() => handleOrderSort('emissao', false)}>
                Tomador
              </StyledTableCell>
              <StyledTableCell
                align="left"
                onClick={() => handleOrderSort('id_contribuinte', true)}>
                Emissão
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => handleOrderSort('pago', true)}>
                Situação
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => handleOrderSort('vencicmento', false)}>
                Base de Cálculo
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => handleOrderSort('valor_total', false)}>
                Valor da NF
              </StyledTableCell>
              <StyledTableCell align="right" />
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  onChange={handleChangeParams}
                  type="number"
                  className={classes.searchNDam}
                  size="small"
                  id="id"
                  name="id"
                  value={params.id}
                />
              </TableCell>
              <TableCell>
                <TextField
                  onChange={handleChangeParams}
                  type="text"
                  className={classes.searchReceita}
                  size="small"
                  id="contribuinte"
                  name="contribuinte"
                  value={params.contribuinte}
                />
              </TableCell>
              <TableCell>
                <TextField
                  onChange={handleChangeParams}
                  className={classes.searchEmitido}
                  size="small"
                  id="nameTomadorFilter"
                  name="nameTomadorFilter"
                  value={params.nameTomadorFilter}
                />
              </TableCell>
              <TableCell>
                <TextField
                  onChange={handleChangeParams}
                  type="date"
                  className={classes.searchContribuinte}
                  size="small"
                  id="emissao"
                  name="emissao"
                  disabled
                  value={params.emissao}
                />
              </TableCell>
              <TableCell />
              <TableCell>
                <TextField
                  type="number"
                  onChange={handleChangeParams}
                  className={classes.searchVencimento}
                  size="small"
                  id="valorCalculo"
                  name="valorCalculo"
                  value={params.valorCalculo}
                />
              </TableCell>
              <TableCell>
                {/* <TextField
                  onChange={handleChangeParams}
                  type="number"
                  className={classes.searchValor}
                  size="small"
                  id="valorNota"
                  name="valorNota"
                  value={params.valorNota}
                /> */}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {listNfsa.map((nfsa) => (
              <StyledTableRow key={nfsa.id}>
                <StyledTableCell component="th" scope="row">
                  {nfsa.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {nfsa.prestador.doc} | {nfsa.prestador.nome}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {nfsa.tomador.doc} | {nfsa.tomador.nome}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
                    new Date(nfsa.dam.vencimento)
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {classCaption(nfsa.dam.status, nfsa.dam.dias_vencimento)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(nfsa.valor_calculo)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(nfsa.valor_nota)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <IconButton
                    onClick={() => setSelecetNfsa(nfsa)}
                    className={classButton(nfsa.dam.status, classes)}
                    aria-label="info"
                    size="small">
                    <InfoIcon fontSize="inherit" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <StyledTableCell align="right">Registros</StyledTableCell>
              <StyledTableCell align="right">{listNfsa.length}</StyledTableCell>
              <StyledTableCell align="right" />
              <StyledTableCell align="right" />
              <StyledTableCell align="right">Valor Total</StyledTableCell>
              <StyledTableCell align="right">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(valueTotal)}
              </StyledTableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <div className={classes.loader}>
        {listNfsa.length === 0 && <CircularProgress color="primary" />}
      </div>
    </InfiniteScroll>
  );
}

export default TableNfsa;
