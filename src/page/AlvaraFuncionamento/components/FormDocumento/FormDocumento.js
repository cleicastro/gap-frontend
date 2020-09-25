import React, { useContext } from 'react';
import { Typography, Grid, TextField, InputAdornment } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import { ButtonStep } from '../../../../components';
import { useStepAlvara } from '../../../../hooks';

import { documentSchema, mascaraReal } from '../../../../util';
import {
  AlvaraFuncionamentoContext,
  ACTIONS_ALVARA
} from '../../../../contexts';
import { useDocument } from '../../../../hooks/dam/useDocument';

function FormDocumento() {
  const {
    state: { document, receitaSeleted, isEdit },
    dispatch
  } = useContext(AlvaraFuncionamentoContext);
  const [stepActivity, setStepActivity] = useStepAlvara();
  const setDocument = useDocument();

  const documentInitial = {
    emissao: isEdit ? document.emissao : new Date().toISOString(),
    receita: receitaSeleted.cod,
    docOrigem: '',
    infoAdicionais: isEdit ? document.infoAdicionais : '',
    juros: 0,
    valorMulta: 0,
    taxaExp: 5,
    valorPrincipal: isEdit ? document.valorPrincipal : 0
  };

  const loadDocument = setDocument({
    ...document,
    ...documentInitial,
    emissao: isEdit ? document.emissao : documentInitial.emissao
  });

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    errors
  } = useForm({
    defaultValues: loadDocument,
    resolver: yupResolver(documentSchema)
  });

  const calcTotal = (event) => {
    const { name, value } = event.target;
    const values = mascaraReal(value);
    setValue(name, values);
    const result =
      Number(getValues('valorPrincipal')) +
      Number(getValues('juros')) +
      Number(getValues('taxaExp'));
    setValue('valorTotal', result.toFixed(2));
  };

  const handlePrevStep = () => {
    const requestDocument = setDocument({
      ...loadDocument,
      ...getValues(),
      emissao: loadDocument.emissao
    });
    dispatch({ type: ACTIONS_ALVARA.DOCUMENT, payload: requestDocument });
    setStepActivity(stepActivity - 1);
  };

  const onSubmit = (data) => {
    const requestDocument = setDocument({
      ...loadDocument,
      ...data,
      emissao: loadDocument.emissao
    });
    dispatch({ type: ACTIONS_ALVARA.DOCUMENT, payload: requestDocument });
    setStepActivity(stepActivity + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Typography variant="h6" gutterBottom>
        * Obrigatórios
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            inputRef={register}
            control={control}
            id="referencia"
            name="referencia"
            type="month"
            error={!!errors.referencia}
            label="Referência"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            defaultValue={document.emissao}
            inputRef={register}
            control={control}
            id="emissao"
            name="emissao"
            label="Data de emissão"
            fullWidth
            type="datetime-local"
            disabled
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            inputRef={register}
            control={control}
            id="vencimento"
            name="vencimento"
            type="date"
            error={!!errors.vencimento}
            label="Data de vencimento"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            autoFocus
            inputRef={register}
            control={control}
            multiline
            label="Descrição"
            name="infoAdicionais"
            fullWidth
            // error={!!errors.infoAdicionais}
            helperText={errors.infoAdicionais && errors.infoAdicionais.message}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            InputProps={{
              readOnly: true
            }}
            inputRef={register}
            control={control}
            id="receita"
            name="receita"
            label="Receita"
            fullWidth
            error={!!errors.receita}
            helperText={errors.receita && errors.receita.message}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            control={control}
            id="docOrigem"
            name="docOrigem"
            label="Documento de origem"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            disabled={document.cod === '1113050101'}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            control={control}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              )
            }}
            type="number"
            id="valorPrincipal"
            name="valorPrincipal"
            error={!!errors.valorPrincipal}
            label="Valor principal"
            fullWidth
            onChange={calcTotal}
            disabled={document.cod === '1113050101'}
            helperText={errors.valorPrincipal && errors.valorPrincipal.message}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            control={control}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              )
            }}
            id="juros"
            name="juros"
            type="number"
            step={0.5}
            label="Juros"
            error={!!errors.juros}
            fullWidth
            onChange={calcTotal}
            disabled={document.cod === '1113050101'}
            helperText={errors.juros && errors.juros.message}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            control={control}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              )
            }}
            id="taxaExp"
            name="taxaExp"
            type="number"
            step={0.5}
            label="Taxa de expedição"
            error={!!errors.taxaExp}
            fullWidth
            onChange={calcTotal}
            disabled={document.receita === '1113050101'}
            helperText={errors.taxaExp && errors.taxaExp.message}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            control={control}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
              readOnly: true
            }}
            name="valorTotal"
            type="number"
            step={0.5}
            label="Valor total"
            error={!!errors.valorTotal}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            helperText={errors.valorTotal && errors.valorTotal.message}
          />
        </Grid>
      </Grid>
      <ButtonStep handlePrevStep={handlePrevStep} />
    </form>
  );
}

export default FormDocumento;
