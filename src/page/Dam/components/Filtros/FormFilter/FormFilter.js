import React, { useState, useContext, useEffect } from 'react';

import {
  FormControlLabel,
  FormGroup,
  Typography,
  Slider,
  TextField,
  Grid,
  RadioGroup,
  Radio
} from '@material-ui/core';

import { useFormContext } from 'react-hook-form';
import useStyles from './styles';
import { DamContext } from '../../../../../contexts';

function FormFilter() {
  const classes = useStyles();
  const { register, setValue, control } = useFormContext();
  const {
    state: { paramsQuery }
  } = useContext(DamContext);
  const [valueSlide, setValueSlide] = useState([0, 1000]);

  useEffect(() => {
    setValue('dataInicialFilter', paramsQuery.dataInicialFilter);
    setValue('dataFinalFilter', paramsQuery.dataFinalFilter);
    setValue('id', paramsQuery.id);
    setValue('docContribuinteFilter', paramsQuery.docContribuinteFilter);
    setValue('nameContribuinteFilter', paramsQuery.nameContribuinteFilter);
    setValue('situacaoFilter', paramsQuery.situacaoFilter);
    setValueSlide(
      paramsQuery.valorTotalFilter
        ? paramsQuery.valorTotalFilter.split(',').map(Number)
        : [0, 1000]
    );
  }, [paramsQuery, setValue]);

  const handleChangeSlide = (event, newValue) => {
    setValueSlide(newValue);
    setValue('valorTotalFilter', newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="dataInicialFilter"
            name="dataInicialFilter"
            label="Data inicial:"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            inputRef={register}
            control={control}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="dataFinalFilter"
            name="dataFinalFilter"
            label="Data final:"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            inputRef={register}
            control={control}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="docContribuinteFilter"
            name="docContribuinteFilter"
            label="CNPJ/CPF:"
            className={classes.textField}
            inputRef={register}
            control={control}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="id"
            name="id"
            label="N° DAM"
            className={classes.textField}
            inputRef={register}
            control={control}
          />
        </Grid>
      </Grid>
      <FormGroup row>
        <TextField
          id="nameContribuinteFilter"
          name="nameContribuinteFilter"
          label="Contribuinte:"
          fullWidth
          inputRef={register}
          control={control}
        />
      </FormGroup>
      <RadioGroup
        row
        aria-label="situacao"
        name="situacaoFilter"
        defaultValue={
          paramsQuery.situacaoFilter ? paramsQuery.situacaoFilter : 'todos'
        }>
        <FormControlLabel
          inputRef={register}
          value="pago"
          control={<Radio color="secondary" />}
          label="Pago"
        />
        <FormControlLabel
          inputRef={register}
          value="vencer"
          control={<Radio color="secondary" />}
          label="À Vencer"
        />
        <FormControlLabel
          inputRef={register}
          value="inadimplente"
          control={<Radio color="secondary" />}
          label="Inadimplente"
        />
        <FormControlLabel
          inputRef={register}
          value="cancelado"
          control={<Radio color="secondary" />}
          label="Cancelado"
        />
        <FormControlLabel
          inputRef={register}
          value="todos"
          control={<Radio color="secondary" />}
          label="Todos"
        />
      </RadioGroup>
      <FormGroup row style={{ marginTop: 15 }}>
        <Typography id="range-slider" gutterBottom>
          Valor do DAM
        </Typography>
        <Slider
          value={valueSlide}
          onChange={handleChangeSlide}
          id="valorTotal"
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={1000}
        />
        <TextField
          name="valorTotalFilter"
          type="hidden"
          inputRef={register}
          control={control}
        />
      </FormGroup>
    </div>
  );
}

export default FormFilter;
