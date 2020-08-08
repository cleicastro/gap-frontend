import React from 'react';
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

function HeaderContainerReceita({
  handleViewTable,
  handleViewFilter,
  ValueTotal,
  setParams
}) {
  const classes = useStyles();
  return (
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
              onChange={(e) => setParams({ contribuinte: e.target.value })}
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
    </Paper>
  );
}

export default HeaderContainerReceita;
