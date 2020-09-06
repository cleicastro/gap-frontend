import React from 'react';

import { Modal, Fab, CircularProgress, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';

import useStyles from './styles';

const ModalSave = ({
  children,
  openModalMenu,
  statusServer,
  successRequest
}) => {
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: !statusServer
  });
  return (
    <Modal
      open={openModalMenu}
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      disableBackdropClick
      disableScrollLock
      aria-labelledby="modal-save"
      aria-describedby="modal-description"
      className={classes.modal}>
      <div className={classes.paper}>
        <Typography id="modal-title" variant="h4" className={classes.title}>
          {!statusServer && 'Aguarde...'}
          {statusServer === 201 && `Documento inserido com sucesso!`}
          {statusServer === 200 && `Documento alterado com sucesso!`}
        </Typography>
        <div id="modal-description">
          {!successRequest && (
            <div className={classes.progress}>
              <div className={classes.wrapper}>
                <Fab
                  aria-label="save"
                  color="primary"
                  className={buttonClassname}>
                  {statusServer ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                <CircularProgress size={68} className={classes.fabProgress} />
              </div>
            </div>
          )}
          {successRequest && children}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSave;
