/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, memo } from 'react';
import clsx from 'clsx';

import {
  CssBaseline,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TextField,
  CircularProgress,
  Link,
  Snackbar
} from '@material-ui/core';

import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

import InfiniteScroll from 'react-infinite-scroller';
import { useStyles, StyledTableCell } from './styles';

import FormCadContribuinte from './FormCadContribuinte';
import { ContribuinteContext } from '../../contexts';

function Contribuintes() {
  const {
    handleOrderSort,
    handleSelectedContribuinte,
    updateDataContribuinte,
    setPagination,
    setOpenSnackbar,
    handleParams,
    pagination,
    listContribuinte,
    openSnackbar,
    isProgress
  } = useContext(ContribuinteContext);

  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]:
      updateDataContribuinte && updateDataContribuinte.message
  });

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <FormCadContribuinte />
        </Paper>
        <Paper
          className={classes.paper}
          style={{ maxHeight: 400, overflow: 'auto' }}>
          <InfiniteScroll
            useWindow={false}
            pageStart={0}
            hasMore={
              pagination && pagination.current_page < pagination.last_page
            }
            loadMore={setPagination}
            loader={
              <div className={classes.loader} key={0}>
                <CircularProgress color="primary" />
              </div>
            }>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="contribuintes">
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      align="center"
                      onClick={() => handleOrderSort('id', true)}>
                      id
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      onClick={() => handleOrderSort('doc', false)}>
                      CPF/CNPJ
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={() => handleOrderSort('nome', false)}>
                      Nome
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      onClick={() => handleOrderSort('tipo', false)}>
                      Tipo
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={() => handleOrderSort('enderecoCidade', false)}>
                      Endereço
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <TextField
                        type="number"
                        className={classes.searchId}
                        size="small"
                        id="id"
                        onChange={handleParams}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="text"
                        className={classes.searchdoc}
                        size="small"
                        id="doc"
                        onChange={handleParams}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="text"
                        className={classes.searchNome}
                        size="small"
                        id="nome"
                        onChange={handleParams}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        className={classes.searchTipo}
                        size="small"
                        id="tipo"
                        onChange={handleParams}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        className={classes.searchEndereco}
                        size="small"
                        id="enderecoCidade"
                        onChange={handleParams}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listContribuinte.map((value) => (
                    <TableRow key={value.id}>
                      <TableCell align="center">
                        <Link
                          component="button"
                          onClick={() => handleSelectedContribuinte(value)}
                          variant="body2">
                          {value.id}
                        </Link>
                      </TableCell>
                      <TableCell>{value.doc}</TableCell>
                      <TableCell>{value.nome}</TableCell>
                      <TableCell align="center">{value.tipo}</TableCell>
                      <TableCell>
                        {value.cidade} | {value.bairro} | {value.endereco}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell />
                    <TableCell>Contribuintes</TableCell>
                    <TableCell colSpan={4} align="center">
                      {listContribuinte.length} de {pagination.total}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </InfiniteScroll>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          key="load"
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}>
          <>
            <div className={classes.wrapper}>
              <Fab
                aria-label="save"
                color="primary"
                className={buttonClassname}>
                {!isProgress ? <CheckIcon /> : <SaveIcon />}
              </Fab>
              {isProgress && (
                <CircularProgress size={68} className={classes.fabProgress} />
              )}
            </div>
          </>
        </Snackbar>
      </main>
    </>
  );
}

export default memo(Contribuintes);
