import React, { useState } from 'react';
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
  FormTributos
} from '../../../../../components';
import PreviewNfsa from '../../PreviewNfsa';

const steps = [
  'Participantes',
  'Itens',
  'Tributos',
  'Documento',
  'Confirmar dados'
];

function StepComponent() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <FormParticipantes
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 1:
        return (
          <FormItems
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 2:
        return (
          <FormTributos
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 3:
        return (
          <FormTributos
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 4:
        return (
          <PreviewNfsa
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
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
