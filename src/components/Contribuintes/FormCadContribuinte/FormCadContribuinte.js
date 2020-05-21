import React from 'react';
import {
  Tabs,
  Tab,
  AppBar,
  TextField,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import TabPanel from './TabPanel';

import useStyles from './styles';

function FormCadContribuinte() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`
    };
  }

  const [valuess, setValuess] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });

  const handleChangess = (prop) => (event) => {
    setValuess({ ...valuess, [prop]: event.target.value });
  };

  const handleSubmitContribuinte = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example">
          <Tab label="Informações Pessoais" {...a11yProps(0)} />
          <Tab label="Endereço" {...a11yProps(1)} />
          <Tab label="Dados Bancários" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <form onSubmit={handleSubmitContribuinte}>
        <TabPanel value={value} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <RadioGroup
                row
                aria-label="position"
                name="tipo"
                defaultValue="PF">
                <FormControlLabel value="PF" control={<Radio />} label="CPF" />
                <FormControlLabel value="PJ" control={<Radio />} label="CNPJ" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="CPF/CNPJ" name="doc" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nome" name="nome" required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="Inscrição Municipal" name="im" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="RG" name="doc_estadual" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="Data de emissão" name="doc_emissao" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="Orgão emissor" name="doc_orgao" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="Telefone" name="telefone" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="email" name="email" />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <TextField fullWidth label="CEP" name="cep" />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField fullWidth label="UF" name="uf" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Cidade" name="cidade" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Endereço" name="endereco" />
            </Grid>
            <Grid item xs={4} sm={2}>
              <TextField fullWidth label="Número" name="numero" />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField fullWidth label="Complemento" name="complemento" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Bairro" name="bairro" />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <RadioGroup
                row
                aria-label="position"
                name="tipoConta"
                defaultValue="CC">
                <FormControlLabel
                  value="CC"
                  control={<Radio />}
                  label="Conta Corrente"
                />
                <FormControlLabel
                  value="CP"
                  control={<Radio />}
                  label="Conta Poupança"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Banco" name="banco" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Agência" name="agencia" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Conta" name="conta" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Variação" name="variacao" />
            </Grid>
          </Grid>
        </TabPanel>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}>
          Salvar
        </Button>
      </form>
    </div>
  );
}

export default FormCadContribuinte;
