/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useContext,
  memo,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';

import {
  CssBaseline,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  CircularProgress,
  Grid,
  Typography,
  Zoom,
  Button,
  Box,
  Icon
} from '@material-ui/core';

import InfiniteScroll from 'react-infinite-scroller';
import { useStyles, StyledTableCell, StyledTableRow } from './styles';

import { ContribuinteContext } from '../../contexts';
import FormCadContribuinte from './FormCadContribuinte/FormCadContribuinte';

function Contribuintes(props) {
  const { contribuinte } = props;
  const {
    handleOrderSort,
    setPagination,
    handleParams,
    pagination,
    listContribuinte
  } = useContext(ContribuinteContext);

  const classes = useStyles();
  const [checked, setChecked] = useState(!!contribuinte);
  const [transation, setTrasation] = useState(!contribuinte);
  const timeTransection = useRef();
  const [contribuinteSelected, setContribuinteSelected] = useState(
    contribuinte || {}
  );

  useEffect(() => {
    timeTransection.current = setTimeout(() => {
      setTrasation((value) => !value);
    }, 200);
    return () => {
      clearTimeout(timeTransection.current);
    };
  }, [checked]);

  const handleOpenNew = useCallback(() => {
    setContribuinteSelected({});
    setChecked((value) => !value);
  }, []);

  const handleSelectedContribuinte = useCallback((data) => {
    setContribuinteSelected(data);
    setChecked(true);
  }, []);

  return (
    <main className={classes.layout}>
      <CssBaseline />
      <Zoom
        in={!checked}
        style={{
          transitionDelay: !checked ? '200ms' : '0ms',
          display: transation ? 'none' : 'flex'
        }}>
        <Box style={{ maxHeight: '62vh', overflow: 'auto', marginTop: 10 }}>
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
            <TableContainer component={Paper}>
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
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="text"
                        className={classes.searchdoc}
                        size="small"
                        id="doc"
                        onChange={handleParams}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="text"
                        className={classes.searchNome}
                        size="small"
                        id="nome"
                        onChange={handleParams}
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        className={classes.searchTipo}
                        size="small"
                        id="tipo"
                        onChange={handleParams}
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        className={classes.searchEndereco}
                        size="small"
                        id="enderecoCidade"
                        onChange={handleParams}
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listContribuinte.map((value) => (
                    <StyledTableRow key={value.id}>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleSelectedContribuinte(value)}
                          color="primary"
                          size="small"
                          variant="contained"
                          aria-label="edit contribuinte"
                          component="span"
                          startIcon={<Icon>edit</Icon>}>
                          {value.id}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Typography variant="inherit" style={{ fontSize: 12 }}>
                          {value.doc}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="inherit" style={{ fontSize: 12 }}>
                          {value.nome}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="inherit" style={{ fontSize: 12 }}>
                          {value.tipo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="inherit" style={{ fontSize: 12 }}>
                          {value.cidade} | {value.bairro} | {value.endereco}
                        </Typography>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={classes.loader}>
              {listContribuinte.length === 0 && (
                <CircularProgress color="primary" />
              )}
            </div>
          </InfiniteScroll>
        </Box>
      </Zoom>
      <Zoom
        in={checked}
        style={{
          transitionDelay: checked ? '200ms' : '0ms',
          display: transation ? 'flex' : 'none'
        }}>
        <Box>
          <FormCadContribuinte
            contribuinteSelected={contribuinteSelected}
            closeWindow={handleOpenNew}
          />
        </Box>
      </Zoom>
      {!checked && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="inherit" component="h4">
                Contribuintes: {listContribuinte.length} de {pagination.total}
              </Typography>
            </Paper>
            <Grid
              style={{ marginTop: 10 }}
              container
              direction="row"
              justify="flex-end"
              alignItems="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleOpenNew}>
                  Novo
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </main>
  );
}

export default memo(Contribuintes);
