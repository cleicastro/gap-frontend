import React, { useState } from 'react';

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

import useStyles from './styles';
import { usePaginationNfsa, useStoreNfsa } from '../../../../hooks';

function TableNfsa() {
  // eslint-disable-next-line no-unused-vars
  const [listNfsa, valueTotal, setSelecetNfsa] = useStoreNfsa();
  const [pagination, setPagination] = usePaginationNfsa();

  const classes = useStyles();

  const [order, setOrder] = useState('id');
  const [sort, setSort] = useState(false);

  const [params, setparams] = useState({
    id: '',
    prestador: '',
    tomador: '',
    emissao: '',
    valorCalculo: '',
    valorNota: 0
  });

  function handleChangeParams(event) {
    const { name, value } = event.target;
    setparams((values) => ({ ...values, [name]: value }));
  }

  function handleOrderSort(campo, isDefaultOrder) {
    if (campo === order) {
      setSort((isSort) => !isSort);
    } else {
      setSort((isSort) => (isDefaultOrder ? true : !isSort));
      setOrder(campo);
    }
  }

  function handlePagination(currentPage) {
    setPagination({
      order,
      sort,
      page: currentPage + 1
    });
  }
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
                Tomadaor
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
                  id="prestador"
                  name="prestador"
                  value={params.prestador}
                />
              </TableCell>
              <TableCell>
                <TextField
                  onChange={handleChangeParams}
                  className={classes.searchEmitido}
                  size="small"
                  id="tomador"
                  name="tomador"
                  value={params.tomador}
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
                  value={params.emissao}
                />
              </TableCell>
              <TableCell />
              <TableCell>
                <TextField
                  onChange={handleChangeParams}
                  className={classes.searchVencimento}
                  size="small"
                  id="valorCalculo"
                  name="valorCalculo"
                  value={params.valorCalculo}
                />
              </TableCell>
              <TableCell>
                <TextField
                  onChange={handleChangeParams}
                  type="number"
                  className={classes.searchValor}
                  size="small"
                  id="valorNota"
                  name="valorNota"
                  value={params.valorNota}
                />
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
                  {nfsa.dam.status}
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
                    className={
                      nfsa.dam.status
                        ? classes.btnPrimary
                        : classes.btnCancelado
                    }
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
    </InfiniteScroll>
  );
}

export default TableNfsa;
