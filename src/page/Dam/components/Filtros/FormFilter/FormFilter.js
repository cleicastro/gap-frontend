import React, { useState } from 'react';

import {
  FormControlLabel,
  FormGroup,
  Typography,
  Slider,
  TextField,
  Radio,
  Grid
} from '@material-ui/core';

import useStyles from './styles';

function FormFilter({ register, control, setValue }) {
  const classes = useStyles();
  const [selectedSituacao, setSelectedSituacao] = useState('all');

  const [valueSlide, setValueSlide] = useState([0, 1000]);

  const handleChangeSlide = (event, newValue) => {
    setValueSlide(newValue);
    setValue('valorTotalFilter', newValue);
  };
  const handleChangeRadioSituacao = (event) => {
    setSelectedSituacao(event.target.value);
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
      <FormGroup row>
        <FormControlLabel
          inputRef={register}
          value="pago"
          control={
            <Radio
              checked={selectedSituacao === 'pago'}
              onChange={handleChangeRadioSituacao}
              name="situacaoFilter"
              inputProps={{ 'aria-label': 'Pago' }}
            />
          }
          label="Pago"
        />
        <FormControlLabel
          inputRef={register}
          value="vencer"
          control={
            <Radio
              checked={selectedSituacao === 'vencer'}
              onChange={handleChangeRadioSituacao}
              name="situacaoFilter"
              inputProps={{ 'aria-label': 'Vencer' }}
            />
          }
          label="À Vencer"
        />
        <FormControlLabel
          inputRef={register}
          value="inadimplente"
          control={
            <Radio
              checked={selectedSituacao === 'inadimplente'}
              onChange={handleChangeRadioSituacao}
              name="situacaoFilter"
              inputProps={{ 'aria-label': 'Inadimplente' }}
            />
          }
          label="Inadimplente"
        />
        <FormControlLabel
          inputRef={register}
          value="cancelado"
          control={
            <Radio
              checked={selectedSituacao === 'cancelado'}
              onChange={handleChangeRadioSituacao}
              name="situacaoFilter"
              inputProps={{ 'aria-label': 'Cancelado' }}
            />
          }
          label="Cancelado"
        />
        <FormControlLabel
          inputRef={register}
          value="all"
          control={
            <Radio
              checked={selectedSituacao === 'all'}
              onChange={handleChangeRadioSituacao}
              name="situacaoFilter"
              inputProps={{ 'aria-label': 'Todos' }}
            />
          }
          label="Todos"
        />
      </FormGroup>
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
