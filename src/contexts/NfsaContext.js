/* eslint-disable no-case-declarations */
import React, { createContext, useReducer } from 'react';

export const NfsaContext = createContext();

export const ACTIONS = {
  LIST: 'NFSA_LIST',
  LIST_INITIAL: 'LIST_INITIAL',
  ADD: 'NFSA_ADD',
  UPDATE_NFSA: 'NFSA_UPDATE',
  IS_EDIT: 'IS_EDIT_NFSA',
  MODAL_NEW_NFSA: 'MODAL_NEW_NFSA',
  MODAL_DETAILS: 'MODAL_DETAILS',
  MODAL_CONTRIBUINTES: 'MODAL_CONTRIBUINTES_NFSA',
  ACTIVE_STEP: 'ACTIVE_STEP',
  EDIT_OPERATION: 'EDIT_NFSA_OPERATION',
  SELECT_NFSA: 'SELECT_NFSA_',
  SELECT_TAXPAYER: 'SELECT_TAXPAYER',
  DOCUMENT: 'DOCUMENT',
  PARAMS_QUERY: 'PARAMS_QUERY_NFSA',
  CLEAN_DATA_NFSA: 'CLEAN_DATA_NFSA',
  SET_ITEMS_NFSA: 'SET_ITEMS_NFSA'
};

export const STATE_INITIAL = {
  listNfsa: [],
  pagination: {},
  receitaSeleted: {
    cod: '1113050101',
    descricao: 'NOTA FISCAL AVULSA',
    icon: 'description',
    sigla: 'ISSQN-PF',
    valor_fixo: 0
  },
  dataNfsa: {},
  dataItemNfsa: [],
  taxpayerSeleted: {},
  activeStep: 0,
  document: {},
  isEdit: false,
  showModalNewNfsa: false,
  showModalDetails: false,
  openWindowContribuinte: false,
  paramsQuery: {},
  cadastroContribuinte: {}
};
export const nfsaContextReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LIST_INITIAL:
      return {
        ...state,
        listNfsa: action.payload.data,
        pagination: action.payload.meta
      };
    case ACTIONS.LIST:
      return {
        ...state,
        listNfsa: [...state.listNfsa, ...action.payload.data],
        pagination: action.payload.meta
      };
    case ACTIONS.ADD:
      return {
        ...state,
        listNfsa: [action.payload.data, ...state.listNfsa],
        dataNfsa: action.payload.data
      };
    case ACTIONS.UPDATE_NFSA:
      const { payload } = action;
      const { listNfsa } = state;
      const newList = listNfsa.map((nfsa) => {
        if (nfsa.id === payload.id) {
          const newValues = {
            ...payload,
            valor_calculo: payload.baseCalculo,
            valor_nota: payload.valorNF
          };
          return newValues;
        }
        return nfsa;
      });
      return {
        ...state,
        listNfsa: newList,
        dataNfsa: payload
      };

    case ACTIONS.SELECT_TAXPAYER:
      return {
        ...state,
        taxpayerSeleted: { ...state.taxpayerSeleted, ...action.payload }
      };
    case ACTIONS.SET_ITEMS_NFSA:
      return {
        ...state,
        dataItemNfsa: action.payload
      };
    case ACTIONS.DOCUMENT:
      return {
        ...state,
        document: action.payload
      };
    case ACTIONS.SELECT_NFSA:
      return {
        ...state,
        dataNfsa: {
          ...state.dataNfsa,
          ...action.payload
        },
        dataItemNfsa: action.payload.items
      };
    case ACTIONS.EDIT_OPERATION:
      return {
        ...state,
        dataNfsa: true
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

    case ACTIONS.IS_EDIT:
      return {
        ...state,
        isEdit: action.payload
      };
    case ACTIONS.MODAL_NEW_NFSA:
      return {
        ...state,
        showModalNewNfsa: !state.showModalNewNfsa,
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
    case ACTIONS.CLEAN_DATA_NFSA:
      return {
        ...state,
        taxpayerSeleted: {},
        dataItemNfsa: [],
        document: {
          emissao: new Date(),
          vencimento: new Date(),
          receita: '1113050101',
          docOrigem: '',
          infoAdicionais: '',
          juros: 0,
          valorMulta: 0,
          taxaExp: 5,
          valorPrincipal: 0
        },
        dataNfsa: {},
        activeStep: 0,
        showModalNewDam: false,
        showModalDetails: false,
        openWindowContribuinte: false,
        paramsQuery: {},
        cadastroContribuinte: {},
        isEdit: false
      };
    default:
      return state;
  }
};

export default function NfsaProvider({ children }) {
  const [state, dispatch] = useReducer(nfsaContextReducer, STATE_INITIAL);

  return (
    <NfsaContext.Provider value={{ state, dispatch }}>
      {children}
    </NfsaContext.Provider>
  );
}
