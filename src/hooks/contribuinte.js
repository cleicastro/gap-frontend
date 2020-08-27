import Axios from 'axios';
import { useState } from 'react';
import { Contribuinte } from '../services';

const tokenContribuinte = Axios.CancelToken.source();

function requestContribuinteSelect(taxpayer) {
  const paramsRequest = {
    contribuinte: taxpayer,
    limit: 100,
    order: 'nome',
    sort: true
  };
  return Contribuinte.getContribuinte(paramsRequest, tokenContribuinte.token);
}

export const useContribuinte = () => {
  const [contribuintes, setContribuinte] = useState([]);

  const setTaxpayer = (valor) => {
    if (valor.length > 0 && valor.length > 5) {
      const response = requestContribuinteSelect(valor);
      response.then((contribuinte) => {
        setContribuinte(contribuinte.data.data);
      });
    }
    return () => {
      tokenContribuinte.cancel('Request cancell');
    };
  };
  return [contribuintes, setTaxpayer];
};
