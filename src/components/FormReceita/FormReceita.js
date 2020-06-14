import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Divider, Grid } from '@material-ui/core';

import { NewDocumentArrecadacaoContext } from '../../contexts/NewDocumentArrecadacao';

import useStyles from './styles';

function FormReceita() {
  const { selectedReceita, listReceita, handleSelectReceita } = useContext(
    NewDocumentArrecadacaoContext
  );

  const classes = useStyles();

  const receitaSelect = listReceita.filter(
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
                onClick={() => handleSelectReceita(receita)}
                dense
                selected={receita.cod === selectedReceita.cod}>
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
