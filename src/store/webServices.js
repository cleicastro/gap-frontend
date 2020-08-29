import { ReceitaWS, CorreiosCEP } from '../services';

const ACTIONS = {
  CNPJ: 'WEBSERVICE_EMPRESA',
  CEP: 'WEBSERVICE_CEP',
  CLEAN_WEBSERVICE: 'CLEAN_WEBSERVICE',
  ERROR: 'Webservice_ERROR'
};

const INITIAL_STATE = {
  empresa: null,
  endereco: null,
  erro: null
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
    case ACTIONS.CLEAN_WEBSERVICE:
      return {
        ...state,
        empresa: null,
        endereco: null
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export function requestReceitaWS(cnpj, token) {
  return async (dispatch) => {
    try {
      // const response = await ReceitaWS.getReceitaWS(cnpj, token);
      // const response = await ReceitaWS.getConsultaGuru(cnpj, token);
      const response = await ReceitaWS.getConsultaCNPJA(cnpj, token);
      dispatch({
        type: ACTIONS.CNPJ,
        empresa: response.data
      });
    } catch (error) {

      dispatch({
        type: ACTIONS.ERROR,
        error: {
          ...error.response.data,
          status: error.response.status
        }
      });
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

      dispatch({
        type: ACTIONS.ERROR,
        error: {
          ...error.response.data,
          status: error.response.status
        }
      });
    }
  };
}

export const cleanDataSearch = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: ACTIONS.CLEAN_WEBSERVICE
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        error
      });
    }
  };
};
