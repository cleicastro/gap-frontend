/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import { Dam } from '../services';

const ACTIONS = {
  LIST: 'DAM_LIST',
  LIST_INITIAL: 'LIST_INITIAL',
  ADD: 'DAM_ADD',
  UPDATE_STATUS: 'DAM_UPDATE_STATUS',
  UPDATE_DAM: 'DAM_UPDATE',
  CLEAN_DAM: 'CLEAN_DAM',
  ERROR: 'DAM_ERROR'
};

const INITIAL_STATE = {
  error: [],
  listDam: [],
  newDamData: {},
  updateDam: {},
  alterStatusDam: null,
  pagination: {}
};

export const damReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LIST_INITIAL:
      return {
        ...state,
        listDam: action.listDam.data,
        pagination: action.listDam.meta
      };
    case ACTIONS.LIST:
      return {
        ...state,
        listDam: [...state.listDam, ...action.listDam.data],
        pagination: action.listDam.meta
      };
    case ACTIONS.ADD:
      return {
        ...state,
        newDamData: action.listDam.data,
        listDam: [action.listDam.data, ...state.listDam],
        pagination: { ...state.pagination }
      };
    case ACTIONS.UPDATE_STATUS:
      return {
        ...state,
        alterStatusDam: {
          ...action.response.data,
          tipo: action.tipo
        }
      };
    case ACTIONS.UPDATE_DAM:
      const lstDam = state.listDam.slice();
      const {
        bairro,
        cep,
        cidade,
        cod,
        descricao,
        doc,
        docOrigem,
        endereco,
        idContribuinte,
        infoAdicionais,
        juros,
        nome,
        referencia,
        sigla,
        taxaExp,
        uf,
        valorMulta,
        valorPrincipal,
        valorTotal,
        valor_fixo: valorFixo,
        vencimento
      } = action.updateDam.params;

      const { id } = action;
      lstDam.forEach((dam) => {
        if (dam.id === id) {
          dam.contribuinte = {
            bairro,
            cep,
            cidade,
            doc,
            endereco,
            id: idContribuinte,
            nome,
            uf
          };
          dam.data_pagamento = null;
          dam.dias_vencimento = 6;
          dam.id = id;
          dam.info_adicionais = infoAdicionais;
          dam.n_ref = docOrigem;
          dam.receita = {
            cod,
            receita: cod,
            sigla,
            descricao,
            valor_fixo: valorFixo
          };
          dam.referencia = referencia;
          dam.taxa_expedicao = taxaExp;
          dam.valor_juros = juros;
          dam.valor_multa = valorMulta;
          dam.valor_principal = valorPrincipal;
          dam.valor_total = valorTotal;
          dam.vencimento = vencimento;
        }
      });
      return {
        ...state,
        updateDam: action.updateDam,
        listDam: lstDam,
        pagination: { ...state.pagination }
      };
    case ACTIONS.CLEAN_DAM:
      return {
        ...state,
        updateDam: {},
        newDamData: {}
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

export function requestDam(params, token) {
  return async (dispatch) => {
    try {
      const response = await Dam.getDam({ ...params }, token);
      dispatch({
        type: params.page > 1 ? ACTIONS.LIST : ACTIONS.LIST_INITIAL,
        listDam: response.data
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

export function salvarDam(dam) {
  return async (dispatch) => {
    try {
      const response = await Dam.salvarDam({ ...dam });
      dispatch({
        type: ACTIONS.ADD,
        listDam: response
      });
    } catch (error) {
      console.log(error);
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

export function updateDataDam(id, params) {
  return async (dispatch) => {
    try {
      const response = await Dam.updateDam(id, params);
      dispatch({
        type: ACTIONS.UPDATE_DAM,
        id,
        updateDam: {
          id,
          params: { ...params, ...params.documentoToUpdateCard },
          message: response.data.message,
          status: response.status
        }
      });
    } catch (error) {
      console.log(error);
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

export function alterStatusDam(id, tipo, params) {
  return async (dispatch) => {
    try {
      const response = await Dam.updateDam(id, params);
      dispatch({
        type: ACTIONS.UPDATE_STATUS,
        response,
        tipo
      });
    } catch (error) {
      console.log(error);
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

export const cleanDataDAM = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: ACTIONS.CLEAN_DAM
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        error
      });
    }
  };
};
