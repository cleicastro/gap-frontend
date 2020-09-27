import React, { useState, useContext, useEffect } from 'react';

import {
  FormControlLabel,
  FormGroup,
  Typography,
  Slider,
  TextField,
  Grid,
  Radio,
  RadioGroup
} from '@material-ui/core';

import { useFormContext } from 'react-hook-form';
import useStyles from './styles';
import { NfsaContext } from '../../../../../contexts';

function FormFilter() {
  const { register, setValue, control } = useFormContext();
  const {
    state: { paramsQuery }
  } = useContext(NfsaContext);
  const classes = useStyles();
  const [valueSlide, setValueSlide] = useState([0, 1000]);

  useEffect(() => {
    setValue('dataInicialFilter', paramsQuery.dataInicialFilter);
    setValue('dataFinalFilter', paramsQuery.dataFinalFilter);
    setValue('id', paramsQuery.id);
    setValue('namePrestadorFilter', paramsQuery.namePrestadorFilter);
    setValue('docPrestadorFilter', paramsQuery.docPrestadorFilter);
    setValue('nameTomadorFilter', paramsQuery.nameTomadorFilter);
    setValue('docTomadorFilter', paramsQuery.docTomadorFilter);
    setValue('valorTotalFilter', paramsQuery.valorTotalFilter);
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
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="id"
            name="id"
            label="N° NFSA"
            className={classes.textField}
            inputRef={register}
            control={control}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="docPrestadorFilter"
            name="docPrestadorFilter"
            label="CNPJ/CPF:"
            className={classes.textField}
            inputRef={register}
            control={control}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            className={classes.textField}
            id="namePrestadorFilter"
            name="namePrestadorFilter"
            label="Prestador:"
            fullWidth
            inputRef={register}
            control={control}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="docTomadorFilter"
            name="docTomadorFilter"
            label="CNPJ/CPF:"
            className={classes.textField}
            inputRef={register}
            control={control}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            className={classes.textField}
            id="nameTomadorFilter"
            name="nameTomadorFilter"
            label="Tomador:"
            fullWidth
            inputRef={register}
            control={control}
          />
        </Grid>
      </Grid>
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
          Valor bruto da nota fiscal
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
