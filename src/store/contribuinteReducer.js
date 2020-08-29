/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import { Contribuinte } from '../services';

const ACTIONS = {
  ISLOAD: 'Contribuinte_ISLOAD',
  LIST: 'Contribuinte_LIST',
  LIST_INITIAL: 'Contribuinte_LIST_INITIAL',
  ADD: 'Contribuinte_ADD',
  UPDATE: 'Contribuinte_UPDATE',
  CLEAN_CONTRIBUINTE: 'CLEAN_CONTRIBUINTE',
  ERROR: 'Contribuinte_ERROR'
};

const INITIAL_STATE = {
  error: [],
  listContribuinte: [],
  newDataContribuinte: null,
  updateDataContribuinte: {},
  pagination: {},
  isload: false
};

export const contribuinteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.ISLOAD:
      return {
        isload: true
      };
    case ACTIONS.LIST_INITIAL:
      return {
        ...state,
        listContribuinte: action.listContribuinte.data,
        pagination: action.listContribuinte.meta,
        isload: false
      };
    case ACTIONS.LIST:
      return {
        ...state,
        listContribuinte: [
          ...state.listContribuinte,
          ...action.listContribuinte.data
        ],
        pagination: action.listContribuinte.meta,
        isload: false
      };
    case ACTIONS.ADD:
      return {
        ...state,
        listContribuinte: [
          action.listContribuinte.data,
          ...state.listContribuinte
        ],
        newDataContribuinte: action.status,
        isload: false
      };
    case ACTIONS.UPDATE:
      const lst = state.listContribuinte.slice();

      const {
        tipo,
        doc,
        nome,
        docEstadual,
        docEmissao,
        docOrgao,
        telefone,
        email,
        cep,
        uf,
        cidade,
        endereco,
        numero,
        complemento,
        bairro,
        banco,
        agencia,
        conta,
        variacao,
        tipoConta
      } = action.updateDataContribuinte.params;
      lst.forEach((contribuinte) => {
        if (contribuinte.id === action.id) {
          contribuinte.tipo = tipo;
          contribuinte.doc = doc;
          contribuinte.nome = nome;
          contribuinte.docEstadual = docEstadual;
          // contribuinte.im = im;
          contribuinte.docEmissao = docEmissao;
          contribuinte.docOrgao = docOrgao;
          contribuinte.telefone = telefone;
          contribuinte.email = email;
          contribuinte.cep = cep;
          contribuinte.uf = uf;
          contribuinte.cidade = cidade;
          contribuinte.endereco = endereco;
          contribuinte.numero = numero;
          contribuinte.complemento = complemento;
          contribuinte.bairro = bairro;
          contribuinte.banco = banco;
          contribuinte.agencia = agencia;
          contribuinte.conta = conta;
          contribuinte.variacao = variacao;
          contribuinte.tipoConta = tipoConta;
        }
      });
      return {
        ...state,
        updateDataContribuinte: action.updateDataContribuinte,
        listContribuinte: lst,
        newDataContribuinte: state.newDataContribuinte,
        isload: false
      };
    case ACTIONS.CLEAN_CONTRIBUINTE:
      return {
        ...state,
        updateDataContribuinte: {},
        newDataContribuinte: null
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

export function requestContribuinte(params, token) {
  return async (dispatch) => {
    // dispatch({ type: 'ISLOAD' });
    try {
      const response = await Contribuinte.getContribuinte({ ...params }, token);
      dispatch({
        type: params.page > 1 ? ACTIONS.LIST : ACTIONS.LIST_INITIAL,
        listContribuinte: response.data
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

export function saveContribuinte(contribuinte) {
  return async (dispatch) => {
    try {
      const response = await Contribuinte.salveContribuinte({
        ...contribuinte
      });
      dispatch({
        type: ACTIONS.ADD,
        listContribuinte: response,
        status: response.status
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

export function updateContribuinte(id, params) {
  return async (dispatch) => {
    try {
      const response = await Contribuinte.updateContribuinte(id, params);
      dispatch({
        type: ACTIONS.UPDATE,
        id,
        updateDataContribuinte: {
          id,
          params,
          message: response.data.message,
          status: response.status
        }
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

export function cleanDataContribuinte() {
  return (dispatch) => {
    try {
      dispatch({
        type: ACTIONS.CLEAN_CONTRIBUINTE
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        error
      });
    }
  };
}
