import React, { useEffect, useState, useContext } from 'react';
import {
  Typography,
  Grid,
  TextField,
  Paper,
  FormControlLabel,
  Switch,
  FormControl,
  Input,
  InputAdornment
} from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from 'react-hook-form';
import { NfsaContext } from '../../contexts';

import ButtonStep from '../ButtonStep';

function FormTributos({ steps, activeStep, setActiveStep }) {
  const {
    handleCalculationBasis,
    valueFormTributos,
    convertLiquid
  } = useContext(NfsaContext);

  const [selectConvertIRRF, setSelectConvertIRRF] = useState(
    convertLiquid || false
  );
  const [selectIrrfRetido, setSelectIrrfRetido] = useState(
    valueFormTributos.irRetido || true
  );
  const [isLoading, setIsLoading] = useState(true);

  const { control, register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: valueFormTributos
  });

  useEffect(() => {
    Object.keys(valueFormTributos).map((key) =>
      setValue(`${key}`, valueFormTributos[key])
    );
    if (valueFormTributos.baseCalculo > 0) {
      setIsLoading(false);
    }
  }, [valueFormTributos, setValue]);

  const handleConvertIRRF = (event) => {
    setIsLoading(true);
    const selectedConverter = event.target.checked;
    const {
      aliquotaIss,
      irPercente,
      baseCalculo,
      irValor,
      valorISS
    } = valueFormTributos;
    handleCalculationBasis(
      {
        baseCalculo,
        aliquotaIss,
        valorISS,
        irPercente,
        irValor,
        irRetido: selectIrrfRetido,
        convertLiquid: selectConvertIRRF
      },
      selectedConverter
    );
    setSelectConvertIRRF(selectedConverter);
  };

  const handleIrrfRetido = (event) => {
    const selectedIRRFRetido = event.target.checked;
    if (!selectedIRRFRetido) {
      const resultCalcutedIRRF =
        Number(getValues('valorNF')) + Number(getValues('irValor'));
      setValue('valorNF', resultCalcutedIRRF.toFixed(2));
      setValue('irValor', 0.0);
      setValue('irPercente', 0.0);
      setValue('valorDeducao', 0.0);
    } else {
      const { valorNF, irValor, irPercente, valorDeducao } = valueFormTributos;

      setValue('valorNF', valorNF);
      setValue('irValor', irValor);
      setValue('irPercente', irPercente);
      setValue('valorDeducao', valorDeducao);
    }
    setSelectIrrfRetido(selectedIRRFRetido);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={4}>
        <Grid item xs={12} sm={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Incidência do Imposto
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4}>
                <TextField
                  inputRef={register}
                  control={control}
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                  name="aliquotaIss"
                  label="Alíquota do ISS: (%)"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  inputRef={register}
                  control={control}
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                  name="uf"
                  label="UF"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  inputRef={register}
                  control={control}
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                  name="municipio"
                  label="Município"
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <FormControlLabel
              disabled={!valueFormTributos.baseCalculo > 0}
              control={
                <Switch
                  checked={selectConvertIRRF}
                  onChange={handleConvertIRRF}
                  name="converterIRRF"
                  color="primary"
                />
              }
              label="Base de cálculo para líquido"
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  type="number"
                  inputRef={register}
                  control={control}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {isLoading && (
                          <CircularProgress disableShrink size={16} />
                        )}
                        {!isLoading && 'R$'}
                      </InputAdornment>
                    )
                  }}
                  required
                  name="baseCalculo"
                  label="Base de cálculo"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  type="number"
                  inputRef={register}
                  control={control}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {isLoading && (
                          <CircularProgress disableShrink size={16} />
                        )}
                        {!isLoading && 'R$'}
                      </InputAdornment>
                    )
                  }}
                  required
                  name="irValor"
                  label="Valor do IR"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  type="number"
                  inputRef={register}
                  control={control}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {isLoading && (
                          <CircularProgress disableShrink size={16} />
                        )}
                        {!isLoading && 'R$'}
                      </InputAdornment>
                    )
                  }}
                  required
                  name="valorISS"
                  label="Valor do ISS"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  type="number"
                  inputRef={register}
                  control={control}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {isLoading && (
                          <CircularProgress disableShrink size={16} />
                        )}
                        {!isLoading && 'R$'}
                      </InputAdornment>
                    )
                  }}
                  required
                  name="taxaExp"
                  label="Taxa de expedição"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  type="number"
                  inputRef={register}
                  control={control}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {isLoading && (
                          <CircularProgress disableShrink size={16} />
                        )}
                        {!isLoading && 'R$'}
                      </InputAdornment>
                    )
                  }}
                  required
                  name="valorNF"
                  label="Valor da Nota"
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <FormControlLabel
              disabled={!valueFormTributos.baseCalculo > 0}
              control={
                <Switch
                  checked={selectIrrfRetido}
                  onChange={handleIrrfRetido}
                  name="irRetido"
                  color="primary"
                />
              }
              label="IRRF Retido?"
            />
            <Grid container spacing={3} direction="row">
              <Grid item xs={6} sm={4}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" gutterBottom align="center">
                    IR
                  </Typography>
                </Grid>
                <Grid
                  container
                  justify="space-between"
                  direction="row"
                  spacing={1}>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        name="irPercente"
                        type="number"
                        inputRef={register}
                        disabled
                        endAdornment={
                          <InputAdornment position="start">
                            {isLoading && (
                              <CircularProgress disableShrink size={16} />
                            )}
                            {!isLoading && '%'}
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        name="valorDeducao"
                        type="number"
                        inputRef={register}
                        disabled
                        startAdornment={
                          <InputAdornment position="start">R$</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" gutterBottom align="center">
                    PIS
                  </Typography>
                </Grid>
                <Grid
                  container
                  justify="space-between"
                  direction="row"
                  spacing={1}>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        name="pisPercente"
                        type="number"
                        inputRef={register}
                        disabled
                        endAdornment={
                          <InputAdornment position="start">
                            {isLoading && (
                              <CircularProgress disableShrink size={16} />
                            )}
                            {!isLoading && '%'}
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        name="pisValor"
                        type="number"
                        inputRef={register}
                        disabled
                        startAdornment={
                          <InputAdornment position="start">R$</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" gutterBottom align="center">
                    INSS
                  </Typography>
                </Grid>
                <Grid
                  container
                  justify="space-between"
                  direction="row"
                  spacing={1}>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        name="inssPercente"
                        type="number"
                        inputRef={register}
                        disabled
                        endAdornment={
                          <InputAdornment position="start">
                            {isLoading && (
                              <CircularProgress disableShrink size={16} />
                            )}
                            {!isLoading && '%'}
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        name="inssValor"
                        type="number"
                        inputRef={register}
                        disabled
                        startAdornment={
                          <InputAdornment position="start">R$</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" gutterBottom align="center">
                    CONFINS
                  </Typography>
                </Grid>
                <Grid
                  container
                  justify="space-between"
                  direction="row"
                  spacing={1}>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        name="confinsPercente"
                        type="number"
                        inputRef={register}
                        disabled
                        endAdornment={
                          <InputAdornment position="start">
                            {isLoading && (
                              <CircularProgress disableShrink size={16} />
                            )}
                            {!isLoading && '%'}
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        name="confisValor"
                        type="number"
                        inputRef={register}
                        disabled
                        startAdornment={
                          <InputAdornment position="start">R$</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" gutterBottom align="center">
                    CSLL
                  </Typography>
                </Grid>
                <Grid
                  container
                  justify="space-between"
                  direction="row"
                  spacing={1}>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        name="csllPercente"
                        type="number"
                        inputRef={register}
                        disabled
                        endAdornment={
                          <InputAdornment position="start">
                            {isLoading && (
                              <CircularProgress disableShrink size={16} />
                            )}
                            {!isLoading && '%'}
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        name="csllValor"
                        type="number"
                        inputRef={register}
                        disabled
                        startAdornment={
                          <InputAdornment position="start">R$</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <ButtonStep
        steps={steps}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        disabledNext={isLoading}
        disabledBack={isLoading}
      />
    </form>
  );
}

export default FormTributos;
