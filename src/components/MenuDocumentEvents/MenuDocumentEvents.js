/* eslint-disable react/default-props-match-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  ButtonGroup,
  Menu,
  MenuItem,
  Fade,
  TextField,
  Button
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import useStyles from './styles';

function MenuDocumentEvents(props) {
  const {
    handleClose,
    visibleOptions,
    values,
    handleCopy,
    handleEdit,
    handleAlterStatusDAM
  } = props;
  const classes = useStyles();
  const {
    imprimir,
    pagar,
    copiar,
    editar,
    cancelar,
    sair,
    nfsa,
    alvara,
    recibo
  } = visibleOptions;

  const [anchorElPrint, setAnchorElPrint] = useState(null);
  const [anchorElPagar, setAnchorElPagar] = useState(null);
  const [anchorElCancelar, setAnchorElCancelar] = useState(null);

  const handleOpenPrint = (event) => {
    setAnchorElPrint(event.currentTarget);
  };
  const handleOpenPagar = (event) => {
    setAnchorElPagar(event.currentTarget);
  };
  const handleOpenCancelar = (event) => {
    setAnchorElCancelar(event.currentTarget);
  };

  return (
    <Grid
      container
      spacing={2}
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}>
      <Grid item sm={6}>
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

          {pagar && (
            <Button
              onClick={handleOpenPagar}
              aria-controls="fade-menu-pagar"
              aria-haspopup="true">
              Pagar
            </Button>
          )}
          {cancelar && (
            <Button
              onClick={handleOpenCancelar}
              aria-controls="fade-menu-cancelar"
              aria-haspopup="true">
              Cancelar
            </Button>
          )}
          {copiar && <Button onClick={handleCopy}>Copiar</Button>}
          {editar && <Button onClick={handleEdit}>Editar</Button>}
          {sair && <Button onClick={handleClose}>Sair</Button>}
        </ButtonGroup>
        <Menu
          id="fade-menu"
          keepMounted
          anchorEl={anchorElPrint}
          open={Boolean(anchorElPrint)}
          onClose={() => setAnchorElPrint(null)}
          TransitionComponent={Fade}>
          <MenuItem onClick={() => setAnchorElPrint(null)}>
            <Link
              to={`pdf/dam/${values.id_dam ? values.id_dam : values.id}`}
              target="_blank">
              DAM
            </Link>
          </MenuItem>
          {nfsa && (
            <MenuItem onClick={() => setAnchorElPrint(null)}>
              <Link to={`pdf/nfsa/${values.id}`} target="_blank">
                NFSA
              </Link>
            </MenuItem>
          )}
          {recibo && (
            <MenuItem onClick={() => setAnchorElPrint(null)}>
              <Link to={`pdf/recibo/${values.id}`} target="_blank">
                Recibo
              </Link>
            </MenuItem>
          )}
          {alvara && (
            <MenuItem onClick={() => setAnchorElPrint(null)}>Alvará</MenuItem>
          )}
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
              handleAlterStatusDAM('pay', { pago: 1 });
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
              handleAlterStatusDAM('cancel', { status: 0 });
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
  visibleOptions: {
    imprimir: false,
    pagar: false,
    copiar: false,
    editar: false,
    cancelar: false,
    nfsa: true,
    alvara: true,
    recibo: true,
    sair: true
  },
  values: { id: 0, id_dam: 0 }
};

MenuDocumentEvents.propTypes = {
  visibleOptions: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  handleAlterStatusDAM: PropTypes.func.isRequired
};

export default MenuDocumentEvents;
