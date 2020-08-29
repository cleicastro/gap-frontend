/* eslint-disable no-case-declarations */
export const ACTIONS = {
  LIST: 'ALVARA_LIST',
  LIST_INITIAL: 'LIST_INITIAL',
  ADD: 'ALVARA_ADD',
  UPDATE_ALVARA: 'ALVARA_UPDATE'
};

const INITIAL_STATE = {
  error: [],
  listAlvara: [],
  pagination: {}
};

export const alvaraReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LIST_INITIAL:
      return {
        ...state,
        listAlvara: action.payload.data,
        pagination: action.payload.meta
      };
    case ACTIONS.LIST:
      return {
        ...state,
        listAlvara: [...state.listAlvara, ...action.payload.data],
        pagination: action.payload.meta
      };
    case ACTIONS.ADD:
      return {
        ...state,
        listAlvara: [action.payload.data, ...state.listAlvara]
      };
    case ACTIONS.UPDATE_ALVARA:
      const { payload } = action;
      const { listAlvara } = state;

      const newList = listAlvara.map((alvara) => {
        if (alvara.id_dam === payload.id_dam) {
          return payload;
        }
        return alvara;
      });
      return {
        ...state,
        listAlvara: newList
      };
    default:
      return state;
  }
};
