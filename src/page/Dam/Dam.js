import React, { useState, useEffect } from 'react';

import {
  Grid,
  Paper,
  Typography,
  Fab,
  IconButton,
  InputBase,
  CircularProgress
} from '@material-ui/core';
import {
  Add as AddIcon,
  Print as PrintIcon,
  FilterList as FilterListIcon,
  ViewList as ViewListIcon,
  Search as SearchIcon
} from '@material-ui/icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import { requestDam } from '../../store/damReducer';
import { requestReceita } from '../../store/receitaReducer';
import useStyles from './styles';
import CardDam from './components/CardDam/CardDam';
import Filtros from './components/Filtros/Filtros';
import NewDam from './components/NewDam/NewDam';

function Dam({
  listDam,
  pagination,
  ValueTotal,
  requestDam: handleListDam,
  listReceita,
  requestReceita: handleListReceita
}) {
  const [showFiltro, setShowFiltro] = useState(false);
  const [showNewDam, setShowNewDam] = useState(false);
  const [listReceitaFiltro, setListReceitaFiltro] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    handleListDam({
      order: 'id',
      sort: 'DESC',
      page: 0
    });

    handleListReceita();
  }, [handleListDam, handleListReceita]);

  useEffect(() => {
    const listReceitaMap = [];
    listReceita.map((d) => listReceitaMap.push(d.descricao));
    setListReceitaFiltro(listReceitaMap);
  }, [listReceita]);

  const setPage = () => {
    handleListDam({
      order: 'id',
      sort: 'DESC',
      page: Number(pagination.current_page) + 1
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper} justify="space-between">
            <Grid container justify="space-between">
              <Typography variant="h4" className={classes.differenceValue}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(ValueTotal)}
              </Typography>
              <Grid item>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Buscar Contribuinte"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => setShowFiltro((show) => !show)}
                  size="small"
                  aria-label="Filtros"
                  className={classes.iconMenu}>
                  <FilterListIcon />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="Tabela"
                  className={classes.iconMenu}>
                  <ViewListIcon />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="Imprimir"
                  className={classes.iconMenu}>
                  <PrintIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <InfiniteScroll
            threshold={550}
            pageStart={0}
            loadMore={setPage}
            hasMore={pagination.current_page < pagination.last_page}
            loader={
              <div className={classes.loader} key={0}>
                <CircularProgress color="primary" />
              </div>
            }>
            <CardDam listDam={listDam} />
          </InfiniteScroll>
        </Grid>
      </Grid>
      <Filtros
        showFiltro={showFiltro}
        listReceita={listReceitaFiltro}
        handleParams={(handleParm) => console.log(handleParm)}
        handleFiltroShow={() => setShowFiltro((show) => !show)}
      />
      <NewDam
        handleClose={() => setShowNewDam((show) => !show)}
        open={showNewDam}
      />
      <Fab
        color="primary"
        size="medium"
        aria-label="add"
        onClick={() => setShowNewDam((show) => !show)}
        className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => ({
  listDam: state.dam.listDam,
  pagination: state.dam.pagination,
  ValueTotal: state.dam.listDam.reduce(
    (accumator, currentValue) =>
      Number(accumator) + Number(currentValue.valor_total),
    0
  ),
  listReceita: state.receita.listReceita
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestDam, requestReceita }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dam);
