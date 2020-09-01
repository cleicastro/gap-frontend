import React, { useContext } from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useForm } from 'react-hook-form';

import ButtonStep from '../../../../components/ButtonStep';
import { useStepNfsa, useContribuinte } from '../../../../hooks';
import { NfsaContext, ACTIONS_NFSA } from '../../../../contexts';

function FormParticipantes() {
  const {
    state: { taxpayerSeleted },
    dispatch
  } = useContext(NfsaContext);
  const [stepActivity, setStepActivity] = useStepNfsa();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: taxpayerSeleted.prestador && {
      docPrestador: taxpayerSeleted.prestador.doc,
      nomePrestador: taxpayerSeleted.prestador.nome,
      enderecoPrestador: taxpayerSeleted.prestador.endereco,
      cidadePrestador: taxpayerSeleted.prestador.cidade,
      ufPrestador: taxpayerSeleted.prestador.uf,
      cepPrestador: taxpayerSeleted.prestador.cep,
      bairroPrestador: taxpayerSeleted.prestador.bairro,
      docTomador: taxpayerSeleted.tomador.doc,
      nomeTomador: taxpayerSeleted.tomador.nome,
      enderecoTomador: taxpayerSeleted.tomador.endereco,
      cidadeTomador: taxpayerSeleted.tomador.cidade,
      ufTomador: taxpayerSeleted.tomador.uf,
      cepTomador: taxpayerSeleted.tomador.cep,
      bairroTomador: taxpayerSeleted.tomador.bairro
    }
  });
  const [listPrestador, setPrestador] = useContribuinte();
  const [listTomador, setTomador] = useContribuinte();

  function handleParamsPrestador(params) {
    if (params.length > 5 && params.length > 0) {
      setPrestador(params);
    }
  }
  function handleParamsTomador(params) {
    if (params.length > 5 && params.length > 0) {
      setTomador(params);
    }
  }
  const handleInputPrestador = (values) => {
    dispatch({
      type: ACTIONS_NFSA.SELECT_TAXPAYER,
      payload: { prestador: values }
    });
    setValue('docPrestador', values.doc);
    setValue('nomePrestador', values.nome);
    setValue('enderecoPrestador', values.endereco);
    setValue('cidadePrestador', values.cidade);
    setValue('ufPrestador', values.uf);
    setValue('cepPrestador', values.cep);
    setValue('bairroPrestador', values.bairro);
  };
  const handleInputTomador = (values) => {
    dispatch({
      type: ACTIONS_NFSA.SELECT_TAXPAYER,
      payload: { tomador: values }
    });
    setValue('docTomador', values.doc);
    setValue('nomeTomador', values.nome);
    setValue('enderecoTomador', values.endereco);
    setValue('cidadeTomador', values.cidade);
    setValue('ufTomador', values.uf);
    setValue('cepTomador', values.cep);
    setValue('bairroTomador', values.bairro);
  };

  const handleSelectContribuinte = () => {
    setStepActivity(stepActivity + 1);
  };

  return (
    <form onSubmit={handleSubmit(handleSelectContribuinte)}>
      <Grid container justify="space-between" direction="row" spacing={4}>
        <Grid item xs={6} sm={6}>
          <Typography variant="h6" gutterBottom>
            Preecha o Nome, CPF ou CNPJ para buscar o prestador.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                onChange={(event, value) =>
                  value !== null && handleInputPrestador(value)
                }
                name="prestador"
                options={listPrestador}
                getOptionLabel={(option) => `${option.doc}-${option.nome}`}
                includeInputInList
                loading={listPrestador.length > 0}
                renderInput={(param) => (
                  <TextField
                    {...param}
                    autoFocus
                    onChange={(event) =>
                      handleParamsPrestador(event.target.value)
                    }
                    id="prestador"
                    name="prestador"
                    label={
                      listPrestador.length > 1
                        ? `${listPrestador.length} Prestador, selecione um.`
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
                  value !== null && handleInputTomador(value)
                }
                name="tomador"
                options={listTomador}
                getOptionLabel={(option) => `${option.doc}-${option.nome}`}
                includeInputInList
                loading={listTomador.length > 0}
                renderInput={(param) => (
                  <TextField
                    {...param}
                    onChange={(event) =>
                      handleParamsTomador(event.target.value)
                    }
                    id="tomador"
                    name="tomador"
                    label={
                      listTomador.length > 1
                        ? `${listTomador.length} Tomador, selecione um.`
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
        disabledNext={!taxpayerSeleted.prestador || !taxpayerSeleted.tomador}
        activeStep={stepActivity}
      />
    </form>
  );
}
export default FormParticipantes;
