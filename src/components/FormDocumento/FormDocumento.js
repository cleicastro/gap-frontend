import React from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';

function FormDocumento() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField required id="referencia" label="Referência" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="dataCalculo"
            label="Data de emissão"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="dataVencimento"
            label="Data de vencimento"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            id="info_adicionais"
            label="Descrição"
            helperText="Informações adicionais"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField disabled id="receita" label="Receita" fullWidth />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField id="referencia" label="Documento de origem" />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            required
            id="valor_princapl"
            label="Valor principal"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField id="valor_juros" label="Valor dos juros" fullWidth />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField id="taxa_expedicao" label="Taxa de expedição" fullWidth />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField required id="valor_total" label="Valor total" fullWidth />
        </Grid>
      </Grid>
    </>
  );
}

export default FormDocumento;
