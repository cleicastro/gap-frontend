import React, { useState, useContext } from 'react';
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

import { NfsaContext, ContribuinteProvier } from '../../../../contexts';
import { Contribuintes } from '../../../../components';
import StepComponent from './StepComponent';
import { useOpenNewNfsa } from '../../../../hooks';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewNfsa() {
  const classes = useStyles();
  const {
    state: { showModalNewNfsa }
  } = useContext(NfsaContext);

  const [openWindowContribuinte, setOpenWindowContribuinte] = useState(false);
  const setWindow = useOpenNewNfsa();

  /* document.addEventListener('keydown', (event) => {
    // ctrl+m => nova contribuinte
    if (event.ctrlKey && event.keyCode === 77) {
      setIsOpen(true);
    }
  }); */

  return (
    <>
      <Box displayPrint="none" className={classes.fab}>
        <Fab color="primary" size="medium" aria-label="add" onClick={setWindow}>
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
              onClick={setWindow}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              GAP
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => setOpenWindowContribuinte(true)}>
              Contribuintes
            </Button>
          </Toolbar>
        </AppBar>
        {/* component new Nfsa */}
        <StepComponent />
      </Dialog>
      {/* Cadastro do contribuinte */}
      <Dialog
        disableBackdropClick
        fullScreen
        open={openWindowContribuinte}
        onClose={() => setOpenWindowContribuinte(false)}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenWindowContribuinte(false)}
              aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <ContribuinteProvier>
          <Contribuintes />
        </ContribuinteProvier>
      </Dialog>
    </>
  );
}

export default NewNfsa;
