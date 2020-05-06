import { Dam } from '../services';

const ACTIONS = {
  PRELOAD: 'DAM_PRELOAD',
  LIST: 'DAM_LIST',
  ADD: 'DAM_ADD'
};

const INITIAL_STATE = {
  listDam: [],
  pagination: {},
  preload: true
};

export const damReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return {
        ...state,
        listDam: [...state.listDam, ...action.listDam.data],
        pagination: action.listDam.meta
      };
    default:
      return state;
  }
};

export function requestDam(params) {
  const token = 'aqui_tem_que_ficar_o_token_para_auth';
  return async (dispatch) => {
    try {
      const response = await Dam.getDam(token, params);
      dispatch({
        type: ACTIONS.LIST,
        listDam: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}
