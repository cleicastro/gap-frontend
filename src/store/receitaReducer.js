import { Receita } from '../services';

const ACTIONS = {
  LIST: 'Receita_LIST',
  ADD: 'Receita_ADD'
};

const INITIAL_STATE = {
  listReceita: []
};

export const receitaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return {
        ...state,
        listReceita: action.listReceita
      };
    default:
      return state;
  }
};

export function requestReceita(token) {
  return async (dispatch) => {
    try {
      const response = await Receita.getReceita(token);
      dispatch({
        type: ACTIONS.LIST,
        listReceita: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}
