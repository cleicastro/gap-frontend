import React, {
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect
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
  CircularProgress
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import InfiniteScroll from 'react-infinite-scroller';
import { usePagination, useStore } from '../../../../hooks/alvara';
import { useStyles, StyledTableCell, StyledTableRow } from './styles';
import { AlvaraFuncionamentoContext } from '../../../../contexts';
import { useFilterAlvara } from '../../../../hooks';

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

function TableAlvara() {
  const classes = useStyles();
  const {
    state: { listAlvara, pagination, paramsQuery }
  } = useContext(AlvaraFuncionamentoContext);

  const setSelecetAlvara = useStore();
  const setPagination = usePagination();
  const [order, setOrder] = useState('id');
  const [sort, setSort] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const setFilter = useFilterAlvara();

  const valueTotal = useMemo(
    () =>
      listAlvara.reduce((acc, dam) => {
        return acc + Number(dam.dam.valor_total);
      }, 0),
    [listAlvara]
  );

  useEffect(() => {
    setFilter({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                DAM
              </StyledTableCell>
              <StyledTableCell
                align="left"
                onClick={() => handleOrderSort('receita', false)}>
                Insc. Municipal
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
          </TableHead>
          <TableBody>
            {listAlvara.map((alvara) => (
              <StyledTableRow key={alvara.dam.id}>
                <StyledTableCell component="th" scope="row">
                  {alvara.dam.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {alvara.inscricao_municipal}
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
                  }).format(new Date(alvara.dam.emissao))}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {alvara.dam.contribuinte.doc} | {alvara.dam.contribuinte.nome}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {classCaption(alvara.dam.status, alvara.dam.dias_vencimento)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
                    new Date(alvara.dam.vencimento)
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(alvara.dam.valor_total)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <IconButton
                    className={classButton(alvara.dam.status, classes)}
                    aria-label="info"
                    size="small"
                    onClick={() => setSelecetAlvara(alvara)}>
                    <InfoIcon fontSize="inherit" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <StyledTableCell align="right">Registros</StyledTableCell>
              <StyledTableCell align="right">
                {listAlvara.length}
              </StyledTableCell>
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
        {listAlvara.length === 0 && <CircularProgress color="primary" />}
      </div>
    </InfiniteScroll>
  );
}
export default TableAlvara;
