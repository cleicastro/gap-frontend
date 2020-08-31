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
  FormParticipantes,
  FormItems,
  FormTributos,
  FormDocumento,
  PreviewNfsa
} from '../..';
import { useStepNfsa } from '../../../../../hooks';

const steps = ['Participantes', 'Itens', 'Tributos', 'DAM', 'Confirmar dados'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FormParticipantes />;
    case 1:
      return <FormItems />;
    case 2:
      return <FormTributos />;
    case 3:
      return <FormDocumento />;
    case 4:
      return <PreviewNfsa />;
    default:
      throw new Error('Unknown step');
  }
}

function StepComponent() {
  const classes = useStyles();
  const [activeStep] = useStepNfsa();
  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Emissão de Nota Viscal de Serviço Avulsa
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
