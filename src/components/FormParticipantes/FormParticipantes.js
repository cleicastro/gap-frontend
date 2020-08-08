import React, { useState, useEffect, useContext } from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Axios from 'axios';
import {
  requestContribuinte,
  cleanDataContribuinte
} from '../../store/contribuinteReducer';
import { NfsaContext } from '../../contexts';
import ButtonStep from '../ButtonStep';

function FormParticipantes(props) {
  const {
    requestContribuinte: handleRequestContribuinte,
    cleanDataContribuinte: handleCleanContribuinte,
    listContribuinte,
    steps,
    activeStep,
    setActiveStep
  } = props;
  const { participantes, setParticipantes } = useContext(NfsaContext);

  const { control, register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: { ...participantes }
  });

  const [paramsPrestador, setParamsPrestador] = useState({});
  const [paramsTomador, setParamsTomador] = useState({});
  const [idPrestador, setIdPrestador] = useState(
    participantes.idPrestador || null
  );
  const [idTomador, setIdTomador] = useState(participantes.idTomador || null);

  const [listAutoCompletePrestador, setListAutoCompletePrestador] = useState(
    []
  );
  const [listAutoCompleteTomador, setListAutoCompleteTomador] = useState([]);

  useEffect(() => {
    const tokenPrestador = Axios.CancelToken.source();
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
    if (paramsPrestador.length === 6 && paramsPrestador.length > 0) {
      requestContribuinteSelect(paramsPrestador, tokenPrestador);
    }

    return () => {
      tokenPrestador.cancel('Request cancell');
    };
  }, [handleRequestContribuinte, paramsPrestador]);

  useEffect(() => {
    const tokenTomador = Axios.CancelToken.source();
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
    if (paramsTomador.length === 6 && paramsTomador.length > 0) {
      requestContribuinteSelect(paramsTomador, tokenTomador);
    }

    return () => {
      tokenTomador.cancel('Request cancell');
    };
  }, [handleRequestContribuinte, paramsTomador]);

  useEffect(() => {
    setListAutoCompletePrestador(listContribuinte);
    setListAutoCompleteTomador(listContribuinte);
  }, [listContribuinte]);

  const handlePrestador = (data) => {
    Object.keys(data).map((key) => setValue(`${key}Prestador`, data[key]));
    setIdPrestador(data.id);
    setListAutoCompletePrestador([]);
  };
  const handleTomador = (data) => {
    Object.keys(data).map((key) => setValue(`${key}Tomador`, data[key]));
    setIdTomador(data.id);
    setListAutoCompleteTomador([]);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setParticipantes({ ...getValues(), idPrestador, idTomador });
    handleCleanContribuinte();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setParticipantes({ ...getValues(), idPrestador, idTomador });
    handleCleanContribuinte();
  };

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.keyCode === 39 && (idPrestador || idTomador)) {
      setParticipantes({ ...getValues(), idPrestador, idTomador });
      setActiveStep(activeStep + 1);
    }
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justify="space-between" direction="row" spacing={4}>
        <Grid item xs={6} sm={6}>
          <Typography variant="h6" gutterBottom>
            Preecha o Nome, CPF ou CNPJ para buscar o prestador.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                onChange={(event, value) =>
                  value !== null && handlePrestador(value)
                }
                name="prestador"
                options={listAutoCompletePrestador}
                getOptionLabel={(option) => `${option.doc}-${option.nome}`}
                includeInputInList
                loading={listContribuinte.length > 0}
                renderInput={(param) => (
                  <TextField
                    {...param}
                    autoFocus
                    onChange={(event) => setParamsPrestador(event.target.value)}
                    id="prestador"
                    name="prestador"
                    label={
                      listAutoCompletePrestador.length > 1
                        ? `${listAutoCompletePrestador.length} Prestador, selecione um.`
                        : 'Prestador'
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
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="docPrestador"
                label="CPF/CNPJ"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="nomePrestador"
                label="Nome"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="enderecoPrestador"
                label="Endereço"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="cidadePrestador"
                label="Cidade"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                name="ufPrestador"
                label="UF"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="cepPrestador"
                label="CEP"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="bairroPrestador"
                label="Bairro/Comunidade"
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6} sm={6}>
          <Typography variant="h6" gutterBottom>
            Preecha o Nome, CPF ou CNPJ para buscar o tomador.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                onChange={(event, value) =>
                  value !== null && handleTomador(value)
                }
                name="tomador"
                options={listAutoCompleteTomador}
                getOptionLabel={(option) => `${option.doc}-${option.nome}`}
                includeInputInList
                loading={listContribuinte.length > 0}
                renderInput={(param) => (
                  <TextField
                    {...param}
                    onChange={(event) => setParamsTomador(event.target.value)}
                    id="tomador"
                    name="tomador"
                    label={
                      listAutoCompleteTomador.length > 1
                        ? `${listAutoCompleteTomador.length} Tomador, selecione um.`
                        : 'Tomador'
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
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="docTomador"
                label="CPF/CNPJ"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="nomeTomador"
                label="Nome"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="enderecoTomador"
                label="Endereço"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="cidadeTomador"
                label="Cidade"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                name="ufTomador"
                label="UF"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="cepTomador"
                label="CEP"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                control={control}
                InputLabelProps={{
                  shrink: true
                }}
                required
                name="bairroTomador"
                label="Bairro/Comunidade"
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ButtonStep
        steps={steps}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        disabledNext={!idPrestador || !idTomador}
      />
    </form>
  );
}
const mapStateToProps = (state) => ({
  listContribuinte: state.contribuinte.listContribuinte
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestContribuinte,
      cleanDataContribuinte
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormParticipantes);
