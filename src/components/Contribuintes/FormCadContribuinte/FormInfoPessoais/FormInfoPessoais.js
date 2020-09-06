import React, { useState } from 'react';
import {
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useFormContext } from 'react-hook-form';

import { NumberFormatCNPJ, NumberFormatCPF } from '../../../NumberFormat';
import { useSearchCNPJ } from '../../../../hooks';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FormInfoPessoais() {
  const [open, setOpen] = useState(false);
  const [messageError, setMessageError] = useState('');
  const { control, register, setValue, errors, watch } = useFormContext();
  const setSearchCNPJ = useSearchCNPJ();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function handlerSearchCNPJ(e) {
    const { value } = e.target;
    if (watch('tipo') === 'PJ' && value.length === 14) {
      const responseCNPJ = setSearchCNPJ(value.replace(/[^\d]+/g, ''));
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
        } else {
          setMessageError(
            `${response.message}\n
              status code:  ${response.error.response.status}\n
              message:  ${response.error.response.data.message}\n`
          );
          setOpen(true);
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

  return (
    <Grid container spacing={3}>
      <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
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
      <Grid item xs={12} sm={3}>
        <TextField
          onChange={handlerSearchCNPJ}
          inputRef={register}
          control={control}
          fullWidth
          label={watch('tipo') === 'PF' ? 'CPF' : 'CNPJ'}
          name="doc"
          InputProps={
            {
              // inputComponent:
              //   watch('tipo') === 'PF' ? NumberFormatCPF : NumberFormatCNPJ
            }
          }
          error={!!errors.doc}
          helperText={errors.doc && errors.doc.message}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          inputRef={register}
          control={control}
          fullWidth
          name="nome"
          type="text"
          label="Nome"
          error={!!errors.nome}
          helperText={errors.nome && errors.nome.message}
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
        />
      </Grid>
    </Grid>
  );
}

export default FormInfoPessoais;
