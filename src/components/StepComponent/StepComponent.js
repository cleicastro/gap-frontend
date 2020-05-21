import React, { useState, useEffect, useCallback } from 'react';

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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { salvarDam, updateStatusDam } from '../../store/damReducer';

import useStyles from './styles';
import FormReceita from '../FormReceita';
import FormContribuinte from '../Contribuintes/FormCadContribuinte';
import FormDocumento from '../FormDocumento';
import Review from '../Review';
import MenuDocumentEvents from '../MenuDocumentEvents/MenuDocumentEvents';

function StepComponent({
  handleClose,
  steps,
  title,
  receitas,
  salvarDam: handleSalvar,
  newDamData,
  updateStatusDam: handleUpate,
  updateDam: updateDamData
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [receita, setReceita] = useState({});
  const [receitaInfo, setReceitaInfo] = useState({});
  const [contribuinte, setContribuinte] = useState({
    nome: '',
    doc: '',
    endereco: '',
    cidade: '',
    uf: '',
    cep: '',
    bairro: ''
  });
  const [documento, setDocumento] = useState({});
  const [itensPreview, setItemsPreview] = useState([]);

  useEffect(() => {
    const toDay = new Date();
    const weekDay = toDay.getDay();
    let diasVencer = 5;

    if (weekDay === 1) {
      diasVencer = 7;
    } else if (weekDay === 2) {
      diasVencer = 6;
    }
    const referencia = Intl.DateTimeFormat('fr-CA', {
      year: 'numeric',
      month: '2-digit'
    }).format(toDay);
    const emissao = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(toDay);
    const vencimento = Intl.DateTimeFormat('fr-CA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(toDay.setDate(toDay.getDate() + diasVencer));

    setDocumento({
      referencia,
      emissao,
      receita: receita.cod,
      vencimento,
      docOrigem: '',
      infoAdicionais: 'teste',
      valorPrincipal: receita.valor_fixo,
      juros: 0.0,
      taxaExp: receita.valor_fixo > 0 ? 0 : 5,
      valorTotal: receita.valor_fixo > 0 ? 0 : 5,
      valorMulta: 0
    });
    setItemsPreview([
      {
        item: receita.descricao,
        valor: receita.valor_fixo
      },
      {
        item: 'Taxa de expedição',
        valor: receita.valor_fixo > 0 ? 0 : 5
      },
      {
        item: 'Juros',
        valor: 0.0
      }
    ]);
  }, [receita]);

  const handleDocumento = useCallback(
    (doc) => {
      setDocumento({
        receita: receita.cod,
        emissao: doc.emissao,
        referencia: doc.referencia,
        vencimento: doc.vencimento,
        docOrigem: doc.docOrigem,
        infoAdicionais: doc.infoAdicionais,
        valorPrincipal: doc.valorPrincipal,
        juros: doc.juros,
        taxaExp: doc.taxaExp,
        valorTotal: doc.valorTotal,
        valorMulta: doc.valorMulta
      });

      setItemsPreview([
        {
          item: receita.descricao,
          valor: doc.valorTotal
        },
        {
          item: 'Taxa de expedição',
          valor: doc.taxaExp
        },
        {
          item: 'Juros',
          valor: doc.juros
        }
      ]);

      setReceitaInfo({
        emissao: new Date(`${new Date().toString().split('GMT')[0]} UTC`)
          .toISOString()
          .split('.')[0]
          .replace('T', ' '),
        vencimento: doc.vencimento,
        status: ''
      });
    },
    [receita.cod, receita.descricao]
  );

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      handleSalvar({ ...receita, ...documento, ...contribuinte });
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [statusCancelar, setStatusCancelar] = useState(false);
  const [statusPagar, setStatusPagar] = useState(false);
  const [handleUpdateStatus, setHandleUpdateStatus] = useState({});

  useEffect(() => {
    if (updateDamData.pago === 1 && newDamData.id === updateDamData.id) {
      setStatusPagar(true);
      setHandleUpdateStatus(updateDamData);
    } else if (
      updateDamData.situacao === 0 &&
      newDamData.id === updateDamData.id
    ) {
      setStatusCancelar(true);
      setHandleUpdateStatus(updateDamData);
    } else {
      setHandleUpdateStatus({});
      setStatusPagar(
        newDamData.status === 'Pago' && newDamData.status === 'Cancelado'
      );
      setStatusCancelar(newDamData.status === 'Cancelado');
    }
  }, [newDamData, updateDamData]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <FormReceita
            receitas={receitas}
            handleReceita={(data) => {
              setReceita(data);
              handleNext();
            }}
            receitaSelected={receita}
          />
        );
      case 1:
        return (
          <FormContribuinte
            handleContribuinte={setContribuinte}
            contribuinteSelected={contribuinte}
          />
        );
      case 2:
        return (
          <FormDocumento
            handleDocumento={handleDocumento}
            documentoSelected={documento}
          />
        );
      case 3:
        return (
          <Review
            items={itensPreview}
            contribuintes={[contribuinte]}
            infoAdicionais={documento.info_adicionais}
            receitaInfo={receitaInfo}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            {title}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length && newDamData ? (
              <>
                {newDamData.id ? (
                  <>
                    <Typography variant="h5" gutterBottom>
                      DAM gerado com sucesso!
                    </Typography>
                    <Typography variant="subtitle1">
                      O Número do seu DAM é #{newDamData.id}. Selecione um
                      envento para este documento.
                    </Typography>
                    <MenuDocumentEvents
                      handleUpate={handleUpate}
                      updateDamData={handleUpdateStatus}
                      status={newDamData.status}
                      id={newDamData.id}
                      statusPagar={statusPagar}
                      statusCancelar={statusCancelar}
                    />
                  </>
                ) : (
                    <div className={classes.progress}>
                      <CircularProgress />
                    </div>
                  )}
              </>
            ) : (
                <>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Voltar
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Salvar' : 'Avançar'}
                    </Button>
                  </div>
                </>
              )}
          </>
        </Paper>
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
  newDamData: state.dam.newDamData,
  updateDam: state.dam.updateDam,
  isload: state.dam.isload
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ salvarDam, updateStatusDam }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StepComponent);
