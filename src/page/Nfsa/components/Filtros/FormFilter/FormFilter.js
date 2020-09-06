import React, { useState, useContext, useEffect } from 'react';

import {
  FormControlLabel,
  FormGroup,
  Typography,
  Slider,
  TextField,
  Checkbox,
  Grid
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
  const [selectedSituacao, setSelectedSituacao] = useState({
    pago: true,
    vencer: true,
    inadimplente: true,
    cancelado: true,
    all: true
  });
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
    setSelectedSituacao({
      pago: paramsQuery.pago || true,
      vencer: paramsQuery.vencer || true,
      inadimplente: paramsQuery.inadimplente || true,
      cancelado: paramsQuery.cancelado || true,
      all: paramsQuery.all || true
    });
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
  const handleChangeCheckboxSituacao = (event) => {
    const { name, checked } = event.target;
    setSelectedSituacao(
      name === 'all'
        ? {
          pago: checked,
          vencer: checked,
          inadimplente: checked,
          cancelado: checked,
          all: checked
        }
        : { ...selectedSituacao, all: false, [name]: checked }
    );
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
      <FormGroup row>
        <FormControlLabel
          inputRef={register}
          control={
            <Checkbox
              checked={selectedSituacao.pago}
              onChange={handleChangeCheckboxSituacao}
              name="pago"
            />
          }
          label="Pago"
        />
        <FormControlLabel
          inputRef={register}
          control={
            <Checkbox
              checked={selectedSituacao.vencer}
              onChange={handleChangeCheckboxSituacao}
              name="vencer"
            />
          }
          label="À Vencer"
        />
        <FormControlLabel
          inputRef={register}
          control={
            <Checkbox
              checked={selectedSituacao.inadimplente}
              onChange={handleChangeCheckboxSituacao}
              name="inadimplente"
            />
          }
          label="Inadimplente"
        />
        <FormControlLabel
          inputRef={register}
          control={
            <Checkbox
              checked={selectedSituacao.cancelado}
              onChange={handleChangeCheckboxSituacao}
              name="cancelado"
            />
          }
          label="Cancelado"
        />
        <FormControlLabel
          inputRef={register}
          control={
            <Checkbox
              checked={selectedSituacao.all}
              onChange={handleChangeCheckboxSituacao}
              name="all"
            />
          }
          label="Todos"
        />
      </FormGroup>
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
