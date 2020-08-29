import React, { useState, useEffect, useContext } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Typography,
  Avatar,
  InputBase,
  ListItemIcon,
  ListItemSecondaryAction
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Search as SearchIcon } from '@material-ui/icons';

import { useForm } from 'react-hook-form';
import { ButtonStep } from '../../../../components';
import useStyles from './styles';
import { useStoreReceita, useStepDam } from '../../../../hooks';
import { DamContext, ACTIONS } from '../../../../contexts';

function filterReceita(valueFormated, receitas) {
  const params = (receita) => {
    const { sigla, descricao } = receita;
    return sigla.includes(valueFormated) || descricao.includes(valueFormated);
  };
  return receitas.filter(params);
}

function FormReceita() {
  const { dispatch } = useContext(DamContext);
  const classes = useStyles();
  const [receitas, receitaSeleted] = useStoreReceita();
  const [listReceita, setListReceita] = useState(receitas);
  const [stepActivity, setStepActivity] = useStepDam();

  const { handleSubmit } = useForm();

  function handleSelectReceita(receita) {
    dispatch({ type: ACTIONS.SELECT_RECEITA, payload: receita });
    setStepActivity(stepActivity + 1);
  }

  useEffect(() => {
    setListReceita(receitas);
  }, [receitas]);

  function searchReceita(e) {
    const { value } = e.target;
    if (value.length > 1) {
      setListReceita(filterReceita(value.toUpperCase(), receitas));
    } else {
      setListReceita(receitas);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSelectReceita)}>
      <Grid container justify="flex-start" alignItems="center" spacing={3}>
        <Grid item sm={12}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              autoFocus
              name="fastSearch"
              onChange={searchReceita}
              placeholder="Buscar Receita"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Grid>
        <List
          component="nav"
          className={classes.root}
          aria-label="mailbox folders">
          {listReceita.map((receita) => (
            <React.Fragment key={receita.cod}>
              <ListItem
                button
                divider
                onClick={() => handleSelectReceita(receita)}
                dense
                selected={receita.cod === receitaSeleted.cod}>
                <ListItemIcon>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <Icon>{receita.icon}</Icon>
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={`${receita.descricao} - ${receita.sigla}`}
                  secondary={receita.cod}
                />
                <ListItemSecondaryAction>
                  <Typography variant="body2" color="textPrimary" component="p">
                    Valor fixado
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(Number(receita.valor_fixo))}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider light />
            </React.Fragment>
          ))}
        </List>
      </Grid>
      <ButtonStep
        disabledNext={!receitaSeleted.cod}
        activeStep={stepActivity}
      />
    </form>
  );
}

export default FormReceita;
