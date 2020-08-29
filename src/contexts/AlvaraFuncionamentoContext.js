import React, { createContext, useReducer } from 'react';

export const AlvaraFuncionamentoContext = createContext();

export const ACTIONS = {
  MODAL_NEW: 'MODAL_NEW_ALVARA_FUNCIONAMENTO',
  MODAL_DETAILS: 'MODAL_DETAILS',
  ACTIVE_STEP: 'ACTIVE_STEP',
  EDIT_OPERATION: 'EDIT_ALVARA_FUNCIONAMENTO_OPERATION',
  SELECT_ALVARA_FUNCIONAMENTO: 'SELECT_ALVARA_FUNCIONAMENTO',
  SELECT_TAXPAYER: 'SELECT_TAXPAYER',
  DOCUMENT: 'DOCUMENT',
  PARAMS_QUERY: 'PARAMS_QUERY_ALVARA_FUNCIONAMENTO'
};

export const STATE_INITIAL = {
  receitaSeleted: {
    cod: '1121250000',
    descricao: 'ALVARÁ DE LOCALIZAÇÃO',
    icon: 'store',
    sigla: 'ALVARA',
    valor_fixo: 0
  },
  dataAlvaraFunvionamento: {},
  taxpayerSeleted: {},
  dataDam: {},
  activeStep: 0,
  document: {},
  editAlvaraFuncionamento: false,
  showModalNewAlvaraFuncionamento: false,
  showModalDetails: false,
  paramsQuery: {}
};
export const alvaraFuncionamentoContextReducer = (state, action) => {
  switch (action.type) {
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
        dataDam: action.payload.dam,
        dataAlvaraFunvionamento: action.payload
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

    case ACTIONS.MODAL_NEW:
      // executes when the modal closes to clear data
      if (state.showModalNewAlvaraFuncionamento) {
        return {
          taxpayerSeleted: {},
          dataAlvaraFunvionamento: {},
          activeStep: 0,
          document: {},
          editAlvaraFuncionamento: false,
          showModalDetails: false,
          showModalNewAlvaraFuncionamento: false
        };
      }
      return {
        ...state,
        showModalNewAlvaraFuncionamento: true
      };
    case ACTIONS.PARAMS_QUERY:
      return {
        ...state,
        paramsQuery: action.payload
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
