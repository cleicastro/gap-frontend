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

import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { ACTION } from '../../store/datePayDam';

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
  const dispatch = useDispatch();
  const vencimento = useSelector((state) => state.datePayment.datePayment);

  const handleOpenPrint = (event) => {
    setAnchorElPrint(event.currentTarget);
  };
  const handleOpenPagar = (event) => {
    setAnchorElPagar(event.currentTarget);
  };
  const handleOpenCancelar = (event) => {
    setAnchorElCancelar(event.currentTarget);
  };

  const handleVencimento = (event) => {
    dispatch({
      type: ACTION.DATE_PAY,
      payload: event.target.value
    });
    return event.target.value;
  };

  return (
    <Grid
      container
      spacing={2}
      justify="space-between"
      alignItems="center"
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
          {nfsa && (
            <MenuItem onClick={() => setAnchorElPrint(null)}>
              <Button
                className={classes.btnLinkPrint}
                variant="outlined"
                color="primary"
                href={`pdf/nfsa/${values.id}`}
                target="_blank">
                NFSA
              </Button>
            </MenuItem>
          )}
          <MenuItem onClick={() => setAnchorElPrint(null)}>
            <Button
              className={classes.btnLinkPrint}
              variant="outlined"
              color="primary"
              href={`pdf/dam/${values.id_dam ? values.id_dam : values.id}`}
              target="_blank">
              DAM
            </Button>
          </MenuItem>
          {recibo && (
            <MenuItem onClick={() => setAnchorElPrint(null)}>
              <Button
                className={classes.btnLinkPrint}
                variant="outlined"
                color="primary"
                href={`pdf/recibo/${values.id}`}
                target="_blank">
                Recibo
              </Button>
            </MenuItem>
          )}
          {alvara && (
            <MenuItem onClick={() => setAnchorElPrint(null)}>
              <Button
                className={classes.btnLinkPrint}
                variant="outlined"
                color="primary"
                href={`pdf/alvara/${values.id_dam ? values.id_dam : values.id}`}
                target="_blank">
                Alvará
              </Button>
            </MenuItem>
          )}
        </Menu>
        <Menu
          id="fade-menu"
          keepMounted
          anchorEl={anchorElPagar}
          open={Boolean(anchorElPagar)}
          onClose={() => setAnchorElPagar(null)}
          TransitionComponent={Fade}>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            direction="column">
            <Grid item className={classes.containerVencimento}>
              <TextField
                fullWidth
                label="Data de pagamento"
                id="pagamento"
                type="datetime-local"
                defaultValue={vencimento}
                onChange={handleVencimento}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid>
              <Button
                onClick={() => {
                  handleAlterStatusDAM('pay', { pago: 1 });
                  setAnchorElPagar(null);
                }}>
                Sim
              </Button>
              <Button onClick={() => setAnchorElPagar(null)}>Não</Button>
            </Grid>
          </Grid>
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
