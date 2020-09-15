import React, { useContext } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import ButtonStep from '../../../../components/ButtonStep';
import { NfsaContext, ACTIONS_NFSA } from '../../../../contexts';
import { FormCompleteContribuinte } from '../../../../components';
// eslint-disable-next-line import/named
import { useStepNfsa } from '../../../../hooks';

function FormParticipantes() {
  const {
    state: { taxpayerSeleted },
    dispatch
  } = useContext(NfsaContext);
  const [stepActivity, setStepActivity] = useStepNfsa();
  const { handleSubmit } = useForm();

  const handleInputPrestador = (values) => {
    if (values.doc && values.doc !== '') {
      dispatch({
        type: ACTIONS_NFSA.SELECT_TAXPAYER,
        payload: { prestador: values }
      });
    } else {
      dispatch({
        type: ACTIONS_NFSA.MODAL_CONTRIBUINTES,
        payload: values
      });
    }
  };
  const handleInputTomador = (values) => {
    if (values.doc && values.doc !== '') {
      dispatch({
        type: ACTIONS_NFSA.SELECT_TAXPAYER,
        payload: { tomador: values }
      });
    } else {
      dispatch({
        type: ACTIONS_NFSA.MODAL_CONTRIBUINTES,
        payload: values
      });
    }
  };

  const handleInputEditContribuinte = (data) => {
    dispatch({
      type: ACTIONS_NFSA.MODAL_CONTRIBUINTES,
      payload: data
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
            Preencha o Nome, CPF ou CNPJ para buscar o prestador.
          </Typography>
          <FormCompleteContribuinte
            autoFocus
            className="formTomadorNFSA"
            selectOption={handleInputPrestador}
            selectOptionEdit={handleInputEditContribuinte}
            selectedInitial={taxpayerSeleted.prestador || taxpayerSeleted}
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <Typography variant="h6" gutterBottom>
            Preencha o Nome, CPF ou CNPJ para buscar o tomador.
          </Typography>
          <FormCompleteContribuinte
            autoFocus={false}
            className="formPrestadorNFSA"
            selectOption={handleInputTomador}
            selectOptionEdit={handleInputEditContribuinte}
            selectedInitial={taxpayerSeleted.tomador || taxpayerSeleted}
          />
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
