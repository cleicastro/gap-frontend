import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { DamContext, ACTIONS } from '../../../../contexts';
import { useStepDam } from '../../../../hooks';
import { FormCompleteContribuinte, ButtonStep } from '../../../../components';

function FormContribuinte() {
  const {
    state: { taxpayerSeleted },
    dispatch
  } = useContext(DamContext);
  const [stepActivity, setStepActivity] = useStepDam();

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

  const handlePrevStep = () => setStepActivity(stepActivity - 1);

  const handleSelectContribuinte = () => {
    setStepActivity(stepActivity + 1);
  };

  return (
    <form onSubmit={handleSubmit(handleSelectContribuinte)}>
      <Typography variant="h6" gutterBottom>
        Preencha o Nome, CPF ou CNPJ para buscar o contribuinte.
      </Typography>
      <FormCompleteContribuinte
        className="formContribuinteNFSA"
        selectOption={handleInputContribuinte}
        selectOptionEdit={handleInputEditContribuinte}
        selectedInitial={taxpayerSeleted}
      />
      <ButtonStep
        handlePrevStep={handlePrevStep}
        disabledNext={!taxpayerSeleted.id}
      />
    </form>
  );
}
export default FormContribuinte;
