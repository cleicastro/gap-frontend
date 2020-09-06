/* eslint-disable no-case-declarations */
import React, { createContext, useReducer, useEffect } from 'react';
import { Dam } from '../services';

export const DamContext = createContext();

export const ACTIONS = {
  LIST: 'LIST_DAM',
  LIST_INITIAL: 'LIST_INITIAL_DAM',
  ADD: 'ADD_DAM',
  UPDATE_DAM: 'UPDATE_DAM',
  MODAL_NEW_DAM: 'MODAL_NEW_DAM',
  MODAL_CONTRIBUINTES: 'MODAL_CONTRIBUINTES_DAM',
  MODAL_DETAILS: 'MODAL_DETAILS_DAM',
  ACTIVE_STEP: 'ACTIVE_STEP_DAM',
  SELECT_DAM: 'SELECT_DAM',
  SELECT_RECEITA: 'SELECT_RECEITA_DAM',
  SELECT_TAXPAYER: 'SELECT_TAXPAYER_DAM',
  DOCUMENT: 'DOCUMENT_DAM',
  PARAMS_QUERY: 'PARAMS_QUERY_DAM',
  CLEAN_DATA: 'CLEAN_DATA_DAM'
};

export const STATE_INITIAL = {
  listDam: [],
  pagination: {},
  receitaSeleted: {},
  taxpayerSeleted: {},
  dataDam: {},
  activeStep: 0,
  document: {},
  isEdit: false,
  showModalNewDam: false,
  showModalDetails: false,
  openWindowContribuinte: false,
  paramsQuery: {},
  cadastroContribuinte: {}
};
export const damContextReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LIST_INITIAL:
      return {
        ...state,
        listDam: action.payload.data,
        pagination: action.payload.meta
      };
    case ACTIONS.LIST:
      return {
        ...state,
        listDam: [...state.listDam, ...action.payload.data],
        pagination: action.payload.meta
      };
    case ACTIONS.ADD:
      return {
        ...state,
        listDam: [action.payload.data, ...state.listDam],
        dataDam: action.payload.data
      };
    case ACTIONS.UPDATE_DAM:
      const { payload } = action;
      const { listDam } = state;

      const newList = listDam.map((dam) => {
        if (dam.id === payload.id) {
          return payload;
        }
        return dam;
      });
      return {
        ...state,
        listDam: newList,
        dataDam: action.payload
      };

    case ACTIONS.SELECT_RECEITA:
      return {
        ...state,
        receitaSeleted: action.payload
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

    case ACTIONS.SELECT_DAM:
      return {
        ...state,
        dataDam: action.payload
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
    case ACTIONS.MODAL_CONTRIBUINTES:
      return {
        ...state,
        openWindowContribuinte: !state.openWindowContribuinte,
        cadastroContribuinte: action.payload
      };

    case ACTIONS.MODAL_NEW_DAM:
      return {
        ...state,
        showModalNewDam: !state.showModalNewDam,
        isEdit: action.payload
      };
    case ACTIONS.PARAMS_QUERY:
      return {
        ...state,
        paramsQuery: action.payload
      };
    case ACTIONS.CLEAN_DATA:
      return {
        ...state,
        receitaSeleted: {},
        taxpayerSeleted: {},
        dataDam: {},
        activeStep: 0,
        document: {
          emissao: new Date(),
          receita: '',
          docOrigem: '',
          infoAdicionais: '',
          juros: 0,
          valorMulta: 0,
          taxaExp: 5,
          valorPrincipal: 0
        },
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

async function requestDam(params) {
  const response = await Dam.getDam({ ...params });
  return response;
}
function initialDamsAction(dam) {
  return {
    type: ACTIONS.LIST_INITIAL,
    payload: dam
  };
}
export default function DamProvider({ children }) {
  const [state, dispatch] = useReducer(damContextReducer, STATE_INITIAL);

  useEffect(() => {
    const params = { page: 1 };
    requestDam(params).then((response) => {
      dispatch(initialDamsAction(response.data));
    });
  }, []);

  return (
    <DamContext.Provider value={{ state, dispatch }}>
      {children}
    </DamContext.Provider>
  );
}
