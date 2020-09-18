import React, {
  useState,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useRef
} from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  IconButton,
  TableCell,
  TextField,
  CircularProgress
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import InfiniteScroll from 'react-infinite-scroller';
import { useStyles, StyledTableCell, StyledTableRow } from './styles';
import { usePaginationDam } from '../../../../hooks/dam/usePagination';
import { useStoreDam } from '../../../../hooks/dam/useStore';
import { DamContext } from '../../../../contexts';
import { useFilterDam } from '../../../../hooks';

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

function TableDam() {
  const classes = useStyles();
  const timerToClearSomewhere = useRef(false);
  const {
    state: { listDam, pagination, paramsQuery }
  } = useContext(DamContext);
  const setSelecetDam = useStoreDam();
  const setPagination = usePaginationDam();
  // eslint-disable-next-line no-unused-vars
  const [statusServer, setFilter] = useFilterDam();

  const [order, setOrder] = useState('id');
  const [sort, setSort] = useState(false);

  const [params, setparams] = useState({
    id: '',
    receita: '',
    emissao: '',
    contribuinte: '',
    vencimento: '',
    valorTotal: ''
  });

  const valueTotal = useMemo(
    () =>
      listDam.reduce((acc, dam) => {
        return acc + Number(dam.valor_total);
      }, 0),
    [listDam]
  );

  useEffect(() => {
    if (
      params.id !== '' ||
      params.receita !== '' ||
      params.emissao !== '' ||
      params.contribuinte !== '' ||
      params.vencimento !== '' ||
      params.valorTotal !== ''
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

  const handlePagination = useCallback(() => {
    if (pagination.current_page < pagination.last_page) {
      const set = setPagination({
        ...paramsQuery,
        order,
        sort,
        page: pagination.current_page + 1
      });
      set.then((response) => {
        if (response.status !== 200) {
          alert('Falha no carregamento dos dados, favor tente mais tarde!');
        }
      });
    }
  }, [
    order,
    pagination.current_page,
    pagination.last_page,
    paramsQuery,
    setPagination,
    sort
  ]);

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
                DAM
              </StyledTableCell>
              <StyledTableCell
                align="left"
                onClick={() => handleOrderSort('receita', false)}>
                Receita
              </StyledTableCell>
              <StyledTableCell
                align="left"
                onClick={() => handleOrderSort('emissao', false)}>
                Emitido
              </StyledTableCell>
              <StyledTableCell
                align="left"
                onClick={() => handleOrderSort('id_contribuinte', true)}>
                Contribuinte
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => handleOrderSort('pago', true)}>
                Situação
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => handleOrderSort('vencicmento', false)}>
                Vencimento
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => handleOrderSort('valor_total', false)}>
                Valor
              </StyledTableCell>
              <StyledTableCell align="right" />
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  type="number"
                  className={classes.searchNDam}
                  size="small"
                  id="id"
                  onChange={handleChangeParams}
                  value={params.id}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  className={classes.searchReceita}
                  size="small"
                  receita="receita"
                  id="receita"
                  onChange={handleChangeParams}
                  value={params.receita}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  className={classes.searchEmitido}
                  size="small"
                  id="emissao"
                  onChange={handleChangeParams}
                  value={params.emissao}
                />
              </TableCell>
              <TableCell>
                <TextField
                  className={classes.searchContribuinte}
                  size="small"
                  id="contribuinte"
                  onChange={handleChangeParams}
                  value={params.contribuinte}
                />
              </TableCell>
              <TableCell />
              <TableCell>
                <TextField
                  type="date"
                  className={classes.searchVencimento}
                  size="small"
                  id="vencimento"
                  onChange={handleChangeParams}
                  value={params.vencimento}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  className={classes.searchValor}
                  size="small"
                  id="valorTotal"
                  onChange={handleChangeParams}
                  value={params.valorTotal}
                />
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {listDam.map((dam) => (
              <StyledTableRow key={dam.id}>
                <StyledTableCell component="th" scope="row">
                  {dam.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {dam.receita.descricao}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {Intl.DateTimeFormat('pt-BR', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false
                  }).format(new Date(dam.emissao))}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {dam.contribuinte.doc} | {dam.contribuinte.nome}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {classCaption(dam.status, dam.dias_vencimento)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
                    new Date(dam.vencimento)
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(dam.valor_total)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <IconButton
                    className={classButton(dam.status, classes)}
                    aria-label="info"
                    size="small"
                    onClick={() => setSelecetDam(dam)}>
                    <InfoIcon fontSize="inherit" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <StyledTableCell align="right">Registros</StyledTableCell>
              <StyledTableCell align="right">{listDam.length}</StyledTableCell>
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
        {listDam.length === 0 && <CircularProgress color="primary" />}
      </div>
    </InfiniteScroll>
  );
}
export default TableDam;
