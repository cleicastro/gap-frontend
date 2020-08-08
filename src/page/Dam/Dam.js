/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';

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

import { requestDam, cleanDataDAM } from '../../store/damReducer';
import { requestReceita } from '../../store/receitaReducer';
import {
  CardDam,
  Filtros,
  NewDam,
  TableDam,
  ModalDetailsDam
} from './components';
import { CardSkeletron } from '../../components';
import useStyles from './styles';

function Dam({
  listDam,
  pagination,
  ValueTotal,
  requestDam: handleListDam,
  cleanDataDAM: handleCleanDam,
  // updateDataDam: handleUpdateData,
  listReceita,
  requestReceita: handleListReceita
}) {
  const [showFiltro, setShowFiltro] = useState(false);
  const [showNewDam, setShowNewDam] = useState(false);
  const [viewTable, setViewTable] = useState(false);
  const [showReview, setReviewShow] = useState(false);
  const [damView, setDamView] = useState({});
  const [order, setOrder] = useState('id');
  const [sort, setSort] = useState(false);
  const [params, setParams] = useState({});
  const [paramsFilter, setParamsFilter] = useState({});
  const [isProgress, setIsProgress] = useState(false);
  const [dataDam, setDataDam] = useState({});
  const timerToClearSomewhere = useRef(false);

  const classes = useStyles();

  const itensSkeletron = [];
  const quantSkeletron = 10;
  for (let i = 0; i < quantSkeletron; i++) {
    itensSkeletron.push(i);
  }

  useEffect(() => {
    if (showNewDam) {
      handleCleanDam();
    }
  }, [handleCleanDam, showNewDam]);

  useEffect(() => {
    const tokenReceita = Axios.CancelToken.source();
    handleListReceita();
    return () => {
      tokenReceita.cancel('Request cancell');
      clearTimeout(timerToClearSomewhere.current);
    };
  }, [handleListReceita]);

  useEffect(() => {
    const tokenDam = Axios.CancelToken.source();
    function requestDam(tokenRequest) {
      setIsProgress(true);
      handleListDam(
        { ...paramsFilter, ...params, order, sort, page: 1 },
        tokenRequest.token
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
  }, [handleListDam, order, params, paramsFilter, sort]);

  useEffect(() => {
    if (listDam.length > 0) {
      setIsProgress(false);
    }
  }, [listDam]);

  const setPagination = () => {
    const tokenDam = Axios.CancelToken.source();
    if (pagination.current_page < pagination.last_page) {
      handleListDam(
        {
          ...paramsFilter,
          ...params,
          order,
          sort,
          page: Number(pagination.current_page) + 1
        },
        tokenDam.token
      );
    }
  };

  const handleModalDetails = (dam) => {
    if (dam) {
      setDamView(dam);
      setReviewShow((show) => !show);
    }
  };

  const handleOrderSort = (campo, isDefaultOrder) => {
    if (campo === order) {
      setSort((isSort) => !isSort);
    } else {
      setSort((isSort) => (isDefaultOrder ? true : !isSort));
      setOrder(campo);
    }
  };

  const handleParamsSearch = (event) => {
    setParamsFilter({});
    setParams({ ...params, [event.target.id]: event.target.value });
  };

  const handleParamsFilter = (data) => {
    setViewTable(false);
    setParams({});
    setParamsFilter(data);
    setShowFiltro((show) => !show);
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
                    id="fastSearch"
                    name="fastSearch"
                    onChange={(e) =>
                      setParams({ contribuinte: e.target.value })
                    }
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
                  onClick={() => setViewTable((show) => !show)}
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
          {isProgress && !viewTable && (
            <CardSkeletron quantSkeletron={itensSkeletron} />
          )}
          <InfiniteScroll
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
            {viewTable && (
              <TableDam
                listDam={listDam}
                handleDamDetail={handleModalDetails}
                handleOrderSort={handleOrderSort}
                handleChangeParams={handleParamsSearch}
                params={params}
                loadSearch={
                  isProgress &&
                  viewTable && (
                    <div className={classes.loader} key={0}>
                      <CircularProgress color="primary" />
                    </div>
                  )
                }
              />
            )}
            {!viewTable && (
              <CardDam listDam={listDam} handleDamDetail={handleModalDetails} />
            )}
          </InfiniteScroll>
        </Grid>
      </Grid>
      <ModalDetailsDam
        handleReviewShow={() => setReviewShow((show) => !show)}
        showReview={showReview}
        handleDamView={damView}
        handleOpenDam={(show) => setShowNewDam(show)}
        handleDataDam={setDataDam}
      />
      <Filtros
        showFiltro={showFiltro}
        listReceita={listReceita}
        handleParams={handleParamsFilter}
        handleFiltroShow={() => {
          setShowFiltro((show) => !show);
          setViewTable(false);
          setParamsFilter({});
          setParams({});
        }}
        handleSair={() => setShowFiltro((show) => !show)}
      />
      <NewDam
        handleClose={() => {
          setShowNewDam((show) => !show);
          setDataDam({});
        }}
        open={showNewDam}
        receitas={listReceita}
        handleDataDam={dataDam}
      />
      <Fab
        color="primary"
        size="medium"
        aria-label="add"
        onClick={() => {
          setShowNewDam((show) => !show);
          // console.log(dataDam);
        }}
        className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => ({
  listDam: state.dam.listDam,
  pagination: state.dam.pagination,
  ValueTotal:
    state.dam.listDam &&
    state.dam.listDam.reduce(
      (accumator, currentValue) =>
        Number(accumator) + Number(currentValue.valor_total),
      0
    ),
  listReceita: state.receita.listReceita,
  updateDam: state.dam.updateDam
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestDam, cleanDataDAM, requestReceita }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dam);
