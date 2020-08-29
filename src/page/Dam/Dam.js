import React, { useState } from 'react';

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
  const [viewTable, setViewTable] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <DamProvider>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box displayPrint="none">
              <Header
                handleViewTable={() => setViewTable((prev) => !prev)}
                handleViewFilter={() => setOpenFilter((prev) => !prev)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            {!viewTable ? <CardDam /> : <TableDam />}
          </Grid>
        </Grid>
      </div>
      <NewDam />
      <ModalDetailsDam />
      <Filtros
        showFiltro={openFilter}
        handleSair={() => setOpenFilter(false)}
      />
    </DamProvider>
  );
};

export default Dam;
