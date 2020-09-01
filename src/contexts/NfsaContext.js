import React, { createContext, useReducer } from 'react';

export const NfsaContext = createContext();

export const ACTIONS = {
  MODAL_NEW: 'MODAL_NEW_NFSA',
  MODAL_DETAILS: 'MODAL_DETAILS',
  ACTIVE_STEP: 'ACTIVE_STEP',
  EDIT_OPERATION: 'EDIT_NFSA_OPERATION',
  SELECT_NFSA: 'SELECT_NFSA',
  SET_ITEMS_NFSA: 'SET_ITEMS_NFSA',
  SELECT_TAXPAYER: 'SELECT_TAXPAYER',
  DOCUMENT: 'DOCUMENT',
  PARAMS_QUERY: 'PARAMS_QUERY_NFSA'
};

export const STATE_INITIAL = {
  dataNfsa: {},
  dataItemNfsa: [],
  taxpayerSeleted: {},
  dataDam: {},
  activeStep: 0,
  document: {},
  editNfsa: false,
  showModalNewNfsa: false,
  showModalDetails: false,
  paramsQuery: {}
};

export const nfsaContextReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SELECT_TAXPAYER:
      return {
        ...state,
        taxpayerSeleted: { ...action.payload, ...state.taxpayerSeleted }
      };
    case ACTIONS.DOCUMENT:
      return {
        ...state,
        document: action.payload
      };

    case ACTIONS.SELECT_NFSA:
      return {
        ...state,
        dataDam: action.payload.dam,
        dataNfsa: action.payload
      };
    case ACTIONS.SET_ITEMS_NFSA:
      return {
        ...state,
        dataItemNfsa: action.payload
      };
    case ACTIONS.EDIT_OPERATION:
      return {
        ...state,
        editNfsa: true
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
      if (state.showModalNewNfsa) {
        return {
          taxpayerSeleted: {},
          dataNfsa: {},
          dataItemNfsa: [],
          activeStep: 0,
          document: {},
          editNfsa: false,
          showModalDetails: false,
          showModalNewNfsa: false
        };
      }
      return {
        ...state,
        showModalNewNfsa: true
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

export default function NfsaProvider({ children }) {
  const [state, dispatch] = useReducer(nfsaContextReducer, STATE_INITIAL);

  return (
    <NfsaContext.Provider value={{ state, dispatch }}>
      {children}
    </NfsaContext.Provider>
  );
}
