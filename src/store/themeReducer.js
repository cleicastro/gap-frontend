const ACTIONS = {
  THEME: 'THEME'
};

const INITIAL_STATE = {
  theme: localStorage.getItem('theme')
};
export const themeReducer = (state = INITIAL_STATE, action) => {
  switch (action) {
    case ACTIONS.THEME:
      return {
        theme: action.payload
      };
    default:
      return state;
  }
};
