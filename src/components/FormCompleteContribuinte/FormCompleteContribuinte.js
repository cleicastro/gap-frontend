import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Axios from 'axios';
import { Edit, AddBox } from '@material-ui/icons';
import { Contribuinte } from '../../services';

function requestContribuinteSelect(taxpayer, tokenContribuinte) {
  const paramsRequest = {
    contribuinte: taxpayer,
    limit: 100,
    order: 'nome',
    sort: true
  };
  return Contribuinte.getContribuinte(paramsRequest, tokenContribuinte.token);
}

function FormCompleteContribuinte(props) {
  const timerToClearSomewhere = useRef(false);
  const {
    selectOption,
    selectOptionEdit,
    selectedInitial,
    className,
    autoFocus
  } = props;

  const [loading, setLoading] = useState(false);
  const [contribuinte, setContribuinte] = useState([
    { doc: '', nome: 'Cadastrar um novo' }
  ]);
  const [param, setParam] = useState('');
  const [formContribuinte, setFormContribuinte] = useState({
    doc: selectedInitial.doc || '',
    nome: selectedInitial.nome || '',
    endereco: selectedInitial.endereco || '',
    cidade: selectedInitial.cidade || '',
    uf: selectedInitial.uf || '',
    cep: selectedInitial.cep || '',
    bairro: selectedInitial.bairro || ''
  });

  useEffect(() => {
    const token = Axios.CancelToken.source();

    const setTaxpayer = async () => {
      const response = await requestContribuinteSelect(param, token);
      if (response.data.data.length > 0) {
        setContribuinte(response.data.data);
      }
      setLoading(false);
    };
    timerToClearSomewhere.current = setTimeout(() => {
      if (param.length > 0 && param.length > 4) {
        setLoading(true);
        setTaxpayer();
      }
      return clearTimeout(timerToClearSomewhere.current);
    }, 500);

    return () => {
      token.cancel('Request cancell');
      clearTimeout(timerToClearSomewhere.current);
    };
  }, [param]);

  const handleSelectContribuinte = (values) => {
    if (values.doc !== '') {
      selectOption(values);
      setFormContribuinte({ ...values });
    } else {
      selectOption({ ...values, nome: param });
    }
  };

  const handleEditSelectContribuinte = () => {
    selectOptionEdit(formContribuinte);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            id={className}
            name={className}
            className={className}
            onChange={(event, value) =>
              value !== null && handleSelectContribuinte(value)
            }
            options={contribuinte}
            getOptionLabel={(option) => `${option.doc} ${option.nome}`}
            autoComplete
            includeInputInList
            loading={contribuinte.length > 1}
            loadingText="Buscando... Favor aguarde."
            noOptionsText="Nenhuma opção"
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus={autoFocus}
                variant="outlined"
                value={formContribuinte.nome || ''}
                onChange={(event) => setParam(event.target.value)}
                placeholder="Buscar Nome, CPF ou CNPJ"
                label={contribuinte > 1 && 'selecione uma opção'}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            handleEditSelectContribuinte({ doc: '' })
                          }
                          size="small"
                          aria-label="toggle-new-contribuinte">
                          <AddBox color="primary" size={16} />
                        </IconButton>
                        {formContribuinte.nome && (
                          <IconButton
                            size="small"
                            aria-label="toggle-edit-contribuinte"
                            onClick={handleEditSelectContribuinte}>
                            <Edit color="primary" size={16} />
                          </IconButton>
                        )}
                      </InputAdornment>
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            id="doc"
            name="doc"
            label="CPF/CNPJ"
            fullWidth
            disabled
            value={formContribuinte.doc}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            id="nome"
            name="nome"
            label="Nome"
            fullWidth
            disabled
            value={formContribuinte.nome}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            id="endereco"
            name="endereco"
            label="Endereço"
            fullWidth
            disabled
            value={formContribuinte.endereco}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            id="cidade"
            name="cidade"
            label="Cidade"
            fullWidth
            disabled
            value={formContribuinte.cidade}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            id="uf"
            name="uf"
            label="UF"
            fullWidth
            disabled
            value={formContribuinte.uf}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            id="cep"
            name="cep"
            label="CEP"
            fullWidth
            disabled
            value={formContribuinte.cep}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            id="bairro"
            name="bairro"
            label="Bairro/Comunidade"
            fullWidth
            disabled
            value={formContribuinte.bairro}
          />
        </Grid>
      </Grid>
    </>
  );
}

FormCompleteContribuinte.defaultProps = {
  autoFocus: true
};
FormCompleteContribuinte.propTypes = {
  autoFocus: PropTypes.bool
};

export default FormCompleteContribuinte;
