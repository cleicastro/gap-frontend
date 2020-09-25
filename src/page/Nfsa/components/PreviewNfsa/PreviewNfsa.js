/* eslint-disable react/no-unused-prop-types */
import React, { useContext, useState, useCallback } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
  Fade,
  Fab
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { NfsaContext, ACTIONS_NFSA } from '../../../../contexts';
import useStyles from './styles';
import {
  ButtonStep,
  MenuDocumentEvents,
  ModalSave,
  AlertShow
} from '../../../../components';
import { useEdit } from '../../../../hooks/dam/useEdit';
import { useSave, useEdit as useEditNfsa } from '../../../../hooks/nfsaHooks';
import {
  messageResponseEdit,
  messageResponseSave,
  damStatusEdit
} from '../../../../util';
import { useStepNfsa, usePreviewNfsa } from '../../../../hooks';
import { useSelector } from 'react-redux';

function PreviewNfsa() {
  const {
    state: { showModalDetails, dataNfsa, isEdit, document },
    dispatch
  } = useContext(NfsaContext);
  const dataPagamento = useSelector((state) => state.datePayment.datePayment);

  const classes = useStyles();
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const [message, setMessage] = useState({});

  const {
    participantes,
    items,
    tributes,
    valorNF,
    valorDam,
    dam
  } = usePreviewNfsa();
  const [stepActivity, setStepActivity] = useStepNfsa();
  const setEdit = useEdit();
  const setEditNfsa = useEditNfsa();
  const setSave = useSave();

  const handleSaveDAM = useCallback(() => {
    setMessage({});
    setOpenModalMenu(true);
    if (!isEdit) {
      setSave(items, dataNfsa, dam).then((response) => {
        const processMessageDam = messageResponseSave(response);
        if (response.status === 201) {
          dispatch({
            type: ACTIONS_NFSA.ADD,
            payload: { data: { ...dataNfsa, ...dam, ...response.data } }
          });
        } else {
          setTimeout(() => {
            setOpenModalMenu(false);
          }, 2000);
        }
        setMessage(processMessageDam);
      });
    } else {
      setEditNfsa(items, dataNfsa, dam, dataNfsa.id).then(
        (response) => {
          const processMessageDam = messageResponseEdit(response);
          if (response.status === 200) {
            dispatch({
              type: ACTIONS_NFSA.UPDATE_NFSA,
              payload: { ...dataNfsa, ...dam }
            });
          } else {
            setTimeout(() => {
              setOpenModalMenu(false);
            }, 2000);
          }
          setMessage(processMessageDam);
        }
      );
    }
  }, [dam, dataNfsa, dispatch, document, isEdit, setEditNfsa, setSave]);

  const handleOpenWindow = useCallback(() => {
    dispatch({
      type: ACTIONS_NFSA.MODAL_NEW_NFSA
    });
    dispatch({
      type: ACTIONS_NFSA.CLEAN_DATA_NFSA
    });
  }, [dispatch]);

  const handleAlterStatusDAM = useCallback(
    (type, param) => {
      setOpenModalMenu(true);
      setMessage({});

      setEdit(dataNfsa.dam.id, param).then((response) => {
        const processStatusDam = damStatusEdit(response, type);
        if (response.status === 200) {
          dispatch({
            type: ACTIONS_NFSA.UPDATE_NFSA,
            payload: {
              ...dataNfsa,
              dam: {
                ...dataNfsa.dam,
                ...processStatusDam.damStatus
              },
              dataPagamento
            }
          });
        }
        setMessage(processStatusDam.message);
      });
    },
    [dataNfsa, dataPagamento, dispatch, setEdit]
  );

  const handlePrevStep = () => setStepActivity(stepActivity - 1);

  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item container direction="row">
          <Grid item xs={6} sm={7}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Prestador
            </Typography>
            <Typography gutterBottom>{participantes.nomePrestador}</Typography>
          </Grid>
          <Grid item xs={6} sm={5} align="right">
            <Typography variant="h6" gutterBottom className={classes.title}>
              CPF/CNPJ
            </Typography>
            <Typography gutterBottom>{participantes.docPrestador}</Typography>
          </Grid>
          <Grid item xs={6} sm={7}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Tomador
            </Typography>
            <Typography gutterBottom>{participantes.nomeTomador}</Typography>
          </Grid>
          <Grid item xs={6} sm={5} align="right">
            <Typography variant="h6" gutterBottom className={classes.title}>
              CPF/CNPJ
            </Typography>
            <Typography gutterBottom>{participantes.docTomador}</Typography>
          </Grid>
        </Grid>
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
                Valor do DAM
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
                }).format(new Date(document.emissao))}
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Typography>
                {Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
                  new Date(document.vencimento)
                )}
              </Typography>
            </Grid>
            <Grid item xs={3} align="right">
              <Typography>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(valorDam))}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <List disablePadding>
        {items.map((item, key) => (
          <div key={key}>
            <Divider variant="middle" />
            <ListItem className={classes.listItem}>
              <ListItemText primary={item.descricao} />
              <Typography variant="body2">
                {`(+) `}
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(item.quantidade) * Number(item.valor))}
              </Typography>
            </ListItem>
            <Divider variant="middle" />
          </div>
        ))}
        {tributes.map((item, key) => (
          <div key={key}>
            <ListItem className={classes.listItem}>
              <ListItemText primary={item.descricao} />
              <Typography variant="body2">
                {`(-) `}
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(item.valor))}
              </Typography>
              <Divider />
            </ListItem>
            <Divider variant="middle" />
          </div>
        ))}

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(Number(valorNF))}
          </Typography>
        </ListItem>
      </List>
      {!showModalDetails && (
        <ButtonStep
          handlePrevStep={handlePrevStep}
          disableSave={false}
          handleSave={handleSaveDAM}
        />
      )}

      <ModalSave
        openModalMenu={openModalMenu}
        statusServer={message.type}
        successRequest={message.type}>
        <MenuDocumentEvents
          values={{ id_dam: dataNfsa.dam?.id, id: dataNfsa.id }}
          handleAlterStatusDAM={handleAlterStatusDAM}
          handleClose={handleOpenWindow}
          visibleOptions={{
            imprimir: true,
            pagar: !dataNfsa?.dam?.pago && dataNfsa?.dam?.status !== 'Cancelado',
            copiar: showModalDetails,
            editar: showModalDetails,
            cancelar: dataNfsa?.dam?.status !== 'Cancelado',
            nfsa: true,
            alvara: false,
            recibo: true,
            sair: true
          }}
        />
        <div className={classes.container}>
          <Fade in={!!message.type}>
            <Fab aria-label="save" className={classes.buttonClassname}>
              <ThumbUpIcon />
            </Fab>
          </Fade>
          <AlertShow messageProps={message} />
        </div>
      </ModalSave>
      <AlertShow messageProps={message} />
    </>
  );
}

export default PreviewNfsa;
