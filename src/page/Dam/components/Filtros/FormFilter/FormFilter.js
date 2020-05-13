import React, { useState, useEffect } from 'react';

import {
  FormControlLabel,
  FormGroup,
  Typography,
  Slider,
  TextField,
  Radio
} from '@material-ui/core';

import useStyles from './styles';

function FormFilter({ handleOnSubmit }) {
  const classes = useStyles();
  const [params, setParams] = useState({
    dataInicialFilter: '',
    dataFinalFilter: '',
    docContribuinte: '',
    id: '',
    nameContribuinteFilter: '',
    docContribuinteFilter: ''
  });

  const [selectedSituacao, setSelectedSituacao] = useState('all');

  const [value, setValue] = useState([0, 1000]);

  const handleChangeSlide = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeTexField = (event) => {
    setParams({ ...params, [event.target.id]: event.target.value });
  };
  const handleChangeRadioSituacao = (event) => {
    setSelectedSituacao(event.target.value);
  };

  useEffect(() => {
    const {
      dataInicialFilter,
      dataFinalFilter,
      docContribuinteFilter,
      id,
      nameContribuinteFilter
    } = params;

    handleOnSubmit({
      dataInicialFilter,
      dataFinalFilter,
      docContribuinteFilter,
      id,
      nameContribuinteFilter,
      situacaoFilter: selectedSituacao,
      valorTotalFilter: value.join(',')
    });
  }, [handleOnSubmit, params, selectedSituacao, value]);

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      id="formFiltro">
      <div>
        <FormGroup row>
          <TextField
            id="dataInicialFilter"
            label="Data inicial:"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            onChange={handleChangeTexField}
          />
          <TextField
            id="dataFinalFilter"
            label="Data final:"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            onChange={handleChangeTexField}
          />
        </FormGroup>
        <FormGroup row>
          <TextField
            id="docContribuinteFilter"
            label="CNPJ/CPF:"
            className={classes.textField}
            onChange={handleChangeTexField}
          />
          <TextField
            id="id"
            label="N° DAM"
            className={classes.textField}
            onChange={handleChangeTexField}
          />
        </FormGroup>
        <TextField
          id="nameContribuinteFilter"
          label="Contribuinte:"
          fullWidth
          onChange={handleChangeTexField}
        />
        <FormGroup row>
          <FormControlLabel
            control={
              <Radio
                checked={selectedSituacao === 'pago'}
                onChange={handleChangeRadioSituacao}
                value="pago"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Pago' }}
              />
            }
            label="Pago"
          />
          <FormControlLabel
            control={
              <Radio
                checked={selectedSituacao === 'vencer'}
                onChange={handleChangeRadioSituacao}
                value="vencer"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Vencer' }}
              />
            }
            label="À Vencer"
          />
          <FormControlLabel
            control={
              <Radio
                checked={selectedSituacao === 'inadimplente'}
                onChange={handleChangeRadioSituacao}
                value="inadimplente"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Inadimplente' }}
              />
            }
            label="Inadimplente"
          />
          <FormControlLabel
            control={
              <Radio
                checked={selectedSituacao === 'cancelado'}
                onChange={handleChangeRadioSituacao}
                value="cancelado"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Cancelado' }}
              />
            }
            label="Cancelado"
          />
          <FormControlLabel
            control={
              <Radio
                checked={selectedSituacao === 'all'}
                onChange={handleChangeRadioSituacao}
                value="all"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Todos' }}
              />
            }
            label="Todos"
          />
        </FormGroup>
        <Typography id="range-slider" gutterBottom>
          Valor do DAM
        </Typography>
        <Slider
          value={value}
          onChange={handleChangeSlide}
          id="valorTotal"
          name="valorTotal"
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={1000}
        />
      </div>
    </form>
  );
}

export default FormFilter;
