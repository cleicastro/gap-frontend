import React, { useContext } from 'react';
import { Typography, Grid, TextField, InputAdornment } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import { ButtonStep } from '../../../../components';
import { useStepDam } from '../../../../hooks';

import { documentSchema, mascaraReal } from '../../../../util';
import { DamContext, ACTIONS } from '../../../../contexts';
import { useDocument } from '../../../../hooks/dam/useDocument';

function FormDocumento() {
  const {
    state: { document, receitaSeleted },
    dispatch
  } = useContext(DamContext);
  const setDocument = useDocument();

  const documentInitial = {
    emissao: new Date(),
    receita: receitaSeleted.cod,
    docOrigem: '',
    infoAdicionais: '',
    juros: 0,
    valorMulta: 0,
    taxaExp: Number(receitaSeleted.valor_fixo) > 0 ? 0 : 5,
    valorPrincipal:
      Number(receitaSeleted.valor_fixo) > 0
        ? Number(receitaSeleted.valor_fixo)
        : document.valorPrincipal || 0
  };

  const loadDocument = setDocument({ ...document, ...documentInitial });
  const [stepActivity, setStepActivity] = useStepDam();

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
    setStepActivity(stepActivity - 1);
    const requestDocument = setDocument({ ...loadDocument, ...getValues() });
    dispatch({ type: ACTIONS.DOCUMENT, payload: requestDocument });
  };

  const onSubmit = (data) => {
    setStepActivity(stepActivity + 1);
    const requestDocument = setDocument({ ...loadDocument, ...data });
    dispatch({ type: ACTIONS.DOCUMENT, payload: requestDocument });
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
            id="emissao"
            name="emissao"
            error={!!errors.emissao}
            label="Data de emissão"
            fullWidth
            type="datetime-local"
            disableds
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
            helperText={errors.infoAdicionais && errors.infoAdicionais.message}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            control={control}
            id="receita"
            name="receita"
            error={!!errors.receita}
            label="Receita"
            fullWidth
            helperText={errors.receita && errors.receita.message}
            InputProps={{
              readOnly: true
            }}
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
            InputProps={{
              readOnly: document.cod === '1113050101'
            }}
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
              readOnly: document.cod === '1113050101'
            }}
            type="number"
            id="valorPrincipal"
            name="valorPrincipal"
            error={!!errors.valorPrincipal}
            label="Valor principal"
            fullWidth
            onChange={calcTotal}
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
              ),
              readOnly: document.cod === '1113050101'
            }}
            id="juros"
            name="juros"
            type="number"
            step={0.5}
            label="Juros"
            error={!!errors.juros}
            fullWidth
            onChange={calcTotal}
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
              ),
              readOnly: document.cod === '1113050101'
            }}
            id="taxaExp"
            name="taxaExp"
            type="number"
            step={0.5}
            label="Taxa de expedição"
            error={!!errors.taxaExp}
            fullWidth
            onChange={calcTotal}
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
