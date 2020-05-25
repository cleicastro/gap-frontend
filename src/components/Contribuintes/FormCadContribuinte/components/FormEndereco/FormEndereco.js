import React from 'react';
import { Grid, TextField } from '@material-ui/core';

// import { Container } from './styles';

function FormEndereco(props) {
  const { handleChangeContribuinte, contribuinte, isDisbledForm } = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="CEP"
          name="cep"
          required
          onChange={handleChangeContribuinte}
          value={contribuinte.cep}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="UF"
          name="uf"
          required
          onChange={handleChangeContribuinte}
          value={contribuinte.uf}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Cidade"
          name="cidade"
          required
          onChange={handleChangeContribuinte}
          value={contribuinte.cidade}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Endereço"
          name="endereco"
          required
          onChange={handleChangeContribuinte}
          value={contribuinte.endereco}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Bairro"
          name="bairro"
          required
          onChange={handleChangeContribuinte}
          value={contribuinte.bairro}
        />
      </Grid>
      <Grid item xs={4} sm={2}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Número"
          name="numero"
          onChange={handleChangeContribuinte}
          value={contribuinte.numero}
        />
      </Grid>
      <Grid item xs={8} sm={4}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Complemento"
          name="complemento"
          onChange={handleChangeContribuinte}
          value={contribuinte.complemento}
        />
      </Grid>
    </Grid>
  );
}

export default FormEndereco;
