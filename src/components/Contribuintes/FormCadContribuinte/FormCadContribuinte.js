import React, { useState, useCallback, memo, useEffect } from 'react';
import {
  AppBar,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  CircularProgress
} from '@material-ui/core';
import { Save } from '@material-ui/icons';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import useStyles from './styles';
import FormEndereco from './FormEndereco';
import FormBancario from './FormBancario';
import FormInfoPessoais from './FormInfoPessoais';
import FormAlvara from './FormAlvara';
import { contribuinteSchemma } from '../../../util';
import { useSaveContribuinte, useEditContribuinte } from '../../../hooks';
import { AlertShow } from '../..';

function renderStepContent(step) {
  return (
    <>
      <Box style={{ display: step === 0 ? 'flex' : 'none' }}>
        <FormInfoPessoais />
      </Box>
      <Box style={{ display: step === 1 ? 'flex' : 'none' }}>
        <FormAlvara />
      </Box>
      <Box style={{ display: step === 2 ? 'flex' : 'none' }}>
        <FormEndereco />
      </Box>
      <Box style={{ display: step === 3 ? 'flex' : 'none' }}>
        <FormBancario />
      </Box>
    </>
  );
}

function FormCadContribuinte({ closeWindow, contribuinteSelected }) {
  const saveContribuinte = useSaveContribuinte();
  const editContribuinte = useEditContribuinte();
  const methods = useForm({
    defaultValues: contribuinteSelected || { tipo: 'PF', tipoConta: '' },
    resolver: yupResolver(contribuinteSchemma)
  });

  const { setValue } = methods;

  useEffect(() => {
    if (contribuinteSelected.doc) {
      const { cadAlvara } = contribuinteSelected;
      const docFormated = contribuinteSelected.doc && contribuinteSelected.doc;

      setValue('doc', docFormated);
      setValue('agencia', contribuinteSelected.agencia);
      setValue('bairro', contribuinteSelected.bairro);
      setValue('banco', contribuinteSelected.banco);
      setValue('cadAlvara', contribuinteSelected.cadAlvara);
      setValue('cep', contribuinteSelected.cep);
      setValue('cidade', contribuinteSelected.cidade);
      setValue('complemento', contribuinteSelected.complemento);
      setValue('conta', contribuinteSelected.conta);
      setValue('docEmissao', contribuinteSelected.docEmissao);
      setValue('docEstadual', contribuinteSelected.docEstadual);
      setValue('docOrgao', contribuinteSelected.docOrgao);
      setValue('email', contribuinteSelected.email);
      setValue('endereco', contribuinteSelected.endereco);
      setValue('id', contribuinteSelected.id);
      setValue('nome', contribuinteSelected.nome);
      setValue('numero', contribuinteSelected.numero);
      setValue('telefone', contribuinteSelected.telefone);
      setValue(
        'tipo',
        contribuinteSelected.tipo ? contribuinteSelected.tipo : 'PF'
      );
      setValue(
        'tipoConta',
        contribuinteSelected.tipoConta ? contribuinteSelected.tipoConta : ''
      );
      setValue('uf', contribuinteSelected.uf);
      setValue('variacao', contribuinteSelected.variacao);

      setValue('nomeFantasia', contribuinteSelected.nomeFantasia);
      setValue(
        'inscricaoMunicipal',
        cadAlvara && cadAlvara.inscricao_municipal
      );
      setValue(
        'atividadePrincipal',
        cadAlvara && cadAlvara.atividade_principal
      );
      setValue(
        'atividadeSecundariaI',
        cadAlvara && cadAlvara.atividade_secundaria_I
      );
      setValue(
        'atividadeSecundariaII',
        cadAlvara && cadAlvara.atividade_secundaria_II
      );
    }
  }, [contribuinteSelected, setValue]);

  const classes = useStyles();
  const steps = [
    'Informações Pessoais',
    'Cadastro de Alvará',
    'Endereço',
    'Dados Bancários'
  ];
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setErrors = Object.keys(methods.errors).map((erro) => {
      return erro;
    });
    if (setErrors.length > 0) {
      setMessage({
        message: `Verifique essas informações: ${setErrors.join(', ')}`,
        type: 'error'
      });
    }
  }, [methods.errors]);

  const handleBack = useCallback(() => {
    setActiveStep((value) => Number(value) - 1);
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((value) => Number(value) + 1);
  }, []);

  const onSubmit = (data) => {
    const dataContribuinteSave = { ...contribuinteSelected, ...data };
    setLoading(true);
    methods.clearErrors();

    async function save(contribuinte) {
      const response = await saveContribuinte(contribuinte);
      setLoading(false);
      if (response.status === 201) {
        setMessage({
          message: 'Contribuinte cadastrado com sucesso!',
          type: 'success'
        });
      } else if (response.error) {
        const { status, data: value } = response.error.response;
        const messageResponse = response.message;
        const statusCode = `status code:  ${status}`;
        const mesError = value.erro
          ? value.erro.errorInfo.join(', ')
          : value.message;

        setMessage({
          message: `${messageResponse}: ${statusCode} - message:  ${mesError}`,
          type: 'error'
        });
      }
    }
    async function edit(id, contribuinte) {
      const response = await editContribuinte(contribuinte.id, contribuinte);
      setLoading(false);
      if (response.status === 200) {
        setMessage({
          message: 'Contribuinte alterado com sucesso!',
          type: 'success'
        });
      }
      if (response.error) {
        const { status, data: value } = response.error.response;
        const messageResponse = response.message;
        const statusCode = `status code:  ${status}`;
        const mesError = value.erro
          ? value.erro.errorInfo.join(', ')
          : value.message;

        setMessage({
          message: `${messageResponse}: ${statusCode} - message:  ${mesError}`,
          type: 'error'
        });
      }
    }

    if (dataContribuinteSave.id) {
      edit(dataContribuinteSave.id, dataContribuinteSave);
    } else {
      save(dataContribuinteSave);
    }
  };

  return (
    <div className={classes.root}>
      <AlertShow messageProps={message} />
      <p />
      <AppBar position="static" color="default">
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </AppBar>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={classes.form}>
          {renderStepContent(activeStep)}
          <div className={classes.buttons}>
            <div className={classes.wrapper}>
              {activeStep !== 0 && (
                <Button
                  disabled={loading}
                  type="button"
                  onClick={handleBack}
                  className={classes.button}
                  size="small">
                  Voltar
                </Button>
              )}
              {!isLastStep && (
                <Button
                  disabled={loading}
                  type="button"
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}>
                  Avançar
                </Button>
              )}

              {isLastStep && (
                <Button
                  disabled={loading}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="primary" />
                    ) : (
                        <Save />
                      )
                  }>
                  Salvar
                </Button>
              )}
              <Button
                disabled={loading}
                type="button"
                onClick={closeWindow}
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}>
                Sair
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default memo(FormCadContribuinte);
