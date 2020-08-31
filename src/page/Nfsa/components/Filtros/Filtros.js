import React, { useContext } from 'react';

import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

import useStyles from './styles';
import FormFilter from './FormFilter';
import { useFilterNfsa } from '../../../../hooks';
import { NfsaContext } from '../../../../contexts';

function Filtros({ handleSair, showFiltro }) {
  const classes = useStyles();
  const {
    state: { receitaSeleted }
  } = useContext(NfsaContext);

  // eslint-disable-next-line no-unused-vars
  const [statusServer, setFilter] = useFilterNfsa();

  const { handleSubmit, control, register, setValue, reset } = useForm();

  const theme = useTheme();
  const fullScreenModal = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClearFilter = () => {
    setFilter({});
    reset();
  };
  const setParams = (data) => {
    const filter = { ...data, receitaFilter: receitaSeleted.cod };
    setFilter(filter);
  };

  return (
    <Dialog
      fullScreen={fullScreenModal}
      open={showFiltro}
      maxWidth="lg"
      aria-labelledby="customized-dialog-title">
      <form
        onSubmit={handleSubmit(setParams)}
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
              <FormFilter
                register={register}
                control={control}
                setValue={setValue}
              />
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
    </Dialog>
  );
}

export default Filtros;
