/* eslint-disable no-case-declarations */
export const ACTIONS = {
  LIST: 'DAM_LIST',
  LIST_INITIAL: 'LIST_INITIAL',
  ADD: 'DAM_ADD',
  UPDATE_DAM: 'DAM_UPDATE'
};

const INITIAL_STATE = {
  error: [],
  listDam: [],
  pagination: {}
};

export const damReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LIST_INITIAL:
      return {
        ...state,
        listDam: action.payload.data,
        pagination: action.payload.meta
      };
    case ACTIONS.LIST:
      return {
        ...state,
        listDam: [...state.listDam, ...action.payload.data],
        pagination: action.payload.meta
      };
    case ACTIONS.ADD:
      return {
        ...state,
        listDam: [action.payload.data, ...state.listDam]
      };
    case ACTIONS.UPDATE_DAM:
      const { payload } = action;
      const { listDam } = state;

      const newList = listDam.map((dam) => {
        if (dam.id === payload.id) {
          return payload;
        }
        return dam;
      });
      return {
        ...state,
        listDam: newList
      };
    default:
      return state;
  }
};
