import React, { useContext, useState, useEffect } from 'react';

import {
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { ContribuinteContext } from '../../../../contexts';

function FormBancario() {
  const { contribuinte, isDisbledForm, control, register } = useContext(
    ContribuinteContext
  );
  const [data, setData] = useState(contribuinte);
  const [isDisabledConta, setisDisabledConta] = useState(
    !contribuinte.tipoConta
  );

  useEffect(() => {
    setData(contribuinte);
  }, [contribuinte]);

  function onChangeHandler(e) {
    const { name, value } = e.target;

    if (name === 'tipoConta') {
      if (value === '') {
        setisDisabledConta(true);
      } else {
        setisDisabledConta(false);
      }
    }

    setData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <RadioGroup
          row
          aria-label="position"
          name="tipoConta"
          onChange={onChangeHandler}
          valaue={contribuinte.tipoConta === null ? '' : contribuinte.tipoConta}
          control={control}>
          <FormControlLabel
            disabled={isDisbledForm}
            control={<Radio />}
            inputRef={register}
            checked={data.tipoConta === '' || data.tipoConta === null}
            value=""
            label="Sem Conta"
          />
          <FormControlLabel
            disabled={isDisbledForm}
            control={<Radio />}
            inputRef={register}
            checked={data.tipoConta === 'CC'}
            value="CC"
            label="Conta Corrente"
          />
          <FormControlLabel
            disabled={isDisbledForm}
            control={<Radio />}
            inputRef={register}
            checked={data.tipoConta === 'CP'}
            value="CP"
            label="Conta Poupança"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          control={control}
          inputRef={register}
          onChange={onChangeHandler}
          disabled={isDisbledForm || isDisabledConta}
          fullWidth
          label="Banco"
          name="banco"
          value={data.banco}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          control={control}
          inputRef={register}
          onChange={onChangeHandler}
          disabled={isDisbledForm || isDisabledConta}
          fullWidth
          label="Agência"
          name="agencia"
          value={data.agencia}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          control={control}
          inputRef={register}
          onChange={onChangeHandler}
          disabled={isDisbledForm || isDisabledConta}
          fullWidth
          label="Conta"
          name="conta"
          value={data.conta}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          control={control}
          inputRef={register}
          onChange={onChangeHandler}
          disabled={isDisbledForm || isDisabledConta}
          fullWidth
          label="Variação"
          name="variacao"
          value={data.variacao}
        />
      </Grid>
    </Grid>
  );
}

export default FormBancario;
