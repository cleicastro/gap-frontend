import React, { useCallback } from 'react';

import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import useStyles from './styles';
import FormFilter from './FormFilter';
import { useFilterNfsa } from '../../../../hooks';

function Filtros({ handleSair, showFiltro }) {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const setFilter = useFilterNfsa();

  const methods = useForm();

  const theme = useTheme();
  const fullScreenModal = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClearFilter = useCallback(() => {
    setFilter({});
    methods.reset();
    handleSair();
  }, [handleSair, methods, setFilter]);

  const setParams = (data) => {
    const filter = { ...data };
    setFilter(filter);
    handleSair();
  };

  return (
    <Dialog
      fullScreen={fullScreenModal}
      open={showFiltro}
      maxWidth="lg"
      aria-labelledby="customized-dialog-title">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(setParams)}
          noValidate
          autoComplete="off"
          id="formFiltro">
          <DialogContent dividers>
            <Grid
              container
              spacing={2}
              justify="flex-start"
              alignItems="flex-start"
              className={classes.root}>
              <Grid item>
                <FormFilter />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Filtrar
            </Button>
            <Button onClick={handleClearFilter} color="primary">
              Limpar
            </Button>
            <Button onClick={handleSair} color="primary">
              Sair
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}

export default Filtros;
