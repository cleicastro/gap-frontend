import { Dam } from '../services';

const ACTIONS = {
  ISLOAD: 'DAM_ISLOAD',
  LIST: 'DAM_LIST',
  LIST_INITIAL: 'LIST_INITIAL',
  ADD: 'DAM_ADD',
  ERROR: 'DAM_ERROR'
};

const INITIAL_STATE = {
  error: [],
  listDam: [],
  pagination: {},
  isload: true
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
        isload: action.isload
      };
    case ACTIONS.LIST:
      return {
        ...state,
        listDam: [...state.listDam, ...action.listDam.data],
        pagination: action.listDam.meta,
        isload: action.isload
      };
    case ACTIONS.ERROR:
      return {
        error: action.error,
        isload: action.isload,
        listDam: [],
        pagination: {}
      };
    default:
      return state;
  }
};

export function requestDam(params, token) {
  return async (dispatch) => {
    dispatch({ type: 'ISLOAD' });
    try {
      const response = await Dam.getDam({ ...params }, token);
      dispatch({
        type: params.page > 1 ? ACTIONS.LIST : ACTIONS.LIST_INITIAL,
        listDam: response.data,
        isload: false
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        error,
        isload: false
      });
    }
  };
}
