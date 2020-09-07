import React, { useContext, useState, useCallback } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useTheme,
  useMediaQuery,
  Fade,
  Fab
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import { useSelector } from 'react-redux';
import { NfsaContext, ACTIONS_NFSA } from '../../../../contexts';
import useStyles from './styles';
import PreviewNfsa from '../PreviewNfsa';
import {
  MenuDocumentEvents,
  ModalSave,
  AlertShow
} from '../../../../components';
import { damStatusEdit } from '../../../../util';
import { useEdit } from '../../../../hooks/dam/useEdit';

function ModalDetailsNfsa() {
  const {
    state: { showModalDetails, dataNfsa },
    dispatch
  } = useContext(NfsaContext);

  const theme = useTheme();
  const fullScreenModal = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const [message, setMessage] = useState({});

  const setEdit = useEdit();
  const dataPagamento = useSelector((state) => state.datePayment.datePayment);

  const handleClosedModalDetails = useCallback(() => {
    setMessage({});
    dispatch({
      type: ACTIONS_NFSA.CLEAN_DATA_NFSA
    });
  }, [dispatch]);

  const handleCopyDam = useCallback(() => {
    dispatch({
      type: ACTIONS_NFSA.MODAL_NEW_NFSA,
      payload: false
    });
    dispatch({
      type: ACTIONS_NFSA.MODAL_DETAILS,
      payload: false
    });
  }, [dispatch]);

  const handleEditDam = useCallback(() => {
    dispatch({
      type: ACTIONS_NFSA.MODAL_NEW_NFSA,
      payload: true
    });
    dispatch({
      type: ACTIONS_NFSA.MODAL_DETAILS,
      payload: false
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
        setTimeout(() => {
          setOpenModalMenu(false);
        }, 2000);
      });
    },
    [dataNfsa, dataPagamento, dispatch, setEdit]
  );

  return (
    <Dialog
      fullScreen={fullScreenModal}
      open={showModalDetails}
      maxWidth="md"
      aria-labelledby="menu-actions">
      <DialogTitle id="menu-actions">
        <MenuDocumentEvents
          values={{
            id: dataNfsa && dataNfsa.id,
            id_dam: dataNfsa && dataNfsa?.dam?.id_dam
          }}
          handleAlterStatusDAM={handleAlterStatusDAM}
          handleCopy={handleCopyDam}
          handleEdit={handleEditDam}
          handleClose={handleClosedModalDetails}
          visibleOptions={{
            imprimir: true,
            pagar:
              dataNfsa?.dam &&
              !dataNfsa.dam.pago &&
              dataNfsa.dam.status !== 'Cancelado',
            copiar: showModalDetails,
            editar:
              dataNfsa?.dam &&
              showModalDetails &&
              dataNfsa.dam.status !== 'Cancelado',
            cancelar: dataNfsa?.dam && dataNfsa.dam.status !== 'Cancelado',
            alvara: false,
            nfsa: true,
            recibo: true,
            sair: true
          }}
        />
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          spacing={2}
          justify="space-between"
          alignItems="flex-start"
          className={classes.root}>
          <Grid item sm={12}>
            <PreviewNfsa />
            <ModalSave
              openModalMenu={openModalMenu}
              statusServer={message.type}
              successRequest={message.type}>
              <div className={classes.container}>
                <Fade in={!!message.type}>
                  <Fab aria-label="save" className={classes.buttonClassname}>
                    <CheckIcon />
                  </Fab>
                </Fade>
                <AlertShow messageProps={message} />
              </div>
            </ModalSave>
            <AlertShow messageProps={message} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClosedModalDetails} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalDetailsNfsa;
