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

import {
  ContribuinteProvier,
  AlvaraFuncionamentoContext,
  ACTIONS_ALVARA
} from '../../../../contexts';
import { Contribuintes } from '../../../../components';
import StepComponent from './StepComponent';
import { useOpenNewAlvara } from '../../../../hooks';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewAlvara() {
  const classes = useStyles();
  const {
    state: {
      showModalNewAlvaraFuncionamento,
      openWindowContribuinte,
      cadastroContribuinte
    },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);

  const setWindow = useOpenNewAlvara();

  const handleOpoenWindowContribuinte = () => {
    dispatch({
      type: ACTIONS_ALVARA.MODAL_CONTRIBUINTES
    });
  };

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
        open={showModalNewAlvaraFuncionamento}
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
              onClick={handleOpoenWindowContribuinte}>
              Contribuintes
            </Button>
          </Toolbar>
        </AppBar>
        {/* component new Alvara */}
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

export default NewAlvara;
