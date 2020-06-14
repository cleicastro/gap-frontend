/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

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

import { Alert } from '@material-ui/lab';
import useStyles from './styles';

function MenuDocumentEvents({
  handleEdit,
  handleCopy,
  handleUpate,
  updateDamData,
  handleClose,
  status,
  id,
  statusPagar,
  statusCancelar,
  isVisibleOptions
}) {
  const classes = useStyles();
  const { imprimir, pagar, copiar, editar, cancelar, sair } = isVisibleOptions;

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [anchorElPrint, setAnchorElPrint] = React.useState(null);
  const [anchorElPagar, setAnchorElPagar] = React.useState(null);
  const [anchorElCancelar, setAnchorElCancelar] = React.useState(null);
  const [isProgressSave, setIsProgressSave] = React.useState(false);

  const handleOpenPrint = (event) => {
    setAnchorElPrint(event.currentTarget);
  };
  const handleOpenPagar = (event) => {
    setIsProgressSave(true);
    setAnchorElPagar(event.currentTarget);
  };
  const handleOpenCancelar = (event) => {
    setIsProgressSave(true);
    setAnchorElCancelar(event.currentTarget);
  };

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
          {imprimir && (
            <Button
              onClick={handleOpenPrint}
              aria-controls="fade-menu-print"
              aria-haspopup="true">
              Imprimir
            </Button>
          )}

          {pagar &&
            !statusPagar &&
            status !== 'Pago' &&
            status !== 'Cancelado' && (
              <Button
                onClick={handleOpenPagar}
                aria-controls="fade-menu-pagar"
                aria-haspopup="true">
                Pagar
              </Button>
            )}
          {copiar && <Button onClick={handleCopy}>Copiar</Button>}
          {editar && status !== 'Cancelado' && (
            <Button onClick={handleEdit}>Editar</Button>
          )}
          {cancelar && !statusCancelar && status !== 'Cancelado' && (
            <Button
              onClick={handleOpenCancelar}
              aria-controls="fade-menu-cancelar"
              aria-haspopup="true">
              Cancelar
            </Button>
          )}
          {sair && <Button onClick={handleClose}>Sair</Button>}
        </ButtonGroup>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          key={id}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}>
          <>
            {updateDamData.message && (
              <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                {updateDamData.message}
              </Alert>
            )}
            {isProgressSave && !updateDamData.message && <CircularProgress />}
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
              value="2017-05-24T10:30"
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

MenuDocumentEvents.defaultProps = {
  isVisibleOptions: {
    imprimir: false,
    pagar: false,
    copiar: false,
    editar: false,
    cancelar: false,
    sair: true
  },
  id: 0
};

MenuDocumentEvents.propTypes = {
  id: PropTypes.number.isRequired,
  isVisibleOptions: PropTypes.object.isRequired,
  updateDamData: PropTypes.object.isRequired,
  handleUpate: PropTypes.func.isRequired,
  statusCancelar: PropTypes.bool.isRequired,
  statusPagar: PropTypes.bool.isRequired
};

export default MenuDocumentEvents;
