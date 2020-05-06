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
  valueDocument,
  contribuinte,
  document,
  infoAditional
}) {
  const valorTotal = valueDocument.reduce(
    (accumator, currentValue) => Number(accumator) + Number(currentValue.price),
    [0]
  );

  const classes = useStyles();
  return (
    <>
      <List disablePadding>
        {valueDocument.map((doc) => (
          <ListItem className={classes.listItem} key={doc.name}>
            <ListItemText primary={doc.name} />
            <Typography variant="body2">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(doc.price)}
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Contribuinte
          </Typography>
          <Typography gutterBottom>{contribuinte.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={7}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Detalhes
          </Typography>
          <Grid container>
            {document.map((docData, key) => (
              <React.Fragment key={key}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{docData.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{docData.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Typography variant="h6" gutterBottom className={classes.title}>
            Informações adicionais
          </Typography>
          <Typography gutterBottom>{infoAditional}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
