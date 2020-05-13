const ACTIONS = {
  NO_PARAMS: 'NO_PARAMS',
  PARAMS: 'PARAMS'
};

const INITIAL_STATE = {
  listParams: {}
};

export const paramsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.NO_PARAMS:
      return {
        ...state,
        listParams: action.listParams
      };
    case ACTIONS.PARAMS:
      return {
        ...state,
        listParams: action.listParams
      };
    default:
      return state;
  }
};

export function setParams(params) {
  return (dispatch) => {
    if (!params) {
      dispatch({
        type: 'NO_PARAMS',
        listParams: {}
      });
    }
    if (params) {
      dispatch({
        type: 'PARAMS',
        listParams: { ...params }
      });
    }
  };
}
