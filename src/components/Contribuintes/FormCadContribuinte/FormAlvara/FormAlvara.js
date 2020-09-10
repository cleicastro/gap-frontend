import React, { memo } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

function FormAlvara() {
  const { control, register, errors } = useFormContext();
  return (
    <Grid container spacing={3}>
      <Grid item sm={4} xs={12}>
        <TextField
          fullWidth
          label="Inscrição Municipal"
          name="inscricaoMunicipal"
          inputRef={register}
          control={control}
          disabled
        />
      </Grid>
      <Grid item sm={8} xs={12}>
        <TextField
          fullWidth
          label="Nome Fantasia"
          name="nomeFantasia"
          inputRef={register}
          control={control}
          error={!!errors.nomeFantasia}
          helperText={errors.nomeFantasia && errors.nomeFantasia.message}
        />
      </Grid>

      <Grid item sm={12}>
        <TextField
          fullWidth
          label="Atividade Principal"
          name="atividadePrincipal"
          inputRef={register}
          control={control}
          error={!!errors.atividadePrincipal}
          helperText={
            errors.atividadePrincipal && errors.atividadePrincipal.message
          }
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          fullWidth
          label="Atividade Secundária I"
          name="atividadeSecundariaI"
          inputRef={register}
          control={control}
          error={!!errors.atividadeSecundariaI}
          helperText={
            errors.atividadeSecundariaI && errors.atividadeSecundariaI.message
          }
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          fullWidth
          label="Atividade  Secundária II"
          name="atividadeSecundariaII"
          inputRef={register}
          control={control}
          error={!!errors.atividadeSecundariaII}
          helperText={
            errors.atividadeSecundariaII && errors.atividadeSecundariaII.message
          }
        />
      </Grid>
    </Grid>
  );
}

export default memo(FormAlvara);
