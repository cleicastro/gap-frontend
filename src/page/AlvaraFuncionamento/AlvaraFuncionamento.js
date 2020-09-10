import React, { useState, useCallback } from 'react';
import { Grid, Box } from '@material-ui/core';
import useStyles from './styles';
import {
  Header,
  CardAlvara,
  ModalDetails,
  TableAlvara,
  Filtros,
  NewAlvara
} from './components';
import { AlvaraFuncionamentoProvider } from '../../contexts';

function AlvaraFuncionamento() {
  const classes = useStyles();
  const [viewTable, setViewTable] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [openFilter, setOpenFilter] = useState(false);

  const handleViewTable = useCallback(() => setViewTable((prev) => !prev), []);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter((prev) => !prev);
  }, []);

  return (
    <AlvaraFuncionamentoProvider>
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
            {viewTable ? <TableAlvara /> : <CardAlvara />}
          </Grid>
        </Grid>
      </div>
      <NewAlvara />
      <ModalDetails />
      <Filtros showFiltro={openFilter} handleSair={handleOpenFilter} />
    </AlvaraFuncionamentoProvider>
  );
}

export default AlvaraFuncionamento;
