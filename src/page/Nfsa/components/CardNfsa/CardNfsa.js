import React, { useContext, useCallback } from 'react';
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
import InfiniteScroll from 'react-infinite-scroller';

import {
  useStyles,
  useStylesCancelado,
  useStylesPago,
  useStylesVencido
} from './styles';
import { CardSkeletron } from '../../../../components';
import { usePagination, useStore } from '../../../../hooks/nfsaHooks';
import { NfsaContext } from '../../../../contexts';

const classValueTotal = (
  status,
  classesPago,
  classesCancelado,
  classesVencido,
  classes
) => {
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

const classAvatar = (
  status,
  classesPago,
  classesCancelado,
  classesVencido,
  classes
) => {
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

function CardNfsa() {
  const {
    state: { listNfsa, pagination, paramsQuery }
  } = useContext(NfsaContext);

  const setSelecetNfsa = useStore();
  const setPagination = usePagination();

  const classes = useStyles();
  const classesPago = useStylesPago();
  const classesCancelado = useStylesCancelado();
  const classesVencido = useStylesVencido();

  const handlePagination = useCallback(
    (currentPage) => {
      if (pagination.current_page < pagination.last_page) {
        const set = setPagination({
          ...paramsQuery,
          page: currentPage + 1
        });
        // pra tratar o erro
        set.then((response) => {
          if (response.status !== 200) {
            alert('Falha no carregamento dos dados, favor tente mais tarde!');
          }
        });
      }
    },
    [pagination, paramsQuery, setPagination]
  );

  const CardView = () => {
    return (
      <>
        {listNfsa.map((nfsa) => (
          <Grid item xl={4} lg={6} sm={6} xs={12} key={nfsa.id}>
            <Card
              className={
                nfsa.status ? classesCancelado.root : clsx(classes.root)
              }>
              <CardActionArea onClick={() => setSelecetNfsa(nfsa)}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      className={classAvatar(
                        nfsa.dam.status,
                        classesPago,
                        classesCancelado,
                        classesVencido,
                        classes
                      )}>
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
                      {classCaption(
                        nfsa.dam.status,
                        nfsa.dam.emissao,
                        nfsa.dam.vencimento,
                        nfsa.dam.dias_vencimento
                      )}
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
                      className={classValueTotal(
                        nfsa.dam.status,
                        classesPago,
                        classesCancelado,
                        classesVencido,
                        classes
                      )}>
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
    <InfiniteScroll
      useWindow
      pageStart={0}
      hasMore={pagination.current_page < pagination.last_page}
      loadMore={handlePagination}
      loader={
        <Grid
          container
          justify="space-between"
          spacing={3}
          key={0}
          style={{ marginTop: 13 }}>
          <CardSkeletron length={4} />
        </Grid>
      }>
      <Grid container justify="space-between" spacing={3}>
        {listNfsa.length > 0 ? <CardView /> : <CardSkeletron length={10} />}
      </Grid>
    </InfiniteScroll>
  );
}

export default CardNfsa;
