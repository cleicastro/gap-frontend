import React from 'react';
import {
  Grid,
  Typography,
  CardHeader,
  Avatar,
  CardActions,
  Card,
  Icon
} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './styles';

function CardReceitas({ receita, handleSelectReceita }) {
  const classes = useStyles();

  return (
    <Grid item key={receita.cod} sm={4} xs={6}>
      <Card className={classes.card}>
        <CardActionArea onClick={() => handleSelectReceita(receita)}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <Icon>{receita.icon}</Icon>
              </Avatar>
            }
            title={receita.sigla}
            subheader={receita.cod}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {receita.descricao}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            justifyContent: 'space-between',
            alignItems: 'stretch'
          }}>
          <Typography variant="body2" color="textPrimary" component="p">
            Valor fixado
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(Number(receita.valor_fixo))}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CardReceitas;
