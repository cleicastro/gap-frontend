import React, { useContext, useCallback, useState, useEffect } from 'react';

import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@material-ui/core';

import useStyles from './styles';
import PreviewDam from '../Preview';
import {
  ACTIONS_ALVARA,
  AlvaraFuncionamentoContext
} from '../../../../contexts';
import { MenuDocumentEvents, ModalSave } from '../../../../components';
import { useSaveAlvara, useOpenNewAlvara } from '../../../../hooks';

function ModalDetails() {
  const theme = useTheme();
  const fullScreenModal = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [openModalMenu, setOpenModalMenu] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [
    statusServer,
    successRequest,
    // eslint-disable-next-line no-unused-vars
    setSave,
    setEditStatus
  ] = useSaveAlvara();
  const setWindowNewAlvara = useOpenNewAlvara();

  const {
    state: { showModalDetails, dataAlvaraFunvionamento, dataDam },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);

  useEffect(() => {
    if (successRequest) {
      setOpenModalMenu(false);
    }
  }, [successRequest]);

  function handleClosedModalDetails() {
    dispatch({
      type: ACTIONS_ALVARA.MODAL_DETAILS,
      payload: false
    });
  }

  const handleAlterStatusDAM = useCallback(
    (type, param) => {
      setOpenModalMenu(true);
      setEditStatus(dataAlvaraFunvionamento.id_dam, type, param);
    },
    [dataAlvaraFunvionamento.id_dam, setEditStatus]
  );

  const handleCopyDam = () => {
    handleClosedModalDetails();
    setWindowNewAlvara();
  };

  const handleEditDam = () => {
    dispatch({
      type: ACTIONS_ALVARA.EDIT_OPERATION
    });
    handleClosedModalDetails();
    setWindowNewAlvara();
  };

  return (
    <Dialog
      fullScreen={fullScreenModal}
      open={showModalDetails}
      fullWidth
      aria-labelledby="customized-dialog-title">
      <DialogTitle id="customized-dialog-title">
        <MenuDocumentEvents
          values={{ id_dam: dataAlvaraFunvionamento.id_dam }}
          handleAlterStatusDAM={handleAlterStatusDAM}
          handleCopy={handleCopyDam}
          handleEdit={handleEditDam}
          handleClose={handleClosedModalDetails}
          visibleOptions={{
            imprimir: true,
            pagar: dataDam && !dataDam.pago && dataDam.status !== 'Cancelado',
            copiar: showModalDetails,
            editar:
              dataDam && showModalDetails && dataDam.status !== 'Cancelado',
            cancelar: dataDam && dataDam.status !== 'Cancelado',
            nfsa: false,
            alvara: true,
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
              statusServer={statusServer}
              successRequest={successRequest}
            />
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
