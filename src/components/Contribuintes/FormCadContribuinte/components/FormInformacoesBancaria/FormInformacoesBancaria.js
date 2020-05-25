import React from 'react';
import {
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

// import { Container } from './styles';

function FormInformacoesBancaria(props) {
  const { handleChangeContribuinte, contribuinte, isDisbledForm } = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        <RadioGroup
          row
          onChange={handleChangeContribuinte}
          aria-label="position"
          name="tipoConta"
          value={contribuinte.tipoConta}>
          <FormControlLabel
            disabled={isDisbledForm}
            value=""
            control={<Radio />}
            label="Sem Conta"
          />
          <FormControlLabel
            disabled={isDisbledForm}
            value="CC"
            control={<Radio />}
            label="Conta Corrente"
          />
          <FormControlLabel
            disabled={isDisbledForm}
            value="CP"
            control={<Radio />}
            label="Conta Poupança"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Banco"
          name="banco"
          onChange={handleChangeContribuinte}
          value={contribuinte.banco}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Agência"
          name="agencia"
          onChange={handleChangeContribuinte}
          value={contribuinte.agencia}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Conta"
          name="conta"
          onChange={handleChangeContribuinte}
          value={contribuinte.conta}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Variação"
          name="variacao"
          onChange={handleChangeContribuinte}
          value={contribuinte.variacao}
        />
      </Grid>
    </Grid>
  );
}

export default FormInformacoesBancaria;
