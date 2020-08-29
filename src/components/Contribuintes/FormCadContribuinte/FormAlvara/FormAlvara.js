import React, { useState, useContext, useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { ContribuinteContext } from '../../../../contexts';

function FormAlvara() {
  const {
    contribuinte,
    isDisbledForm,
    control,
    register,
    empresaResponse
  } = useContext(ContribuinteContext);
  const { cadAlvara } = contribuinte;
  const [data, setData] = useState({
    inscricaoMunicipal: cadAlvara ? cadAlvara.inscricao_municipal : '',
    nomeFantasia: cadAlvara ? cadAlvara.nome_fantasia : '',
    atividadePrincipal: cadAlvara ? cadAlvara.atividade_principal : '',
    atividadeSecundariaI: cadAlvara ? cadAlvara.atividade_secundaria_I : '',
    atividadeSecundariaII: cadAlvara ? cadAlvara.atividade_secundaria_II : ''
  });

  useEffect(() => {
    if (empresaResponse) {
      const {
        alias,
        secondary_activities: secondaryActivities,
        primary_activity: primaryActivity
      } = empresaResponse;
      setData((value) => ({
        ...value,
        nomeFantasia: alias,
        atividadePrincipal: primaryActivity.description,
        atividadeSecundariaI: secondaryActivities[0].description,
        atividadeSecundariaII: secondaryActivities[1].description
      }));
    }
  }, [empresaResponse]);

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Grid container spacing={3}>
      <Grid item sm={4} xs={12}>
        <TextField
          fullWidth
          label="Inscrição Municipal"
          name="inscricaoMunicipal"
          inputRef={register}
          value={data.inscricaoMunicipal}
          disabled={isDisbledForm}
          onChange={onChangeHandler}
        />
      </Grid>
      <Grid item sm={8} xs={12}>
        <TextField
          fullWidth
          label="Nome Fantasia"
          name="nomeFantasia"
          control={control}
          value={data.nomeFantasia}
          disabled={isDisbledForm}
          onChange={onChangeHandler}
        />
      </Grid>

      <Grid item sm={12}>
        <TextField
          fullWidth
          label="Atividade Principal"
          name="atividadePrincipal"
          value={data.atividadePrincipal}
          disabled={isDisbledForm}
          onChange={onChangeHandler}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          fullWidth
          label="Atividade Secundária I"
          name="atividadeSecundariaI"
          value={data.atividadeSecundariaI}
          disabled={isDisbledForm}
          onChange={onChangeHandler}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          fullWidth
          label="Atividade  Secundária II"
          name="atividadeSecundariaII"
          value={data.atividadeSecundariaII}
          disabled={isDisbledForm}
          onChange={onChangeHandler}
        />
      </Grid>
    </Grid>
  );
}

export default FormAlvara;
