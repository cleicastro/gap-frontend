import React, { useState } from 'react';
import {
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { useFormContext } from 'react-hook-form';

import { useSearchCNPJ } from '../../../../hooks';
import { mascaraCPF, mascaraCNPJ } from '../../../../util';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FormInfoPessoais() {
  const [open, setOpen] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [load, setLoad] = useState(false);
  const {
    control,
    register,
    setValue,
    errors,
    getValues,
    watch
  } = useFormContext();
  const setSearchCNPJ = useSearchCNPJ();

  const handleClosed = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function handlerSearchCNPJ() {
    setLoad(true);
    if (getValues('tipo') === 'PJ' && getValues('doc').length === 18) {
      const responseCNPJ = setSearchCNPJ(
        getValues('doc').replace(/[^\d]+/g, '')
      );
      responseCNPJ.then((response) => {
        if (response.status === 200) {
          const dataCnpj = response.data;
          setValue('nome', dataCnpj.name);
          setValue('telefone', dataCnpj.phone);
          setValue('email', dataCnpj.email);

          setValue('nomeFantasia', dataCnpj.alias);
          setValue('atividadePrincipal', dataCnpj.primary_activity.description);
          setValue(
            'atividadeSecundariaI',
            dataCnpj.secondary_activities[0].description
          );
          setValue(
            'atividadeSecundariaII',
            dataCnpj.secondary_activities[1].description
          );

          setValue('endereco', dataCnpj.address.street);
          setValue('cep', dataCnpj.address.zip);
          setValue('uf', dataCnpj.address.state);
          setValue('cidade', dataCnpj.address.city);
          setValue('numero', dataCnpj.address.number);
          setValue('bairro', dataCnpj.address.neighborhood);
          setLoad(false);
        } else {
          setMessageError(
            `${response.message}\n
              status code:  ${response.error.response.status}\n
              message:  ${response.error.response.data.message}\n`
          );
          setOpen(true);
          setLoad(false);
        }
      });
    }
  }
  function onChangeHandlerTypeAcount(e) {
    const { name, value } = e.target;
    if (name === 'tipo') {
      setValue('tipo', value);
    }
  }

  const handleMaskDoc = (event) => {
    const { value } = event.target;
    if (value.length > 0) {
      if (getValues('tipo') === 'PF') {
        setValue('doc', mascaraCPF(value));
      } else if (getValues('tipo') === 'PJ') {
        setValue('doc', mascaraCNPJ(value));
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Snackbar open={open} autoHideDuration={8000} onClose={handleClosed}>
        <Alert onClose={handleClosed} severity="warning">
          {messageError}
        </Alert>
      </Snackbar>
      <Grid item xs={12} sm={3}>
        <RadioGroup
          row
          aria-label="position"
          name="tipo"
          onChange={onChangeHandlerTypeAcount}>
          <FormControlLabel
            control={<Radio checked={watch('tipo') === 'PF'} />}
            value="PF"
            label="CPF"
            inputRef={register}
          />
          <FormControlLabel
            control={<Radio checked={watch('tipo') === 'PJ'} />}
            value="PJ"
            label="CNPJ"
            inputRef={register}
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={watch('tipo') === 'PJ' ? 4 : 3}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextField
              onChange={handleMaskDoc}
              inputRef={register}
              control={control}
              fullWidth
              label={watch('tipo') === 'PF' ? 'CPF' : 'CNPJ'}
              name="doc"
              error={!!errors.doc}
              helperText={errors.doc && errors.doc.message}
              inputProps={{ maxLength: watch('tipo') === 'PJ' ? 18 : 14 }}
            />
          </Grid>
          {watch('tipo') === 'PJ' && (
            <Grid item>
              <Button
                onClick={handlerSearchCNPJ}
                variant="contained"
                color="primary"
                component="span"
                endIcon={
                  load ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                      <AccountCircle />
                    )
                }>
                Buscar na RF
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={watch('tipo') === 'PJ' ? 5 : 6}>
        <TextField
          inputRef={register}
          control={control}
          fullWidth
          name="nome"
          type="text"
          label="Nome"
          error={!!errors.nome}
          helperText={errors.nome && errors.nome.message}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          inputRef={register}
          control={control}
          fullWidth
          label="Inscrição Estadual"
          name="docEstadual"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          inputRef={register}
          control={control}
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
          fullWidth
          label="Orgão emissor"
          name="docOrgao"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          inputRef={register}
          control={control}
          fullWidth
          label="Telefone"
          name="telefone"
          error={!!errors.telefone}
          helperText={errors.telefone && errors.telefone.message}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          inputRef={register}
          control={control}
          fullWidth
          label="email"
          name="email"
          type="email"
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Grid>
    </Grid>
  );
}

export default FormInfoPessoais;
