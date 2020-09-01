import React from 'react';

import { Modal, Fab, CircularProgress } from '@material-ui/core';
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
      aria-labelledby="simple-title"
      aria-describedby="modal-description"
      className={classes.modal}>
      <div className={classes.paper}>
        <h2 id="modal-title">
          {!statusServer && 'Salvando documento...'}
          {statusServer === 201 && `Documento inserido com sucesso!`}
          {statusServer === 200 && `Documento alterado com sucesso!`}
        </h2>
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
