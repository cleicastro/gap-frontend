import React, { useContext, useCallback, useState } from 'react';

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
import useStyles from './styles';
import PreviewDam from '../Preview';
import {
  ACTIONS_ALVARA,
  AlvaraFuncionamentoContext
} from '../../../../contexts';
import {
  MenuDocumentEvents,
  ModalSave,
  AlertShow
} from '../../../../components';
import { damStatusEdit } from '../../../../util';
import { useEdit } from '../../../../hooks/dam/useEdit';

function ModalDetails() {
  const {
    state: { showModalDetails, dataAlvaraFuncionamento },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);

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
      type: ACTIONS_ALVARA.CLEAN_DATA_ALVARA
    });
  }, [dispatch]);

  const handleCopyDam = useCallback(() => {
    dispatch({
      type: ACTIONS_ALVARA.MODAL_NEW_ALVARA,
      payload: false
    });
    dispatch({
      type: ACTIONS_ALVARA.MODAL_DETAILS,
      payload: false
    });
  }, [dispatch]);

  const handleEditDam = useCallback(() => {
    dispatch({
      type: ACTIONS_ALVARA.MODAL_NEW_ALVARA,
      payload: true
    });
    dispatch({
      type: ACTIONS_ALVARA.MODAL_DETAILS,
      payload: false
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
        setTimeout(() => {
          setOpenModalMenu(false);
        }, 2000);
      });
    },
    [dataAlvaraFuncionamento, dataPagamento, dispatch, setEdit]
  );

  return (
    <Dialog
      fullScreen={fullScreenModal}
      open={showModalDetails}
      fullWidth
      aria-labelledby="customized-dialog-title">
      <DialogTitle id="customized-dialog-title">
        <MenuDocumentEvents
          values={{ id_dam: dataAlvaraFuncionamento.id_dam }}
          handleAlterStatusDAM={handleAlterStatusDAM}
          handleCopy={handleCopyDam}
          handleEdit={handleEditDam}
          handleClose={handleClosedModalDetails}
          visibleOptions={{
            imprimir: true,
            copiar: showModalDetails,
            editar:
              showModalDetails &&
              dataAlvaraFuncionamento &&
              dataAlvaraFuncionamento?.dam?.status !== 'Cancelado',

            pagar:
              !dataAlvaraFuncionamento?.dam?.pago &&
              dataAlvaraFuncionamento?.dam?.status !== 'Cancelado',
            cancelar:
              dataAlvaraFuncionamento?.dam?.status !== 'Cancelado',
            nfsa: false,
            alvara: false,
            recibo: false,
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
            <PreviewDam />
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
export default ModalDetails;
