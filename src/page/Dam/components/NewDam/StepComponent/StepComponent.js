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
import { FormDocumento } from '../../../../../components';
import { FormContribuinte, FormReceita, PreviewDam } from '../..';
import { useStep } from '../../../../../hooks';

const steps = ['Receita', 'Contribuinte', 'Documento', 'Confirmar dados'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FormReceita />;
    case 1:
      return <FormContribuinte />;
    case 2:
      return <FormDocumento />;
    case 3:
      return <PreviewDam />;
    default:
      throw new Error('Unknown step');
  }
}

function StepComponent() {
  const classes = useStyles();
  const [activeStep] = useStep();
  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Emissão de Nota Fiscal Avulsa de Serviço
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
