import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import {
  AlvaraFuncionamentoContext,
  ACTIONS_ALVARA as ACTIONS
} from '../../../../contexts';
import { useStepAlvara } from '../../../../hooks';
import { ButtonStep, FormCompleteContribuinte } from '../../../../components';

function FormContribuinte() {
  const {
    state: { taxpayerSeleted, dataAlvaraFuncionamento },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);
  const [stepActivity, setStepActivity] = useStepAlvara();
  const { handleSubmit } = useForm();

  console.log(dataAlvaraFuncionamento);
  const handleInputContribuinte = (values) => {
    if (values.doc && values.doc !== '') {
      dispatch({ type: ACTIONS.SELECT_TAXPAYER, payload: values });
      dispatch({
        type: ACTIONS.SELECT_ALVARA_FUNCIONAMENTO,
        payload: {
          id_dam: dataAlvaraFuncionamento.id_dam,
          dam: { ...dataAlvaraFuncionamento.dam, contribuinte: values }
        }
      });
    } else {
      dispatch({
        type: ACTIONS.MODAL_CONTRIBUINTES,
        payload: values
      });
    }
  };

  const handleInputEditContribuinte = (data) => {
    dispatch({
      type: ACTIONS.MODAL_CONTRIBUINTES,
      payload: data
    });
  };

  const handleSelectContribuinte = () => {
    setStepActivity(stepActivity + 1);
  };

  return (
    <form onSubmit={handleSubmit(handleSelectContribuinte)}>
      <Typography variant="h6" gutterBottom>
        Preencha o Nome, CPF ou CNPJ para buscar o contribuinte.
      </Typography>
      <FormCompleteContribuinte
        className="formContribuinteDAM"
        selectOption={handleInputContribuinte}
        selectOptionEdit={handleInputEditContribuinte}
        selectedInitial={taxpayerSeleted}
      />
      <ButtonStep
        disabledNext={!taxpayerSeleted.id}
        activeStep={stepActivity}
      />
    </form>
  );
}
export default FormContribuinte;
