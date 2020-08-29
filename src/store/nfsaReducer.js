/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import { Nfsa, Itens } from '../services';

const ACTIONS = {
  LIST: 'NFSA_LIST',
  LIST_INITIAL: 'NFSA_LIST_INITIAL',
  ADD: 'NFSA_ADD',
  UPDATE: 'NFSA_UPDATE',
  REMOVE_ITEM: 'REMOVE_ITEM_NFSA',
  CLEAN: 'CLEAN_NFSA',
  ERROR: 'NFSA_ERROR'
};

const INITIAL_STATE = {
  error: null,
  listNfsa: [],
  newNFSA: null,
  updateNFSA: null,
  removeItem: null,
  newDataContribuinte: null,
  updateDataContribuinte: {},
  pagination: {}
};

export const nfsaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LIST_INITIAL:
      return {
        ...state,
        listNfsa: action.listNfsa.data,
        pagination: action.listNfsa.meta
      };
    case ACTIONS.LIST:
      return {
        ...state,
        listNfsa: [...state.listNfsa, ...action.listNfsa.data],
        pagination: action.listNfsa.meta
      };
    case ACTIONS.ADD:
      return {
        ...state,
        listNfsa: [...state.listNfsa, action.listNfsa.data],
        newNFSA: action.listNfsa.data
      };
    case ACTIONS.UPDATE:
      const { id, response } = action;
      const { listNfsa } = state;

      const newList = listNfsa.map((nfsa) => {
        if (nfsa.id === id) {
          return response.data.data;
        }
        return nfsa;
      });

      return {
        ...state,
        listNfsa: newList,
        updateNFSA: response
      };
    case ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        removeItem: {
          message: action.response.data.message,
          id: action.id
        }
      };
    case ACTIONS.CLEAN:
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

export function requestNfsa(params, token) {
  return async (dispatch) => {
    try {
      const response = await Nfsa.getNfsa(token);
      dispatch({
        type: params.page > 1 ? ACTIONS.LIST : ACTIONS.LIST_INITIAL,
        listNfsa: response.data
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        error: {
          // ...error.response.data,
          // status: error.response.status
        }
      });
    }
  };
}

export function saveNFSA(items, nfsa, dam) {
  return async (dispatch) => {
    try {
      const response = await Nfsa.saveNFSA(items, nfsa, dam);
      dispatch({
        type: ACTIONS.ADD,
        listNfsa: response
      });
    } catch (error) {

      dispatch({
        type: ACTIONS.ERROR,
        error: {
          // ...error.response.data,
          // status: error.response.status
        }
      });
    }
  };
}

export function editNFSA(items, nfsa, dam, id) {
  return async (dispatch) => {
    try {
      const response = await Nfsa.editNFSA(items, nfsa, dam, id);
      dispatch({
        type: ACTIONS.UPDATE,
        response,
        id
      });
    } catch (error) {

      dispatch({
        type: ACTIONS.ERROR,
        error: {
          // ...error.response.data,
          // status: error.response.status
        }
      });
    }
  };
}

export function deleteItemNFSA(id) {
  return async (dispatch) => {
    try {
      const response = await Itens.deleteItem(id);
      dispatch({
        type: ACTIONS.REMOVE_ITEM,
        response,
        id
      });
    } catch (error) {

      dispatch({
        type: ACTIONS.ERROR,
        error: {
          // ...error.response.data.message,
          // status: error.response.status
        }
      });
    }
  };
}

export function cleanDataContribuinte() {
  return (dispatch) => {
    try {
      dispatch({
        type: ACTIONS.CLEAN
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        error
      });
    }
  };
}
