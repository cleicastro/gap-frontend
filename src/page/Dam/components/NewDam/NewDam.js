import React from 'react';
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
import { StepComponent } from '../../../../components';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewDam({ open, handleClose }) {
  const classes = useStyles();

  return (
    <Dialog
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
            Ryatec-GAP
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Salvar
          </Button>
        </Toolbar>
      </AppBar>
      <StepComponent
        steps={['Contribuinte', 'Documento', 'Confirmar dados']}
        title="Emissão de DAM"
      />
    </Dialog>
  );
}

export default NewDam;
