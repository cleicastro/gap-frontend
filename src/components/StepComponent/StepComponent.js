import React from 'react';

import {
  CssBaseline,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button
} from '@material-ui/core';
import useStyles from './styles';
import FormContribuinte from '../FormContribuinte';
import FormDocumento from '../FormDocumento';
import Review from '../Review';

function StepComponent({ steps, title }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FormContribuinte />;
      case 1:
        return <FormDocumento />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            {title}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  DAM gerado com sucesso!
                </Typography>
                <Typography variant="subtitle1">
                  O Número do seu DAM é #2001539. Selecione um envento para este
                  documento.
                </Typography>
              </>
            ) : (
                <>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Voltar
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Salvar' : 'Avançar'}
                    </Button>
                  </div>
                </>
              )}
          </>
        </Paper>
      </main>
    </>
  );
}

export default StepComponent;
