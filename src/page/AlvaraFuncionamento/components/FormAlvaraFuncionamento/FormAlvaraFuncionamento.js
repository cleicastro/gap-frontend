/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Grid, TextField, Link, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import { Alert } from '@material-ui/lab';
import { ButtonStep } from '../../../../components';
import { useStepAlvara } from '../../../../hooks';

import { alvaraFuncionamentoSchema } from '../../../../util';

import {
  AlvaraFuncionamentoContext,
  ACTIONS_ALVARA
} from '../../../../contexts';

function FormAlvaraFuncionamento() {
  const {
    state: { taxpayerSeleted, dataAlvaraFuncionamento },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);

  const { cadAlvara } = taxpayerSeleted;
  const cadastroAlvara = {
    atividadePrincipal: cadAlvara && cadAlvara.atividade_principal,
    atividadeSecundariaI: cadAlvara && cadAlvara.atividade_secundaria_I,
    atividadeSecundariaII: cadAlvara && cadAlvara.atividade_secundaria_II,
    inscricaoMunicipal:
      cadAlvara &&
      `${cadAlvara.inscricao_municipal}.${new Date().getFullYear()}`
  };

  const { register, handleSubmit, control, errors, getValues } = useForm({
    resolver: yupResolver(alvaraFuncionamentoSchema),
    defaultValues: {
      ...cadastroAlvara,
      ...taxpayerSeleted,
      ...dataAlvaraFuncionamento,
      nomeFantasia: taxpayerSeleted.nomeFantasia
        ? taxpayerSeleted.nomeFantasia
        : taxpayerSeleted.nome
    }
  });

  const [stepActivity, setStepActivity] = useStepAlvara();
  const handlePrevStep = () => {
    dispatch({
      type: ACTIONS_ALVARA.SELECT_ALVARA_FUNCIONAMENTO,
      payload: { ...dataAlvaraFuncionamento, ...getValues() }
    });
    setStepActivity(stepActivity - 1);
  };

  const handleSetAlvara = (values) => {
    dispatch({
      type: ACTIONS_ALVARA.SELECT_ALVARA_FUNCIONAMENTO,
      payload: { ...dataAlvaraFuncionamento, ...values }
    });
    setStepActivity(stepActivity + 1);
  };

  const handleOpenEditTaxpayerSeleted = () => {
    dispatch({
      type: ACTIONS_ALVARA.MODAL_CONTRIBUINTES,
      payload: taxpayerSeleted
    });
  };

  return (
    <form onSubmit={handleSubmit(handleSetAlvara)}>
      {!!taxpayerSeleted.cadAlvara ||
        (!dataAlvaraFuncionamento.inscricaoMunicipal && (
          <Alert severity="warning">
            <Typography>
              Este contribuinte não possui cadastro de emissão de alvará,{' '}
              <Link
                component="button"
                variant="body2"
                onClick={handleOpenEditTaxpayerSeleted}>
                clique aqui para atualizar.
              </Link>
            </Typography>
          </Alert>
        ))}
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <TextField
            fullWidth
            label="Inscrição Municipal"
            name="inscricaoMunicipal"
            control={control}
            inputRef={register}
            error={!!errors.inscricaoMunicipal}
            helperText={
              errors.inscricaoMunicipal && errors.inscricaoMunicipal.message
            }
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>
        <Grid item sm={8} xs={12}>
          <TextField
            fullWidth
            label="Nome Fantasia"
            name="nomeFantasia"
            control={control}
            inputRef={register}
            error={!!errors.nomeFantasia}
            helperText={errors.nomeFantasia && errors.nomeFantasia.message}
          />
        </Grid>

        <Grid item sm={12}>
          <TextField
            fullWidth
            label="Atividade Principal"
            name="atividadePrincipal"
            control={control}
            inputRef={register}
            error={!!errors.atividadePrincipal}
            helperText={
              errors.atividadePrincipal && errors.atividadePrincipal.message
            }
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label="Atividade Secundária I"
            name="atividadeSecundariaI"
            control={control}
            inputRef={register}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label="Atividade  Secundária II"
            name="atividadeSecundariaII"
            control={control}
            inputRef={register}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            label="CEP"
            name="cep"
            control={control}
            inputRef={register}
            error={!!errors.cep}
            helperText={errors.cep && errors.cep.message}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            label="UF"
            name="uf"
            control={control}
            inputRef={register}
            error={!!errors.uf}
            helperText={errors.uf && errors.uf.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Cidade"
            name="cidade"
            inputRef={register}
            control={control}
            error={!!errors.cidade}
            helperText={errors.cidade && errors.cidade.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Endereço"
            name="endereco"
            inputRef={register}
            control={control}
            error={!!errors.endereco}
            helperText={errors.endereco && errors.endereco.message}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Bairro/Comunidade"
            name="bairro"
            inputRef={register}
            control={control}
            error={!!errors.bairro}
            helperText={errors.bairro && errors.bairro.message}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            fullWidth
            label="Número"
            name="numero"
            inputRef={register}
            control={control}
            error={!!errors.numero}
            helperText={errors.numero && errors.numero.message}
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            fullWidth
            label="Complemento"
            name="complemento"
            inputRef={register}
            control={control}
          />
        </Grid>
      </Grid>
      <ButtonStep handlePrevStep={handlePrevStep} />
    </form>
  );
}

export default FormAlvaraFuncionamento;
