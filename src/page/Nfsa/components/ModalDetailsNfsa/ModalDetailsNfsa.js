import React, { useContext, useState, useEffect } from 'react';
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

import { NfsaContext, ACTIONS_NFSA } from '../../../../contexts';
import useStyles from './styles';
import PreviewNfsa from '../PreviewNfsa';
import { useSaveNfsa, useOpenNewNfsa } from '../../../../hooks';
import { MenuDocumentEvents, ModalSave } from '../../../../components';

function ModalDetailsNfsa() {
  const theme = useTheme();
  const fullScreenModal = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [openModalMenu, setOpenModalMenu] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [statusServer, successRequest, setSave, setEditStatus] = useSaveNfsa();
  const setWindowNewNfsa = useOpenNewNfsa();

  const {
    state: { showModalDetails, dataNfsa, dataDam },
    dispatch
  } = useContext(NfsaContext);

  useEffect(() => {
    if (successRequest) {
      setOpenModalMenu(false);
    }
  }, [successRequest]);

  function handleClosedModalDetails() {
    dispatch({
      type: ACTIONS_NFSA.MODAL_DETAILS,
      payload: false
    });
  }

  const handleAlterStatusDAM = (type, param) => {
    setOpenModalMenu(true);
    setEditStatus(dataDam.id, type, param);
  };

  const handleCopyDam = () => {
    handleClosedModalDetails();
    setWindowNewNfsa();
  };

  const handleEditDam = () => {
    dispatch({
      type: ACTIONS_NFSA.EDIT_OPERATION
    });
    handleClosedModalDetails();
    setWindowNewNfsa();
  };

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
            id_dam: dataDam && dataDam.id
          }}
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

export default ModalDetailsNfsa;
