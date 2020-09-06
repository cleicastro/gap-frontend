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
  Fab,
  Fade
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import { useSelector } from 'react-redux';
import useStyles from './styles';
import PreviewDam from '../PreviewDam';
import { DamContext, ACTIONS } from '../../../../contexts';
import { MenuDocumentEvents, AlertShow } from '../../../../components';
import ModalSave from '../../../../components/ModalSave/ModalSave';
import { useEdit } from '../../../../hooks/dam/useEdit';
import { damStatusEdit } from '../../../../util';

function ModalDetailsDam() {
  const {
    state: { showModalDetails, dataDam },
    dispatch
  } = useContext(DamContext);

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
      type: ACTIONS.CLEAN_DATA
    });
  }, [dispatch]);

  const handleCopyDam = useCallback(() => {
    dispatch({
      type: ACTIONS.MODAL_NEW_DAM,
      payload: false
    });
    dispatch({
      type: ACTIONS.MODAL_DETAILS,
      payload: false
    });
  }, [dispatch]);

  const handleEditDam = useCallback(() => {
    dispatch({
      type: ACTIONS.MODAL_NEW_DAM,
      payload: true
    });
    dispatch({
      type: ACTIONS.MODAL_DETAILS,
      payload: false
    });
  }, [dispatch]);

  const handleAlterStatusDAM = useCallback(
    (type, param) => {
      setOpenModalMenu(true);
      setMessage({});
      setEdit(dataDam.id, param).then((response) => {
        const processStatusDam = damStatusEdit(response, type);
        if (response.status === 200) {
          dispatch({
            type: ACTIONS.UPDATE_DAM,
            payload: {
              ...dataDam,
              ...processStatusDam.damStatus,
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
    [dataDam, dataPagamento, dispatch, setEdit]
  );

  return (
    <Dialog
      fullScreen={fullScreenModal}
      open={showModalDetails}
      fullWidth
      aria-labelledby="customized-dialog-title">
      <DialogTitle id="customized-dialog-title">
        <MenuDocumentEvents
          values={{ id_dam: dataDam.id }}
          handleAlterStatusDAM={handleAlterStatusDAM}
          handleCopy={handleCopyDam}
          handleEdit={handleEditDam}
          handleClose={handleClosedModalDetails}
          visibleOptions={{
            imprimir: true,
            copiar: showModalDetails,
            editar:
              showModalDetails && dataDam && dataDam.status !== 'Cancelado',

            pagar: dataDam && !dataDam.pago && dataDam.status !== 'Cancelado',
            cancelar: dataDam && dataDam.status !== 'Cancelado',
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
export default ModalDetailsDam;
