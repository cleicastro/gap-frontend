import React, { useContext } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Slide,
  Fab,
  Box
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import { Add as AddIcon } from '@material-ui/icons';
import useStyles from './styles';

import { ContribuinteProvier, DamContext, ACTIONS } from '../../../../contexts';
import { Contribuintes } from '../../../../components';
import StepComponent from './StepComponent';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewDam() {
  const classes = useStyles();
  const {
    state: { showModalNewDam, openWindowContribuinte, cadastroContribuinte },
    dispatch
  } = useContext(DamContext);

  const handleOpoenWindowContribuinte = () => {
    dispatch({
      type: ACTIONS.MODAL_CONTRIBUINTES
    });
  };

  const handleSetWindow = () => {
    dispatch({
      type: ACTIONS.MODAL_NEW_DAM
    });
  };

  return (
    <>
      <Box displayPrint="none" className={classes.fab}>
        <Fab
          color="primary"
          size="medium"
          aria-label="add"
          onClick={handleSetWindow}>
          <AddIcon />
        </Fab>
      </Box>
      <Dialog
        disableBackdropClick
        fullScreen
        open={showModalNewDam}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleSetWindow}
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
        {/* component new DAM */}
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

export default NewDam;
