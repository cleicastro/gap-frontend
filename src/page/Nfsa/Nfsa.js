import React, { useState, useCallback } from 'react';
import { Grid, Box } from '@material-ui/core';

import { NfsaProvider } from '../../contexts';
import {
  TableNfsa,
  ModalDetailsNfsa,
  Header,
  Filtros,
  NewNfsa
} from './components';
import useStyles from './styles';
import CardNfsa from './components/CardNfsa/CardNfsa';
import { useNfsa } from '../../hooks';

const Nfsa = () => {
  useNfsa();
  const classes = useStyles();
  const [viewTable, setViewTable] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [openFilter, setOpenFilter] = useState(false);

  // ctrl+espaço => nova nfsa
  /* document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.keyCode === 32) {
      setNewNfsa(true);
    }
  }); */

  const handleViewTable = useCallback(() => setViewTable((prev) => !prev), []);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter((prev) => !prev);
  }, []);

  return (
    <NfsaProvider>
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
            {!viewTable ? <CardNfsa /> : <TableNfsa />}
          </Grid>
        </Grid>
        <ModalDetailsNfsa />
        <NewNfsa />
        <Filtros showFiltro={openFilter} handleSair={handleOpenFilter} />
      </div>
    </NfsaProvider>
  );
};

export default Nfsa;
