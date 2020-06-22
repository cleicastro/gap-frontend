import React, { useContext, useEffect, useState } from 'react';

import { Grid, TextField } from '@material-ui/core';
import { ContribuinteContext } from '../../../../contexts';

function FormEndereco() {
  const {
    contribuinte,
    isDisbledForm,
    control,
    register,
    searchCEP,
    enderecoResponse,
    empresaResponse
  } = useContext(ContribuinteContext);
  const [data, setData] = useState(contribuinte);

  useEffect(() => {
    setData(contribuinte);
  }, [contribuinte]);

  useEffect(() => {
    if (enderecoResponse && !enderecoResponse.erro) {
      const {
        bairro,
        complemento,
        uf,
        localidade,
        logradouro
      } = enderecoResponse;

      setData((prev) => ({
        ...prev,
        uf,
        cidade: localidade,
        bairro: bairro !== '' ? bairro : prev.bairro,
        complemento: complemento !== '' ? complemento : prev.complemento,
        endereco: logradouro !== '' ? logradouro : prev.endereco
      }));
    }
  }, [enderecoResponse]);

  useEffect(() => {
    if (empresaResponse) {
      const {
        city,
        zip,
        state,
        street,
        neighborhood: district,
        number: numberAddress,
        details: additionalInformation
      } = empresaResponse.address;

      setData((prev) => ({
        ...prev,
        cep: zip || '',
        cidade: city || '',
        endereco: street || '',
        uf: state || '',
        complemento: additionalInformation || '',
        numero: numberAddress || '',
        bairro: district || ''
      }));
    }
  }, [empresaResponse]);

  function onChangeHandler(e) {
    const { name, value } = e.target;

    if (name === 'cep' && value.length === 8) {
      searchCEP(value);
    }

    setData((prev) => ({ ...prev, [name]: value }));
  }
  /* 
    function onBlurCEP(e) {
      const { value } = e.target;
      if (value.length === 8) {
        searchCEP(value);
      }
    }
   */
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="CEP"
          name="cep"
          required
          control={control}
          inputRef={register}
          onChange={onChangeHandler}
          // onBlur={onBlurCEP}
          value={data.cep}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="UF"
          name="uf"
          required
          control={control}
          inputRef={register}
          onChange={onChangeHandler}
          value={data.uf}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Cidade"
          name="cidade"
          required
          inputRef={register}
          value={data.cidade}
          control={control}
          onChange={onChangeHandler}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Endereço"
          name="endereco"
          required
          inputRef={register}
          value={data.endereco}
          control={control}
          onChange={onChangeHandler}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Bairro/Comunidade"
          name="bairro"
          required
          inputRef={register}
          value={data.bairro}
          control={control}
          onChange={onChangeHandler}
        />
      </Grid>
      <Grid item xs={4} sm={2}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Número"
          name="numero"
          inputRef={register}
          value={data.numero}
          control={control}
          onChange={onChangeHandler}
        />
      </Grid>
      <Grid item xs={8} sm={4}>
        <TextField
          disabled={isDisbledForm}
          fullWidth
          label="Complemento"
          name="complemento"
          inputRef={register}
          value={data.complemento}
          control={control}
          onChange={onChangeHandler}
        />
      </Grid>
    </Grid>
  );
}

export default FormEndereco;
