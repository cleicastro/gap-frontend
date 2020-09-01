/* eslint-disable no-case-declarations */
export const ACTIONS = {
  LIST: 'NFSA_LIST',
  LIST_INITIAL: 'LIST_INITIAL',
  ADD: 'NFSA_ADD',
  UPDATE_NFSA: 'NFSA_UPDATE',
  TABLE_IR: 'NFSA_TABLE_IR'
};

const INITIAL_STATE = {
  error: [],
  listNfsa: [],
  pagination: {},
  tableIR: []
};

export const nfsaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.TABLE_IR:
      return {
        ...state,
        tableIR: action.payload
      };
    case ACTIONS.LIST_INITIAL:
      return {
        ...state,
        listNfsa: action.payload.data,
        pagination: action.payload.meta
      };
    case ACTIONS.LIST:
      return {
        ...state,
        listNfsa: [...state.listNfsa, ...action.payload.data],
        pagination: action.payload.meta
      };
    case ACTIONS.ADD:
      return {
        ...state,
        listNfsa: [action.payload.data, ...state.listNfsa]
      };
    case ACTIONS.UPDATE_NFSA:
      const { payload } = action;
      const { listNfsa } = state;
      const newList = listNfsa.map((nfsa) => {
        if (nfsa.dam.id === payload.dam.id) {
          return payload;
        }
        return nfsa;
      });
      return {
        ...state,
        listNfsa: newList
      };
    default:
      return state;
  }
};
