import React from 'react';

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid
} from '@material-ui/core';
import useStyles from './styles';

export default function Review({
  items,
  contribuintes,
  infoAdicionais,
  receitaInfo
}) {
  const valorTotal = items.reduce(
    (accumator, currentValue) => Number(accumator) + Number(currentValue.valor),
    [0]
  );
  const classes = useStyles();

  return (
    <>
      <List disablePadding>
        {items.map((doc, index) => (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText primary={doc.item} />
            <Typography variant="body2">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(doc.valor)}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(valorTotal)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2} direction="column">
        {contribuintes.map((docData, key) => (
          <Grid item container direction="row" key={key}>
            <Grid item xs={6} sm={7}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                {contribuintes.length === 1 && 'Contribuinte'}
                {contribuintes.length === 1 && key === 1 && 'Prestador'}
                {contribuintes.length === 2 && 'Tomador'}
              </Typography>
              <Typography gutterBottom>{docData.nome}</Typography>
            </Grid>
            <Grid item xs={6} sm={5} align="right">
              <Typography variant="h6" gutterBottom className={classes.title}>
                CPF/CNPJ
              </Typography>
              <Typography gutterBottom>{docData.doc}</Typography>
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <Grid container>
            <Grid item xs={5}>
              <Typography variant="h6" gutterBottom>
                Emissão
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" align="center" gutterBottom>
                Vencimento
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" align="right" gutterBottom>
                Situação
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={5}>
              <Typography>
                {Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: false
                }).format(new Date(receitaInfo.emissao))}
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Typography>
                {Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
                  new Date(receitaInfo.vencimento)
                )}
              </Typography>
            </Grid>
            <Grid item xs={3} align="right">
              <Typography>{receitaInfo.status}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Informações adicionais
          </Typography>
          <Typography gutterBottom>{infoAdicionais}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
