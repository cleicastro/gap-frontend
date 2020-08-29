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
import PreviewDam from '../PreviewDam';
import { DamContext, ACTIONS } from '../../../../contexts';
import { MenuDocumentEvents } from '../../../../components';
import { useSaveDam, useOpenNewDam } from '../../../../hooks';
import ModalSave from '../../../../components/ModalSave/ModalSave';

function ModalDetailsDam() {
  const theme = useTheme();
  const fullScreenModal = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [openModalMenu, setOpenModalMenu] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [statusServer, successRequest, setSave, setEditStatus] = useSaveDam();
  const setWindowNewDam = useOpenNewDam();

  const {
    state: { showModalDetails, dataDam },
    dispatch
  } = useContext(DamContext);

  useEffect(() => {
    if (successRequest) {
      setOpenModalMenu(false);
    }
  }, [successRequest]);

  function handleClosedModalDetails() {
    dispatch({
      type: ACTIONS.MODAL_DETAILS,
      payload: false
    });
  }

  const handleAlterStatusDAM = useCallback(
    (type, param) => {
      setOpenModalMenu(true);
      setEditStatus(dataDam.id, type, param);
    },
    [dataDam.id, setEditStatus]
  );

  const handleCopyDam = () => {
    handleClosedModalDetails();
    setWindowNewDam();
  };

  const handleEditDam = () => {
    dispatch({
      type: ACTIONS.EDIT_DAM_OPERATION
    });
    handleClosedModalDetails();
    setWindowNewDam();
  };

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
            pagar: dataDam && !dataDam.pago && dataDam.status !== 'Cancelado',
            copiar: showModalDetails,
            editar:
              dataDam && showModalDetails && dataDam.status !== 'Cancelado',
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
export default ModalDetailsDam;
