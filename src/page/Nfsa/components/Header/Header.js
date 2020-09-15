/* eslint-disable no-unused-vars */
import React, { useRef, useContext, useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  InputBase,
  IconButton,
  Paper
} from '@material-ui/core';
import {
  Print as PrintIcon,
  FilterList as FilterListIcon,
  ViewList as ViewListIcon,
  Search as SearchIcon
} from '@material-ui/icons';

import useStyles from './styles';
import { useStoreNfsa, useFilterNfsa, useNfsa } from '../../../../hooks';
import { NfsaContext } from '../../../../contexts';

function Header({ handleViewTable, handleViewFilter }) {
  const classes = useStyles();
  const timerToClearSomewhere = useRef(false);
  const [params, setParams] = useState('');

  const [listNfsa, valueTotal] = useStoreNfsa();
  const [statusServer, setFilter] = useFilterNfsa();
  const {
    state: { paramsQuery }
  } = useContext(NfsaContext);

  useEffect(() => {
    if (params.length > 0 && params.length > 5) {
      timerToClearSomewhere.current = setTimeout(() => {
        setFilter({ contribuinte: params });
      }, 500);
    } else if (Object.keys(paramsQuery).length > 0 && params === '') {
      setFilter({});
    }
    return () => {
      clearTimeout(timerToClearSomewhere.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <Paper className={classes.paper} justify="space-between">
      <Grid container justify="space-between">
        <Typography variant="h4" className={classes.differenceValue}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(valueTotal)}
        </Typography>
        <Grid item>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              id="fastSearch"
              name="fastSearch"
              value={params}
              onChange={(event) => setParams(event.target.value)}
              placeholder="Buscar o prestador pelo Nome, CNPJ ou CPF"
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
            onClick={handleViewFilter}
            size="small"
            aria-label="Filtros"
            className={classes.iconMenu}>
            <FilterListIcon />
          </IconButton>
          <IconButton
            onClick={handleViewTable}
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
      {/* <Filtros /> */}
    </Paper>
  );
}

export default Header;
