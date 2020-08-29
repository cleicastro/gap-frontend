import React from 'react';
import {
  CssBaseline,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel
} from '@material-ui/core';

import useStyles from './styles';
import {
  FormContribuinte,
  Preview,
  FormAlvaraFuncionamento,
  FormDocumento
} from '../..';
import { useStepAlvara } from '../../../../../hooks';

const steps = ['Contribuinte', 'Alvará', 'Documento', 'Confirmar dados'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FormContribuinte />;
    case 1:
      return <FormAlvaraFuncionamento />;
    case 2:
      return <FormDocumento />;
    case 3:
      return <Preview />;
    default:
      throw new Error('Unknown step');
  }
}

function StepComponent() {
  const classes = useStyles();
  const [activeStep] = useStepAlvara();
  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Emissão de Alvará de Funcionamento
          </Typography>

          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent(activeStep)}
        </Paper>
      </main>
    </>
  );
}

export default StepComponent;
