import React, { useContext } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Slide,
  Box,
  Fab
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import { Add as AddIcon } from '@material-ui/icons';
import useStyles from './styles';

import {
  NfsaContext,
  ACTIONS_NFSA,
  ContribuinteProvier
} from '../../../../contexts';
import { Contribuintes } from '../../../../components';
import StepComponent from './StepComponent';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewNfsa() {
  const classes = useStyles();
  const {
    state: { showModalNewNfsa, openWindowContribuinte, cadastroContribuinte },
    dispatch
  } = useContext(NfsaContext);

  const handleOpoenWindowContribuinte = () => {
    dispatch({
      type: ACTIONS_NFSA.MODAL_CONTRIBUINTES
    });
  };

  const handleOpenModalNewNfsa = () => {
    dispatch({
      type: ACTIONS_NFSA.MODAL_NEW_NFSA
    });
  };

  return (
    <>
      <Box displayPrint="none" className={classes.fab}>
        <Fab
          color="primary"
          size="medium"
          aria-label="add"
          onClick={handleOpenModalNewNfsa}>
          <AddIcon />
        </Fab>
      </Box>
      <Dialog
        disableBackdropClick
        fullScreen
        open={showModalNewNfsa}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOpenModalNewNfsa}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              GAP
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleOpoenWindowContribuinte}>
              Contribuintes
            </Button>
          </Toolbar>
        </AppBar>
        {/* component new NFSA */}
        <StepComponent />
      </Dialog>
      {/* Cadastro do contribuinte */}
      <Dialog
        disableBackdropClick
        fullScreen
        open={openWindowContribuinte}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOpoenWindowContribuinte}
              aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <ContribuinteProvier>
          <Contribuintes contribuinte={cadastroContribuinte} />
        </ContribuinteProvier>
      </Dialog>
    </>
  );
}

export default NewNfsa;
