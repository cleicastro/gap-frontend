import React, { useState, useCallback, useContext } from 'react';

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Fade,
  Fab
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { useSelector } from 'react-redux';

import {
  ButtonStep,
  MenuDocumentEvents,
  ModalSave,
  AlertShow
} from '../../../../components';
import useStyles from './styles';

import { usePreviewAlvara, useStepAlvara } from '../../../../hooks';
import { useEdit } from '../../../../hooks/dam/useEdit';
import { useSave, useEdit as useEditAlvara } from '../../../../hooks/alvara';

import {
  AlvaraFuncionamentoContext,
  ACTIONS_ALVARA
} from '../../../../contexts';

import {
  damStatusEdit,
  messageResponseEdit,
  messageResponseSave
} from '../../../../util';

export default function Preview() {
  const {
    state: { showModalDetails, dataAlvaraFuncionamento, isEdit, document },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);
  const dataPagamento = useSelector((state) => state.datePayment.datePayment);

  const classes = useStyles();
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const [message, setMessage] = useState({});

  const { items, valorTotal, contribuinte, dam } = usePreviewAlvara();
  const [stepActivity, setStepActivity] = useStepAlvara();
  const setEdit = useEdit();
  const setEditAlvara = useEditAlvara();
  const setSave = useSave();

  const handleSaveDAM = useCallback(() => {
    setMessage({});
    setOpenModalMenu(true);
    if (!isEdit) {
      setSave({ ...dam, ...document, ...dataAlvaraFuncionamento }).then((response) => {
        const processMessageDam = messageResponseSave(response);
        if (response.status === 201) {
          dispatch({
            type: ACTIONS_ALVARA.ADD,
            payload: { ...response }
          });
        } else {
          setTimeout(() => {
            setOpenModalMenu(false);
          }, 2000);
        }
        setMessage(processMessageDam);
      });
    } else {
      setEditAlvara(
        dataAlvaraFuncionamento?.id_dam,
        { ...dam, ...document, ...dataAlvaraFuncionamento }
      ).then((response) => {
        const processMessageDam = messageResponseEdit(response);
        if (response.status === 200) {
          dispatch({
            type: ACTIONS_ALVARA.UPDATE_ALVARA,
            payload: { ...dam, ...document, ...dataAlvaraFuncionamento }
          });
        } else {
          setTimeout(() => {
            setOpenModalMenu(false);
          }, 2000);
        }
        setMessage(processMessageDam);
      });
    }
  }, [dam, dataAlvaraFuncionamento, dispatch, isEdit, setEditAlvara, setSave]);

  const handleOpenWindow = useCallback(() => {
    dispatch({
      type: ACTIONS_ALVARA.MODAL_NEW_ALVARA
    });
    dispatch({
      type: ACTIONS_ALVARA.CLEAN_DATA_ALVARA
    });
  }, [dispatch]);

  const handleAlterStatusDAM = useCallback(
    (type, param) => {
      setOpenModalMenu(true);
      setMessage({});
      setEdit(dataAlvaraFuncionamento.id_dam, param).then((response) => {
        const processStatusDam = damStatusEdit(response, type);
        if (response.status === 200) {
          dispatch({
            type: ACTIONS_ALVARA.UPDATE_ALVARA,
            payload: {
              ...dataAlvaraFuncionamento, dam: {
                ...dataAlvaraFuncionamento.dam,
                ...processStatusDam.damStatus,
              },
              dataPagamento
            }
          });
        }
        setMessage(processStatusDam.message);
      });
    },
    [dataAlvaraFuncionamento, dataPagamento, dispatch, setEdit]
  );

  const handlePrevStep = () => setStepActivity(stepActivity - 1);
  return (
    <>
      <List disablePadding>
        {items.map((damAlvara, index) => (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText primary={damAlvara.descricao} />
            <Typography variant="body2">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(damAlvara.valor)}
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
        <Grid item container direction="row">
          <Grid item xs={6} sm={7}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Contribuinte
            </Typography>
            <Typography gutterBottom>{contribuinte.nome}</Typography>
          </Grid>
          <Grid item xs={6} sm={5} align="right">
            <Typography variant="h6" gutterBottom className={classes.title}>
              CPF/CNPJ
            </Typography>
            <Typography gutterBottom>{contribuinte.doc}</Typography>
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
                {dataAlvaraFuncionamento.dam &&
                  dataAlvaraFuncionamento.dam.status}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Informações adicionais
          </Typography>
          <Typography gutterBottom>
            {document &&
              document.infoAdicionais}
          </Typography>
        </Grid>
      </Grid>
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
          values={{ id_dam: dataAlvaraFuncionamento.id_dam }}
          handleAlterStatusDAM={handleAlterStatusDAM}
          handleClose={handleOpenWindow}
          visibleOptions={{
            imprimir: true,
            pagar:
              !dataAlvaraFuncionamento?.dam?.pago &&
              dataAlvaraFuncionamento?.dam?.status !== 'Cancelado',
            copiar: showModalDetails,
            editar: showModalDetails,
            cancelar:
              dataAlvaraFuncionamento?.dam?.status !== 'Cancelado',
            nfsa: false,
            alvara: true,
            recibo: false,
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
