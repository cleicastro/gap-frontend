import React, { useState } from 'react';
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
import { StepComponent, Contribuintes } from '../../../../components';
import NewDocumentArrecadacaoProvider from '../../../../contexts/NewDocumentArrecadacao';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewDam({ open, handleClose, receitas, handleDataDam }) {
  const classes = useStyles();

  const [isopen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog
        disableBackdropClick
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
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
        <NewDocumentArrecadacaoProvider
          isClosed={!open}
          valuesInitial={handleDataDam}
          listReceita={receitas}>
          <StepComponent
            steps={['Receita', 'Contribuinte', 'Documento', 'Confirmar dados']}
            title="Emissão de DAM"
            handleClose={handleClose}
            handleDataDam={handleDataDam}
          />
        </NewDocumentArrecadacaoProvider>
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
        <Contribuintes />
      </Dialog>
    </>
  );
}

export default NewDam;
