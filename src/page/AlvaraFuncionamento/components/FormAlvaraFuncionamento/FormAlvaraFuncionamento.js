import React, { useContext } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { ButtonStep } from '../../../../components';
import { useStepAlvara } from '../../../../hooks';

import { alvaraFuncionamento } from '../../../../util';

import {
  AlvaraFuncionamentoContext,
  ACTIONS_ALVARA
} from '../../../../contexts';

function FormAlvaraFuncionamento() {
  const {
    state: { taxpayerSeleted },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);
  const {
    cadAlvara: {
      atividade_principal: atividadePrincipal,
      atividade_secundaria_I: atividadeSecundariaI,
      atividade_secundaria_II: atividadeSecundariaII,
      inscricao_municipal: inscricaoMunicipal
    }
  } = taxpayerSeleted;

  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: {
      ...taxpayerSeleted,
      atividadePrincipal,
      atividadeSecundariaI,
      atividadeSecundariaII,
      inscricaoMunicipal
    },
    validationSchema: alvaraFuncionamento
  });

  const [stepActivity, setStepActivity] = useStepAlvara();
  const handlePrevStep = () => setStepActivity(stepActivity - 1);

  const handleSetAlvara = (values) => {
    dispatch({
      type: ACTIONS_ALVARA.SELECT_ALVARA_FUNCIONAMENTO,
      payload: values
    });
    setStepActivity(stepActivity + 1);
  };

  return (
    <form onSubmit={handleSubmit(handleSetAlvara)}>
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
