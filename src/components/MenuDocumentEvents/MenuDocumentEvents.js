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
  Button
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import useStyles from './styles';

function MenuDocumentEvents(props) {
  const {
    idPrint,
    handleEdit,
    handleCopy,
    handleAlterStatusDAM,
    statusPagar,
    statusCancelar,
    handleClose,
    visibleOptions
  } = props;
  const classes = useStyles();
  const { imprimir, pagar, copiar, editar, cancelar, sair } = visibleOptions;

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

          {pagar && !statusPagar && !statusCancelar && (
            <Button
              onClick={handleOpenPagar}
              aria-controls="fade-menu-pagar"
              aria-haspopup="true">
              Pagar
            </Button>
          )}
          {copiar && <Button onClick={handleCopy}>Copiar</Button>}
          {editar && !statusCancelar !== 'Cancelado' && (
            <Button onClick={handleEdit}>Editar</Button>
          )}
          {cancelar && !statusCancelar && (
            <Button
              onClick={handleOpenCancelar}
              aria-controls="fade-menu-cancelar"
              aria-haspopup="true">
              Cancelar
            </Button>
          )}
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
            <Link to={`pdf/dam/${idPrint.idDAM}`} target="_blank">
              DAM
            </Link>
          </MenuItem>
          <MenuItem onClick={() => setAnchorElPrint(null)}>Alvará</MenuItem>
          {idPrint.idNFSA && (
            <MenuItem onClick={() => setAnchorElPrint(null)}>
              <Link to={`pdf/nfsa/${idPrint.idNFSA}`} target="_blank">
                NFSA
              </Link>
            </MenuItem>
          )}
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
              handleAlterStatusDAM('pago', { pago: 1 });
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
              handleAlterStatusDAM('cancelado', { status: 0 });
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
    sair: true
  },
  idPrint: { idDAM: 0 }
};

MenuDocumentEvents.propTypes = {
  idPrint: PropTypes.object.isRequired,
  visibleOptions: PropTypes.object.isRequired,
  handleAlterStatusDAM: PropTypes.func.isRequired,
  statusCancelar: PropTypes.bool.isRequired,
  statusPagar: PropTypes.bool.isRequired
};

export default MenuDocumentEvents;
