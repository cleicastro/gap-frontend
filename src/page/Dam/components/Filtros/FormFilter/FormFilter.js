import React from 'react';

import {
  FormControlLabel,
  FormGroup,
  Typography,
  Slider,
  TextField,
  Checkbox
} from '@material-ui/core';

import useStyles from './styles';

function FormFilter() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <FormGroup row>
          <TextField
            id="date-inicial"
            label="Data inicial:"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="date-final"
            label="Data final:"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormGroup>
        <FormGroup row>
          <TextField
            id="cnpj-cpf"
            label="CNPJ/CPF:"
            className={classes.textField}
          />
          <TextField id="dam" label="N° DAM" className={classes.textField} />
        </FormGroup>
        <TextField id="contribuinte" label="Contribuinte:" fullWidth />
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={false} name="pago" color="primary" />}
            label="Pago"
          />
          <FormControlLabel
            control={
              <Checkbox checked={false} name="checkedB" color="primary" />
            }
            label="Inadimplente"
          />
          <FormControlLabel
            control={
              <Checkbox checked={false} name="checkedC" color="primary" />
            }
            label="À Vencer"
          />
          <FormControlLabel
            control={<Checkbox checked name="checkedD" color="primary" />}
            label="Cancelado"
          />
        </FormGroup>
        <Typography id="range-slider" gutterBottom>
          Valor do DAM
        </Typography>
        <Slider
          value={0}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          step={10}
          marks
          min={0}
          max={5000}
        />
      </div>
    </form>
  );
}

export default FormFilter;
