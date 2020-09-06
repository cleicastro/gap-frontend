import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';

import { useForm } from 'react-hook-form';
// import { Edit, Add } from '@material-ui/icons';
import {
  AlvaraFuncionamentoContext,
  ACTIONS_ALVARA as ACTIONS
} from '../../../../contexts';
import { useStepAlvara } from '../../../../hooks';
import { ButtonStep } from '../../../../components';
import FormCompleteContribuinte from '../../../../components/FormCompleteContribuinte/FormCompleteContribuinte';

function FormContribuinte() {
  const {
    state: { taxpayerSeleted },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);
  const [stepActivity, setStepActivity] = useStepAlvara();
  const { handleSubmit } = useForm();

  const handleInputContribuinte = (values) => {
    if (values.doc && values.doc !== '') {
      dispatch({ type: ACTIONS.SELECT_TAXPAYER, payload: values });
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
        Preecha o Nome, CPF ou CNPJ para buscar o contribuinte.
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
