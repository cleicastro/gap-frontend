import React from 'react';
import { Typography, Grid, TextField, InputAdornment } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { ButtonStep } from '../../../../components';
import { useInitialDocument, useStepDam } from '../../../../hooks';

import { documentSchema, mascaraReal } from '../../../../util';

function FormDocumento() {
  const [document, setDocument] = useInitialDocument();
  const [stepActivity, setStepActivity] = useStepDam();

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    errors
  } = useForm({
    defaultValues: document,
    validationSchema: documentSchema
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

  const handlePrevStep = () => setStepActivity(stepActivity - 1);

  const onSubmit = (data) => {
    setDocument(data);
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
            inputRef={register}
            control={control}
            id="emissaoConvertPT"
            name="emissaoConvertPT"
            disabled
            error={!!errors.emissaoConvertPT}
            label="Data de emissão"
            fullWidth
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
            helperText={errors.infoAdicionais && errors.infoAdicionais.message}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            control={control}
            id="receita"
            name="receita"
            disabled
            error={!!errors.receita}
            label="Receita"
            fullWidth
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
              )
            }}
            name="valorTotal"
            type="number"
            step={0.5}
            disabled
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
