import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import useStyles from './styles';

function ButtonStep({
  disabledNext,
  disabledBack,
  disableSave,
  handlePrevStep,
  handleSave,
  activeStep
}) {
  const classes = useStyles();
  return (
    <div className={classes.buttons}>
      {activeStep !== 0 && (
        <Button
          type="submit"
          onClick={handlePrevStep}
          disabled={disabledBack}
          className={classes.button}>
          Voltar
        </Button>
      )}
      {disableSave ? (
        <Button
          disabled={disabledNext}
          type="submit"
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
  disabledBack: false
};

ButtonStep.propTypes = {
  disabledNext: PropTypes.bool,
  disabledBack: PropTypes.bool,
  disableSave: PropTypes.bool,
  handlePrevStep: PropTypes.func,
  handleSave: PropTypes.func
};

export default ButtonStep;
