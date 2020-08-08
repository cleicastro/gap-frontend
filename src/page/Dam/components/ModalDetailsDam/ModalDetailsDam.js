import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@material-ui/core';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { alterStatusDam } from '../../../../store/damReducer';

import useStyles from './styles';
import { Review } from '../../../../components';
import MenuDocumentEvents from '../../../../components/MenuDocumentEvents/MenuDocumentEvents';

function ModalDetailsDam({
  className,
  handleReviewShow,
  showReview,
  handleDamView,
  alterStatusDam: handleUpate,
  updateDam: updateDamData,
  handleOpenDam,
  handleDataDam,
  ...rest
}) {
  const theme = useTheme();
  const fullScreenModal = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const items = [
    {
      item: handleDamView.receita ? handleDamView.receita.descricao : '',
      valor: handleDamView.valor_principal
    },
    {
      item: 'Taxa de expedição',
      valor: handleDamView.taxa_expedicao
    },
    {
      item: 'Juros',
      valor: handleDamView.valor_juros
    }
  ];
  const receitaInfo = {
    emissao: handleDamView.emissao,
    vencimento: handleDamView.vencimento,
    status: handleDamView.status
  };
  const contribuintes = [handleDamView.contribuinte];
  const infoAdicionais = handleDamView.info_adicionais;

  const [statusCancelar, setStatusCancelar] = useState(false);
  const [statusPagar, setStatusPagar] = useState(false);
  const [handleUpdateStatus, setHandleUpdateStatus] = useState({});

  useEffect(() => {
    if (updateDamData.pago === 1 && handleDamView.id === updateDamData.id) {
      setStatusPagar(true);
      setHandleUpdateStatus(updateDamData);
    } else if (
      updateDamData.situacao === 0 &&
      handleDamView.id === updateDamData.id
    ) {
      setStatusCancelar(true);
      setHandleUpdateStatus(updateDamData);
    } else {
      setHandleUpdateStatus({});
      setStatusPagar(
        handleDamView.status === 'Pago' && handleDamView.status === 'Cancelado'
      );
      setStatusCancelar(handleDamView.status === 'Cancelado');
    }
  }, [updateDamData, handleDamView]);

  const handleEdit = () => {
    handleDataDam(handleDamView);
    handleReviewShow(false);
    handleOpenDam(true);
  };
  const handleCopy = () => {
    handleDataDam({ ...handleDamView, id: undefined });
    handleReviewShow(false);
    handleOpenDam(true);
  };

  return (
    <Dialog
      fullScreen={fullScreenModal}
      open={showReview}
      maxWidth="md"
      onClose={handleReviewShow}
      aria-labelledby="customized-dialog-title">
      <DialogTitle id="customized-dialog-title">
        <MenuDocumentEvents
          handleEdit={handleEdit}
          handleCopy={handleCopy}
          handleUpate={handleUpate}
          updateDamData={handleUpdateStatus}
          status={handleDamView.status}
          id={handleDamView.id}
          statusPagar={statusPagar}
          statusCancelar={statusCancelar}
          isVisibleOptions={{
            imprimir: true,
            pagar: true,
            copiar: true,
            editar: true,
            cancelar: true,
            sair: false
          }}
        />
      </DialogTitle>
      <DialogContent dividers>
        <div {...rest} className={clsx(classes.root, className)}>
          <Grid
            container
            spacing={2}
            justify="flex-start"
            alignItems="flex-start"
            className={classes.root}>
            <Grid item>
              <Review
                items={items}
                contribuintes={contribuintes}
                infoAdicionais={infoAdicionais}
                receitaInfo={receitaInfo}
              />
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReviewShow} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ModalDetailsDam.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  updateDam: {}
};

ModalDetailsDam.propTypes = {
  handleReviewShow: PropTypes.func.isRequired,
  showReview: PropTypes.bool.isRequired,
  handleDamView: PropTypes.object.isRequired,
  // updateDam: PropTypes.object.isRequired,
  handleOpenDam: PropTypes.func.isRequired,
  handleDataDam: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  updateDam: state.dam.updateDam
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ alterStatusDam }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetailsDam);
