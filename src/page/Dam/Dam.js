import React, { useState } from 'react';
import { Grid, Fab, Box } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import { DamProvider } from '../../contexts';
import { TableDam, NewDam } from './components';
import { HeaderContainerReceita } from '../../components';
import useStyles from './styles';
import CardDam from './components/CardDam/CardDam';
// import NewDam from './components/NewDam/NewDam';

const Dam = () => {
  const classes = useStyles();
  const [viewTable, setViewTable] = useState(false);
  const [showNewDam, setNewDam] = useState(false);

  // ctrl+espaço => nova Dam
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.keyCode === 32) {
      setNewDam(true);
    }
  });
  return (
    <div className={classes.root}>
      <DamProvider handleOpenNewDam={setNewDam} openNewDam={showNewDam}>
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
            {!viewTable && <CardDam className="card" handleDamDetail={{}} />}
            {viewTable && <TableDam />}
          </Grid>
        </Grid>
        {/* <ModalDetailsDam /> */}
        <NewDam />
      </DamProvider>
      <Box displayPrint="none" className={classes.fab}>
        <Fab
          color="primary"
          size="medium"
          aria-label="add"
          onClick={() => setNewDam((show) => !show)}>
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
};

export default Dam;
