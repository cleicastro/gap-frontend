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
    state: { document, receitaSeleted, isEdit },
    dispatch
  } = useContext(DamContext);
  const setDocument = useDocument();

  let infoAdAuto = null;

  switch (receitaSeleted.cod) {
    case '1121290000':
      infoAdAuto = 'REFERENTE AO ALVARÁ DE CONSTRUÇÃO';
      break;
    case '1121250200':
      infoAdAuto = `REFERENTE AO ALVARÁ DE TRÁFEGO DO ANO DE ${new Date().getFullYear()}`;
      break;
    case '1121250100':
      infoAdAuto = `REFERENTE AO ALVARÁ DE TRÁFEGO DO ANO DE ${new Date().getFullYear()}`;
      break;
    case '1121250300':
      infoAdAuto = `REFERENTE AO ALVARÁ DE TRÁFEGO DE ÔNIBUS DO ANO DE ${new Date().getFullYear()}`;
      break;
    case '1121250000':
      infoAdAuto = `REFERENTE AO ALVARÁ DE FUNCIONAMENTO DE ${new Date().getFullYear()}`;
      break;
    case '1112043102':
      infoAdAuto = `REFERENTE AO RECOLHIMENTO DO IRRF `;
      break;
    case '1112080000':
      infoAdAuto = `REFERENTE AO RECOLHIMENTO DE ITBI`;
      break;
    case '1122290000':
      infoAdAuto = `REFERENTE A CERTIDÃO NEGATIVA DE DÉBITO`;
      break;
    case '1122900000':
      infoAdAuto = `REFERENTE A AUTORIZAÇÃO DE EMISSÃO DE BLOCO DE NOTAS`;
      break;
    case '1121300000':
      infoAdAuto = `REFERENTE A AUTORIZAÇÃO DE PLAQUEAMENTO`;
      break;
    case '1122280000':
      infoAdAuto = `REFERENTE A CERTIDÃO DE SEPULTURA`;
      break;
    case '1113050102':
      infoAdAuto = `REFERENTE AO RECOLHIMETO DE ISS DO MÊS DE `;
      break;
    default:
      infoAdAuto = '';
      break;
  }

  const documentInitial = {
    emissao: isEdit ? document.emissao : new Date().toISOString(),
    receita: receitaSeleted.cod,
    docOrigem: '',
    infoAdicionais: infoAdAuto,
    juros: 0,
    valorMulta: 0,
    taxaExp: Number(receitaSeleted.valor_fixo) > 0 ? 0 : 5,
    valorPrincipal:
      Number(receitaSeleted.valor_fixo) > 0
        ? Number(receitaSeleted.valor_fixo)
        : document.valorPrincipal || 0
  };

  const documentAux =
    document.valorTotal > 5 && !documentInitial.valorPrincipal > 0
      ? document
      : documentInitial;
  const loadDocument = setDocument({
    ...documentAux,
    emissao: isEdit ? document.emissao : documentInitial.emissao
  });
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
    const requestDocument = setDocument({
      ...loadDocument,
      ...getValues(),
      emissao: loadDocument.emissao
    });
    dispatch({ type: ACTIONS.DOCUMENT, payload: requestDocument });
    setStepActivity(stepActivity - 1);
  };

  const onSubmit = (data) => {
    const requestDocument = setDocument({
      ...loadDocument,
      ...data,
      emissao: loadDocument.emissao
    });
    dispatch({ type: ACTIONS.DOCUMENT, payload: requestDocument });
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
