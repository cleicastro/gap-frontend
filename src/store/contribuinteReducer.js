import { contribuinte } from '../services';

const ACTIONS = {
  ISLOAD: 'DAM_ISLOAD',
  LIST: 'Contribuinte_LIST',
  LIST_INITIAL: 'Contribuinte_LIST_INITIAL',
  ADD: 'Contribuinte_ADD',
  ERROR: 'DAM_ERROR'
};

const INITIAL_STATE = {
  error: [],
  listContribuinte: [],
  pagination: {},
  isload: true
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
    case ACTIONS.ERROR:
      return {
        error: action.error,
        isload: false,
        listContribuinte: []
      };
    default:
      return state;
  }
};

export function requestContribuinte(params, token) {
  return async (dispatch) => {
    // dispatch({ type: 'ISLOAD' });
    try {
      const response = await contribuinte.getContribuinte({ ...params }, token);
      dispatch({
        type: params.page > 1 ? ACTIONS.LIST : ACTIONS.LIST_INITIAL,
        listContribuinte: response.data
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        error
      });
    }
  };
}
