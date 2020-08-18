import React, { useContext, useState, useEffect } from 'react';

import {
  CssBaseline,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress
} from '@material-ui/core';

import { useForm } from 'react-hook-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  salvarDam,
  alterStatusDam,
  updateDataDam,
  cleanDataDAM
} from '../../store/damReducer';

import useStyles from './styles';
import FormReceita from '../FormReceita';
import FormContribuinte from '../FormContribuinte';
import FormDocumento from '../FormDocumento';
import Review from '../Review';
import { DamContext } from '../../contexts';
import MenuDocumentEvents from '../MenuDocumentEvents/MenuDocumentEvents';

function StepComponent({
  steps,
  title,
  newDamData,
  updateDam,
  salvarDam: handleSalvar,
  updateDataDam: handleUpdateData,
  alterStatusDam: handleUpate,
  cleanDataDAM: handleCleanDam,
  handleClose
}) {
  const {
    handleBack,
    handleNext,
    activeStep,
    selectedReceita,
    dataPreview,
    valuesInitial,
    isClosed
  } = useContext(DamContext);

  const { handleSubmit } = useForm();
  const classes = useStyles();
  const [isProgressSave, setIsProgressSave] = useState(false);
  const [statusCancelar, setStatusCancelar] = useState(false);
  const [statusPagar, setStatusPagar] = useState(false);
  const [handleUpdateStatus, setHandleUpdateStatus] = useState({});

  useEffect(() => {
    if (isClosed) {
      handleCleanDam();
    }
  }, [handleCleanDam, isClosed]);

  useEffect(() => {
    if (updateDam.pago === 1 && newDamData.id === updateDam.id) {
      setStatusPagar(true);
      setHandleUpdateStatus(updateDam);
    } else if (updateDam.situacao === 0 && newDamData.id === updateDam.id) {
      setStatusCancelar(true);
      setHandleUpdateStatus(updateDam);
    } else {
      setHandleUpdateStatus({});
      setStatusPagar(
        newDamData.status === 'Pago' && newDamData.status === 'Cancelado'
      );
      setStatusCancelar(newDamData.status === 'Cancelado');
    }
    setIsProgressSave(false);
  }, [newDamData, updateDam]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FormReceita />;
      case 1:
        return <FormContribuinte />;
      case 2:
        return <FormDocumento />;
      case 3:
        return (
          <Review
            items={dataPreview.itensPreview}
            contribuintes={[dataPreview.contribuinte]}
            infoAdicionais={dataPreview.documento.infoAdicionais}
            receitaInfo={dataPreview.receitaInfo}
          />
        );

      default:
        throw new Error('Unknown step');
    }
  }

  function onSubmit(data) {
    // console.log(data);
  }

  function saveDam() {
    setIsProgressSave(true);

    const {
      receita,
      docOrigem,
      infoAdicionais,
      referencia,
      emissao,
      vencimento,
      valorPrincipal,
      juros,
      valorMulta,
      taxaExp,
      valorTotal
    } = dataPreview.documento;

    if (valuesInitial.id) {
      handleUpdateData(valuesInitial.id, {
        documentoToUpdateCard: {
          doc: dataPreview.contribuinte.doc,
          nome: dataPreview.contribuinte.nome,
          endereco: dataPreview.contribuinte.endereco,
          bairro: dataPreview.contribuinte.bairro,
          cep: dataPreview.contribuinte.cep,
          uf: dataPreview.contribuinte.uf,
          cidade: dataPreview.contribuinte.cidade,
          cod: selectedReceita.doc,
          descricao: selectedReceita.descricao,
          sigla: selectedReceita.sigla,
          valor_fixo: selectedReceita.valor_fixo
        },
        receita,
        docOrigem,
        infoAdicionais,
        referencia,
        emissao,
        vencimento,
        valorPrincipal,
        juros,
        valorMulta,
        taxaExp,
        valorTotal,
        idContribuinte: dataPreview.contribuinte.id
      });
    } else {
      handleSalvar({
        receita: selectedReceita.cod,
        docOrigem,
        infoAdicionais,
        referencia,
        emissao,
        vencimento,
        valorPrincipal,
        juros,
        valorMulta,
        taxaExp,
        valorTotal,
        idContribuinte: dataPreview.contribuinte.id
      });
    }
  }

  const MenuActionsDam = () => {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          {updateDam.status === 200 && updateDam.id
            ? 'DAM alterado com sucesso!'
            : 'DAM gerado com sucesso!'}
        </Typography>
        <Typography variant="subtitle1">
          {!updateDam.status &&
            `O Número do seu DAM é #${newDamData.id}. Selecione um
                        envento para este documento.`}
        </Typography>
        <MenuDocumentEvents
          id={newDamData.id}
          status={newDamData.status}
          handleUpate={handleUpate}
          updateDamData={handleUpdateStatus}
          statusPagar={statusPagar}
          statusCancelar={statusCancelar}
          handleClose={handleClose}
          isVisibleOptions={{
            imprimir: true,
            pagar: true,
            copiar: false,
            editar: false,
            cancelar: true,
            sair: true
          }}
        />
      </>
    );
  };

  const ProgressRequest = () => {
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );
  };

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            {title} - {selectedReceita.descricao}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {!isProgressSave && !newDamData.id && !updateDam.status && (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Voltar
                    </Button>
                  )}
                  <Button
                    type="submit"
                    onClick={() =>
                      activeStep === steps.length - 1 ? saveDam() : handleNext()
                    }
                    variant="contained"
                    color="primary"
                    className={classes.button}>
                    {activeStep === steps.length - 1 ? 'Salvar' : 'Avançar'}
                  </Button>
                </div>
              </>
            )}
            {!isProgressSave && (newDamData.id || updateDam.status) && (
              <MenuActionsDam />
            )}
            {isProgressSave && <ProgressRequest />}
          </form>
        </Paper>
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
  newDamData: state.dam.newDamData,
  updateDam: state.dam.updateDam
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      salvarDam,
      alterStatusDam,
      updateDataDam,
      cleanDataDAM
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StepComponent);
