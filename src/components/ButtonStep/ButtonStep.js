import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import useStyles from './styles';

function ButtonStep({
  steps,
  activeStep,
  handleBack,
  handleNext,
  handleSave,
  disabledNext,
  disabledBack
}) {
  const classes = useStyles();

  return (
    <div className={classes.buttons}>
      {activeStep !== 0 && (
        <Button
          disabled={disabledBack}
          type="button"
          onClick={handleBack}
          className={classes.button}>
          Voltar
        </Button>
      )}
      <Button
        disabled={disabledNext}
        type={activeStep === steps.length - 1 ? 'submit' : 'button'}
        onClick={() =>
          activeStep === steps.length - 1 ? handleSave() : handleNext()
        }
        variant="contained"
        color="primary"
        className={classes.button}>
        {activeStep === steps.length - 1 ? 'Salvar' : 'Avançar'}
      </Button>
    </div>
  );
}

ButtonStep.defaultProps = {
  disabledNext: false,
  disabledBack: false
};

ButtonStep.propTypes = {
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  handleSave: PropTypes.func,
  disabledNext: PropTypes.bool,
  disabledBack: PropTypes.bool
};

export default ButtonStep;
