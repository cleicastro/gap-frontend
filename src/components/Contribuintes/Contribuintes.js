/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
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
  Link
} from '@material-ui/core';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { requestContribuinte } from '../../store/contribuinteReducer';

import { useStyles, StyledTableCell } from './styles';
import FormCadContribuinte from './FormCadContribuinte';

function Contribuintes({
  requestContribuinte: handleRequestContribuinte,
  listContribuinte,
  pagination
}) {
  const classes = useStyles();
  const timerToClearSomewhere = useRef(false);
  const [order, setOrder] = useState('id');
  const [sort, setSort] = useState(false);
  const [params, setParams] = useState({});

  useEffect(() => {
    const tokenDam = Axios.CancelToken.source();
    function requestDam(token) {
      return handleRequestContribuinte(
        {
          ...params,
          order,
          sort,
          page: 1
        },
        token.token
      );
    }
    if (Object.keys(params).length !== 0) {
      timerToClearSomewhere.current = setTimeout(() => {
        requestDam(tokenDam);
      }, 500);
    } else {
      requestDam(tokenDam);
    }

    return () => {
      tokenDam.cancel('Request cancell');
      clearTimeout(timerToClearSomewhere.current);
    };
  }, [handleRequestContribuinte, order, sort, params]);

  const setPagination = () => {
    const tokenDam = Axios.CancelToken.source();
    if (pagination.current_page < pagination.last_page) {
      handleRequestContribuinte(
        {
          ...params,
          order,
          sort,
          page: Number(pagination.current_page) + 1
        },
        tokenDam.token
      );
    }
  };

  const handleParams = (event) => {
    setParams({ ...params, [event.target.id]: event.target.value });
  };

  const handleOrderSort = (campo, isDefaultOrder) => {
    if (campo === order) {
      setSort((isSort) => !isSort);
    } else {
      setSort((isSort) => (isDefaultOrder ? true : !isSort));
      setOrder(campo);
    }
  };

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
                      align="center"
                      onClick={() => handleOrderSort('nome', false)}>
                      Nome
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      onClick={() => handleOrderSort('tipo', false)}>
                      Tipo
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
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
                  {listContribuinte.map((contribuinte) => (
                    <TableRow key={contribuinte.id}>
                      <TableCell align="center">
                        <Link
                          component="button"
                          onClick={() => console.log(contribuinte.id)}
                          variant="body2">
                          {contribuinte.id}
                        </Link>
                      </TableCell>
                      <TableCell>{contribuinte.doc}</TableCell>
                      <TableCell>{contribuinte.nome}</TableCell>
                      <TableCell align="center">{contribuinte.tipo}</TableCell>
                      <TableCell>
                        {contribuinte.cidade} | {contribuinte.bairro} |{' '}
                        {contribuinte.endereco}
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
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
  listContribuinte: state.contribuinte.listContribuinte,
  pagination: state.contribuinte.pagination
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestContribuinte }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Contribuintes);
