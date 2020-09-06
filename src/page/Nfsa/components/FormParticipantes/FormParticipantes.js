import React, { useContext } from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useForm } from 'react-hook-form';

import ButtonStep from '../../../../components/ButtonStep';
import { useStepNfsa } from '../../../../hooks';
import { NfsaContext, ACTIONS_NFSA } from '../../../../contexts';

function FormParticipantes() {
  const {
    state: { taxpayerSeleted },
    dispatch
  } = useContext(NfsaContext);
  const [stepActivity, setStepActivity] = useStepNfsa();
  const { handleSubmit } = useForm();

  const handleInputPrestador = (values) => {
    dispatch({
      type: ACTIONS_NFSA.SELECT_TAXPAYER,
      payload: { prestador: values }
    });
  };

  const handleInputTomador = (values) => {
    dispatch({
      type: ACTIONS_NFSA.SELECT_TAXPAYER,
      payload: { tomador: values }
    });
  };

  const handleSelectContribuinte = () => {
    setStepActivity(stepActivity + 1);
  };

  return (
    <form onSubmit={handleSubmit(handleSelectContribuinte)}>
      <Grid container justify="space-between" direction="row" spacing={4}>
        <Grid item xs={6} sm={6}>
          <Typography variant="h6" gutterBottom>
            Preecha o Nome, CPF ou CNPJ para buscar o prestador.
          </Typography>
        </Grid>

        <Grid item xs={6} sm={6}>
          <Typography variant="h6" gutterBottom>
            Preecha o Nome, CPF ou CNPJ para buscar o tomador.
          </Typography>
        </Grid>
      </Grid>

      <ButtonStep
        disabledNext={!taxpayerSeleted.prestador || !taxpayerSeleted.tomador}
        activeStep={stepActivity}
      />
    </form>
  );
}
export default FormParticipantes;
