import React, { useContext } from 'react';
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
// eslint-disable-next-line import/named
import { useStepNfsa } from '../../../../hooks';
import useTributos from '../../../../hooks/nfsaHooks/useTributos';
import { NfsaContext, ACTIONS_NFSA } from '../../../../contexts';

function removeIRR(baseCalculo, valorISS, taxaExp) {
  return (Number(baseCalculo) - Number(valorISS) - Number(taxaExp)).toFixed(2);
}
function addIRR(baseCalculo, valorIr, valorISS, taxaExp) {
  return (
    Number(baseCalculo) -
    Number(valorIr) -
    Number(valorISS) -
    Number(taxaExp)
  ).toFixed(2);
}

function FormTributos() {
  const {
    state: { dataItemNfsa },
    dispatch
  } = useContext(NfsaContext);

  const [stepActivity, setStepActivity] = useStepNfsa();
  const [tributos, setTributos] = useTributos();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues
  } = useForm({
    defaultValues: tributos
  });

  const handlePrevStep = () => {
    dispatch({
      type: ACTIONS_NFSA.SELECT_NFSA,
      payload: {
        ...getValues(),
        items: dataItemNfsa.map((item) => {
          const newValue =
            Number(getValues('baseCalculo')) / Number(item.quantidade);
          return { ...item, valor: newValue };
        })
      }
    });
    setStepActivity(stepActivity - 1);
  };

  const handleConvertToLiquid = (event) => {
    const { checked } = event.target;
    if (checked) {
      const resultConverted = setTributos({
        ...tributos,
        baseCalculo: tributos.convertedToLiquid
      });

      setValue('valorDeducao', resultConverted.valorDeducao);
      setValue('irPercente', resultConverted.irPercente);
      setValue('irValorCalc', resultConverted.irValorCalc);
      setValue('irValor', resultConverted.irValor);
      setValue('valorNF', resultConverted.valorNF);
      setValue('baseCalculo', resultConverted.baseCalculo);
      setValue('valorISS', resultConverted.valorISS);
      setValue('irValorView', resultConverted.irValor);
    } else {
      setValue('valorDeducao', tributos.valorDeducao);
      setValue('irPercente', tributos.irPercente);
      setValue('irValorCalc', tributos.irValorCalc);
      setValue('irValor', tributos.irValor);
      setValue('valorNF', tributos.valorNF);
      setValue('valorISS', tributos.valorISS);
      setValue('baseCalculo', tributos.baseCalculo);
      setValue('irValorView', tributos.irValor);
    }
  };

  const handleIrrRetido = (event) => {
    const { checked } = event.target;
    if (checked) {
      setValue('valorDeducao', tributos.valorDeducao);
      setValue('irPercente', tributos.irPercente);
      setValue('irValorCalc', tributos.irValorCalc);
      setValue('irValor', tributos.irValor);
      setValue('irValorView', tributos.irValor);
      setValue(
        'valorNF',
        addIRR(
          tributos.baseCalculo,
          tributos.irValor,
          tributos.valorISS,
          tributos.taxaExp
        )
      );
    } else {
      setValue('valorDeducao', 0);
      setValue('irPercente', 0);
      setValue('irValorCalc', 0);
      setValue('irValor', 0);
      setValue('irValorView', 0);
      setValue('baseCalculo', tributos.baseCalculo);
      setValue('valorISS', tributos.valorISS);
      setValue(
        'valorNF',
        removeIRR(tributos.baseCalculo, tributos.valorISS, tributos.taxaExp)
      );
    }
  };

  const onSubmit = (data) => {
    dispatch({
      type: ACTIONS_NFSA.SELECT_NFSA,
      payload: {
        ...data,
        items: dataItemNfsa.map((item) => {
          const newValue =
            Number(getValues('baseCalculo')) / Number(item.quantidade);
          return { ...item, valor: newValue };
        })
      }
    });
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
                  required
                  name="aliquotaIss"
                  label="Alíquota do ISS: (%)"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  inputRef={register}
                  control={control}
                  required
                  name="uf"
                  label="UF"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  inputRef={register}
                  control={control}
                  required
                  name="municipio"
                  label="Município"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
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
                  defaultChecked={tributos.converterIRRF || false}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                    readOnly: true
                  }}
                  required
                  name="baseCalculo"
                  label="Base de cálculo"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  type="number"
                  inputRef={register}
                  control={control}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                    readOnly: true
                  }}
                  required
                  name="irValor"
                  label="Valor do IR"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  type="number"
                  inputRef={register}
                  control={control}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                    readOnly: true
                  }}
                  required
                  name="valorISS"
                  label="Valor do ISS"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  type="number"
                  inputRef={register}
                  control={control}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                    readOnly: true
                  }}
                  required
                  name="taxaExp"
                  label="Taxa de expedição"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  type="number"
                  inputRef={register}
                  control={control}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                    readOnly: true
                  }}
                  required
                  name="valorNF"
                  label="Valor da Nota"
                  fullWidth
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">%</InputAdornment>
                        ),
                        readOnly: true
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                        readOnly: true
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                        readOnly: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="Valor do IR"
                      type="number"
                      inputRef={register}
                      name="irValorView"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                        readOnly: true
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
                        readOnly
                        name="pisPercente"
                        type="number"
                        inputRef={register}
                        endAdornment={
                          <InputAdornment position="start">%</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        readOnly
                        name="pisValor"
                        type="number"
                        inputRef={register}
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
                        readOnly
                        name="inssPercente"
                        type="number"
                        inputRef={register}
                        endAdornment={
                          <InputAdornment position="start">%</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        readOnly
                        name="inssValor"
                        type="number"
                        inputRef={register}
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
                        readOnly
                        name="confinsPercente"
                        type="number"
                        inputRef={register}
                        endAdornment={
                          <InputAdornment position="start">%</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        readOnly
                        name="confinsValor"
                        type="number"
                        inputRef={register}
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
                        readOnly
                        name="csllPercente"
                        type="number"
                        inputRef={register}
                        endAdornment={
                          <InputAdornment position="start">%</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl>
                      <Input
                        readOnly
                        name="csllValor"
                        type="number"
                        inputRef={register}
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
