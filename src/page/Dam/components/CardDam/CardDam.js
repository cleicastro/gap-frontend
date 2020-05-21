import React from 'react';
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
import {
  useStyles,
  useStylesPago,
  useStylesCancelado,
  useStylesVencido
} from './styles';

function CardDam({ className, listDam, handleDamDetail, ...rest }) {
  const classes = useStyles();
  const classesPago = useStylesPago();
  const classesCancelado = useStylesCancelado();
  const classesVencido = useStylesVencido();

  const classValueTotal = (status) => {
    switch (status) {
      case 'Pago':
        return classesPago.differenceValue;
      case 'Cancelado':
        return classesCancelado.differenceValue;
      case 'Inadimplente':
        return classesVencido.differenceValue;
      default:
        return classes.differenceValue;
    }
  };

  const classAvatar = (status) => {
    switch (status) {
      case 'Pago':
        return classesPago.avatar;
      case 'Cancelado':
        return classesCancelado.avatar;
      case 'Inadimplente':
        return classesVencido.avatar;
      default:
        return classes.avatar;
    }
  };

  const classCaption = (status, emissao, vencimento, days) => {
    switch (status) {
      case 'Pago':
        return `Pago em ${Intl.DateTimeFormat('pt-BR').format(
          new Date(emissao)
        )}`;
      case 'Cancelado':
        return `Cancelado`;
      case 'Inadimplente':
        return `${days} dia(s) de atraso ${Intl.DateTimeFormat('pt-BR', {
          timeZone: 'UTC'
        }).format(new Date(vencimento))}`;
      default:
        // eslint-disable-next-line no-case-declarations
        let msgVencimento = '';
        if (days > 0) {
          msgVencimento = `${days} dia(s) para vencer ${Intl.DateTimeFormat(
            'pt-BR',
            {
              timeZone: 'UTC'
            }
          ).format(new Date(vencimento))}`;
        } else {
          msgVencimento = `Vence hoje ${Intl.DateTimeFormat('pt-BR', {
            timeZone: 'UTC'
          }).format(new Date(vencimento))}`;
        }
        return msgVencimento;
    }
  };

  return (
    <Grid container justify="space-between" spacing={3}>
      {listDam.map((dam) => (
        <Grid item xl={4} lg={6} sm={6} xs={12} key={dam.id}>
          <Card
            {...rest}
            className={
              dam.status === 'Cancelado'
                ? classesCancelado.root
                : clsx(classes.root, className)
            }>
            <CardActionArea onClick={() => handleDamDetail(dam)}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    className={classAvatar(dam.status)}>
                    {dam.id}
                  </Avatar>
                }
                title={dam.receita.descricao}
                subheader={`Emitido em ${Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: false
                }).format(new Date(dam.emissao))}`}
              />
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                      variant="body2">
                      {dam.contribuinte.doc} | {dam.contribuinte.nome}
                    </Typography>
                  </Grid>
                </Grid>
                <div className={classes.difference}>
                  <Typography className={classes.caption} variant="caption">
                    {classCaption(
                      dam.status,
                      dam.emissao,
                      dam.vencimento,
                      dam.dias_vencimento
                    )}
                  </Typography>
                  <Typography
                    variant="h3"
                    className={classValueTotal(dam.status)}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(dam.valor_total)}
                  </Typography>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
export default CardDam;
