import React, { useContext } from 'react';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  CardHeader,
  CardActionArea
} from '@material-ui/core';

import { NfsaContext } from '../../../../contexts';
import { useStyles, useStylesCancelado } from './styles';
import { CardSkeletron } from '../../../../components';

function CardNfsa() {
  const { listNfsa, itensSkeletron, handleSelecetedNfsa } = useContext(
    NfsaContext
  );
  const classes = useStyles();
  const classesCancelado = useStylesCancelado();
  console.count('card');

  const CardView = () => {
    return (
      <>
        {listNfsa.map((nfsa) => (
          <Grid item xl={4} lg={6} sm={6} xs={12} key={nfsa.id}>
            <Card
              className={
                nfsa.status ? classesCancelado.root : clsx(classes.root)
              }>
              <CardActionArea onClick={() => handleSelecetedNfsa(nfsa)}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      className={
                        nfsa.dam.status
                          ? classes.avatar
                          : classesCancelado.avatar
                      }>
                      {nfsa.id}
                    </Avatar>
                  }
                  title={`${nfsa.prestador.doc} | ${nfsa.prestador.nome}`}
                  subheader={`Emitido em ${Intl.DateTimeFormat('pt-BR', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false
                  }).format(new Date(nfsa.dam.emissao))}`}
                />
                <CardContent>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                        variant="body2">
                        {nfsa.prestador.doc} | {nfsa.prestador.nome}
                      </Typography>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                        variant="body2">
                        {nfsa.tomador.doc} | {nfsa.tomador.nome}
                      </Typography>
                    </Grid>
                  </Grid>
                  <div className={classes.difference}>
                    <Typography className={classes.caption} variant="caption">
                      {'DAM '}
                      {nfsa.dam.pago && nfsa.dam.status
                        ? 'Pago'
                        : nfsa.dam.status
                          ? 'Ativo'
                          : 'Cancelado'}
                    </Typography>
                    <Typography
                      variant="h5"
                      className={
                        nfsa.dam.status
                          ? classes.differenceValue
                          : classesCancelado.differenceValue
                      }>
                      {`Valor bruto: `}
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(nfsa.valor_calculo)}
                    </Typography>
                    <Typography
                      variant="h5"
                      className={
                        nfsa.dam.status
                          ? classes.differenceValue
                          : classesCancelado.differenceValue
                      }>
                      {`Valor líquido: `}
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(nfsa.valor_nota)}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </>
    );
  };

  return (
    <Grid container justify="space-between" spacing={3}>
      {listNfsa.length > 0 ? (
        <CardView />
      ) : (
          <CardSkeletron quantSkeletron={itensSkeletron} />
        )}
    </Grid>
  );
}

export default CardNfsa;
