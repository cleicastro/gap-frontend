import React from 'react';
import {
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
// import { Container } from './styles';

function FormInformacoesPessoais(props) {
  const {
    handleChangeContribuinte,
    contribuinte,
    isDisbledForm,
    formik
  } = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <RadioGroup
          row
          aria-label="position"
          name="tipo"
          onChange={handleChangeContribuinte}
          value={formik.values.tipo}>
          <FormControlLabel
            disabled={isDisbledForm}
            value="PF"
            control={<Radio />}
            label="CPF"
          />
          <FormControlLabel
            disabled={isDisbledForm}
            value="PJ"
            control={<Radio />}
            label="CNPJ"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="CPF/CNPJ"
          name="doc"
          required
          // onChange={handleChangeContribuinte}
          values={formik.values.doc}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Nome"
          name="nome"
          required
          // onChange={handleChangeContribuinte}
          values={formik.values.nome}
        />
      </Grid>
      {/* <Grid item xs={12} sm={3}>
              <TextField
                disabled={isEnabledForm}
                fullWidth
                label="Inscrição Municipal"
                name="im"
                onChange={handleChangeContribuinte}
                value={contribuinte.im}
              />
            </Grid> */}
      <Grid item xs={12} sm={3}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="RG"
          name="docEstadual"
          onChange={handleChangeContribuinte}
          values={contribuinte.docEstadual}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Data de emissão"
          name="docEmissao"
          onChange={handleChangeContribuinte}
          values={contribuinte.docEmissao}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Orgão emissor"
          name="docOrgao"
          onChange={handleChangeContribuinte}
          values={contribuinte.docOrgao}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Telefone"
          name="telefone"
          onChange={handleChangeContribuinte}
          values={contribuinte.telefone}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="email"
          name="email"
          type="email"
          onChange={handleChangeContribuinte}
          values={contribuinte.email}
        />
      </Grid>
    </Grid>
  );
}

export default FormInformacoesPessoais;
