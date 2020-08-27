import React, { useContext } from 'react';

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
  Paper
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { StyledTableCell } from '../../../../components/Contribuintes/styles';
import { StyledTableRow } from '../../../Dam/components/TableDam/styles';

import { NfsaContext } from '../../../../contexts';
import useStyles from './styles';
import { CardSkeletron } from '../../../../components';

function TableNfsa() {
  const {
    ValueTotal,
    listNfsa,
    itensSkeletron,
    handleSelecetedNfsa
  } = useContext(NfsaContext);

  const classes = useStyles();

  function handleOrderSort(e) {
    console.log(e);
  }
  return (
    <>
      {listNfsa.length === 0 && (
        <CardSkeletron quantSkeletron={itensSkeletron} />
      )}
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
                  type="number"
                  className={classes.searchNDam}
                  size="small"
                  id="id"
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  className={classes.searchReceita}
                  size="small"
                  receita="receita"
                  id="receita"
                />
              </TableCell>
              <TableCell>
                <TextField
                  className={classes.searchEmitido}
                  size="small"
                  id="emissao"
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  className={classes.searchContribuinte}
                  size="small"
                  id="contribuinte"
                />
              </TableCell>
              <TableCell />
              <TableCell>
                <TextField
                  className={classes.searchVencimento}
                  size="small"
                  id="vencimento"
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  className={classes.searchValor}
                  size="small"
                  id="valorTotal"
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
                    new Date(nfsa.dam.vencicmento)
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
                    onClick={() => handleSelecetedNfsa(nfsa)}
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
                }).format(ValueTotal)}
              </StyledTableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableNfsa;
