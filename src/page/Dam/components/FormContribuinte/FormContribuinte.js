import React, { useContext } from 'react';
import {
  Typography,
  Grid,
  TextField
  // IconButton,
  // InputAdornment
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { useForm } from 'react-hook-form';
// import { Edit, Add } from '@material-ui/icons';
import { DamContext, ACTIONS } from '../../../../contexts';
import { useContribuinte, useStep } from '../../../../hooks';
import { ButtonStep } from '../../../../components';

function FormContribuinte() {
  const {
    state: { taxpayerSeleted },
    dispatch
  } = useContext(DamContext);
  const [stepActivity, setStepActivity] = useStep();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: taxpayerSeleted
  });
  const [listTaxpayer, setTaxpayer] = useContribuinte();

  function handleParams(params) {
    if (params.length > 5 && params.length > 0) {
      setTaxpayer(params);
    }
  }

  const handleInputContribuinte = (values) => {
    dispatch({ type: ACTIONS.SELECT_TAXPAYER, payload: values });
    setValue('doc', values.doc);
    setValue('nome', values.nome);
    setValue('endereco', values.endereco);
    setValue('cidade', values.cidade);
    setValue('uf', values.uf);
    setValue('cep', values.cep);
    setValue('bairro', values.bairro);
  };

  const handlePrevStep = () => setStepActivity(stepActivity - 1);

  const handleSelectContribuinte = () => {
    setStepActivity(stepActivity + 1);
  };

  return (
    <form onSubmit={handleSubmit(handleSelectContribuinte)}>
      <Typography variant="h6" gutterBottom>
        Preecha o Nome, CPF ou CNPJ para buscar o contribuinte.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            onChange={(event, value) =>
              value !== null && handleInputContribuinte(value)
            }
            options={listTaxpayer}
            getOptionLabel={(option) => `${option.doc}-${option.nome}`}
            autoComplete
            includeInputInList
            id="contribuinte"
            loading={listTaxpayer.length > 1}
            renderInput={(param) => (
              <TextField
                {...param}
                onChange={(event) => handleParams(event.target.value)}
                placeholder="Buscar Nome, CPF ou CNPJ"
                label={
                  listTaxpayer > 1
                    ? `${listTaxpayer.length} Contribuintes, selecione um.`
                    : 'Contribuinte'
                }
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              /* InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="adicionar um novo contribuinte"
                  onClick={() => console.log('he')}
                  edge="end">
                  <Add />
                </IconButton>
                <IconButton
                  aria-label="Editar o contribuinte"
                  onClick={() => console.log('he')}
                  edge="end">
                  <Edit />
                </IconButton>
              </InputAdornment>
            )
          }} */
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
      <ButtonStep
        handlePrevStep={handlePrevStep}
        disabledNext={!taxpayerSeleted.id}
      />
    </form>
  );
}
export default FormContribuinte;
