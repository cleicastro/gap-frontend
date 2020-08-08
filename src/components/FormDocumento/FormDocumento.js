import React from 'react';
import { Typography, Grid, TextField, InputAdornment } from '@material-ui/core';

import { useForm } from 'react-hook-form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleDocument } from '../../store/formReducer';
import ButtonStep from '../ButtonStep';

function FormDocumento({
  valueFormDataDocumento,
  handleDocument: setDocument,
  steps,
  activeStep,
  setActiveStep
}) {
  const { control, register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: valueFormDataDocumento
  });

  const calcTotal = () => {
    const result =
      Number(getValues('valorPrincipal')) +
      Number(getValues('juros')) +
      Number(getValues('taxaExp'));
    setValue('valorTotal', result);
  };

  function handleNext() {
    setActiveStep(activeStep + 1);
    setDocument(getValues());
  }

  function handleBack() {
    setActiveStep(activeStep - 1);
    setDocument(getValues());
  }

  document.addEventListener('keydown', (event) => {
    // nextPage
    if (event.ctrlKey && event.keyCode === 39) {
      setDocument(getValues());
      setActiveStep(activeStep + 1);
    }
    // prevPage
    if (event.ctrlKey && event.keyCode === 37) {
      setDocument(getValues());
      setActiveStep(activeStep - 1);
    }
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            required
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
            disabled
            required
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
            required
            label="Data de vencimento"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            inputRef={register}
            control={control}
            multiline
            label="Descrição"
            name="infoAdicionais"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            control={control}
            id="receita"
            name="receita"
            disabled
            required
            label="Receita"
            fullWidth
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
              shrink: valueFormDataDocumento.receita === '1113050101'
            }}
            disabled={valueFormDataDocumento.receita === '1113050101'}
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
            id="valorPrincipal"
            name="valorPrincipal"
            type="number"
            required
            label="Valor principal"
            fullWidth
            onChange={calcTotal}
            disabled={valueFormDataDocumento.receita === '1113050101'}
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
            label="Juros"
            required
            fullWidth
            onChange={calcTotal}
            disabled={valueFormDataDocumento.receita === '1113050101'}
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
            label="Taxa de expedição"
            required
            fullWidth
            onChange={calcTotal}
            disabled={valueFormDataDocumento.receita === '1113050101'}
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
            disabled
            label="Valor total"
            required
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Grid>
      <ButtonStep
        steps={steps}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </form>
  );
}

const mapStateToProps = (state) => ({
  valueFormDataDocumento: state.form.documento
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormDocumento);
