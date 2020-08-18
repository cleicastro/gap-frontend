import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Divider, Grid } from '@material-ui/core';

import { DamContext } from '../../contexts';

import ButtonStep from '../ButtonStep';
import useStyles from './styles';

function FormReceita({ steps, activeStep, setActiveStep }) {
  const { receitas, handleSelectReceita } = useContext(DamContext);
  const classes = useStyles();

  function handleNext() {
    setActiveStep(activeStep + 1);
  }

  function handleBack() {
    setActiveStep(activeStep - 1);
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <List
            component="nav"
            className={classes.root}
            aria-label="mailbox folders">
            {receitas.map((receita) => (
              <React.Fragment key={receita.cod}>
                <ListItem
                  button
                  divider
                  onClick={() => handleSelectReceita(receita)}
                  dense
                  selected={false}>
                  <ListItemText
                    primary={`${receita.descricao} - ${receita.sigla}`}
                    secondary={receita.cod}
                  />
                </ListItem>
                <Divider light />
              </React.Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
      <ButtonStep
        steps={steps}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </>
  );
}

export default FormReceita;
