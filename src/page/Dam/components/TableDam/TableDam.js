import React from 'react';
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
  TextField
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { useStyles, StyledTableCell, StyledTableRow } from './styles';

function TableDam({
  listDam,
  handleDamDetail,
  handleOrderSort,
  handleChangeParams,
  params
  // loadSearch
}) {
  const classes = useStyles();

  const valorGeral =
    listDam &&
    listDam.reduce(
      (accumator, currentValue) =>
        Number(accumator) + Number(currentValue.valor_total),
      0
    );

  const classButton = (status) => {
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

  return (
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
                  className={classButton(dam.status)}
                  aria-label="info"
                  size="small"
                  onClick={() => handleDamDetail(dam)}>
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
              }).format(valorGeral)}
            </StyledTableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
export default TableDam;
