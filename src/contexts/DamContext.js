import React, { createContext, useReducer } from 'react';

export const DamContext = createContext();

export const ACTIONS = {
  MODAL_NEW_DAM: 'MODAL_NEW_DAM',
  MODAL_DETAILS: 'MODAL_DETAILS',
  ACTIVE_STEP: 'ACTIVE_STEP',
  EDIT_DAM_OPERATION: 'EDIT_DAM_OPERATION',
  SELECT_DAM: 'SELECT_DAM',
  SELECT_RECEITA: 'SELECT_RECEITA',
  SELECT_TAXPAYER: 'SELECT_TAXPAYER',
  DOCUMENT: 'DOCUMENT',
  PARAMS_QUERY: 'PARAMS_QUERY_DAM'
};

export const STATE_INITIAL = {
  receitaSeleted: {},
  taxpayerSeleted: {},
  dataDam: {},
  activeStep: 0,
  document: {},
  editDam: false,
  showModalNewDam: false,
  showModalDetails: false,
  paramsQuery: {}
};
export const damContextReducer = (state, action) => {
  switch (action.type) {
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
    case ACTIONS.EDIT_DAM_OPERATION:
      return {
        ...state,
        editDam: true
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

    case ACTIONS.MODAL_NEW_DAM:
      // executes when the modal closes to clear data
      if (state.showModalNewDam) {
        return {
          receitaSeleted: {},
          taxpayerSeleted: {},
          dataDam: {},
          activeStep: 0,
          document: {},
          editDam: false,
          showModalDetails: false,
          showModalNewDam: false
        };
      }
      return {
        ...state,
        showModalNewDam: true
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

export default function DamProvider({ children }) {
  const [state, dispatch] = useReducer(damContextReducer, STATE_INITIAL);

  return (
    <DamContext.Provider value={{ state, dispatch }}>
      {children}
    </DamContext.Provider>
  );
}
