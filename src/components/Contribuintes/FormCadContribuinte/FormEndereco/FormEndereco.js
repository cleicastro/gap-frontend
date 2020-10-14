import React from 'react';

import { Grid, TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { mascaraCEP } from '../../../../util';

function FormEndereco() {
  const { control, register, errors, setValue } = useFormContext();

  const handleMaskCep = (event) => {
    const { value } = event.target;
    if (value.length > 0) {
      setValue('cep', mascaraCEP(value));
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
        <TextField
          onChange={handleMaskCep}
          fullWidth
          label="CEP"
          name="cep"
          control={control}
          inputRef={register}
          error={!!errors.cep}
          helperText={errors.cep && errors.cep.message}
          inputProps={{ maxLength: 9 }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          label="UF"
          name="uf"
          control={control}
          inputRef={register}
          error={!!errors.uf}
          helperText={errors.uf && errors.uf.message}
          inputProps={{ maxLength: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Cidade"
          name="cidade"
          inputRef={register}
          control={control}
          error={!!errors.cidade}
          helperText={errors.cidade && errors.cidade.message}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Endereço"
          name="endereco"
          inputRef={register}
          control={control}
          error={!!errors.endereco}
          helperText={errors.endereco && errors.endereco.message}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Bairro/Comunidade"
          name="bairro"
          inputRef={register}
          control={control}
          error={!!errors.bairro}
          helperText={errors.bairro && errors.bairro.message}
        />
      </Grid>
      <Grid item xs={4} sm={2}>
        <TextField
          fullWidth
          label="Número"
          name="numero"
          inputRef={register}
          control={control}
          error={!!errors.numero}
          helperText={errors.numero && errors.numero.message}
        />
      </Grid>
      <Grid item xs={8} sm={4}>
        <TextField
          fullWidth
          label="Complemento"
          name="complemento"
          inputRef={register}
          control={control}
        />
      </Grid>
    </Grid>
  );
}

export default FormEndereco;
