/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import { Dam } from '../services';

const ACTIONS = {
  ISLOAD: 'DAM_ISLOAD',
  LIST: 'DAM_LIST',
  LIST_INITIAL: 'LIST_INITIAL',
  ADD: 'DAM_ADD',
  UPDATE_STATUS: 'DAM_UPDATE_STATUS',
  ERROR: 'DAM_ERROR'
};

const INITIAL_STATE = {
  error: [],
  listDam: [],
  newDamData: {},
  pagination: {},
  updateDam: {},
  isload: false
};

export const damReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.ISLOAD:
      return {
        isload: true
      };
    case ACTIONS.LIST_INITIAL:
      return {
        ...state,
        listDam: action.listDam.data,
        pagination: action.listDam.meta,
        isload: false
      };
    case ACTIONS.LIST:
      return {
        ...state,
        listDam: [...state.listDam, ...action.listDam.data],
        pagination: action.listDam.meta,
        isload: false
      };
    case ACTIONS.ADD:
      return {
        ...state,
        newDamData: action.listDam.data,
        listDam: [action.listDam.data, ...state.listDam],
        isload: false
      };
    case ACTIONS.UPDATE_STATUS:
      const lst = state.listDam.slice();
      lst.forEach((dam) => {
        if (dam.id === action.updateDam.id) {
          if (action.updateDam.situacao === 0) {
            dam.status = 'Cancelado';
          } else if (action.updateDam.pago === 1) {
            dam.status = 'Pago';
            dam.pago = '1';
          }
        }
      });
      return {
        ...state,
        updateDam: action.updateDam,
        listDam: lst,
        isload: false
      };
    case ACTIONS.ERROR:
      return {
        error: action.error,
        listDam: [],
        pagination: {},
        isload: false
      };
    default:
      return state;
  }
};

export function requestDam(params, token) {
  return async (dispatch) => {
    // dispatch({ type: ACTIONS.ISLOAD });
    try {
      const response = await Dam.getDam({ ...params }, token);
      dispatch({
        type: params.page > 1 ? ACTIONS.LIST : ACTIONS.LIST_INITIAL,
        listDam: response.data
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        error
      });
    }
  };
}

export function salvarDam(dam) {
  return async (dispatch) => {
    // dispatch({ type: ACTIONS.ISLOAD });
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
        error
      });
    }
  };
}

export function updateStatusDam(id, params) {
  return async (dispatch) => {
    const { status: situacao, pago } = params;
    try {
      const response = await Dam.updateDam(id, params);
      dispatch({
        type: ACTIONS.UPDATE_STATUS,
        id,
        updateDam: {
          id,
          situacao,
          pago,
          message: response.data.message,
          status: response.status
        }
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ACTIONS.ERROR,
        error
      });
    }
  };
}
