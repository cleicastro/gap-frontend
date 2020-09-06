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
  useStylesPago,
  useStylesCancelado,
  useStylesVencido
} from './styles';
import { usePagination, useStore } from '../../../../hooks/alvara';
import { CardSkeletron } from '../../../../components';
import { AlvaraFuncionamentoContext } from '../../../../contexts';

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

function CardAlvara({ className, handleDamDetail, ...rest }) {
  const {
    state: { listAlvara, pagination, paramsQuery }
  } = useContext(AlvaraFuncionamentoContext);

  const setSelecetAlvara = useStore();
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
    [pagination.current_page, pagination.last_page, paramsQuery, setPagination]
  );

  const AlvaraList = () => {
    return (
      <>
        {listAlvara.map((alvara) => (
          <Grid item xl={4} lg={6} sm={6} xs={12} key={alvara.id_dam}>
            <Card
              {...rest}
              className={
                alvara.dam.status === 'Cancelado'
                  ? classesCancelado.root
                  : clsx(classes.root, className)
              }>
              <CardActionArea onClick={() => setSelecetAlvara(alvara)}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      className={classAvatar(
                        alvara.dam.status,
                        classesPago,
                        classesCancelado,
                        classesVencido,
                        classes
                      )}>
                      {alvara.dam.id}
                    </Avatar>
                  }
                  title={alvara.inscricao_municipal}
                  subheader={`Emitido em ${Intl.DateTimeFormat('pt-BR', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false
                  }).format(new Date(alvara.dam.emissao))}`}
                />
                <CardContent>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                        variant="body2">
                        {alvara.dam.contribuinte.doc} |{' '}
                        {alvara.dam.contribuinte.nome}
                      </Typography>
                    </Grid>
                  </Grid>
                  <div className={classes.difference}>
                    <Typography className={classes.caption} variant="caption">
                      {classCaption(
                        alvara.dam.status,
                        alvara.dam.emissao,
                        alvara.dam.vencimento,
                        alvara.dam.dias_vencimento
                      )}
                    </Typography>
                    <Typography
                      variant="h3"
                      className={classValueTotal(
                        alvara.dam.status,
                        classesPago,
                        classesCancelado,
                        classesVencido,
                        classes
                      )}>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(alvara.dam.valor_total)}
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
        {listAlvara.length > 0 ? <AlvaraList /> : <CardSkeletron length={10} />}
      </Grid>
    </InfiniteScroll>
  );
}
export default CardAlvara;
