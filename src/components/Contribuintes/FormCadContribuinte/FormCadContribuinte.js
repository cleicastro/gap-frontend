import React, { useContext } from 'react';
import { AppBar, Button, Stepper, Step, StepLabel } from '@material-ui/core';
import { Save, Edit, Add } from '@material-ui/icons';

import useStyles from './styles';

import FormEndereco from './FormEndereco';
import FormBancario from './FormBancario';
import FormInfoPessoais from './FormInfoPessoais';

import { ContribuinteContext } from '../../../contexts';

function FormCadContribuinte() {
  const {
    handleResetContribuinte,
    isDisbledForm,
    handleDisabledForm,
    handleSubmit,
    activeStep,
    steps,
    onSubmit,
    handleNext,
    handleBack,
    isLastStep
  } = useContext(ContribuinteContext);

  const classes = useStyles();

  function renderStepContent(step) {
    switch (step) {
      case 0:
        return <FormInfoPessoais />;
      case 1:
        return <FormEndereco />;
      case 2:
        return <FormBancario />;
      default:
        return <div>Not Found</div>;
    }
  }

  return (
    <div>
      <p />
      <AppBar position="static" color="default">
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        {renderStepContent(activeStep)}
        <div className={classes.buttons}>
          <div className={classes.wrapper}>
            {activeStep !== 0 && (
              <Button
                onClick={handleBack}
                className={classes.button}
                size="small">
                Voltar
              </Button>
            )}
            {!isLastStep && (
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}>
                Avançar
              </Button>
            )}
            {!isDisbledForm && isLastStep && (
              <Button
                disabled={isDisbledForm}
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<Save />}>
                Salvar
              </Button>
            )}
            {isDisbledForm && (
              <Button
                disabled={!isDisbledForm}
                onClick={handleDisabledForm}
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<Edit />}>
                Editar
              </Button>
            )}
            <Button
              onClick={() => {
                handleResetContribuinte();
              }}
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              startIcon={<Add />}>
              Novo
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormCadContribuinte;
