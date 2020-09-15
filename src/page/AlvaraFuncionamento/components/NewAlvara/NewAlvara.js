import React, { useContext, useCallback } from 'react';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewAlvara() {
  const classes = useStyles();
  const {
    state: {
      showModalNewAlvaraFuncionamento,
      openWindowContribuinte,
      cadastroContribuinte,
      dataAlvaraFuncionamento
    },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);

  const handleOpoenWindowContribuinte = () => {
    dispatch({
      type: ACTIONS_ALVARA.MODAL_CONTRIBUINTES
    });
  };

  const handleOpenWindowNewAlvara = () => {
    dispatch({
      type: ACTIONS_ALVARA.MODAL_NEW_ALVARA
    });
    if (showModalNewAlvaraFuncionamento) {
      dispatch({
        type: ACTIONS_ALVARA.CLEAN_DATA_ALVARA
      });
    }
  };

  const handleUpdateContribuinte = useCallback(
    (data) => {
      dispatch({ type: ACTIONS_ALVARA.SELECT_TAXPAYER, payload: data });
      dispatch({
        type: ACTIONS_ALVARA.SELECT_ALVARA_FUNCIONAMENTO,
        payload: { ...dataAlvaraFuncionamento, ...data }
      });
    },
    [dataAlvaraFuncionamento, dispatch]
  );

  return (
    <>
      <Box displayPrint="none" className={classes.fab}>
        <Fab
          color="primary"
          size="medium"
          aria-label="add"
          onClick={handleOpenWindowNewAlvara}>
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
              onClick={handleOpenWindowNewAlvara}
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
          <Contribuintes
            contribuinte={cadastroContribuinte}
            closedWindowContribuinte={handleOpoenWindowContribuinte}
            updateContribuinte={handleUpdateContribuinte}
          />
        </ContribuinteProvier>
      </Dialog>
    </>
  );
}

export default NewAlvara;
