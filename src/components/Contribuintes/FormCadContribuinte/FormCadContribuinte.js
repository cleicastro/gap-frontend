import React, { useEffect } from 'react';
import { Tabs, Tab, AppBar, Button, Box } from '@material-ui/core';
import { Save, Edit, Add } from '@material-ui/icons';
import PropTypes from 'prop-types';

// import TabPanel from './TabPanel';

import useStyles from './styles';
import {
  FormInformacoesPessoais,
  FormInformacoesBancaria,
  FormEndereco
} from './components';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function FormCadContribuinte({
  handleContribuinte,
  handleSavlarContribuinte,
  handleNovoContribuinte
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [contribuinte, setContribuinte] = React.useState(handleContribuinte);
  const [isDisbledForm, setIsDisabledForm] = React.useState(false);

  useEffect(() => {
    setContribuinte(handleContribuinte);
    if (handleContribuinte.id) {
      setIsDisabledForm(true);
    }
  }, [handleContribuinte]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`
    };
  }

  const handleChangeContribuinte = (event) => {
    setContribuinte({
      ...contribuinte,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmitContribuinte = (data) => {
    data.preventDefault();
    handleSavlarContribuinte(contribuinte);
    // setIsDisabledForm(true);
  };

  return (
    <div>
      <p />
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
          <FormInformacoesPessoais
            handleChangeContribuinte={handleChangeContribuinte}
            contribuinte={contribuinte}
            isDisbledForm={isDisbledForm}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormEndereco
            handleChangeContribuinte={handleChangeContribuinte}
            contribuinte={contribuinte}
            isDisbledForm={isDisbledForm}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FormInformacoesBancaria
            handleChangeContribuinte={handleChangeContribuinte}
            contribuinte={contribuinte}
            isDisbledForm={isDisbledForm}
          />
        </TabPanel>
        {!isDisbledForm && (
          <Button
            disabled={isDisbledForm}
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<Save />}>
            Salvar
          </Button>
        )}
        {isDisbledForm && (
          <Button
            disabled={!isDisbledForm}
            onClick={() => {
              setIsDisabledForm(false);
            }}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<Edit />}>
            Editar
          </Button>
        )}
        <Button
          onClick={() => {
            handleNovoContribuinte();
            setIsDisabledForm(false);
          }}
          variant="contained"
          color="secondary"
          size="small"
          className={classes.button}
          startIcon={<Add />}>
          Novo
        </Button>
      </form>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default FormCadContribuinte;
