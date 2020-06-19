import React, { useContext, useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

import { ContribuinteContext } from '../../../../contexts';

function FormInfoPessoais() {
  const {
    contribuinte,
    isDisbledForm,
    control,
    register,
    searchCNPJ,
    empresaResponse
  } = useContext(ContribuinteContext);
  const [data, setData] = useState(contribuinte);

  useEffect(() => {
    setData(contribuinte);
  }, [contribuinte]);

  useEffect(() => {
    if (empresaResponse) {
      const { name, email } = empresaResponse;
      const { ddd, number } = empresaResponse.phones[0];
      const {
        city,
        state,
        street,
        streetSuffix,
        district,
        number: numberAddress,
        additionalInformation
      } = empresaResponse.address;

      setData((prev) => ({
        ...prev,
        nome: name,
        email,
        telefone: `(${ddd}) ${number}`,
        cep: city.code,
        cidade: city.name,
        endereco: `${streetSuffix} ${street}`,
        uf: state,
        complemento: additionalInformation,
        numero: numberAddress,
        bairro: district
      }));
    }
  }, [empresaResponse]);

  function onChangeHandler(e) {
    const { name, value } = e.target;
    if (name === 'doc' && value.length === 14) {
      searchCNPJ(value);
    }
    setData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <RadioGroup
          row
          aria-label="position"
          name="tipo"
          onChange={onChangeHandler}
          valaue={data.tipo}
          control={control}>
          <FormControlLabel
            disabled={isDisbledForm}
            value="PF"
            control={<Radio />}
            checked={data.tipo === 'PF'}
            inputRef={register}
            label="CPF"
          />
          <FormControlLabel
            disabled={isDisbledForm}
            value="PJ"
            control={<Radio />}
            inputRef={register}
            checked={data.tipo === 'PJ'}
            label="CNPJ"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          inputRef={register}
          control={control}
          value={data.doc}
          onChange={onChangeHandler}
          disabled={isDisbledForm}
          fullWidth
          label={data.tipo === 'PF' ? 'CPF' : 'CNPJ'}
          name="doc"
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          inputRef={register}
          control={control}
          value={data.nome}
          onChange={onChangeHandler}
          disabled={isDisbledForm}
          fullWidth
          name="nome"
          type="text"
          label="Nome"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          inputRef={register}
          control={control}
          value={data.docEstadual}
          onChange={onChangeHandler}
          disabled={isDisbledForm}
          fullWidth
          label={contribuinte.tipo === 'PF' ? 'RG' : 'Inscrição Estadual'}
          name="docEstadual"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          inputRef={register}
          control={control}
          value={data.docEmissao ? data.docEmissao : ''}
          onChange={onChangeHandler}
          disabled={isDisbledForm}
          fullWidth
          label="Data de emissão"
          name="docEmissao"
          type="date"
          InputLabelProps={{
            shrink: true
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          inputRef={register}
          control={control}
          value={data.docOrgao}
          onChange={onChangeHandler}
          disabled={isDisbledForm}
          fullWidth
          label="Orgão emissor"
          name="docOrgao"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          inputRef={register}
          control={control}
          value={data.telefone}
          onChange={onChangeHandler}
          disabled={isDisbledForm}
          fullWidth
          label="Telefone"
          name="telefone"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          inputRef={register}
          control={control}
          value={data.email}
          onChange={onChangeHandler}
          disabled={isDisbledForm}
          fullWidth
          label="email"
          name="email"
          type="email"
        />
      </Grid>
    </Grid>
  );
}

export default FormInfoPessoais;
