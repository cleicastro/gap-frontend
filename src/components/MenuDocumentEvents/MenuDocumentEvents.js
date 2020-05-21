import React from 'react';
// import clsx from 'clsx';

import {
  Grid,
  ButtonGroup,
  Menu,
  MenuItem,
  Fade,
  TextField,
  Snackbar,
  CircularProgress,
  Button
} from '@material-ui/core';
/* import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save'; */

import { Alert } from '@material-ui/lab';
import useStyles from './styles';

function MenuDocumentEvents({
  handleUpate,
  updateDamData,
  status,
  id,
  statusPagar,
  statusCancelar
}) {
  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [anchorElPrint, setAnchorElPrint] = React.useState(null);
  const [anchorElPagar, setAnchorElPagar] = React.useState(null);
  const [anchorElCancelar, setAnchorElCancelar] = React.useState(null);
  const handleOpenPrint = (event) => {
    setAnchorElPrint(event.currentTarget);
  };
  const handleOpenPagar = (event) => {
    setAnchorElPagar(event.currentTarget);
  };
  const handleOpenCancelar = (event) => {
    setAnchorElCancelar(event.currentTarget);
  };

  /*  const buttonClassname = clsx({
     [classes.buttonSuccess]: updateDamData.message
   }); */

  return (
    <Grid
      container
      spacing={2}
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}>
      <Grid item>
        <ButtonGroup
          size="small"
          variant="contained"
          color="primary"
          aria-label="contained primary button group">
          <Button
            onClick={handleOpenPrint}
            aria-controls="fade-menu-print"
            aria-haspopup="true">
            Imprimir
          </Button>
          {!statusPagar && status !== 'Pago' && status !== 'Cancelado' && (
            <Button
              onClick={handleOpenPagar}
              aria-controls="fade-menu-pagar"
              aria-haspopup="true">
              Pagar
            </Button>
          )}
          <Button>Copiar</Button>
          {status !== 'Cancelado' && <Button>Editar</Button>}
          {!statusCancelar && status !== 'Cancelado' && (
            <Button
              onClick={handleOpenCancelar}
              aria-controls="fade-menu-cancelar"
              aria-haspopup="true">
              Cancelar
            </Button>
          )}
        </ButtonGroup>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          key={id}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}>
          <>
            {/* <div className={classes.wrapper}>
              <Fab
                aria-label="save"
                color="primary"
                className={buttonClassname}>
                {classes ? <CheckIcon /> : <SaveIcon />}
              </Fab>
              {!updateDamData.message && (
                <CircularProgress size={68} className={classes.fabProgress} />
              )}
            </div> */}
            {updateDamData.message ? (
              <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                {updateDamData.message}
              </Alert>
            ) : (
                <CircularProgress />
              )}
          </>
        </Snackbar>
        <Menu
          id="fade-menu"
          keepMounted
          anchorEl={anchorElPrint}
          open={Boolean(anchorElPrint)}
          onClose={() => setAnchorElPrint(null)}
          TransitionComponent={Fade}>
          <MenuItem onClick={() => setAnchorElPrint(null)}>DAM</MenuItem>
          <MenuItem onClick={() => setAnchorElPrint(null)}>Alvará</MenuItem>
          <MenuItem onClick={() => setAnchorElPrint(null)}>NFSA</MenuItem>
          <MenuItem onClick={() => setAnchorElPrint(null)}>Recibo</MenuItem>
        </Menu>
        <Menu
          id="fade-menu"
          keepMounted
          anchorEl={anchorElPagar}
          open={Boolean(anchorElPagar)}
          onClose={() => setAnchorElPagar(null)}
          TransitionComponent={Fade}>
          <Grid item>
            <TextField
              label="Data de pagamento"
              id="pagamento"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Button
            onClick={() => {
              setOpenSnackbar(true);
              handleUpate(id, { pago: 1 });
              setAnchorElPagar(null);
            }}>
            Sim
          </Button>
          <Button onClick={() => setAnchorElPagar(null)}>Não</Button>
        </Menu>
        <Menu
          id="fade-menu"
          keepMounted
          anchorEl={anchorElCancelar}
          open={Boolean(anchorElCancelar)}
          onClose={() => setAnchorElCancelar(null)}
          TransitionComponent={Fade}>
          <Button
            onClick={() => {
              setOpenSnackbar(true);
              handleUpate(id, { status: 0 });
              setAnchorElCancelar(null);
            }}>
            Sim
          </Button>
          <Button onClick={() => setAnchorElCancelar(null)}>Não</Button>
        </Menu>
      </Grid>
    </Grid>
  );
}

export default MenuDocumentEvents;
