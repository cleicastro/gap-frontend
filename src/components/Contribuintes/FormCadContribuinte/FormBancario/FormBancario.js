import React, { useState } from 'react';

import {
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

function FormBancario() {
  const { control, register, setValue, watch } = useFormContext();

  const [isDisabledConta, setisDisabledConta] = useState(
    watch('tipoConta') === ''
  );

  function onChangeHandler(e) {
    const { name, value } = e.target;
    if (name === 'tipoConta') {
      setValue('tipoConta', value);
      if (value === '') {
        setisDisabledConta(true);
      } else {
        setisDisabledConta(false);
      }
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <RadioGroup
          onChange={onChangeHandler}
          row
          aria-label="position"
          name="tipoConta">
          <FormControlLabel
            control={<Radio checked={watch('tipoConta') === ''} />}
            inputRef={register}
            value=""
            label="Sem Conta"
          />
          <FormControlLabel
            control={<Radio checked={watch('tipoConta') === 'CC'} />}
            inputRef={register}
            value="CC"
            label="Conta Corrente"
          />
          <FormControlLabel
            control={<Radio checked={watch('tipoConta') === 'CP'} />}
            inputRef={register}
            value="CP"
            label="Conta Poupança"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          disabled={isDisabledConta}
          control={control}
          inputRef={register}
          fullWidth
          label="Banco"
          name="banco"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          disabled={isDisabledConta}
          control={control}
          inputRef={register}
          fullWidth
          label="Agência"
          name="agencia"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          disabled={isDisabledConta}
          control={control}
          inputRef={register}
          fullWidth
          label="Conta"
          name="conta"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          disabled={isDisabledConta}
          control={control}
          inputRef={register}
          fullWidth
          label="Variação"
          name="variacao"
        />
      </Grid>
    </Grid>
  );
}

export default FormBancario;
