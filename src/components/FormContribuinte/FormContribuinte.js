import React from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';

function FormContribuinte() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Preecha o CPF ou CNPJ para buscar o contribuinte.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField required id="doc" name="doc" label="CPF/CNPJ" fullWidth />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="nome"
            name="nome"
            label="Nome"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="endereco"
            name="endereco"
            label="Endereço"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cidade"
            name="cidade"
            label="Cidade"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField id="uf" name="uf" label="UF" fullWidth disabled />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="cep"
            name="cep"
            label="CEP"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="bairro"
            name="bairro"
            label="Bairro/Comunidade"
            fullWidth
            disabled
          />
        </Grid>
      </Grid>
    </>
  );
}

export default FormContribuinte;
