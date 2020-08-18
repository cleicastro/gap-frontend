import React, { useEffect, useState, useContext } from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { useForm } from 'react-hook-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Axios from 'axios';
import { requestContribuinte } from '../../store/contribuinteReducer';
import { DamContext } from '../../contexts';

function FormContribuinte({
  requestContribuinte: handleRequestContribuinte,
  listContribuinte
}) {
  const {
    selectedContribuinte,
    dataInitContribuinte,
    handleSelectContribuinte
  } = useContext(DamContext);

  const { register, setValue } = useForm({
    defaultValues: selectedContribuinte || dataInitContribuinte
  });

  const [params, setParams] = useState({});

  useEffect(() => {
    const tokenContribuinte = Axios.CancelToken.source();
    function requestContribuinteSelect(paramsBusca, tokenRequest) {
      handleRequestContribuinte(
        {
          contribuinte: paramsBusca,
          limit: 1000,
          order: 'nome',
          sort: true
        },
        tokenRequest.token
      );
    }
    if (params.length === 6 && params.length > 0) {
      requestContribuinteSelect(params, tokenContribuinte);
    }

    return () => {
      tokenContribuinte.cancel('Request cancell');
    };
  }, [handleRequestContribuinte, params]);

  const handleInputContribuinte = (values) => {
    const { doc, nome, endereco, cidade, uf, cep, bairro } = values;
    setValue([
      { doc },
      { nome },
      { endereco },
      { cidade },
      { uf },
      { cep },
      { bairro }
    ]);
    handleSelectContribuinte(values);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Preecha o Nome, CPF ou CNPJ para buscar o contribuinte.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            onChange={(event, value) =>
              value !== null && handleInputContribuinte(value)
            }
            options={listContribuinte}
            getOptionLabel={(option) => `${option.doc}-${option.nome}`}
            autoComplete
            includeInputInList
            id="contribuinte"
            loading={listContribuinte.length > 1}
            renderInput={(param) => (
              <TextField
                {...param}
                onChange={(event) => setParams(event.target.value)}
                label={
                  listContribuinte > 1
                    ? `${listContribuinte.length} Contribuintes, selecione um.`
                    : 'Contribuinte'
                }
                margin="normal"
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            inputRef={register}
            InputLabelProps={{
              shrink: true
            }}
            required
            id="doc"
            name="doc"
            label="CPF/CNPJ"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            inputRef={register}
            InputLabelProps={{
              shrink: true
            }}
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
            inputRef={register}
            InputLabelProps={{
              shrink: true
            }}
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
            inputRef={register}
            InputLabelProps={{
              shrink: true
            }}
            required
            id="cidade"
            name="cidade"
            label="Cidade"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            inputRef={register}
            InputLabelProps={{
              shrink: true
            }}
            id="uf"
            name="uf"
            label="UF"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            inputRef={register}
            InputLabelProps={{
              shrink: true
            }}
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
            inputRef={register}
            InputLabelProps={{
              shrink: true
            }}
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

const mapStateToProps = (state) => ({
  listContribuinte: state.contribuinte.listContribuinte,
  pagination: state.contribuinte.pagination
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestContribuinte }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FormContribuinte);
