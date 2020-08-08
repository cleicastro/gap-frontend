import React, { useState } from 'react';
import { Grid, Fab, Box } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import { NfsaProvider } from '../../contexts';
import { TableNfsa, ModalDetailsNfsa } from './components';
import { HeaderContainerReceita } from '../../components';
import useStyles from './styles';
import CardNfsa from './components/CardNfsa/CardNfsa';
import NewNfsa from './components/NewNfsa/NewNfsa';

const Nfsa = () => {
  const classes = useStyles();
  const [viewTable, setViewTable] = useState(false);
  const [showNewNfsa, setNewNfsa] = useState(false);

  // ctrl+espaço => nova nfsa
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.keyCode === 32) {
      setNewNfsa(true);
    }
  });

  return (
    <div className={classes.root}>
      <NfsaProvider handleOpenNewNfsa={setNewNfsa} openNewNfsa={showNewNfsa}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box displayPrint="none">
              <HeaderContainerReceita
                handleVielTable={() => setViewTable((prev) => !prev)}
                handleViewFilter={() => console.log('OK')}
                ValueTotal={345}
                setParams={() => console.log('OK')}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            {!viewTable && <CardNfsa />}
            {viewTable && <TableNfsa />}
          </Grid>
        </Grid>
        <ModalDetailsNfsa />
        <NewNfsa />
      </NfsaProvider>
      <Box displayPrint="none" className={classes.fab}>
        <Fab
          color="primary"
          size="medium"
          aria-label="add"
          onClick={() => setNewNfsa((show) => !show)}>
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
};

export default Nfsa;
