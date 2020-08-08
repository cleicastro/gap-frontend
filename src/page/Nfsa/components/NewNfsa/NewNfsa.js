import React, { useState, useContext } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Slide
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import useStyles from './styles';

import { NfsaContext, ContribuinteProvier } from '../../../../contexts';
import { Contribuintes } from '../../../../components';
import StepComponent from './StepComponent';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewNfsa() {
  const { handleCloseNewNfsa, showNewNfsa } = useContext(NfsaContext);

  const classes = useStyles();

  const [isopen, setIsOpen] = useState(false);

  document.addEventListener('keydown', (event) => {
    // ctrl+m => nova contribuinte
    if (event.ctrlKey && event.keyCode === 77) {
      setIsOpen(true);
    }
  });

  return (
    <>
      <Dialog
        disableBackdropClick
        fullScreen
        open={showNewNfsa}
        onClose={() => handleCloseNewNfsa(false)}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleCloseNewNfsa(false)}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              GAP
            </Typography>
            <Button autoFocus color="inherit" onClick={() => setIsOpen(true)}>
              Contribuintes
            </Button>
          </Toolbar>
        </AppBar>
        <StepComponent />
      </Dialog>
      <Dialog
        disableBackdropClick
        fullScreen
        open={isopen}
        onClose={() => setIsOpen(false)}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setIsOpen(false)}
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
