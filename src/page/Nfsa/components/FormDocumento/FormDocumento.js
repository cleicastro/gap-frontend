import React, { useContext } from 'react';
import { Typography, Grid, TextField, InputAdornment } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import { ButtonStep } from '../../../../components';

import { documentSchema, mascaraReal } from '../../../../util';
import { NfsaContext, ACTIONS_NFSA } from '../../../../contexts';
import { useDocument } from '../../../../hooks/dam/useDocument';
// eslint-disable-next-line import/named
import { useStepNfsa } from '../../../../hooks';

function FormDocumento() {
  const {
    state: { document, receitaSeleted, dataNfsa, isEdit },
    dispatch
  } = useContext(NfsaContext);

  const {
    valorISS,
    irValor,
    pisValor,
    inssValor,
    confinsValor,
    csllValor
  } = dataNfsa;

  const valorPrincipal =
    Number(valorISS) +
    Number(irValor) +
    Number(pisValor) +
    Number(inssValor) +
    Number(confinsValor) +
    Number(csllValor);

  const [stepActivity, setStepActivity] = useStepNfsa();
  const setDocument = useDocument();

  const documentInitial = {
    emissao: isEdit ? document.emissao : new Date().toISOString(),
    receita: receitaSeleted.cod,
    docOrigem: '',
    infoAdicionais: '',
    juros: 0,
    valorMulta: 0,
    taxaExp: 5,
    valorPrincipal
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
    dispatch({ type: ACTIONS_NFSA.DOCUMENT, payload: requestDocument });
    setStepActivity(stepActivity - 1);
  };

  const onSubmit = (data) => {
    const requestDocument = setDocument({
      ...loadDocument,
      ...data,
      emissao: loadDocument.emissao
    });
    dispatch({ type: ACTIONS_NFSA.DOCUMENT, payload: requestDocument });
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
            label="Informações adicionais"
            name="infoAdicionais"
            fullWidth
            // error={!!errors.infoAdicionais}
            helperText={errors.infoAdicionais && errors.infoAdicionais.message}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            control={control}
            id="receita"
            name="receita"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              readOnly: true
            }}
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
            InputProps={{
              readOnly: true
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
              readOnly: true
            }}
            type="number"
            id="valorPrincipal"
            name="valorPrincipal"
            error={!!errors.valorPrincipal}
            label="Valor principal"
            fullWidth
            onChange={calcTotal}
            InputLabelProps={{
              shrink: true
            }}
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
              readOnly: true
            }}
            id="juros"
            name="juros"
            type="number"
            step={0.5}
            label="Juros"
            error={!!errors.juros}
            fullWidth
            onChange={calcTotal}
            InputLabelProps={{
              shrink: true
            }}
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
              readOnly: true
            }}
            id="taxaExp"
            name="taxaExp"
            type="number"
            step={0.5}
            label="Taxa de expedição"
            error={!!errors.taxaExp}
            fullWidth
            onChange={calcTotal}
            InputLabelProps={{
              shrink: true
            }}
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
