/* eslint-disable react/no-unused-prop-types */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
  CircularProgress,
  Modal,
  Fab
} from '@material-ui/core';

import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

import clsx from 'clsx';
import { NfsaContext } from '../../../../contexts';
import useStyles from './styles';
import { ButtonStep, MenuDocumentEvents } from '../../../../components';

function PreviewNfsa({ steps, activeStep, setActiveStep, isOpenModalMenu }) {
  const classes = useStyles();
  const {
    valueFormItems,
    participantes,
    valueFormTributos,
    valuesFormDocumento,
    dataLoadNFSA,
    insertedNFSA,
    updateNFSA,
    responseStatusDam,
    handleAlterStatusDAM,
    handleCloseNewNfsa,
    handleSaveNFSA,
    handleEditNFSA,
    handleCopyNFSA
  } = useContext(NfsaContext);
  const { irValor, taxaExp, valorISS, valorNF } = valueFormTributos;
  const [dataNFSA, setDataNFSA] = useState(dataLoadNFSA);
  const [posResponseStatusDam, setPosResponseStatusDAM] = useState(null);
  const [isProgressSave, setIsProgressSave] = useState(false);
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const [statusCancelar, setStatusCancelar] = useState(false);
  const [statusPagar, setStatusPagar] = useState(false);
  const [success, setSucess] = useState(false);
  const timer = React.useRef();
  const tributes = [
    { descricao: 'ISS', valor: valorISS },
    { descricao: 'Imposto de renda', valor: irValor },
    { descricao: 'Taxa de expedição', valor: taxaExp }
  ];
  const buttonClassname = clsx({
    [classes.buttonSuccess]: isProgressSave
  });

  useEffect(() => {
    if (insertedNFSA) {
      setDataNFSA(insertedNFSA);
      setSucess(true);
    }
    if (updateNFSA) {
      setSucess(true);
    }
    if (responseStatusDam) {
      setStatusPagar(responseStatusDam.tipo === 'pago');
      setStatusCancelar(responseStatusDam.tipo === 'cancelado');
      setPosResponseStatusDAM(responseStatusDam);
      setSucess(true);
    }
    timer.current = setTimeout(() => {
      setIsProgressSave(false);
      if (isOpenModalMenu) setOpenModalMenu(false);
    }, 300);
    return () => {
      clearTimeout(timer.current);
    };
  }, [insertedNFSA, isOpenModalMenu, responseStatusDam, updateNFSA]);

  const saveNFSA = () => {
    setSucess(false);
    setOpenModalMenu(true);
    setIsProgressSave(true);
    handleSaveNFSA();
  };

  const handleAlterStatus = (tipo, params) => {
    setSucess(false);
    setIsProgressSave(true);
    handleAlterStatusDAM(dataNFSA.dam.id, tipo, params);
  };

  const MenuAction = () => {
    return (
      <MenuDocumentEvents
        idPrint={{ idDAM: dataNFSA.dam.id, idNFSA: dataNFSA.id }}
        handleEdit={handleEditNFSA}
        handleCopy={handleCopyNFSA}
        handleAlterStatusDAM={(tipo, params) => {
          handleAlterStatus(tipo, params);
          if (isOpenModalMenu) setOpenModalMenu(true);
        }}
        responseStatus={posResponseStatusDam}
        statusPagar={statusPagar}
        statusCancelar={statusCancelar}
        handleClose={() => handleCloseNewNfsa(false)}
        visibleOptions={{
          imprimir: true,
          pagar: !dataNFSA.dam.pago && dataNFSA.dam.status,
          copiar: isOpenModalMenu,
          editar: isOpenModalMenu && dataNFSA.dam.status,
          cancelar: dataNFSA.dam.status,
          sair: true
        }}
      />
    );
  };
  const MenuActionsNewNFSA = () => {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          {posResponseStatusDam
            ? `DAM ${posResponseStatusDam.tipo}!`
            : `DAM ${dataLoadNFSA.dam.id}`}
        </Typography>
        <Typography variant="subtitle1">
          {dataNFSA &&
            `O Número da sua NFSA é #${dataNFSA.id}. Selecione um
            envento para este documento.`}
          {posResponseStatusDam && `${posResponseStatusDam.message}`}
        </Typography>
        {!isOpenModalMenu && <MenuAction />}
      </>
    );
  };

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  return (
    <>
      {isOpenModalMenu && <MenuAction />}
      <Grid container spacing={2} direction="column">
        <Grid item container direction="row">
          <Grid item xs={6} sm={7}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Prestador
            </Typography>
            <Typography gutterBottom>{participantes.nomePrestador}</Typography>
          </Grid>
          <Grid item xs={6} sm={5} align="right">
            <Typography variant="h6" gutterBottom className={classes.title}>
              CPF/CNPJ
            </Typography>
            <Typography gutterBottom>{participantes.docPrestador}</Typography>
          </Grid>
          <Grid item xs={6} sm={7}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Tomador
            </Typography>
            <Typography gutterBottom>{participantes.nomeTomador}</Typography>
          </Grid>
          <Grid item xs={6} sm={5} align="right">
            <Typography variant="h6" gutterBottom className={classes.title}>
              CPF/CNPJ
            </Typography>
            <Typography gutterBottom>{participantes.docTomador}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={5}>
              <Typography variant="h6" gutterBottom>
                Emissão
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" align="center" gutterBottom>
                Vencimento
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" align="right" gutterBottom>
                Valor do DAM
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={5}>
              <Typography>{valuesFormDocumento.emissao}</Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Typography>
                {Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }).format(new Date(valuesFormDocumento.vencimento))}
              </Typography>
            </Grid>
            <Grid item xs={3} align="right">
              <Typography>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(valuesFormDocumento.valorTotal))}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <List disablePadding>
        {valueFormItems.map((item, key) => (
          <div key={key}>
            <Divider variant="middle" />
            <ListItem className={classes.listItem}>
              <ListItemText primary={item.descricao} />
              <Typography variant="body2">
                {`(+) `}
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(item.quantidade) * Number(item.valor))}
              </Typography>
            </ListItem>
            <Divider variant="middle" />
          </div>
        ))}
        {tributes.map((item, key) => (
          <div key={key}>
            <ListItem className={classes.listItem}>
              <ListItemText primary={item.descricao} />
              <Typography variant="body2">
                {`(-) `}
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(item.valor))}
              </Typography>
              <Divider />
            </ListItem>
            <Divider variant="middle" />
          </div>
        ))}

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(Number(valorNF))}
          </Typography>
        </ListItem>
      </List>
      {activeStep === steps.length - 1 && (
        <ButtonStep
          steps={steps}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSave={saveNFSA}
        />
      )}
      <Modal
        open={openModalMenu}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        disableBackdropClick
        disableScrollLock
        onClose={() => alert('saindo')}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}>
        <div className={classes.paper}>
          <h2 id="modal-title">
            {isProgressSave && 'Salvando Nota Fiscal de Serviço Avulsa'}
          </h2>
          <div id="modal-description">
            {!isProgressSave && dataNFSA && <MenuActionsNewNFSA />}
            {isProgressSave && (
              <div className={classes.progress}>
                <div className={classes.wrapper}>
                  <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassname}>
                    {success ? <CheckIcon /> : <SaveIcon />}
                  </Fab>
                  <CircularProgress size={68} className={classes.fabProgress} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

PreviewNfsa.defaultProps = {
  isOpenModalMenu: false,
  steps: [],
  activeStep: 0,
  handleNext: () => null,
  handleBack: () => null
};

PreviewNfsa.propTypes = {
  isOpenModalMenu: PropTypes.bool,
  steps: PropTypes.array,
  activeStep: PropTypes.number,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func
};

export default PreviewNfsa;
