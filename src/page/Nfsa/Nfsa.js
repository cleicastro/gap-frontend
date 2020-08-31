import React, { useState } from 'react';
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

  return (
    <NfsaProvider>
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
            {!viewTable ? <CardNfsa /> : <TableNfsa />}
          </Grid>
        </Grid>
        <ModalDetailsNfsa />
        <NewNfsa />
        <Filtros
          showFiltro={openFilter}
          handleSair={() => setOpenFilter(false)}
        />
      </div>
    </NfsaProvider>
  );
};

export default Nfsa;
