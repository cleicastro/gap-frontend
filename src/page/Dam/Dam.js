import React, { useState, useCallback } from 'react';

import { Grid, Box } from '@material-ui/core';

import { DamProvider } from '../../contexts';
import {
  TableDam,
  NewDam,
  ModalDetailsDam,
  Header,
  Filtros,
  CardDam
} from './components';
import useStyles from './styles';
import { useRequestReceita } from '../../hooks';

const Dam = () => {
  useRequestReceita();
  const classes = useStyles();
  const [viewTable, setViewTable] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);

  const handleViewTable = useCallback(() => setViewTable((prev) => !prev), []);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter((prev) => !prev);
  }, []);

  return (
    <DamProvider>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box displayPrint="none">
              <Header
                handleViewTable={handleViewTable}
                handleViewFilter={handleOpenFilter}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            {viewTable ? <TableDam /> : <CardDam />}
          </Grid>
        </Grid>
      </div>
      <NewDam />
      <ModalDetailsDam />
      <Filtros showFiltro={openFilter} handleSair={handleOpenFilter} />
    </DamProvider>
  );
};

export default Dam;
