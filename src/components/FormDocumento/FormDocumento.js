import React, { useContext } from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { NewDocumentArrecadacaoContext } from '../../contexts/NewDocumentArrecadacao';

function FormDocumento() {
  const { dataInitDocument, valuesDam, handleDAM } = useContext(
    NewDocumentArrecadacaoContext
  );
  const { register, setValue, getValues } = useForm({
    defaultValues: valuesDam.documento ? valuesDam.documento : dataInitDocument
  });

  function handleChange(data) {
    const { name, value } = data.target;
    handleDAM({
      documento: {
        ...dataInitDocument,
        ...valuesDam.documento,
        [name]: value
      }
    });
  }

  function handleCalcTotal() {
    const valorPrincipal = getValues('valorPrincipal');
    const juros = getValues('juros');
    const taxaExp = getValues('taxaExp');

    const result = Number(valorPrincipal) + Number(juros) + Number(taxaExp);
    setValue([{ valorTotal: result }]);
    handleDAM({
      documento: {
        ...dataInitDocument,
        ...valuesDam.documento,
        valorPrincipal,
        juros,
        taxaExp,
        valorTotal: result
      }
    });
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        * Obrigatórios
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            onChange={handleChange}
            inputRef={register}
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
            onChange={handleChange}
            inputRef={register}
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
            onChange={handleChange}
            inputRef={register}
            id="vencimento"
            name="vencimento"
            type="date"
            required
            label="Data de vencimento"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            onChange={handleChange}
            inputRef={register}
            multiline
            label="Descrição"
            name="infoAdicionais"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            onChange={handleChange}
            inputRef={register}
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
            onChange={handleChange}
            inputRef={register}
            id="docOrigem"
            name="docOrigem"
            label="Documento de origem"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            id="valorPrincipal"
            name="valorPrincipal"
            type="number"
            required
            label="Valor principal"
            fullWidth
            onChange={handleCalcTotal}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            id="juros"
            name="juros"
            type="number"
            label="Juros"
            required
            fullWidth
            onChange={handleCalcTotal}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            id="taxaExp"
            name="taxaExp"
            type="number"
            label="Taxa de expedição"
            required
            fullWidth
            onChange={handleCalcTotal}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            inputRef={register}
            name="valorTotal"
            type="number"
            disabled
            label="Valor total"
            required
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}

export default FormDocumento;
