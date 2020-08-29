import React, { useState } from 'react';
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
import { useAlvara } from '../../hooks';

function AlvaraFuncionamento() {
  useAlvara();

  const classes = useStyles();
  const [viewTable, setViewTable] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <AlvaraFuncionamentoProvider>
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
            {!viewTable ? <CardAlvara /> : <TableAlvara />}
          </Grid>
        </Grid>
      </div>
      <NewAlvara />
      <ModalDetails />
      <Filtros
        showFiltro={openFilter}
        handleSair={() => setOpenFilter(false)}
      />
    </AlvaraFuncionamentoProvider>
  );
}

export default AlvaraFuncionamento;
