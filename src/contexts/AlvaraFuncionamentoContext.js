/* eslint-disable no-case-declarations */
import React, { createContext, useReducer } from 'react';

export const AlvaraFuncionamentoContext = createContext();

export const ACTIONS = {
  LIST: 'ALVARA_LIST',
  LIST_INITIAL: 'LIST_INITIAL',
  ADD: 'ALVARA_ADD',
  UPDATE_ALVARA: 'ALVARA_UPDATE',
  MODAL_NEW_ALVARA: 'MODAL_NEW_ALVARA_FUNCIONAMENTO',
  MODAL_DETAILS: 'MODAL_DETAILS',
  MODAL_CONTRIBUINTES: 'MODAL_CONTRIBUINTES_ALVARA',
  ACTIVE_STEP: 'ACTIVE_STEP',
  EDIT_OPERATION: 'EDIT_ALVARA_FUNCIONAMENTO_OPERATION',
  SELECT_ALVARA_FUNCIONAMENTO: 'SELECT_ALVARA_FUNCIONAMENTO',
  SELECT_TAXPAYER: 'SELECT_TAXPAYER',
  DOCUMENT: 'DOCUMENT',
  PARAMS_QUERY: 'PARAMS_QUERY_ALVARA_FUNCIONAMENTO',
  CLEAN_DATA_ALVARA: 'CLEAN_DATA_ALVARA'
};

export const STATE_INITIAL = {
  listAlvara: [],
  pagination: {},
  receitaSeleted: {
    cod: '1121250000',
    descricao: 'ALVARÁ DE LOCALIZAÇÃO',
    icon: 'store',
    sigla: 'ALVARA',
    valor_fixo: 0
  },
  dataAlvaraFuncionamento: {},
  taxpayerSeleted: {},
  activeStep: 0,
  document: {},
  isEdit: false,
  showModalNewAlvaraFuncionamento: false,
  showModalDetails: false,
  openWindowContribuinte: false,
  paramsQuery: {},
  cadastroContribuinte: {}
};
export const alvaraFuncionamentoContextReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LIST_INITIAL:
      return {
        ...state,
        listAlvara: action.payload.data,
        pagination: action.payload.meta
      };
    case ACTIONS.LIST:
      return {
        ...state,
        listAlvara: [...state.listAlvara, ...action.payload.data],
        pagination: action.payload.meta
      };
    case ACTIONS.ADD:
      return {
        ...state,
        listAlvara: [action.payload.data, ...state.listAlvara],
        dataAlvaraFuncionamento: action.payload.data
      };
    case ACTIONS.UPDATE_ALVARA:
      const { payload } = action;
      const { listAlvara } = state;

      const newList = listAlvara.map((alvara) => {
        if (alvara.id_dam === payload.id_dam) {
          const newAlvara = {
            ...payload,
            dam: {
              ...payload.dam,
              valor_principal: payload.valorPrincipal,
              valor_total: payload.valorTotal
            }
          };
          return newAlvara;
        }
        return alvara;
      });
      return {
        ...state,
        listAlvara: newList,
        dataAlvaraFuncionamento: payload
      };

    case ACTIONS.SELECT_TAXPAYER:
      return {
        ...state,
        taxpayerSeleted: action.payload
      };
    case ACTIONS.DOCUMENT:
      return {
        ...state,
        document: action.payload
      };

    case ACTIONS.SELECT_ALVARA_FUNCIONAMENTO:
      return {
        ...state,
        dataAlvaraFuncionamento: action.payload
      };
    case ACTIONS.EDIT_OPERATION:
      return {
        ...state,
        editAlvaraFuncionamento: true
      };
    case ACTIONS.ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.payload
      };

    case ACTIONS.MODAL_DETAILS:
      return {
        ...state,
        showModalDetails: action.payload
      };

    case ACTIONS.MODAL_NEW_ALVARA:
      return {
        ...state,
        showModalNewAlvaraFuncionamento: !state.showModalNewAlvaraFuncionamento,
        isEdit: action.payload
      };
    case ACTIONS.MODAL_CONTRIBUINTES:
      return {
        ...state,
        openWindowContribuinte: !state.openWindowContribuinte,
        cadastroContribuinte: action.payload
      };
    case ACTIONS.PARAMS_QUERY:
      return {
        ...state,
        paramsQuery: action.payload
      };
    case ACTIONS.CLEAN_DATA_ALVARA:
      return {
        ...state,
        document: {
          emissao: new Date(),
          vencimento: new Date(),
          receita: '1121250000',
          docOrigem: '',
          infoAdicionais: '',
          juros: 0,
          valorMulta: 0,
          taxaExp: 5,
          valorPrincipal: 0
        },
        dataAlvaraFuncionamento: {},
        taxpayerSeleted: {},
        activeStep: 0,
        isEdit: false,
        showModalNewAlvaraFuncionamento: false,
        showModalDetails: false,
        openWindowContribuinte: false,
        paramsQuery: {},
        cadastroContribuinte: {}
      };
    default:
      return state;
  }
};

export default function AlvaraFuncionamentoProvider({ children }) {
  const [state, dispatch] = useReducer(
    alvaraFuncionamentoContextReducer,
    STATE_INITIAL
  );

  return (
    <AlvaraFuncionamentoContext.Provider value={{ state, dispatch }}>
      {children}
    </AlvaraFuncionamentoContext.Provider>
  );
}
