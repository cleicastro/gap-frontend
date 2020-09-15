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

import {
  ModalSave,
  ButtonStep,
  MenuDocumentEvents,
  AlertShow
} from '../../../../components';
import useStyles from './styles';
import { useStepDam, usePreviewDam } from '../../../../hooks';
import { DamContext, ACTIONS } from '../../../../contexts';
import { useSave } from '../../../../hooks/dam/useSave';
import { useEdit } from '../../../../hooks/dam/useEdit';
import {
  damStatusEdit,
  messageResponseEdit,
  messageResponseSave
} from '../../../../util';

export default function PreviewDam() {
  const {
    state: { showModalDetails, dataDam, isEdit },
    dispatch
  } = useContext(DamContext);

  const classes = useStyles();
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const [message, setMessage] = useState({});

  const { items, valorTotal, contribuinte, dam } = usePreviewDam();
  const [stepActivity, setStepActivity] = useStepDam();
  const setSave = useSave();
  const setEdit = useEdit();

  const handleSaveDAM = useCallback(() => {
    setMessage({});
    setOpenModalMenu(true);
    if (!isEdit) {
      setSave(dam).then((response) => {
        const processMessageDam = messageResponseSave(response);
        if (response.status === 201) {
          dispatch({
            type: ACTIONS.ADD,
            payload: { data: { ...dataDam, ...dam, ...response.data } }
          });
        }
        setMessage(processMessageDam);
      });
    } else {
      setEdit(dataDam.id, dam).then((response) => {
        const processMessageDam = messageResponseEdit(response);
        if (response.status === 200) {
          dispatch({
            type: ACTIONS.UPDATE_DAM,
            payload: { ...dataDam, ...dam }
          });
        }
        setMessage(processMessageDam);
      });
    }
  }, [dam, dataDam, dispatch, isEdit, setEdit, setSave]);

  const handleAlterStatusDAM = (type, param) => {
    setMessage({});
    setEdit(dataDam.id, param).then((response) => {
      const processStatusDam = damStatusEdit(response, type);
      if (response.status === 200) {
        dispatch({
          type: ACTIONS.UPDATE_DAM,
          payload: { ...dam, ...processStatusDam.damStatus }
        });
      }
      setMessage(processStatusDam.message);
    });
  };

  const handleOpenWindow = useCallback(() => {
    dispatch({
      type: ACTIONS.MODAL_NEW_DAM
    });
    dispatch({
      type: ACTIONS.CLEAN_DATA
    });
  }, [dispatch]);

  const handlePrevStep = () => setStepActivity(stepActivity - 1);

  return (
    <>
      <List disablePadding>
        {items.map((document, index) => (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText primary={document.descricao} />
            <Typography variant="body2">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(document.valor)}
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
                }).format(document.emissao)}
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Typography>
                {Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
                  document.vencimento
                )}
              </Typography>
            </Grid>
            <Grid item xs={3} align="right">
              <Typography>{dam.status}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Informações adicionais
          </Typography>
          <Typography gutterBottom>{dam.infoAdicionais}</Typography>
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
          values={{ id_dam: dataDam?.id }}
          handleAlterStatusDAM={handleAlterStatusDAM}
          handleClose={handleOpenWindow}
          visibleOptions={{
            imprimir: true,
            pagar: !dataDam.pago && dataDam?.status !== 'Cancelado',
            copiar: showModalDetails,
            editar: showModalDetails,
            cancelar: dataDam.status !== 'Cancelado',
            nfsa: false,
            alvara: false,
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
