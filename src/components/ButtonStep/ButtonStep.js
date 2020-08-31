import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import useStyles from './styles';

function ButtonStep({
  disabledNext,
  disabledBack,
  disableSave,
  handlePrevStep,
  handleNextStep,
  handleSave,
  activeStep,
  type
}) {
  const classes = useStyles();
  return (
    <div className={classes.buttons}>
      {activeStep !== 0 && (
        <Button
          type={type}
          onClick={handlePrevStep}
          disabled={disabledBack}
          className={classes.button}>
          Voltar
        </Button>
      )}
      {disableSave ? (
        <Button
          disabled={disabledNext}
          type={type}
          onClick={handleNextStep}
          variant="contained"
          color="primary"
          className={classes.button}>
          Avançar
        </Button>
      ) : (
          <Button
            onClick={handleSave}
            type="button"
            variant="contained"
            color="primary"
            className={classes.button}>
            Salvar
          </Button>
        )}
    </div>
  );
}

ButtonStep.defaultProps = {
  disableSave: true,
  disabledNext: false,
  disabledBack: false,
  type: 'submit'
};

ButtonStep.propTypes = {
  disabledNext: PropTypes.bool,
  disabledBack: PropTypes.bool,
  disableSave: PropTypes.bool,
  handlePrevStep: PropTypes.func,
  handleNextStep: PropTypes.func,
  handleSave: PropTypes.func,
  type: PropTypes.string
};

export default ButtonStep;
