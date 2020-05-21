import React from 'react';
import { List, ListItem, ListItemText, Divider, Grid } from '@material-ui/core';

import useStyles from './styles';

function FormReceita({ receitas, handleReceita, receitaSelected }) {
  const classes = useStyles();

  const receitaSelect = receitas.filter(
    (r) => r.cod !== '1121250000' && r.cod !== '1113050101'
  );

  return (
    <Grid container spacing={3}>
      <Grid item sm={12}>
        <List
          component="nav"
          className={classes.root}
          aria-label="mailbox folders">
          {receitaSelect.map((receita) => (
            <React.Fragment key={receita.cod}>
              <ListItem
                button
                divider
                onClick={() => handleReceita(receita)}
                dense
                selected={receita.cod === receitaSelected.cod}>
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
  );
}

export default FormReceita;
