import { ReceitaWS, CorreiosCEP } from '../services';

const ACTIONS = {
  CNPJ: 'WEBSERVICE_EMPRESA',
  CEP: 'WEBSERVICE_CEP'
};

const INITIAL_STATE = {
  empresa: {},
  endereco: {},
  erro: {}
};

export const webServiceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.CNPJ:
      return {
        ...state,
        empresa: action.empresa
      };
    case ACTIONS.CEP:
      return {
        ...state,
        endereco: action.endereco
      };
    default:
      return state;
  }
};

export function requestReceitaWS(cnpj, token) {
  return async (dispatch) => {
    try {
      // const response = await ReceitaWS.getReceitaWS(cnpj, token);
      const response = await ReceitaWS.getConsultaGuru(cnpj, token);
      dispatch({
        type: ACTIONS.CNPJ,
        empresa: response.data.legalEntity
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function requestCorreiosCEP(cep, token) {
  return async (dispatch) => {
    try {
      const response = await CorreiosCEP.RequestCEP(cep, token);
      dispatch({
        type: ACTIONS.CEP,
        endereco: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}
