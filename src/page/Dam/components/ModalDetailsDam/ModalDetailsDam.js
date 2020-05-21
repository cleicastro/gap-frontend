import React, { useEffect, useState } from 'react';

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

import { updateStatusDam } from '../../../../store/damReducer';

import useStyles from './styles';
import { Review } from '../../../../components';
import MenuDocumentEvents from '../../../../components/MenuDocumentEvents/MenuDocumentEvents';

function ModalDetailsDam({
  className,
  handleReviewShow,
  showReview,
  handleDamView,
  updateStatusDam: handleUpate,
  updateDam: updateDamData,
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

  return (
    <Dialog
      fullScreen={fullScreenModal}
      open={showReview}
      maxWidth="md"
      onClose={handleReviewShow}
      aria-labelledby="customized-dialog-title">
      <DialogTitle id="customized-dialog-title">
        <MenuDocumentEvents
          handleUpate={handleUpate}
          updateDamData={handleUpdateStatus}
          status={handleDamView.status}
          id={handleDamView.id}
          statusPagar={statusPagar}
          statusCancelar={statusCancelar}
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

const mapStateToProps = (state) => ({
  updateDam: state.dam.updateDam
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateStatusDam }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetailsDam);
