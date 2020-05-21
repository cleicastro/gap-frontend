import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';

function FormDocumento({ handleDocumento, documentoSelected }) {
  const [documento, setDocumento] = useState(documentoSelected);
  let sumValues = documentoSelected.valorTotal;
  let jurosValues = documentoSelected.juros;
  let taxaExptValues = documentoSelected.taxaExp;
  let valorPrincipalValues = documentoSelected.valorPrincipal;

  function sumValorTotal(principal, juros, taxa) {
    const sum = Number(principal) + Number(juros) + Number(taxa);
    return sum.toFixed(2);
  }

  const handleDoc = (event) => {
    if (event.target.id === 'valorPrincipal') {
      valorPrincipalValues = event.target.value;
      sumValues = sumValorTotal(
        valorPrincipalValues,
        jurosValues,
        taxaExptValues
      );
    }
    if (event.target.id === 'taxaExp') {
      taxaExptValues = event.target.value;
      sumValues = sumValorTotal(
        valorPrincipalValues,
        jurosValues,
        taxaExptValues
      );
    }
    if (event.target.id === 'juros') {
      jurosValues = event.target.value;
      sumValues = sumValorTotal(
        valorPrincipalValues,
        jurosValues,
        taxaExptValues
      );
    }

    setDocumento({
      ...documento,
      [event.target.id]: event.target.value,
      valorTotal: sumValues
    });
  };

  useEffect(() => {
    handleDocumento(documento);
  }, [documento, handleDocumento]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        * Obrigatórios
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            defaultValue={documentoSelected.referencia}
            onChange={handleDoc}
            id="referencia"
            type="month"
            required
            label="Referência"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            defaultValue={documentoSelected.emissao}
            onChange={handleDoc}
            id="emissao"
            disabled
            required
            label="Data de emissão"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            defaultValue={documentoSelected.vencimento}
            onChange={handleDoc}
            id="vencimento"
            type="date"
            required
            label="Data de vencimento"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            defaultValue={documentoSelected.infoAdicionais}
            onChange={handleDoc}
            id="infoAdicionais"
            multiline
            label="Descrição"
            helperText="Informações adicionais"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            defaultValue={documentoSelected.receita}
            onChange={handleDoc}
            id="receita"
            disabled
            required
            label="Receita"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            defaultValue={documentoSelected.docOrigem}
            onChange={handleDoc}
            id="docOrigem"
            label="Documento de origem"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            defaultValue={documentoSelected.valorPrincipal}
            onChange={handleDoc}
            id="valorPrincipal"
            type="number"
            required
            label="Valor principal"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            defaultValue={documentoSelected.juros}
            onChange={handleDoc}
            id="juros"
            type="number"
            label="Juros"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            defaultValue={documentoSelected.taxaExp}
            onChange={handleDoc}
            id="taxaExp"
            type="number"
            label="Taxa de expedição"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            value={sumValues}
            id="valorTotal"
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
