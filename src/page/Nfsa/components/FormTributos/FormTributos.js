import React from 'react';
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

import { useForm } from 'react-hook-form';

import { ButtonStep } from '../../../../components';
import {
  useStepNfsa,
  useInitialTributosNfsa,
  useSetNfsa
} from '../../../../hooks';

function FormTributos() {
  const setDataNfsa = useSetNfsa();
  const [stepActivity, setStepActivity] = useStepNfsa();
  const [tributos, setTributos, setConvertToLiquid] = useInitialTributosNfsa();
  const { control, register, handleSubmit, setValue, watch } = useForm({
    defaultValues: tributos
  });

  const setValueProcessed = (baseValue) => {
    setValue('baseCalculo', baseValue.baseCalculo);
    setValue('irValorCalc', baseValue.irValorCalc);
    setValue('irValor', baseValue.irValor);
    setValue('valorDeducao', baseValue.valorDeducao);
    setValue('irPercente', baseValue.irPercente);
    setValue('valorISS', baseValue.valorISS);
    setValue('taxaExp', baseValue.taxaExp);
    setValue('valorNF', baseValue.valorNF);
    setValue('pisPercente', baseValue.pisPercente);
    setValue('pisValor', baseValue.pisValor);
    setValue('inssPercente', baseValue.inssPercente);
    setValue('inssValor', baseValue.inssValor);
    setValue('confinsPercente', baseValue.confinsPercente);
    setValue('confinsValor', baseValue.confinsValor);
    setValue('csllPercente', baseValue.csllPercente);
    setValue('csllValor', baseValue.csllValor);
    setValue('irValorView', baseValue.irValor);
  };

  const handlePrevStep = () => setStepActivity(stepActivity - 1);

  const handleConvertToLiquid = (event) => {
    const { checked } = event.target;
    if (checked) {
      const convertToLiquid = setConvertToLiquid();
      setValueProcessed(convertToLiquid);
    } else {
      setValueProcessed(tributos);
    }
  };
  const handleIrrRetido = (event) => {
    const { checked } = event.target;
    if (!checked) {
      const nothingIr = setTributos({ ...tributos, irRetido: false });
      setValueProcessed(nothingIr);
    } else if (watch('converterIRRF')) {
      const convertToLiquid = setConvertToLiquid();
      setValueProcessed(convertToLiquid);
    } else {
      setValueProcessed(tributos);
    }
  };

  const onSubmit = (data) => {
    setDataNfsa({ ...tributos, ...data });
    setStepActivity(stepActivity + 1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Grid container direction="column" spacing={4}>
        <Grid item xs={12} sm={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Incidência do Imposto
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
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
              disabled={!watch('irRetido')}
              control={
                <Switch
                  defaultChecked={tributos && tributos.converterIRRF}
                  onChange={handleConvertToLiquid}
                  inputRef={register}
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
                      <InputAdornment position="start">R$</InputAdornment>
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
                      <InputAdornment position="start">R$</InputAdornment>
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
                      <InputAdornment position="start">R$</InputAdornment>
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
                      <InputAdornment position="start">R$</InputAdornment>
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
                      <InputAdornment position="start">R$</InputAdornment>
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
              control={
                <Switch
                  defaultChecked={tributos && tributos.irRetido}
                  onChange={handleIrrRetido}
                  inputRef={register}
                  name="irRetido"
                  color="primary"
                />
              }
              label="IRRF Retido?"
            />
            <Grid container spacing={3} direction="row">
              <Grid item sm={12}>
                <Grid
                  container
                  justify="space-between"
                  direction="row"
                  spacing={1}>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="Alíquota do ISS: (%)"
                      name="irPercente"
                      type="number"
                      inputRef={register}
                      disabled
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">%</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="IR"
                      name="irValorCalc"
                      type="number"
                      inputRef={register}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="Dedução"
                      name="valorDeducao"
                      type="number"
                      inputRef={register}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="Valor do IR"
                      type="number"
                      inputRef={register}
                      disabled
                      name="irValorView"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Tributos
            </Typography>
            <Grid container spacing={3} direction="row">
              <Grid item xs={6} sm={3}>
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
                          <InputAdornment position="start">%</InputAdornment>
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

              <Grid item xs={6} sm={3}>
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
                          <InputAdornment position="start">%</InputAdornment>
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

              <Grid item xs={6} sm={3}>
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
                          <InputAdornment position="start">%</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        name="confinsValor"
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

              <Grid item xs={6} sm={3}>
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
                          <InputAdornment position="start">%</InputAdornment>
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
      <ButtonStep handlePrevStep={handlePrevStep} />
    </form>
  );
}

export default FormTributos;
